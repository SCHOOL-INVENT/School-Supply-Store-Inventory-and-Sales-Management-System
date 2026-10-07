# Deliverable 4 — Presentation Deck Content

This is the slide-ready content for the required professional presentation. Convert these sections into the team's final slide deck.

## Slide 1 — Title

School Supply Store Inventory and Sales Management System

Subtitle: QA, Deployment & Final Presentation

Include:
- Team members
- Course/section
- Date

## Slide 2 — Problem

School-supply store records can become difficult to track consistently when products, suppliers, customers, stock movements, and sales are managed manually.

Goal: centralize the records and make common inventory and sales operations easier to manage.

## Slide 3 — Solution

The system provides:
- Product and inventory management
- Supplier management
- Customer management
- Sales transactions
- Stock-in and stock-out tracking
- Dashboard and reports
- Validation and human-readable feedback
- MySQL persistence

## Slide 4 — Architecture

Browser UI
→ Express application
→ Authentication / validation
→ Controllers and data layer
→ MySQL
→ JSON response
→ UI state / feedback

Explain one request end-to-end, such as creating a product.

## Slide 5 — Data Model

Main MySQL entities:
- users
- products
- suppliers
- customers
- sales
- sale_items
- stock_transactions

Explain that sales and stock changes are stored as transactional records and that product quantity is updated as part of inventory operations.

## Slide 6 — Quality & QA

Show the quality evidence:
- Validation tests
- CRUD and integration tests
- Week 9 review tests
- Week 10 QA and regression tests
- Week 11 shipping checks
- Deliverable 4 final smoke/regression tests
- Test matrix and triaged bug history

Do not display a passing percentage unless the team has actually run the suite and recorded the result.

## Slide 7 — Security & Failure Handling

Demonstrate:
- Invalid input → visible validation error
- Missing record → not-found feedback
- Server/network failure → human-readable feedback
- Pending form submission → controls disabled
- User-entered markup → rendered safely as text

Also point out that production credentials are kept in environment variables rather than committed to the repository.

## Slide 8 — Deployment

Production host: Railway

Application:
https://school-supply-store-inventory-and-sales-management-production.up.railway.app/ui/

Show the deployed application, not localhost.

## Slide 9 — Live Demo

Recommended sequence:
1. Sign in.
2. Dashboard.
3. Products list.
4. Create product.
5. View product details.
6. Edit product.
7. Delete product with confirmation.
8. Stock movement.
9. Record a sale.
10. Return to dashboard.
11. Demonstrate an invalid submission and show the error.

Prepare screenshots or a short recording as backup.

## Slide 10 — What We Learned

Discuss:
- Why small, reviewed branches reduce risk.
- Why automated tests are useful as a safety net.
- Why validation and clear errors improve usability.
- Why environment-specific configuration belongs outside source code.
- Why live deployment testing differs from localhost testing.
- What the team would change on the next project.

## Slide 11 — Individual Defense

Each member should be ready to explain their own contribution without AI:
- What code did I change?
- Why was this approach chosen?
- What happens with invalid input?
- What happens when a record is missing?
- Where is validation implemented?
- What would I improve?

## Slide 12 — Closing

From idea → CRUD → validation → UI binding → QA → deployment → final defense

Thank the reviewers and transition to questions.
