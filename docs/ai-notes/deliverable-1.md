# Week 2 AI Scope-Stress-Test Note

## Required use

The Week 2 handout permits AI as a thinking partner for stress-testing scope. The team remains responsible for deciding what stays in scope.

## Prompt used

> Review the Week 2 backlog for a five-person student team building a School Supply Store Inventory and Sales Management System in about 10 weeks. Check whether CRUD operations are missing for Products/School Supplies, Suppliers, Customers, and Sales/Transactions. Check for missing list, detail, create, edit, empty, error, and delete-confirmation states. Identify features that could inflate scope and suggest what to keep small. Do not add unrelated features.

## AI findings

### CRUD coverage
The four primary record types each have:
- Create
- Read list/index
- Read detail
- Update
- Delete with confirmation

This gives 20 core CRUD stories.

### State coverage
Each record type has wireframes for:
- List/index
- Detail
- Create form
- Edit form
- Empty state
- Error state
- Delete confirmation

### Scope risks
The following features should remain outside the Week 2 core backlog unless the team later has capacity:
- Online payments
- Customer accounts or loyalty programs
- Barcode-scanner hardware integration
- Supplier purchasing portal
- Email/SMS notification service
- Multi-branch inventory
- Advanced analytics
- Mobile application
- AI chatbot
- Complex role/permission hierarchy

### Keep the core system small
The core system should remain a CRUD application for school supplies, suppliers, customers, and sales. Inventory quantity changes should be tied to the existing sales workflow rather than creating a separate large warehouse-management subsystem.

## Team decision

The team will use the four-record CRUD backlog and the listed screen/state wireframes as the Week 2 baseline. Additional features should be treated as future backlog items and should not be added to the Phase 3 build unless the team explicitly decides they are feasible.

## Evidence

The final backlog is in:
`/docs/backlog.md`

The low-fidelity wireframes are in:
`/docs/wireframes/`

This note is saved at the required path:
`/docs/ai-notes/deliverable-1.md`
