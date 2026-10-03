# Week 3 Routing Table

## Standard response shape

All API responses follow:

```json
{
  "status": 200,
  "data": {},
  "error": null
}
```

Errors normally return `data: null` and an `error` message. Resource IDs are route parameters read through `req.params.id`.

## Products / School Supplies

| Method | Path | Handler | Week 2 story |
|---|---|---|---|
| GET | `/products` | `getAllProducts` | P02 Product list |
| GET | `/products/:id` | `getProductById` | P03 Product detail |
| POST | `/products` | `createProduct` | P01 Create product |
| PUT | `/products/:id` | `updateProduct` | P04 Update product |
| DELETE | `/products/:id` | `deleteProduct` | P05 Delete product |

## Suppliers

| Method | Path | Handler | Week 2 story |
|---|---|---|---|
| GET | `/suppliers` | `list` | S02 Supplier list |
| GET | `/suppliers/:id` | `get` | S03 Supplier detail |
| POST | `/suppliers` | `create` | S01 Create supplier |
| PUT | `/suppliers/:id` | `update` | S04 Update supplier |
| DELETE | `/suppliers/:id` | `remove` | S05 Delete supplier |

## Customers

| Method | Path | Handler | Week 2 story |
|---|---|---|---|
| GET | `/customers` | `list` | C02 Customer list |
| GET | `/customers/:id` | `get` | C03 Customer detail |
| POST | `/customers` | `create` | C01 Create customer |
| PUT | `/customers/:id` | `update` | C04 Update customer |
| DELETE | `/customers/:id` | `remove` | C05 Delete customer |

## Sales / Transactions

| Method | Path | Handler | Week 2 story |
|---|---|---|---|
| GET | `/sales` | `listSales` | T02 Sales list |
| GET | `/sales/:id` | `getSale` | T03 Sale detail |
| POST | `/sales` | `createSale` | T01 Create sale |
| PUT | `/sales/:id` | `updateSale` | T04 Update sale |
| DELETE | `/sales/:id` | `deleteSale` | T05 Delete sale |

## Request / response examples

### GET list

```http
GET /products
```

Expected successful shape:

```json
{
  "status": 200,
  "data": [],
  "error": null
}
```

### GET detail

```http
GET /products/1
```

The route parameter is read from `req.params.id`.

### POST create

```http
POST /products
Content-Type: application/json
```

Successful creation returns HTTP `201 Created`.

### PUT update

```http
PUT /products/1
Content-Type: application/json
```

Successful update returns HTTP `200 OK`.

### DELETE

```http
DELETE /products/1
```

Successful deletion returns HTTP `200 OK`.

The same REST method/path structure is used for suppliers, customers, and sales.

## Existing project aliases and extra routes

The project also has:
- `/supplies` as a legacy alias for products
- `/orders` as a legacy alias for sales
- `/products/search`
- `/products/low-stock`
- `/auth/login`
- `/dashboard`
- `/reports/inventory`
- `/reports/sales`
- `/reports/low-stock`
- `/reports/transactions`

The four canonical Week 3 CRUD resources are Products, Suppliers, Customers, and Sales.

## Request lifecycle

```
Client request
     ↓
Express route
     ↓
Validation / authorization middleware
     ↓
Controller handler
     ↓
Data layer
     ↓
Standardized JSON response
```

## Route ownership

Every Week 2 story must be represented by a board ticket with an owner. Each team member should own at least one route/story, and changes should be committed on a branch and merged through a reviewed pull request.
