# Week 12 — Final Retrospective

## Purpose

This document records the team's final retrospective for the School Supply Store Inventory and Sales Management System. It separates repository-verifiable observations from items that must be confirmed by the team during the final session.

## What went well

### Repository-verifiable observations

- The project evolved from a CRUD-oriented Node.js/Express application into a MySQL-backed inventory and sales system.
- The repository contains API routes for authentication, dashboard data, products, suppliers, customers, sales, stock transactions, and reports.
- The UI contains dashboard, list, detail, create, and edit screens for the main record types.
- Async Fetch binding, loading states, feedback handling, and failure-path handling were added across the interface.
- A Week 10 P1 issue involving unsafe rendering of user-entered list data was identified and later fixed in Week 11.
- The application was deployed to Railway with a MySQL production database.

## What was difficult

### Repository/history observations

- The project required multiple stages of routing, validation, UI binding, QA, bug fixing, and deployment before reaching the final stage.
- Earlier project documentation contains items that still require real team evidence, including some board ownership, review records, and manual live-test results.
- Deployment and browser smoke testing need to be verified from the final deployed build before submission.

## What we would improve next time

The team should confirm these improvement points during the live retrospective:

1. Start with a complete five-person ownership map earlier and keep the GitHub board synchronized with every branch and pull request.
2. Run browser-level end-to-end tests earlier instead of relying mainly on automated API and regression tests.
3. Keep implementation and documentation synchronized as the stack changes, especially when moving to MySQL and a hosted deployment.
4. Reserve dedicated time for the final presentation, backup demo materials, and individual code-defense rehearsal.

## Team discussion record

The following questions must be answered by the team during the final session:

| Question | Team answer |
|---|---|
| What was our strongest technical decision? | |
| What caused the most rework? | |
| Which bug taught us the most? | |
| What would we design differently from the beginning? | |
| What did we learn about Git collaboration and pull requests? | |
| What did we learn about testing and failure handling? | |
| What did we learn about deployment and environment configuration? | |

## Evidence rule

Do not mark a team-only item complete until the team has actually discussed it and entered the real answer. This document is a structured retrospective, not a substitute for the team's live discussion.
