const fs = require("fs");
const path = require("path");
const root = path.join(__dirname, "..");

function transform(html, pairs) {
  let out = html;
  for (const [from, to] of pairs) out = out.replace(from, to);
  return out;
}

let html = fs.readFileSync(path.join(root, "mobile-mechanic.html"), "utf8");

html = transform(html, [
  // Phones first (before city word swaps)
  [/\+15319996507/g, "+16236630873"],
  [/\(531\) 999-6507/g, "(623) 663-0873"],

  // URLs / paths before broad city replaces
  [/https:\/\/lets-wrench\.com\/mobile-mechanic/g, "https://lets-wrench.com/mesa-mobile-mechanic"],
  [/href="\/"/g, 'href="/mesa"'],
  [/href="\/omaha"/g, 'href="/mesa"'],
  [/href="\/mobile-mechanic-bellevue"/g, 'href="/mobile-mechanic-gilbert"'],
  [/href="\/mobile-mechanic-papillion"/g, 'href="/mobile-mechanic-chandler"'],
  [/href="\/check-engine-light-omaha"/g, 'href="/check-engine-light-mesa"'],
  [/New lead — lets-wrench\.com \(mobile-mechanic\)/g, "New lead — lets-wrench.com (mesa-mobile-mechanic)"],

  // Market attrs
  [/data-market="omaha"/g, 'data-market="mesa"'],
  [/data-ads-city="omaha"/g, 'data-ads-city="mesa"'],

  // Place names
  [/Greater Omaha/g, "East Valley"],
  [/greater Omaha/g, "the East Valley"],
  [/Omaha metro/g, "East Valley"],
  [/Omaha, NE/g, "Mesa, AZ"],
  [/Omaha/g, "Mesa"],
  [/omaha/g, "mesa"],
  [/Bellevue/g, "Gilbert"],
  [/Papillion/g, "Chandler"],
  [/La Vista/g, "Tempe"],
  [/Council Bluffs/g, "Queen Creek"],
  [/Elkhorn/g, "Apache Junction"],
  [/Nebraska/g, "Arizona"],
  [/across the metro/g, "across the East Valley"],
  [/and the greater metro/g, "and the East Valley"],
  [/Also Tempe, Apache Junction, Queen Creek/g, "Also Tempe, Queen Creek, Apache Junction"],

  // Coords if present
  [/41\.2565/g, "33.4152"],
  [/-95\.9345/g, "-111.8315"],

  // Cache bust to latest
  [/reviews\.js\?v=\d+/g, "reviews.js?v=5"],
  [/main\.js\?v=\d+/g, "main.js?v=15"],
]);

// Logo label
html = html.replace(
  'aria-label="LetsWrench Mobile Mechanic — home"',
  'aria-label="LetsWrench Mobile Mechanic — Mesa"'
);
html = html.replace(
  'aria-label="LetsWrench Mobile Mechanic — Mesa"',
  'aria-label="LetsWrench Mobile Mechanic — Mesa"'
);

// Title polish
html = html.replace(
  /<title>Mesa Mobile Mechanic \| LetsWrench · 24\/7 East Valley<\/title>/,
  "<title>Mesa Mobile Mechanic | LetsWrench · 24/7 East Valley</title>"
);

// Fix any over-replace: mesa-mobile-mechanic should stay; "greater the East Valley" etc.
html = html.replace(/greater the East Valley/g, "the East Valley");
html = html.replace(/across the the East Valley/g, "across the East Valley");
html = html.replace(/in the the East Valley/g, "in the East Valley");
html = html.replace(/across the East Valley area/g, "across the East Valley");
html = html.replace(/in the East Valley area/g, "in the East Valley");
html = html.replace(/Based in the <strong>the East Valley, NE<\/strong>/g, 'Based in the <strong>East Valley, AZ</strong>');
html = html.replace(/Based in the <strong>the East Valley<\/strong>/g, 'Based in the <strong>East Valley, AZ</strong>');
html = html.replace(/Based in the <strong>greater Mesa, NE<\/strong>/g, 'Based in the <strong>East Valley, AZ</strong>');
html = html.replace(/Based in the <strong>greater Mesa, AZ<\/strong>/g, 'Based in the <strong>East Valley, AZ</strong>');
html = html.replace(/Based in the <strong>the East Valley, AZ<\/strong>/g, 'Based in the <strong>East Valley, AZ</strong>');
html = html.replace(/24\/7 · Mesa, AZ &amp; greater metro/g, "24/7 · Mesa, AZ &amp; East Valley");
html = html.replace(/Greater Mesa, NE/g, "East Valley, AZ");
html = html.replace(/Greater Mesa, AZ/g, "East Valley, AZ");
html = html.replace(/East Valley, NE/g, "East Valley, AZ");
html = html.replace(/placeholder="\(402\) 555-1234"/g, 'placeholder="(623) 555-1234"');
html = html.replace(/fully insured for mobile repair work in the greater Mesa area/g, "fully insured for mobile repair work in the East Valley");
html = html.replace(/same-day mobile repairs across the greater Mesa area/g, "same-day mobile repairs across the East Valley");
html = html.replace(/18\+ years in the Mesa metro/g, "18+ years in the East Valley");
html = html.replace(/18\+ years in the East Valley metro/g, "18+ years in the East Valley");
html = html.replace(/for Mesa and the greater metro/g, "for Mesa and the East Valley");
html = html.replace(/· 24\/7 Greater Mesa<\/title>/, "· 24/7 East Valley</title>");
html = html.replace(/· 24\/7 the East Valley<\/title>/, "· 24/7 East Valley</title>");

fs.writeFileSync(path.join(root, "mesa-mobile-mechanic.html"), html);
console.log("Regenerated mesa-mobile-mechanic.html from mobile-mechanic.html");
