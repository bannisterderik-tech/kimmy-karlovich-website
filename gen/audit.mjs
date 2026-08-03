// Link + SEO/AEO auditor. Usage: node gen/audit.mjs
// Crawls docs/, verifies every internal href/src resolves, and checks SEO hygiene.

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'docs');

const pages = [];
(function walk(dir) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walk(p);
    else if (e.endsWith('.html')) pages.push(p);
  }
})(OUT);

let errors = 0, warnings = 0;
const err = (m) => { errors++; console.log('ERR  ' + m); };
const warn = (m) => { warnings++; console.log('warn ' + m); };

const titles = new Map(), descs = new Map();

for (const file of pages) {
  const html = readFileSync(file, 'utf8');
  const rel = file.slice(OUT.length);

  // --- links resolve
  const refs = [...html.matchAll(/(?:href|src)="([^"]+)"/g)].map(m => m[1])
    .filter(u => !u.startsWith('http') && !u.startsWith('mailto:') && !u.startsWith('tel:')
      && !u.startsWith('#') && !u.startsWith('data:'));
  for (const u of refs) {
    const clean = u.split('#')[0].split('?')[0];
    if (!clean) continue;
    const target = clean.startsWith('/') ? join(OUT, clean) : resolve(dirname(file), clean);
    const t2 = target.endsWith('/') ? join(target, 'index.html') : target;
    if (!existsSync(t2) && !existsSync(target)) err(`${rel}: broken link → ${u}`);
  }

  // --- SEO basics
  const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1] || '';
  const desc = (html.match(/name="description" content="([^"]*)"/) || [])[1] || '';
  const canon = (html.match(/rel="canonical" href="([^"]*)"/) || [])[1] || '';
  const h1s = (html.match(/<h1[\s>]/g) || []).length;

  if (!title) err(`${rel}: missing <title>`);
  if (title.length > 78) warn(`${rel}: long title (${title.length}): ${title.slice(0, 60)}…`);
  if (!desc) err(`${rel}: missing meta description`);
  else if (desc.length > 175) warn(`${rel}: long description (${desc.length})`);
  else if (desc.length < 70 && !rel.includes('404')) warn(`${rel}: short description (${desc.length})`);
  if (!canon && !rel.includes('404')) err(`${rel}: missing canonical`);
  if (h1s !== 1) err(`${rel}: ${h1s} h1 tags`);
  if (titles.has(title)) err(`${rel}: duplicate title with ${titles.get(title)}`);
  titles.set(title, rel);
  if (descs.has(desc)) err(`${rel}: duplicate description with ${descs.get(desc)}`);
  descs.set(desc, rel);

  // --- schema parses
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(m[1]); } catch { err(`${rel}: invalid JSON-LD`); }
  }

  // --- images have alt
  for (const m of html.matchAll(/<img\s[^>]*>/g)) {
    if (!/alt="/.test(m[0])) warn(`${rel}: img missing alt: ${m[0].slice(0, 60)}`);
  }
}

// --- sitemap coverage
const sm = readFileSync(join(OUT, 'sitemap.xml'), 'utf8');
const smUrls = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
console.log(`\n${pages.length} HTML pages, ${smUrls.length} sitemap URLs`);
if (smUrls.length !== pages.length - 1) warn(`sitemap count (${smUrls.length}) vs pages minus 404 (${pages.length - 1})`);

console.log(`\nAudit done: ${errors} errors, ${warnings} warnings.`);
process.exit(errors ? 1 : 0);
