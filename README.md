# School Supply Store Inventory and Sales Management System

A small CRUD-shaped system for managing school-supply products, suppliers, customers, inventory transactions, and sales.

## Week 1 — Project Scaffolding

### Problem statement

The school supply store needs a simple way to keep its inventory records organized because supplies, stock quantities, suppliers, customers, and sales can become difficult to track consistently using manual records. The proposed School Supply Store Inventory and Sales Management System will provide a centralized application where authorized users can create, view, update, and delete supply records, monitor stock levels, manage suppliers and customers, and record sales transactions. The project is intentionally scoped to a small CRUD-based system that can be developed and tested within the course schedule.

### Main record types

1. **Products / School Supplies** — item name, category, quantity, unit price, status, and supplier.
2. **Suppliers** — supplier name and contact information.
3. **Customers** — customer name and contact information.
4. **Sales / Transactions** — customer, items purchased, quantities, prices, total, and transaction date.

### Project stack

- Node.js
- Express
- SQLite database
- GitHub
- REST API

### Team roster

Replace the placeholders below with the five team members and starting roles.

| Member | Starting role |
|---|---|
| Team Member 1 | Repo Lead |
| Team Member 2 | Board Lead |
| Team Member 3 | Scribe |
| Team Member 4 | Builder |
| Team Member 5 | Builder |

### Git collaboration loop

`pull main → create branch → commit → push branch → open PR → review → merge`

Direct pushes to `main` should be blocked after branch protection is configured.

### Week 1 deliverables

- [x] Project selected
- [x] Problem statement documented
- [x] 4 core record types documented
- [x] Git repository initialized
- [x] Week 1 documentation added through a branch
- [ ] Add all 5 collaborators
- [ ] Enable and test main branch protection
- [ ] Create GitHub Project board
- [ ] Create and assign at least 4 Week 1 tickets
- [ ] Merge the README PR after a team-member review

See `docs/week1/` for the Week 1 problem statement, AI brainstorming note, and board setup checklist.


## Week 2 — Backlog & Wireframes

Week 2 deliverables are documented in:

- `docs/backlog.md` — 20 CRUD user stories covering Products, Suppliers, Customers, and Sales/Transactions, with acceptance criteria.
- `docs/wireframes/` — low-fidelity wireframes for list, detail, create, edit, empty, error, and delete-confirmation states for each record type.
- `docs/ai-notes/deliverable-1.md` — AI scope stress-test prompt, findings, and team decision.

The Week 2 handout requires every story to be an owned board ticket, every story to have acceptance criteria, and the wireframes to be committed through a reviewed pull request.


## Week 3 — Routing Skeleton

- `docs/routes.md` — complete 20-route REST routing table and request/response examples.
- `docs/week3.md` — Week 3 implementation and testing checklist.
