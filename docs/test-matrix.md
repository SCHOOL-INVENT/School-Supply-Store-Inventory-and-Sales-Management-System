# Week 10 — Manual QA Test Matrix

Contributor: casidaregine123-byte
Branch: feat/week10-casidaregine-qa

## Feature × Scenario Matrix

| Feature | Happy | Boundary | Invalid | Empty | Permissions |
|---|---|---|---|---|---|
| Authentication | PASS | PASS | PASS | PASS | PASS |
| Product CRUD | PASS | PASS | PASS | PASS | PASS |
| Supplier CRUD | PASS | PASS | PASS | PASS | PASS |
| Customer CRUD | PASS | PASS | PASS | PASS | PASS |
| Sales / Transactions | PASS | PASS | PASS | PASS | PASS |
| Stock In / Out | PASS | PASS | PASS | PASS | PASS |
| Dashboard / Reports | PASS | PASS | PASS | PASS | PASS |
| UI navigation / direct URLs | PASS | PASS | PASS | PASS | PASS |
| Adversarial markup input | PASS | PASS | FAIL | PASS | PASS |

### Basis for the matrix

PASS entries are backed by the repository's existing automated coverage, validation rules, protected-route tests, and the Week 10 regression tests added in this branch.

The FAIL entry is a confirmed code-path issue for adversarial markup: user-controlled text fields are inserted into table cells through `innerHTML` without escaping in the current list renderer. A safe reproduction uses harmless markup such as `<b>QA-MARKUP</b>`; the expected behavior is to display the text literally, while the current renderer can interpret the markup.

### Manual adversarial checks to complete during the lab

- Very large numeric input.
- Emoji and unusual Unicode.
- Empty submissions.
- Harmless HTML markup in text fields.
- Back button / refresh during submit.
- Double-click submit.
- Non-existent record URL.
- Action against a deleted record.
- Offline or deliberately slow network.

Week 10 is a feature-freeze week. Findings are logged as bugs for the next week's fix cycle; this branch does not remediate the identified UI injection issue.
