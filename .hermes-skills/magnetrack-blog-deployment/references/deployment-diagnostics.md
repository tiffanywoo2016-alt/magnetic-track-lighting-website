# Deployment Diagnostics Guide

## Quick Reference: "网站没有改过来" Diagnostic Tree

When the user reports that changes are NOT visible on the live site:

```
User: "网站没有改过来"
         │
         ▼
  1. Has the new commit been pushed to GitHub?
     ├── git log -1  → check if HEAD matches latest push
     │
     ▼
  2. Check GitHub Pages raw site (bypasses Cloudflare DNS)
     ├── curl -sL "https://tiffanywoo2016-alt.github.io/magnetic-track-lighting-website/"
     │   └── grep for your new class/element
     │
     ├── HTML IS CORRECT → go to step 3
     └── HTML IS STALE  → need to wait for GH Pages build (~15-60s)
         └── git commit --allow-empty -m "force rebuild" + git push
             └── wait 30s → re-check
     
  3. Check Cloudflare-proxied site
     ├── curl -s "https://tracklinear.com/" | grep "your-new-class"
     ├── curl -s -I "https://tracklinear.com/" | grep -i "last-modified|age"
     │
     ├── SAME AS GH PAGES → Cloudflare is fine, browser cache is the issue
     │   └── User: Cmd+Shift+R (hard refresh)
     │
     └── STALE (differs from GH Pages) → Cloudflare caching
         ├── CSS changed?  → rename CSS file (styles.v2.css → styles.v3.css)
         ├── HTML changed? → wait 60s + empty commit + user hard refresh
         └── Still stale?  → MOVE ALL STYLES INLINE (nuclear option)
```

## Cache-Busting Effectiveness Hierarchy

| Method | HTML | CSS | Reliability |
|--------|------|-----|-------------|
| `?v=N` query param | ❌ Cloudflare ignores | ✅ CSS file | LOW |
| Rename CSS file | N/A | ✅ | MEDIUM (CSS only) |
| Empty commit + wait | ⏳ Eventually | ⏳ Eventually | MEDIUM |
| **Inline CSS in `<style>`** | ✅ | ✅ (delivered with HTML) | **HIGHEST** |
| New commit with inline CSS | ✅ | ✅ | HIGHEST |

### Key Insight

The most effective strategy is: **Move new section CSS into the inline `<style>` block inside `index.html`**. This makes the entire section self-contained in one file. No external CSS dependency = no separate Cloudflare cache key.

## Common Pitfalls

### 1. Old inline CSS classes still present
When replacing an old section (e.g., `.grid-system` → `.system-layout`), the old CSS classes in the inline `<style>` may persist. They don't affect rendering (different class names), but they bloat the page and confuse debugging.

**Fix:** Always search for old class names before deploying:
```bash
grep "old-class-name" index.html | grep -v "new-class"
```

### 2. Image not loading (404)
New images added to `images/` directory may return 404 if:
- GitHub Pages build hasn't completed yet
- The image path in HTML is wrong (case-sensitive)
- The image wasn't committed

**Fix:** Verify with:
```bash
curl -sL -o /dev/null -w "%{http_code}" "https://tiffanywoo2016-alt.github.io/magnetic-track-lighting-website/images/new-image.webp"
```

### 3. "The image looks the same" after replacement
User says they replaced the image, but the page still shows the old one. Similar to CSS caching — Cloudflare may cache images too.

**Fix:** Rename the image file (e.g., `system-products.webp` → `system-products-v2.webp`) and update the HTML reference. Same cache-busting principle.

### 4. Image size mismatch — user's photo is portrait, section needs landscape
User supplies a portrait image (e.g., 1085×1450) for a left/right split section where the image area expects a landscape. The tall image makes the section look unbalanced — user says "不用像展板的图片那么长".

**Fix:** Crop the image to landscape ratio BEFORE deploying. Focus on the product area (middle 50-60% of the image), trim the title area and connector area:
```python
from PIL import Image
img = Image.open('input.jpg')
w, h = img.size
# Crop to middle 55% height, keeping full width
crop_top = int(h * 0.18)   # skip title area
crop_bottom = int(h * 0.72) # skip lower connector area  
cropped = img.crop((0, crop_top, w, crop_bottom))
# Resize to standard display width
target_w = 1200
ratio = target_w / cropped.width
new_h = int(cropped.height * ratio)
resized = cropped.resize((target_w, new_h), Image.LANCZOS)
resized.save('output.webp', 'WEBP', quality=88)
```
Update the `<img>` width/height attributes in HTML to match the new dimensions.

### 5. Cloudflare caches the committed image by URL even after file content changes
This happened in the 2026-06-19 session: after cropping the image (same filename `20series-system.webp`), the user still saw the old uncropped version in both incognito and regular browser. The file was correct on the server, but Cloudflare served its cached version.

**Fix:** Rename the file (e.g., `20series-system.webp` → a completely new name) to create a new Cloudflare cache key. File content change under the same URL is NOT sufficient for Cloudflare — it uses URL as cache key.

### 6. "The image still looks the same" — use `file` command on user screenshots to detect version
When the user sends a screenshot saying the image hasn't changed, check the image dimensions:
```bash
file /path/to/user/screenshot.jpg
```
- If dimensions match the OLD image (e.g., 1672×941 for `image_2.webp`), they're still seeing the old version
- If dimensions match the NEW cropped image (e.g., 1200×865), they may be looking at the wrong section
This is faster than waiting for vision_analyze credits and more reliable than OCR for image identification.

### 4. User sees old content even after inline CSS deployment
This happened in the June 19, 2026 session: after moving ALL system CSS inline into `<style>`, the user still reported "没有改过来" in an incognito window.

**Root cause analysis:** The inline CSS was 100% correct on both GitHub Pages raw (`curl`) and Cloudflare proxied (`curl`), but the user still saw the old 4-card layout. 

**Possible causes:**
- GitHub Pages build queue delay (15-30s delay between push and deploy is normal)
- The user's incognito window was opened BEFORE the new commit finished deploying
- The user was looking at the WRONG section (#process 4-step cards that were still visible) rather than scrolling further down to #system

**Diagnosis steps:**
1. Compare local HTML content of the section vs live: `curl -sL "URL" | sed -n '/id="section"/,/id="next-section"/p'` 
2. Verify inline style rules exist: `curl -sL "URL" | sed -n '/<style>/,/<\/style>/p' | grep "new-class-name"`
3. Check ALL section IDs in order on the live page: `curl -sL "URL" | grep -oP 'id="[^"]*"'`
4. Compare offline rendering vs expected: download the page and use tesseract on screenshots to confirm what the user sees vs what's expected

**Lesson written:** When the user says "内容没有改过来" and ALL server-side checks pass, ask them explicitly:
- "你看到的是旧的内容（白色卡片带图标那种），还是没有看到这个 section？"
- "你往下翻了吗？它在 #why section 后面"
- Send a screenshot to let OCR/vision confirm what's actually rendering

## User Communication Template

When the user says "网站没有改过来" and you've verified the code is correct:

> "代码已经部署到服务器上了。问题出在 CDN 缓存。我已经做了强制刷新，现在你可以试试 **Cmd+Shift+R**（Mac）或 **Ctrl+Shift+R**（Win）硬刷新页面看看。"

If the user still sees stale content after hard refresh:

> "我做了更彻底的缓存清除 — 把 CSS 样式直接写进 HTML 文件里，不依赖任何外部 CSS。现在再硬刷新一次应该能看到。"
