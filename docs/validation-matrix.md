# Week 4 Validation Matrix

The matrix is the team's field-by-field defensive-coding checklist.

| Resource | Field | Required | Type / Format | Range / Allowed Values | Failure |
|---|---|---:|---|---|---|
| Product | name | Yes on create | string | 2–100 chars | 422 |
| Product | category | Yes on create | string | 2–50 chars | 422 |
| Product | quantity | Yes on create | integer | 0–9999 | 422 |
| Product | unitPrice | Yes on create | number | >= 0, max 2 decimals | 422 |
| Product | status | Yes on create | string | in-stock, low-stock, out-of-stock | 422 |
| Product | supplierId | No | positive integer | >= 1 | 422 |
| Supplier | name | Yes | string | non-blank, max 100 chars | 422 |
| Supplier | contact | Yes | string | non-blank, max 100 chars | 422 |
| Supplier | email | No | email format | valid email when supplied | 422 |
| Supplier | address | No | string | max 255 chars | 422 |
| Customer | name | Yes | string | non-blank, max 100 chars | 422 |
| Customer | contact | Yes | string | non-blank, max 100 chars | 422 |
| Customer | email | No | email format | valid email when supplied | 422 |
| Customer | address | No | string | max 255 chars | 422 |
| Sale | items | Yes | non-empty array | at least 1 item | 422 |
| Sale item | productId | Yes | positive integer | referenced product must exist | 422 / 404 |
| Sale item | quantity | Yes | positive integer | cannot exceed available stock | 422 |
| Sale | customerId | No | positive integer | referenced customer must exist | 422 / 404 |

## Route-level checks

| Check | Expected response |
|---|---:|
| Missing/invalid input | 422 |
| Missing resource | 404 |
| Missing/invalid authentication | 401 |
| Authenticated but not permitted | 403 |
| Successful create | 201 |
| Successful read/update/delete | 200 |

## Guard-clause rule

Every request validator checks bad cases first and exits immediately. Only validated data reaches controllers and business logic.
