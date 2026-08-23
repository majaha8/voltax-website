# User Guide

A practical guide for editing the Voltax website — no coding
experience required for most changes.

## Opening the Site

Double-click `index.html`, or run `npm start` and visit
<http://localhost:3000>.

## Common Tasks

### Change the Phone Number

The placeholder numbers appear in the footer of every page and in the
contact details on `contact.html`. Use **Find & Replace** across all `.html`
files:

- Find: `+27110000000` (the dial link)
- Find: `+27 11 000 0000` (the displayed text)
- Find: `+27760000000` / `+27 76 000 0000` (WhatsApp)

Replace with your real numbers.

### Change the Email Address

Find & replace `info@voltax.co.za` across all `.html` files.

### Edit Text on a Page

1. Open the page in any text editor (Notepad, VS Code).
2. Find the heading or paragraph you want to change — HTML text sits between
   tags, e.g. `<h2>What We Do</h2>`.
3. Edit only the text between the `>` and `<`.
4. Save and refresh the browser.

### Change Colors

All colors are defined once at the top of `styles.css` under `:root` as CSS
variables. Change them there and the whole site updates:

```css
:root {
  --accent: #2f6fed;   /* main brand blue */
  ...
}
```

### Add a Photo

1. Put the image file in `public/images/`.
2. Reference it from a page: `<img src="public/images/my-photo.jpg" alt="Description">`.

Keep photos under ~300 KB where possible so pages stay fast on mobile data.

### Update the Favicon

Replace `public/favicon.ico`. It already contains multiple sizes
(16–256 px), so browsers and phone home screens all get a crisp icon.

## Testing Your Changes

```bash
npm test
```

This runs smoke tests that catch broken references (missing files, wrong
paths). If tests fail after your edit, check the path you typed.

## Before You Publish

- [ ] Phone number, WhatsApp, and email are correct on all five pages.
- [ ] Placeholder content (team names, project locations) replaced with real details.
- [ ] New images have `alt` text.
- [ ] You tested the page on a phone-sized window.
- [ ] `npm test` passes.
- [ ] Added a line to `CHANGELOG.md` under **Unreleased**.

## Getting Help

See `CONTRIBUTING.md` for how the repo is organised, or open an issue.
