const fs = require("fs");
const path = require("path");
const root = path.join(__dirname, "..");

function reviewsSection({ regionLabel, phoneDisp, phoneE164, heading }) {
  return `
    <section class="reviews" id="reviews">
      <div class="wrap">
        <h2 class="reviews-heading">${heading}</h2>
        <p class="reviews-intro">What customers across ${regionLabel} are saying — swipe to read</p>

        <div class="reviews-carousel" aria-label="Customer reviews carousel">
          <button type="button" class="carousel-btn carousel-prev" aria-label="Previous review">‹</button>
          <div class="reviews-track" id="reviews-track" tabindex="0"></div>
          <button type="button" class="carousel-btn carousel-next" aria-label="Next review">›</button>
        </div>
        <p class="carousel-hint" id="review-counter" data-total-label="30+">1 of 30+</p>

        <button type="button" class="btn btn-outline btn-show-all" id="show-all-reviews" data-total-label="350+" aria-expanded="false">
          See all 350+ reviews
        </button>
        <div class="reviews-all" id="reviews-all"></div>

        <a href="tel:${phoneE164}" class="action-call action-call--primary action-call--section" data-track="call">
          <span class="action-call__label">Tap to call — free quote</span>
          <span class="action-call__number">${phoneDisp}</span>
        </a>
      </div>
    </section>

`;
}

const pages = [
  {
    file: "mobile-mechanic-bellevue.html",
    city: "Bellevue",
    regionLabel: "the Omaha metro",
    phoneDisp: "(531) 999-6507",
    phoneE164: "+15319996507",
    heading: "What Bellevue customers are saying",
  },
  {
    file: "mobile-mechanic-papillion.html",
    city: "Papillion",
    regionLabel: "the Omaha metro",
    phoneDisp: "(531) 999-6507",
    phoneE164: "+15319996507",
    heading: "What Papillion customers are saying",
  },
  {
    file: "mobile-mechanic-gilbert.html",
    city: "Gilbert",
    regionLabel: "the East Valley",
    phoneDisp: "(623) 663-0873",
    phoneE164: "+16236630873",
    heading: "What Gilbert customers are saying",
  },
  {
    file: "mobile-mechanic-chandler.html",
    city: "Chandler",
    regionLabel: "the East Valley",
    phoneDisp: "(623) 663-0873",
    phoneE164: "+16236630873",
    heading: "What Chandler customers are saying",
  },
  {
    file: "check-engine-light-omaha.html",
    city: "Omaha",
    regionLabel: "the Omaha metro",
    phoneDisp: "(531) 999-6507",
    phoneE164: "+15319996507",
    heading: "Trusted by 350+ customers",
  },
  {
    file: "check-engine-light-mesa.html",
    city: "Mesa",
    regionLabel: "the East Valley",
    phoneDisp: "(623) 663-0873",
    phoneE164: "+16236630873",
    heading: "Trusted by 350+ customers",
  },
];

for (const page of pages) {
  const filePath = path.join(root, page.file);
  let html = fs.readFileSync(filePath, "utf8");

  if (html.includes('id="reviews-track"')) {
    console.log("skip (already has reviews):", page.file);
    continue;
  }

  const block = reviewsSection(page);

  // Insert before pricing-pride
  if (!html.includes('<section class="pricing-pride"')) {
    throw new Error("No pricing-pride in " + page.file);
  }
  html = html.replace(
    /    <section class="pricing-pride"/,
    block + '    <section class="pricing-pride"'
  );

  // Add Reviews nav link after Services / How It Works
  if (html.includes('href="#faq"') && !html.includes('href="#reviews"')) {
    html = html.replace(
      /(<a href="#(?:services|how)">[^<]+<\/a>\s*)/,
      '$1\n        <a href="#reviews">Reviews</a>'
    );
  }

  // Scripts: add reviews.js and bump main.js
  if (!html.includes("reviews.js")) {
    html = html.replace(
      /(<script src="js\/gsc-verify\.js\?v=\d+"><\/script>\s*)/,
      '$1<script src="js/reviews.js?v=5"></script>\n  '
    );
  }
  html = html.replace(/main\.js\?v=\d+/g, "main.js?v=15");

  fs.writeFileSync(filePath, html);
  console.log("added reviews:", page.file);
}

// Keep omaha market page on latest reviews cache
const omahaPath = path.join(root, "omaha.html");
let omaha = fs.readFileSync(omahaPath, "utf8");
omaha = omaha.replace(/reviews\.js\?v=\d+/g, "reviews.js?v=5");
omaha = omaha.replace(/main\.js\?v=\d+/g, "main.js?v=15");
fs.writeFileSync(omahaPath, omaha);
console.log("bumped omaha.html script versions");
