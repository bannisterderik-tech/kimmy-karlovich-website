// Instagram slide templates — same design system as kimmykarlovich.com.
// Every slide is a self-contained 1080x1350 HTML document.

import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
export const IMG = (f) => `file://${join(ROOT, 'docs', 'images', f)}`;

export const esc = (s) => String(s)
  .replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

const GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='2'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 .05 0'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E")`;

const TOPO = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='560' height='560' viewBox='0 0 560 560'%3E%3Cg fill='none' stroke='%2317A398' stroke-width='1.2'%3E%3Cpath d='M0 480 C120 430 180 460 300 420 S480 380 560 340'/%3E%3Cpath d='M0 430 C120 380 200 410 320 370 S500 330 560 290'/%3E%3Cpath d='M0 380 C140 330 220 360 340 320 S520 280 560 240'/%3E%3Cpath d='M0 330 C160 280 240 310 360 270 S540 230 560 190'/%3E%3Cpath d='M0 280 C180 230 260 260 380 220 S520 180 560 140'/%3E%3C/g%3E%3C/svg%3E")`;

const horseshoe = (size = 44, fill = '#159A8E') => `<svg width="${size}" height="${size}" viewBox="0 0 40 40" fill="none"><path d="M20 4c9.4 0 15 7.4 15 15.5 0 6.8-3.6 12.4-7.4 16l-3.2-3.4c3.2-3 5.8-7.4 5.8-12.4C30.2 13 26 8.8 20 8.8S9.8 13 9.8 19.7c0 5 2.6 9.4 5.8 12.4l-3.2 3.4C8.6 31.9 5 26.3 5 19.5 5 11.4 10.6 4 20 4Z" fill="${fill}"/><circle cx="9" cy="17" r="1.6" fill="#C9736C"/><circle cx="31" cy="17" r="1.6" fill="#C9736C"/><circle cx="11.5" cy="26" r="1.6" fill="#C9736C"/><circle cx="28.5" cy="26" r="1.6" fill="#C9736C"/></svg>`;

const base = (body, { bg = '#FAF5EC', dark = false } = {}) => `<!DOCTYPE html>
<html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..900&family=Karla:ital,wght@0,400..800;1,400..800&display=swap" rel="stylesheet">
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  :root{--paper:#FAF5EC;--paper2:#F2EADA;--card:#FFFDF7;--ink:#1C2B28;--ink2:#465852;
    --line:#E4D9C3;--turq:#159A8E;--turq-deep:#0C6A61;--turq-soft:#D3EEEA;
    --pink:#F5D3CF;--pink-deep:#C9736C;--pink-wash:#FBEDE8;--gold:#C09154;
    --pine:#132420;--pine2:#1B322C;--cream:#F6EFE1}
  html,body{width:1080px;height:1350px;overflow:hidden}
  body{background:${bg};font-family:'Karla',sans-serif;color:${dark ? '#F6EFE1' : '#1C2B28'};position:relative}
  body::after{content:'';position:absolute;inset:0;pointer-events:none;background-image:${GRAIN}}
  .slide{position:absolute;inset:0;padding:84px;display:flex;flex-direction:column}
  .serif{font-family:'Fraunces',serif}
  .eyebrow{font-weight:800;font-size:26px;letter-spacing:.24em;text-transform:uppercase;
    color:${dark ? '#159A8E' : '#0C6A61'};display:flex;align-items:center;gap:18px}
  .eyebrow::before{content:'';width:44px;height:4px;background:#C9736C;border-radius:2px}
  .footer{position:absolute;left:84px;right:84px;bottom:56px;display:flex;align-items:center;
    justify-content:space-between;border-top:2px solid ${dark ? 'rgba(246,239,225,.22)' : '#E4D9C3'};padding-top:28px}
  .brand{display:flex;align-items:center;gap:16px;font-family:'Fraunces',serif;font-weight:600;
    font-size:30px;color:${dark ? '#fff' : '#1C2B28'}}
  .brand em{font-style:italic;font-weight:430;color:${dark ? '#159A8E' : '#0C6A61'}}
  .handle{font-weight:700;font-size:24px;letter-spacing:.08em;color:${dark ? '#9FB0A9' : '#465852'}}
  .chip{display:inline-flex;align-items:center;background:#159A8E;color:#fff;font-weight:800;
    font-size:26px;letter-spacing:.18em;text-transform:uppercase;padding:16px 34px;border-radius:99px}
  .chip.pink{background:#C9736C}
  .chip.ghost{background:transparent;border:3px solid currentColor;color:${dark ? '#F6EFE1' : '#1C2B28'}}
  .arch{border-radius:50% 50% 0 0 / 32% 32% 0 0;overflow:hidden;border:10px solid #FFFDF7;
    box-shadow:0 40px 90px -30px rgba(0,0,0,.45)}
  .arch img{width:100%;height:100%;object-fit:cover;display:block}
  .checks{list-style:none;display:grid;gap:26px}
  .checks li{padding-left:58px;position:relative;font-size:36px;line-height:1.45;color:${dark ? '#D9D2C2' : '#3A4B46'}}
  .checks li::before{content:'✦';position:absolute;left:6px;color:#C9736C;font-size:34px}
  .checks li b{color:${dark ? '#fff' : '#1C2B28'}}
</style></head><body>${body}</body></html>`;

const footer = (dark = false) => `
<div class="footer">
  <div class="brand">${horseshoe(44)} Kimmy <em>Karlovich</em></div>
  <div class="handle">@kimmy_karlovich · 541-643-9509</div>
</div>`;

// ------------------------------------------------ carousel cover (dark)
export const cover = ({ eyebrow, title, em, img, tag }) => base(`
<div style="position:absolute;inset:0;background-image:${TOPO};opacity:.16"></div>
<div class="slide" style="align-items:center;text-align:center;padding-top:96px">
  <div class="eyebrow" style="justify-content:center">${esc(eyebrow)}</div>
  <div class="arch" style="width:520px;height:600px;margin:56px 0 0;position:relative">
    <img src="${img}">
    ${tag ? `<div style="position:absolute;left:50%;transform:translateX(-50%);bottom:26px;background:#FFFDF7;color:#1C2B28;border-radius:99px;padding:12px 30px;font-weight:800;font-size:24px;white-space:nowrap">${esc(tag)}</div>` : ''}
  </div>
  <h1 class="serif" style="font-size:88px;font-weight:560;line-height:1.06;color:#fff;margin-top:64px;letter-spacing:-.01em;max-width:880px">${title}</h1>
  <div style="position:absolute;right:84px;bottom:140px" class="chip">Swipe →</div>
</div>
${footer(true)}`, { bg: '#132420', dark: true });

// ------------------------------------------------ numbered content slide (cream)
export const content = ({ n, total, kicker, title, body, checks }) => base(`
<div class="slide">
  <div style="display:flex;justify-content:space-between;align-items:flex-start">
    <div class="eyebrow">${esc(kicker)}</div>
    <div class="serif" style="font-size:44px;font-style:italic;color:#C9736C">${n} <span style="color:#C6B99F">/ ${total}</span></div>
  </div>
  <h2 class="serif" style="font-size:76px;font-weight:560;line-height:1.08;margin:64px 0 44px;letter-spacing:-.01em">${title}</h2>
  ${body ? `<p style="font-size:38px;line-height:1.55;color:#3A4B46;max-width:880px">${body}</p>` : ''}
  ${checks?.length ? `<ul class="checks" style="margin-top:${body ? '44px' : '0'}">${checks.map(c => `<li>${c}</li>`).join('')}</ul>` : ''}
</div>
${footer()}`);

// ------------------------------------------------ Q / A slides
export const question = ({ n, total, q, kicker = 'Ask Kimmy' }) => base(`
<div class="slide">
  <div style="display:flex;justify-content:space-between;align-items:flex-start">
    <div class="eyebrow">${esc(kicker)}</div>
    <div class="serif" style="font-size:44px;font-style:italic;color:#C9736C">${n} <span style="color:#C6B99F">/ ${total}</span></div>
  </div>
  <div class="serif" style="font-size:340px;font-style:italic;font-weight:500;color:#F5D3CF;line-height:.8;margin-top:90px">Q.</div>
  <h2 class="serif" style="font-size:78px;font-weight:560;line-height:1.12;margin-top:40px;max-width:900px;letter-spacing:-.01em">${esc(q)}</h2>
</div>
${footer()}`);

export const answer = ({ n, total, a, kicker = 'Ask Kimmy' }) => base(`
<div class="slide">
  <div style="display:flex;justify-content:space-between;align-items:flex-start">
    <div class="eyebrow" style="color:#159A8E">${esc(kicker)}</div>
    <div class="serif" style="font-size:44px;font-style:italic;color:#F5D3CF">${n} <span style="opacity:.4">/ ${total}</span></div>
  </div>
  <div class="serif" style="font-size:340px;font-style:italic;font-weight:500;color:#159A8E;line-height:.8;margin-top:90px">A.</div>
  <p style="font-size:44px;line-height:1.55;color:#F6EFE1;margin-top:48px;max-width:900px">${esc(a)}</p>
</div>
${footer(true)}`, { bg: '#132420', dark: true });

// ------------------------------------------------ CTA end slide
export const cta = ({ line = "Let's find <em>your</em> patch of Oregon." } = {}) => base(`
<div style="position:absolute;inset:0;background:radial-gradient(closest-side at 30% 20%,rgba(21,154,142,.3),transparent 70%),radial-gradient(closest-side at 80% 85%,rgba(201,115,108,.25),transparent 70%)"></div>
<div class="slide" style="align-items:center;text-align:center;justify-content:center;gap:0">
  <div style="width:280px;height:280px;border-radius:50%;overflow:hidden;border:12px solid #F5D3CF;box-shadow:0 40px 80px -20px rgba(0,0,0,.5)">
    <img src="${IMG('kimmy-headshot.jpg')}" style="width:100%;height:100%;object-fit:cover">
  </div>
  <h2 class="serif" style="font-size:96px;font-weight:560;color:#fff;line-height:1.08;margin-top:64px;max-width:860px;letter-spacing:-.01em">${line.replace('<em>', '<em style="font-style:italic;font-weight:400;color:#F5D3CF">')}</h2>
  <p style="font-size:36px;color:#9FB0A9;margin-top:40px">Rural · Ranch · Horse Property · Douglas County</p>
  <div class="serif" style="font-size:76px;color:#159A8E;margin-top:44px;font-weight:600">541-643-9509</div>
  <div style="font-weight:700;font-size:32px;letter-spacing:.1em;color:#F6EFE1;margin-top:22px">@kimmy_karlovich</div>
</div>
${footer(true)}`, { bg: '#132420', dark: true });

// ------------------------------------------------ stills
export const quoteStill = ({ quote, cite = 'Kimmy Karlovich' }) => base(`
<div class="slide" style="align-items:center;text-align:center;justify-content:center">
  <div class="serif" style="font-size:280px;line-height:.5;color:#F5D3CF;margin-bottom:8px">“</div>
  <blockquote class="serif" style="font-size:84px;font-style:italic;font-weight:450;line-height:1.22;max-width:900px;letter-spacing:-.01em">${quote}</blockquote>
  <div style="font-weight:800;font-size:28px;letter-spacing:.22em;text-transform:uppercase;color:#C9736C;margin-top:64px">— ${esc(cite)}</div>
</div>
${footer()}`, { bg: '#FBEDE8' });

export const termStill = ({ term, pos = 'noun', def, why }) => base(`
<div class="slide">
  <div style="display:flex;justify-content:space-between;align-items:center">
    <div class="chip">Land Lingo</div>
    <div class="serif" style="font-style:italic;font-size:34px;color:#C9736C">rural words, decoded</div>
  </div>
  <h1 class="serif" style="font-size:120px;font-weight:600;line-height:1.02;margin-top:100px;letter-spacing:-.02em">${esc(term)}</h1>
  <div class="serif" style="font-style:italic;font-size:34px;color:#465852;margin-top:18px">${esc(pos)}</div>
  <div style="width:120px;height:6px;background:#C9736C;border-radius:3px;margin:44px 0"></div>
  <p style="font-size:42px;line-height:1.5;color:#3A4B46;max-width:900px">${esc(def)}</p>
  <div style="background:#D3EEEA;border-radius:28px;padding:40px 48px;margin-top:52px;max-width:900px">
    <div style="font-weight:800;font-size:26px;letter-spacing:.18em;color:#0C6A61;margin-bottom:14px">WHY IT MATTERS</div>
    <p style="font-size:36px;line-height:1.5;color:#1C2B28">${esc(why)}</p>
  </div>
</div>
${footer()}`);

export const mythStill = ({ myth, fact }) => base(`
<div style="position:absolute;left:0;right:0;top:0;height:600px;background:#FBEDE8"></div>
<div style="position:absolute;left:0;right:0;top:600px;bottom:0;background:#132420"></div>
<div class="slide" style="padding-top:96px">
  <div class="chip pink">Myth</div>
  <h2 class="serif" style="font-size:70px;font-style:italic;font-weight:500;line-height:1.15;margin-top:44px;max-width:900px;color:#1C2B28;text-decoration:line-through;text-decoration-color:#C9736C;text-decoration-thickness:6px">${esc(myth)}</h2>
  <div style="position:absolute;top:600px;right:84px;transform:translateY(-50%)">
    <div style="width:96px;height:96px;border-radius:50%;background:#159A8E;display:flex;align-items:center;justify-content:center;color:#fff;font-size:52px;font-weight:800;box-shadow:0 20px 50px rgba(0,0,0,.35)">↓</div>
  </div>
  <div style="margin-top:212px">
    <div class="chip">Fact</div>
    <h2 class="serif" style="font-size:64px;font-weight:560;line-height:1.18;margin-top:44px;max-width:920px;color:#fff">${esc(fact)}</h2>
  </div>
</div>
${footer(true)}`, { bg: '#132420', dark: true });

export const photoStill = ({ img, chip, caption }) => base(`
<img src="${img}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover">
<div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(19,36,32,.18) 0%,transparent 30%,transparent 45%,rgba(19,36,32,.88) 100%)"></div>
<div class="slide" style="justify-content:flex-end;padding-bottom:190px">
  <div class="chip" style="align-self:flex-start">${esc(chip)}</div>
  <h2 class="serif" style="font-size:76px;font-weight:560;font-style:italic;line-height:1.12;color:#fff;margin-top:40px;max-width:900px;text-shadow:0 4px 40px rgba(0,0,0,.4)">${caption}</h2>
</div>
${footer(true)}`, { bg: '#132420', dark: true });

export const tipStill = ({ series, title, body, dark = false }) => base(`
<div class="slide">
  <div class="chip${dark ? '' : ' pink'}">${esc(series)}</div>
  <h2 class="serif" style="font-size:92px;font-weight:560;line-height:1.06;margin-top:90px;letter-spacing:-.015em;max-width:920px">${title}</h2>
  <div style="width:120px;height:6px;background:${dark ? '#159A8E' : '#C9736C'};border-radius:3px;margin:52px 0"></div>
  <p style="font-size:42px;line-height:1.55;color:${dark ? '#D9D2C2' : '#3A4B46'};max-width:900px">${body}</p>
</div>
${footer(dark)}`, dark ? { bg: '#132420', dark: true } : {});
