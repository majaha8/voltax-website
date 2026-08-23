const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const src = path.join(root, 'src');
let failed = false;

function check(file, fn) {
  try {
    fn();
    console.log(`ok   ${file}`);
  } catch (err) {
    failed = true;
    console.error(`FAIL ${file}: ${err.message}`);
  }
}

for (const page of ['index.html', 'about.html', 'services.html', 'gallery.html', 'contact.html']) {
  check(page, () => {
    const html = fs.readFileSync(path.join(src, page), 'utf8');
    for (const tag of ['html', 'head', 'body', 'main', 'header', 'footer']) {
      const open = (html.match(new RegExp(`<${tag}[\\s>]`, 'g')) || []).length;
      const close = (html.match(new RegExp(`</${tag}>`, 'g')) || []).length;
      if (open !== close) throw new Error(`unbalanced <${tag}> tags (${open} open / ${close} close)`);
    }
    if (/TODO|FIXME/.test(html)) throw new Error('contains TODO/FIXME markers');
  });
}

check('script.js', () => {
  const js = fs.readFileSync(path.join(src, 'script.js'), 'utf8');
  if (/console\.log/.test(js)) throw new Error('contains console.log');
});

process.exit(failed ? 1 : 0);
