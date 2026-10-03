# Week 7 Binding Tests

## Scope

The Week 7 UI bindings use Fetch to connect Create and Update forms to the Phase 2 controllers. The UI handles loading, success, 422 validation errors, and general/network errors.

## End-to-end test checklist

| Case | Action | Expected result |
|---|---|---|
| Product create | Open Products → Add Product → submit valid data | POST /products returns 201, then Products list reloads and shows the record |
| Product update | Click Edit on an existing product | GET /products/:id pre-fills the form; PUT saves changes and the list reloads |
| Supplier create | Submit valid supplier | POST /suppliers returns 201 and the new supplier appears |
| Supplier update | Edit an existing supplier | PUT /suppliers/:id persists the change |
| Customer create | Submit valid customer | POST /customers returns 201 and the new customer appears |
| Customer update | Edit an existing customer | PUT /customers/:id persists the change |
| Sale create | Select a product, quantity, and optional customer | POST /sales returns 201 and inventory is reduced by the backend |
| Sale update | Edit an existing sale | PUT /sales/:id persists the replacement sale |
| Invalid input | Submit an invalid required/range value | 422 response is shown visibly in the form and the submit button is re-enabled |
| Loading | Submit any form while the request is pending | Button is disabled and saving/loading feedback is visible |
| Network/server error | Stop/unavailable backend and submit | General error is shown; the UI does not crash |

## Execution note

The repository changes implement the above checks, but a live browser/database run was not available from the GitHub editing environment used to prepare this branch. The team should run the checklist locally and record the observed results before merging.
