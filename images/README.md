# Images

| File | Used on |
|------|---------|
| `logo.png` | Header on all pages |
| `hero.jpg` | Hero + About section (main site), hero (landing page) |

## Favicon (browser tab icon)

Add these files to this folder:

| File | Size | Purpose |
|------|------|---------|
| `favicon.ico` | 32×32 or 48×48 | Chrome, Edge, Firefox tabs |
| `favicon.png` | 32×32 PNG | Modern browsers (backup) |
| `apple-touch-icon.png` | 180×180 PNG | iPhone/iPad home screen bookmark |

### Easiest way (from your logo)

1. Go to [https://realfavicongenerator.net](https://realfavicongenerator.net)
2. Upload `logo.png`
3. Download the generated package
4. Copy `favicon.ico`, `favicon.png`, and `apple-touch-icon.png` into this `images/` folder
5. Push to GitHub (or run `git add .` → `git commit` → `git push`)

Both `index.html` and `mobile-mechanic.html` already point at these paths.

**Tip:** Use the **LW wrench icon** from your logo (crop square), not the full wide logo — it reads better in a tiny tab.

Replace `hero.jpg` with your own on-site mechanic photo when ready.
