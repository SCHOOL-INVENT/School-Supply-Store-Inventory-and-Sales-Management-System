# Interface & Component Map

## Shared components

- Sidebar and responsive navigation
- Topbar
- Card and stat card
- Button/action group
- Responsive table/list
- Status badge
- Form field
- Loading state
- Empty state
- Error state
- Delete confirmation modal
- Toast notification
- Shared feedback helper

## Screens

Each core CRUD area has list, detail, create, and edit views:

- Products: list, detail, create, edit
- Suppliers: list, detail, create, edit
- Customers: list, detail, create, edit
- Sales/Transactions: list, detail, create, edit
- Dashboard: summary view
- Stock: receive stock, release stock, transaction history
- Login: sign-in flow

## Binding

The UI uses Fetch-based asynchronous requests to the backend API. Create and Update forms submit JSON without a full-page reload, show a pending state, and return the user to the relevant list after successful persistence.

List pages load data from the API and support loading, empty, search, success, and error states. Delete actions use a confirmation modal and refresh the list after success.

## Feedback

public/ui/js/feedback.js centralizes human-readable feedback for validation, not-found, authorization, conflict, server, and general failures. Destructive actions require confirmation.

## AI disclosure

AI-generated or AI-modified work is documented in docs/ai-notes/. Individual contributions should be identified in the applicable prompt log.

## Verification status

The repository contains the implementation and automated regression coverage. Browser-based CRUD and failure-path results must still be recorded as actual observations in docs/manual-evidence-record.md before final submission.
