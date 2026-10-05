CREATE DATABASE IF NOT EXISTS school_supply_store CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE school_supply_store;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  password_hash CHAR(64) NOT NULL,
  role ENUM('admin','staff','owner') NOT NULL DEFAULT 'staff',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS suppliers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  contact VARCHAR(100) NOT NULL,
  email VARCHAR(150) NULL,
  address VARCHAR(255) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS customers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  contact VARCHAR(100) NOT NULL,
  email VARCHAR(150) NULL,
  address VARCHAR(255) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  category VARCHAR(50) NOT NULL,
  quantity INT NOT NULL DEFAULT 0,
  unit_price DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  status ENUM('in-stock','low-stock','out-of-stock') NOT NULL DEFAULT 'out-of-stock',
  supplier_id INT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_products_supplier FOREIGN KEY (supplier_id) REFERENCES suppliers(id) ON DELETE SET NULL,
  INDEX idx_products_name (name),
  INDEX idx_products_category (category)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS sales (
  id INT AUTO_INCREMENT PRIMARY KEY,
  customer_id INT NULL,
  user_id INT NULL,
  total DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  transaction_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_sales_customer FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE SET NULL,
  CONSTRAINT fk_sales_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_sales_date (transaction_date)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS sale_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  sale_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL,
  line_total DECIMAL(12,2) NOT NULL,
  CONSTRAINT fk_sale_items_sale FOREIGN KEY (sale_id) REFERENCES sales(id) ON DELETE CASCADE,
  CONSTRAINT fk_sale_items_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT,
  INDEX idx_sale_items_sale (sale_id),
  INDEX idx_sale_items_product (product_id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS stock_transactions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT NOT NULL,
  user_id INT NULL,
  type ENUM('IN','OUT','ADJUSTMENT') NOT NULL,
  quantity INT NOT NULL,
  reference VARCHAR(255) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_stock_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT,
  CONSTRAINT fk_stock_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_stock_product (product_id),
  INDEX idx_stock_created (created_at)
) ENGINE=InnoDB;

INSERT INTO users(username,password_hash,role)
SELECT 'admin','240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9','admin'
WHERE NOT EXISTS (SELECT 1 FROM users WHERE username='admin');
INSERT INTO users(username,password_hash,role)
SELECT 'staff','10176e7b7b24d317acfcf2d2064cfd2f24e154f7b5a96603077d5ef813d6a6b6','staff'
WHERE NOT EXISTS (SELECT 1 FROM users WHERE username='staff');

INSERT INTO suppliers(name,contact,email,address)
SELECT 'ABC School Supplies','09190000001','abc@example.com','Cebu City'
WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='ABC School Supplies');
INSERT INTO suppliers(name,contact,email,address)
SELECT 'Learning Materials Co.','09190000002','learning@example.com','Mandaue City'
WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Learning Materials Co.');

INSERT INTO customers(name,contact,email,address)
SELECT 'Juan Dela Cruz','09171234567','juan@example.com','Cebu City'
WHERE NOT EXISTS (SELECT 1 FROM customers WHERE name='Juan Dela Cruz');
INSERT INTO customers(name,contact,email,address)
SELECT 'Mary Santos','09181234567','mary@example.com','Mandaue City'
WHERE NOT EXISTS (SELECT 1 FROM customers WHERE name='Mary Santos');

INSERT INTO products(name,category,quantity,unit_price,status,supplier_id)
SELECT 'Ballpen','Writing',120,15,'in-stock',s.id FROM suppliers s
WHERE s.name='ABC School Supplies' AND NOT EXISTS (SELECT 1 FROM products WHERE name='Ballpen');
INSERT INTO products(name,category,quantity,unit_price,status,supplier_id)
SELECT 'Notebook','Paper',80,35,'in-stock',s.id FROM suppliers s
WHERE s.name='Learning Materials Co.' AND NOT EXISTS (SELECT 1 FROM products WHERE name='Notebook');
INSERT INTO products(name,category,quantity,unit_price,status,supplier_id)
SELECT 'Pencil','Writing',40,10,'in-stock',s.id FROM suppliers s
WHERE s.name='ABC School Supplies' AND NOT EXISTS (SELECT 1 FROM products WHERE name='Pencil');
INSERT INTO products(name,category,quantity,unit_price,status,supplier_id)
SELECT 'Eraser','Writing',150,8,'in-stock',s.id FROM suppliers s
WHERE s.name='ABC School Supplies' AND NOT EXISTS (SELECT 1 FROM products WHERE name='Eraser');
INSERT INTO products(name,category,quantity,unit_price,status,supplier_id)
SELECT 'Ruler','Tools',60,20,'in-stock',s.id FROM suppliers s
WHERE s.name='Learning Materials Co.' AND NOT EXISTS (SELECT 1 FROM products WHERE name='Ruler');
INSERT INTO products(name,category,quantity,unit_price,status,supplier_id)
SELECT 'Glue','Supplies',40,25,'in-stock',s.id FROM suppliers s
WHERE s.name='Learning Materials Co.' AND NOT EXISTS (SELECT 1 FROM products WHERE name='Glue');
