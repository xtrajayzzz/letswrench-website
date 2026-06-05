# LetsWrench — Mobile Mechanic Website

Two pages for **LetsWrench** in Mesa, AZ — built mobile-first with tap-to-call, reviews, and 24/7 messaging.

**Phone:** (555) 555-5555 (placeholder) · **Hours:** 24/7

## Which page to use

| File | URL | Use for |
|------|-----|---------|
| **`index.html`** | `https://lets-wrench.com` | Full website — about, services, reviews, FAQ |
| **`mobile-mechanic.html`** | `https://lets-wrench.com/mobile-mechanic` | Google Ads & paid traffic — call-first landing page |

Point your Google Ads final URL to: `https://lets-wrench.com/mobile-mechanic`

Old `/ads.html` links redirect to `/mobile-mechanic` automatically.

## Preview locally

```powershell
npx serve . -p 3000
```

- Main: http://localhost:3000  
- Landing: http://localhost:3000/mobile-mechanic  

## Google Ads A/B testing

1. Run ads to `/mobile-mechanic` (version A).
2. Later, duplicate to e.g. `mesa.html` with one change (headline, hero, etc.).
3. Split ad groups or use UTM tags to compare call volume.
4. In `js/tracking.js`, replace `G-XXXXXXXXXX` with your GA4 ID to track call/text clicks.

## Files

- `index.html` — full site
- `mobile-mechanic.html` — Google Ads landing page
- `css/styles.css` + `css/ads.css` — styling
- `js/reviews.js` + `js/avatars.js` + `js/main.js` — reviews carousel
- `js/tracking.js` — GA4 call/text click events
