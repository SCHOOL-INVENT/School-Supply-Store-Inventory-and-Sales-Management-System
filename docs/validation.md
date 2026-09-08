# Validation Matrix

## Products / Supplies

- `name`: required on create, string, 2-100 characters
- `category`: required on create, string, 2-50 characters
- `quantity`: required on create, integer 0-9999
- `unitPrice`: required on create, non-negative number, max 2 decimals
- `status`: required on create, one of `in-stock`, `low-stock`, `out-of-stock`
- `supplierId`: optional positive integer
- Unknown fields are rejected with HTTP 422.

## Customers / Suppliers

`name` and `contact` are required strings. Requests with a non-object body return 422.

## Sales

A sale requires at least one item. Each item needs a positive integer `productId` and `quantity`. Optional `customerId` must be a positive integer and refer to an existing customer. Sales exceeding available inventory return 422.

## Authorization

Deleting products/supplies/customers/suppliers requires role `admin` or `owner`; unauthorized requests return HTTP 403 with the standard error envelope. Dashboard and reports require a valid Bearer token from `/auth/login`.
