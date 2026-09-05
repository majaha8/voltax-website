const { test } = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const src = path.join(root, 'src');
const dist = path.join(root, 'dist');

const PAGES = ['index.html', 'about.html', 'services.html', 'gallery.html', 'contact.html'];
const STYLESHEET = 'style.css';

// Classes provided by the Bulma and Font Awesome CDN stylesheets, not by style.css
const FRAMEWORK_CLASSES = new Set(['is-overlay', 'columns', 'column', 'is-vcentered']);
const isFrameworkClass = (cls) =>
  FRAMEWORK_CLASSES.has(cls) || cls.startsWith('fa-') || /^(fa|fas|far|fab)\b/.test(cls);

const read = (p) => fs.readFileSync(path.join(dist, p), 'utf8');

test('all pages exist', () => {
  for (const page of PAGES) {
    assert.ok(fs.existsSync(path.join(dist, page)), `${page} is missing`);
  }
});

for (const page of PAGES) {
  test(`${page} is well-formed`, () => {
    const html = read(page);
    assert.ok(html.trim().startsWith('<!DOCTYPE html>'), 'missing doctype');
    assert.ok(html.includes('</html>'), 'missing closing html tag');
    assert.ok(html.includes('<title>'), 'missing title');
  });

  test(`${page} references core assets correctly`, () => {
    const html = read(page);
    assert.ok(html.includes(`href="${STYLESHEET}"`), `stylesheet link must point to ${STYLESHEET}`);
    assert.ok(html.includes('src="script.js"'), 'script tag missing/broken');
    assert.ok(html.includes('href="public/favicon.ico"'), 'favicon link missing/broken');
  });
}

test('core assets exist', () => {
  for (const file of [path.join(dist, STYLESHEET), path.join(dist, 'script.js'), path.join(dist, 'public/favicon.ico')]) {
    assert.ok(fs.existsSync(file), `${file} is missing`);
  }
});

test('stylesheet defines nav, hero, footer and form styles', () => {
  const css = read(STYLESHEET);
  for (const cls of ['.nav-links', '.hero-badge', '.stats-grid', '.section-title',
    '.service-card', '.gallery-grid', '.cta-banner', '.footer-inner',
    '.form-group', '.submit-btn']) {
    assert.ok(css.includes(cls), `${cls} missing from ${STYLESHEET}`);
  }
});

test('every CSS class used in HTML exists in the stylesheet', () => {
  const css = read(STYLESHEET);
  for (const page of PAGES) {
    const html = read(page);
    const used = new Set();
    for (const m of html.matchAll(/class="([^"]+)"/g)) {
      for (const cls of m[1].trim().split(/\s+/)) used.add(cls);
    }
    for (const cls of used) {
      if (isFrameworkClass(cls)) continue;
      assert.ok(
        css.includes(`.${cls}`),
        `${page} uses .${cls} but it is not defined in ${STYLESHEET}`
      );
    }
  }
});

test('script.js defines functions the pages call inline', () => {
  const js = read('script.js');
  for (const fn of ['toggleMenu', 'submitForm']) {
    assert.ok(js.includes(fn), `${fn} is not defined in script.js`);
  }
  for (const page of PAGES) {
    const html = read(page);
    if (/onclick="(\w+)\(/.test(html)) {
      for (const m of html.matchAll(/onclick="(\w+)\(/g)) {
        assert.ok(js.includes(m[1]), `${m[1]}() called in HTML but not defined in script.js`);
      }
    }
  }
});

test('favicon is a valid ICO file', () => {
  const buf = fs.readFileSync(path.join(dist, 'public/favicon.ico'));
  assert.strictEqual(buf.readUInt16LE(0), 0, 'reserved bytes must be 0');
  assert.strictEqual(buf.readUInt16LE(2), 1, 'type must be 1 (icon)');
  assert.ok(buf.readUInt16LE(4) >= 1, 'must contain at least one image');
});

test('project scaffolding is in place', () => {
  for (const dir of [
    'src/templates', 'src/templates/partials', 'src/images', 'src/public', 'tests', 'docs', 'dist',
  ]) {
    assert.ok(fs.existsSync(path.join(root, dir)), `directory ${dir} is missing`);
  }
  for (const file of [
    'README.md', 'LICENSE', 'CHANGELOG.md', 'CONTRIBUTING.md', 'SECURITY.md',
    '.gitignore', '.env.example', 'package.json', 'package-lock.json', 'server.js', 'build.js',
    'docs/INSTALLATION.md', 'docs/API.md', 'docs/USER_GUIDE.md',
  ]) {
    assert.ok(fs.existsSync(path.join(root, file)), `file ${file} is missing`);
  }
});

test('every template page has a generated counterpart in dist', () => {
  const templateDirEntries = fs.readdirSync(path.join(root, 'src/templates'))
    .filter((f) => f.endsWith('.html'));
  for (const tpl of templateDirEntries) {
    if (tpl === 'base.html') continue;
    assert.ok(fs.existsSync(path.join(dist, tpl)), `templates/${tpl} has no output in dist`);
  }
});

test('internal links resolve to real routes', () => {
  const ROUTES = { '/': 'index.html' };
  for (const page of PAGES) {
    const html = read(page);
    const hrefs = [...html.matchAll(/(?:href|src)="([^"#]+)"/g)].map((m) => m[1]);
    for (const href of hrefs) {
      if (/^(https?:|mailto:|tel:)|^#$/.test(href)) continue;
      let target;
      if (href.startsWith('/')) {
        target = path.join(dist, ROUTES[href] || href.slice(1) + '.html');
      } else if (href.startsWith('public/')) {
        target = path.join(dist, href);
      } else {
        target = path.join(dist, href);
      }
      assert.ok(
        fs.existsSync(target),
        `${page} links to missing route/file: ${href}`
      );
    }
  }
});

test('pages link via clean URLs, not *.html', () => {
  for (const page of PAGES) {
    const html = read(page);
    assert.ok(
      !/href="[a-z-]+\.html"/.test(html),
      `${page} still contains a bare *.html link`
    );
  }
});
