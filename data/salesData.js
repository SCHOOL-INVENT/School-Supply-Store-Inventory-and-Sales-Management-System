const { pool, initDatabase } = require("./database");

function mapItem(row) {
  return {
    productId: Number(row.product_id),
    name: row.name,
    quantity: Number(row.quantity),
    unitPrice: Number(row.unit_price),
    lineTotal: Number(row.line_total)
  };
}

function mapSale(row, items) {
  return {
    id: Number(row.id),
    customerId: row.customer_id == null ? null : Number(row.customer_id),
    userId: row.user_id == null ? null : Number(row.user_id),
    items,
    total: Number(row.total),
    transactionDate: row.transaction_date
  };
}

async function findAll() {
  await initDatabase();
  const [sales] = await pool.execute("SELECT * FROM sales ORDER BY id");
  if (!sales.length) return [];
  const [items] = await pool.execute(
    "SELECT si.sale_id, si.product_id, p.name, si.quantity, si.unit_price, si.line_total FROM sale_items si JOIN products p ON p.id=si.product_id ORDER BY si.sale_id, si.id"
  );
  const grouped = new Map();
  for (const item of items) {
    if (!grouped.has(Number(item.sale_id))) grouped.set(Number(item.sale_id), []);
    grouped.get(Number(item.sale_id)).push(mapItem(item));
  }
  return sales.map(row => mapSale(row, grouped.get(Number(row.id)) || []));
}

async function findById(id, connection = pool) {
  await initDatabase();
  const [sales] = await connection.execute("SELECT * FROM sales WHERE id=?", [Number(id)]);
  if (!sales[0]) return null;
  const [items] = await connection.execute(
    "SELECT si.product_id, p.name, si.quantity, si.unit_price, si.line_total FROM sale_items si JOIN products p ON p.id=si.product_id WHERE si.sale_id=? ORDER BY si.id",
    [Number(id)]
  );
  return mapSale(sales[0], items.map(mapItem));
}

module.exports = { findAll, findById };
