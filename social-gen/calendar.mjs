// 60-day / 120-post Instagram calendar for Kimmy Karlovich.
// Each post: { day, slot, slug, series, slides: [html…], caption }

import { cover, content, question, answer, cta, quoteStill, termStill, mythStill, photoStill, tipStill, IMG } from './templates.mjs';
import { locations } from '../gen/data/locations.mjs';
import { services } from '../gen/data/services.mjs';

const trunc = (s, n) => s.length <= n ? s : s.slice(0, s.lastIndexOf(' ', n)) + '…';

// ---------------------------------------------------------- hashtags
const TAGS = {
  base: '#RoseburgOregon #DouglasCounty #UmpquaValley #OregonRealEstate #RuralRealEstate',
  land: '#OregonLand #LandForSale #BuyingLand #AcreageLife #RuralLiving',
  horse: '#HorseProperty #EquestrianLife #BarrelRacing #HorsesOfInstagram #RanchLife',
  ranch: '#RanchRealEstate #FarmLife #OregonRanch #CountryLiving #Homesteading',
  town: '#SmallTownOregon #OregonLife #PNW #MoveToOregon #ExploreOregon',
  seller: '#SellYourHome #ListingAgent #HomeSellingTips #RealEstateTips',
  buyer: '#HomeBuyingTips #FirstTimeHomeBuyer #HouseHunting #RealEstateAdvice',
};
const tags = (...keys) => [TAGS.base, ...keys.map(k => TAGS[k])].join(' ');
const CTA_LINES = [
  `Questions about your patch of Oregon? Call or text me — 541-643-9509. I answer.`,
  `Thinking about buying or selling rural? Let's talk dirt. ☎ 541-643-9509`,
  `Save this for later, send it to your favorite future rancher, and call me when you're ready. 541-643-9509`,
  `I live this county every day — happy to point you straight. ☎ 541-643-9509`,
];
const ctaLine = (i) => CTA_LINES[i % CTA_LINES.length];

// ---------------------------------------------------------- LAND LINGO (20 stills)
const LINGO = [
  { term: 'EFU', pos: 'zoning, noun', def: `Exclusive Farm Use — Oregon's agricultural zoning. It protects farm ground, but it also limits what you can build. A new home on EFU land usually has to qualify through a farm-income test or a specific approval path.`, why: `That gorgeous 40 acres might not allow a house. Ever. Verify with county planning before you fall for it.` },
  { term: 'GPM', pos: 'noun, gallons per minute', def: `How well output is measured. A well's sustained GPM — not the first burst from the pressure tank — tells you whether a property can support a household, a garden, and stock.`, why: `5+ GPM sustained is comfortable for a home. Below 3, you're planning around storage tanks.` },
  { term: 'Riparian Setback', pos: 'noun', def: `The protected buffer along fish-bearing streams and rivers where building and clearing are restricted.`, why: `It decides how close to the water you can actually build — and it's why two riverfront parcels can have totally different value.` },
  { term: 'LOP Tag', pos: 'noun, hunting', def: `Landowner Preference tag. Oregon gives owners of 40+ contiguous qualifying acres access to additional controlled-hunt deer and elk tags.`, why: `For hunters, this is a real ownership perk — and a reason parcel size and shape matter more than you'd think.` },
  { term: 'Farm Deferral', pos: 'noun, tax', def: `Oregon's special assessment that taxes qualifying farm ground at its farm-use value instead of market value — often a fraction of the normal bill.`, why: `Lose the qualifying use and the county can claw back years of back taxes. Know what you're inheriting before you close.` },
  { term: 'Template Dwelling', pos: 'noun, zoning', def: `Oregon's test for building one home on forest-zoned land, based on how many parcels and homes already exist in a defined "template" area around the property.`, why: `Some timber parcels pass, most don't — and passing can swing a parcel's value by six figures.` },
  { term: 'Priority Date', pos: 'noun, water rights', def: `The seniority ranking of a water right. In a dry August, the Watermaster shuts off junior (newer) rights first.`, why: `An 1890s right on the South Umpqua is a genuinely valuable asset. A 1990s right on the same stretch may go dry when you need it most.` },
  { term: 'Drainfield', pos: 'noun, septic', def: `The buried network of trenches where your septic tank's effluent disperses into soil for final treatment.`, why: `A failed drainfield can cost as much as a new car. Inspect it before you buy — not after it backs up.` },
  { term: 'Easement', pos: 'noun, legal', def: `A recorded legal right for someone else to use part of your land — or for you to cross someone else's. Roads, utilities, and irrigation ditches all travel on easements.`, why: `"We've always used that road" is not an easement. If your access isn't recorded, you don't have access.` },
  { term: 'Timber Cruise', pos: 'noun, forestry', def: `A professional inventory of the standing timber on a parcel — species, volume, and grade — done by a forester.`, why: `A timbered 40 can hide six figures of value, or almost none. The cruise is the only way to know which.` },
  { term: 'AVA', pos: 'noun, wine', def: `American Viticultural Area — a federally recognized wine region. The Umpqua Valley is one of Oregon's oldest AVAs, with the Elkton AVA nested inside it.`, why: `AVA ground carries real agricultural prestige — and plantable hillsides here still cost a fraction of the Willamette.` },
  { term: 'Carrying Capacity', pos: 'noun, ranching', def: `How many animals a piece of ground can actually support. In the Umpqua Valley, dryland pasture typically runs one cow-calf pair per 2–5 acres.`, why: `Acreage is not the number that matters. Usable, watered, fenced acres are.` },
  { term: 'Elevation Certificate', pos: 'noun, flood', def: `A surveyor's document showing exactly how your building site sits relative to the mapped floodplain.`, why: `A few hundred dollars of paperwork can be the difference between mandatory flood insurance and none at all.` },
  { term: 'ATT System', pos: 'noun, septic', def: `Alternative Treatment Technology — an engineered septic system for sites where a standard one won't work. Cleaner output, higher cost, annual maintenance contract.`, why: `If a parcel needs an ATT, budget tens of thousands more — and plan for the yearly service bill.` },
  { term: 'Legal Lot of Record', pos: 'noun, zoning', def: `A parcel that was lawfully created under the rules in effect at the time. Some old tax lots were never legally divided — and carry no right to build.`, why: `A tax lot number is not proof you can build. On odd parcels, get a legal-lot determination first.` },
  { term: 'USDA Loan', pos: 'noun, financing', def: `A zero-down, competitive-rate home loan for qualifying buyers in eligible rural areas — which covers most of Douglas County outside central Roseburg.`, why: `The gap between renting and owning acreage here is often just knowing this program exists.` },
  { term: 'Cross-Fencing', pos: 'noun, ranching', def: `Interior fences that divide a property into multiple pastures, so you can rotate stock and rest ground.`, why: `Good cross-fencing is thousands of dollars of infrastructure hiding in plain sight — and pasture that lasts decades longer.` },
  { term: 'Defensible Space', pos: 'noun, wildfire', def: `The maintained buffer around your home — clean roof, cleared vegetation, limbed trees — that gives it a fighting chance in a wildfire.`, why: `The first 30 feet decide most outcomes. It also moves your insurance quote more than you'd expect.` },
  { term: 'Water Right', pos: 'noun', def: `A license to use public water — attached to specific land, for a specific use, with a specific seniority. In Oregon: first in time, first in right, use it or lose it.`, why: `Five years of non-use can forfeit a right forever. Green pasture in the photos means nothing without the paper behind it.` },
  { term: 'Cistern', pos: 'noun, water', def: `A storage tank for hauled or collected water — common on off-grid places and low-producing wells.`, why: `Cisterns make marginal water workable, but they limit financing options. Lenders want a producing source.` },
];

// ---------------------------------------------------------- MYTH vs FACT (10)
const MYTHS = [
  { myth: `The fence line is the property line.`, fact: `Fences wander. Surveys don't. On rural ground, the legal line and the wire can disagree by a lot — check before you buy or build.` },
  { myth: `You can drill a well anywhere and hit water.`, fact: `Drillers charge by the foot whether they hit water or not. Well logs are public record in Oregon — read the neighbors' before you buy.` },
  { myth: `If land is for sale, you can build on it.`, fact: `Zoning and septic feasibility decide what a parcel can be. Some beautiful ground will never allow a home.` },
  { myth: `Online estimates price rural property just fine.`, fact: `Algorithms can't see water rights, arena footing, usable acres, or a 30x40 shop with 220 power. Rural needs a human who knows the ground.` },
  { myth: `Riverfront always means expensive flood insurance.`, fact: `Homes on benches above the mapped floodplain often need none. An elevation certificate settles it — sometimes for a few hundred bucks.` },
  { myth: `You need 20% down to buy a home.`, fact: `USDA loans are 0% down in most of Douglas County. FHA runs 3.5%. The down payment is rarely the real barrier — knowing your options is.` },
  { myth: `Spring is the only time to sell.`, fact: `Prepared, documented properties sell in every season. Preparation moves your price more than the calendar does.` },
  { myth: `More acres always means more value.`, fact: `A usable, watered, fenced 20 beats a steep, dry 80 for most buyers. Buy usable acres, not just numbers.` },
  { myth: `Open houses are what sell your home.`, fact: `Serious buyers find homes online and book private showings. Great marketing and documentation do the heavy lifting.` },
  { myth: `Property taxes jump when you buy in Oregon.`, fact: `Oregon assessed values don't reset at sale — you inherit the seller's assessed value trajectory. It's one of the friendliest quirks in our tax system.` },
];

// ---------------------------------------------------------- QUOTES (8)
const QUOTES = [
  `I'm always willing to go the <b style="color:#0C6A61">extra mile</b> — and out here, that mile is usually <b style="color:#0C6A61">gravel.</b>`,
  `Buy the <b style="color:#0C6A61">winter</b>, not the summer.`,
  `Dirt is only simple until you buy the <b style="color:#0C6A61">wrong piece.</b>`,
  `Working ground deserves a <b style="color:#0C6A61">working agent.</b>`,
  `The truth about every property — including the ones I'd <b style="color:#0C6A61">walk away from.</b>`,
  `Trees are a crop. <b style="color:#0C6A61">Know what yours are worth.</b>`,
  `Buy the <b style="color:#0C6A61">habitat</b>, not just the acres.`,
  `A modest house on <b style="color:#0C6A61">great land</b> beats a great house on useless land. Every time.`,
];
const QUOTE_CAPS = [
  `The unofficial motto over here. 🐴 Rural Douglas County is my home turf — gravel roads and all.`,
  `Every horse property shows beautifully in July. February tells the truth — about drainage, mud, and whether that arena actually holds footing. That's why I walk properties like it's winter, even in summer.`,
  `Bare land looks simple. Zoning, wells, septic, access, easements — every one can turn a "great deal" into a parcel you can't use. Ask the questions first.`,
  `I ride, ranch, hunt, and fish this county. When I walk your ground, I see it the way an owner does — because I am one.`,
  `My promise to every client, buyers and sellers both. My reputation in this county is worth more than any single commission.`,
  `Douglas County grows Douglas fir about as well as anywhere on the planet. If you own timbered ground, get it cruised before you sell — you might be sitting on more than you think.`,
  `Feed, water, cover, quiet. A 60 with all four out-hunts a bare 200 every season. That's what I look for when hunters ask me to find them ground.`,
  `The land is the asset out here. Houses can be fixed; a dry parcel with no access can't.`,
];

// ---------------------------------------------------------- RANCH LIFE photo stills (10)
const RANCH_LIFE = [
  { img: 'barrel-race-1.jpg', chip: 'Ranch Life', caption: `The office, on a <em style="color:#F5D3CF">Tuesday.</em>`, cap: `Some agents golf. I run cans. 🛢🐎 Being horseback almost every day is exactly why I can tell you if that arena you're touring will hold footing in February.\n\nBarrel racer, rural agent, Douglas County local — in whatever order the day demands.` },
  { img: 'beach-ride.jpg', chip: 'Ranch Life', caption: `Ninety minutes from the ranch to <em style="color:#F5D3CF">this.</em>`, cap: `One of the best-kept secrets of living in Douglas County: beach rides are a day trip. Load up in the Umpqua Valley, be on the sand by lunch. 🌊🐴\n\nThis is the life my clients are buying. I just help with the paperwork.` },
  { img: 'cattle-dog.jpg', chip: 'Staff Meeting', caption: `My best hand works for <em style="color:#F5D3CF">kibble.</em>`, cap: `Meet the real brains of the operation. 🐕 Blue heelers run half the ranches in this county and they know it.\n\nTag a heeler owner who gets it. 👇` },
  { img: 'pasture-family.jpg', chip: 'Ranch Life', caption: `Raised on grass, dirt, and <em style="color:#F5D3CF">good company.</em>`, cap: `Kids who grow up with chores, horses, and room to roam — that's the whole reason half my clients move to Douglas County.\n\nIf you're dreaming about raising your family with more dirt and fewer screens, I know some valleys you should see.` },
  { img: 'arena-pov.jpg', chip: 'The Commute', caption: `Best view in <em style="color:#F5D3CF">Douglas County.</em>`, cap: `Between the ears is my favorite way to see this county. 🐴 Rides like this are 10 minutes from town here — that's the part out-of-state buyers never believe until they visit.` },
  { img: 'kimmy-daughter-horse.jpg', chip: 'Ranch Life', caption: `Teaching the next generation of <em style="color:#F5D3CF">horse girls.</em>`, cap: `She didn't stand a chance — it's in the blood. 💗 Raising kids around horses teaches patience, grit, and how to get back on.\n\nLooking for a place where your kids can have this? That's literally my specialty.` },
  { img: 'daughter-riding.jpg', chip: 'Started Young', caption: `No training wheels out <em style="color:#F5D3CF">here.</em>`, cap: `Bareback before the school bus. 🐎 Douglas County kids grow up different — 4-H, county fair, and a horse that's their best friend.\n\nWant this childhood for your kids? Call me. We'll find the place.` },
  { img: 'horseback-dog.jpg', chip: 'The Crew', caption: `Every ride needs a <em style="color:#F5D3CF">supervisor.</em>`, cap: `Arena time with quality control. 🐕🐴 The dog thinks she's training us, and honestly she might be right.\n\nThis is a normal Wednesday in the Umpqua Valley.` },
  { img: 'jumping.jpg', chip: 'Ranch Life', caption: `Not just <em style="color:#F5D3CF">barrels.</em>`, cap: `English, western, gaming, trails — this county's horse community does it all, and the properties here are built for it. 🐎\n\nArena setups, round pens, cross-fencing, hay storage: when you're ready for a horse property, bring me. I check the parts that matter.` },
  { img: 'barrel-race-2.jpg', chip: 'Full Send', caption: `Between the barrels is where I <em style="color:#F5D3CF">think best.</em>`, cap: `Fun fact: the turquoise leg wraps came before the brand colors. 💙 Some things are just meant to be.\n\nBarrel racer first, real estate agent by popular demand. Douglas County born-and-raised energy either way.` },
];

// ---------------------------------------------------------- MARKET REAL TALK (9, dark tips)
const MARKET = [
  { title: `What actually drives ranch value here`, body: `Water, soil, fencing, and access. A parcel with senior water rights, river-bottom soil, tight fences, and year-round access will outperform a bigger parcel without them — every single time. Buy the fundamentals, not the acreage number.`, cap: `The four fundamentals I check before any client writes an offer on ag ground. 📋 Everything else is negotiable — these four are the value.` },
  { title: `Assessed value ≠ market value`, body: `Oregon taxes you on assessed value, which is capped at 3% annual growth and usually sits far below market value. Buying doesn't reset it. That's why the tax bill on a $700K property is often calculated on $400K.`, cap: `One of Oregon's best-kept property secrets, explained. 🏷 Out-of-state buyers are always shocked by this one — in a good way.` },
  { title: `What "days on market" really tells you`, body: `A well-priced rural property that sits usually has a diligence problem — water, access, insurance — that buyers found. A long DOM is your invitation to investigate and negotiate, not necessarily to walk.`, cap: `Reading the market like a local. 🧐 Long days-on-market isn't always a red flag — sometimes it's a discount waiting for the buyer who does their homework.` },
  { title: `Prepared beats pretty`, body: `The listings holding their price through inspections are the documented ones: septic pumped, well tested, paperwork gathered. Preparation is worth more than staging out here — buyers pay for certainty.`, cap: `If you're selling rural in the next year, this is the whole game. 📁 Kill the surprises before you list and the price holds.` },
  { title: `The equity wave is real`, body: `California, Washington, and metro-Oregon buyers keep discovering that their home equity buys a whole different life here. For sellers, that means your marketing needs to reach beyond the local MLS — that's where the premium offers come from.`, cap: `Who's actually buying Douglas County rural property right now — and what that means if you're selling. 🌊` },
  { title: `Usable acres vs paper acres`, body: `Forty acres of steep, dry, timbered slope and forty acres of flat, watered pasture are different assets that happen to share a number. Price per usable acre — not per acre — is how locals actually value ground.`, cap: `The math trick that separates locals from tourists at the negotiating table. 📐 Always ask: how many of these acres can I actually USE?` },
  { title: `The feasibility period, explained`, body: `On land deals, your offer should buy you a protected window — 30 to 90 days — to verify septic, water, access, and zoning while your earnest money stays safe. Sellers grant it to serious buyers with a real diligence plan.`, cap: `How land deals actually protect buyers (when they're written right). 🛡 Never buy dirt without one.` },
  { title: `Land prices are negotiable`, body: `Longer marketing times, carrying costs, and foggy comps mean informed land offers have real room to work. The key word is informed — lowball-and-hope gets ignored, evidence gets answered.`, cap: `Why land is where deals still happen in this market — if you come armed with diligence instead of just a low number. 💬` },
  { title: `Seller financing: the quiet tool`, body: `Seller-carry shows up in Douglas County land deals constantly. It widens the buyer pool for sellers and beats land-loan terms for buyers. Structured properly — recorded, escrowed, clear terms — it's a win on both sides of the table.`, cap: `The financing tool nobody posts about. 🤝 If you're selling land, offering terms may be worth more than holding out for cash.` },
];

// ---------------------------------------------------------- TIPS (9 stills)
const TIPS = [
  { series: 'Buyer Tip', title: `Never skip the <em style="font-style:italic;color:#0C6A61">well test.</em>`, body: `A proper flow test runs 2–4 hours and measures sustained yield — not the first burst from the pressure tank. Test in late summer if you can. A well that performs in August performs.`, cap: `Rural buyer rule #1. 💧 The pretty kitchen means nothing if the well can't fill a stock tank. Test flow AND quality — bacteria, nitrates, arsenic — inside your inspection window.` },
  { series: 'Buyer Tip', title: `Read the neighbors' <em style="font-style:italic;color:#0C6A61">well logs.</em>`, body: `Every drilled well in Oregon files a public log — depth, yield, geology. Pull the logs around any bare parcel before you offer. A street of strong shallow wells tells a very different story than a valley of deep, weak ones.`, cap: `Free homework that can save you $40,000. 📚 Well logs are public record in Oregon — I pull them on every land deal before my buyers commit.` },
  { series: 'Buyer Tip', title: `Get the insurance quote <em style="font-style:italic;color:#0C6A61">before</em> you waive anything.`, body: `Wildfire scoring varies wildly between carriers. Quote homeowners insurance during your inspection period — not after closing — and document your defensible space. It moves the number.`, cap: `The step rural buyers skip most often — and regret most. 🔥 Insurance is part of diligence now. Quote early.` },
  { series: 'Seller Tip', title: `Pump the septic <em style="font-style:italic;color:#C9736C">before</em> you list.`, body: `A documented, healthy septic system turns the biggest rural-transaction wildcard into a selling point. Fix issues on your schedule and budget — not under deadline pressure at inspection-repair prices.`, cap: `Sellers: this one move protects your price through inspections. 🚽 Unglamorous? Yes. Worth thousands? Also yes.` },
  { series: 'Seller Tip', title: `Mow the frontage <em style="font-style:italic;color:#C9736C">first.</em>`, body: `Buyers form their number in the first quarter mile. Tight fences and mowed frontage along the road reframe everything they see after the gate. Start your prep where their eyes start.`, cap: `Ranch prep priority #1 — and it costs diesel, not dollars. 🚜 First impressions on rural property happen at 40mph from the county road.` },
  { series: 'Seller Tip', title: `Build the <em style="font-style:italic;color:#C9736C">paperwork binder.</em>`, body: `Well logs, septic records, water right certificates, outbuilding permits, deferral status. Buyers pay premiums for verified answers and discount hard for mysteries. One organized folder is worth real percentage points.`, cap: `The cheapest home improvement you'll ever make. 📁 Documentation sells dirt — I've watched it add five figures.` },
  { series: 'Rural Life', title: `Firewood in by <em style="font-style:italic;color:#0C6A61">September.</em>`, body: `Three cords minimum for a wood-heated home, dry and covered. Green wood bought in November heats poorly and gunks your flue — and the chimney sweep booked out in October.`, cap: `Your first-winter-on-acreage survival guide, lesson one. 🪵 City habits go to die in rural Novembers. Be ready instead.` },
  { series: 'Rural Life', title: `Gravel the mud paths <em style="font-style:italic;color:#0C6A61">now.</em>`, body: `Douglas County winters are green for a reason. Gravel your high-traffic paths in fall, sacrifice one paddock to save the rest, and accept that your truck has a winter finish. Mud season is the tax on our beautiful springs.`, cap: `Advice from someone who learned it the hard way. 🥾 Mud management is a rural life skill nobody warns you about.` },
  { series: 'Rural Life', title: `Assume the power <em style="font-style:italic;color:#0C6A61">blinks.</em>`, body: `Rural lines drop in wind and ice storms. A generator with a transfer switch — or at least a plan for the well pump, freezer, and heat — turns outages from crisis into inconvenience. Test it before the first storm.`, cap: `Rural preparedness 101. ⚡ Out here, self-sufficiency isn't an aesthetic — it's a Tuesday in January.` },
];

// ---------------------------------------------------------- TOWN TOURS (26 carousels)
// One unique image per town — no repeats anywhere on the calendar.
const TOWN_IMG = {
  roseburg: 'gen-roseburg.jpg', green: 'kimmy-horses-pen.jpg', winston: 'gen-ig-porch.jpg',
  sutherlin: 'gen-sutherlin-dock.jpg', 'myrtle-creek': 'gen-barn-sunset.jpg', canyonville: 'gen-ig-winter-barn.jpg',
  oakland: 'gen-ig-cattle-oaks.jpg', riddle: 'gen-riddle-valley.jpg', glide: 'gen-glide-confluence.jpg',
  'camas-valley': 'gen-ig-haybales.jpg', elkton: 'gen-elkton-butterfly.jpg', drain: 'gen-drain-bridge.jpg',
  yoncalla: 'gen-ig-lambs.jpg', umpqua: 'gen-umpqua-riverbend.jpg', melrose: 'gen-melrose-vineyard.jpg',
  lookingglass: 'gen-horses-mist.jpg', dixonville: 'gen-dixonville-orchard.jpg', tenmile: 'gen-tenmile-pond.jpg',
  'days-creek': 'kimmy-fair.jpg', tiller: 'gen-elk-herd.jpg', azalea: 'gen-azalea-reservoir.jpg',
  glendale: 'gen-glendale-valley.jpg', scottsburg: 'gen-ig-driftboat.jpg', 'idleyld-park': 'gen-idleyld-falls.jpg',
  wilbur: 'gen-ig-coffee.jpg', winchester: 'gen-winchester-salmon.jpg',
};

// Second Ask Kimmy carousel per service gets its own cover image.
const SVC_IMG2 = {
  'farm-ranch': 'gen-cattle-drive.jpg', equestrian: 'kimmy-portrait.jpg',
  'land-acreage': 'gen-oak-gate.jpg', 'rural-homes': 'gen-homestead-garden.jpg',
  riverfront: 'gen-swimming-hole.jpg', 'timber-recreational': 'gen-fir-canopy.jpg',
  'hunting-property': 'kimmy-hunt.jpg', 'vineyard-winery': 'gen-grapes.jpg',
};

const townTour = (l, i) => ({
  slug: `town-tour-${l.slug}`, series: 'Town Tour',
  slides: [
    cover({ eyebrow: `Town Tour · Douglas County`, em: '', img: IMG(TOWN_IMG[l.slug]), tag: `Stop ${i + 1} of 26`, title: `${l.name}: <em style="font-style:italic;font-weight:400;color:#F5D3CF">${trunc(l.tagline, 44)}.</em>` }),
    content({ n: 2, total: 5, kicker: l.name + ', OR', title: `Why folks love it`, body: trunc(l.character, 330) }),
    content({ n: 3, total: 5, kicker: l.name + ', OR', title: `The property picture`, body: trunc(l.propertyNotes, 330) }),
    content({
      n: 4, total: 5, kicker: l.name + ', OR', title: `Local intel`, checks: [
        `<b>Population:</b> ${l.pop}`,
        `<b>To Roseburg:</b> ${l.driveToRoseburg}`,
        `<b>Known for:</b> ${l.landmarks.slice(0, 3).join(' · ')}`,
        `<b>The lifestyle:</b> ${trunc(l.lifestyle, 90)}`,
      ]
    }),
    cta({ line: `Curious about <em>${l.name}?</em> Ask a local.` }),
  ],
  caption: `🚜 TOWN TOUR, stop ${i + 1} of 26: ${l.name.toUpperCase()}\n\n${l.tagline}. ${trunc(l.character, 200)}\n\nProperty-wise: ${trunc(l.propertyNotes, 160)}\n\n${ctaLine(i)}\n\n${tags('town', 'ranch')} #${l.name.replace(/[^A-Za-z]/g, '')}Oregon`,
});

// ---------------------------------------------------------- ASK KIMMY (16 carousels from service FAQs)
const askKimmy = (s, faqPair, idx) => ({
  slug: `ask-kimmy-${s.slug}-${idx + 1}`, series: 'Ask Kimmy',
  slides: [
    cover({ eyebrow: 'Ask Kimmy', img: IMG(idx === 0 ? s.img : SVC_IMG2[s.slug]), tag: s.short, title: `${s.short}: <em style="font-style:italic;font-weight:400;color:#F5D3CF">${idx === 0 ? 'your questions, answered.' : 'round two.'}</em>` }),
    question({ n: 2, total: 6, q: faqPair[0].q }),
    answer({ n: 3, total: 6, a: trunc(faqPair[0].a, 400) }),
    question({ n: 4, total: 6, q: faqPair[1].q }),
    answer({ n: 5, total: 6, a: trunc(faqPair[1].a, 400) }),
    cta(),
  ],
  caption: `🙋‍♀️ ASK KIMMY: ${s.short} edition\n\nTwo questions I get constantly:\n\n1️⃣ ${faqPair[0].q}\n2️⃣ ${faqPair[1].q}\n\nSwipe for the straight answers — no fluff, no jargon.\n\nGot a question I didn't cover? Drop it in the comments or call me: 541-643-9509.\n\n${tags(s.slug === 'equestrian' ? 'horse' : s.slug === 'land-acreage' ? 'land' : 'ranch', 'buyer')}`,
});

// ---------------------------------------------------------- CHECKLIST carousels (12)
const CHECKLISTS = [
  {
    slug: 'rural-diligence-stack', title: `The rural <em style="font-style:italic;font-weight:400;color:#F5D3CF">diligence stack.</em>`, img: 'gen-hero-valley.jpg', eyebrow: 'Buyer Bootcamp', tag: 'Save this one',
    slides: [
      { title: `Zoning first`, body: `FF, EFU, TR — the zone decides whether you can build, divide, or run a business. Verify with Douglas County Planning before you get attached. Some beautiful parcels will never allow a home.` },
      { title: `Water second`, body: `Well flow + quality tests on improved property. Neighboring well logs on bare land. Water rights verified with the state if pasture matters. No water, no homestead.` },
      { title: `Septic third`, body: `Existing systems: inspect and pump. Bare land: county site evaluation before your earnest money goes hard. A parcel that can't pass has no house in its future.` },
      { title: `Access always`, body: `County road frontage is gold. Easement roads are fine IF recorded, with a maintenance agreement, and the physical road matches the paper. Handshake access isn't access.` },
    ],
    cap: `The 4-layer diligence stack I run on every rural purchase. 🏡 City buyers have inspections. Rural buyers have THIS — and skipping a layer is how dream properties become expensive lessons.\n\nSave it. Share it with someone shopping for acreage.`,
    tagKeys: ['land', 'buyer'],
  },
  {
    slug: 'horse-property-checklist', title: `What a rider checks that listings <em style="font-style:italic;font-weight:400;color:#F5D3CF">don't show.</em>`, img: 'gen-tack-room.jpg', eyebrow: 'Horse Property', tag: 'From a barrel racer',
    slides: [
      { title: `Buy the winter`, body: `Every horse property shows beautifully in July. The question is February: where does water sit, which paddocks turn to mud, does the barn flood, can the hay truck make the driveway?` },
      { title: `Dig into the arena`, body: `Base and drainage matter more than size. You want compacted base under 2–4 inches of footing, a crown that sheds water, and honest answers about January. Deep, baseless footing bows tendons.` },
      { title: `Count usable acres`, body: `Plan 1–2 usable acres per horse plus your building envelope. Cross-fencing for rotation, a dry lot for wet season, and safe fencing — no-climb beats barbed for horses, always.` },
      { title: `Think in trailer math`, body: `Can a loaded gooseneck get in, turn around, and get out — in the wet? All-weather parking? Hay storage for a full winter? These daily-life details decide whether a setup works or just photographs well.` },
    ],
    cap: `I run barrels. I keep my own horses in this county. When I walk a horse property, I see what the listing photos hide. 🐴\n\nSwipe for the four checks that separate real setups from pretty mud pits — and call me when you're ready to shop: 541-643-9509.`,
    tagKeys: ['horse', 'buyer'],
  },
  {
    slug: 'first-winter-checklist', title: `Your first winter on acreage: <em style="font-style:italic;font-weight:400;color:#F5D3CF">the checklist.</em>`, img: 'gen-woodstove.jpg', eyebrow: 'Rural Life', tag: 'Road-tested',
    slides: [
      { title: `Firewood by September`, body: `Three cords minimum, dry and covered, for a wood-heated home. Green November wood heats poorly and creosotes your flue. The chimney sweep booked out in October — call in August.` },
      { title: `Power: assume it blinks`, body: `Rural lines drop in wind and ice. A generator with a transfer switch — or at minimum a plan for the well pump, freezer, and heat — turns outages into inconvenience instead of crisis.` },
      { title: `Protect your water`, body: `Insulate the wellhead and pump house. Heat-tape exposed runs. Know where the main shutoff is BEFORE a burst pipe teaches you. Check frost-free hydrants at the first freeze.` },
      { title: `Manage the mud`, body: `Gravel high-traffic paths now. Sacrifice one paddock to save the rest. Keep chains that fit and two days of pantry depth. By your second winter, it's just rhythm.` },
    ],
    cap: `The checklist I give every buyer heading into their first winter on acreage — road-tested on my own place. ❄️🪵\n\nRural winters here are green, wet, and absolutely manageable IF you're ready. Save this for October-you.`,
    tagKeys: ['ranch'],
  },
  {
    slug: 'selling-ranch-prep', title: `Selling next year? Start these <em style="font-style:italic;font-weight:400;color:#F5D3CF">now.</em>`, img: 'gen-hay-tractor.jpg', eyebrow: 'Seller School', tag: 'For ranch owners',
    slides: [
      { title: `Exercise your water rights`, body: `Irrigate the mapped acres and keep the power bills. Five years of non-use forfeits a right — and buyers' attorneys check. A documented, active right is often the most valuable line item on the ranch.` },
      { title: `Pull your paper`, body: `Well logs, water certificates, septic records, outbuilding permits, deferral status. One organized binder is worth real percentage points of price. Buyers pay for certainty.` },
      { title: `Fix the frontage first`, body: `Buyers form their number in the first quarter mile. Tight wire and straight posts along the county road reframe everything they see after the gate.` },
      { title: `Shoot your peak season`, body: `First-cut hay down, stock on green grass, golden light. Even if you list in November, the marketing photos should come from June. Plan the photography a season ahead.` },
    ],
    cap: `Thinking about selling the ranch next year? The prep that adds real money starts NOW — not the week you list. 🚜\n\nI do free walk-throughs for owners a year out: a punch list, prioritized by return, specific to your place. No commitment, no pressure. 541-643-9509.`,
    tagKeys: ['ranch', 'seller'],
  },
  {
    slug: 'water-rights-101', title: `Oregon water rights in <em style="font-style:italic;font-weight:400;color:#F5D3CF">four slides.</em>`, img: 'gen-wheel-line.jpg', eyebrow: 'Buyer Bootcamp', tag: 'The important one',
    slides: [
      { title: `The one-sentence version`, body: `Water belongs to the public; a water right is a license to use it — first in time, first in right, and use it or lose it. Everything about irrigated land value flows from that sentence.` },
      { title: `What a right specifies`, body: `Source, priority date (seniority in drought years), rate, season, mapped place of use, and character of use. A right not being exercised on the mapped acres can be forfeited after five years of non-use.` },
      { title: `What you get for free`, body: `Oregon's exempt uses: domestic well water up to 15,000 gallons/day, stock watering, and a half acre of lawn or garden. That covers a homestead — not irrigated pasture or crops.` },
      { title: `How to verify before buying`, body: `Pull the certificate from the state, match the mapped acres to the parcel, confirm the infrastructure exists, and look for evidence of continuous use. Lush pasture in photos means nothing without the paper.` },
    ],
    cap: `The most valuable thing attached to Oregon farm ground isn't the barn — it's the water right. 💧 And it can quietly die from five years of non-use.\n\nSwipe for the 4-slide crash course, and always verify before you buy irrigated ground.`,
    tagKeys: ['land', 'ranch'],
  },
  {
    slug: 'land-red-flags', title: `5 land red flags I look for <em style="font-style:italic;font-weight:400;color:#F5D3CF">first.</em>`, img: 'gen-survey-stake.jpg', eyebrow: 'Buyer Bootcamp', tag: 'Before you offer',
    slides: [
      { title: `No well logs nearby`, body: `Wells are public record. If the parcels around your dream dirt show deep, weak wells — or none at all — that "great price" starts making sense. Water risk prices into everything.` },
      { title: `"Access has never been an issue"`, body: `Translation: nobody's checked the easements. If legal access isn't recorded, you may be buying a landlocked parcel and a future lawsuit. Title review answers it in a day.` },
      { title: `Vague zoning talk`, body: `"Should be buildable" is not a zoning determination. Forest and farm zones have dwelling tests that many parcels fail — permanently. The county's answer is the only one that counts.` },
      { title: `No septic evaluation`, body: `Soil that won't perc means no house, no matter the zoning. On bare land, septic feasibility goes in the offer as a contingency — your earnest money stays safe while the county digs test pits.` },
      { title: `Price way under market`, body: `Cheap land is usually missing one essential: water, access, or buildability. Find out which one before you wire money — sometimes it's fixable, sometimes it's the whole value.` },
    ],
    cap: `Bare land is the most misunderstood purchase in real estate — and the easiest place to buy a beautiful mistake. 🚩\n\nThese are the 5 red flags I check before any client offers on dirt. Number 5 saves the most heartbreak.\n\nShopping for land? Let's talk first: 541-643-9509.`,
    tagKeys: ['land', 'buyer'],
  },
  {
    slug: 'usda-zero-down', title: `Zero down. Yes, <em style="font-style:italic;font-weight:400;color:#F5D3CF">really.</em>`, img: 'gen-cottage.jpg', eyebrow: 'Buyer Bootcamp', tag: 'USDA loans',
    slides: [
      { title: `What USDA loans are`, body: `Government-backed home loans with 0% down and competitive rates for qualifying buyers in eligible rural areas. Not farms-only, not obscure — just underused.` },
      { title: `Most of this county qualifies`, body: `Central Roseburg generally doesn't — but Winston, Sutherlin, Myrtle Creek, Oakland, Glide, and most surrounding communities typically do. Eligibility is checked by exact address.` },
      { title: `The fine print that matters`, body: `Household income limits apply. The home needs to be your primary residence. Modest acreage is fine; large ag operations need different financing. A rural-savvy lender sorts it in one call.` },
      { title: `Why it changes everything`, body: `For qualifying buyers, USDA is the difference between renting three more years and owning acreage now. The down payment was never the real barrier — knowing the program exists was.` },
    ],
    cap: `The zero-down loan most renters in Douglas County have never heard of. 🏡\n\nUSDA eligibility covers MOST of this county — and I can connect you with local lenders who actually close these files. First step is one phone call: 541-643-9509.`,
    tagKeys: ['buyer'],
  },
  {
    slug: 'riverfront-reality', title: `Riverfront, <em style="font-style:italic;font-weight:400;color:#F5D3CF">honestly.</em>`, img: 'gen-gravel-bar.jpg', eyebrow: 'Buyer Bootcamp', tag: 'The real math',
    slides: [
      { title: `Not all frontage is equal`, body: `Usable frontage — where you can walk to your own gravel bar, swim, fish, launch a boat — carries a serious premium. Steep-bank "look but don't touch" frontage shouldn't be priced like the real thing.` },
      { title: `The flood zone question`, body: `Mapped flood-zone homes with a mortgage need flood insurance; bench homes above the floodplain often need none. An elevation certificate settles ambiguous cases for a few hundred dollars.` },
      { title: `Read the bank`, body: `Some stretches lose feet of bank in big winters; others sit on basalt that hasn't moved in millennia. Walk the bank, look at the neighbors' banks, and ask what the big water years did.` },
      { title: `What it's actually worth`, body: `For the right buyer: everything. There's no substitute for coffee on your own riverbank while steelhead roll in the tailout. Just pay the premium for the real thing — not the idea of it.` },
    ],
    cap: `Everyone wants riverfront until the first flood map. Then the smart ones want it CORRECTLY. 🌊\n\nThe North Umpqua, South Umpqua, and main stem all run through my territory — swipe for the honest version of buying on the water.`,
    tagKeys: ['land', 'buyer'],
  },
  {
    slug: 'timberland-payoff', title: `Timberland: the investment you can <em style="font-style:italic;font-weight:400;color:#F5D3CF">picnic on.</em>`, img: 'gen-log-deck.jpg', eyebrow: 'Land Smarts', tag: 'Douglas fir country',
    slides: [
      { title: `Trees are a crop`, body: `Douglas County grows Douglas fir about as well as anywhere on the planet, on a 35–50 year rotation. A timbered 40 can hold six figures of standing value — or almost none if it was recently cut. A cruise tells you which.` },
      { title: `Tiny taxes while it grows`, body: `Forestland deferral taxes qualifying ground at forest-use value — a fraction of market-rate taxation. Keep it stocked, keep the paperwork straight, and the holding cost stays small.` },
      { title: `The harvest rules`, body: `Oregon's Forest Practices Act governs private logging: notification, stream buffers, and mandatory replanting within two seasons. A consulting forester pays for themselves in log marketing alone.` },
      { title: `Meanwhile, you use it`, body: `Elk and blacktail hunting, creek frontage, firewood forever, a private camp an hour from town. Few assets compound value while you enjoy them. This one does.` },
    ],
    cap: `The quietest wealth-builder in Douglas County: standing Douglas fir. 🌲\n\nIt grows while you hunt it, camp it, and burn its trimmings all winter. Swipe for how timber ownership actually works — and call me if you're curious what a timbered parcel really costs.`,
    tagKeys: ['land', 'ranch'],
  },
  {
    slug: 'selling-inherited-property', title: `Inherited a rural property? <em style="font-style:italic;font-weight:400;color:#F5D3CF">Breathe. Then this.</em>`, img: 'gen-old-farmhouse.jpg', eyebrow: 'Seller School', tag: 'Estate & probate',
    slides: [
      { title: `Secure and assess first`, body: `Make sure the place is safe, insured, and winterized. If you're out of the area, a local agent can be boots-on-ground — checking the property, meeting appraisers, keeping things moving while you handle everything else.` },
      { title: `Find the rural paperwork`, body: `Well logs, septic records, water rights (the five-year non-use clock may already be running), deferral status. Estates that answer these questions sell for market; ones that don't get discounted for uncertainty.` },
      { title: `Value with evidence`, body: `Family lore about what the place is worth — high or low — is the enemy of a clean estate sale. Get a documentation-grade market analysis or appraisal the court and the heirs can stand behind.` },
      { title: `Sequence the whole estate`, body: `Equipment through farm auctions, contents through estate sale, then the property. Heirs generally get a stepped-up tax basis — talk to a CPA early, because timing matters.` },
    ],
    cap: `Inheriting the family place is heavy — emotionally and logistically, often from hundreds of miles away. 💛\n\nI work alongside probate attorneys and PRs to keep the real estate side moving while you handle the rest. If your family is navigating this, I'm happy to talk through the process. No pressure, ever.`,
    tagKeys: ['seller'],
  },
  {
    slug: 'moving-from-california', title: `California equity → Oregon acreage: <em style="font-style:italic;font-weight:400;color:#F5D3CF">a reality check.</em>`, img: 'coast-walk.jpg', eyebrow: 'Relocation', tag: 'Read before moving',
    slides: [
      { title: `The math is real`, body: `A median metro home's equity commonly translates here into a quality home on 5–20 acres — often with change left over. That part of the dream checks out.` },
      { title: `The adjustments are real too`, body: `Contractors run on relationships, not review apps. Winter is dark, wet, and beautiful. Internet depends on your road — verify BEFORE you buy if you work remote. Smoke happens some summers.` },
      { title: `The community is the payoff`, body: `Neighbors show up with a tractor before you've asked. The feed store learns your order. The county fair is genuinely the event of the year. Lean in and you're a local in three years.` },
      { title: `Do it in the right order`, body: `Rent for a season if you can. Tour valleys in the WET months. Buy the land that fits the life you'll actually live — not the fantasy version. Then never leave, like the rest of us.` },
    ],
    cap: `Half my relocation calls start the same way: "We just sold in California and we can't believe your prices." 📞\n\nBelieve them — then do the move RIGHT. Swipe for the honest version I give every relocating family.\n\nPlanning a move to Douglas County? I'd love to help: 541-643-9509.`,
    tagKeys: ['town', 'buyer'],
  },
  {
    slug: 'hunting-ground-checklist', title: `Buying hunting ground? Check <em style="font-style:italic;font-weight:400;color:#F5D3CF">these four.</em>`, img: 'gen-blacktail.jpg', eyebrow: 'Land Smarts', tag: 'From a hunter',
    slides: [
      { title: `Feed, water, cover, quiet`, body: `Elk need all four in their daily loop. A meadow system, year-round water, timbered bedding, and low pressure will hold animals that a bigger, barer parcel never sees.` },
      { title: `Public land next door`, body: `Douglas County is laced with BLM and Forest Service ground. A 60 bordering thousands of public acres hunts like something far bigger — verify actual legal adjacency on maps, not listing claims.` },
      { title: `LOP tag eligibility`, body: `40+ contiguous qualifying acres opens Oregon's Landowner Preference tags for deer and elk. If tags matter to you, parcel size and configuration matter to your search.` },
      { title: `The exit plan`, body: `Ground with timber value, grazing potential, or building eligibility holds value in every market. Buy the parcel that's an asset even in the seasons you don't fill a tag.` },
    ],
    cap: `I hunt this county — Melrose and Dixon units mostly — and I evaluate recreational ground the way a hunter does. 🦌\n\nSwipe for the four checks that separate elk ground from expensive grass. Then bring me your unit preferences and I'll bring the maps.`,
    tagKeys: ['land'],
  },
];

const checklist = (c, i) => ({
  slug: c.slug, series: c.eyebrow,
  slides: [
    cover({ eyebrow: c.eyebrow, img: IMG(c.img), tag: c.tag, title: c.title }),
    ...c.slides.map((s, j) => content({ n: j + 2, total: c.slides.length + 2, kicker: c.eyebrow, title: s.title, body: s.body })),
    cta(),
  ],
  caption: `${c.cap}\n\n${tags(...c.tagKeys)}`,
});

// ---------------------------------------------------------- build all posts per series
const askKimmyPosts = services.flatMap((s) => [
  askKimmy(s, [s.faqs[0], s.faqs[1]], 0),
  askKimmy(s, [s.faqs[2], s.faqs[3]], 1),
]);

const queues = {
  townTour: locations.map((l, i) => townTour(l, i)),
  askKimmy: askKimmyPosts,
  checklist: CHECKLISTS.map((c, i) => checklist(c, i)),
  landLingo: LINGO.map((t, i) => ({
    slug: `land-lingo-${t.term.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`, series: 'Land Lingo',
    slides: [termStill(t)],
    caption: `📖 LAND LINGO: ${t.term}\n\n${t.def}\n\nWhy it matters: ${t.why}\n\nRural real estate has its own language — I speak it fluently so you don't have to learn it the expensive way. Save this series. 🤠\n\n${tags('land', 'buyer')}`,
  })),
  mythFact: MYTHS.map((m, i) => ({
    slug: `myth-fact-${i + 1}`, series: 'Myth vs Fact',
    slides: [mythStill(m)],
    caption: `🚫 MYTH: ${m.myth}\n\n✅ FACT: ${m.fact}\n\n${ctaLine(i)}\n\n${tags('buyer', 'land')}`,
  })),
  quote: QUOTES.map((q, i) => ({
    slug: `quote-${i + 1}`, series: 'Quote',
    slides: [quoteStill({ quote: q })],
    caption: `${QUOTE_CAPS[i]}\n\n${tags('ranch')}`,
  })),
  ranchLife: RANCH_LIFE.map((r, i) => ({
    slug: `ranch-life-${i + 1}`, series: 'Ranch Life',
    slides: [photoStill({ ...r, img: IMG(r.img) })],
    caption: `${r.cap}\n\n${tags('horse', 'ranch')}`,
  })),
  marketTalk: MARKET.map((m, i) => ({
    slug: `market-talk-${i + 1}`, series: 'Market Real Talk',
    slides: [tipStill({ series: 'Market Real Talk', title: m.title, body: m.body, dark: true })],
    caption: `📊 MARKET REAL TALK\n\n${m.cap}\n\nNo hype, no fake urgency — just how this market actually works, from someone who lives in it.\n\n${tags('seller', 'buyer')}`,
  })),
  tip: TIPS.map((t, i) => ({
    slug: `tip-${i + 1}`, series: t.series,
    slides: [tipStill(t)],
    caption: `${t.cap}\n\n${tags(t.series === 'Seller Tip' ? 'seller' : t.series === 'Buyer Tip' ? 'buyer' : 'ranch')}`,
  })),
};

// ---------------------------------------------------------- schedule: 60 days × 2 posts
const WEEK_PATTERN = [
  ['townTour', 'ranchLife'], ['landLingo', 'askKimmy'], ['checklist', 'quote'],
  ['mythFact', 'townTour'], ['askKimmy', 'landLingo'], ['marketTalk', 'ranchLife'],
  ['tip', 'townTour'],
];

// Constraint: a series never appears twice on the same day, and never in two
// consecutive posts (even across a day boundary).
export const posts = [];
let prevKey = null;
for (let day = 1; day <= 60; day++) {
  const pattern = WEEK_PATTERN[(day - 1) % 7];
  const todayKeys = [];
  for (let slot = 0; slot < 2; slot++) {
    const banned = new Set([prevKey, ...todayKeys]);
    let key = pattern[slot];
    if (!queues[key]?.length || banned.has(key)) {
      const allowed = Object.keys(queues).filter(k => queues[k].length && !banned.has(k));
      const pool = allowed.length ? allowed : Object.keys(queues).filter(k => queues[k].length);
      key = pool.sort((a, b) => queues[b].length - queues[a].length)[0];
    }
    const post = queues[key].shift();
    posts.push({ day, slot: slot === 0 ? 'a' : 'b', seriesKey: key, ...post });
    todayKeys.push(key);
    prevKey = key;
  }
}

const remaining = Object.values(queues).reduce((a, q) => a + q.length, 0);
if (remaining) console.warn(`WARNING: ${remaining} posts unscheduled`);

// Guards: no photo may appear in two different posts (CTA headshot excepted),
// and no series may repeat in adjacent posts.
{
  const seen = new Map();
  for (const p of posts) {
    for (const html of p.slides) {
      for (const m of html.matchAll(/file:\/\/[^"]+\/([\w.-]+\.(?:jpg|png))/g)) {
        if (m[1] === 'kimmy-headshot.jpg') continue;
        if (seen.has(m[1]) && seen.get(m[1]) !== p.slug)
          console.warn(`DUPLICATE IMAGE: ${m[1]} in ${seen.get(m[1])} AND ${p.slug}`);
        seen.set(m[1], p.slug);
      }
    }
  }
  for (let i = 1; i < posts.length; i++) {
    if (posts[i].seriesKey === posts[i - 1].seriesKey)
      console.warn(`ADJACENT SERIES: ${posts[i - 1].day}${posts[i - 1].slot} and ${posts[i].day}${posts[i].slot} are both ${posts[i].seriesKey}`);
  }
}
