const products = require("../data/productsData");
const customers = require("../data/customersData");

function statusFor(quantity) {
  if (quantity === 0) return "out-of-stock";
  if (quantity <= 10) return "low-stock";
  return "in-stock";
}

function buildSale(body) {
  if (body.customerId !== undefined && !customers.findById(body.customerId)) {
    return { error: [404, "Customer not found", "customerId"] };
  }

  const items = [];
  for (const input of body.items) {
    const product = products.findById(input.productId);
    if (!product) return { error: [404, "Product not found", "items"] };
    if (product.quantity < input.quantity) {
      return { error: [422, `Insufficient stock for ${product.name}`, "items"] };
    }

    items.push({
      productId: product.id,
      name: product.name,
      quantity: input.quantity,
      unitPrice: product.unitPrice,
      lineTotal: Number((product.unitPrice * input.quantity).toFixed(2))
    });
  }

  const total = Number(items.reduce((sum, item) => sum + item.lineTotal, 0).toFixed(2));

  return {
    sale: {
      customerId: body.customerId || null,
      items,
      total,
      transactionDate: body.transactionDate || new Date().toISOString()
    }
  };
}

function reduceStock(items) {
  for (const item of items) {
    const product = products.findById(item.productId);
    if (!product) continue;
    const quantity = product.quantity - item.quantity;
    products.updateById(product.id, {
      quantity,
      status: statusFor(quantity)
    });
  }
}

function restoreStock(items) {
  for (const item of items) {
    const product = products.findById(item.productId);
    if (!product) continue;
    const quantity = product.quantity + item.quantity;
    products.updateById(product.id, {
      quantity,
      status: statusFor(quantity)
    });
  }
}

module.exports = { statusFor, buildSale, reduceStock, restoreStock };
