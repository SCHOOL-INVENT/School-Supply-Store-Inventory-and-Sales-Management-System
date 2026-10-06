# Week 10 - AI QA Prompt Log

Contributor: casidaregine123-byte

## Prompt used

Review the school supply inventory application for Week 10 QA. Build a feature-by-scenario test matrix covering happy, boundary, invalid, empty, and permissions cases. Identify critical automated coverage gaps that can be tested without changing application behavior. Inspect the browser UI for one concrete weakness involving user-entered text, describe a safe reproduction using harmless formatting characters, and document expected versus actual behavior. Do not fix the finding during Week 10 because this is a feature-freeze and bug-hunting week.

## Reviewed result

- Test matrix saved to docs/test-matrix.md.
- Regression coverage added for the UI entry route, a missing UI resource, numeric boundary validation, and customer-name length validation.
- A browser-rendering weakness was identified because list-view text is not consistently escaped before being inserted into the page.
- The finding is recorded for the next fix cycle rather than remediated in this Week 10 contribution.

## Human review

The contributor reviewed the proposed checks and kept the scope focused on correctness, validation, permissions, deployment reliability, and regression coverage. No credentials or secrets are included.
