# Week 11 - AI Fix Review Prompt Log

Contributor: casidaregine123-byte

## Prompt used

Review the P1 finding from Week 10 involving user-entered text rendered in list views. Propose the smallest safe fix that preserves existing table behavior, add a regression test, and identify one small technical-debt cleanup suitable for a release hardening week. Also review environment loading so the app works both locally with an optional .env file and on a hosted platform using injected environment variables. Do not add new features and do not include credentials.

## Review result

- Dynamic list values are now escaped before HTML rendering.
- Status values are constrained to a safe character set before being used as CSS badge classes.
- A focused Week 11 regression test was added.
- The environment loader was simplified to use Node's built-in environment-file support only when a local .env file exists.
- The unnecessary dotenv dependency was removed.

## Human review

The contributor kept the changes limited to release hardening and checked that existing application routes were not intentionally changed.
