# Week 4 — Input Validation & Defensive Coding

## Phase 2 — The Logic Engine

This week's implementation applies the Week 4 lecture principles to the School Supply Store Inventory and Sales Management System:

- Never trust client input.
- Validate on the server before business logic runs.
- Distinguish validation from sanitization.
- Use guard clauses and fail fast.
- Return one predictable error shape.
- Keep authentication and authorization separate from validation.
- Test bad input deliberately so invalid requests do not become 500 errors.

> AI-use note: The team is following the instructor's explicit permission that AI assistance is allowed for this project. The team reviewed and adapted the resulting code and remains responsible for the final implementation and tests.

## Defensive request flow

`request → validation/authorization → controller → service/data layer → response`

Invalid input stops at validation with HTTP 422.

## Standard validation error

```json
{
  "status": 422,
  "data": null,
  "error": "quantity must be an integer from 0 to 9999",
  "field": "quantity"
}
```

The API does not expose stack traces or raw database errors to clients.

## Authentication vs. authorization

- Authentication answers: **Who are you?**
- Authorization answers: **What are you allowed to do?**

Protected delete operations return 401 when authentication is missing/invalid and 403 when the authenticated user lacks the required permission.

## Break-the-app checks

The Week 4 tests intentionally send:

- missing required fields
- wrong data types
- negative/out-of-range quantities
- invalid prices
- invalid status values
- unknown fields
- empty update bodies
- invalid supplier/customer fields
- empty or malformed sale items
- invalid product/customer references
- insufficient stock requests
- missing resources
- unauthenticated protected actions

Expected behavior is a controlled 4xx response, never a server crash or an unexpected 500 caused by client input.
