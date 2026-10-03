# Week 5 — Controllers, Tests & Checkpoint

## Scope

Week 5 wires the Week 4 validation layer into thin CRUD controllers and verifies the end-to-end route behavior with automated tests.

The implementation follows this flow:

`route → validation → controller → data/service layer → standardized response`

Controllers receive validated request data, coordinate the required data/service operation, and return the standard response envelope. Validation remains in middleware and persistence remains in the data layer.

## Controllers

The CRUD areas covered are:

- Products
- Suppliers
- Customers
- Sales

Success responses use:

```json
{
  "status": 200,
  "data": {},
  "error": null
}
```

Create operations use HTTP 201. Validation failures use HTTP 422 with the same envelope shape.

## Automated tests

`tests/week5-controllers.test.js` covers each controller area with:

- Happy-path behavior
- Validation-failure behavior
- Missing-record/edge behavior
- Standardized status/data/error assertions

The test suite also verifies that protected product deletion keeps authentication/authorization outside the controller.

Run the full suite with:

```bash
npm test
```

## Individual checkpoint

The Week 5 handout defines an individual checkpoint that must be completed by each team member without AI assistance. This implementation does not complete that individual checkpoint on a member's behalf; each member should perform and document their own checkpoint as required by the handout.

## Deliverable 2 assembly

Week 5 connects the existing Week 3 routes and Week 4 validation with controller logic and automated tests. The branch is intended for review before merging into the team's target branch.
