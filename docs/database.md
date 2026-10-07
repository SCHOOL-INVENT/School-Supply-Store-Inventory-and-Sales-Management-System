# Database Guide

## Database engine
The current application uses MySQL 8+ through the mysql2/promise driver. The application creates a connection pool and uses parameterized SQL.

## Tables

### users
Stores authentication accounts and roles.

### suppliers
Stores supplier contact information. A product may reference a supplier through products.supplier_id.

### customers
Stores customer contact information. A sale may reference a customer through sales.customer_id.

### products
Stores the inventory catalog: name, category, quantity, unit price, status, and optional supplier.

### sales
Stores the sale header: customer, user, total amount, and transaction date.

### sale_items
Stores the individual products inside each sale. It links a sale to its products and stores quantity, unit price, and line total.

### stock_transactions
Stores inventory movements of type IN, OUT, or ADJUSTMENT, including product, user, quantity, reference, and timestamp.

## Relationships
- suppliers 1 → many products
- customers 1 → many sales
- sales 1 → many sale_items
- products 1 → many sale_items
- products 1 → many stock_transactions
- users 1 → many sales
- users 1 → many stock_transactions

## Integrity rules
- sales.customer_id and sales.user_id use foreign keys.
- sale_items.sale_id cascades when its parent sale is deleted.
- sale_items.product_id is protected from deletion so transaction history cannot point to a missing product.
- stock_transactions.product_id is protected for the same reason.
- products.supplier_id uses SET NULL when a supplier is removed.

## Inventory consistency
Sales and manual stock operations use database transactions. Product rows are locked with FOR UPDATE during stock-sensitive operations.

Product status rules:
- 0 = out-of-stock
- 1–10 = low-stock
- above 10 = in-stock

See database/schema.sql for the repeatable schema and data/database.js for initialization and seed logic.