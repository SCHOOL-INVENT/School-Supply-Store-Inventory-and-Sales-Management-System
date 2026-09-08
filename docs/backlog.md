# School Supply Store Inventory and Sales Management System

## Project Backlog

| ID | User Story | Priority | Acceptance Criteria |
|---|---|---|---|
| US-01 | As an administrator, I want to log in securely so that only authorized users can access the system. | High | 1. Valid credentials allow access. 2. Invalid credentials are rejected. 3. Protected dashboard/report routes require authentication. |
| US-02 | As an administrator, I want to add school supplies so that new products can be recorded. | High | 1. Required product fields are validated. 2. A valid product is saved. 3. The product appears in inventory. |
| US-03 | As an administrator, I want to view school supplies so that I can monitor available products. | High | 1. Inventory returns products. 2. Key fields are shown. 3. A product can be retrieved by ID. |
| US-04 | As an administrator, I want to update product information so that inventory records stay accurate. | High | 1. Editable fields are validated. 2. A valid update changes the record. 3. Unknown IDs return 404. |
| US-05 | As an administrator, I want to delete products so that unavailable products can be removed. | Medium | 1. Only admin/owner can delete. 2. Successful deletion removes the product. 3. Unknown IDs return 404. |
| US-06 | As a store staff member, I want to record sales so that transactions are properly documented. | High | 1. A sale records selected products and quantities. 2. Invalid sale data is rejected. 3. A successful sale receives a transaction ID. |
| US-07 | As a store staff member, I want the system to calculate the total amount automatically so that sales recording is easier. | High | 1. Line totals use quantity and price. 2. Transaction total equals line totals. 3. Total is returned. |
| US-08 | As a store staff member, I want inventory to update after every sale so that stock records remain accurate. | High | 1. Sold quantity is deducted. 2. Overselling is rejected. 3. Inventory reflects completed sales. |
| US-09 | As an administrator, I want to view low-stock products so that I know which supplies need restocking. | Medium | 1. Low-stock products can be listed. 2. Threshold is applied consistently. 3. Products above threshold are excluded. |
| US-10 | As an administrator, I want to generate inventory and sales reports so that I can monitor store performance. | Medium | 1. Inventory report works. 2. Sales report works. 3. Reports return structured data. |

## Wireframe-to-Story Mapping

| Story | Wireframe | Screen |
|---|---|---|
| US-01 | `docs/wireframes/US-01-login.png` | Login Page |
| US-03 | `docs/wireframes/US-03-dashboard.png` | Dashboard |
| US-02, US-04, US-05, US-09 | `docs/wireframes/US-02-inventory.png` | Inventory Page |
| US-06, US-07, US-08 | `docs/wireframes/US-06-sales.png` | Sales Page |
| US-10 | `docs/wireframes/US-10-reports.png` | Reports Page |

## Record Types

Products/Supplies, Customers, Suppliers, and Sales Transactions.
