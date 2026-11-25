# Mylavaram Constructions — Website

Premium, conversion-focused multi-page site for **Mylavaram Constructions**.

Tagline: **Designed. Engineered. Built.**

This folder lives inside the `my-memeory` repository so the existing memory PWA at repo root is untouched. It is a self-contained Vite + React + TypeScript app with static build output.

## Quick start

```bash
cd mylavaram-constructions
npm install
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`).

### Production build

```bash
npm run build
npm run preview
```

Static assets are written to `dist/` with `base: "/"`. Deploy that folder to Netlify, Vercel, Cloudflare Pages, S3, or any static host.

### GitHub Pages

This repository already publishes `main` from the repository root. Do not switch Pages to an Actions artifact of this app alone; that would replace the memory PWA.

```bash
npm run build:pages
```

That writes a production build to `../mylavaram` with `base` `/my-memeory/mylavaram/`, plus a copy of `index.html` for each client route so a refresh resolves without a server rewrite. Commit that folder. Once it is on `main`, the site is:

https://bharathvdbuilds.github.io/my-memeory/mylavaram/

The source folder stays in the repository. Its `index.html` is also what GitHub Pages serves for `/mylavaram-constructions/`, and the Vite entry script cannot load there, so that URL used to open a blank page. A short script in `index.html` redirects that path (and `index.html` itself) to `/mylavaram/`. It matches only a path ending in `mylavaram-constructions`, so `npm run dev` and the built site are unchanged. No source files are removed.

- Netlify: `public/_redirects` provides SPA fallback.
- Vercel: `vercel.json` rewrites all routes to `index.html`.
- Other hosts: configure equivalent SPA fallback to `index.html`.

## Pages

| Route | Page |
| --- | --- |
| `/` | Home |
| `/about` | About |
| `/civil-construction` | Civil Construction |
| `/commercial-construction` | Commercial Construction |
| `/peb-industrial` | PEB & Industrial |
| `/architecture` | Architecture & Design |
| `/projects` | Projects (filterable placeholders) |
| `/material-collaborations` | Material Brand Collaborations |
| `/joint-ventures` | Joint Ventures & Development |
| `/contact` | Contact (+ `?intent=` form variants) |

Contact intent query values: `construction`, `peb`, `architecture`, `material`, `jv`.

## Content & honesty rules

- No invented project counts, awards, certifications, client logos or testimonials.
- Project cards are labelled **Placeholder** until real assets arrive.
- Phone / email / WhatsApp / address / map are clearly marked placeholders.
- Architecture page states partner-led vs in-house clarity is pending verification.
- JV page promises no returns and lists no fake deals.
- Enquiry forms capture fields locally only until a backend/CRM is connected.

## Design system

- Charcoal `#171C22`, off-white `#F6F5F1`, warm orange `#D97732`, steel grey accents
- Display: Outfit · Body: Source Sans 3
- Subtle scroll reveal + hover transitions (kept minimal)

## SEO notes

- Document title and meta description set in `index.html`
- Open Graph title/description included
- Semantic landmarks: `header`, `main`, `footer`, `nav`, labelled forms
- Skip link for keyboard users
- Replace placeholder contact/OG image and add per-route meta (or prerender) before public launch
- After domain cutover, add `sitemap.xml`, `robots.txt` and Search Console verification

## Live site audit (light)

Compared to [mylavaramconstructions.com](https://www.mylavaramconstructions.com):

| Gap on live site | How this build addresses it |
| --- | --- |
| Stats showing `0+` / empty proof | Omits fake metrics entirely |
| Generic testimonials | No testimonials until verified |
| Limited service depth | Dedicated Civil / Commercial / PEB / Architecture pages |
| No material-partner or JV pathways | Dedicated pages + CTAs |
| Mixed brochure tone | B2B enquiry / partnership framing |
| Contact present on live site | Placeholders here until intentionally wired |

Do not invent claims beyond what this folder documents.

## Moving this folder to its own GitHub repository

When you want a standalone repo:

```bash
# From a clean copy of my-memeory (or this PR branch):
git subtree split -P mylavaram-constructions -b mylavaram-site-split

# Create an empty GitHub repo, then:
git push git@github.com:<org-or-user>/<new-repo>.git mylavaram-site-split:main
```

Alternative (history rewrite-free copy):

```bash
cp -R mylavaram-constructions ../mylavaram-constructions-site
cd ../mylavaram-constructions-site
# remove nested gitignore conflicts if needed, then:
git init
git add .
git commit -m "Initial commit: Mylavaram Constructions site"
git remote add origin git@github.com:<org-or-user>/<new-repo>.git
git push -u origin main
```

After the move, point DNS / hosting at the new repo’s `dist/` deploy and update contact placeholders with verified details.

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Local development |
| `npm run build` | Typecheck + production bundle (`dist/`, base `/`) |
| `npm run build:pages` | Same, emitted to `../mylavaram` for GitHub Pages |
| `npm run preview` | Serve `dist/` locally |
| `npm run lint` | Oxlint |
