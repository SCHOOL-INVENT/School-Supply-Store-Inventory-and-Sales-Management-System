const { pool, initDatabase } = require("./database");

const map = row => row && ({
  id: row.id,
  name: row.name,
  contact: row.contact,
  email: row.email,
  address: row.address
});

async function findAll() {
  await initDatabase();
  const [rows] = await pool.execute("SELECT * FROM customers ORDER BY id");
  return rows.map(map);
}

async function findById(id, connection = pool) {
  await initDatabase();
  const [rows] = await connection.execute("SELECT * FROM customers WHERE id = ?", [Number(id)]);
  return map(rows[0]);
}

async function save(item, connection = pool) {
  await initDatabase();
  const [result] = await connection.execute(
    "INSERT INTO customers(name,contact,email,address) VALUES(?,?,?,?)",
    [item.name.trim(), item.contact.trim(), item.email ?? null, item.address ?? null]
  );
  return findById(result.insertId, connection);
}

async function updateById(id, changes, connection = pool) {
  const old = await findById(id, connection);
  if (!old) return null;
  const item = { ...old, ...changes };
  await connection.execute(
    "UPDATE customers SET name=?,contact=?,email=?,address=? WHERE id=?",
    [String(item.name).trim(), String(item.contact).trim(), item.email ?? null, item.address ?? null, Number(id)]
  );
  return findById(id, connection);
}

async function deleteById(id, connection = pool) {
  const item = await findById(id, connection);
  if (!item) return null;
  await connection.execute("DELETE FROM customers WHERE id=?", [Number(id)]);
  return item;
}

async function clearForTests() { await initDatabase(); await pool.execute("DELETE FROM customers"); }

module.exports = { findAll, findById, save, updateById, deleteById, clearForTests };
