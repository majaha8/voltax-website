# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.1.x   | :white_check_mark: |
| < 1.1   | :x:                |

## Reporting a Vulnerability

If you discover a security vulnerability in this website, please report it
responsibly:

1. **Email:** `info@voltax.co.za`
2. Include a description of the issue, steps to reproduce it, and the
   affected page(s).
3. Do **not** open a public GitHub issue for security problems.

You can expect an initial response within 72 hours. We ask that you give us
a reasonable amount of time to fix the issue before any public disclosure.

## Scope

This is a static marketing site. Areas of interest include:

- Cross-site scripting via form inputs or URL parameters.
- Injection of unvalidated content into any page.
- Misconfigured headers or exposed environment files if deployed with a backend.

The contact/quote form currently performs client-side validation only and does
not transmit data to a server. Any future backend integration must validate and
sanitise all input server-side.
