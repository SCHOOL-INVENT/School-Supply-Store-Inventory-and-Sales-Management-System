const mysql = require("mysql2/promise");

const databaseName = (process.env.DB_NAME || "school_supply_store").replace(/[^a-zA-Z0-9_]/g, "");
const config = {
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: databaseName,
  waitForConnections: true,
  connectionLimit: Number(process.env.DB_CONNECTION_LIMIT || 10),
  maxIdle: process.env.NODE_ENV === "test" ? 0 : Number(process.env.DB_MAX_IDLE || 5),
  idleTimeout: process.env.NODE_ENV === "test" ? 1000 : Number(process.env.DB_IDLE_TIMEOUT || 60000),
  queueLimit: 0
};

const pool = mysql.createPool(config);
let initialized = false;
let initPromise = null;

function statusFor(q) {
  return q === 0 ? "out-of-stock" : q <= 10 ? "low-stock" : "in-stock";
}

async function initDatabase() {
  if (initialized) return;
  if (initPromise) return initPromise;
  initPromise = (async () => {
    await pool.query(`CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(100) NOT NULL UNIQUE, password_hash CHAR(64) NOT NULL, role ENUM('admin','staff','owner') NOT NULL DEFAULT 'staff', created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP) ENGINE=InnoDB`);
    await pool.query(`CREATE TABLE IF NOT EXISTS suppliers (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(100) NOT NULL, contact VARCHAR(100) NOT NULL, email VARCHAR(150) NULL, address VARCHAR(255) NULL, created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP) ENGINE=InnoDB`);
    await pool.query(`CREATE TABLE IF NOT EXISTS customers (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(100) NOT NULL, contact VARCHAR(100) NOT NULL, email VARCHAR(150) NULL, address VARCHAR(255) NULL, created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP) ENGINE=InnoDB`);
    await pool.query(`CREATE TABLE IF NOT EXISTS products (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(100) NOT NULL, category VARCHAR(50) NOT NULL, quantity INT NOT NULL DEFAULT 0, unit_price DECIMAL(10,2) NOT NULL DEFAULT 0.00, status ENUM('in-stock','low-stock','out-of-stock') NOT NULL DEFAULT 'out-of-stock', supplier_id INT NULL, created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, CONSTRAINT fk_products_supplier FOREIGN KEY (supplier_id) REFERENCES suppliers(id) ON DELETE SET NULL, INDEX idx_products_name (name), INDEX idx_products_category (category)) ENGINE=InnoDB`);
    await pool.query(`CREATE TABLE IF NOT EXISTS sales (id INT AUTO_INCREMENT PRIMARY KEY, customer_id INT NULL, user_id INT NULL, total DECIMAL(12,2) NOT NULL DEFAULT 0.00, transaction_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT fk_sales_customer FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE SET NULL, CONSTRAINT fk_sales_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL, INDEX idx_sales_date (transaction_date)) ENGINE=InnoDB`);
    await pool.query(`CREATE TABLE IF NOT EXISTS sale_items (id INT AUTO_INCREMENT PRIMARY KEY, sale_id INT NOT NULL, product_id INT NOT NULL, quantity INT NOT NULL, unit_price DECIMAL(10,2) NOT NULL, line_total DECIMAL(12,2) NOT NULL, CONSTRAINT fk_sale_items_sale FOREIGN KEY (sale_id) REFERENCES sales(id) ON DELETE CASCADE, CONSTRAINT fk_sale_items_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT, INDEX idx_sale_items_sale (sale_id), INDEX idx_sale_items_product (product_id)) ENGINE=InnoDB`);
    await pool.query(`CREATE TABLE IF NOT EXISTS stock_transactions (id INT AUTO_INCREMENT PRIMARY KEY, product_id INT NOT NULL, user_id INT NULL, type ENUM('IN','OUT','ADJUSTMENT') NOT NULL, quantity INT NOT NULL, reference VARCHAR(255) NULL, created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT fk_stock_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT, CONSTRAINT fk_stock_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL, INDEX idx_stock_product (product_id)) ENGINE=InnoDB`);
    await seed();
    initialized = true;
  })().catch(error => { initPromise = null; throw error; });
  return initPromise;
}

async function seed() {
  const [users] = await pool.query("SELECT COUNT(*) count FROM users");
  if (!users[0].count) await pool.query("INSERT INTO users(username,password_hash,role) VALUES ?", [[
    ["admin","240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9","admin"],
    ["staff","10176e7b7b24d317acfcf2d2064cfd2f24e154f7b5a96603077d5ef813d6a6b6","staff"]
  ]]);
  const [suppliers] = await pool.query("SELECT COUNT(*) count FROM suppliers");
  if (!suppliers[0].count) await pool.query("INSERT INTO suppliers(name,contact,email,address) VALUES ?", [[
    ["ABC School Supplies","09190000001","abc@example.com","Cebu City"],
    ["Learning Materials Co.","09190000002","learning@example.com","Mandaue City"]
  ]]);
  const [customers] = await pool.query("SELECT COUNT(*) count FROM customers");
  if (!customers[0].count) await pool.query("INSERT INTO customers(name,contact,email,address) VALUES ?", [[
    ["Juan Dela Cruz","09171234567","juan@example.com","Cebu City"],
    ["Mary Santos","09181234567","mary@example.com","Mandaue City"]
  ]]);
  const [products] = await pool.query("SELECT COUNT(*) count FROM products");
  if (!products[0].count) await pool.query("INSERT INTO products(name,category,quantity,unit_price,status,supplier_id) VALUES ?", [[
    ["Ballpen","Writing",120,15,statusFor(120),1], ["Notebook","Paper",80,35,statusFor(80),2],
    ["Pencil","Writing",40,10,statusFor(40),1], ["Eraser","Writing",150,8,statusFor(150),1],
    ["Ruler","Tools",60,20,statusFor(60),2], ["Glue","Supplies",40,25,statusFor(40),2]
  ]]);
}

async function withConnection(fn) {
  await initDatabase();
  const connection = await pool.getConnection();
  try { return await fn(connection); } finally { connection.release(); }
}

async function withTransaction(fn) {
  return withConnection(async connection => {
    await connection.beginTransaction();
    try { const result = await fn(connection); await connection.commit(); return result; }
    catch (error) { await connection.rollback(); throw error; }
  });
}

async function resetTestData() {
  await initDatabase();
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    await connection.execute("DELETE FROM stock_transactions");
    await connection.execute("DELETE FROM sales");
    await connection.execute("DELETE FROM sale_items");
    await connection.execute("DELETE FROM products");
    await connection.execute("DELETE FROM customers");
    await connection.execute("DELETE FROM suppliers");
    await connection.execute("ALTER TABLE suppliers AUTO_INCREMENT = 1");
    await connection.execute("ALTER TABLE customers AUTO_INCREMENT = 1");
    await connection.execute("ALTER TABLE products AUTO_INCREMENT = 1");
    await connection.execute("ALTER TABLE sales AUTO_INCREMENT = 1");
    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
  await seed();
}

module.exports = { pool, initDatabase, withConnection, withTransaction, statusFor, config, resetTestData };