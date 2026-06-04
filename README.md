# LetsWrench — Mobile Mechanic Website

Two pages for **LetsWrench** in Mesa, AZ — built mobile-first with tap-to-call, 40 reviews, and 24/7 messaging.

**Phone:** (850) 797-9363 · **Hours:** 24/7

## Which page to use

| File | Use for |
|------|---------|
| **`ads.html`** | **Google Ads** — “mobile mechanic near me” traffic. Trust + call first, minimal distractions. |
| **`index.html`** | Full website — gallery, about, longer layout. |

Point your Google Ads final URL to: `https://yourdomain.com/ads.html`

## Preview locally

Double-click `ads.html` or `index.html` in this folder.

## Google Ads A/B testing

1. Run ads to `ads.html` (version A).
2. Later, duplicate to `ads-b.html` with one change (headline, review order, etc.).
3. Split ad groups or use UTM tags to compare call volume.
4. In `js/tracking.js`, replace `G-XXXXXXXXXX` with your GA4 ID to track call/text clicks.

## Files

- `ads.html` — Google Ads landing page
- `index.html` — full site
- `css/styles.css` + `css/ads.css` — styling
- `js/reviews.js` + `js/avatars.js` + `js/main.js` — reviews carousel
- `js/tracking.js` — GA4 call/text click events
