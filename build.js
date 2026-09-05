const fs = require('node:fs');
const path = require('node:path');
const nunjucks = require('nunjucks');

const root = __dirname;
const srcDir = path.join(root, 'src');
const templateDir = path.join(srcDir, 'templates');
const outputDir = path.join(root, 'dist');

const PAGES = {
  'index.html': { template: 'index.html', active: 'home' },
  'about.html': { template: 'about.html', active: 'about' },
  'services.html': { template: 'services.html', active: 'services' },
  'gallery.html': { template: 'gallery.html', active: 'gallery' },
  'contact.html': { template: 'contact.html', active: 'contact' },
};

const ASSETS = ['style.css', 'script.js', 'images', 'public'];

nunjucks.configure(templateDir, { autoescape: false, throwOnUndefined: false });

fs.rmSync(outputDir, { recursive: true, force: true });
fs.mkdirSync(outputDir, { recursive: true });

for (const [outputFile, { template, active }] of Object.entries(PAGES)) {
  const rendered = nunjucks.render(template, { active });
  const outPath = path.join(outputDir, outputFile);
  fs.writeFileSync(outPath, rendered);
  console.log(`built ${outputFile}`);
}

for (const asset of ASSETS) {
  const from = path.join(srcDir, asset);
  const to = path.join(outputDir, asset);
  fs.cpSync(from, to, { recursive: true });
  console.log(`copied ${asset}`);
}

console.log('Build complete.');
