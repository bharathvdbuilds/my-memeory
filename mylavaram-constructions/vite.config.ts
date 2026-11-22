import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pages serves this repo from /my-memeory/ (branch main, folder /).
// `npm run build:pages` publishes under that path. Default base "/" stays for
// local dev and for a standalone host.
const pagesBase = "/my-memeory/mylavaram/";
const publishingToPages = process.env.GITHUB_PAGES === "true";

// Copies of index.html so a direct load or refresh works on GitHub Pages,
// which has no SPA rewrite. Keep in sync with the paths in src/App.tsx.
const spaRoutes = [
  "about",
  "civil-construction",
  "commercial-construction",
  "peb-industrial",
  "architecture",
  "projects",
  "material-collaborations",
  "joint-ventures",
  "contact",
];

function spaRouteCopies(): Plugin {
  const outDir = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    "../mylavaram",
  );
  return {
    name: "spa-route-copies",
    apply: "build",
    closeBundle() {
      const html = fs.readFileSync(path.join(outDir, "index.html"));
      for (const route of spaRoutes) {
        const dir = path.join(outDir, route);
        fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(path.join(dir, "index.html"), html);
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), publishingToPages ? spaRouteCopies() : null].filter(
    (plugin): plugin is Plugin => plugin !== null,
  ),
  base: publishingToPages ? pagesBase : "/",
  build: {
    outDir: publishingToPages ? "../mylavaram" : "dist",
    emptyOutDir: true,
  },
});
