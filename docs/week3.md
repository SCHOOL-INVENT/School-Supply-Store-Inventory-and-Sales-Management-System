# Week 3 — Routing Skeleton

## Objective

Implement and document the REST routing layer that connects the Week 2 CRUD backlog to Express handlers.

## Route coverage

The system has 20 canonical CRUD routes:

- Products: 5 routes
- Suppliers: 5 routes
- Customers: 5 routes
- Sales / Transactions: 5 routes

Every Week 2 CRUD story has a matching method + path + handler.

## REST mapping

| CRUD | HTTP method |
|---|---|
| Create | POST |
| Read list | GET |
| Read detail | GET /:id |
| Update | PUT /:id |
| Delete | DELETE /:id |

## Implementation

The repository has Express route modules under controllers/routes/ and controller handlers under controllers/.

The routing skeleton is documented in /docs/routes.md.

The existing project uses the standardized response shape:

```json
{
  "status": 200,
  "data": {},
  "error": null
}
```

## Testing checklist

Run locally:

```bash
npm install
npm test
npm start
```

Then verify the five routes for each canonical resource:

- /products
- /suppliers
- /customers
- /sales

For each resource verify list, detail, create, update, and delete. Also test an invalid :id and a wrong method/path.

## AI note

AI was used this week because the instructor authorized AI use. The repository work follows the Week 3 REST conventions and the team's Week 2 CRUD backlog.

## Git workflow

Work is on feat/week3-routing-skeleton and should be merged through a reviewed pull request rather than pushed directly to main.
