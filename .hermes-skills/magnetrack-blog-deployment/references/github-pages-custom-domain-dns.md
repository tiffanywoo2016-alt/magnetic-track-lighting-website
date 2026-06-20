# GitHub Pages Custom Domain + DNS Setup (Aliyun)

Procedure for pointing a custom domain (e.g. `tracklinear.com`) from Alibaba Cloud DNS to a GitHub Pages site.

## Prerequisites

- Domain registered on Alibaba Cloud (阿里云)
- GitHub Pages site already live at `https://<user>.github.io/<repo>/`
- Git repo pushed with all content

## Step 1: Alibaba Cloud DNS Records

Log in to Aliyun console → Domain & Website → Domain List → tracklinear.com → **DNS 管理 → 域名解析 → 添加记录**.

Add **two CNAME records**:

| Type | Host Record | Value | TTL |
|------|-------------|-------|-----|
| CNAME | `@` | `<user>.github.io` | 600 |
| CNAME | `www` | `<user>.github.io` | 600 |

> **Why CNAME and not A record?** GitHub Pages provides `github.io` as a CNAME target. If GitHub ever changes their IPs, the CNAME still works. A records pointing to GitHub IPs are a legacy approach and are NOT recommended.

> **TTL:** 600 (10 min) is fine. Lower TTL only matters if you're testing or will change the record soon. Once stable, 3600 is fine.

### ⚠️ Important Note on `@` CNAME (APEX domain)

Some DNS providers (like Cloudflare) do NOT support CNAME at the apex (`@`). **Alibaba Cloud does support it**, so this works. If migrating to a different provider in the future, you may need:
- Cloudflare: CNAME flattening (enabled by default)
- Other providers: ALIAS/ANAME record, or use A records pointing to GitHub Pages IPs

## Step 2: Configure Custom Domain in GitHub (API Method — Preferred for CLI-first workflows)

> **Method A (API — recommended when you have a PAT):** Use the GitHub REST API. This avoids the browser entirely and works even when `git push` times out.

**Step 2a: Check current Pages status**

```bash
curl -s -H "Authorization: token <PAT>" \
  https://api.github.com/repos/<owner>/<repo>/pages \
  | python3 -c "import sys,json; d=json.load(sys.stdin); print(f'Status: {d.get(\"status\")}\\nCNAME: {d.get(\"cname\")}\\nHTTPS: {d.get(\"https_enforced\")}')"
```

**Step 2b: Set custom domain**

```bash
curl -s -X PUT \
  -H "Authorization: token <PAT>" \
  -H "Accept: application/vnd.github+json" \
  https://api.github.com/repos/<owner>/<repo>/pages \
  -d '{"cname":"tracklinear.com","source":{"branch":"main","path":"/"}}'
```

**Step 2c: Verify CNAME is set**

```bash
curl -s -H "Authorization: token <PAT>" \
  https://api.github.com/repos/<owner>/<repo>/pages \
  | python3 -c "import sys,json; d=json.load(sys.stdin); print(f'CNAME: {d.get(\"cname\")}')"
```

Expected: `CNAME: tracklinear.com`

**Step 2d: Enable HTTPS enforcement**

Wait for GitHub to verify the DNS record (the Pages status changes from `building` to `built`), then:

```bash
curl -s -X PUT \
  -H "Authorization: token <PAT>" \
  -H "Accept: application/vnd.github+json" \
  https://api.github.com/repos/<owner>/<repo>/pages \
  -d '{"cname":"tracklinear.com","https_enforced":true}'
```

**Step 2e: Verify everything**

```bash
curl -s -H "Authorization: token <PAT>" \
  https://api.github.com/repos/<owner>/<repo>/pages \
  | python3 -c "import sys,json; d=json.load(sys.stdin); print(f'Status: {d.get(\"status\")}\\nCNAME: {d.get(\"cname\")}\\nHTTPS: {d.get(\"https_enforced\")}\\nURL: {d.get(\"html_url\")}')"

# Check live site
curl -sI https://tracklinear.com 2>&1 | head -4
# Expected: HTTP/2 200, server: GitHub.com

# Check www redirects to root
curl -sI https://www.tracklinear.com 2>&1 | head -4
# Expected: HTTP/2 301 → location: https://tracklinear.com/
```

> **Method B (Manual — GitHub UI):** Go to `https://github.com/<user>/<repo>/settings/pages`, enter `tracklinear.com` under **Custom domain**, click **Save**, check **Enforce HTTPS**. Less scriptable but works without a PAT.

### Troubleshooting GitHub Verification

| Symptom | Cause | Fix |
|---------|-------|-----|
| "Domain not configured" | DNS not propagated yet | Wait 5-15 min, then retry (CNAME propagation on Aliyun is usually fast) |
| "CNAME record not found" | Wrong record value | Check CNAME points to `<user>.github.io` (not the full repo path, no trailing dot) |
| GitHub Pages status stuck on `building` | Normal during HTTPS cert provisioning | Wait 30-60s and re-check. HTTPS cert generation takes 5-30 min. |
| DNS resolves but GitHub rejects | DNSSEC mismatch | If DNSSEC is enabled on Aliyun, ensure DS records match GitHub's Let's Encrypt setup (GitHub Pages doesn't support DNSSEC for all custom domains — disable DNSSEC if you hit this) |
| `curl -sI https://tracklinear.com` returns empty or error | HTTPS cert not yet issued | Normal! Wait 5-30 min. During this window, the site may return 404 or connection reset over HTTPS. HTTP (port 80) should still work. |

## Step 3: Verify Deployment

```bash
# Check DNS resolution
dig +short tracklinear.com
# Expected: <user>.github.io.

# Check HTTPS access
curl -sI https://tracklinear.com
# Expected: HTTP/2 200, server: GitHub.com

# Check the site loads with the correct content
curl -s https://tracklinear.com | head -5
```

## Step 4: Update Site URLs (SEO) — Bulk Replacement

After the custom domain is active, update all hardcoded GitHub Pages URLs in the repo. **Do NOT manually edit each file** — use sed-style bulk replacement across all HTML and XML files.

```bash
# Find all files containing the old github.io URL
cd <repo-directory>
grep -rl "https://<user>.github.io/<repo>" --include="*.html" --include="*.xml" .

# Bulk replace with the new domain
# Using a simple for loop with sed:
for f in $(grep -rl "https://<user>.github.io/<repo>" --include="*.html" --include="*.xml" .); do
  sed -i "s|https://<user>.github.io/<repo>|https://tracklinear.com|g" "$f"
done

# Or if using Python patch tool (when sed is unavailable or for multi-line safety):
# For each file: replace old URL string with new URL string, replace_all=true
```

Files typically affected:
- `index.html` — OG/Twitter Card URLs, canonical link, Organization/LocalBusiness Schema URLs
- `sitemap.xml` — all `<loc>` entries
- `blog/index.html` — blog card links, OG/Twitter Card URLs
- `blog-post-N.html` (all N) — canonical links, OG/Twitter Card URLs, Article Schema URLs
- `tracks/*.html`, `lights/*.html` — OG/Twitter Card URLs

**Critical — URLs to replace:**
- `https://<user>.github.io/<repo>/` → `https://tracklinear.com/`
- `https://<user>.github.io/<repo>/images/` → `https://tracklinear.com/images/` (if any absolute image URLs in OG/Twitter/JSON-LD)
- `https://<user>.github.io/<repo>/blog/` → `https://tracklinear.com/blog/` (if any absolute blog page URLs)

### Verification After Replacement

```bash
# Confirm no remaining github.io references
grep -rn '<user>.github.io' --include="*.html" --include="*.xml" .

# Should return zero results (exit code 1 with no output = success)
```

## Step 5: Google Search Console Update

After the domain switch, add the new domain (`https://tracklinear.com`) as a new property in Google Search Console. You'll need to verify ownership via TXT record in Aliyun DNS.

## Appendix: Aliyun Enterprise Email (免费企业邮箱) MX Records

After the GitHub Pages domain is set up, you may also need enterprise email for `@tracklinear.com` addresses.

### Pre-requisites

- Domain already registered and DNS is active (post-audit)
- Aliyun Free Enterprise Email already activated at `https://qiye.aliyun.com/`
- Admin account: `postmaster@tracklinear.com`

### Add MX Records (Same DNS Console)

In the same Aliyun DNS console (域名解析 → 添加记录), add two MX records:

| Type | Host Record | Value | Priority | TTL |
|------|-------------|-------|----------|-----|
| MX | `@` | `mx1.qiye.aliyun.com` | **10** | 600 |
| MX | `@` | `mx2.qiye.aliyun.com` | **20** | 600 |

> **How to find this page:** Aliyun Console → Domain & Website → Domain List → click domain → DNS Management → 域名解析 → 添加记录

### After Adding

1. MX records take **5-30 minutes** to propagate (TTL is 10 min)
2. During this window, the email admin panel (`https://qiye.aliyun.com/`) will show **"域名解析未完成"** or **"MX 未解析"** — this is normal
3. Wait 10-15 min, then refresh the admin panel. It should auto-detect the MX records
4. If it stays stuck, look for a **"检查域名解析"** (Check DNS) or **"刷新状态"** (Refresh) button in the admin panel

### Create Email Accounts

After MX records are verified:
- Go to **组织与用户 → 员工管理** or click **账号管理** on the dashboard
- Create accounts like: `tiffany@`, `info@`, `sales@`
- Free tier: up to 5 accounts, each with 5GB storage
- Login URL: `https://qiye.aliyun.com/`

### Troubleshooting

| Symptom | Likely Cause | Fix |
|---------|-------------|-----|
| "MX 未解析" after 30+ min | DNS propagation delay or NS mismatch | Check that domain NS servers point to `dns15.hichina.com` / `dns16.hichina.com` (Aliyun's default). If not, update at domain registrar. |
| "域名解析未完成" persistent | Aliyun's DNS check cache hasn't refreshed | Click any available refresh button, or wait up to 24h. The MX records will work even if the admin panel shows this banner. |
| Can't create accounts | Free tier limit reached | 5 accounts max. If you need more, upgrade to paid plan. |

## Known Pitfalls

- **DNSSEC breaks GitHub Pages**: If you enable DNSSEC in Aliyun, GitHub Pages custom domain HTTPS provisioning may fail. GitHub Pages doesn't natively support DNSSEC for custom domains. Leave it disabled unless you have a specific security requirement.
- **CNAME file conflict**: GitHub auto-creates a `CNAME` file in the repo root. If you already have one with a different value, the manual repo setup may conflict. Let GitHub manage it.
- **Wait for HTTPS provisioning**: After saving the custom domain, HTTPS takes 5-30 min to provision. The site will return 404 over HTTPS during this window. Don't panic — it's normal.
- **`.app` domain restriction**: If using a `.app` domain, HSTS requires HTTPS immediately. GitHub Pages handles this, but the DNS → HTTPS window may produce errors. `.com` domains don't have this issue.
- **Vercel vs GitHub Pages**: For this user, Vercel `.app` domains are blocked in China. GitHub Pages is preferred and works in China.
