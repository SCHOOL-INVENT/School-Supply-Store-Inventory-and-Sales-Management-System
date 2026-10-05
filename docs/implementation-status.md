# Implementation Status

## Current application status

The application is implemented as a Node.js/Express web application with a MySQL 8+ persistence layer.

### Functional modules

- Product inventory CRUD with validation, search, and low-stock reporting
- Supplier CRUD
- Customer CRUD
- Sales transaction creation, read, update, and delete
- Automatic sale totals using current product prices
- Inventory deduction when a sale is created
- Inventory restoration when a sale is edited or deleted
- Authenticated login with expiring in-memory bearer sessions
- Protected administrative delete operations
- Dashboard with live database values
- Inventory, sales, low-stock, and transaction reports
- Authenticated manual stock-in and stock-out workflow
- Stock movement history
- Responsive HTML/CSS/JavaScript UI
- MySQL schema and demo seed script in `database/schema.sql`
- GitHub Actions integration test environment using MySQL 8

### Database migration

The previous SQLite data layer was replaced by an asynchronous MySQL implementation using `mysql2/promise` and a connection pool. Inventory-changing sale operations use transactions and row-level locks so stock validation and updates happen atomically.

### Verification

Pull Request #41 contains the MySQL migration and the new stock workflow. GitHub Actions is configured to run the Node test suite against MySQL 8. Peer review remains required before the PR is merged.

### Local setup

1. Install Node.js 20+ and MySQL 8+.
2. Create the `school_supply_store` database or run `database/schema.sql`.
3. Copy `.env.example` to `.env` and set the MySQL credentials.
4. Run `npm install`.
5. Run `npm start` and open `http://localhost:3000/ui/`.

Demo accounts are seeded by the schema:
- `admin` / `admin123`
- `staff` / `staff123`

## Historical weekly work

- Backlog, routes, validation, defensive coding, controller tests, async UI binding, and error feedback are retained in the repository documentation for the earlier weekly deliverables.