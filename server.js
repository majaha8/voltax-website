const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = __dirname;
const SRC = path.join(ROOT, 'dist');
const PUBLIC = path.join(SRC, 'public');
const PORT = Number(process.env.PORT) || 3000;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
};

function send(res, status, body, type) {
  res.writeHead(status, {
    'Content-Type': type || 'text/html; charset=utf-8',
    'Content-Length': Buffer.byteLength(body),
    'Cache-Control': 'no-cache',
  });
  res.end(body);
}

function redirect(res, location) {
  res.writeHead(301, {
    Location: location,
    'Content-Length': 0,
    'Cache-Control': 'no-cache',
  });
  res.end();
}

function notFound(res, urlPath) {
  send(
    res,
    404,
    `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>404 — Volt-Watt Electrical</title>
<link rel="icon" href="/public/favicon.ico" sizes="any">
<style>
body{margin:0;min-height:100vh;display:grid;place-items:center;background:#05080f;color:#e7ecf5;font-family:system-ui,sans-serif;text-align:center}
h1{font-size:72px;margin:0 0 8px;color:#2f6fed}
p{color:#9aa7bd;margin:0 0 24px}
a{color:#8fb4ff;text-decoration:none;border:1px solid #2f6fed;padding:10px 22px;border-radius:6px}
</style>
</head>
<body>
<div>
<h1>404</h1>
<p>That page doesn't exist. The circuit ends here.</p>
<a href="/">Back to Home</a>
</div>
</body>
</html>
`
  );
}

const server = http.createServer((req, res) => {
  let pathname;
  try {
    pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  } catch {
    return notFound(res);
  }

  const isPublic = pathname === '/public/' || pathname.startsWith('/public/');

  if (!isPublic) {
    if (pathname.length > 1 && pathname.endsWith('/')) {
      return redirect(res, pathname.slice(0, -1));
    }
    if (pathname.toLowerCase().endsWith('.html')) {
      const clean = pathname.slice(0, -5);
      return redirect(res, clean === '/index' ? '/' : clean);
    }
  }

  const base = isPublic ? PUBLIC : SRC;
  const relPath = isPublic ? pathname.slice('/public'.length) : pathname;

  let filePath;
  try {
    filePath = path.resolve(path.join(base, relPath));
  } catch {
    return notFound(res);
  }
  if (filePath !== base && !filePath.startsWith(base + path.sep)) {
    return notFound(res);
  }

  const wantsPage = !isPublic && relPath !== '/' && !path.extname(relPath);

  fs.stat(filePath, (err, stats) => {
    if (!err && stats.isDirectory() && !wantsPage) {
      return serve(path.join(filePath, 'index.html'));
    }
    if (wantsPage) {
      return fs.stat(filePath + '.html', (err2, stats2) => {
        if (!err2 && stats2.isFile()) return serve(filePath + '.html');
        if (!err && stats.isDirectory()) {
          return serve(path.join(filePath, 'index.html'));
        }
        serve(filePath);
      });
    }
    serve(filePath);
  });

  function serve(file) {
    const ext = path.extname(file).toLowerCase();
    if (!MIME[ext]) return notFound(res);
    fs.readFile(file, (err, data) => {
      if (err) return notFound(res);
      send(res, 200, data, MIME[ext]);
    });
  }
});

server.listen(PORT, () => {
  console.log(`Volt-Watt Electrical site running at http://localhost:${PORT}`);
});
