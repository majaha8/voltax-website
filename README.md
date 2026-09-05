# ⚡ Voltax — Website

Static marketing website for **Voltax**, an electrical and infrastructure
solutions company serving residential, commercial, and industrial clients
across South Africa — electrical installations, maintenance, network
infrastructure, security systems, solar, and project management.

Built with plain HTML/CSS/JS and [Nunjucks](https://mozilla.github.io/nunjucks/)
templates. Pages are authored as templates in `src/templates/`, rendered to
`dist/` by `build.js`, and served statically. Zero runtime dependencies.

## Pages

| Page         | Template                | Purpose                                  |
| ------------ | ----------------------- | ---------------------------------------- |
| Home         | `src/templates/index.html`     | Hero, stats, services preview, partners  |
| About        | `src/templates/about.html`     | Story, values, leadership team           |
| Services     | `src/templates/services.html`  | Full service catalogue                   |
| Gallery      | `src/templates/gallery.html`   | Completed project showcase               |
| Contact      | `src/templates/contact.html`   | Contact details + enquiry form           |

## Project Structure

```
voltax/
├── README.md
├── LICENSE
├── CHANGELOG.md
├── CONTRIBUTING.md
├── SECURITY.md
├── .gitignore
├── .env.example
├── package.json
├── package-lock.json
├── build.js              ← renders templates → dist/
├── server.js             ← zero-dependency dev server (serves dist/)
│
├── src/                  ← source (edit these, never dist/)
│   ├── templates/        ← Nunjucks page templates
│   │   ├── base.html     ← shared layout (head, nav, footer)
│   │   ├── index.html    ← Home
│   │   ├── about.html    ← About
│   │   ├── services.html ← Services
│   │   ├── gallery.html  ← Gallery
│   │   ├── contact.html  ← Contact
│   │   └── partials/     ← nav.html, footer.html (shared)
│   ├── style.css         ← single global stylesheet
│   ├── script.js         ← shared client-side behaviour
│   ├── images/           ← site images
│   └── public/           ← favicon, etc.
│
├── dist/                 ← build output (git-ignored, generated)
│
├── tests/
│   ├── smoke.test.js     ← page/asset/link/CSS-coverage checks
│   └── lint.js           ← tag balance & hygiene checks
│
└── docs/
    ├── INSTALLATION.md
    ├── API.md
    └── USER_GUIDE.md
```

## Quick Start

```bash
npm start     # build + serve locally at http://localhost:3000 (PORT=8080 to change)
npm test      # run smoke tests (Node built-in test runner)
npm run lint  # tag-balance & hygiene checks
```

To edit content, change the templates in `src/templates/`, then run
`npm start` (or `npm run build`) to regenerate `dist/`. Never edit files in
`dist/` — they are overwritten on every build.

## Documentation

- [Installation guide](docs/INSTALLATION.md) — running and deploying the site
- [API reference](docs/API.md) — client-side behaviour and form contract
- [User guide](docs/USER_GUIDE.md) — editing content, colors, and images

## Contact

- **Phone:** +27 11 000 0000 · **WhatsApp:** +27 76 000 0000
- **Email:** info@voltax.co.za

## License

[MIT](LICENSE)
