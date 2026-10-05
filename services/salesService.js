const { pool, withTransaction, statusFor } = require("../data/database");
const salesData = require("../data/salesData");

function businessError(status, message, field = null) {
  const error = new Error(message);
  error.statusCode = status;
  error.field = field;
  return error;
}

async function resolveItems(connection, body) {
  const totals = new Map();
  for (const input of body.items) {
    const productId = Number(input.productId);
    const quantity = Number(input.quantity);
    totals.set(productId, (totals.get(productId) || 0) + quantity);
  }

  const locked = new Map();
  for (const [productId, requestedQuantity] of totals) {
    const [rows] = await connection.execute(
      "SELECT id,name,quantity,unit_price FROM products WHERE id=? FOR UPDATE",
      [productId]
    );
    const product = rows[0];
    if (!product) throw businessError(404, "Product not found", "items");
    if (Number(product.quantity) < requestedQuantity) {
      throw businessError(422, "Insufficient stock for " + product.name, "items");
    }
    locked.set(productId, product);
  }

  return body.items.map(input => {
    const product = locked.get(Number(input.productId));
    const quantity = Number(input.quantity);
    const unitPrice = Number(product.unit_price);
    return {
      productId: Number(product.id),
      name: product.name,
      quantity,
      unitPrice,
      lineTotal: Number((unitPrice * quantity).toFixed(2))
    };
  });
}
async function validateCustomer(connection, customerId) {
  if (customerId === undefined || customerId === null) return null;
  const [rows] = await connection.execute("SELECT id FROM customers WHERE id=?", [Number(customerId)]);
  if (!rows[0]) throw businessError(404, "Customer not found", "customerId");
  return Number(customerId);
}

async function createSale(body, userId = null) {
  let saleId;
  await withTransaction(async connection => {
    const customerId = await validateCustomer(connection, body.customerId);
    const items = await resolveItems(connection, body);
    const total = Number(items.reduce((sum, item) => sum + item.lineTotal, 0).toFixed(2));
    const transactionDate = body.transactionDate || new Date().toISOString().slice(0, 19).replace("T", " ");
    const [saleResult] = await connection.execute(
      "INSERT INTO sales(customer_id,user_id,total,transaction_date) VALUES(?,?,?,?)",
      [customerId, userId, total, transactionDate]
    );
    saleId = Number(saleResult.insertId);
    for (const item of items) {
      await connection.execute(
        "INSERT INTO sale_items(sale_id,product_id,quantity,unit_price,line_total) VALUES(?,?,?,?,?)",
        [saleId, item.productId, item.quantity, item.unitPrice, item.lineTotal]
      );
      const [productRows] = await connection.execute("SELECT quantity FROM products WHERE id=? FOR UPDATE", [item.productId]);
      const quantity = Number(productRows[0].quantity) - item.quantity;
      await connection.execute(
        "UPDATE products SET quantity=?,status=? WHERE id=?",
        [quantity, statusFor(quantity), item.productId]
      );
      await connection.execute(
        "INSERT INTO stock_transactions(product_id,user_id,type,quantity,reference) VALUES(?,?,?,?,?)",
        [item.productId, userId, "OUT", item.quantity, "sale:" + saleId]
      );
    }
  });
  return salesData.findById(saleId);
}

async function updateSale(id, body, userId = null) {
  let updatedId = Number(id);
  await withTransaction(async connection => {
    const [saleRows] = await connection.execute("SELECT id,customer_id,total,transaction_date FROM sales WHERE id=? FOR UPDATE", [Number(id)]);
    if (!saleRows[0]) throw businessError(404, "Sale not found", "id");
    const [oldItems] = await connection.execute("SELECT product_id,quantity FROM sale_items WHERE sale_id=? FOR UPDATE", [Number(id)]);
    for (const oldItem of oldItems) {
      const [products] = await connection.execute("SELECT quantity FROM products WHERE id=? FOR UPDATE", [Number(oldItem.product_id)]);
      if (products[0]) {
        const quantity = Number(products[0].quantity) + Number(oldItem.quantity);
        await connection.execute("UPDATE products SET quantity=?,status=? WHERE id=?", [quantity, statusFor(quantity), Number(oldItem.product_id)]);
        await connection.execute("INSERT INTO stock_transactions(product_id,user_id,type,quantity,reference) VALUES(?,?,?,?,?)", [Number(oldItem.product_id), userId, "IN", Number(oldItem.quantity), "sale:" + id + ":restore"]);
      }
    }
    const customerId = await validateCustomer(connection, body.customerId);
    const items = await resolveItems(connection, body);
    const total = Number(items.reduce((sum, item) => sum + item.lineTotal, 0).toFixed(2));
    const transactionDate = body.transactionDate || saleRows[0].transaction_date;
    await connection.execute("UPDATE sales SET customer_id=?,total=?,transaction_date=? WHERE id=?", [customerId, total, transactionDate, Number(id)]);
    await connection.execute("DELETE FROM sale_items WHERE sale_id=?", [Number(id)]);
    for (const item of items) {
      await connection.execute("INSERT INTO sale_items(sale_id,product_id,quantity,unit_price,line_total) VALUES(?,?,?,?,?)", [Number(id), item.productId, item.quantity, item.unitPrice, item.lineTotal]);
      const [products] = await connection.execute("SELECT quantity FROM products WHERE id=? FOR UPDATE", [item.productId]);
      const quantity = Number(products[0].quantity) - item.quantity;
      await connection.execute("UPDATE products SET quantity=?,status=? WHERE id=?", [quantity, statusFor(quantity), item.productId]);
      await connection.execute("INSERT INTO stock_transactions(product_id,user_id,type,quantity,reference) VALUES(?,?,?,?,?)", [item.productId, userId, "OUT", item.quantity, "sale:" + id + ":update"]);
    }
  });
  return salesData.findById(updatedId);
}

async function deleteSale(id, userId = null) {
  const saleId = Number(id);
  await withTransaction(async connection => {
    const [sales] = await connection.execute("SELECT id FROM sales WHERE id=? FOR UPDATE", [saleId]);
    if (!sales[0]) throw businessError(404, "Sale not found", "id");
    const [items] = await connection.execute("SELECT product_id,quantity FROM sale_items WHERE sale_id=? FOR UPDATE", [saleId]);
    for (const item of items) {
      const [products] = await connection.execute("SELECT quantity FROM products WHERE id=? FOR UPDATE", [Number(item.product_id)]);
      if (products[0]) {
        const quantity = Number(products[0].quantity) + Number(item.quantity);
        await connection.execute("UPDATE products SET quantity=?,status=? WHERE id=?", [quantity, statusFor(quantity), Number(item.product_id)]);
        await connection.execute("INSERT INTO stock_transactions(product_id,user_id,type,quantity,reference) VALUES(?,?,?,?,?)", [Number(item.product_id), userId, "IN", Number(item.quantity), "sale:" + saleId + ":delete"]);
      }
    }
    await connection.execute("DELETE FROM sales WHERE id=?", [saleId]);
  });
  return true;
}

module.exports = { createSale, updateSale, deleteSale, businessError };
