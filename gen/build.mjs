// Static site generator for kimmykarlovich.com
// Usage: node gen/build.mjs   → writes everything into site/

import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  SITE, PHONE, PHONE_TEL, EMAIL, IG, ZILLOW, BROKERAGE,
  esc, css, js, page, ticker, faqBlock, faqSchema, breadcrumbSchema, crumbs,
} from './lib/site.mjs';
import { locations } from './data/locations.mjs';
import { services } from './data/services.mjs';
import { guides } from './data/guides.mjs';
import { blogs } from './data/blogs.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'docs');
const urls = [];
let count = 0;

function write(path, html) {
  const file = join(OUT, path.replace(/^\//, ''), 'index.html');
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
  urls.push(SITE + path);
  count++;
}

const hash = (s) => [...s].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);
const pick = (arr, seed) => arr[hash(seed) % arr.length];
const trunc = (s, n) => s.length <= n ? s : s.slice(0, s.lastIndexOf(' ', n)) + '…';

// ============================================================ HOME
const tickerItems = ['Farm & Ranch', 'Horse Property', 'Land & Acreage', 'Rural Homes', 'Riverfront', 'Timberland', 'Hunting Ground', 'Vineyards', 'Umpqua Valley', 'Born Rural'];

write('/', page({
  path: '/', active: 'home',
  title: 'Kimmy Karlovich | Rural & Ranch Realtor — Roseburg, Douglas County OR',
  desc: 'Douglas County\'s rural real estate specialist. Farms, ranches, horse property, land, riverfront & timber across Roseburg and the Umpqua Valley. Call Kimmy: 541-643-9509.',
  body: `
<header class="hero">
  <div class="hero-bg"><img src="images/gen-hero-valley.jpg" alt="Golden hour over the Umpqua Valley, Douglas County, Oregon" fetchpriority="high"></div>
  ${require_badge()}
  <div class="wrap hero-in">
    <div class="eyebrow">Roseburg · Douglas County · Umpqua Valley</div>
    <h1>Rural Oregon, sold by someone who <em>lives it.</em></h1>
    <p>Farms, ranches, horse setups, riverfront, and land across the Hundred Valleys of the Umpqua. Kimmy Karlovich rides, ranches, hunts, and fishes this county — and she'll help you buy or sell your piece of it right.</p>
    <div class="hero-cta">
      <a class="btn big" href="tel:${PHONE_TEL}">Call Kimmy · ${PHONE}</a>
      <a class="btn big ghost" href="services/index.html">Explore Specialties</a>
    </div>
  </div>
</header>
${ticker(tickerItems)}

<section><div class="wrap split">
  <div class="rv">
    <div class="arch" style="aspect-ratio:3/4"><img src="images/kimmy-portrait.jpg" alt="Kimmy Karlovich with her quarter horse at the arena" loading="lazy">
    <div class="arch-tag">Kimmy &amp; one of her girls 🐴</div></div>
  </div>
  <div class="rv">
    <div class="eyebrow">Meet Kimmy</div>
    <h2>Not just <em>an agent who lists rural.</em> A local who lives it.</h2>
    <p>Born and raised in Coos Bay, rooted in Douglas County since her early twenties — Kimmy's daily life is the life her clients are shopping for. Horses in the pasture, dogs in the truck, weekends of barrel racing, trail rides, hunting seasons, and river days.</p>
    <p>That means when she walks a property, she reads it like an owner: well logs and water rights, arena footing and winter drainage, fence lines and hay storage. The details that make or break rural ownership are the details she checks before you ever write an offer.</p>
    <div class="stats">
      <div><b>26</b><span>Douglas County communities served</span></div>
      <div><b>100+</b><span>valleys of the Umpqua, personally driven</span></div>
      <div><b>4am</b><span>feeding time — she gets ranch life</span></div>
      <div><b>1</b><span>call and you'll know she's different</span></div>
    </div>
    <div class="hero-cta"><a class="btn" href="about/index.html">Her Story</a><a class="btn ghost" href="the-life/index.html">See The Life</a></div>
  </div>
</div></section>

<section class="paper2"><div class="wrap">
  <div class="sec-head rv"><div class="eyebrow">Specialties</div>
    <h2>Property with <em>dirt under its fingernails.</em></h2>
    <p>Eight kinds of rural real estate, one specialist who knows every one of them from lived experience — not a brochure.</p>
  </div>
  <div class="grid g4">
    ${services.map(s => `<article class="card rv"><a href="services/${s.slug}/index.html"><img src="images/${s.img}" alt="${esc(s.name)} in Douglas County, Oregon" loading="lazy"></a>
      <div class="card-b"><h3><a href="services/${s.slug}/index.html">${esc(s.short)}</a></h3>
      <p>${esc(trunc(s.intro, 110))}</p>
      <span class="more">Explore ${esc(s.short)} →</span></div></article>`).join('\n')}
  </div>
</div></section>

<section><div class="wrap">
  <div class="sec-head rv"><div class="eyebrow">The Life</div>
    <h2>This isn't a stock-photo <em>lifestyle brand.</em></h2>
    <p>Barrel racing, beach rides, cattle dogs, and a kid growing up horseback — this is Kimmy's actual camera roll, and the life waiting for you in Douglas County.</p>
  </div>
  <div class="masonry rv">
    <figure><img src="images/barrel-race-1.jpg" alt="Kimmy Karlovich barrel racing, turning the first barrel" loading="lazy"><figcaption>Turning the first can — Kimmy competing</figcaption></figure>
    <figure><img src="images/pasture-family.jpg" alt="Horses and a cattle dog in a sunny Douglas County pasture" loading="lazy"><figcaption>Summer pasture, whole crew</figcaption></figure>
    <figure><img src="images/beach-ride.jpg" alt="Riding horses on the Oregon coast at sunset" loading="lazy"><figcaption>Coast rides, 90 minutes west</figcaption></figure>
    <figure><img src="images/cattle-dog.jpg" alt="Blue heeler cattle dog looking up" loading="lazy"><figcaption>Best ranch hand in the county</figcaption></figure>
    <figure><img src="images/kimmy-daughter-horse.jpg" alt="Kimmy and her daughter with their horse in the arena" loading="lazy"><figcaption>Raising the next generation horseback</figcaption></figure>
    <figure><img src="images/arena-pov.jpg" alt="View between a horse's ears in a Douglas County arena" loading="lazy"><figcaption>The office view</figcaption></figure>
  </div>
  <div class="center mt rv"><a class="btn" href="the-life/index.html">See the whole gallery</a></div>
</div></section>

<section class="quote"><div class="wrap">
  <blockquote class="rv">"I'm always willing to go <b>the extra mile</b> — and out here, that mile is usually <b>gravel."</b></blockquote>
  <cite class="rv">— Kimmy Karlovich</cite>
</div></section>

<section class="paper2"><div class="wrap split">
  <div class="rv">
    <div class="eyebrow">Communities</div>
    <h2>Twenty-six communities. <em>One local expert.</em></h2>
    <p>From Melrose vineyards to Tiller timber, every valley in this county has its own personality, its own water, and its own market. Pick yours — Kimmy knows the road there.</p>
    <div class="pills mt">
      ${locations.map(l => `<a href="areas/${l.slug}/index.html">${esc(l.name)}</a>`).join('\n')}
    </div>
  </div>
  <div class="rv"><div class="arch" style="aspect-ratio:4/3"><img src="images/gen-roseburg.jpg" alt="Roseburg, Oregon nestled in the Umpqua Valley" loading="lazy"><div class="arch-tag">Roseburg — the hub of the Hundred Valleys</div></div></div>
</div></section>

<section><div class="wrap">
  <div class="sec-head rv"><div class="eyebrow">Free Guides</div>
    <h2>Everything they <em>don't tell you</em> about rural property.</h2>
    <p>Wells, septic, water rights, zoning, timber — the deep local knowledge most agents charge you in mistakes.</p>
  </div>
  <div class="grid g3">
    ${guides.slice(0, 6).map(g => `<article class="card rv"><a href="guides/${g.slug}/index.html"><img src="images/${g.img}" alt="${esc(g.title)}" loading="lazy"></a>
      <div class="card-b"><h3><a href="guides/${g.slug}/index.html">${esc(g.title)}</a></h3><p>${esc(g.desc)}</p><span class="more">Read the guide →</span></div></article>`).join('\n')}
  </div>
  <div class="center mt rv"><a class="btn ghost" href="guides/index.html">All ${guides.length} guides</a></div>
</div></section>

<section class="paper2"><div class="wrap">
  <div class="sec-head rv"><div class="eyebrow">Fresh from the blog</div><h2>Local market truth, <em>no fluff.</em></h2></div>
  <div class="grid g3">
    ${blogs.slice(0, 3).map(b => `<article class="card rv"><a href="blog/${b.slug}/index.html"><img src="images/${b.img}" alt="${esc(b.title)}" loading="lazy"></a>
      <div class="card-b"><h3><a href="blog/${b.slug}/index.html">${esc(b.title)}</a></h3><p>${esc(b.desc)}</p><span class="more">Read →</span></div></article>`).join('\n')}
  </div>
</div></section>`,
}));

function require_badge() {
  // pulled from lib at build time to keep hero markup tidy
  return badgeMarkup;
}
import { badge as badgeMarkup } from './lib/site.mjs';

// ============================================================ ABOUT
write('/about/', page({
  path: '/about/', active: 'about',
  title: 'Meet Kimmy Karlovich | Rural Real Estate Agent in Roseburg, Oregon',
  desc: 'Coos Bay-born, Douglas County-rooted. Barrel racer, horsewoman, hunter, and rural property specialist with The Operative Group. Meet the agent who lives the life she sells.',
  ogImg: 'images/kimmy-portrait.jpg',
  schema: [breadcrumbSchema([['Home', '/'], ['Meet Kimmy', '/about/']])],
  body: `
<div class="phero"><div class="wrap">
  ${crumbs('../', [['Home', 'index.html'], ['Meet Kimmy', '']])}
  <div class="eyebrow">Meet Kimmy</div>
  <h1>Coast kid. Cowgirl. <em>Your rural specialist.</em></h1>
  <p>Real estate agents say "local expert" a lot. Kimmy's version involves 4am feedings, a barrel horse in the trailer, and a county she knows gravel road by gravel road.</p>
</div></div>

<section><div class="wrap split">
  <div class="rv"><div class="arch" style="aspect-ratio:3/4"><img src="../images/kimmy-portrait.jpg" alt="Kimmy Karlovich with her horse"><div class="arch-tag">Kimmy Karlovich · The Operative Group</div></div></div>
  <div class="rv">
    <div class="eyebrow">The Story</div>
    <h2>Born on the coast, <em>rooted in the valley.</em></h2>
    <p>Kimmy was born and raised in Coos Bay, where the outdoors wasn't a hobby — it was the whole childhood. She moved to Douglas County in her early twenties, and one look at the Hundred Valleys of the Umpqua settled it: this was home for good.</p>
    <p>Today her life is the one her clients dream about. Horses in the pasture and a barrel horse in training. Cattle dogs in the truck bed. Hunting seasons circled on the calendar, rivers fished all summer, and a daughter growing up horseback at the county fair.</p>
    <p>Real estate found her naturally — she was already the friend people called to ask which valleys held water, which roads washboard in winter, and whose hay was worth buying. With ${BROKERAGE}, she turned that deep local knowledge into a career helping people buy and sell the rural life itself.</p>
    <ul class="checks">
      <li>Licensed Oregon Real Estate Broker with ${BROKERAGE}</li>
      <li>Lifelong horsewoman and active barrel racer</li>
      <li>Rural property owner — wells, septic, hay, and mud, firsthand</li>
      <li>Hunter and angler who knows the county's wild corners</li>
      <li>Douglas County local with a referral network of inspectors, well drillers, foresters, and lenders</li>
    </ul>
    <div class="hero-cta"><a class="btn" href="tel:${PHONE_TEL}">Call ${PHONE}</a><a class="btn ghost" href="../the-life/index.html">See The Life</a></div>
  </div>
</div></section>

<section class="quote"><div class="wrap">
  <blockquote class="rv">"With my deep understanding of the local market and my commitment to my clients, my promise is simple: <b>the truth about every property</b> — including the ones I'd walk away from."</blockquote>
  <cite class="rv">— Kimmy</cite>
</div></section>

<section class="paper2"><div class="wrap">
  <div class="sec-head rv"><div class="eyebrow">How she works</div><h2>The Kimmy <em>method.</em></h2></div>
  <div class="grid g3">
    <div class="card rv"><div class="card-b"><h3>1. Boots first</h3><p>Every property gets walked — fence lines, water, outbuildings, drainage. Listings tell stories; ground tells the truth. Kimmy reads the ground.</p></div></div>
    <div class="card rv"><div class="card-b"><h3>2. Paper second</h3><p>Well logs, water rights, zoning verification, septic records, easements, deferral status. The diligence stack is where rural deals are won — and where she does her heaviest lifting.</p></div></div>
    <div class="card rv"><div class="card-b"><h3>3. People always</h3><p>Straight answers, fast callbacks, and the extra mile as standard practice. Her reputation in this county outweighs any single deal — and it shows in how she treats both sides of every table.</p></div></div>
  </div>
</div></section>`,
}));

// ============================================================ CONTACT
write('/contact/', page({
  path: '/contact/', active: 'contact',
  title: 'Contact Kimmy Karlovich | Roseburg & Douglas County Rural Realtor',
  desc: 'Call or text 541-643-9509, or email kimberly@theoperativegroup.com. Rural, ranch, and horse property help across Douglas County, Oregon.',
  schema: [breadcrumbSchema([['Home', '/'], ['Contact', '/contact/']])],
  body: `
<div class="phero"><div class="wrap">
  ${crumbs('../', [['Home', 'index.html'], ['Contact', '']])}
  <div class="eyebrow">Contact</div>
  <h1>Call. Text. Email. <em>Kimmy answers.</em></h1>
  <p>No call centers, no assistants triaging you — the person who picks up is the person who'll walk your fence lines.</p>
</div></div>
<section><div class="wrap split">
  <div class="rv">
    <div class="eyebrow">Reach her directly</div>
    <h2>Let's talk <em>dirt.</em></h2>
    <table class="meta">
      <tr><td>Phone / Text</td><td><a href="tel:${PHONE_TEL}">${PHONE}</a></td></tr>
      <tr><td>Email</td><td><a href="mailto:${EMAIL}">${EMAIL}</a></td></tr>
      <tr><td>Instagram</td><td><a href="${IG}" rel="noopener">@kimmy_karlovich</a></td></tr>
      <tr><td>Zillow</td><td><a href="${ZILLOW}" rel="noopener">Karlovich Realty</a></td></tr>
      <tr><td>Brokerage</td><td>${BROKERAGE}</td></tr>
      <tr><td>Territory</td><td>Roseburg &amp; all of Douglas County, OR</td></tr>
    </table>
    <p>Buying, selling, or just weighing options a year out — early conversations are free, honest, and never pushy.</p>
  </div>
  <div class="rv">
    <div class="card"><div class="card-b">
      <h3>Send a quick note</h3>
      <p style="margin-bottom:.6rem">Fills out an email to Kimmy — she typically replies same day.</p>
      <label>Name<br><input id="f-name" style="width:100%;padding:.7rem;border:1px solid var(--line);border-radius:10px;margin:.3rem 0 .9rem;font:inherit;background:var(--paper)"></label>
      <label>Phone<br><input id="f-phone" style="width:100%;padding:.7rem;border:1px solid var(--line);border-radius:10px;margin:.3rem 0 .9rem;font:inherit;background:var(--paper)"></label>
      <label>What are you looking to do?<br><textarea id="f-msg" rows="5" style="width:100%;padding:.7rem;border:1px solid var(--line);border-radius:10px;margin:.3rem 0 1rem;font:inherit;background:var(--paper)"></textarea></label>
      <button class="btn big" onclick="askKimmy('buy')" style="width:100%;justify-content:center">Send to Kimmy →</button>
    </div></div>
  </div>
</div></section>`,
}));

// ============================================================ BUY / SELL
write('/buy/', page({
  path: '/buy/', active: 'buy',
  title: 'Buy Rural Property in Douglas County, Oregon | Kimmy Karlovich',
  desc: 'Buying a farm, ranch, horse property, or acreage in Douglas County? Kimmy Karlovich guides the full rural diligence stack — wells, septic, zoning, water rights. 541-643-9509.',
  schema: [breadcrumbSchema([['Home', '/'], ['Buy', '/buy/']])],
  body: `
<div class="phero"><div class="wrap">
  ${crumbs('../', [['Home', 'index.html'], ['Buy With Kimmy', '']])}
  <div class="eyebrow">Buy With Kimmy</div>
  <h1>Buy the country <em>without the crash course.</em></h1>
  <p>Rural purchases have layers city deals never see — wells, septic, zoning, water rights, easements, fire insurance. Kimmy runs the whole stack so your dream property doesn't come with expensive lessons.</p>
</div></div>
<section><div class="wrap">
  <div class="sec-head rv"><div class="eyebrow">The process</div><h2>Five steps, <em>zero surprises.</em></h2></div>
  <div class="grid g3">
    <div class="card rv"><div class="card-b"><h3>1. The life conversation</h3><p>Horses? Cattle? Garden and shop? Total privacy? The right valley depends on the life you're actually building — that's where every search starts.</p></div></div>
    <div class="card rv"><div class="card-b"><h3>2. Money matched to dirt</h3><p>USDA zero-down, conventional, land loans, Farm Credit, seller terms — Kimmy pairs you with lenders who actually close rural files.</p></div></div>
    <div class="card rv"><div class="card-b"><h3>3. Boots-on showings</h3><p>She walks fence lines, digs a boot heel into arena footing, and checks winter drainage while you're falling in love with the view.</p></div></div>
    <div class="card rv"><div class="card-b"><h3>4. The diligence stack</h3><p>Well logs and flow tests, septic inspection or feasibility, zoning verification, water rights, easements, insurance quotes — sequenced inside your protected timeline.</p></div></div>
    <div class="card rv"><div class="card-b"><h3>5. Negotiate & close</h3><p>Offers built to win without overpaying, repairs negotiated from evidence, and a closing that lands on schedule. Then she hands you the local rolodex.</p></div></div>
    <div class="card rv"><div class="card-b"><h3>☎ Start today</h3><p>25+ buyers are actively looking in Lane &amp; Douglas County through her team right now — inventory moves. Get positioned first.</p><a class="btn" href="tel:${PHONE_TEL}">Call ${PHONE}</a></div></div>
  </div>
</div></section>
${faqBlock([
    { q: 'What does it cost to have Kimmy represent me as a buyer?', a: 'In most transactions the buyer\'s agent fee is paid from the transaction as negotiated in the deal — Kimmy explains exactly how compensation works in your specific purchase before you sign anything, with total transparency.' },
    { q: 'How fast do good rural properties move in Douglas County?', a: 'Well-priced horse setups and homes on usable acreage can go under contract in days. Kimmy\'s clients hear about the right listings immediately — and sometimes before they list.' },
    { q: 'Can Kimmy help me buy bare land to build on?', a: 'Absolutely — land is one of her core specialties. Expect a feasibility-first process: septic evaluation, well research, zoning verification, and access review, all before your earnest money goes hard.' },
    { q: 'I\'m relocating from out of state. How does that work?', a: 'Video walkthroughs where she narrates what the camera can\'t show, honest area matchmaking before you fly in, and efficient in-person tour days when you do. She relocates families into this county constantly.' },
  ], 'Buyer questions, answered')}`,
}));

write('/sell/', page({
  path: '/sell/', active: 'sell',
  title: 'Sell Your Ranch, Farm or Rural Home in Douglas County | Kimmy Karlovich',
  desc: 'Selling rural property in Douglas County? Kimmy Karlovich brings documentation-driven prep, golden-hour marketing, and buyers from across the West. 541-643-9509.',
  schema: [breadcrumbSchema([['Home', '/'], ['Sell', '/sell/']])],
  body: `
<div class="phero"><div class="wrap">
  ${crumbs('../', [['Home', 'index.html'], ['Sell With Kimmy', '']])}
  <div class="eyebrow">Sell With Kimmy</div>
  <h1>Your place deserves better than <em>three photos and a prayer.</em></h1>
  <p>Rural properties sell for top dollar when they're documented, prepared, and marketed to the buyers who pay for what makes them special. That's the whole playbook — and Kimmy runs every page of it.</p>
</div></div>
<section><div class="wrap">
  <div class="sec-head rv"><div class="eyebrow">The listing system</div><h2>How rural sells <em>for more.</em></h2></div>
  <div class="grid g3">
    <div class="card rv"><div class="card-b"><h3>Kill the surprises first</h3><p>Septic pumped and inspected, well tested, woodstove certified, paperwork gathered — before listing. Prepared properties hold their price through inspections; unprepared ones renegotiate.</p></div></div>
    <div class="card rv"><div class="card-b"><h3>Document everything</h3><p>Water rights, well logs, deferral status, outbuilding specs, boundaries mapped. Buyers pay premiums for verified answers and discount hard for mysteries.</p></div></div>
    <div class="card rv"><div class="card-b"><h3>Golden-hour marketing</h3><p>Drone coverage of the full parcel, photography timed to your property's best light and season, and listing copy that sells the life — not just the square footage.</p></div></div>
    <div class="card rv"><div class="card-b"><h3>Buyers beyond the MLS</h3><p>Out-of-state relocation buyers, the Oregon horse community, farm and timber networks — marketed where your specific buyer actually shops.</p></div></div>
    <div class="card rv"><div class="card-b"><h3>Negotiation with a spine</h3><p>Evidence-based pricing means offers get answered from strength — and inspection-period nickel-and-diming gets handled before it starts.</p></div></div>
    <div class="card rv"><div class="card-b"><h3>☎ Free walk-through</h3><p>Selling this year or three years out — Kimmy does free property walk-throughs with a prioritized prep punch list. It routinely adds five figures.</p><a class="btn" href="tel:${PHONE_TEL}">Book yours</a></div></div>
  </div>
</div></section>
${faqBlock([
    { q: 'What is my rural property worth?', a: 'Not what an online estimate says — algorithms can\'t see water rights, arena quality, or usable versus paper acres. Kimmy builds valuations from local closed sales plus the rural features that actually drive price here. The walk-through and analysis are free.' },
    { q: 'When should I start preparing to sell?', a: 'Ideally 6–12 months out: septic and well testing, cleanup, fence repair, and paperwork all cost less and return more when they\'re not rushed. But she\'s also listed well-kept places in two weeks. Start with the walk-through.' },
    { q: 'Do I need to sell timber or equipment separately?', a: 'Sometimes yes, sometimes bundled — it depends on the numbers. Kimmy coordinates timber cruises, farm auctions, and estate sales so the whole property package nets you the most.' },
    { q: 'Will out-of-area buyers really find my property?', a: 'That\'s exactly who her marketing targets — equity buyers from California, Washington, and metro Oregon shop hard online first, which is why documentation and presentation move rural sale prices more than ever.' },
  ], 'Seller questions, answered')}`,
}));

// ============================================================ THE LIFE (gallery)
const galleryShots = [
  ['barrel-race-1.jpg', 'Kimmy barrel racing — turning the first barrel', 'Turning the first can'],
  ['barrel-race-2.jpg', 'Kimmy and her horse at full speed between barrels', 'Full send between cans'],
  ['kimmy-portrait.jpg', 'Kimmy with her quarter horse', 'Kimmy & one of her girls'],
  ['pasture-family.jpg', 'Horses, daughter, and cattle dog in summer pasture', 'Summer pasture, whole crew'],
  ['kimmy-daughter-horse.jpg', 'Kimmy and daughter with their horse in the arena', 'Raising the next generation horseback'],
  ['daughter-riding.jpg', 'Kimmy\'s daughter riding bareback', 'Started young, like her mama'],
  ['beach-ride.jpg', 'Two riders on horseback on the Oregon coast at sunset', 'Coast rides, 90 minutes west'],
  ['arena-pov.jpg', 'View between a horse\'s ears at the arena', 'The office view'],
  ['horseback-dog.jpg', 'Horseback view of a cattle dog resting in the arena', 'Ranch hand on break'],
  ['jumping.jpg', 'Horse and rider clearing a jump', 'Not just barrels'],
  ['cattle-dog.jpg', 'Blue heeler looking up from the pasture', 'Best hand in the county'],
  ['coast-walk.jpg', 'Walking the Oregon coast with the dogs', 'Coos Bay roots run deep'],
];
write('/the-life/', page({
  path: '/the-life/', active: 'life',
  title: 'The Life — Rural Douglas County Through Kimmy\'s Camera Roll',
  desc: 'Barrel racing, beach rides, cattle dogs, horses, and Umpqua Valley living — the real rural Oregon life Kimmy Karlovich lives and sells.',
  ogImg: 'images/barrel-race-1.jpg',
  schema: [breadcrumbSchema([['Home', '/'], ['The Life', '/the-life/']])],
  body: `
<div class="phero"><div class="wrap">
  ${crumbs('../', [['Home', 'index.html'], ['The Life', '']])}
  <div class="eyebrow">The Life</div>
  <h1>Proof of <em>life.</em></h1>
  <p>No stock photos, no staging — this is Kimmy's actual camera roll. The barrel runs, the beach rides, the dogs, the kid growing up horseback. This is what you're really buying in Douglas County.</p>
</div></div>
<section><div class="wrap">
  <div class="masonry">
    ${galleryShots.map(([f, alt, cap]) => `<figure class="rv"><img src="../images/${f}" alt="${esc(alt)}" loading="lazy"><figcaption>${esc(cap)}</figcaption></figure>`).join('\n')}
  </div>
  <div class="center mt rv"><p style="margin-bottom:1rem">Want this life? It's for sale — in 26 communities across Douglas County.</p>
  <a class="btn big" href="tel:${PHONE_TEL}">Call Kimmy · ${PHONE}</a></div>
</div></section>`,
}));

// ============================================================ SERVICES HUB + PAGES
write('/services/', page({
  path: '/services/', active: 'services',
  title: 'Rural Real Estate Specialties | Farm, Ranch, Horse & Land — Kimmy Karlovich',
  desc: 'Eight rural specialties across Douglas County: farm & ranch, horse property, land & acreage, rural homes, riverfront, timber, hunting ground, and vineyards.',
  schema: [breadcrumbSchema([['Home', '/'], ['Specialties', '/services/']])],
  body: `
<div class="phero"><div class="wrap">
  ${crumbs('../', [['Home', 'index.html'], ['Specialties', '']])}
  <div class="eyebrow">Specialties</div>
  <h1>Eight flavors of <em>rural.</em></h1>
  <p>Every kind of country property has its own diligence, its own buyers, and its own tricks. Pick your flavor — Kimmy speaks all eight fluently.</p>
</div></div>
<section><div class="wrap"><div class="grid g4">
  ${services.map(s => `<article class="card rv"><a href="${s.slug}/index.html"><img src="../images/${s.img}" alt="${esc(s.name)}" loading="lazy"></a>
    <div class="card-b"><h3><a href="${s.slug}/index.html">${esc(s.short)}</a></h3><p>${esc(s.heroLine)}</p><span class="more">Explore →</span></div></article>`).join('\n')}
</div></div></section>`,
}));

for (const s of services) {
  write(`/services/${s.slug}/`, page({
    path: `/services/${s.slug}/`, active: 'services',
    title: `${s.name} — Douglas County OR | Kimmy Karlovich`,
    desc: trunc(`${s.heroLine} ${s.intro}`, 118) + ' Roseburg & Douglas County. 541-643-9509.',
    ogImg: `images/${s.img}`,
    schema: [
      breadcrumbSchema([['Home', '/'], ['Specialties', '/services/'], [s.short, `/services/${s.slug}/`]]),
      faqSchema(s.faqs),
      { '@context': 'https://schema.org', '@type': 'Service', name: s.name, provider: { '@type': 'RealEstateAgent', name: 'Kimmy Karlovich' }, areaServed: 'Douglas County, Oregon', description: s.intro },
    ],
    body: `
<div class="phero"><div class="wrap">
  ${crumbs('../../', [['Home', 'index.html'], ['Specialties', 'services/index.html'], [s.short, '']])}
  <div class="eyebrow">${esc(s.short)}</div>
  <h1>${esc(s.heroLine).replace(/\.$/, '')}<em>.</em></h1>
  <p>${esc(s.intro)}</p>
</div></div>
<section><div class="wrap split">
  <div class="rv"><div class="arch" style="aspect-ratio:4/5"><img src="../../images/${s.img}" alt="${esc(s.name)} — Douglas County, Oregon"><div class="arch-tag">${esc(s.short)} · Douglas County</div></div></div>
  <div class="rv">
    <div class="eyebrow">What Kimmy brings</div>
    <h2>Specialist knowledge, <em>not a checkbox.</em></h2>
    <ul class="checks">${s.bullets.map(b => `<li>${esc(b)}</li>`).join('')}</ul>
    <div class="hero-cta"><a class="btn" href="tel:${PHONE_TEL}">Call ${PHONE}</a><a class="btn ghost" href="mailto:${EMAIL}">Email Kimmy</a></div>
  </div>
</div></section>
<section class="paper2"><div class="wrap"><div class="prose">
  ${s.body.map(sec => `<h2 class="rv">${esc(sec.h)}</h2><p class="rv">${esc(sec.p)}</p>`).join('\n')}
</div></div></section>
${faqBlock(s.faqs)}
<section><div class="wrap">
  <div class="sec-head rv"><div class="eyebrow">By community</div><h2>${esc(s.short)} <em>near you.</em></h2>
  <p>Local pages for every Douglas County community Kimmy serves:</p></div>
  <div class="pills rv">${locations.map(l => `<a href="../../areas/${l.slug}/${s.slug}/index.html">${esc(l.name)}</a>`).join('\n')}</div>
</div></section>`,
  }));
}

// ============================================================ AREAS HUB + LOCATION PAGES
write('/areas/', page({
  path: '/areas/', active: 'areas',
  title: 'Douglas County Communities | Rural Real Estate by Area — Kimmy Karlovich',
  desc: 'Explore all 26 Douglas County communities Kimmy serves — Roseburg, Melrose, Lookingglass, Oakland, Glide, Elkton, and more. Local property knowledge, valley by valley.',
  schema: [breadcrumbSchema([['Home', '/'], ['Communities', '/areas/']])],
  body: `
<div class="phero"><div class="wrap">
  ${crumbs('../', [['Home', 'index.html'], ['Communities', '']])}
  <div class="eyebrow">Communities</div>
  <h1>The Hundred Valleys, <em>valley by valley.</em></h1>
  <p>Twenty-six communities, each with its own water, market, and personality. Kimmy has driven every road on this page — probably this month.</p>
</div></div>
<section><div class="wrap"><div class="grid g3">
  ${locations.map(l => `<article class="card rv"><div class="card-b">
    <h3><a href="${l.slug}/index.html">${esc(l.name)}</a></h3>
    <p><b style="color:var(--turq-deep)">${esc(l.tagline)}</b></p>
    <p>${esc(l.character.slice(0, 130))}…</p>
    <span class="more">Explore ${esc(l.name)} →</span></div></article>`).join('\n')}
</div></div></section>`,
}));

for (const l of locations) {
  write(`/areas/${l.slug}/`, page({
    path: `/areas/${l.slug}/`, active: 'areas',
    title: `${l.name} OR Real Estate — Land, Homes & Ranches | Kimmy Karlovich`,
    desc: trunc(`${l.tagline}. ${l.character}`, 105) + ` Local ${l.name} expertise from Kimmy Karlovich, 541-643-9509.`,
    schema: [
      breadcrumbSchema([['Home', '/'], ['Communities', '/areas/'], [l.name, `/areas/${l.slug}/`]]),
      { '@context': 'https://schema.org', '@type': 'Place', name: `${l.name}, Oregon`, description: l.character, containedInPlace: { '@type': 'AdministrativeArea', name: 'Douglas County, Oregon' } },
    ],
    body: `
<div class="phero"><div class="wrap">
  ${crumbs('../../', [['Home', 'index.html'], ['Communities', 'areas/index.html'], [l.name, '']])}
  <div class="eyebrow">${esc(l.name)}, Oregon</div>
  <h1>${esc(l.name)}: <em>${esc(l.tagline)}.</em></h1>
  <p>${esc(l.character)}</p>
</div></div>
<section><div class="wrap split">
  <div class="rv">
    <div class="eyebrow">Local facts</div>
    <h2>Know ${esc(l.name)} <em>like a local.</em></h2>
    <table class="meta">
      <tr><td>Population</td><td>${esc(l.pop)}</td></tr>
      <tr><td>ZIP</td><td>${l.zips.join(', ')}</td></tr>
      <tr><td>To Roseburg</td><td>${esc(l.driveToRoseburg)}</td></tr>
      <tr><td>Known for</td><td>${l.landmarks.slice(0, 3).map(esc).join(' · ')}</td></tr>
    </table>
    <h3 style="margin:1.4rem 0 .6rem">The property picture</h3>
    <p style="color:var(--ink2)">${esc(l.propertyNotes)}</p>
    <h3 style="margin:1.4rem 0 .6rem">The lifestyle</h3>
    <p style="color:var(--ink2)">${esc(l.lifestyle)}</p>
  </div>
  <div class="rv">
    <div class="card"><div class="card-b">
      <h3>Property types in ${esc(l.name)}</h3>
      <p>Kimmy's specialty pages for this community:</p>
      ${services.map(s => `<a href="${s.slug}/index.html" style="display:block;padding:.55rem 0;border-bottom:1px solid var(--line);font-weight:600">${esc(s.short)} in ${esc(l.name)} →</a>`).join('\n')}
    </div></div>
    <div class="mt center"><a class="btn big" href="tel:${PHONE_TEL}">Talk ${esc(l.name)} property · ${PHONE}</a></div>
  </div>
</div></section>
${faqBlock([
      { q: `Is ${l.name} a good place to buy rural property?`, a: `${l.tagline}. ${l.propertyNotes.split('.')[0]}. Kimmy knows the ${l.name} market parcel by parcel and can tell you honestly whether it fits your plans — and what a fair price looks like right now.` },
      { q: `How far is ${l.name} from Roseburg?`, a: `${l.driveToRoseburg === 'You are here' ? 'Roseburg is the county seat itself — hospitals, shopping, and services are all local.' : `About ${l.driveToRoseburg} to Roseburg's hospitals, shopping, and services.`}` },
      { q: `What is ${l.name} known for?`, a: `${l.landmarks.map(x => x).join(', ')} — plus the lifestyle: ${l.lifestyle}` },
    ], `${l.name} questions, answered`)}`,
  }));

  // ---------------- combo pages: location × service
  for (const s of services) {
    const seed = l.slug + s.slug;
    const opener = pick([
      `Looking to ${s.verb} in ${l.name}? You've found the local.`,
      `${l.name} — ${l.tagline} — has a character all its own, and for anyone hoping to ${s.verb} here, that character shapes everything.`,
      `Few agents know both ${s.short.toLowerCase()} and the ${l.name} market from lived experience. Kimmy does.`,
      `If your plan is to ${s.verb} in the ${l.name} area, local knowledge isn't optional — it's the whole game.`,
    ], seed);
    const bridge = pick([
      `Here's the thing about ${l.name}: ${l.propertyNotes}`,
      `The local picture matters. ${l.propertyNotes}`,
      `What does that mean on the ground in ${l.name}? ${l.propertyNotes}`,
    ], seed + '2');
    const closer = pick([
      `Kimmy pairs that community knowledge with deep ${s.short.toLowerCase()} expertise. ${s.intro}`,
      `Layer Kimmy's ${s.short.toLowerCase()} specialty on top: ${s.intro}`,
      `Kimmy brings the specialty side. ${s.intro}`,
    ], seed + '3');
    const localFaq = [
      { q: `Who is the best ${s.short.toLowerCase()} agent near ${l.name}, Oregon?`, a: `You want an agent who combines genuine ${s.short.toLowerCase()} expertise with parcel-level ${l.name} knowledge. Kimmy Karlovich lives the rural Douglas County life daily — horses, land, hunting, rivers — and serves ${l.name} as core territory (${l.driveToRoseburg === 'You are here' ? 'based right in Roseburg' : `about ${l.driveToRoseburg} from her Roseburg base`}). Call 541-643-9509 for a straight local conversation.` },
      ...s.faqs.slice(0, 3).map(f => ({ ...f })),
    ];
    write(`/areas/${l.slug}/${s.slug}/`, page({
      path: `/areas/${l.slug}/${s.slug}/`, active: 'areas',
      title: `${s.short} in ${l.name}, OR | Kimmy Karlovich`,
      desc: `${s.short} real estate in ${l.name}, Oregon — ${l.tagline}. Local Douglas County expertise from Kimmy Karlovich. 541-643-9509.`,
      ogImg: `images/${s.img}`,
      schema: [
        breadcrumbSchema([['Home', '/'], ['Communities', '/areas/'], [l.name, `/areas/${l.slug}/`], [s.short, `/areas/${l.slug}/${s.slug}/`]]),
        faqSchema(localFaq),
        { '@context': 'https://schema.org', '@type': 'Service', name: `${s.name} — ${l.name}, OR`, provider: { '@type': 'RealEstateAgent', name: 'Kimmy Karlovich' }, areaServed: `${l.name}, Oregon`, description: `${s.short} real estate services in ${l.name}, Douglas County, Oregon.` },
      ],
      body: `
<div class="phero"><div class="wrap">
  ${crumbs('../../../', [['Home', 'index.html'], ['Communities', 'areas/index.html'], [l.name, `areas/${l.slug}/index.html`], [s.short, '']])}
  <div class="eyebrow">${esc(s.short)} · ${esc(l.name)}, OR</div>
  <h1>${esc(s.short)} in <em>${esc(l.name)}.</em></h1>
  <p>${esc(opener)}</p>
</div></div>
<section><div class="wrap split">
  <div class="rv"><div class="arch" style="aspect-ratio:4/5"><img src="../../../images/${s.img}" alt="${esc(s.name)} near ${esc(l.name)}, Oregon"><div class="arch-tag">${esc(s.short)} · ${esc(l.name)}</div></div></div>
  <div class="rv">
    <div class="eyebrow">${esc(l.name)} + ${esc(s.short)}</div>
    <h2>Local ground, <em>specialist eyes.</em></h2>
    <p>${esc(bridge)}</p>
    <p>${esc(closer)}</p>
    <ul class="checks">${s.bullets.slice(0, 4).map(b => `<li>${esc(b)}</li>`).join('')}</ul>
    <div class="hero-cta"><a class="btn" href="tel:${PHONE_TEL}">Call ${PHONE}</a><a class="btn ghost" href="../../../services/${s.slug}/index.html">Full ${esc(s.short)} guide</a></div>
  </div>
</div></section>
<section class="paper2"><div class="wrap">
  <div class="sec-head rv"><div class="eyebrow">About the area</div><h2>${esc(l.name)}, <em>briefly.</em></h2><p>${esc(l.character)}</p></div>
  <table class="meta rv">
    <tr><td>Population</td><td>${esc(l.pop)}</td></tr>
    <tr><td>Drive to Roseburg</td><td>${esc(l.driveToRoseburg)}</td></tr>
    <tr><td>Known for</td><td>${l.landmarks.slice(0, 3).map(esc).join(' · ')}</td></tr>
    <tr><td>Lifestyle</td><td>${esc(l.lifestyle)}</td></tr>
  </table>
  <p class="rv"><a href="../index.html"><b>More about ${esc(l.name)} →</b></a></p>
</div></section>
${faqBlock(localFaq, `${s.short} in ${l.name} — FAQ`)}
<section><div class="wrap">
  <div class="sec-head rv"><div class="eyebrow">Nearby</div><h2>${esc(s.short)} in <em>nearby communities.</em></h2></div>
  <div class="pills rv">${locations.filter(x => x.slug !== l.slug).slice(0, 12).map(x => `<a href="../../${x.slug}/${s.slug}/index.html">${esc(x.name)}</a>`).join('\n')}</div>
</div></section>`,
    }));
  }
}

// ============================================================ GUIDES
write('/guides/', page({
  path: '/guides/', active: 'guides',
  title: 'Rural Property Guides | Wells, Septic, Water Rights, Zoning & More — Kimmy Karlovich',
  desc: `${guides.length} free in-depth guides to buying and selling rural property in Douglas County, Oregon — wells, septic, water rights, zoning, timber, financing, and more.`,
  schema: [breadcrumbSchema([['Home', '/'], ['Guides', '/guides/']])],
  body: `
<div class="phero"><div class="wrap">
  ${crumbs('../', [['Home', 'index.html'], ['Guides', '']])}
  <div class="eyebrow">Free Guides</div>
  <h1>The rural property <em>playbook.</em></h1>
  <p>Everything they don't tell you about country property — written by a local who lives it, free because informed clients make the best clients.</p>
</div></div>
<section><div class="wrap"><div class="grid g3">
  ${guides.map(g => `<article class="card rv"><a href="${g.slug}/index.html"><img src="../images/${g.img}" alt="${esc(g.title)}" loading="lazy"></a>
    <div class="card-b"><h3><a href="${g.slug}/index.html">${esc(g.title)}</a></h3><p>${esc(g.desc)}</p><span class="more">Read the guide →</span></div></article>`).join('\n')}
</div></div></section>`,
}));

for (const g of guides) {
  write(`/guides/${g.slug}/`, page({
    path: `/guides/${g.slug}/`, active: 'guides',
    title: `${g.title} | Kimmy Karlovich`,
    desc: g.desc,
    ogImg: `images/${g.img}`,
    schema: [
      breadcrumbSchema([['Home', '/'], ['Guides', '/guides/'], [g.title, `/guides/${g.slug}/`]]),
      faqSchema(g.faqs),
      { '@context': 'https://schema.org', '@type': 'Article', headline: g.title, description: g.desc, image: `${SITE}/images/${g.img}`, author: { '@type': 'Person', name: 'Kimmy Karlovich' }, publisher: { '@type': 'Organization', name: 'Kimmy Karlovich Real Estate' } },
    ],
    body: `
<div class="phero"><div class="wrap">
  ${crumbs('../../', [['Home', 'index.html'], ['Guides', 'guides/index.html'], [g.title.length > 42 ? g.title.slice(0, 40) + '…' : g.title, '']])}
  <div class="eyebrow">Free Guide</div>
  <h1>${esc(g.title)}</h1>
  <p>${esc(g.desc)}</p>
</div></div>
<section><div class="wrap"><div class="prose">
  ${g.sections.map(sec => `<h2 class="rv">${esc(sec.h)}</h2><p class="rv">${esc(sec.p)}</p>`).join('\n')}
</div></div></section>
${faqBlock(g.faqs)}
<section class="paper2"><div class="wrap center">
  <div class="sec-head rv"><h2>Questions this guide didn't answer?</h2><p>Kimmy will — specific to your property, your valley, and your plans. The conversation is free.</p></div>
  <a class="btn big rv" href="tel:${PHONE_TEL}">Call ${PHONE}</a>
</div></section>
<section><div class="wrap">
  <div class="sec-head rv"><div class="eyebrow">Keep reading</div><h2>More <em>guides.</em></h2></div>
  <div class="grid g3">
    ${guides.filter(x => x.slug !== g.slug).slice(0, 3).map(x => `<article class="card rv"><a href="../${x.slug}/index.html"><img src="../../images/${x.img}" alt="${esc(x.title)}" loading="lazy"></a><div class="card-b"><h3><a href="../${x.slug}/index.html">${esc(x.title)}</a></h3><span class="more">Read →</span></div></article>`).join('\n')}
  </div>
</div></section>`,
  }));
}

// ============================================================ BLOG
const fmtDate = (d) => new Date(d + 'T12:00:00').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

write('/blog/', page({
  path: '/blog/', active: 'blog',
  title: 'Blog | Douglas County Rural Real Estate — Kimmy Karlovich',
  desc: 'Market updates, buying tactics, and rural life from Roseburg\'s rural property specialist. Local truth, no fluff.',
  schema: [breadcrumbSchema([['Home', '/'], ['Blog', '/blog/']])],
  body: `
<div class="phero"><div class="wrap">
  ${crumbs('../', [['Home', 'index.html'], ['Blog', '']])}
  <div class="eyebrow">The Blog</div>
  <h1>Local market truth, <em>no fluff.</em></h1>
  <p>What's actually happening in the Umpqua Valley market — plus the tactics, checklists, and stories you only get from an agent who lives this.</p>
</div></div>
<section><div class="wrap"><div class="grid g3">
  ${blogs.map(b => `<article class="card rv"><a href="${b.slug}/index.html"><img src="../images/${b.img}" alt="${esc(b.title)}" loading="lazy"></a>
    <div class="card-b"><p style="font-size:.82rem;font-weight:700;letter-spacing:.08em;color:var(--pink-deep);text-transform:uppercase">${fmtDate(b.date)}</p>
    <h3><a href="${b.slug}/index.html">${esc(b.title)}</a></h3><p>${esc(b.desc)}</p><span class="more">Read →</span></div></article>`).join('\n')}
</div></div></section>`,
}));

const mdBold = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
for (const b of blogs) {
  write(`/blog/${b.slug}/`, page({
    path: `/blog/${b.slug}/`, active: 'blog',
    title: `${b.title} | Kimmy Karlovich`,
    desc: b.desc,
    ogImg: `images/${b.img}`,
    schema: [
      breadcrumbSchema([['Home', '/'], ['Blog', '/blog/'], [b.title, `/blog/${b.slug}/`]]),
      { '@context': 'https://schema.org', '@type': 'BlogPosting', headline: b.title, description: b.desc, datePublished: b.date, image: `${SITE}/images/${b.img}`, author: { '@type': 'Person', name: 'Kimmy Karlovich' } },
    ],
    body: `
<div class="phero"><div class="wrap">
  ${crumbs('../../', [['Home', 'index.html'], ['Blog', 'blog/index.html'], [b.title.length > 42 ? b.title.slice(0, 40) + '…' : b.title, '']])}
  <div class="eyebrow">${fmtDate(b.date)} · Kimmy Karlovich</div>
  <h1>${esc(b.title)}</h1>
</div></div>
<section><div class="wrap"><div class="prose">
  <p class="lede rv">${mdBold(b.body[0])}</p>
  ${b.body.slice(1).map(p => `<p class="rv">${mdBold(p)}</p>`).join('\n')}
</div></div></section>
<section class="paper2"><div class="wrap">
  <div class="sec-head rv"><div class="eyebrow">Keep reading</div><h2>More from the <em>blog.</em></h2></div>
  <div class="grid g3">
    ${blogs.filter(x => x.slug !== b.slug).slice(0, 3).map(x => `<article class="card rv"><a href="../${x.slug}/index.html"><img src="../../images/${x.img}" alt="${esc(x.title)}" loading="lazy"></a><div class="card-b"><h3><a href="../${x.slug}/index.html">${esc(x.title)}</a></h3><span class="more">Read →</span></div></article>`).join('\n')}
  </div>
</div></section>`,
  }));
}

// ============================================================ LEGAL PAGES
const legalPages = [
  {
    slug: 'privacy-policy', title: 'Privacy Policy',
    desc: 'How kimmykarlovich.com handles your information — plainly stated.',
    sections: [
      { h: 'The short version', p: `This website is an informational site for Kimmy Karlovich's real estate services. It does not require accounts, does not set tracking cookies of its own, and does not run third-party advertising. When you contact Kimmy by phone, text, or email, the information you choose to share is used to respond to you and to provide real estate services — nothing else.` },
      { h: 'What we collect', p: `If you reach out, we receive whatever you send: typically your name, contact information, and details about the property you're buying or selling. The site itself collects no personal information automatically. Our hosting provider (like nearly all web hosts) may keep standard server logs — IP address, pages requested, timestamps — for security and operations.` },
      { h: 'How it\'s used', p: `To respond to your inquiry, provide real estate services, and stay in touch about your transaction or search. Your information is never sold. It is shared only as needed to serve you (for example, with a title company or lender during a transaction you're part of) or as required by law.` },
      { h: 'Email and texting', p: `If you text or email Kimmy, you may receive replies by the same channel. You can opt out of any ongoing communication at any time by replying and saying so — no hard feelings, no hoops.` },
      { h: 'Third-party links', p: `Pages on this site link to outside services (Instagram, Zillow, Google Fonts for typography). Those services have their own privacy practices, which we don't control.` },
      { h: 'Your rights', p: `You can ask what information we hold about you, ask for it to be corrected, or ask for it to be deleted (subject to records we're legally required to keep as part of a real estate transaction). Email ${EMAIL} or call ${PHONE} and we'll take care of it.` },
      { h: 'Questions', p: `This policy is written to be readable rather than exhaustive. If anything is unclear, contact Kimberly Karlovich at ${EMAIL} or ${PHONE}. Last updated August 2026.` },
    ],
  },
  {
    slug: 'terms-of-service', title: 'Terms of Service',
    desc: 'The terms that govern use of this website.',
    sections: [
      { h: 'Use of this site', p: `Welcome. By using this website you agree to these terms. The site exists to share information about real estate in Douglas County, Oregon and about Kimmy Karlovich's services. Use it lawfully and don't attempt to disrupt, scrape abusively, or misrepresent its content as your own.` },
      { h: 'Not professional advice', p: `Content on this site — including guides and blog posts about zoning, wells, septic systems, water rights, taxes, financing, and insurance — is general information, not legal, tax, engineering, or financial advice. Rules change and every property is different. Verify specifics with Douglas County, the State of Oregon, and the appropriate licensed professionals before relying on anything here. For advice specific to your situation, talk to Kimmy directly.` },
      { h: 'No guarantee of results', p: `Real estate markets move. Nothing on this site is a promise about property values, sale prices, timelines, loan approval, or the availability of any property or program.` },
      { h: 'Brokerage relationship', p: `Kimberly Karlovich is a licensed Oregon Real Estate Broker with ${BROKERAGE}. Viewing this website does not create an agency relationship. Agency relationships in Oregon are established through written disclosure and agreement, which Kimmy will review with you at the appropriate time.` },
      { h: 'Intellectual property', p: `Text and original photography on this site belong to Kimberly Karlovich or are used with permission. You're welcome to share links; please don't republish content wholesale without asking.` },
      { h: 'Fair housing', p: `Kimmy is committed to the letter and spirit of the Fair Housing Act and Oregon fair housing law. Services are provided without regard to race, color, religion, sex, disability, familial status, national origin, sexual orientation, gender identity, marital status, or source of income.` },
      { h: 'Changes and contact', p: `These terms may be updated from time to time; the current version always lives at this page. Questions: ${EMAIL} or ${PHONE}. Last updated August 2026.` },
    ],
  },
  {
    slug: 'do-not-sell', title: 'Do Not Sell or Share My Personal Information',
    desc: 'Your data is not for sale — and how to exercise your privacy rights.',
    sections: [
      { h: 'The plain answer', p: `We do not sell your personal information. We do not share it with third parties for cross-context behavioral advertising. There is no ad-tech on this site, no data broker relationships, and no marketing lists being traded. This page exists so that's on the record — and so you have a clear way to exercise your rights anyway.` },
      { h: 'Your right to opt out', p: `Under laws like the California Consumer Privacy Act (CCPA/CPRA) and similar state laws, you can direct a business not to sell or share your personal information. Since we don't sell or share it in the first place, there's nothing to switch off — but if you'd like that confirmed in writing for your records, ask and you'll have it.` },
      { h: 'Other privacy requests', p: `You may also request access to, correction of, or deletion of personal information you've provided (subject to transaction records Oregon law requires brokers to retain). We honor these requests regardless of which state you live in.` },
      { h: 'How to submit a request', p: `Email ${EMAIL} with the subject line "Privacy Request", or call ${PHONE}. Include your name and how you previously interacted with us so we can locate any information. We'll respond within 45 days, and we will never discriminate against you for exercising your privacy rights.` },
    ],
  },
  {
    slug: 'accessibility', title: 'Accessibility Statement',
    desc: 'Our commitment to an accessible website — and how to reach us if something isn\'t working for you.',
    sections: [
      { h: 'Our commitment', p: `Everyone deserves full access to information about buying and selling property. This site is built to follow the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA as closely as practical, and accessibility is considered in every update.` },
      { h: 'What we\'ve done', p: `Semantic HTML structure with proper heading order and landmarks; descriptive alt text on meaningful images; sufficient color contrast between text and backgrounds; keyboard-navigable menus and controls; readable font sizes with relative units that respect browser zoom; reduced-motion support that disables animations when your system requests it; and forms with associated labels.` },
      { h: 'Known limitations', p: `Some photography-heavy sections are decorative by nature, and third-party services we link to (Instagram, Zillow) have their own accessibility practices we can't control.` },
      { h: 'Alternative access', p: `Every piece of information on this site is available directly from Kimmy by phone or email — often faster than any website. If a page isn't working with your assistive technology, call ${PHONE} and you'll get the same information, human to human.` },
      { h: 'Feedback', p: `If you hit an accessibility barrier anywhere on this site, please tell us: ${EMAIL} or ${PHONE}. Reports get fixed, not filed. Last reviewed August 2026.` },
    ],
  },
];

for (const lp of legalPages) {
  write(`/${lp.slug}/`, page({
    path: `/${lp.slug}/`, active: '',
    title: `${lp.title} | Kimmy Karlovich`,
    desc: lp.desc,
    schema: [breadcrumbSchema([['Home', '/'], [lp.title, `/${lp.slug}/`]])],
    body: `
<div class="phero"><div class="wrap">
  ${crumbs('../', [['Home', 'index.html'], [lp.title, '']])}
  <div class="eyebrow">Legal</div>
  <h1>${esc(lp.title)}</h1>
  <p>${esc(lp.desc)}</p>
</div></div>
<section><div class="wrap"><div class="prose">
  ${lp.sections.map(sec => `<h2>${esc(sec.h)}</h2><p>${esc(sec.p)}</p>`).join('\n')}
</div></div></section>`,
  }));
}

// ============================================================ assets, sitemap, robots, 404
mkdirSync(join(OUT, 'assets'), { recursive: true });
writeFileSync(join(OUT, 'assets/style.css'), css);
writeFileSync(join(OUT, 'assets/site.js'), js);

writeFileSync(join(OUT, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls.map(u => `  <url><loc>${u}</loc></url>`).join('\n') + '\n</urlset>\n');

writeFileSync(join(OUT, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${SITE}/sitemap.xml\n`);

writeFileSync(join(OUT, '404.html'), page({
  path: '/404/', title: 'Lost in the valleys | Kimmy Karlovich',
  desc: 'Page not found — but the way home is easy.',
  body: `<div class="phero"><div class="wrap"><div class="eyebrow">404</div>
  <h1>Well, this road <em>dead-ends.</em></h1>
  <p>Happens out here. Head back to the highway and we'll get you where you're going.</p>
  <div class="hero-cta mt"><a class="btn big" href="/index.html">Back home</a><a class="btn big ghost" href="tel:${PHONE_TEL}">Call Kimmy</a></div>
</div></div>`,
}).replaceAll('../assets/', '/assets/').replaceAll('../', '/'));

console.log(`Built ${count} pages + sitemap (${urls.length} URLs), robots.txt, 404, assets.`);
