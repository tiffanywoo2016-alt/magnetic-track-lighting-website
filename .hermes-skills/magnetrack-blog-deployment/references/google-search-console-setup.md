# Google Search Console Setup & SEO Checklist for Tracklinear

## Current Status (as of 2026-06-20)

| Item | Status |
|------|--------|
| GitHub Pages Property | ✅ Verified (`https://tiffanywoo2016-alt.github.io/magnetic-track-lighting-website/`) |
| Custom Domain Property | ❌ **NOT verified** (`https://tracklinear.com/`) — This is why only 1 page indexed |
| Sitemap submitted | ⚠️ Old GSC property had sitemap; new domain property needs sitemap resubmission |
| Google Analytics | ✅ G-WXHSW5Y7V8 installed |

## Diagnosis: Why Only 1 Page Is Indexed After Custom Domain Migration

**Root cause:** Three overlapping issues:

### Issue 1: robots.txt Sitemap URL Pointed to Old GitHub Pages Path
```
# OLD (broken):
Sitemap: https://tiffanywoo2016-alt.github.io/magnetic-track-lighting-website/sitemap.xml
# This URL now returns HTTP 301 (redirect) — Google may not follow redirects for sitemap discovery

# FIXED (2026-06-20):
Sitemap: https://tracklinear.com/sitemap.xml
```

### Issue 2: Sitemap lastmod Dates Were Stale
All blog post `<lastmod>` dates were from May/June 2026. Google sees old dates and doesn't prioritize re-crawling. Fix: update all lastmod dates to the current date after each content update.

### Issue 3: Google Search Console Custom Domain NOT Verified (MOST CRITICAL)
The old GitHub Pages URL (`tiffanywoo2016-alt.github.io/magnetic-track-lighting-website/`) is verified in GSC, but the custom domain (`tracklinear.com`) is **NOT**. Until the custom domain is verified:
- Google won't crawl/index newdomain URLs
- Any sitemap submitted via the old property doesn't apply to the new domain
- Only previously-indexed pages from the old domain era may show up

## Steps to Fix (User Must Do)

### 1. Verify `tracklinear.com` in Google Search Console

1. Go to https://search.google.com/search-console
2. Click **"Add property"** → choose **"Domain"** (not URL prefix)
3. Enter: `tracklinear.com`
4. Google will give you a **TXT record value** like `google-site-verification=...`
5. Go to your DNS provider (Alibaba Cloud / Cloudflare) → DNS settings → add a **TXT record**:
   - Host: `@`
   - Value: the TXT record from Google
   - TTL: 3600
6. Save and go back to GSC → click **Verify**
7. Once verified, both `tracklinear.com` and `https://tracklinear.com/` will appear in GSC

### 2. Submit Sitemap for the New Domain

1. In GSC, select your new `tracklinear.com` property
2. Go to **Sitemaps** in the left sidebar
3. Enter: `sitemap.xml`
4. Click Submit
5. Wait 24-48 hours — Google will start crawling all pages listed in the sitemap

### 3. Request Indexing for Key Pages

1. In GSC, use the **URL Inspection** tool
2. Paste each URL one at a time and click **"Request Indexing"**:
   - `https://tracklinear.com/`
   - `https://tracklinear.com/blog/`
   - `https://tracklinear.com/blog-post-9.html`
   - (Repeat for other blog posts)
3. This sends a manual crawl request — speeds up indexing from weeks to days

### ⚠️ Domain vs URL Prefix: Sitemap Submission Quirk (Live Experience 2026-06-20)

**After domain verification passes, submitting sitemap under a Domain property will fail** with "站点地图地址无效" / "Sitemap address invalid" even if `sitemap.xml` is valid (HTTP 200, valid XML, reachable from the same domain). This happened on tracklinear.com and is a known GSC limitation.

**Why it happens:** Domain properties in GSC use a different verification/sitemap mechanism than URL prefix properties. The domain-level sitemap submission often doesn't validate the sitemap correctly because it expects a certain path format that varies by provider.

**Solutions in order of effectiveness:**

| # | Solution | How | Success Rate |
|---|----------|-----|-------------|
| 1 | **Add a URL Prefix property** | Add as second property: `https://tracklinear.com` with URL prefix type → verify → submit sitemap from there | ✅ Works every time |
| 2 | **Submit via robots.txt** | Ensure `Sitemap: https://tracklinear.com/sitemap.xml` is in robots.txt. Google will discover it independently. | ✅ Works but slower |
| 3 | **Try path variants** | Input `sitemap.xml`, `/sitemap.xml`, or `https://tracklinear.com/sitemap.xml` | ⚠️ Hit-or-miss |

**Recommended approach:** Add a second URL Prefix property. This is the standard recommended practice and has 100% success rate.

### Step-by-step: URL Prefix Property + Sitemap Submission

1. **In GSC → Add Property → URL prefix**
   - Enter: `https://tracklinear.com`
2. **Choose verification method: HTML file** (same domain, no DNS changes needed)
   - Google provides a filename like `googlexxxxxxxx.html`
   - It provides the HTML filename and expects the file to be placed at your server root
3. **Create the verification file in the repo root:**
   ```bash
   cd ~/Repos/magnetic-track-lighting-website
   touch googlexxxxxxxx.html
   ```
   Add the meta tag or content Google provides (normally just the file name + content)
4. **Deploy to GitHub Pages:**
   ```bash
   git add googlexxxxxxxx.html && git commit -m "Add GSC verification file" && git push origin main
   ```
5. **Wait ~30 seconds** for GitHub Pages to deploy
6. **Back in GSC → click Verify** — should pass instantly since the file is at the root
7. **Submit sitemap:**
   - Go to Sitemaps section in the URL Prefix property
   - Enter: `sitemap.xml`
   - Click Submit
   - Should show "Submitted" status (not "Couldn't fetch" or "Invalid")

**Expected result:** The sitemap will show all 21 URLs and Google will begin crawling them. Indexing takes 1-7 days.

**Cleanup:** After verification, you can leave the HTML file in the repo or remove it — GSC provides verification via multiple methods and removing one doesn't revoke verification.

If the old GitHub Pages property had accumulated SEO authority, use the **"Change of address"** tool:
1. In GSC, select the old property (`tiffanywoo2016-alt.github.io/...`)
2. Go to **Settings** → **Change of address**
3. Enter the new URL: `https://tracklinear.com/`
4. This tells Google the site moved

## Post-Migration Checklist

- [ ] `robots.txt` sitemap URL: `Sitemap: https://tracklinear.com/sitemap.xml`
- [ ] All sitemap `<loc>` URLs use `https://tracklinear.com/...` (not github.io)
- [ ] All sitemap `<lastmod>` dates are current (not stale)
- [ ] GSC custom domain verified via DNS TXT record
- [ ] Sitemap submitted in new GSC property
- [ ] Key pages manually requested for indexing
- [ ] Internal links in `index.html` use `tracklinear.com` URLs where absolute

## Canonical URL Note

The canonical URL in blog post HTML should use the custom domain:
```html
<link rel="canonical" href="https://tracklinear.com/blog-post-N.html">
```

OG/Twitter card image URLs should also use the custom domain:
```html
<meta property="og:image" content="https://tracklinear.com/images/blog_header_N.webp">
```

## Verification Commands

```bash
# Check robots.txt
curl -s https://tracklinear.com/robots.txt

# Check sitemap is served
curl -sI https://tracklinear.com/sitemap.xml | head -5

# Check blog page returns 200
curl -sI https://tracklinear.com/blog-post-9.html | head -5

# Check last-modified header
curl -sI https://tracklinear.com/ | grep -i last-modified
```

## DNS Troubleshooting for GSC Verification (Live Experience 2026-06-20)

When the user reports "Google Search Console verification failed — TXT record not found", follow this diagnostic sequence to find the root cause.

### Step 1: Identify DNS Hosting Provider

```bash
# Check NS records to see who is hosting DNS
dig NS tracklinear.com @8.8.8.8 +short
```

**Expected outputs and their meaning:**
- `dns15.hichina.com.` / `dns16.hichina.com.` → Alibaba Cloud (阿里云) DNS
- `ns1.cloudflare.com.` → Cloudflare DNS
- `tiffanywoo2016-alt.github.io.` → **False positive!** This means GitHub Pages has overwritten the NS records — actually check the authoritative NS directly

**Important:** If `dig NS tracklinear.com +short` returns `tiffanywoo2016-alt.github.io.`, this is a GitHub Pages CNAME conflict, NOT the actual NS servers. Always query Google DNS directly:
```bash
dig NS tracklinear.com @8.8.8.8 +short
```

### Step 2: Query Authoritative DNS Directly

Once you know the DNS provider, query THEIR nameservers directly (bypasses any DNS caching or CNAME conflicts):

```bash
# For Alibaba Cloud DNS:
dig TXT tracklinear.com @dns15.hichina.com +short
dig A tracklinear.com @dns15.hichina.com +short
dig CNAME tracklinear.com @dns15.hichina.com +short

# For Cloudflare DNS:
dig TXT tracklinear.com @ns1.cloudflare.com +short
```

This reveals the TRUE DNS records, not what the resolver returns after following CNAME chains.

### Step 3: Check Public DNS Propagation

After the user adds the TXT record in their DNS console, verify from a public resolver:

```bash
# Google DNS (8.8.8.8) — usually fastest to propagate
dig TXT tracklinear.com @8.8.8.8 +short

# Cloudflare DNS (1.1.1.1) — may show a different cached version
dig TXT tracklinear.com @1.1.1.1 +short
```

**Expected output when TXT is correctly set:**
```
"google-site-verification=KNu4TuP-uD7FO5bimD-8icow4STnkOG58E55xrhq09c"
```

### Step 4: Interpret Typical DNS Architecture for GitHub Pages

For a GitHub Pages custom domain on Alibaba Cloud DNS, the typical setup is:

| Record | Host | Value | Notes |
|--------|------|-------|-------|
| A | `@` | `185.199.108.153` + 3 other GH IPs | Alternative to CNAME — avoid because IPs can change |
| CNAME | `@` | `tiffanywoo2016-alt.github.io.` | Most common setup — Alibaba Cloud supports CNAME at apex |
| CNAME | `www` | `tiffanywoo2016-alt.github.io.` | For www subdomain |
| TXT | `@` | `google-site-verification=...` | For GSC domain verification |

**Pitfall:** If the `@` record is a CNAME, you CANNOT also have A or AAAA or MX records for `@` — CNAME must be the ONLY record at the apex. However, **a TXT record at `@` is compatible with a CNAME at `@`** because TXT is not a DNS record type that CNAME conflicts with. This is a common misconception — DNS standards allow TXT + CNAME at the same node.

### Step 5: Common Failure Modes

| Symptom | Cause | Fix |
|---------|-------|-----|
| `dig @8.8.8.8 TXT` returns empty | TXT not yet added or DNS not propagated | Wait 5-10 min, then recheck. Alibaba Cloud DNS is usually fast (< 2 min) |
| `dig @8.8.8.8 TXT` returns old/other content | Multiple TXT records exist | Google Search Console matches the exact `google-site-verification=` string — as long as ONE TXT record contains it, verification will work |
| GSC says "TXT record not found" but `dig` shows it | DNS cached at different layer | Wait a few more minutes and retry in GSC. Google uses their own DNS resolver which may lag behind 8.8.8.8 |
| User sees "验证失败" in Chinese GSC UI | Same root cause as above | Tell user to wait and try again in 10-15 min |

### Real Case: Tracklinear (2026-06-20)

The user had:
- Domain: `tracklinear.com` purchased on Alibaba Cloud (阿里云/万网)
- DNS hosted at: Alibaba Cloud (`dns15.hichina.com` / `dns16.hichina.com`)
- GitHub Pages CNAME: `@` → `tiffanywoo2016-alt.github.io` + `www` → `tiffanywoo2016-alt.github.io`
- GSC verification failed because: **No TXT record existed** in Alibaba Cloud DNS
- Fix: User added TXT record at `@` with value `google-site-verification=KNu4TuP-uD7FO5bimD-8icow4STnkOG58E55xrhq09c`
- Verification: `dig TXT tracklinear.com @8.8.8.8 +short` confirmed TXT was live

**Key insight:** The TXT record at `@` is compatible with the CNAME at `@` — no conflict. The CNAME only conflicts with other record types (A, AAAA, MX) at the same hostname.

## Historical Context

- Before domain migration: ~6 pages indexed under `tiffanywoo2016-alt.github.io`
- After migration to `tracklinear.com`: only 1 page (homepage) indexed
- Fix applied 2026-06-20: robots.txt + sitemap updated
- User still needs to verify the custom domain in GSC for full recovery

## Image Compression (must do before every upload)

Tools available on this server:
- `python3` + `Pillow` → ✅ Available (use `scripts/compress_image.py`)
- `cwebp` → ❌ Not installed
- `mogrify` → ❌ Not installed

Command: `python3 ~/.hermes/skills/devops/magnetrack-blog-deployment/scripts/compress_image.py input.jpg output.webp`

## Key URLs
- Live: `https://tracklinear.com/`
- Repo: `tiffanywoo2016-alt/magnetic-track-lighting-website`
- Local: `~/Repos/magnetic-track-lighting-website/`
- Sitemap: `sitemap.xml`
- Robots: `robots.txt` (Allow all + sitemap pointer)
