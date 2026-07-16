const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const read = (f) => fs.readFileSync(path.join(root, f), "utf8");
const write = (f, c) => fs.writeFileSync(path.join(root, f), c);

// 1) Omaha market page from current homepage
let omaha = read("index.html");
omaha = omaha.replace(
  '<link rel="canonical" href="https://lets-wrench.com/">',
  '<link rel="canonical" href="https://lets-wrench.com/omaha">'
);
omaha = omaha.replace(
  'content="https://lets-wrench.com/"',
  'content="https://lets-wrench.com/omaha"'
);
omaha = omaha.replace(
  '"url": "https://lets-wrench.com"',
  '"url": "https://lets-wrench.com/omaha"'
);
omaha = omaha.replace(
  '<body class="site-home">',
  '<body class="site-home" data-market="omaha">'
);
omaha = omaha.replace(
  'value="New lead — lets-wrench.com"',
  'value="New lead — lets-wrench.com (Omaha)"'
);
omaha = omaha.replace(
  '<a class="area-link" href="/">Omaha</a>',
  '<a class="area-link" href="/omaha">Omaha</a>'
);
omaha = omaha.replace(
  '<a href="/">Omaha</a>',
  '<a href="/omaha">Omaha</a>'
);
omaha = omaha.replace(
  'href="css/styles.css?v=15"',
  'href="css/styles.css?v=16"'
);
omaha = omaha.replace(
  'href="css/home.css?v=9"',
  'href="css/home.css?v=10"'
);
write("omaha.html", omaha);
console.log("Wrote omaha.html");

// 2) Mesa market page from Omaha
let mesa = omaha;
const mesaReplacements = [
  [/Omaha, NE/g, "Mesa, AZ"],
  [/Omaha and the greater metro/g, "Mesa and the East Valley"],
  [/greater Omaha metro/g, "East Valley"],
  [/greater Omaha, NE/g, "East Valley, AZ"],
  [/greater Omaha area/g, "East Valley"],
  [/Greater Omaha/g, "East Valley"],
  [/Omaha metro/g, "East Valley"],
  [/Omaha customers/g, "Mesa customers"],
  [/Omaha trusts/g, "Mesa trusts"],
  [/In the Omaha metro/g, "In the East Valley"],
  [/around Omaha, Bellevue, Papillion/g, "around Mesa, Gilbert, Chandler"],
  [/Omaha, Bellevue, Papillion, La Vista, Council Bluffs/g, "Mesa, Gilbert, Chandler, Tempe, Queen Creek"],
  [/\+15319996507/g, "+16236630873"],
  [/\(531\) 999-6507/g, "(623) 663-0873"],
  [/https:\/\/lets-wrench\.com\/omaha/g, "https://lets-wrench.com/mesa"],
  [/data-market="omaha"/g, 'data-market="mesa"'],
  [/>Omaha</g, ">Mesa<"],
  [/hero-city">Omaha/g, 'hero-city">Mesa'],
  [/Serving <strong>Omaha<\/strong>, Bellevue, Papillion, La Vista, Council Bluffs/g, "Serving <strong>Mesa</strong>, Gilbert, Chandler, Tempe, Queen Creek"],
  [/Bellevue, Papillion, La Vista, Elkhorn, Council Bluffs/g, "Gilbert, Chandler, Tempe, Queen Creek, Apache Junction"],
  [/href="\/mobile-mechanic-bellevue"/g, 'href="/mobile-mechanic-gilbert"'],
  [/href="\/mobile-mechanic-papillion"/g, 'href="/mobile-mechanic-chandler"'],
  [/href="\/check-engine-light-omaha"/g, 'href="/check-engine-light-mesa"'],
  [/>Bellevue</g, ">Gilbert<"],
  [/>Papillion</g, ">Chandler<"],
  [/>Check Engine Light</g, ">Check Engine Light<"],
  [/>Check Engine Diagnostics</g, ">Check Engine Diagnostics<"],
  [/Also La Vista, Elkhorn, Council Bluffs/g, "Also Tempe, Queen Creek, Apache Junction"],
  [/pricing in Omaha/g, "pricing in Mesa"],
  [/New lead — lets-wrench\.com \(Omaha\)/g, "New lead — lets-wrench.com (Mesa)"],
  [/41\.2565/g, "33.4152"],
  [/-95\.9345/g, "-111.8315"],
  [/"Nebraska"/g, '"Arizona"'],
  [/"Iowa"/g, '"Arizona"'],
  [/"name": "Bellevue"/g, '"name": "Gilbert"'],
  [/"name": "Papillion"/g, '"name": "Chandler"'],
  [/"name": "La Vista"/g, '"name": "Tempe"'],
  [/"name": "Elkhorn"/g, '"name": "Queen Creek"'],
  [/"name": "Gretna"/g, '"name": "Apache Junction"'],
  [/"name": "Council Bluffs"/g, '"name": "San Tan Valley"'],
  [/"name": "Omaha"/g, '"name": "Mesa"'],
  [/in Omaha/g, "in Mesa"],
  [/across greater Omaha/g, "across the East Valley"],
  [/Nebraska/g, "Arizona"],
];

mesaReplacements.forEach(([from, to]) => {
  mesa = mesa.replace(from, to);
});

// Fix any leftover Omaha city name in title patterns that used Omaha alone
mesa = mesa.replace(
  /Mobile Mechanic Omaha/g,
  "Mobile Mechanic Mesa"
);
mesa = mesa.replace(
  /Omaha Mobile Mechanic/g,
  "Mesa Mobile Mechanic"
);

write("mesa.html", mesa);
console.log("Wrote mesa.html");
