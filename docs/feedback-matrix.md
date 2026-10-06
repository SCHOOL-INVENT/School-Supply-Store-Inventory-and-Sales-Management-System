# Deliverable 3 — Feedback Matrix

## Screen / action coverage

| Screen or action | Loading | Success | 422 | 404 | 500 | Network |
|---|---|---|---|---|---|---|
| Product create | YES | YES | YES | N/A | YES | YES |
| Product edit | YES | YES | YES | YES | YES | YES |
| Supplier create/edit | YES | YES | YES | YES | YES | YES |
| Customer create/edit | YES | YES | YES | YES | YES | YES |
| Sale create/edit | YES | YES | YES | YES | YES | YES |
| Product list | YES | YES | N/A | N/A | YES | YES |
| Supplier list | YES | YES | N/A | N/A | YES | YES |
| Customer list | YES | YES | N/A | N/A | YES | YES |
| Sales list | YES | YES | N/A | N/A | YES | YES |
| Product / customer details | YES | YES | N/A | YES | YES | YES |
| Delete action | YES | YES | N/A | YES | YES | YES |
| Stock in / out | YES | YES | YES | YES | YES | YES |

## Feedback conventions

- Loading states are shown in a form message area and submit controls are disabled while requests are pending.
- Validation failures are shown as human-readable messages and the invalid field is highlighted when the backend supplies a field name.
- Missing records use a friendly not-found message.
- Server failures use a non-technical retry message rather than raw stack traces.
- Network failures use a connection/retry message.
- Successful writes confirm completion before returning to the relevant list.

## Reusable components

- Sidebar/navigation
- Topbar
- Buttons and action groups
- Tables and list rows
- Status badges
- Form fields
- Loading/error/success message box
- Delete confirmation modal
- Toast notifications
