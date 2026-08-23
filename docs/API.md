# API Reference

This is a static website with no backend. This document describes the
client-side "API": the global behaviour provided by `script.js`, the DOM
contracts pages must honour, and the form contract for a future backend.

## Client-Side Behaviour (`script.js`)

`script.js` runs on every page and exposes two globals that pages call
inline, plus automatic behaviour:

| Feature              | Trigger                          | Behaviour                                                        |
| -------------------- | -------------------------------- | ---------------------------------------------------------------- |
| Mobile menu          | `onclick="toggleMenu()"` on `.nav-toggle` | Toggles `.open` on `.nav-links`, updates `aria-expanded` and button glyph |
| Click-outside close  | any click outside `.nav`         | Closes an open mobile menu                                       |
| Active nav link      | `.nav-links a`                   | Adds `.active` to the link matching the current filename         |
| Contact form         | `onsubmit="submitForm(event)"`   | Native validation, shows `.form-success`, resets form (client-side only) |

### DOM Contract

- Every page includes `<nav class="nav">` with `.nav-links` and a
  `.nav-toggle` button calling `toggleMenu()`.
- The contact page form must contain a `.form-success` element (initially
  `display:none`) inside the `<form>`.
- Missing elements are skipped silently — pages only include what they need.

## Quote Form Contract

Current state: **no data leaves the browser**. On submit the site validates
with native HTML5 constraints, shows `.form-success`, and resets the form.

When a backend is introduced, the form should POST JSON to the endpoint named
in the `QUOTE_FORM_ENDPOINT` environment variable:

```http
POST {QUOTE_FORM_ENDPOINT}
Content-Type: application/json

{
  "name": "string (required)",
  "phone": "string (required)",
  "email": "string (optional)",
  "service": "string (one of the services listed on services.html)",
  "message": "string (required)"
}
```

Expected responses:

| Status              | Meaning                                  |
| ------------------- | ---------------------------------------- |
| `200` / `201`       | Success — show confirmation panel        |
| `400`               | Validation error — show field errors     |
| `429` / `5xx`       | Failure — show retry message             |

Server-side validation is mandatory; client-side validation is convenience
only.

## Static Assets

| Asset                 | Path                  |
| --------------------- | --------------------- |
| Favicon               | `public/favicon.ico`  |
| Images                | `public/images/`      |
| Icons                 | `public/icons/`       |

## External Services

- **Google Fonts** — Oswald, Inter, Space Mono (loaded via `<link>`).
  If offline, the site falls back to system fonts.
