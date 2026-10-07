# Deliverable 4 — QA & Final Evidence Map

## Purpose

This document maps the Deliverable 4 requirements to repository evidence and identifies the items that still require real human or live-environment evidence.

## Team artifact evidence

| Requirement | Repository evidence | Status |
|---|---|---|
| Live public deployment | docs/deployment.md | Present; live browser verification still required |
| End-to-end CRUD | Existing CRUD tests + docs/manual-evidence-record.md | Automated coverage present; live result must be recorded |
| Graceful failures | docs/feedback-matrix.md, docs/week8-tests.md, tests/validation.test.js | Present; live failure checks must be recorded |
| Test matrix | docs/test-matrix.md | Present |
| Expanded automated suite | tests/ plus deliverable-4-final.test.js | Present; run the full suite locally/CI and record the actual result |
| P0/P1 bug list worked down | Week 10 issue #46 and Week 11 fix history | Repository history shows the P1 fix; confirm no other open P0/P1 issues before submission |
| Professional presentation | docs/week12-presentation.md and docs/week12-demo-script.md | Draft prepared; actual presentation remains a class activity |
| Retrospective | docs/retrospective.md | Prepared; team answers must be completed during the real retrospective |

## Individual evidence — Lyndel

The current final-stage contribution is under the GitHub account lyndeloulapad-design.

### Verifiable contribution

- Dashboard Low Stock Alerts feature: PR #51.
- Week 12 final retrospective, demo, and Deliverable 4 documentation: PR #52.
- Final-stage automated smoke/regression checks: tests/deliverable-4-final.test.js in PR #52.

### Human-only requirements

These must not be marked complete from repository content alone:

- Actual live CRUD test results.
- Actual 422, 404, 500/network, pending-control, and unsafe-markup browser checks.
- Actual rehearsal.
- Actual presentation delivery.
- Actual individual unassisted oral defense.
- Any board-only ownership or review evidence not visible in the repository.

## Final submission gate

Before submission, the team should confirm all Definition of Done items from Deliverable 4 and enter only observed results into docs/manual-evidence-record.md.

Do not replace blank evidence fields with assumed or expected results.
