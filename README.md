# School Supply Store Inventory and Sales Management System

JavaScript/Node.js REST API for products, customers, suppliers, sales transactions, authentication, dashboard data, low-stock monitoring, and reports.

## Install and run

```bash
npm install
npm test
npm start
```

Server: `http://localhost:3000`

## Main endpoints

- `POST /auth/login`
- `/products` CRUD (and legacy `/supplies` alias)
- `/customers` CRUD
- `/suppliers` CRUD
- `/sales` CRUD (and `/orders` alias)
- `GET /dashboard` (Bearer authentication)
- `GET /reports/inventory` (Bearer authentication)
- `GET /reports/sales` (Bearer authentication)
- `GET /reports/low-stock` (Bearer authentication)
- `GET /reports/transactions` (Bearer authentication)

## Demo accounts

- admin / admin123
- staff / staff123

Demo credentials are for local school-project testing only.

## Response format

```json
{"status":200,"data":{},"error":null}
```

Validation errors return 422, authorization failures 403, authentication failures 401, and missing records 404.

## Documentation

See `docs/backlog.md`, `docs/routes.md`, `docs/validation.md`, and `docs/wireframes/README.md`.
