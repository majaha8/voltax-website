# Installation

## Prerequisites

- A modern browser (for viewing the site)
- [Node.js](https://nodejs.org/) 18+ (optional — only needed for `npm start`
  and `npm test`)

The site is fully static. You can simply open `index.html` in a browser and
everything works.

## Running Locally

### Option 1 — npm (recommended)

```bash
npm start
```

Serves the site at <http://localhost:3000> using the bundled
zero-dependency Node server (`server.js`). Set `PORT` to use another port:

```bash
PORT=8080 npm start
```

### Option 2 — Python

```bash
python3 -m http.server 3000
```

Then open <http://localhost:3000>.

### Option 3 — Just open the file

Double-click `index.html`. All pages, styles, scripts, and the favicon are
referenced with relative paths, so everything works from the filesystem too.

## Environment Variables

This is a static site, so no environment variables are required to run it.
A template is provided for future use:

```bash
cp .env.example .env
```

`.env` is git-ignored — never commit real values.

## Deployment

Any static host works:

| Host            | Command / setting                          |
| --------------- | ------------------------------------------ |
| Netlify         | Drag-and-drop the folder, or connect repo  |
| Vercel          | Framework preset: **Other**, output dir `.` |
| GitHub Pages    | Serve from branch root                     |
| Any web server  | Upload all files; `index.html` is the entry |

No build command is needed.

## Verifying the Install

```bash
npm test
```

All smoke tests should pass. They check that every page exists, references the
stylesheet and script correctly, and that key assets are present.
