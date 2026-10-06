# Week 9 AI Review Prompt Log

Contributor: casidaregine123-byte

## Prompt used
Review the Express UI/static-file serving in this project for deployment reliability. Identify one concrete flaw that could cause the browser UI or CSS to fail after deployment, explain why it happens, propose a minimal safe fix, and suggest automated regression tests. Preserve existing application behavior and do not include credentials or secrets.

## AI-assisted result reviewed by the contributor
The review identified the use of relative filesystem paths in the Express static middleware as the concrete issue to address. The proposed fix was to resolve UI and CSS directories from `__dirname` and add an explicit `/ui/` route.

## Validation performed
The contribution adds `tests/week9-review.test.js` to check that:
- `GET /ui/` returns HTTP 200 and references the login entry page.
- `GET /ui/css/styles.css` returns HTTP 200 and includes the application's CSS variables.

## Contributor judgment
The change was kept narrow and focused on deployment reliability. Existing application routes and existing test files were not intentionally changed.
