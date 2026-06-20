# Cloudflare CDN Cache-Busting for tracklinear.com

## Problem

tracklinear.com uses Cloudflare proxied DNS. Even when GitHub Pages redeploys correct content, Cloudflare caches old HTML/CSS with `max-age=600` (10 minutes). The user sees stale content in their browser.

## Signal Detection

```bash
# 1. Compare GitHub Pages raw vs Cloudflare proxied
curl -sL "https://tiffanywoo2016-alt.github.io/magnetic-track-lighting-website/" | grep "your-new-class"
curl -s "https://tracklinear.com/" | grep "your-new-class"

# 2. Check cache age
curl -s -I "https://tracklinear.com/" | grep -i "last-modified\|age\|cf-cache"
```

## Fix Hierarchy

### Level 1: CSS-only changes → Rename the CSS file
Cloudflare caches by URL, not content hash. Renaming `styles.css` to `styles.v2.css` (new URL = new cache miss = fresh content).

```bash
cp styles.css styles.v2.css
# Update index.html: <link rel="stylesheet" href="styles.v2.css">
# Commit & push
```

### Level 2: HTML changes → Empty commit + hard refresh
```bash
git commit --allow-empty -m "force rebuild"
git push
# Wait 30-60s for GH Pages deploy + Cloudflare cache to respect origin last-modified
# Ask user to Cmd+Shift+R
```

### Level 3: Everything fails → Try all of:
1. Push empty commit
2. Wait 60s
3. Rename CSS if CSS changed
4. User does Cmd+Shift+R with DevTools "Disable cache" checked

## What DOESN'T Work

- `?v=N` query params — Cloudflare may strip or ignore them for HTML
- `Cache-Control: no-cache` header in curl — only bypasses browser cache, not intermediate CDN
- `styles.css?v=2` — Same file, different query string. Cloudflare often returns the cached version even with a different `?v=` value.

## NUCLEAR OPTION: Inline All Styles in `<style>` Tag

When ALL cache-busting fails and the user still sees old content (even in incognito mode), the most reliable fix is to **move ALL relevant CSS into the inline `<style>` block inside `index.html`**.

### Why this works
- GitHub Pages serves `index.html` as one atomic file — no external file to cache separately
- The CSS is delivered with the HTML, so there's no separate cache-key for Cloudflare to hold onto
- Even if Cloudflare caches the HTML, a new commit forces a fresh GitHub Pages build with a new `last-modified` timestamp

### Steps

```bash
# 1. Copy ALL new CSS rules into the inline <style> block
#    Open styles.css, find all rules for the new section
#    Open index.html, find </style> (closing tag before </head>)
#    Paste ALL new rules just before </style>

# 2. Delete the external CSS file reference or rename it (optional but clean):
#    <link rel="stylesheet" href="styles.v2.css"> → remove it entirely
#    Now ALL styling is in index.html

# 3. Verify the inline CSS is present on the live page:
curl -sL "https://tiffanywoo2016-alt.github.io/magnetic-track-lighting-website/" | sed -n '/<style>/,/<\/style>/p' | grep "your-new-class"

# 4. If the inline CSS is there on GH Pages, the user should see it
#    (No Cloudflare CSS cache to bypass)
```

### ⚠️ Critical: Also clean up OLD unused inline styles

When replacing a section (e.g., `.grid-system` → `.system-layout`), the old CSS classes may still be in the inline `<style>` block. They don't directly affect new HTML (different class names), but they bloat the page and can cause confusion during debugging.

```bash
# Search for old class names in inline <style> (on the live page):
curl -sL "https://tiffanywoo2016-alt.github.io/magnetic-track-lighting-website/" | sed -n '/<style>/,/<\/style>/p' | grep "grid-system\|card-grid\|card {"
# If found, delete those rules from the local index.html and redeploy
```

### When to reach for this option

Use the inline approach when ALL three conditions are met:
1. You've verified GH Pages has correct HTML (`curl` confirms new classes/content)
2. You've already tried CSS file rename + empty commit + user hard refresh
3. User still sees old content in incognito browser

This happened during the #system section deployment (June 2026): HTML was 100% correct on GitHub Pages for 3+ commits, but Cloudflare proxy kept serving old CSS to the user. Moving styles inline + a fresh commit fixed it immediately.

## Worst Case: Everything Fails

If ALL of the above fail and the user still sees OLD content in an **incognito/private browser window**:

### Diagnostic Checklist

| Check | Command | Indicates |
|-------|---------|-----------|
| GitHub Pages raw (bypasses Cloudflare) | `curl -sL "https://tiffanywoo2016-alt.github.io/magnetic-track-lighting-website/" \| grep "your-new-class"` | If **correct**: code is deployed, Cloudflare is the bottleneck |
| Cloudflare proxied | `curl -s "https://tracklinear.com/" \| grep "your-new-class"` | Compare with GH Pages result |
| Cache headers | `curl -s -I "https://tracklinear.com/" \| grep -i "last-modified\\|age\\|cache-control"` | `age: 0` = fresh, `age > 0` = cached |
| GH Pages raw CSS | `curl -sL "https://tiffanywoo2016-alt.github.io/magnetic-track-lighting-website/styles.v2.css" \| grep "your-new-class"` | If CSS is missing styles, the file was renamed but the old one's content is stale |
| Inline `<style>` block | `curl -s "https://tracklinear.com/" \| sed -n '/<style>/,/<\\/style>/p' \| grep "old-class-name"` | **Old inline styles may still be in HTML** — this is a common cause of stale-looking renders even though new HTML is deployed |

### The Real Fix (from painful experience)

When all standard cache-busting fails, the root cause is almost always one of:

1. **Old inline `<style>` block in `index.html`** — When you replace a section (e.g., `grid-system` → `system-layout`), the old section's CSS classes may still exist in the `<style>` tag inside `index.html` (not in external `styles.css`). The browser applies these old rules alongside new ones, creating visual chaos. **Fix**: Delete old unused CSS classes from the inline `<style>` block in `index.html`.

2. **Cloudflare edge cache is extremely sticky** — Some Cloudflare plans cache HTML very aggressively regardless of `last-modified` or `max-age`. The only reliable fix is to **wait** (~5-10 minutes) or change the HTML URL pattern (not just query params).

3. **User's ISP/router DNS cache** — Even with incognito mode, DNS entries may still point to a cached Cloudflare edge. Flush DNS on the user's side.

### Preemptive Prevention

For future deployments where old section HTML is being replaced:

1. **Search the inline `<style>` block for OLD class names** before deploying. If old HTML used `.grid-system`, `.card-grid`, `.card`, search for these in both `styles.css` AND the inline `<style>` in `index.html`.
2. **Delete old inline styles** — they serve no purpose after the old HTML is gone, and they can interfere with new styling.
3. **Rename CSS file** as the first step, not the last resort — it's the only guarantee against Cloudflare CSS caching.
