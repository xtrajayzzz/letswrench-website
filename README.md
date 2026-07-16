# LetsWrench — Mobile Mechanic Website

Multi-market site for **LetsWrench** — Omaha, NE and Mesa, AZ.

| Market | Phone | SEO hub | Ads LP |
|--------|-------|---------|--------|
| **Omaha** | (531) 999-6507 | `/omaha` | `/mobile-mechanic` (`noindex`) |
| **Mesa** | (480) 745-1761 | `/mesa` | `/mesa-mobile-mechanic` (`noindex`) |

**Hub:** `https://lets-wrench.com/` — choose your city

## Key URLs

| File | URL | Use for |
|------|-----|---------|
| `index.html` | `/` | Multi-market hub |
| `omaha.html` | `/omaha` | Omaha SEO homepage |
| `mesa.html` | `/mesa` | Mesa SEO homepage |
| `mobile-mechanic.html` | `/mobile-mechanic` | Omaha Google Ads |
| `mesa-mobile-mechanic.html` | `/mesa-mobile-mechanic` | Mesa Google Ads |
| Suburb pages | `/mobile-mechanic-bellevue`, etc. | Local SEO |

Phones live in `js/site-config.js` under `markets.omaha` / `markets.mesa`.

## Preview locally

```powershell
npx serve . -p 3000
```

## Google Ads

- Omaha campaign final URL: `https://lets-wrench.com/mobile-mechanic`
- Mesa campaign final URL: `https://lets-wrench.com/mesa-mobile-mechanic`
- Separate location targeting + call extensions per market
