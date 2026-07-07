# LetsWrench — Mobile Mechanic Website

Two pages for **LetsWrench** in Omaha, NE — built mobile-first with tap-to-call, reviews, and 24/7 messaging.

**Phone:** (531) 999-6507 · **Hours:** 24/7 · **Market:** Omaha & greater metro

## Which page to use

| File | URL | Use for |
|------|-----|---------|
| **`index.html`** | `https://lets-wrench.com` | Full website — SEO, organic traffic |
| **`mobile-mechanic.html`** | `https://lets-wrench.com/mobile-mechanic` | Google Ads final URL — **same layout as homepage** (`noindex`) |

Point your Google Ads final URL to: `https://lets-wrench.com/mobile-mechanic`

After editing `index.html`, regenerate the ads page:

```powershell
node scripts/build-ads-page.js
```

Old `/ads.html` links redirect to `/mobile-mechanic` automatically.

## Archived Mesa pages

Former Arizona city pages live in `_archive/mesa/` for reference only. Old URLs (`/mobile-mechanic-gilbert`, `/mobile-mechanic-chandler`, `/check-engine-light-mesa`) redirect to the homepage via `vercel.json`.

## Preview locally

```powershell
npx serve . -p 3000
```

- Main: http://localhost:3000  
- Landing: http://localhost:3000/mobile-mechanic  

## Google Ads A/B testing

1. Run ads to `/mobile-mechanic` (version A).
2. Later, duplicate to e.g. `bellevue.html` with one change (headline, hero, etc.).
3. Split ad groups or use UTM tags to compare call volume.
4. In `js/tracking.js`, replace `G-XXXXXXXXXX` with your GA4 ID to track call/text clicks.

## Files

- `index.html` — full site (Omaha)
- `mobile-mechanic.html` — Google Ads landing page (Omaha)
- `css/styles.css` + `css/ads.css` — styling
- `js/reviews.js` + `js/avatars.js` + `js/main.js` — reviews carousel
- `js/tracking.js` — GA4 call/text click events
