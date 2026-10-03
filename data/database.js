const path = require("node:path");
const fs = require("node:fs");
const Database = require("better-sqlite3");

const dbPath = process.env.DB_PATH || path.join(__dirname, "school_inventory.db");
fs.mkdirSync(path.dirname(dbPath), { recursive: true });

const db = new Database(dbPath);
db.pragma("foreign_keys = ON");
db.pragma("journal_mode = WAL");

db.exec(`
CREATE TABLE IF NOT EXISTS users (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 username TEXT NOT NULL UNIQUE,
 password_hash TEXT NOT NULL,
 role TEXT NOT NULL CHECK(role IN ('admin','staff')),
 created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS suppliers (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 name TEXT NOT NULL,
 contact TEXT NOT NULL,
 email TEXT,
 address TEXT,
 created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS customers (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 name TEXT NOT NULL,
 contact TEXT NOT NULL,
 email TEXT,
 address TEXT,
 created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS products (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 name TEXT NOT NULL,
 category TEXT NOT NULL,
 quantity INTEGER NOT NULL DEFAULT 0 CHECK(quantity >= 0),
 unit_price REAL NOT NULL DEFAULT 0 CHECK(unit_price >= 0),
 status TEXT NOT NULL DEFAULT 'out-of-stock',
 supplier_id INTEGER,
 created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
 updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
 FOREIGN KEY(supplier_id) REFERENCES suppliers(id) ON DELETE SET NULL
);
CREATE TABLE IF NOT EXISTS sales (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 customer_id INTEGER,
 user_id INTEGER,
 total REAL NOT NULL DEFAULT 0,
 transaction_date TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
 FOREIGN KEY(customer_id) REFERENCES customers(id) ON DELETE SET NULL,
 FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE SET NULL
);
CREATE TABLE IF NOT EXISTS sale_items (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 sale_id INTEGER NOT NULL,
 product_id INTEGER NOT NULL,
 quantity INTEGER NOT NULL CHECK(quantity > 0),
 unit_price REAL NOT NULL CHECK(unit_price >= 0),
 line_total REAL NOT NULL CHECK(line_total >= 0),
 FOREIGN KEY(sale_id) REFERENCES sales(id) ON DELETE CASCADE,
 FOREIGN KEY(product_id) REFERENCES products(id) ON DELETE RESTRICT
);
CREATE TABLE IF NOT EXISTS stock_transactions (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 product_id INTEGER NOT NULL,
 user_id INTEGER,
 type TEXT NOT NULL CHECK(type IN ('IN','OUT','ADJUSTMENT')),
 quantity INTEGER NOT NULL CHECK(quantity > 0),
 reference TEXT,
 created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
 FOREIGN KEY(product_id) REFERENCES products(id) ON DELETE RESTRICT,
 FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE SET NULL
);
CREATE INDEX IF NOT EXISTS idx_products_name ON products(name);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_sales_date ON sales(transaction_date);
CREATE INDEX IF NOT EXISTS idx_stock_product ON stock_transactions(product_id);
`);

const statusFor = q => q === 0 ? "out-of-stock" : q <= 10 ? "low-stock" : "in-stock";
const seed = db.transaction(() => {
 if (db.prepare("SELECT COUNT(*) count FROM users").get().count === 0) {
  const u=db.prepare("INSERT INTO users(username,password_hash,role) VALUES(?,?,?)");
  u.run("admin","240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9","admin");
  u.run("staff","10176e7b7b24d317acfcf2d2064cfd2f24e154f7b5a96603077d5ef813d6a6b6","staff");
 }
 if (db.prepare("SELECT COUNT(*) count FROM suppliers").get().count === 0) {
  const s=db.prepare("INSERT INTO suppliers(name,contact,email,address) VALUES(?,?,?,?)");
  s.run("ABC School Supplies","09190000001","abc@example.com","Cebu City");
  s.run("Learning Materials Co.","09190000002","learning@example.com","Mandaue City");
 }
 if (db.prepare("SELECT COUNT(*) count FROM customers").get().count === 0) {
  const c=db.prepare("INSERT INTO customers(name,contact,email,address) VALUES(?,?,?,?)");
  c.run("Juan Dela Cruz","09171234567","juan@example.com","Cebu City");
  c.run("Mary Santos","09181234567","mary@example.com","Mandaue City");
 }
 if (db.prepare("SELECT COUNT(*) count FROM products").get().count === 0) {
  const p=db.prepare("INSERT INTO products(name,category,quantity,unit_price,status,supplier_id) VALUES(?,?,?,?,?,?)");
  [["Ballpen","Writing",120,15,1],["Notebook","Paper",80,35,2],["Pencil","Writing",40,10,1],["Eraser","Writing",150,8,1],["Ruler","Tools",60,20,2],["Glue","Supplies",40,25,2]].forEach(([n,c,q,price,s])=>p.run(n,c,q,price,statusFor(q),s));
 }
});
seed();

module.exports = { db, statusFor, dbPath };
