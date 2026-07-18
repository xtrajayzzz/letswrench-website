const fs = require("fs");
const path = require("path");
const root = path.join(__dirname, "..");

const mesaFiles = [
  "mesa.html",
  "mesa-mobile-mechanic.html",
  "free-quote-mesa.html",
  "mobile-mechanic-gilbert.html",
  "mobile-mechanic-chandler.html",
  "check-engine-light-mesa.html",
];

for (const file of mesaFiles) {
  const p = path.join(root, file);
  let html = fs.readFileSync(p, "utf8");
  const before = html;
  html = html.replace(
    /value="https:\/\/lets-wrench\.com\/thanks"/g,
    'value="https://lets-wrench.com/thanks?market=mesa"'
  );
  html = html.replace(/tracking\.js\?v=\d+/g, "tracking.js?v=11");
  if (html !== before) {
    fs.writeFileSync(p, html);
    console.log("updated", file);
  } else {
    console.log("no change", file);
  }
}

// Bump tracking on omaha pages too so rememberMarket runs everywhere
const omahaFiles = [
  "omaha.html",
  "mobile-mechanic.html",
  "mobile-mechanic-bellevue.html",
  "mobile-mechanic-papillion.html",
  "check-engine-light-omaha.html",
  "index.html",
  "privacy-policy.html",
  "terms.html",
  "accessibility.html",
];

for (const file of omahaFiles) {
  const p = path.join(root, file);
  if (!fs.existsSync(p)) continue;
  let html = fs.readFileSync(p, "utf8");
  const next = html.replace(/tracking\.js\?v=\d+/g, "tracking.js?v=11");
  if (next !== html) {
    fs.writeFileSync(p, next);
    console.log("bumped tracking", file);
  }
}
