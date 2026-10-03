# Week 8 — Error Handling & User Feedback

Week 8 closes Phase 3 / Deliverable 3. The implementation makes feedback consistent across the existing Week 7 interface.

## Implemented

- Shared `public/ui/js/feedback.js` helper.
- Loading, success, and error feedback across async UI actions.
- Human-readable handling for 422, 404, 500, 401, 403, and network failures.
- Retry actions for failed list loads/deletes.
- Inline field highlighting remains available for 422 responses.
- Delete controls now require confirmation before destructive actions.
- Bearer token is read from localStorage for protected delete endpoints.
- Added a simple sign-in page at `/ui/login.html` to obtain the existing API token.
- Added detail pages with clear not-found/error states.
- Added `docs/week8-tests.md` for deliberate failure-path testing.
- Added `docs/ai-notes/week-08.md` for the required AI prompt log.

## Design rule

The UI never exposes raw stack traces or technical status-code text as the primary user message. It explains what happened and what the user can do next.

## Deliverable 3

The Week 8 handout describes Deliverable 3 as the fully interactive local application where CRUD operates seamlessly. Local execution of the test matrix is still required before merge.
