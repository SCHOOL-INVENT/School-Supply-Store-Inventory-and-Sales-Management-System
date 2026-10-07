# Week 2 Backlog — School Supply Store Inventory and Sales Management System

## Scope
Primary record types from Week 1:
1. Products / School Supplies
2. Suppliers
3. Customers
4. Sales / Transactions

Every record type has Create, Read-list, Read-detail, Update, and Delete stories. Every story has acceptance criteria.

> **Ownership:** The repository now uses named members for all 20 stories. The GitHub Project board still requires human verification. The Week 2 handout requires each story to be an owned ticket.

## Products / School Supplies

### P01 — Create product
**As a** store staff member, **I want to** add a new school supply **so that** the item can be tracked in inventory.
- Name, category, quantity, and unit price are required.
- Negative quantity and negative price are rejected.
- After saving, the product appears in the product list.
**Owner:** jhairamonteagudo597-eng

### P02 — Product list
**As a** store staff member, **I want to** view the product list **so that** I can see current inventory records.
- The list shows product name, category, quantity, price, and status.
- Existing products are displayed from the database.
- An empty state is shown when no products exist.
**Owner:** casidaregine123-byte

### P03 — Product detail
**As a** store staff member, **I want to** view one product's details **so that** I can inspect its complete inventory information.
- Selecting a valid product opens its detail view.
- The detail view shows its stored fields and supplier when available.
- An invalid product ID shows a not-found error.
**Owner:** aaclaracionjr-prog

### P04 — Update product
**As a** store staff member, **I want to** edit a school supply **so that** its inventory information stays accurate.
- Only an existing product can be edited.
- Invalid quantity or price values are rejected.
- Saving shows the updated values in the list/detail view.
**Owner:** Jendylou Lapad

### P05 — Delete product
**As a** store staff member, **I want to** remove an obsolete product **so that** it no longer appears in active inventory.
- The user must confirm before deletion.
- Cancel leaves the product unchanged.
- A successful deletion removes the product from the list.
**Owner:** lyndeloulapad-design

## Suppliers

### S01 — Create supplier
**As a** store staff member, **I want to** add a supplier **so that** products can be associated with their source.
- Supplier name and contact are required.
- Invalid required fields are rejected.
- The saved supplier appears in the supplier list.
**Owner:** casidaregine123-byte

### S02 — Supplier list
**As a** store staff member, **I want to** view suppliers **so that** I can see available suppliers.
- Existing suppliers are listed with contact information.
- The list is populated from the database.
- An empty state is shown when there are no suppliers.
**Owner:** aaclaracionjr-prog

### S03 — Supplier detail
**As a** store staff member, **I want to** view one supplier's details **so that** I can inspect its contact information.
- A valid supplier opens its detail view.
- Stored supplier fields are displayed.
- An invalid supplier ID shows a not-found error.
**Owner:** Jendylou Lapad

### S04 — Update supplier
**As a** store staff member, **I want to** edit supplier information **so that** contact records stay current.
- Only an existing supplier can be edited.
- Required fields cannot be blank.
- Saved changes appear in the supplier list/detail view.
**Owner:** lyndeloulapad-design

### S05 — Delete supplier
**As a** store staff member, **I want to** remove an obsolete supplier **so that** supplier records remain current.
- A confirmation step is required.
- Cancel keeps the supplier.
- A successful deletion removes the supplier when it has no blocking dependency.
**Owner:** jhairamonteagudo597-eng

## Customers

### C01 — Create customer
**As a** store staff member, **I want to** add a customer **so that** sales can be associated with the correct customer.
- Customer name and contact are required.
- Invalid required fields are rejected.
- The saved customer appears in the customer list.
**Owner:** aaclaracionjr-prog

### C02 — Customer list
**As a** store staff member, **I want to** view customers **so that** I can find existing customer records.
- Existing customers are listed with contact information.
- Records come from the database.
- An empty state is shown when no customers exist.
**Owner:** Jendylou Lapad

### C03 — Customer detail
**As a** store staff member, **I want to** view a customer's details **so that** I can inspect their stored information.
- A valid customer opens its detail view.
- All stored customer fields are displayed.
- An invalid customer ID shows a not-found error.
**Owner:** lyndeloulapad-design

### C04 — Update customer
**As a** store staff member, **I want to** edit customer information **so that** records remain accurate.
- Only an existing customer can be edited.
- Required fields cannot be blank.
- Saved changes appear in the list/detail view.
**Owner:** jhairamonteagudo597-eng

### C05 — Delete customer
**As a** store staff member, **I want to** remove an obsolete customer **so that** inactive records do not clutter the list.
- A confirmation step is required.
- Cancel leaves the record unchanged.
- Successful deletion removes the customer when allowed.
**Owner:** casidaregine123-byte

## Sales / Transactions

### T01 — Create sale
**As a** store staff member, **I want to** record a sale **so that** inventory and sales history stay current.
- A sale requires valid items and positive quantities.
- The system rejects a sale when requested quantity exceeds available stock.
- Successful sale creation records the transaction and updates stock.
**Owner:** Jendylou Lapad

### T02 — Sales list
**As a** store staff member, **I want to** view sales **so that** I can review transaction history.
- Sales show transaction ID, customer, total, and date.
- Existing transactions come from the database.
- An empty state is shown when no sales exist.
**Owner:** lyndeloulapad-design

### T03 — Sale detail
**As a** store staff member, **I want to** view one sale's details **so that** I can inspect its items and total.
- A valid sale opens its detail view.
- Items, quantities, prices, customer, total, and date are shown.
- An invalid sale ID shows a not-found error.
**Owner:** jhairamonteagudo597-eng

### T04 — Update sale
**As a** store staff member, **I want to** edit a sale **so that** an incorrectly recorded transaction can be corrected.
- Only an existing sale can be edited.
- Invalid quantities are rejected.
- Saving recalculates the transaction and keeps inventory consistent.
**Owner:** casidaregine123-byte

### T05 — Delete sale
**As a** store staff member, **I want to** delete an incorrectly recorded sale **so that** the transaction history is accurate.
- A confirmation step is required.
- Cancel leaves the transaction unchanged.
- Successful deletion removes the transaction and restores affected inventory according to the system's transaction rules.
**Owner:** aaclaracionjr-prog

## Acceptance-criteria coverage
All 20 stories above have at least three acceptance criteria. These criteria are intended to become future test cases.

## Ownership distribution
The repository ownership map is distributed across the five named team members above. Board assignment still requires human verification.
