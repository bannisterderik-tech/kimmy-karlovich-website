// Renders the full 60-day calendar to PNGs + captions + contact sheet.
// Usage: node social-gen/render.mjs [--only day05]

import { mkdirSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';
import { posts } from './calendar.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'social', 'out');
const only = process.argv.find(a => a.startsWith('--only'))?.split('=')[1];

const browser = await puppeteer.launch({ headless: 'new' });
const page = await browser.newPage();
await page.setViewport({ width: 1080, height: 1350, deviceScaleFactor: 1 });

let slideCount = 0;
const t0 = Date.now();
const sheet = [];

for (const post of posts) {
  const id = `day${String(post.day).padStart(2, '0')}${post.slot}-${post.slug}`;
  if (only && !id.startsWith(only)) continue;
  const dir = join(OUT, id);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'caption.txt'), post.caption + '\n');

  const files = [];
  for (let i = 0; i < post.slides.length; i++) {
    const tmp = join(OUT, '.slide.html');
    writeFileSync(tmp, post.slides[i]);
    await page.goto('file://' + tmp, { waitUntil: 'load', timeout: 60000 });
    await page.evaluate(() => document.fonts.ready);
    await new Promise(r => setTimeout(r, 60));
    const file = join(dir, `slide-${String(i + 1).padStart(2, '0')}.png`);
    await page.screenshot({ path: file });
    files.push(`${id}/slide-${String(i + 1).padStart(2, '0')}.png`);
    slideCount++;
  }
  sheet.push({ id, day: post.day, slot: post.slot, series: post.series, files, caption: post.caption });
  process.stdout.write(`\r${id}  (${slideCount} slides)`.padEnd(80));
}

// ---- contact sheet ----
const esc = (s) => s.replaceAll('&', '&amp;').replaceAll('<', '&lt;');
writeFileSync(join(OUT, 'index.html'), `<!DOCTYPE html><html><head><meta charset="utf-8">
<title>Kimmy Karlovich — 60-Day Content Calendar</title>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital@0;1&family=Karla:wght@400;700&display=swap" rel="stylesheet">
<style>
body{font-family:Karla,sans-serif;background:#FAF5EC;color:#1C2B28;padding:40px;max-width:1500px;margin:0 auto}
h1{font-family:Fraunces,serif;font-size:2.4rem}h1 em{color:#0C6A61}
.post{background:#FFFDF7;border:1px solid #E4D9C3;border-radius:16px;padding:20px;margin:20px 0}
.meta{display:flex;gap:14px;align-items:center;margin-bottom:12px;flex-wrap:wrap}
.chip{background:#159A8E;color:#fff;border-radius:99px;padding:4px 14px;font-weight:700;font-size:.8rem}
.chip.day{background:#C9736C}
.slides{display:flex;gap:10px;overflow-x:auto;padding-bottom:8px}
.slides img{height:300px;border-radius:10px;border:1px solid #E4D9C3}
details{margin-top:10px}summary{cursor:pointer;font-weight:700;color:#0C6A61}
pre{white-space:pre-wrap;background:#F2EADA;border-radius:10px;padding:14px;font-family:Karla;font-size:.9rem}
</style></head><body>
<h1>Kimmy Karlovich — <em>60-Day Instagram Calendar</em></h1>
<p>${sheet.length} posts · ${slideCount} slides · 2 posts/day. Slot “a” = morning, “b” = afternoon.</p>
${sheet.map(p => `<div class="post">
  <div class="meta"><span class="chip day">Day ${p.day}${p.slot}</span><span class="chip">${esc(p.series)}</span><b>${p.id}</b> · ${p.files.length > 1 ? p.files.length + '-slide carousel' : 'still'}</div>
  <div class="slides">${p.files.map(f => `<img src="${f}" loading="lazy">`).join('')}</div>
  <details><summary>Caption</summary><pre>${esc(p.caption)}</pre></details>
</div>`).join('\n')}
</body></html>`);

await browser.close();
console.log(`\nDone: ${sheet.length} posts, ${slideCount} slides in ${Math.round((Date.now() - t0) / 1000)}s → social/out/`);
