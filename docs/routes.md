# Routes and Controller Map

All successful responses use `{ status, data, error }`. Validation failures use HTTP 422; authorization failures use HTTP 403; missing resources use HTTP 404.

| Resource | GET list | GET one | POST | PUT | DELETE | Controller |
|---|---|---|---|---|---|---|
| Products | `/products` | `/products/:id` | `/products` | `/products/:id` | `/products/:id` | `productsController.js` |
| Supplies (legacy alias) | `/supplies` | `/supplies/:id` | `/supplies` | `/supplies/:id` | `/supplies/:id` | `suppliesController.js` -> products |
| Customers | `/customers` | `/customers/:id` | `/customers` | `/customers/:id` | `/customers/:id` | `customersController.js` |
| Suppliers | `/suppliers` | `/suppliers/:id` | `/suppliers` | `/suppliers/:id` | `/suppliers/:id` | `suppliersController.js` |
| Sales | `/sales` | `/sales/:id` | `/sales` | `/sales/:id` | `/sales/:id` | `salesController.js` |

Additional routes: `/orders` is a sales alias; `/products/search`, `/products/low-stock`; `/auth/login`; `/dashboard`; `/reports/inventory`; `/reports/sales`; `/reports/low-stock`; `/reports/transactions`.

Flow: request -> route -> validation/auth middleware -> controller -> data layer -> standardized JSON response.
