# ⚡ Voltax — Website

Static marketing website for **Voltax**, an electrical and infrastructure
solutions company serving residential, commercial, and industrial clients
across South Africa — electrical installations, maintenance, network
infrastructure, security systems, solar, and project management.

Built with plain HTML, CSS, and vanilla JavaScript. No frameworks, no build
step, zero runtime dependencies.

## Pages

| Page         | File             | Purpose                                  |
| ------------ | ---------------- | ---------------------------------------- |
| Home         | `index.html`     | Hero, stats, services preview, partners  |
| About        | `about.html`     | Story, values, leadership team           |
| Services     | `services.html`  | Full service catalogue                   |
| Gallery      | `gallery.html`   | Completed project showcase               |
| Contact      | `contact.html`   | Contact details + enquiry form           |

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
├── server.js              ← bundled zero-dependency dev server
│
├── index.html …           ← live pages (root-level so any host works)
├── style.css              ← single global stylesheet (tokens in :root)
├── script.js              ← shared client-side behaviour
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── utils/
│   └── assets/
│
├── public/
│   ├── images/
│   ├── icons/
│   └── favicon.ico
│
├── tests/
│   ├── smoke.test.js      ← page/asset/link/CSS-coverage checks
│   └── lint.js            ← tag balance & hygiene checks
│
└── docs/
    ├── INSTALLATION.md
    ├── API.md
    └── USER_GUIDE.md
```

## Quick Start

```bash
npm start     # serve locally at http://localhost:3000 (PORT=8080 to change)
npm test      # run smoke tests (Node built-in test runner)
npm run lint  # tag-balance & hygiene checks
```

No install step required — there are no dependencies.

## Documentation

- [Installation guide](docs/INSTALLATION.md) — running and deploying the site
- [API reference](docs/API.md) — client-side behaviour and form contract
- [User guide](docs/USER_GUIDE.md) — editing content, colors, and images

## Contact

- **Phone:** +27 11 000 0000 · **WhatsApp:** +27 76 000 0000
- **Email:** info@voltax.co.za

## License

[MIT](LICENSE)
