# Week 8 — Error Handling & Feedback Test Matrix

Run these tests locally against the real application before merging.

| Scenario | Action | Expected UI |
|---|---|---|
| Normal load | Open each CRUD list | Loading appears, then records/empty state |
| Successful create | Submit valid form | Saving state, then success and refreshed list |
| Successful update | Edit valid record | Loading, then success and refreshed list |
| 422 validation | Submit invalid data | Field is highlighted and a specific message is visible |
| 404 detail | Open a nonexistent ID | Clear “record not found” message |
| 404 update | Edit a deleted/nonexistent record | Clear not-found message |
| 500 | Trigger a server-side failure | Human-readable general error; no stack trace |
| Network failure | Stop backend and load/submit | Connection message plus Try again path |
| Delete cancel | Click Delete, choose Cancel | Nothing is deleted |
| Delete success | Confirm a valid authorized delete | Loading, then deletion and refreshed list |
| Delete 401 | Delete without authentication | “Please sign in…” message |
| Delete 403 | Delete with insufficient role | Permission message |
| Double submit | Submit while request is pending | Control stays disabled |
| Empty state | Open a list with no records | Helpful message plus create action |

## Evidence to record

For each scenario, record Pass/Fail, date, tester, and a short observation before Deliverable 3 submission.
