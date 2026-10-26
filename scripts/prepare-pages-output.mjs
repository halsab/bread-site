import {
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";

const exportedRoot = path.resolve("dist/client");
const pagesRoot = path.resolve("dist/pages");

if (!existsSync(exportedRoot)) {
  throw new Error("Vinext did not produce dist/client.");
}

rmSync(pagesRoot, { recursive: true, force: true });
mkdirSync(pagesRoot, { recursive: true });
cpSync(exportedRoot, pagesRoot, { recursive: true });

const required = [
  "index.html",
  "favicon.svg",
  "fonts/cormorant-garamond-cyrillic-500.woff2",
  "fonts/cormorant-garamond-latin-500.woff2",
  "fonts/manrope-cyrillic-400.woff2",
  "fonts/manrope-cyrillic-500.woff2",
  "fonts/manrope-latin-400.woff2",
  "fonts/manrope-latin-500.woff2",
  "images/hero-tartine.webp",
  "images/classic-tartine.webp",
  "images/flaxseed-tartine.webp",
  "images/pumpkin-loaf.webp",
  "images/rye-sourdough.webp",
  "images/philosophy-ingredients.webp",
  "images/bread-crumb-detail.webp",
  "images/baker-silhouette.webp",
  "images/baker-hands-dough.webp",
  "images/dough-before-baking.webp",
  "images/freshly-baked-loaf.webp",
];

for (const file of required) {
  if (!existsSync(path.join(pagesRoot, file))) {
    throw new Error(`Missing GitHub Pages asset: ${file}`);
  }
}

function* filesIn(dir) {
  for (const entry of readdirSync(dir)) {
    const absolute = path.join(dir, entry);
    if (statSync(absolute).isDirectory()) {
      yield* filesIn(absolute);
    } else {
      yield absolute;
    }
  }
}

let scripts = 0;
let styles = 0;
let references = 0;

function verifyReference(reference, source) {
  const url = reference.trim();
  if (!url.startsWith("/") || url.startsWith("//")) return;
  const pathname = new URL(url, "https://example.invalid").pathname;
  if (pathname.startsWith("/bread-site/")) {
    throw new Error(`Legacy project-path URL in ${source}: ${url}`);
  }
  const relative = decodeURIComponent(pathname.slice(1)) || "index.html";
  if (relative.includes("..") || !existsSync(path.join(pagesRoot, relative))) {
    throw new Error(`Unresolved GitHub Pages URL in ${source}: ${url}`);
  }
  references++;
}

for (const file of filesIn(pagesRoot)) {
  const ext = path.extname(file);
  if (ext === ".js") scripts++;
  if (ext === ".css") styles++;
  if (ext !== ".html" && ext !== ".css") continue;

  let content = readFileSync(file, "utf8");
  if (ext === ".css") {
    const corrected = content.replaceAll(
      "/_next/static/fonts/",
      "/fonts/",
    );
    if (corrected !== content) {
      writeFileSync(file, corrected);
      content = corrected;
    }
  }
  if (content.includes("/_next/image?")) {
    throw new Error(`Runtime image optimization reference found in ${file}`);
  }
  if (ext === ".html") {
    for (const match of content.matchAll(/\b(?:src|href|srcset|imagesrcset)\s*=\s*(["'])(.*?)\1/gi)) {
      for (const candidate of match[2].split(",")) {
        verifyReference(candidate.trim().split(/\s+/)[0], file);
      }
    }
  } else {
    for (const match of content.matchAll(/url\(\s*["']?(\/[^"'\)\s]+)["']?\s*\)/gi)) {
      verifyReference(match[1], file);
    }
  }
}

if (scripts === 0 || styles === 0 || references === 0) {
  throw new Error("Pages artifact is missing compiled assets or verifiable references.");
}

console.log(`GitHub Pages artifact verified: ${pagesRoot} (${scripts} scripts, ${styles} styles, ${references} asset references).`);
