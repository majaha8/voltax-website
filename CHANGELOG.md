# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

- Site redesigned and rebranded as **Voltax**: new navigation, Gallery page,
  services catalogue, team section, and contact form.

### Fixed

- `npm start` now uses the bundled zero-dependency server (`server.js`)
  instead of `npx serve`, which failed intermittently with
  "could not determine executable to run".
- Added `style.css`, the stylesheet for the new design (pages referenced a
  stylesheet that did not exist).
- `script.js` now defines `toggleMenu()` (mobile menu) and `submitForm()`
  (contact form), which the new pages call inline.
- Restored favicon links on all pages.
- Test suite extended: covers `gallery.html`, verifies every CSS class used
  in HTML is defined in `style.css`, and checks inline-called JS functions exist.

## [1.1.0] - 2026-08-21

### Added

- Project scaffolding: `src/`, `public/`, `tests/`, and `docs/` directories.
- `package.json` with `start`, `test`, and `lint` scripts.
- Smoke test suite (`tests/smoke.test.js`) run via the Node.js built-in test runner.
- Favicon (`public/favicon.ico`) linked on all pages.
- Documentation: `INSTALLATION.md`, `API.md`, `USER_GUIDE.md`.
- Repository hygiene files: `.gitignore`, `.env.example`, `SECURITY.md`,
  `CONTRIBUTING.md`.

## [1.0.0] - 2026-08-21

### Added

- Initial release of the Volt-Watt Electrical website.
- Pages: Home (`index.html`), About (`about.html`), Services (`services.html`),
  Contact (`contact.html`).
- Global stylesheet (`styles.css`) with responsive layout, dark theme, and
  scroll-reveal animations.
- Client-side behaviour (`script.js`): sticky header, mobile menu, active nav
  highlighting, scroll reveal, and quote form confirmation.
