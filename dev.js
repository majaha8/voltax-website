const fs = require('node:fs');
const path = require('node:path');
const { spawn } = require('node:child_process');
const { build, srcDir } = require('./build');

function runBuild(reason) {
  const logs = build();
  console.log(`\n[dev] ${reason}`);
  logs.forEach((line) => console.log(`  ${line}`));
  console.log('[dev] Rebuilt. Refresh your browser to see changes.\n');
}

let timer = null;
function scheduleBuild() {
  clearTimeout(timer);
  timer = setTimeout(() => runBuild('Change detected in src/'), 100);
}

function watchTree(dir) {
  if (!fs.existsSync(dir)) return;
  const stat = fs.statSync(dir);
  if (!stat.isDirectory()) return;
  fs.watch(dir, { recursive: true }, (_event, filename) => {
    if (filename && filename.endsWith('.swp')) return;
    scheduleBuild();
  });
  for (const entry of fs.readdirSync(dir)) {
    watchTree(path.join(dir, entry));
  }
}

function main() {
  runBuild('Initial build');
  watchTree(srcDir);

  console.log('[dev] Watching src/ for changes... Press Ctrl+C to stop.\n');

  const server = spawn(process.execPath, ['server.js'], { stdio: 'inherit' });
  server.on('error', (err) => {
    console.error('[dev] Failed to start server:', err.message);
    process.exit(1);
  });
}

main();
