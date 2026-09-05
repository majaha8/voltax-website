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
const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif']);

nunjucks.configure(templateDir, { autoescape: false, throwOnUndefined: false });

// Auto-discover every image dropped into src/images so templates (like the
// gallery) don't need to hardcode filenames — just add a photo and rebuild.
function getGalleryImages() {
  const imagesDir = path.join(srcDir, 'images');
  return fs
    .readdirSync(imagesDir)
    .filter((file) => IMAGE_EXTENSIONS.has(path.extname(file).toLowerCase()))
    .sort()
    .map((file) => {
      const name = path.parse(file).name;
      const label = name
        .replace(/[-_]+/g, ' ')
        .trim()
        .split(' ')
        .filter(Boolean)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      return { file, label };
    });
}

const galleryImages = getGalleryImages();

fs.rmSync(outputDir, { recursive: true, force: true });
fs.mkdirSync(outputDir, { recursive: true });

for (const [outputFile, { template, active }] of Object.entries(PAGES)) {
  const context = { active };
  if (template === 'gallery.html') {
    context.images = galleryImages;
  }
  const rendered = nunjucks.render(template, context);
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
