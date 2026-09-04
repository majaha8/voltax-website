const fs = require('node:fs');
const path = require('node:path');
const nunjucks = require('nunjucks');

const root = __dirname;
const templateDir = path.join(root, 'src', 'templates');
const outputDir = path.join(root, 'src');

const PAGES = {
  'index.html': { template: 'index.html', active: 'home' },
  'about.html': { template: 'about.html', active: 'about' },
  'services.html': { template: 'services.html', active: 'services' },
  'gallery.html': { template: 'gallery.html', active: 'gallery' },
  'contact.html': { template: 'contact.html', active: 'contact' },
};

nunjucks.configure(templateDir, { autoescape: false, throwOnUndefined: false });

for (const [outputFile, { template, active }] of Object.entries(PAGES)) {
  const rendered = nunjucks.render(template, { active });
  const outPath = path.join(outputDir, outputFile);
  fs.writeFileSync(outPath, rendered);
  console.log(`built ${outputFile}`);
}

console.log('Build complete.');
