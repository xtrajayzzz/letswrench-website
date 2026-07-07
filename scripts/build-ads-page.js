const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
let html = fs.readFileSync(path.join(root, "index.html"), "utf8");

html = html.replace("<head>", '<head>\n  <base href="/">');
html = html.replace(
  /<meta name="description" content="[^"]+">/,
  '<meta name="robots" content="noindex, follow">\n  <meta name="description" id="meta-description" content="Omaha mobile mechanic — same-day repairs. LetsWrench comes to your home, work, or roadside 24/7. 350+ five-star reviews. Lifetime warranty on our work. Tap to call (531) 999-6507.">'
);
html = html.replace(
  "<title>Mobile Mechanic Omaha, NE — We Come To You 24/7 | LetsWrench</title>",
  "<title>Omaha Mobile Mechanic | LetsWrench · 24/7 Greater Omaha</title>"
);
html = html.replace(
  '<link rel="canonical" href="https://lets-wrench.com/">',
  '<link rel="canonical" href="https://lets-wrench.com/mobile-mechanic">'
);
html = html.replace(/  <meta property="og:[^"]+"[^>]*>\n/g, "");
html = html.replace(/  <meta name="twitter:[^"]+"[^>]*>\n/g, "");
html = html.replace(
  /  <!-- Google Search Console[\s\S]*?<\/script>\n  <script type="application\/ld\+json">[\s\S]*?<\/script>\n/g,
  ""
);
html = html.replace(
  '<body class="site-home site-main">',
  '<body class="site-home lp-ads" data-ads-city="omaha">'
);

/* Homepage-only blocks — keep ads call-first */
html = html.replace(/\s*<p class="hero-eyebrow">[\s\S]*?<\/p>\n/, "\n");
html = html.replace(
  /\s*<section class="trust-strip"[\s\S]*?<\/section>\n/,
  "\n"
);
html = html.replace(
  '<p class="hero-subhead">Your home, work, or roadside — same-day mobile repairs across the greater Omaha area.</p>',
  '<p class="hero-subhead">Any car. Any issue. We come to you — same-day across greater Omaha.</p>'
);
html = html.replace(
  "<h2 class=\"section-heading\">Full-service mobile auto repair</h2>",
  '<h2 class="section-heading">We repair any car, any issue</h2>'
);
html = html.replace(
  "<p class=\"section-intro\">From check engine lights and brake jobs to batteries and A/C — we handle most makes and models on-site. No tow truck, no waiting room, no shop drop-off.</p>",
  '<p class="section-intro">Cars, trucks, and SUVs — most makes and models. Brakes, batteries, diagnostics, A/C, engines, and more. If it can be fixed on-site, we do it. Same day. No tow truck. No waiting room.</p>'
);
html = html.replace(
  '<section class="reviews reviews--brand" id="reviews">',
  '<section class="reviews" id="reviews">'
);
html = html.replace(
  "<h2 class=\"reviews-heading\">What Omaha customers are saying</h2>",
  '<h2 class="reviews-heading">Trusted by 350+ customers</h2>'
);
html = html.replace(
  '<p class="reviews-intro">Real reviews from drivers across the metro — swipe to read</p>',
  '<p class="reviews-intro">What customers across the Omaha metro are saying — swipe to read</p>'
);
html = html.replace(
  '<h2 class="cta-section__title">Ready when you are</h2>',
  '<h2 class="cta-section__title">Need a mechanic near you?</h2>'
);
html = html.replace(
  "<p class=\"cta-section__sub\">Tell us what's going on with the car — we'll quote you and come to you.</p>",
  "<p class=\"cta-section__sub\">Tell us what's going on — we'll quote you and come to you.</p>"
);

/* Ads header: logo + call only */
html = html.replace(
  /<header class="site-header">\s*<div class="wrap header-inner">[\s\S]*?<\/header>/,
  `<header class="site-header lp-header">
    <div class="wrap header-inner">
      <a href="/" class="logo" aria-label="LetsWrench Mobile Mechanic — home">
        <img src="images/logo.png?v=2" alt="Let's Wrench Mobile Mechanic — We come to you" width="120" height="120">
      </a>
      <a href="tel:+15319996507" class="btn btn-header" data-track="call" aria-label="Tap to call (531) 999-6507">Call Now</a>
    </div>
  </header>`
);

html = html.replace(
  '<h2 class="pricing-pride__title">Fair, competitive pricing in Omaha</h2>',
  '<h2 class="pricing-pride__title" id="pricing-city-title">Fair, competitive pricing in Omaha</h2>'
);
html = html.replace(
  'value="New lead — lets-wrench.com"',
  'value="New lead — lets-wrench.com (mobile-mechanic)"'
);

fs.writeFileSync(path.join(root, "mobile-mechanic.html"), html);
console.log("mobile-mechanic.html written");
