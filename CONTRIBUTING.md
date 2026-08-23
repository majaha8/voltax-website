# Contributing to Voltax Website

Thanks for your interest in contributing! This is a small static website —
plain HTML, CSS, and vanilla JavaScript. No build step, no framework.

## Getting Started

1. Fork the repository and clone your fork.
2. Serve the site locally (see `docs/INSTALLATION.md`):

   ```bash
   npm start
   ```

3. Make your changes.
4. Run the tests before submitting:

   ```bash
   npm test
   ```

## How the Site Is Organised

| Path                | Purpose                                        |
| ------------------- | ---------------------------------------------- |
| `*.html`            | Pages (Home, About, Services, Gallery, Contact)|
| `style.css`         | All styling — design tokens live in `:root`    |
| `script.js`         | Shared client-side behaviour for every page    |
| `server.js`         | Zero-dependency dev server (`npm start`)       |
| `public/`           | Static assets served as-is (images, icons)     |
| `src/`              | Working area for components/assets being split out |
| `tests/`            | Smoke tests + lint (Node built-in test runner) |
| `docs/`             | Project documentation                          |

## Ground Rules

- Keep dependencies at zero. If a feature genuinely needs a library,
  discuss it in an issue first.
- Match the existing code style: 2-space indentation, double quotes in HTML,
  single quotes in JS, kebab-case class names.
- Test any change on mobile widths — most visitors arrive on phones.
- Never commit secrets. Copy `.env.example` to `.env` for local values;
  `.env` is git-ignored.
- Update `CHANGELOG.md` with a note under **Unreleased** for user-facing changes.

## Commit Messages

Use short, imperative subjects:

```
Fix mobile nav closing on link tap
Add generator installation section to Services
```

## Submitting Changes

1. Create a feature branch: `git checkout -b my-feature`.
2. Commit your work.
3. Open a pull request describing what changed and why.
4. Ensure `npm test` passes.

## Reporting Issues

- Bugs or broken pages → open an issue with the page URL and what you expected.
- Security concerns → follow `SECURITY.md` (do not open a public issue).
