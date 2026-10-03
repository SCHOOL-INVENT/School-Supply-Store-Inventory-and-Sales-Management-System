# Validation Rules

All create and update routes validate input before the controller executes. Validation uses guard clauses and returns the standard 422 envelope: `{ status: 422, data: null, error: "Validation message", field: "fieldName" }`. Bad input must return 422, not 500.

## Products / School Supplies

### POST /products
Required: `name`, `category`, `quantity`, `unitPrice`, `status`.

- name: string, 2–100 characters
- category: string, 2–50 characters
- quantity: integer from 0–9999
- unitPrice: non-negative number with at most 2 decimal places
- status: `in-stock`, `low-stock`, or `out-of-stock`
- supplierId, when supplied, must be a positive integer
- unknown fields are rejected

### PUT /products/:id
Partial updates are allowed, but at least one field is required. Any supplied field follows the same type/range rules as POST.

## Suppliers

### POST /suppliers
Required: `name` and `contact`. Optional: `email`, `address`. The body must be a JSON object and required fields cannot be blank.

### PUT /suppliers/:id
The current implementation uses the same required-field guard as supplier creation, so `name` and `contact` must be present and non-blank.

## Customers

### POST /customers
Required: `name` and `contact`. Optional: `email`, `address`. The body must be a JSON object and required fields cannot be blank.

### PUT /customers/:id
The current implementation uses the same required-field guard as customer creation, so `name` and `contact` must be present and non-blank.

## Sales / Transactions

### POST /sales
Required: a non-empty `items` array. Each item needs a positive integer `productId` and `quantity`. Optional `customerId` must be a positive integer. Business validation checks that the customer/products exist and that requested quantities do not exceed stock.

### PUT /sales/:id
Uses the same item validation as POST. The controller restores the existing sale quantities, validates the replacement, then applies the replacement quantities.

## Standard status behavior

| Condition | Status |
|---|---:|
| Missing/invalid input | 422 |
| Missing resource | 404 |
| Invalid credentials | 401 |
| Missing authentication | 401 |
| Insufficient authorization | 403 |
| Successful create | 201 |
| Successful read/update/delete | 200 |

## Separation of responsibilities

Route → validation/authorization → controller → data layer → response.

Validation does not perform persistence. Controllers coordinate operations and return the response envelope. Data modules handle persistence.
