const fs = require("fs");
const path = require("path");

const DIST = path.join(__dirname, "dist");
fs.mkdirSync(DIST, { recursive: true });

/* ---------- shared chrome (mirrors index.html) ---------- */
const NAV = [
  { href: "convene.html", label: "Convene", children: [
    ["festival-of-the-diaspora.html", "Festival of the Diaspora"],
    ["diaspora-dialogues.html", "Diaspora Dialogues"],
    ["sixth-region-summit.html", "Sixth Region Summit"],
  ]},
  { href: "connect.html", label: "Connect", children: [
    ["palante-labs.html", "Palante Labs"],
    ["pob-studios.html", "PoB Studios"],
  ]},
  { href: "collaborate.html", label: "Collaborate", children: [
    ["expectant-advisory.html", "Expectant Advisory"],
  ]},
  { href: "invest.html", label: "Invest", children: [
    ["palante-capital.html", "Palante Capital"],
    ["marketplace.html", "Marketplace"],
  ]},
  { href: "about.html", label: "About", children: null },
];

function navHTML(){
  const items = NAV.map(item => `<li><a href="${item.href}">${item.label}</a>${item.children ? `<ul class="dropdown">${item.children.map(([h,l]) => `<li><a href="${h}">${l}</a></li>`).join("")}</ul>` : ""}</li>`).join("");
  return `<ul>${items}<li><a class="nav-cta" href="partner-with-us.html">Partner With Us</a></li></ul>`;
}

/* "Keep exploring" tiles: destination photo, optional section kicker, label */
const RELATED_DEST = {
  "convene.html": ["fotd-staircase.jpg", "50% 40%", ""],
  "connect.html": ["colombia-dinner.jpg", "50% 40%", ""],
  "collaborate.html": ["prea-conf.jpg", "50% 50%", ""],
  "invest.html": ["pitch-competition.jpg", "50% 45%", ""],
  "about.html": ["cordell-portrait.jpg", "50% 22%", ""],
  "partner-with-us.html": ["power-of-diaspora.jpg", "50% 50%", ""],
  "expectant-advisory.html": ["concordia-stage.jpg", "50% 45%", "Collaborate"],
  "marketplace.html": ["feira-preta.jpg", "50% 50%", "Invest"],
  "palante-capital.html": ["palante-capital.jpg", "50% 30%", "Invest"],
  "palante-labs.html": ["petronio.jpg", "50% 45%", "Connect"],
  "pob-studios.html": ["etnica-tv.jpg", "50% 40%", "Connect"],
  "festival-of-the-diaspora.html": ["fotd-staircase.jpg", "50% 40%", "Convene"],
  "diaspora-dialogues.html": ["diaspora-dialogues.jpg", "50% 40%", "Convene"],
  "sixth-region-summit.html": ["concordia-group.jpg", "50% 40%", "Convene"],
};

function relatedHTML(related){
  if(!related || !related.length) return "";
  const tile = ([h, l]) => {
    const [img, pos, kicker] = RELATED_DEST[h];
    return `<a class="related-card" href="${h}" style="--img:url('images/${img}');--pos:${pos};">${kicker ? `<span class="related-kicker">${kicker}</span>` : ""}<span class="related-name">${l}</span><span class="related-arrow" aria-hidden="true">→</span></a>`;
  };
  return `
<section class="section related" aria-labelledby="related-title">
  <div class="wrap">
    <h3 class="related-title" id="related-title">Keep exploring</h3>
    <div class="related-grid">${related.map(tile).join("")}</div>
  </div>
</section>`;
}

function layout({ title, description, body, related }){
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title} | Project on Belonging</title>
<meta name="description" content="${description}">
<link rel="icon" type="image/png" href="images/logo.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@700;800;900&family=Inter:wght@400;500;600;700&display=swap">
<link rel="stylesheet" href="styles.css">
<script src="site.js" defer></script>
</head>
<body>
<a class="skip-link" href="#main">Skip to main content</a>

<header class="site-header">
  <div class="nav-row">
    <a class="logo" href="index.html"><img class="logo-mark" src="images/logo.png" width="40" height="37" alt=""><span>Project on Belonging</span></a>
    <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav" aria-label="Open menu"><span></span><span></span><span></span></button>
    <nav class="main-nav" id="site-nav" aria-label="Main">${navHTML()}</nav>
  </div>
</header>

<main id="main">
${body}
</main>

${relatedHTML(related)}

<footer class="site-footer">
  <div class="wrap">
    <a class="footer-logo" href="index.html"><img class="logo-mark" src="images/logo.png" width="48" height="45" alt="Project on Belonging"></a>
    <div class="footer-grid">
      <div><h4>Convene</h4><ul><li><a href="festival-of-the-diaspora.html">Festival of the Diaspora</a></li><li><a href="diaspora-dialogues.html">Diaspora Dialogues</a></li><li><a href="sixth-region-summit.html">Sixth Region Summit</a></li></ul></div>
      <div><h4>Connect</h4><ul><li><a href="palante-labs.html">Palante Labs</a></li><li><a href="pob-studios.html">PoB Studios</a></li></ul></div>
      <div><h4>Collaborate</h4><ul><li><a href="expectant-advisory.html">Expectant Advisory</a></li></ul></div>
      <div><h4>Invest</h4><ul><li><a href="palante-capital.html">Palante Capital</a></li><li><a href="marketplace.html">Marketplace</a></li></ul></div>
      <div><h4>Platform</h4><ul><li><a href="about.html">About</a></li><li><a href="partner-with-us.html">Partner with us</a></li><li><a href="mailto:info@projectonbelonging.org">info@projectonbelonging.org</a></li><li><a href="https://www.youtube.com/@projectonbelonging">YouTube</a></li><li><a href="#">LinkedIn</a></li></ul></div>
    </div>
    <div class="footer-bottom">© 2026 Project on Belonging. All rights reserved.</div>
  </div>
</footer>

</body>
</html>`;
}

/* nav "current page" marking + lazy-loaded images, applied to every generated page */
const SECTION = {
  convene: ["convene", "festival-of-the-diaspora", "diaspora-dialogues", "sixth-region-summit"],
  connect: ["connect", "palante-labs", "pob-studios"],
  collaborate: ["collaborate", "expectant-advisory"],
  invest: ["invest", "palante-capital", "marketplace"],
  about: ["about"],
};
function enhance(filename, html){
  const page = filename.replace(/\.html$/, "");
  const navM = html.match(/<nav class="main-nav"[\s\S]*?<\/nav>/);
  if(navM){
    let nav = navM[0];
    const link = `href="${page}.html"`;
    const sec = Object.keys(SECTION).find(k => SECTION[k].includes(page));
    if(page === "partner-with-us") nav = nav.replace(`<a class="nav-cta" ${link}>`, `<a class="nav-cta" ${link} aria-current="page">`);
    else if(sec){
      nav = nav.replace(`<li><a ${link}>`, `<li><a ${link} aria-current="page">`);
      if(page !== sec) nav = nav.replace(`<li><a href="${sec}.html"`, `<li><a class="is-section" href="${sec}.html"`);
      nav = nav.replace(new RegExp(`(<ul class="dropdown">[\\s\\S]*?)<li><a ${link}>`), `$1<li><a ${link} aria-current="page">`);
    }
    html = html.replace(navM[0], nav);
  }
  return html.replace(/<img (?![^>]*logo-mark)(?![^>]*loading=)([^>]*)>/g, '<img loading="lazy" decoding="async" $1>');
}

function write(filename, html){
  html = enhance(filename, html);
  fs.writeFileSync(path.join(DIST, filename), html, "utf8");
}

/* small reusable pieces */
function hero(eyebrow, h1, lede, ctaRow, photoCaption, photoUrl, bgPos, cls){
  const bg = photoUrl ? `background-image:url('${photoUrl}');${bgPos ? `background-position:${bgPos};` : ""}` : `background:linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 100%);`;
  return `
<section class="hero${cls ? " " + cls : ""}" style="min-height:52vh;${cls ? "" : bg}">${cls === "hero--montage" ? `
  <video class="hero-video" autoplay muted loop playsinline preload="auto" poster="images/fotd-staircase.jpg" aria-hidden="true" tabindex="-1"><source src="images/convene-hero.mp4" type="video/mp4"><source src="images/convene-hero.webm" type="video/webm"></video>` : ""}
  <div class="wrap">
    <span class="kicker">${eyebrow}</span>
    <h1>${h1}</h1>
    <p class="lede">${lede}</p>
    ${ctaRow || ""}
  </div>
  ${photoCaption ? `<span class="hero-credit">${photoCaption}</span>` : ""}
</section>`;
}
function ctaRow(buttons){
  return `<div class="cta-row">${buttons.map(([cls,href,label]) => `<a class="btn ${cls}" href="${href}">${label}</a>`).join("")}</div>`;
}
function card({tag, h3, p, next, link, photo, photoUrl, photoAlt, photoFit, photoFocus, photoPos}){
  const photoBlock = photoUrl
    ? `<div class="card-photo${photoFit ? ` card-photo--${photoFit}` : ""}"${photoFocus ? ` style="--focus:${photoFocus};"` : ""}><img class="real-img" src="${photoUrl}" alt="${photoAlt||h3}"${photoPos ? ` style="object-position:${photoPos};"` : ""}></div>`
    : (photo ? `<div class="card-photo photo-ph"><span>${photo}</span></div>` : "");
  return `<div class="card">
    ${photoBlock}
    <div class="card-body">
      ${tag ? `<span class="tag">${tag}</span>` : ""}
      <h3>${h3}</h3>
      <p>${p}</p>
      ${next ? `<p class="next">${next}</p>` : ""}
      ${link ? `<a class="card-link" href="${link[0]}">${link[1]} →</a>` : ""}
    </div>
  </div>`;
}
function photoDiv(url, alt, aspect){
  return `<div style="aspect-ratio:${aspect||"4/3"};overflow:hidden;border-radius:var(--radius);"><img class="real-img" src="${url}" alt="${alt}"></div>`;
}
/* uploaded asset URLs */
const IMG = {
  fotdStaircase: "/_blob/fb8c0cbc67b58a671168f462233fcce6",
  diasporaDialogues: "/_blob/1143274e2e11fa666d3f3f61cc661e07",
  colombiaDinner: "/_blob/9719e812e4177ec5ab0342ed8e447805",
  feiraPreta: "/_blob/973ff0e70f9ecc6e23c8b056a6744a14",
  preaConf: "/_blob/5a3b016e992b3044b24c398a263e7a5b",
  concordiaStage: "/_blob/b67124dc37f63a4381a31ab4ae5655b1",
  cordellPortrait: "/_blob/276e20355972bb7399339d5a97f0bd5d",
  cordellAsuGsv: "/_blob/66b278bc718dc93cae75daf576221d19",
  petronio: "/_blob/7496aa750266299a654258cd64f3afe4",
  pitchCompetition: "/_blob/4ebfe8f51cb6751402ac22d009c787ba",
  powerOfDiaspora: "/_blob/e5a0a41096aca96b3e97591309e79258",
  prea: "/_blob/5a3b016e992b3044b24c398a263e7a5b",
  rio2025: "/_blob/bcc33857a084794b10d44b74972ec671",
  salsaMuseum: "/_blob/6a30f6ccf0bf470ada9d0926b7911275",
  voicesMedellin: "/_blob/ae85432a8465dc19d0d490f364c9edf1",
  diasporaShort: "/_blob/25dd17b778d52e3d8a3ac45bc12ac812",
  etnicaTv: "/_blob/35939344f84bab49dee9b5546bc35eab",
};
function statBlock(num, body){
  return `<div><span class="stat-num">${num}</span><p class="stat-body">${body}</p></div>`;
}
function section(inner, opts={}){
  const cls = ["section", opts.alt ? "on-yellow" : "", opts.dot ? "dot-pattern" : "", opts.alt && opts.dot ? "on-yellow-bg" : ""].filter(Boolean).join(" ");
  const style = opts.style || "";
  return `<section class="${cls}"${style ? ` style="${style}"` : ""}><div class="wrap">${inner}</div></section>`;
}

/* ============================================================ CONVENE (hub) */
write("convene.html", layout({
  title: "Convene",
  description: "Festival of the Diaspora, Diaspora Dialogues, and Sixth Region Summit: the convenings where Project on Belonging builds trust.",
  body: `
${hero("01 of 04 · Convene", "We convene.", "We bring people into the same room. Trust starts there. Across three convenings and three continents, leaders, institutions, entrepreneurs, and communities build the relationships that make everything else on this platform possible.", "", "Cali, Colombia", IMG.fotdStaircase, undefined, "hero--montage")}
${section(`
  <div class="grid grid-3">
    ${card({tag:"Flagship", h3:"Festival of the Diaspora", p:"Three days where leaders, institutions, entrepreneurs, and communities build trust and long-term collaboration. Next: Santiago de Cali, Colombia, February 25 to 27, 2027.", link:["festival-of-the-diaspora.html","Explore the Festival"], photoUrl:IMG.fotdStaircase, photoAlt:"Festival of the Diaspora, formal group photo"})}
    ${card({tag:"International", h3:"Diaspora Dialogues", p:"Our leadership convening on the African continent, focused on cross-border relationships and collaboration across the diaspora. Next: Accra, Ghana, mid-July 2027.", link:["diaspora-dialogues.html","Explore Dialogues"], photoUrl:IMG.diasporaDialogues, photoAlt:"Diaspora Dialogues group photo"})}
    ${card({tag:"U.S. South", h3:"Sixth Region Summit", p:"Our U.S. convening, held every two years in the American South, on regional investment, civic participation, and economic opportunity. Next: Atlanta, Georgia, 2027.", link:["sixth-region-summit.html","Explore the Summit"], photoUrl:"images/concordia-group.jpg", photoAlt:"Leaders gathered on stage at the Concordia Summit", photoPos:"50% 35%"})}
  </div>
  <div style="margin-top:2em;">${ctaRow([["btn-primary","partner-with-us.html","Sponsor a Convening"]])}</div>
`)}
`,
  related: [["connect.html","Connect"],["about.html","About"]],
}));

/* FESTIVAL OF THE DIASPORA */
write("festival-of-the-diaspora.html", layout({
  title: "Festival of the Diaspora",
  description: "Festival of the Diaspora is Project on Belonging's flagship convening, next in Santiago de Cali, Colombia, February 25 to 27, 2027.",
  body: `
${hero("Convene · Flagship", "Festival of the Diaspora", "Our flagship gathering. Three days where leaders, institutions, entrepreneurs, and communities build trust and long-term collaboration.", ctaRow([["btn-primary","partner-with-us.html","Reserve Your Seat"],["btn-ghost","partner-with-us.html","Sponsor the Festival"]]), "Festival of the Diaspora, San Juan", IMG.fotdStaircase)}
${section(`
  <h2>Sixth Annual Festival: A Diasporic Experience in the Pacific</h2>
  <p style="max-width:680px;">February 25 to 27, 2027, in Santiago de Cali, Colombia, with an optional excursion day on February 28. Cali is home to the largest Black middle class in Latin America, and the city is rebuilding. This is the moment for the diaspora to meet in the Pacific, form partnerships, and invest.</p>
`, {alt:true, dot:true})}
${section(`
  <h2>Five festivals, one growing network</h2>
  <div class="grid grid-4" style="margin-top:1.5em;">
    ${statBlock("2022","Our first Festival: 150 leaders from 12 countries, in San Juan.")}
    ${statBlock("5","Festivals so far, in San Juan, Cartagena, Rio de Janeiro, and Medellin.")}
    ${statBlock("40+","Entrepreneurs who exhibited at the Medellin Festival.")}
    ${statBlock("1,000+","Leaders across our broader seminar and convening calendar each year.")}
  </div>
`)}
${section(`
  <h2>Why sponsors show up</h2>
  <p style="max-width:680px;">Institutional participation is built into the room, not bolted on. Sponsors get visibility in front of an audience that is already leaning in, alongside the credibility that comes from standing next to an event people genuinely want to attend. Our Marketplace and pitch competition put your brand directly in front of vetted entrepreneurs.</p>
  ${ctaRow([["btn-primary","partner-with-us.html","Talk to Our Partnerships Team"]])}
`, {style:"background:var(--navy-light);"})}
`,
  related: [["convene.html","All Convenings"],["marketplace.html","Marketplace"],["partner-with-us.html","Sponsor the Festival"]],
}));

/* DIASPORA DIALOGUES */
write("diaspora-dialogues.html", layout({
  title: "Diaspora Dialogues",
  description: "Diaspora Dialogues is Project on Belonging's cross-border leadership convening on the African continent, next in Accra, Ghana, mid-July 2027.",
  body: `
${hero("Convene · International", "Diaspora Dialogues", "Our leadership convening on the African continent, focused on cross-border relationships and collaboration across the diaspora.", ctaRow([["btn-primary","partner-with-us.html","Request an Invitation"]]), "Diaspora Dialogues", IMG.diasporaDialogues)}
${section(`
  <h2>Next edition: Accra, Ghana</h2>
  <p style="max-width:680px;">Mid-July 2027. Past editions have convened leaders in Nairobi and Johannesburg, building a cross-border network that treats the continent and its diaspora as one conversation rather than two.</p>
`, {alt:true, dot:true})}
${section(`
  <h2>What happens in the room</h2>
  <p style="max-width:680px;">Diaspora Dialogues is built for the leaders doing cross-border work every day: institutions investing on the continent, entrepreneurs building bridges, and funders looking for partners who already have the relationships in place. It is smaller than the Festival and built for depth over scale.</p>
`)}
`,
  related: [["convene.html","All Convenings"],["expectant-advisory.html","Expectant Advisory"]],
}));

/* SIXTH REGION SUMMIT */
write("sixth-region-summit.html", layout({
  title: "Sixth Region Summit",
  description: "Sixth Region Summit is Project on Belonging's biennial U.S. convening in the American South, next in Atlanta, Georgia, 2027.",
  body: `
${hero("Convene · American South", "Sixth Region Summit", "Our U.S. convening, held every two years in the American South, on regional investment, civic participation, and economic opportunity.", ctaRow([["btn-primary","partner-with-us.html","Get Notified"]]), "Leaders at the Concordia Summit", "images/concordia-group.jpg", "50% 62%")}
${section(`
  <h2>Why "Sixth Region"</h2>
  <p style="max-width:680px;">The African Union calls the diaspora its sixth region. Sixth Region Summit is where that region meets at home, treating the American South as a region with its own history, institutions, and stake in the platform's work, not a side note to the international conversation.</p>
`, {alt:true, dot:true})}
${section(`
  <h2>Next edition: Atlanta, Georgia</h2>
  <p style="max-width:680px;">2027, date to be announced. Expect the same trust-building mechanism as Festival of the Diaspora, scaled to a biennial rhythm rooted in one region and its institutions.</p>
`)}
`,
  related: [["convene.html","All Convenings"],["about.html","About"]],
}));

/* ============================================================ CONNECT (hub) */
write("connect.html", layout({
  title: "Connect",
  description: "Palante Labs and PoB Studios: how Project on Belonging keeps the relationship going after a convening ends.",
  body: `
${hero("02 of 04", "We connect.", "We keep the relationship going after the room empties. Palante Labs turns an introduction into a working relationship. PoB Studios tells the story so it reaches everyone who was not in the room.", "", "Diaspora Dinner, Quibdó, Colombia", IMG.colombiaDinner)}
${section(`
  <div class="grid grid-2">
    ${card({tag:"Residency", h3:"Palante Labs", p:"A residential exchange based in Cali, Colombia. Leaders and entrepreneurs who met at a convening live and work alongside each other, in both directions.", link:["palante-labs.html","Learn About Palante Labs"], photoUrl:IMG.petronio, photoAlt:"Petronio Alvarez Festival delegation", photoFit:"fill"})}
    ${card({tag:"Media", h3:"PoB Studios", p:"Documentary, podcast, photography, and speaking. Studios tells the stories of the people in this network.", link:["pob-studios.html","Explore PoB Studios"], photoUrl:IMG.etnicaTv, photoAlt:"PoB Studios TV interview", photoFit:"full"})}
  </div>
`, {alt:true, dot:true})}
`,
  related: [["convene.html","Convene"],["collaborate.html","Collaborate"]],
}));

/* PALANTE LABS */
write("palante-labs.html", layout({
  title: "Palante Labs",
  description: "Palante Labs is Project on Belonging's residential exchange based in Cali, Colombia, turning convening introductions into working relationships.",
  body: `
${hero("Connect · Residency", "Palante Labs", "A residential exchange based in Cali, Colombia. Leaders and entrepreneurs who met at a convening live and work alongside each other, in both directions, so an introduction becomes a working relationship.", ctaRow([["btn-primary","partner-with-us.html","Host or Fund a Residency"]]), "Petronio Alvarez Festival delegation", IMG.petronio)}
${section(`
  <h2>Three ways we build the exchange</h2>
  <div class="grid grid-3" style="margin-top:1.5em;">
    ${card({h3:"Bilateral Residencies", p:"Entrepreneurs and leaders trade places, working inside each other's organizations and markets for a defined stretch of time."})}
    ${card({h3:"Executives-in-Residence", p:"Senior leaders embed with partner institutions in Cali, trading expertise for firsthand exposure to the Pacific region's businesses."})}
    ${card({h3:"Petronio Alvarez Delegation", p:"Our yearly delegation to the Petronio Alvarez Festival, the largest celebration of Afro-Colombian culture in the Pacific region.", photoUrl:IMG.petronio, photoAlt:"Petronio Alvarez Festival"})}
  </div>
`, {alt:true, dot:true})}
${section(`
  <h2>Who this is built for</h2>
  <div class="grid grid-3" style="margin-top:1.5em;">
    ${card({h3:"Entrepreneurs in the Pacific region", p:"Gain direct access to partners, capital, and markets beyond Colombia."})}
    ${card({h3:"Young leaders", p:"Build a working relationship with the region, not just a memory of a conference."})}
    ${card({h3:"Institutions and funders", p:"Place people on the ground where the relationships you have funded actually operate."})}
  </div>
`)}
`,
  related: [["connect.html","Connect"],["palante-capital.html","Palante Capital"],["partner-with-us.html","Host a Residency"]],
}));

/* POB STUDIOS */
write("pob-studios.html", layout({
  title: "PoB Studios",
  description: "PoB Studios produces documentary, podcast, photography, and speaking content that tells the stories of the Project on Belonging network.",
  body: `
${hero("Connect · Media", "PoB Studios", "Documentary, podcast, photography, and speaking. Studios tells the stories of the people in this network, so the work reaches everyone who was not in the room.", ctaRow([["btn-primary","https://www.youtube.com/@projectonbelonging","Watch on YouTube"],["btn-ghost","#","Follow on LinkedIn"]]), "Cordell Carter, Étnica TV interview", IMG.etnicaTv)}
${section(`
  <div class="split">
    <div class="video-card" style="aspect-ratio:16/9;background-image:url('${IMG.voicesMedellin}');">
      <a class="play-btn" href="https://www.youtube.com/@projectonbelonging" target="_blank" rel="noopener" aria-label="Watch on YouTube">
        <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
      </a>
    </div>
    <div>
      <h2>Book a speaker</h2>
      <p style="max-width:520px;">Cordell Carter and the leaders in this network speak on belonging, diaspora investment, and cross-border collaboration. If you are planning a conference, class, or convening of your own, Studios can help you find the right voice.</p>
      ${ctaRow([["btn-primary","partner-with-us.html","Book a Speaker"]])}
    </div>
  </div>
  <div class="filmstrip" style="margin-top:36px;">
    ${[IMG.salsaMuseum, IMG.rio2025, IMG.powerOfDiaspora, IMG.diasporaShort, IMG.colombiaDinner, IMG.feiraPreta].map(u=>`<img class="real-img" style="width:140px;height:92px;object-fit:cover;flex:0 0 auto;" src="${u}" alt="PoB Studios b-roll">`).join("")}
  </div>
`, {alt:true, dot:true})}
`,
  related: [["connect.html","Connect"],["palante-labs.html","Palante Labs"]],
}));

/* ============================================================ COLLABORATE (hub) */
write("collaborate.html", layout({
  title: "Collaborate",
  description: "Expectant Advisory helps institutions turn the trusted relationships Project on Belonging builds into strategy.",
  body: `
${hero("03 of 04 · Collaborate", "We collaborate.", "We help institutions turn trusted relationships into strategy. Expectant Advisory is how foundations, universities, companies, and public agencies act on the relationships they have built here.", "", "PREA Conference, Washington, D.C.", IMG.preaConf)}
${section(`
  <div class="card card--feature">
    <div class="card-photo"><img class="real-img" src="images/prea-panel.jpg" alt="Panel discussion at the PREA Conference, Washington, D.C."></div>
    <div class="card-body">
      <span class="tag">Advisory</span>
      <h3>Expectant Advisory</h3>
      <p>Strategy, philanthropy, finance, and partnership development, backed by a network of institutional clients and 1,000+ leaders convened every year.</p>
      <a class="card-link" href="expectant-advisory.html">Go Straight to Expectant Advisory →</a>
    </div>
  </div>
  <div style="margin-top:1.5em;">${ctaRow([["btn-primary","partner-with-us.html","Start a Conversation"]])}</div>
`, {dot:true})}
`,
  related: [["connect.html","Connect"],["invest.html","Invest"]],
}));

/* EXPECTANT ADVISORY */
write("expectant-advisory.html", layout({
  title: "Expectant Advisory",
  description: "Expectant Advisory is Project on Belonging's institutional advisory arm, offering strategy, philanthropy, finance, and partnership development.",
  body: `
${hero("Collaborate · Advisory", "Expectant Advisory", "Our institutional advisory arm. We work with foundations, universities, companies, and public agencies that want to act on the relationships they have built.", ctaRow([["btn-primary","partner-with-us.html","Start a Conversation"]]), "Cordell Carter interviewing Gov. Kathy Hochul, Concordia Summit", IMG.concordiaStage)}
${section(`
  <h2>Four services</h2>
  <div class="grid grid-4" style="margin-top:1.5em;">
    ${card({h3:"01. Strategy", p:"Strategic planning and organizational design for institutions ready to turn relationships into a plan."})}
    ${card({h3:"02. Philanthropy", p:"Advisory for foundations on giving, backing, and measuring the impact of their investments."})}
    ${card({h3:"03. Finance", p:"Help structuring capital, from grants through investment, for the partners you already trust."})}
    ${card({h3:"04. Partnership Development", p:"Market research, landscape analysis, and stakeholder engagement that turns an introduction into a partnership."})}
  </div>
`, {alt:true, dot:true})}
${section(`
  <h2>Trusted by</h2>
  <p style="max-width:680px;">University of Washington, U.S. Office of Personnel Management, Bosch Alumni Network, Delivering Good, CareerWise DC, Fondacija787, and LinkSP.</p>
  <h2>Custom convenings and leadership seminars</h2>
  <p style="max-width:680px;">Cordell Carter curates more than three dozen off the record leadership seminars a year, reaching more than 1,000 leaders. Advice that arrives with introductions, not just a report.</p>
  ${ctaRow([["btn-primary","partner-with-us.html","Start a Conversation"]])}
`)}
`,
  related: [["collaborate.html","Collaborate"],["partner-with-us.html","Work With Advisory"]],
}));

/* ============================================================ INVEST (hub) */
write("invest.html", layout({
  title: "Invest",
  description: "Palante Capital and the Marketplace: how Project on Belonging moves capital and customers to entrepreneurs in its network.",
  body: `
${hero("04 of 04 · Invest", "We invest.", "We move capital and customers to the entrepreneurs in our network. Palante Capital backs the businesses. The Marketplace puts them in front of the people ready to buy, fund, or partner.", "", "Festival of the Diaspora award presentation", IMG.pitchCompetition)}
${section(`
  <div class="grid grid-2">
    ${card({tag:"Fund", h3:"Palante Capital", p:"Our investment fund, headquartered in Santiago de Cali, built to back small and medium-sized businesses across Colombia, Brazil, and Africa.", link:["palante-capital.html","Request Fund Information"], photoUrl:"images/palante-capital.jpg", photoAlt:"Two men in conversation at an event in Cali, Colombia", photoFit:"fill", photoFocus:"50% 30%"})}
    ${card({tag:"Marketplace", h3:"Marketplace", p:"Pitch competitions, an exhibition hall, and industry compacts that put entrepreneurs in front of sponsors, buyers, and investors.", link:["marketplace.html","Explore the Marketplace"], photoUrl:IMG.pitchCompetition, photoAlt:"Festival of the Diaspora award presentation", photoFit:"fill"})}
  </div>
`, {alt:true, dot:true})}
`,
  related: [["collaborate.html","Collaborate"],["about.html","About"]],
}));

/* PALANTE CAPITAL */
write("palante-capital.html", layout({
  title: "Palante Capital",
  description: "Palante Capital is Project on Belonging's investment fund, headquartered in Santiago de Cali, backing small and medium-sized businesses across Colombia, Brazil, and Africa.",
  body: `
${hero("Invest · Fund", "Palante Capital", "Our investment fund, headquartered in Santiago de Cali. It is built to back small and medium-sized businesses across Colombia, Brazil, and Africa.", ctaRow([["btn-primary","partner-with-us.html","Request Fund Information"]]), "Diaspora Dinner, Quibdó, Colombia", IMG.colombiaDinner)}
${section(`
  <h2>Where we invest</h2>
  <p style="max-width:680px;">Colombia, Brazil, and Africa: the geographies where our convenings and residencies already run deep.</p>
  <h2>What we back</h2>
  <p style="max-width:680px;">Small and medium-sized businesses, and the talent and workforce that grows them.</p>
  <h2>Why Cali</h2>
  <p style="max-width:680px;">Cali is home to the largest Black middle class in Latin America, and the city is rebuilding. We are placing capital where the relationships and the opportunity already meet.</p>
`, {alt:true, dot:true})}
${section(`
  <p style="font-size:.85rem;opacity:.65;max-width:680px;border-top:1px solid var(--navy-line);padding-top:1.2em;">This page is for information only. It is not an offer to sell, or a solicitation to buy, any security.</p>
  ${ctaRow([["btn-primary","partner-with-us.html","Request Fund Information"]])}
`)}
`,
  related: [["invest.html","Invest"],["marketplace.html","Marketplace"],["palante-labs.html","Palante Labs"]],
}));

/* MARKETPLACE */
write("marketplace.html", layout({
  title: "Marketplace",
  description: "The Project on Belonging Marketplace connects entrepreneurs with sponsors, buyers, and investors through pitch competitions, an exhibition hall, and industry compacts.",
  body: `
${hero("Invest · Marketplace", "Marketplace", "Pitch competitions, an exhibition hall, and industry compacts that put entrepreneurs in front of sponsors, buyers, and investors who already trust the introduction.", ctaRow([["btn-primary","partner-with-us.html","Join an Industry Compact"]]), "Festival of the Diaspora award presentation", IMG.pitchCompetition)}
${section(`
  <div class="grid grid-4" style="margin-top:1em;">
    ${card({h3:"Pitch Competition", p:"Black Ambition and Casa Innovation bring their pitch competitions to the Festival stage every year.", photoUrl:IMG.pitchCompetition, photoAlt:"Festival of the Diaspora award presentation", photoFit:"fill"})}
    ${card({h3:"Exhibition Hall", p:"40+ entrepreneurs exhibited at the Medellin Festival, in front of sponsors and investors already in the room.", photoUrl:IMG.feiraPreta, photoAlt:"Feira Preta exhibition market, Brazil"})}
    ${card({h3:"Industry Compacts", p:"Precious metals and workforce development compacts connect entrepreneurs directly to institutional buyers."})}
    ${card({h3:"Casa Innovation", p:"Dedicated support for underestimated entrepreneurs building their first real foothold in the market."})}
  </div>
`, {alt:true, dot:true})}
`,
  related: [["invest.html","Invest"],["palante-capital.html","Palante Capital"]],
}));

/* ============================================================ ABOUT */
write("about.html", layout({
  title: "About",
  description: "Project on Belonging is a platform built around trust, connecting convenings, advisory, media, and investment across the diaspora.",
  body: `
${hero("About", "A platform built around trust.", "Project on Belonging is not a collection of programs that happen to share a name. It is one platform, built on one idea: trust does not come from a mission statement, it comes from shared experience.", "", "Diaspora Dialogues", IMG.diasporaDialogues)}
${section(`
  <h2>One platform, four kinds of work</h2>
  <div class="grid grid-4" style="margin-top:1.5em;">
    ${card({tag:"Convene", h3:"Trust starts here", p:"Festival of the Diaspora, Diaspora Dialogues, Sixth Region Summit.", link:["convene.html","See Convene"]})}
    ${card({tag:"Connect", h3:"The relationship continues", p:"Palante Labs, PoB Studios.", link:["connect.html","See Connect"]})}
    ${card({tag:"Collaborate", h3:"Trust becomes strategy", p:"Expectant Advisory.", link:["collaborate.html","See Collaborate"]})}
    ${card({tag:"Invest", h3:"Capital follows trust", p:"Palante Capital, Marketplace.", link:["invest.html","See Invest"]})}
  </div>
`, {alt:true, dot:true})}
${section(`
  <h2>What we value</h2>
  <div class="grid grid-3" style="margin-top:1.5em;">
    ${card({h3:"Belonging", p:"We make spaces where everyone is seen, valued, and able to act."})}
    ${card({h3:"Opportunity", p:"We pursue shared prosperity and real pathways to it."})}
    ${card({h3:"Excellence", p:"We do our best work with the time we have."})}
    ${card({h3:"Integrity", p:"We do the right thing when nobody is watching."})}
    ${card({h3:"Collaboration", p:"We build with others, because relationships run both ways."})}
    ${card({h3:"Legacy", p:"We build fair systems that last for the next generation."})}
  </div>
`)}
${section(`
  <h2>Where we meet</h2>
  <p style="max-width:680px;">So far: San Juan, Cartagena de Indias, Rio de Janeiro, Medellin, Nairobi, and Johannesburg. In 2027: Santiago de Cali in February, Accra in July, and Atlanta on a date to be announced.</p>
`, {alt:true, dot:true})}
${section(`
  <div class="split">
    <div style="aspect-ratio:4/5;max-width:320px;overflow:hidden;border-radius:var(--radius);"><img class="real-img" src="${IMG.cordellPortrait}" alt="Cordell Carter, founder of Project on Belonging"></div>
    <div>
      <h2>Our founder</h2>
      <p style="max-width:520px;">Cordell Carter founded Project on Belonging, Festival of the Diaspora, and Expectant Advisory. He curates more than three dozen off the record leadership seminars a year, reaching more than 1,000 leaders.</p>
      ${ctaRow([["btn-ghost","partner-with-us.html","Bio and Speaking Requests"]])}
    </div>
  </div>
`)}
${section(`
  <h2>Why we started</h2>
  <p style="max-width:680px;">Project on Belonging was launched in 2021 to create spaces for thoughtful, curious, globally minded leaders all over the Americas to build community, collaborate, and grow together.</p>
  <h2>What we mean by belonging</h2>
  <p style="max-width:680px;">Belonging is civic, and it is economic. We connect the cultural identity of the diaspora to tangible economic development: partnerships, ventures, and investment.</p>
  ${ctaRow([["btn-primary","partner-with-us.html","Partner With Us"],["btn-ghost","convene.html","Attend a Convening"]])}
`, {alt:true, dot:true})}
`,
  related: [["convene.html","Convene"],["expectant-advisory.html","Advisory"],["partner-with-us.html","Partner With Us"]],
}));

/* ============================================================ PARTNER WITH US */
write("partner-with-us.html", layout({
  title: "Partner With Us",
  description: "Partner with Project on Belonging through sponsorship, advisory work, industry compacts, or direct investment in diaspora entrepreneurs.",
  body: `
${hero("Partner With Us", "One door in.", "Funders, sponsors, companies, universities, and foundations all start in the same place. Tell us what you want to achieve, and we will recommend the right part of the platform, or the right combination.", "", "")}
${section(`
  <h2>Four ways to partner</h2>
  <div class="grid grid-4" style="margin-top:1.5em;">
    ${card({tag:"Convene", h3:"Sponsor a Convening", p:"Fund seats and put your organization in front of leaders who are already leaning in."})}
    ${card({tag:"Collaborate", h3:"Work with Expectant Advisory", p:"Strategy, philanthropy, finance, partnership development, or a custom leadership seminar."})}
    ${card({tag:"Invest", h3:"Join an Industry Compact", p:"Precious metals and workforce development compacts connect you directly to entrepreneurs."})}
    ${card({tag:"Invest", h3:"Invest in Entrepreneurs", p:"Through the Marketplace and Palante Capital, or by hosting or funding a Palante Labs residency."})}
  </div>
`, {alt:true, dot:true})}
${section(`
  <h2>Tell us what you want to achieve</h2>
  <form class="contact-form" name="partner" method="POST" action="/" data-netlify="true" netlify-honeypot="bot-field" data-success="Thank you. We received your message and will be in touch." style="margin-top:1.3em;">
    <input type="hidden" name="form-name" value="partner">
    <p hidden><label>Leave this field empty: <input name="bot-field"></label></p>
    <div><label for="name">Your name</label><input id="name" name="name" type="text" autocomplete="name" required></div>
    <div><label for="org">Organization</label><input id="org" name="organization" type="text" autocomplete="organization"></div>
    <div><label for="pemail">Email address</label><input id="pemail" name="email" type="email" autocomplete="email" required></div>
    <div>
      <label for="interest">I am interested in</label>
      <select id="interest" name="interest">
        <option>Sponsoring a convening</option>
        <option>Working with Expectant Advisory</option>
        <option>Joining an industry compact</option>
        <option>Investing in entrepreneurs</option>
        <option>Something else</option>
      </select>
    </div>
    <div><label for="goal">What do you want to achieve?</label><textarea id="goal" name="message"></textarea></div>
    <button class="btn btn-primary" type="submit" style="justify-self:start;">Send Message</button>
    <p class="form-status" role="status" aria-live="polite"></p>
  </form>
  <p style="margin-top:1.5em;">Prefer email? Write to us directly at <a href="mailto:info@projectonbelonging.org">info@projectonbelonging.org</a>.</p>
`)}
`,
  related: [["about.html","About"],["convene.html","Convene"],["invest.html","Invest"]],
}));

console.log("Design draft site generated at", DIST);
