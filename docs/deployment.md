# Week 11 - Deployment Notes

Contributor: casidaregine123-byte

## Live host
Railway:
https://school-supply-store-inventory-and-sales-management-production.up.railway.app

Application entry:
https://school-supply-store-inventory-and-sales-management-production.up.railway.app/ui/

## Environment configuration
Production database values are supplied by Railway service variables and mapped to the application's DB_* variables.

The repository does not contain production passwords or other deployment credentials.

Local development may use a .env file. The application now loads that file only when it exists, while hosted environments continue using the platform-provided environment.

## Database
The production service uses Railway MySQL. The application initializes the required schema at startup through its database initialization routine.

## Week 11 fix
Week 10 Issue #46 identified unsafe rendering of user-entered list data. This branch fixes the issue by escaping dynamic values before they are inserted into HTML, while preserving the existing status badge markup through a whitelist.

## Smoke-test record
The Railway service and API root were observed running during deployment. The browser UI should be rechecked against the live /ui/ URL after this Week 11 branch is deployed.

Happy-path checks:
- sign in
- open products
- create, view, edit, and delete a record
- record stock movement
- record a sale

Failure-path check:
- submit invalid product data and confirm the API/UI still reports a validation error.

## Release notes
- P1 bug addressed on a dedicated branch.
- Environment handling simplified.
- No new feature work added.
- Focus remains on stabilization and shipping.
