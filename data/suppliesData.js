const { pool, initDatabase, statusFor } = require("./database");

const map = row => row && ({
  id: row.id,
  name: row.name,
  category: row.category,
  quantity: Number(row.quantity),
  unitPrice: Number(row.unit_price),
  status: row.status,
  supplierId: row.supplier_id == null ? null : Number(row.supplier_id)
});

async function findAll() {
  await initDatabase();
  const [rows] = await pool.execute("SELECT * FROM products ORDER BY id");
  return rows.map(map);
}

async function findById(id, connection = pool) {
  await initDatabase();
  const [rows] = await connection.execute("SELECT * FROM products WHERE id = ?", [Number(id)]);
  return map(rows[0]);
}

async function save(item, connection = pool) {
  await initDatabase();
  const quantity = Number(item.quantity);
  const result = await connection.execute(
    "INSERT INTO products(name,category,quantity,unit_price,status,supplier_id) VALUES(?,?,?,?,?,?)",
    [item.name.trim(), item.category.trim(), quantity, item.unitPrice, statusFor(quantity), item.supplierId ?? null]
  );
  return findById(result[0].insertId, connection);
}

async function updateById(id, changes, connection = pool) {
  await initDatabase();
  const old = await findById(id, connection);
  if (!old) return null;
  const item = { ...old, ...changes };
  const quantity = Number(item.quantity);
  await connection.execute(
    "UPDATE products SET name=?,category=?,quantity=?,unit_price=?,status=?,supplier_id=? WHERE id=?",
    [String(item.name).trim(), String(item.category).trim(), quantity, item.unitPrice, statusFor(quantity), item.supplierId ?? null, Number(id)]
  );
  return findById(id, connection);
}

async function deleteById(id, connection = pool) {
  const item = await findById(id, connection);
  if (!item) return null;
  await connection.execute("DELETE FROM products WHERE id = ?", [Number(id)]);
  return item;
}

async function search(term) {
  await initDatabase();
  const value = String(term || "").trim();
  const like = "%" + value + "%";
  const [rows] = await pool.execute(
    "SELECT * FROM products WHERE ? = '' OR name LIKE ? OR category LIKE ? ORDER BY id",
    [value, like, like]
  );
  return rows.map(map);
}

async function lowStock(threshold = 10) {
  await initDatabase();
  const [rows] = await pool.execute("SELECT * FROM products WHERE quantity <= ? ORDER BY quantity ASC, id", [Number(threshold)]);
  return rows.map(map);
}

async function clearForTests() {
  await initDatabase();
  await pool.execute("DELETE FROM products");
}

async function seedForTests() {}

module.exports = { findAll, findById, save, updateById, deleteById, search, lowStock, clearForTests, seedForTests };
