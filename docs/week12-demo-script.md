# Week 12 — Presentation & Live Demo Script

## Presentation arc

Follow the required sequence:

Problem → Solution → Architecture → Live Demo → What We Learned

### 1. Problem

Explain the store's original problem: inventory, suppliers, customers, stock movements, and sales are difficult to track consistently with manual records.

### 2. Solution

Present the School Supply Store Inventory and Sales Management System as the centralized solution.

Highlight:
- Product and inventory management
- Supplier and customer records
- Sales and stock transactions
- Dashboard and reports
- Validation and human-readable error feedback
- MySQL-backed persistence

### 3. Architecture

Explain one request from browser to database:

Browser UI → Express route → authentication and validation → controller and data layer → MySQL → JSON response → UI feedback

Use one concrete example such as creating a product or recording a sale.

### 4. Live demo click path

Use the deployed Railway application, not localhost.

Suggested path:

1. Open the deployed UI entry.
2. Sign in.
3. Open Dashboard and point out the main statistics.
4. Open Products and show the list.
5. Create a product and show that it appears in the list.
6. Open the product detail.
7. Edit the product and show the changed values.
8. Delete the test product using the confirmation flow.
9. Open Stock and demonstrate a stock movement.
10. Open Sales and record a sale.
11. Return to Dashboard and show updated sales and inventory information.
12. Show the Low Stock Alerts section when applicable.

## Required graceful failure

During the demo, intentionally submit invalid product data.

Expected behavior:
- The request is rejected with validation feedback.
- The UI shows a human-readable error.
- The user remains on the form instead of seeing a blank page or raw server error.

Do not invent a successful result during rehearsal; record the actual observed behavior.

## Backup demo

Prepare screenshots or a short screen recording covering:
- Sign-in
- Dashboard
- Product list
- Product create and edit
- Sale transaction
- Validation failure

## Presenter assignment

Fill this in before presenting:

| Team member | Presentation/demo part |
|---|---|
| | Problem |
| | Solution |
| | Architecture |
| | Live demo |
| | Lessons learned |

## Defense reminder

Each member must explain their own code without AI during the oral defense. Be ready to explain:
- Why the approach was chosen
- What happens with invalid input
- What happens when a record is missing
- Where validation is implemented
- What the member would improve
