# Week 9 — Find the Flaw

## Contributor
- GitHub account: casidaregine123-byte
- Contribution branch: feat/week9-casidaregine-contribution

## Finding
The UI was served with relative filesystem paths:

- /ui/css used `express.static("public/css")`
- /ui used `express.static("public/ui")`

This is dependent on the process working directory. A deployment platform can start the application from a different working directory, causing the static UI files to be unavailable even while the Express server is running.

## Why it matters
A running API does not guarantee that the browser-facing UI assets are reachable. This can produce a deployment that reports the service as online while requests for `/ui/` or its CSS fail.

## Fix
The Week 9 contribution uses absolute paths based on `__dirname` and explicitly serves `/ui/` with `sendFile()`.

The implementation is in `app.js`.

## Verification
`tests/week9-review.test.js` adds regression checks for:

1. `GET /ui/` returning HTTP 200 and containing the login entry page.
2. `GET /ui/css/styles.css` returning HTTP 200 and CSS content.

No credentials or secrets are included in this contribution.
