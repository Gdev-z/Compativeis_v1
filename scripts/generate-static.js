// scripts/generate-static.js
import { createServer } from "node:http";
import { writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { pathToFileURL } from "node:url";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, "..", "dist");
const clientDir = join(distDir, "client");

// Import the SSR server
const serverPath = pathToFileURL(join(distDir, "server", "server.js")).href;
const { default: server } = await import(serverPath);

// Create a local HTTP server to render the page
const httpServer = createServer(async (req, res) => {
  const url = new URL(req.url || "/", "http://localhost");
  const request = new Request(url.toString(), {
    method: req.method,
    headers: Object.fromEntries(
      Object.entries(req.headers).filter(([, v]) => v).map(([k, v]) => [k, Array.isArray(v) ? v.join(", ") : v])
    ),
  });

  try {
    const response = await server.fetch(request);
    res.statusCode = response.status;
    response.headers.forEach((value, key) => res.setHeader(key, value));
    const body = await response.text();
    res.end(body);
  } catch (err) {
    res.statusCode = 500;
    res.end("Error: " + err.message);
  }
});

await new Promise((resolve) => httpServer.listen(0, resolve));
const port = httpServer.address().port;

console.log(`Rendering on port ${port}...`);

// Fetch the homepage
const response = await fetch(`http://localhost:${port}/`);
const html = await response.text();

// Save as index.html in the client dist
const indexPath = join(clientDir, "index.html");
writeFileSync(indexPath, html, "utf-8");
console.log(`Generated ${indexPath}`);

// Create a fallback for SPA routing (all routes serve index.html)
const fallbackPath = join(clientDir, "200.html");
writeFileSync(fallbackPath, html, "utf-8");
console.log(`Generated ${fallbackPath}`);

httpServer.close();
console.log("Static generation complete!");
