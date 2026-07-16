const fs = require("fs");
const path = require("path");
const root = path.join(__dirname, "..");
const files = [
  "mobile-mechanic-bellevue.html",
  "mobile-mechanic-papillion.html",
  "mobile-mechanic-gilbert.html",
  "mobile-mechanic-chandler.html",
  "check-engine-light-omaha.html",
  "check-engine-light-mesa.html",
];
for (const f of files) {
  const p = path.join(root, f);
  let h = fs.readFileSync(p, "utf8");
  h = h.replace(
    /<a href="#reviews">Reviews<\/a><a href="#faq">FAQ<\/a>/g,
    '<a href="#reviews">Reviews</a>\n        <a href="#faq">FAQ</a>'
  );
  h = h.replace(
    /(<a href="#(?:services|how)">[^<]+<\/a>)\s*\n\s*\n\s*(<a href="#reviews">)/g,
    "$1\n        $2"
  );
  fs.writeFileSync(p, h);
  console.log("fixed nav", f);
}
