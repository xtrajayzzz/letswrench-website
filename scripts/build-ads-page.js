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
  '<body class="site-home">',
  '<body class="site-home lp-ads" data-ads-city="omaha">'
);
html = html.replace(
  '<h2 class="pricing-pride__title">Fair, competitive pricing in Omaha</h2>',
  '<h2 class="pricing-pride__title" id="pricing-city-title">Fair, competitive pricing in Omaha</h2>'
);
html = html.replace(
  'value="New lead — lets-wrench.com"',
  'value="New lead — lets-wrench.com (mobile-mechanic)"'
);
html = html.replace("main.js?v=10", "main.js?v=12");

fs.writeFileSync(path.join(root, "mobile-mechanic.html"), html);
console.log("mobile-mechanic.html written");
