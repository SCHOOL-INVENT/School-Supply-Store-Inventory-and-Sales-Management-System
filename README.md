# School Supply Store Inventory and Sales Management System

Node.js/Express REST API for a school supply inventory and sales management system with a persistent SQLite database.

## Stack
- Node.js
- Express 5
- SQLite via better-sqlite3
- Supertest for API tests

## Install and run

```bash
npm install
npm test
npm start
```

Server: `http://localhost:3000`

The SQLite database is created automatically at `data/school_inventory.db` on first start. The database file is ignored by Git.

## Demo accounts

- **admin / admin123**
- **staff / staff123**

These accounts are seeded automatically for local school-project testing.

## Main endpoints

- `POST /auth/login`
- `/products` CRUD
- `/supplies` legacy alias for products
- `/customers` CRUD
- `/suppliers` CRUD
- `/sales` CRUD with automatic stock deduction/restoration
- `GET /dashboard` (Bearer authentication)
- `GET /reports/inventory` (Bearer authentication)
- `GET /reports/sales` (Bearer authentication)
- `GET /reports/low-stock` (Bearer authentication)
- `GET /reports/transactions` (Bearer authentication)

## Database tables

`users`, `products`, `suppliers`, `customers`, `sales`, `sale_items`, and `stock_transactions`.

Foreign keys and indexes are enabled by the database layer.

## Response format

```json
{"status":200,"data":{},"error":null}
```

Validation errors return 422, authorization failures 403, authentication failures 401, and missing records 404.
