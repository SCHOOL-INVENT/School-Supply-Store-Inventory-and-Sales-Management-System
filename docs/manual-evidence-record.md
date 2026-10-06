# Manual Evidence Record

This template is for tests that must be performed by the team in the browser or live environment.

## Tester
- Name:
- GitHub username:
- Date/time:

## Environment
- Local or Railway:
- URL:

## Test Results

| Test | Expected | Actual observation | Pass/Fail |
|---|---|---|---|
| Create record | Record persists and appears in list | | |
| View record | Detail page shows stored data | | |
| Edit record | Changed values persist | | |
| Delete record | Confirmation then removal | | |
| Invalid input | Human-readable 422 feedback | | |
| Missing record | Friendly 404/not-found feedback | | |
| Server failure | Human-readable failure feedback | | |
| Network interruption | Connection/retry feedback | | |
| Double submit | Submit control stays disabled while pending | | |
| Refresh/back during submit | No misleading duplicate or blank state | | |
| Stale/deleted record action | Clear not-found response | | |
| Unusual Unicode/markup | Input is displayed safely as text | | |

## Notes

Only enter results after the test has actually been performed. This template supports evidence; it does not replace the required manual test.