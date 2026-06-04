# Go live — LetsWrench (fast & reliable)

Your site is static HTML/CSS/JS. **Vercel** is the recommended host: global CDN, free HTTPS, 99.99% uptime, auto-deploy on every update.

**Time:** ~15 minutes first time · ~1 minute per update after that

---

## One-time setup

### 1. GitHub (backup + deploy trigger)

1. Create a free account at https://github.com
2. Click **New repository** → name: `letswrench-website` → **Create** (leave it empty)
3. In PowerShell:

```powershell
cd c:\Users\xtraj\website
git init
git add .
git commit -m "LetsWrench website — initial deploy"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/letswrench-website.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username. Sign in if Git asks.

### 2. Vercel (hosting)

1. Go to https://vercel.com → **Sign up** → **Continue with GitHub**
2. **Add New…** → **Project** → import `letswrench-website`
3. Framework: **Other** (no build command needed)
4. Click **Deploy**

You get a live URL like: `https://letswrench-website.vercel.app`

- Main site: `/` or `/index.html`
- Google Ads landing page: `/mobile-mechanic`

### 3. Custom domain (your real URL)

1. Vercel → your project → **Settings** → **Domains**
2. Add `yourdomain.com` and `www.yourdomain.com`
3. Copy the DNS records Vercel shows
4. At your domain registrar (GoDaddy, Namecheap, etc.) → **DNS** → add those records
5. Wait 5–60 minutes. HTTPS is automatic.

**Google Ads final URL:** `https://yourdomain.com/mobile-mechanic`

---

## Every time you change the site

1. Edit files in Cursor (preview: `npx serve . -p 3000`)
2. When ready:

```powershell
cd c:\Users\xtraj\website
git add .
git commit -m "Short note about what you changed"
git push
```

Vercel rebuilds in ~30 seconds. Same URL, updated content.

---

## Optional: deploy without GitHub

Install Vercel CLI once:

```powershell
npm i -g vercel
cd c:\Users\xtraj\website
vercel
```

Follow prompts. Run `vercel --prod` after changes. GitHub + Vercel is easier long-term.

---

## Before ads go live

- [ ] Set GA4 ID in `js/tracking.js` (replace `G-XXXXXXXXXX`)
- [ ] Test call/text links on your phone on the live URL
- [ ] Point Google Ads to `https://yourdomain.com/mobile-mechanic`

---

## Why Vercel for this site

| Need | How Vercel helps |
|------|------------------|
| **Speed** | Files served from edge locations worldwide (CDN) |
| **Reliability** | No server to maintain; static files rarely break |
| **HTTPS** | Free SSL on custom domain |
| **Updates** | Push to GitHub → auto deploy |

**Alternative:** Cloudflare Pages — also excellent. Use if you already use Cloudflare for DNS.
