// Shared design system + layout for kimmykarlovich.com
// Modern-western editorial: cream paper, deep pine ink, turquoise + dusty pink.

// Swap to the custom domain (one line) + rebuild when it's registered.
export const SITE = 'https://bannisterderik-tech.github.io/kimmy-karlovich-website';
export const BRAND = 'Kimmy Karlovich';
export const PHONE = '541-643-9509';
export const PHONE_TEL = '5416439509';
export const EMAIL = 'kimberly@theoperativegroup.com';
export const IG = 'https://www.instagram.com/kimmy_karlovich/';
export const ZILLOW = 'https://www.zillow.com/profile/Karlovich%20Realty';
export const BROKERAGE = 'The Operative Group';

export const esc = (s) => String(s)
  .replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;');

// ---------------------------------------------------------------- CSS
export const css = /* css */`
:root{
  --paper:#FAF5EC; --paper2:#F2EADA; --card:#FFFDF7;
  --ink:#1C2B28; --ink2:#465852; --line:#E4D9C3;
  --turq:#159A8E; --turq-deep:#0C6A61; --turq-soft:#D3EEEA;
  --pink:#F5D3CF; --pink-deep:#C9736C; --pink-wash:#FBEDE8;
  --gold:#C09154; --pine:#132420; --pine2:#1B322C; --cream-on-pine:#F6EFE1;
  --radius:20px; --arch:50% 50% 0 0 / 32% 32% 0 0;
  --font-d:'Fraunces',Georgia,serif; --font-b:'Karla',-apple-system,sans-serif;
}
*{margin:0;padding:0;box-sizing:border-box}
html{scroll-behavior:smooth}
body{background:var(--paper);color:var(--ink);font-family:var(--font-b);
  font-size:1.06rem;line-height:1.7;-webkit-font-smoothing:antialiased;overflow-x:hidden}
body::before{content:'';position:fixed;inset:0;pointer-events:none;z-index:2000;opacity:.5;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 .035 0'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)'/%3E%3C/svg%3E")}
img{max-width:100%;display:block}
a{color:var(--turq-deep);text-decoration:none}
a:hover{color:var(--pink-deep)}
h1,h2,h3,h4{font-family:var(--font-d);font-weight:560;line-height:1.12;letter-spacing:-.01em}
h1{font-size:clamp(2.6rem,6vw,4.6rem)}
h2{font-size:clamp(1.9rem,3.6vw,2.9rem)}
h3{font-size:clamp(1.25rem,2vw,1.55rem)}
.serif-i{font-style:italic;font-weight:430}
.wrap{max-width:1200px;margin:0 auto;padding:0 clamp(1.1rem,4vw,2.5rem)}
.eyebrow{font-family:var(--font-b);font-weight:700;font-size:.78rem;letter-spacing:.24em;
  text-transform:uppercase;color:var(--turq-deep);display:flex;align-items:center;gap:.6rem}
.eyebrow::before{content:'';width:26px;height:2px;background:var(--pink-deep);display:inline-block}
section{padding:clamp(3.5rem,8vw,6.5rem) 0;position:relative}

/* nav */
.nav{position:sticky;top:0;z-index:100;background:color-mix(in srgb,var(--paper) 88%,transparent);
  backdrop-filter:blur(14px);border-bottom:1px solid var(--line)}
.nav-in{max-width:1320px;margin:0 auto;padding:.8rem clamp(1rem,3vw,2rem);
  display:flex;align-items:center;gap:1.6rem}
.logo{font-family:var(--font-d);font-size:1.34rem;font-weight:560;color:var(--ink);
  display:flex;align-items:center;gap:.7rem;flex-shrink:0;letter-spacing:.01em}
.logo:hover{color:var(--ink)}
.logo .hs{width:30px;height:30px;flex-shrink:0}
.logo-pic{width:46px;height:46px;border-radius:50%;object-fit:cover;flex-shrink:0;
  border:2px solid var(--pink);box-shadow:0 2px 8px rgba(28,43,40,.15)}
.logo em{font-style:italic;font-weight:430;color:var(--turq-deep)}
.logo-tag{font-family:var(--font-b);font-weight:700;font-size:.66rem;letter-spacing:.24em;
  text-transform:uppercase;color:var(--gold);margin-left:.55rem;white-space:nowrap}
.logo-tag::before{content:'·';margin-right:.55rem;color:var(--pink-deep)}
@media(max-width:640px){.logo-tag{display:none}}
.nav-links{display:flex;gap:1.35rem;margin-left:auto;align-items:center;flex-wrap:wrap}
.nav-links a{color:var(--ink);font-weight:600;font-size:.94rem}
.nav-links a:hover{color:var(--turq-deep)}
.btn{display:inline-flex;align-items:center;gap:.5rem;background:var(--turq);color:#fff!important;
  font-weight:700;padding:.78rem 1.5rem;border-radius:99px;font-size:.95rem;border:none;cursor:pointer;
  transition:transform .18s,background .18s,box-shadow .18s;box-shadow:0 2px 0 var(--turq-deep)}
.btn:hover{background:var(--pink-deep);box-shadow:0 2px 0 #9e544e;transform:translateY(-2px)}
.btn.ghost{background:transparent;color:var(--ink)!important;border:1.6px solid var(--ink);box-shadow:none}
.btn.ghost:hover{background:var(--ink);color:var(--paper)!important}
.btn.big{padding:1rem 2.1rem;font-size:1.04rem}
.nav-burger{display:none;margin-left:auto;background:none;border:none;font-size:1.7rem;color:var(--ink);cursor:pointer}
@media(max-width:960px){
  .nav-links{display:none;position:absolute;top:100%;left:0;right:0;background:var(--paper);
    flex-direction:column;padding:1.2rem 1.6rem 1.6rem;border-bottom:1px solid var(--line);gap:1rem}
  .nav-links.open{display:flex}
  .nav-burger{display:block}
}

/* hero */
.hero{position:relative;min-height:88vh;display:flex;align-items:flex-end;color:var(--cream-on-pine);overflow:hidden;padding:0}
.hero-bg{position:absolute;inset:0;z-index:-2}
.hero-bg img{width:100%;height:100%;object-fit:cover;animation:kenburns 22s ease-out both}
@keyframes kenburns{from{transform:scale(1.12)}to{transform:scale(1)}}
.hero::after{content:'';position:absolute;inset:0;z-index:-1;
  background:linear-gradient(180deg,rgba(19,36,32,.25) 0%,rgba(19,36,32,.08) 40%,rgba(19,36,32,.82) 100%)}
.hero-in{width:100%;padding:9rem 0 3.4rem}
.hero .eyebrow{color:var(--pink);}
.hero .eyebrow::before{background:var(--turq)}
.hero h1{color:#fff;margin:.9rem 0 1.1rem;max-width:15ch;text-shadow:0 2px 30px rgba(0,0,0,.3)}
.hero h1 em{font-style:italic;font-weight:400;color:var(--pink)}
.hero p{max-width:52ch;font-size:1.14rem;color:#F2EBDD}
.hero-cta{display:flex;gap:.9rem;margin-top:1.8rem;flex-wrap:wrap}
.hero-cta .ghost{border-color:#fff;color:#fff!important}
.hero-cta .ghost:hover{background:#fff;color:var(--ink)!important}
.hero-badge{position:absolute;right:clamp(1rem,5vw,4rem);bottom:3.2rem;width:150px;height:150px;
  animation:spin 24s linear infinite;opacity:.94;z-index:3;display:block}
@keyframes spin{to{transform:rotate(360deg)}}
@media(max-width:760px){.hero-badge{display:none}.hero{min-height:76vh}}

/* subpage hero */
.phero{background:var(--pine);color:var(--cream-on-pine);padding:clamp(3.4rem,7vw,5.2rem) 0;position:relative;overflow:hidden}
.phero::before{content:'';position:absolute;inset:0;opacity:.14;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='560' height='560' viewBox='0 0 560 560'%3E%3Cg fill='none' stroke='%2317A398' stroke-width='1.2'%3E%3Cpath d='M0 480 C120 430 180 460 300 420 S480 380 560 340'/%3E%3Cpath d='M0 430 C120 380 200 410 320 370 S500 330 560 290'/%3E%3Cpath d='M0 380 C140 330 220 360 340 320 S520 280 560 240'/%3E%3Cpath d='M0 330 C160 280 240 310 360 270 S540 230 560 190'/%3E%3Cpath d='M0 280 C180 230 260 260 380 220 S520 180 560 140'/%3E%3Cpath d='M0 230 C200 180 280 210 400 170 S540 130 560 90'/%3E%3C/g%3E%3C/svg%3E")}
.phero h1{color:#fff;max-width:22ch;margin:.8rem 0 1rem;font-size:clamp(2.1rem,4.6vw,3.5rem)}
.phero h1 em{font-style:italic;font-weight:400;color:var(--pink)}
.phero p{max-width:66ch;color:#D9D2C2;font-size:1.1rem;position:relative}
.phero .eyebrow{color:var(--turq);}
.phero .eyebrow::before{background:var(--pink-deep)}
.crumbs{font-size:.85rem;color:#9FB0A9;margin-bottom:1.4rem;position:relative}
.crumbs a{color:#C8D4CE}
.crumbs a:hover{color:var(--pink)}
.crumbs span{margin:0 .45rem;color:#5E736B}

/* ticker */
.ticker{background:var(--pine);color:var(--cream-on-pine);overflow:hidden;padding:1.05rem 0;
  border-top:1px solid #24413A;border-bottom:1px solid #24413A}
.ticker-track{display:flex;gap:2.6rem;white-space:nowrap;animation:tick 30s linear infinite;width:max-content}
.ticker-track span{font-family:var(--font-d);font-style:italic;font-size:1.16rem;letter-spacing:.02em}
.ticker-track b{color:var(--turq);font-family:var(--font-b);font-weight:700}
@keyframes tick{to{transform:translateX(-50%)}}

/* cards & grids */
.grid{display:grid;gap:1.6rem}
.g2{grid-template-columns:repeat(auto-fit,minmax(300px,1fr))}
.g3{grid-template-columns:repeat(auto-fit,minmax(280px,1fr))}
.g4{grid-template-columns:repeat(auto-fit,minmax(240px,1fr))}
.card{background:var(--card);border:1px solid var(--line);border-radius:var(--radius);
  overflow:hidden;transition:transform .22s,box-shadow .22s;display:flex;flex-direction:column}
.card:hover{transform:translateY(-6px);box-shadow:0 18px 40px -18px rgba(28,43,40,.28)}
.card img{height:215px;width:100%;object-fit:cover}
.card-b{padding:1.35rem 1.45rem 1.55rem;display:flex;flex-direction:column;gap:.5rem;flex:1}
.card h3 a{color:var(--ink)}
.card h3 a:hover{color:var(--turq-deep)}
.card p{color:var(--ink2);font-size:.97rem}
.card .more{margin-top:auto;padding-top:.6rem;font-weight:700;font-size:.9rem;color:var(--turq-deep);
  letter-spacing:.04em}
.card:hover .more{color:var(--pink-deep)}

/* arch photo */
.arch{border-radius:var(--arch);overflow:hidden;position:relative;border:5px solid var(--card);
  box-shadow:0 24px 60px -24px rgba(28,43,40,.45)}
.arch img{width:100%;height:100%;object-fit:cover}
.arch-tag{position:absolute;bottom:1rem;left:50%;transform:translateX(-50%);background:var(--card);
  border-radius:99px;padding:.4rem 1.1rem;font-size:.82rem;font-weight:700;letter-spacing:.06em;
  white-space:nowrap;color:var(--ink);box-shadow:0 6px 18px rgba(0,0,0,.14)}

/* split section */
.split{display:grid;grid-template-columns:5fr 6fr;gap:clamp(2rem,5vw,4.5rem);align-items:center}
@media(max-width:880px){.split{grid-template-columns:1fr}}
.split .eyebrow{margin-bottom:.9rem}
.split h2{margin-bottom:1.1rem}
.split h2 em{font-style:italic;font-weight:420;color:var(--pink-deep)}
.split p+p{margin-top:.9rem}
.split p{color:var(--ink2)}

/* stats */
.stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:1px;background:var(--line);
  border:1px solid var(--line);border-radius:var(--radius);overflow:hidden;margin-top:1.8rem}
.stats div{background:var(--card);padding:1.2rem 1.1rem}
.stats b{font-family:var(--font-d);font-size:1.5rem;font-weight:600;display:block;color:var(--turq-deep)}
.stats span{font-size:.85rem;color:var(--ink2);letter-spacing:.03em}

/* checklist */
.checks{list-style:none;margin:1.2rem 0;display:grid;gap:.7rem}
.checks li{padding-left:2.1rem;position:relative;color:var(--ink2)}
.checks li::before{content:'✦';position:absolute;left:.3rem;color:var(--pink-deep);font-size:1.05rem}

/* pills */
.pills{display:flex;flex-wrap:wrap;gap:.6rem}
.pills a{background:var(--card);border:1px solid var(--line);padding:.5rem 1.05rem;border-radius:99px;
  font-weight:600;font-size:.92rem;color:var(--ink);transition:all .16s}
.pills a:hover{background:var(--turq);border-color:var(--turq);color:#fff;transform:translateY(-2px)}

/* prose (guides/blogs) */
.prose{max-width:760px}
.prose h2{margin:2.6rem 0 1rem;font-size:clamp(1.5rem,2.6vw,2rem)}
.prose h2::after{content:'';display:block;width:52px;height:3px;background:var(--pink-deep);margin-top:.55rem;border-radius:2px}
.prose p{color:#3A4B46;margin-bottom:1.1rem}
.prose strong{color:var(--ink)}
.lede{font-size:1.22rem;font-family:var(--font-d);font-style:italic;color:var(--ink);line-height:1.55}

/* faq */
.faq{max-width:820px}
.faq details{background:var(--card);border:1px solid var(--line);border-radius:16px;margin-bottom:.85rem;overflow:hidden}
.faq summary{cursor:pointer;padding:1.15rem 1.4rem;font-weight:700;font-size:1.03rem;list-style:none;
  display:flex;justify-content:space-between;align-items:center;gap:1rem}
.faq summary::-webkit-details-marker{display:none}
.faq summary::after{content:'+';font-family:var(--font-d);font-size:1.5rem;color:var(--turq);transition:transform .2s;flex-shrink:0}
.faq details[open] summary::after{transform:rotate(45deg);color:var(--pink-deep)}
.faq details p{padding:0 1.4rem 1.25rem;color:var(--ink2)}

/* gallery */
.masonry{columns:3 300px;column-gap:1.2rem}
.masonry figure{margin-bottom:1.2rem;border-radius:16px;overflow:hidden;position:relative;break-inside:avoid;background:var(--pine)}
.masonry img{width:100%;transition:transform .5s,opacity .3s}
.masonry figure:hover img{transform:scale(1.05);opacity:.85}
.masonry figcaption{position:absolute;left:0;right:0;bottom:0;padding:2rem 1.1rem .85rem;color:#fff;
  font-size:.88rem;font-weight:600;background:linear-gradient(transparent,rgba(19,36,32,.85))}

/* quote band */
.quote{background:var(--pink-wash);text-align:center;position:relative;overflow:hidden}
.quote blockquote{font-family:var(--font-d);font-style:italic;font-weight:450;
  font-size:clamp(1.7rem,3.6vw,2.7rem);line-height:1.3;max-width:22ch;margin:0 auto;color:var(--ink)}
.quote blockquote b{color:var(--turq-deep);font-weight:600}
.quote cite{display:block;margin-top:1.4rem;font-family:var(--font-b);font-style:normal;
  font-weight:700;font-size:.85rem;letter-spacing:.2em;text-transform:uppercase;color:var(--pink-deep)}

/* cta band */
.cta{background:var(--pine);color:var(--cream-on-pine);text-align:center;position:relative;overflow:hidden}
.cta::before{content:'';position:absolute;inset:-40% -20%;
  background:radial-gradient(closest-side,rgba(21,154,142,.28),transparent 70%),
             radial-gradient(closest-side at 80% 80%,rgba(201,115,108,.22),transparent 70%)}
.cta h2{color:#fff;font-size:clamp(2.2rem,5vw,3.6rem);max-width:18ch;margin:0 auto 1rem;position:relative}
.cta h2 em{font-style:italic;font-weight:400;color:var(--pink)}
.cta p{max-width:56ch;margin:0 auto 2rem;color:#CBC4B2;position:relative}
.cta .hero-cta{justify-content:center;position:relative}
.cta .phone-big{font-family:var(--font-d);font-size:clamp(1.5rem,3vw,2.1rem);color:var(--turq);display:block;margin-top:1.6rem;position:relative}
.cta .phone-big:hover{color:var(--pink)}

/* footer */
footer{background:var(--pine);color:#AEBBB4;padding:4rem 0 2.4rem;border-top:1px solid #24413A;font-size:.94rem}
.foot-grid{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:2.4rem;margin-bottom:2.8rem}
@media(max-width:880px){.foot-grid{grid-template-columns:1fr 1fr}}
@media(max-width:560px){.foot-grid{grid-template-columns:1fr}}
footer h4{color:#fff;font-size:1rem;margin-bottom:.9rem;letter-spacing:.04em}
footer a{color:#AEBBB4;display:block;padding:.18rem 0}
footer a:hover{color:var(--turq)}
.foot-brand{font-family:var(--font-d);font-size:1.5rem;color:#fff;margin-bottom:.7rem;display:flex;align-items:center;gap:.55rem}
.foot-brand em{font-style:italic;color:var(--turq)}
.foot-legal{border-top:1px solid #24413A;padding-top:1.6rem;font-size:.82rem;color:#6F817A;
  display:flex;justify-content:space-between;gap:1rem;flex-wrap:wrap}
.foot-legal a{display:inline;color:#8B9C95}

/* reveal */
.rv{opacity:0;transform:translateY(26px);transition:opacity .7s ease,transform .7s ease}
.rv.on{opacity:1;transform:none}
@media(prefers-reduced-motion:reduce){
  .rv{opacity:1;transform:none;transition:none}
  .hero-bg img,.ticker-track,.hero-badge{animation:none}
}

/* misc */
.sec-head{max-width:720px;margin-bottom:2.6rem}
.sec-head h2{margin:.8rem 0 .9rem}
.sec-head h2 em{font-style:italic;font-weight:420;color:var(--turq-deep)}
.sec-head p{color:var(--ink2)}
.paper2{background:var(--paper2)}
.center{text-align:center}
.center .sec-head{margin-left:auto;margin-right:auto}
.center .eyebrow{justify-content:center}
.mt{margin-top:2.2rem}
.two-col{columns:2 300px;column-gap:2.6rem}
.two-col p{break-inside:avoid}
table.meta{border-collapse:collapse;width:100%;max-width:560px;margin:1.4rem 0}
table.meta td{padding:.6rem .2rem;border-bottom:1px solid var(--line);color:var(--ink2)}
table.meta td:first-child{font-weight:700;color:var(--ink);width:42%}
`;

// ---------------------------------------------------------------- JS
export const js = /* js */`
document.addEventListener('DOMContentLoaded',()=>{
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('on');io.unobserve(e.target)}}),{threshold:.08});
  document.querySelectorAll('.rv').forEach(el=>io.observe(el));
  const fall=()=>document.querySelectorAll('.rv:not(.on)').forEach(el=>{const r=el.getBoundingClientRect();if(r.top<innerHeight*1.08)el.classList.add('on')});
  addEventListener('scroll',fall,{passive:true});setTimeout(fall,350);
  const b=document.querySelector('.nav-burger'),l=document.querySelector('.nav-links');
  if(b)b.addEventListener('click',()=>l.classList.toggle('open'));
});
function askKimmy(kind){
  const n=document.getElementById('f-name')?.value||'';
  const p=document.getElementById('f-phone')?.value||'';
  const m=document.getElementById('f-msg')?.value||'';
  const s=encodeURIComponent((kind==='sell'?'Listing inquiry':'Buyer inquiry')+' from '+n+' — kimmykarlovich.com');
  const b=encodeURIComponent('Name: '+n+'\\nPhone: '+p+'\\n\\n'+m);
  location.href='mailto:${EMAIL}?subject='+s+'&body='+b;
}
`;

// ---------------------------------------------------------------- SVG marks
export const horseshoe = (cls = 'hs') => `<svg class="${cls}" viewBox="0 0 40 40" fill="none" aria-hidden="true"><path d="M20 4c9.4 0 15 7.4 15 15.5 0 6.8-3.6 12.4-7.4 16l-3.2-3.4c3.2-3 5.8-7.4 5.8-12.4C30.2 13 26 8.8 20 8.8S9.8 13 9.8 19.7c0 5 2.6 9.4 5.8 12.4l-3.2 3.4C8.6 31.9 5 26.3 5 19.5 5 11.4 10.6 4 20 4Z" fill="#159A8E"/><circle cx="9" cy="17" r="1.6" fill="#C9736C"/><circle cx="31" cy="17" r="1.6" fill="#C9736C"/><circle cx="11.5" cy="26" r="1.6" fill="#C9736C"/><circle cx="28.5" cy="26" r="1.6" fill="#C9736C"/></svg>`;

export const badge = `<svg class="hero-badge" viewBox="0 0 150 150" aria-hidden="true"><defs><path id="circ" d="M75,75 m-56,0 a56,56 0 1,1 112,0 a56,56 0 1,1 -112,0"/></defs><circle cx="75" cy="75" r="73" fill="rgba(19,36,32,.5)" stroke="#F5D3CF" stroke-width="1"/><text font-family="Karla,sans-serif" font-size="11" font-weight="700" letter-spacing="2.6" fill="#F6EFE1"><textPath href="#circ">RURAL OREGON ★ DOUGLAS COUNTY ★</textPath></text><path d="M75 47c11.6 0 18.5 9.1 18.5 19.1 0 8.4-4.4 15.3-9.1 19.7l-4-4.2c4-3.7 7.2-9.1 7.2-15.3 0-8.3-5.2-13.5-12.6-13.5s-12.6 5.2-12.6 13.5c0 6.2 3.2 11.6 7.2 15.3l-4 4.2c-4.7-4.4-9.1-11.3-9.1-19.7C56.5 56.1 63.4 47 75 47Z" fill="#159A8E"/></svg>`;

// ---------------------------------------------------------------- layout
export function page({ path, title, desc, ogImg = 'images/gen-hero-valley.jpg', schema = [], body, active = '' }) {
  const canon = SITE + path;
  const depth = path.split('/').length - 2; // '/' → 0, '/about/' → 1, '/areas/x/' → 2
  const R = depth <= 0 ? './' : '../'.repeat(depth);
  const navLink = (href, label, key) =>
    `<a href="${R}${href}"${active === key ? ' aria-current="page"' : ''}>${label}</a>`;

  const agentSchema = {
    '@context': 'https://schema.org', '@type': 'RealEstateAgent',
    name: 'Kimmy Karlovich — Rural & Ranch Real Estate', alternateName: 'Kimberly Karlovich',
    url: SITE, telephone: '+1-541-643-9509', email: EMAIL, image: SITE + '/images/kimmy-headshot.jpg',
    address: { '@type': 'PostalAddress', addressLocality: 'Roseburg', addressRegion: 'OR', postalCode: '97470', addressCountry: 'US' },
    areaServed: ['Douglas County OR', 'Roseburg OR', 'Umpqua Valley OR'],
    knowsAbout: ['Farm and ranch real estate', 'Horse property', 'Rural land', 'Timberland', 'Riverfront property', 'Umpqua Valley vineyards'],
    memberOf: { '@type': 'Organization', name: BROKERAGE },
    sameAs: [IG, ZILLOW],
  };

  const schemas = [agentSchema, ...schema]
    .map(s => `<script type="application/ld+json">${JSON.stringify(s)}</script>`).join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${canon}">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:image" content="${SITE}/${ogImg}">
<meta property="og:url" content="${canon}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="data:image/svg+xml,${encodeURIComponent(horseshoe('f').replace('class="f" ', ''))}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..900&family=Karla:ital,wght@0,400..800;1,400..800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${R}assets/style.css">
${schemas}
</head>
<body>
<nav class="nav">
  <div class="nav-in">
    <a class="logo" href="${R}index.html"><img class="logo-pic" src="${R}images/kimmy-headshot.jpg" alt="Kimmy Karlovich" width="46" height="46">Kimmy <em>Karlovich</em><span class="logo-tag">The Operative Group</span></a>
    <button class="nav-burger" aria-label="Menu">☰</button>
    <div class="nav-links">
      ${navLink('buy/index.html', 'Buy', 'buy')}
      ${navLink('sell/index.html', 'Sell', 'sell')}
      ${navLink('services/index.html', 'Specialties', 'services')}
      ${navLink('areas/index.html', 'Communities', 'areas')}
      ${navLink('guides/index.html', 'Guides', 'guides')}
      ${navLink('blog/index.html', 'Blog', 'blog')}
      ${navLink('about/index.html', 'Meet Kimmy', 'about')}
      <a class="btn" href="tel:${PHONE_TEL}">☎ ${PHONE}</a>
    </div>
  </div>
</nav>
${body}
<section class="cta">
  <div class="wrap">
    <h2 class="rv">Let's find <em>your</em> patch of Oregon.</h2>
    <p class="rv">Whether you're buying your first five acres or selling the ranch that raised you — call, text, or email. Kimmy answers.</p>
    <div class="hero-cta rv">
      <a class="btn big" href="tel:${PHONE_TEL}">Call ${PHONE}</a>
      <a class="btn big ghost" href="mailto:${EMAIL}">Email Kimmy</a>
    </div>
    <a class="phone-big rv" href="tel:${PHONE_TEL}">${PHONE}</a>
  </div>
</section>
<footer>
  <div class="wrap">
    <div class="foot-grid">
      <div>
        <div class="foot-brand"><img class="logo-pic" src="${R}images/kimmy-headshot.jpg" alt="Kimmy Karlovich" width="46" height="46">Kimmy <em>Karlovich</em></div>
        <p>Rural, ranch &amp; horse property specialist serving Roseburg and all of Douglas County, Oregon. Licensed Oregon Real Estate Broker with ${BROKERAGE}.</p>
        <p style="margin-top:.8rem"><a href="tel:${PHONE_TEL}">☎ ${PHONE}</a><a href="mailto:${EMAIL}">✉ ${EMAIL}</a><a href="${IG}" rel="noopener">Instagram — @kimmy_karlovich</a><a href="${ZILLOW}" rel="noopener">Zillow Profile</a></p>
      </div>
      <div>
        <h4>Specialties</h4>
        <a href="${R}services/farm-ranch/index.html">Farm &amp; Ranch</a>
        <a href="${R}services/equestrian/index.html">Horse Property</a>
        <a href="${R}services/land-acreage/index.html">Land &amp; Acreage</a>
        <a href="${R}services/rural-homes/index.html">Rural Homes</a>
        <a href="${R}services/riverfront/index.html">Riverfront</a>
        <a href="${R}services/timber-recreational/index.html">Timberland</a>
        <a href="${R}services/hunting-property/index.html">Hunting Land</a>
        <a href="${R}services/vineyard-winery/index.html">Vineyards</a>
      </div>
      <div>
        <h4>Communities</h4>
        <a href="${R}areas/roseburg/index.html">Roseburg</a>
        <a href="${R}areas/winston/index.html">Winston</a>
        <a href="${R}areas/sutherlin/index.html">Sutherlin</a>
        <a href="${R}areas/oakland/index.html">Oakland</a>
        <a href="${R}areas/melrose/index.html">Melrose</a>
        <a href="${R}areas/lookingglass/index.html">Lookingglass</a>
        <a href="${R}areas/glide/index.html">Glide</a>
        <a href="${R}areas/index.html"><b>All 26 communities →</b></a>
      </div>
      <div>
        <h4>Resources</h4>
        <a href="${R}guides/buying-rural-property-douglas-county/index.html">Rural Buying Guide</a>
        <a href="${R}guides/wells-water-systems-oregon/index.html">Wells &amp; Water</a>
        <a href="${R}guides/oregon-water-rights/index.html">Water Rights</a>
        <a href="${R}guides/douglas-county-zoning-land-use/index.html">Zoning &amp; Land Use</a>
        <a href="${R}guides/index.html">All Guides</a>
        <a href="${R}blog/index.html">Blog</a>
        <a href="${R}the-life/index.html">The Life</a>
        <a href="${R}contact/index.html">Contact</a>
      </div>
    </div>
    <div class="foot-legal">
      <span>© 2026 Kimberly Karlovich, Licensed Oregon Real Estate Broker · ${BROKERAGE} · Equal Housing Opportunity ⌂</span>
      <span>Made with ♥ in the Umpqua Valley</span>
    </div>
    <div class="foot-legal" style="border-top:none;padding-top:.4rem">
      <span><a href="${R}privacy-policy/index.html">Privacy Policy</a> · <a href="${R}terms-of-service/index.html">Terms of Service</a> · <a href="${R}do-not-sell/index.html">Do Not Sell or Share My Personal Information</a> · <a href="${R}accessibility/index.html">Accessibility</a></span>
    </div>
  </div>
</footer>
<script src="${R}assets/site.js"></script>
</body>
</html>`;
}

// ---------------------------------------------------------------- components
export const ticker = (items) => `
<div class="ticker" aria-hidden="true"><div class="ticker-track">
${[...items, ...items].map(i => `<span>${i}</span><b>★</b>`).join('')}
</div></div>`;

export const faqBlock = (faqs, title = 'Questions, answered straight') => faqs?.length ? `
<section class="paper2"><div class="wrap">
  <div class="sec-head rv"><div class="eyebrow">FAQ</div><h2>${title}</h2></div>
  <div class="faq">
    ${faqs.map(f => `<details class="rv"><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join('\n')}
  </div>
</div></section>`: '';

export const faqSchema = (faqs) => ({
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: faqs.map(f => ({
    '@type': 'Question', name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
});

export const breadcrumbSchema = (items) => ({
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({
    '@type': 'ListItem', position: i + 1, name: it[0], item: SITE + it[1],
  })),
});

export const crumbs = (R, items) => `<div class="crumbs">${
  items.map((it, i) => i === items.length - 1
    ? `<b>${esc(it[0])}</b>`
    : `<a href="${R}${it[1]}">${esc(it[0])}</a><span>›</span>`).join('')
}</div>`;
