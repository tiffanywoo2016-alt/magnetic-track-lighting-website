---
name: magnetrack-blog-deployment
description: "End-to-end blog publishing workflow for MAGNETRACK magnetic track lighting website — from content creation to GitHub Pages deployment and verification."
version: 1.0.0
author: Hermes Agent
metadata:
  hermes:
    tags: [MAGNETRACK, Blog, GitHub-Pages, Deployment, SEO, B2B]
    related_skills: [github-pr-workflow, github-repo-management]
---

# MAGNETRACK Blog Deployment Workflow

End-to-end workflow for publishing a blog post on the MAGNETRACK website (`magnetic-track-lighting-website` repo), deployed to GitHub Pages.

## Site Ownership & Content Strategy Context (CRITICAL)

**This website is the user's PERSONAL ASSET.** It is NOT associated with Grandlec/晨曦/RAYS LIGHTING/Henglun. The user is building this as an independent project to establish her own brand (MAGNETRACK) and personal expertise in magnetic track lighting.

### What this means for content decisions:
- ❌ Do NOT mention Grandlec, 晨曦, RAYS LIGHTING, Henglun, or any factory name in any content
- ❌ Do NOT write "our factory in Foshan" or "13 years of experience" — that belongs to the user's company, not her personal brand
- ❌ Do NOT reference factory certifications, MOQ, or production capacity as "our capabilities"
- ✅ **Trust must be built through expertise** — Blog articles, technical knowledge, well-written content
- ✅ **Leverage the Blog as the primary trust signal** — 6+ articles of professional-grade content is stronger than any factory claim for a personal brand
- ✅ The user can still respond to inquiries with real product info — the website just needs to attract and qualify leads
- ✅ FAQ questions about MOQ/certifications/samples should use neutral phrasing that doesn't claim factory ownership

### SEO/GEO strategy implication:
- Without factory/certification/company pages, rely on:
  - Topic Cluster (Blog content covering the full buyer decision journey)
  - FAQ Schema (B2B-oriented questions)
  - EEAT signals through Blog authorship consistency
  - Structured data (Product/Brand/AggregateRating) — these don't require company verification
  
### Homepage AIDA Restructure (for B2B personal brand sites)
When the user asks to restructure the homepage or evaluates it, apply AIDA framework (Attention → Interest → Desire → Action). The implemented 10-section structure is documented in `references/b2b-homepage-aida.md`. Key differences from product-catalog style:
- Hero: pain-driven headline + trust badge in eyebrow
- Stats: trust metrics (years/SKUs/certs/response time) NOT product categories
- Why MAGNETRACK: 6-card trust grid (factory-direct, CE, system matching, OEM/ODM, export, spec support)
- User prefers CARD GRID over tables for summaries — use card grids by default
- NO annual revenue display — use 13+ years + CE/RoHS + 30+ countries instead
- AI-generated images as placeholder — user has no real factory/product photos yet

### Homepage Section Evolution (Session Log: 2026-06-19)
The homepage AIDA flow has evolved iteratively. Current order (as of 2026-06-19):
**#hero → #why → #system → #installation → #modules → #applications → #blog-preview → #faq → #oem → #contact**

**Removed sections:**
- ~~#process~~ (How It Works 4-step cards) — **deleted 2026-06-19**. User explicitly asked to remove it because #system already covers the "complete system" message. The 4-step workflow (Share Details → Choose Track → Match Modules → Receive Quotation) was redundant with system messaging.

**Lesson:** When a new section (e.g., #system) replaces the conceptual territory of an earlier section (e.g., #process), consider whether the earlier section is now redundant. The user will tell you to remove it. Don't wait.

**System section evolution:**
- Initially: `.grid-system` (left image + 4 card-grid items)
- Rewritten to: `.system-layout` (left image + right 4 compact numbered items)
- Uses inline CSS in `<style>` (not external `.css` file) to avoid Cloudflare cache issues
- Left image: user-provided "20 Series" product composition photo

| Item | Value |
|------|-------|
| Repo | `tiffanywoo2016-alt/magnetic-track-lighting-website` |
| Local path | `~/Repos/magnetic-track-lighting-website/` |
| Live URL | `https://tracklinear.com/` |
| Vercl URL | `https://magnetrack-vercel.vercel.app/` (`.app` domain blocked in China) |
| Images dir | `images/` |
| Blog index | `blog/index.html` |
| Sitemap | `sitemap.xml` |

## Pre-Flight Checklist

Before starting, verify:

1. ✅ HTML file exists (e.g., `blog-post-N.html`) with correct Article Schema JSON-LD
2. ✅ Hero image ready (1920×1080 or 1536×1024 recommended)
3. In-article images/illustrations ready — aim for 2-3 images per post, but **user is fine with fewer if image quality is poor**. Skip bad images rather than forcing them.
4. ✅ Blog index card content prepared (title, date, excerpt, tag, image alt text)
5. ✅ Git working directory is clean (`git status --short`)
6. ✅ **Open summary table decided**: Project/Before/After/Result table design agreed with user before writing

## B2B Writing Workflow (for this user) ⚡

**CRITICAL: Do NOT try to deliver a perfect first draft.** Follow this iterative sequence:

### Phase 0: MARKDOWN FIRST (est. 2026-06-17)
**Before writing any HTML, ALWAYS show the user a plain Markdown version first.**

1. Write the article in pure Markdown — no HTML, no CSS, no image tags
2. Include: title, tag, approximate word count, section headings, and key bullet points for each section
3. State image requirements at the bottom as a simple list
4. Send to user for review
5. **Wait for user to say "可以" before proceeding to HTML**

Rationale: Writing full HTML + deploying costs API calls + deploys. Content-first review in Markdown catches structural/angle issues with zero deployment cost. This user typically needs 2-3 rounds of content adjustment.

### Phase 1: Outline only
1. Propose topic + article structure (headline, sections, key points)
2. **DO NOT include image prompts** in the outline
3. User adjusts the structure
4. User says "内容可以" → move to Phase 2

**Pitfall: "只写商业用途会不会不太好?"** — When proposing a topic, if you narrow it to one segment (e.g. "commercial projects only"), the user may push back because B2B readers include designers doing residential, contractors doing mixed-use, and wholesalers serving all segments. Cover multiple scenarios (commercial + residential + industrial) in the same article. The title should not contain "Commercial" unless user explicitly agrees. Prefer "for Your Project" over "for Commercial Projects."

### Phase 2: Write HTML (no deploy yet)
1. Write the full article HTML (~600-800 words max)
2. **⚠️ LANGUAGE CHECK:** When converting from Markdown to HTML, the Markdown draft may contain Chinese notes/instructions. Make sure to strip ALL Chinese and write only in English for the final HTML. Verify with `python3 -c "import re; cjk=re.findall(r'[\u4e00-\u9fff]+', open('blog-post-N.html').read()); print(f'{len(cjk)} Chinese strings found' if cjk else 'No Chinese')"`
3. **MANDATORY: Before showing to user, run the SEO/GEO/AIO self-check checklist below and fix any failures FIRST**
4. Show the HTML content to user as Markdown preview — do NOT deploy
4. **Important:** Not all magnetic track modules have built-in drivers. Low/mid-end modules connect LED chip directly to 48V via a simple resistor — only high-end/premium modules integrate an internal driver. Check with user on technical accuracy before finalizing any article about drivers/components.
5. Use "everyday analogy" explanations (water pipe/faucet, instant heater vs central system) instead of circuit theory. This user's audience is designers and procurement — they buy based on project value, not electrical engineering.
6. Include minimal image placeholders (or table-only if user prefers)
7. User reviews content → adjust → user says "可以" → deploy
8. **Deploy ONLY after user confirms content is final**

### Phase 2a: FAQ Section Recommendation

For comparison-style articles (product A vs product B), proactively recommend adding an FAQ section at the end. This is valuable for:
- Covering long-tail search queries
- Adding FAQPage Schema for Google rich results
- Answering common buyer objections

**FAQ structure (user-approved):**
```html
<h2>FAQ: Traditional Track Lighting vs Magnetic Track Lighting</h2>

<div class="faq-item">
  <div class="faq-q">Is magnetic track lighting better than traditional track lighting?</div>
  <div class="faq-a">Not always. Magnetic track lighting is better for retail, hotels, villas and design-focused interiors. Traditional track lighting is still better for warehouses, workshops and high-output areas.</div>
</div>
```

**FAQ title format (SEO-optimized — confirmed 2026-06-18):**
- Use `FAQ: {Topic A} vs {Topic B}` format for comparison articles
- Example: `FAQ: Traditional Track Lighting vs Magnetic Track Lighting`
- Do NOT use "Quick FAQ" or other shortened versions — the full "vs" format captures more long-tail search queries
- Include FAQPage Schema in JSON-LD (see below)

**FAQPage Schema must be added to JSON-LD alongside Article + BreadcrumbList:**
```json
{
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Question text here?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Answer text here."
      }
    }
  ]
}
```

**CTA pattern (user-approved for comparison articles):**
```
If you are a distributor, contractor or lighting project buyer, send us your ceiling type, project area and preferred installation method. We can help match the track, light modules, drivers and accessories as one complete system.
```

This CTA is more specific than generic "Contact us" — it tells the reader EXACTLY what information to provide, increasing conversion likelihood.

### Image Alt Tag Standard (SEO/GEO/AIO — User Mandated 2026-06-17)

Every blog image MUST have an alt tag written to SEO/GEO/AIO standard. This is a user-mandated rule — they will NOT remind you.

**Format:** Natural-language descriptive sentence. NOT a keyword phrase or headline.

**Rules:**
- Include core keywords (product type, voltage, application context)
- Describe what the SPECIFIC image shows (not what the article is about)
- Each image on a page must have a UNIQUE alt
- Readable as a complete sentence

**Examples (user-approved):**
- ✅ `alt="Traditional 240V track lighting vs 48V magnetic track lighting ceiling comparison"`
- ✅ `alt="48V magnetic track lighting system with spot light, linear flood and pendant modules in hotel or villa interior"`

**Do NOT use:**
- ❌ Short headline-style: `alt="Dynamic Light Modules"` or `alt="Track Comparison"`
- ❌ Keyword-stuffed: `alt="magnetic track lighting 48V track lighting track comparison track vs magnetic"`
- ❌ Generic: `alt="Blog header image"` or `alt="Lighting scene"`

## MANDATORY: SEO/GEO/AIO Self-Check Checklist

**Before any blog post goes live, EVERY item below must PASS. Failures are not negotiable — fix before deploy.**

### SEO — Technical
- [ ] `lang="en"` on `<html>` tag
- [ ] Single `<h1>` per page
- [ ] `<meta name="description">` — under 160 characters, includes target keyword
- [ ] `<link rel="canonical" href="https://tracklinear.com/blog-post-N.html">`
- [ ] Theme color: `<meta name="theme-color">`
- [ ] dns-prefetch + preconnect for Google Fonts
- [ ] All images have **unique, natural-language, SEO/GEO/AIO-compliant** `alt` attribute (see Image Alt Tag Standard above)
- [ ] No broken links or `href="#"` traps

### SEO — Social (OG + Twitter Card)
- [ ] `og:title` — matches article title
- [ ] `og:description` — under 160 chars, matches meta description
- [ ] `og:url` — absolute URL to this blog post
- [ ] `og:image` — absolute URL to hero image
- [ ] `og:site_name` — "Tracklinear Lighting"
- [ ] `twitter:card` — "summary_large_image"
- [ ] `twitter:title` — matches article title
- [ ] `twitter:image` — absolute URL to hero image

### SEO — Structured Data (JSON-LD)
- [ ] `@type: "Article"` with headline, description, image, datePublished, dateModified
- [ ] `author: { @type: "Person", name: "Tiffany Woo" }`
- [ ] `publisher: { @type: "Organization", name: "Tracklinear Lighting" }`
- [ ] `mainEntityOfPage` pointing to canonical URL
- [ ] `@type: "BreadcrumbList"` with 3 items (Home → Blog → Article)

### SEO — Internal Links & Navigation
- [ ] Visual breadcrumb navigation on page
- [ ] "← Back to Blog" link pointing to `blog/index.html`
- [ ] Related Articles section at bottom with 2+ internal links to other blog posts
- [ ] CTA with `mailto:info@tracklinear.com`
- [ ] Blog index card updated (blog/index.html) with BlogPosting schema + publish date
- [ ] Sitemap updated with new URL + lastmod date

### GEO — Google SGE / AI Overview Ready
- [ ] Article opens with a clear question or problem statement (AI summary bait)
- [ ] **Quick Answer summary box present** — dark-themed `<div class="quick-answer">` after customer question, before detailed breakdown (for comparison/decision articles)
- [ ] Uses clear section headers (`<h2>`) that AI can extract as bullet points
- [ ] **H2 headings naturally embed long-tail keywords** (e.g., "Magnetic Track Lighting for Retail, Showroom and Hotel Projects" not just "Scenario 1: Retail"). Two approaches work: colon-pattern (`{keyword}: {promise}`) and sentence-phrase (`{Keyword} for {Context}`). Both are user-approved. See `references/h2-keyword-embedding-guide.md`.
- [ ] **Body text naturally embeds 5+ long-tail keywords** — not stuffed, but written in natural phrases that match what buyers Google. See `references/h2-keyword-embedding-guide.md` for the full methodology of body-text keyword integration.
- [ ] Comparison tables or structured lists where appropriate (AI loves these)
- [ ] FAQ-style opening: "One of the most common questions we hear..."
- [ ] Natural Q&A flow rather than pure narrative

### AIO — AI Crawler / Chatbot Optimization
- [ ] Title is a natural question someone would type into ChatGPT or Google
- [ ] First paragraph directly answers the title question (no fluff intro)
- [ ] Key distinctions explained in 2-column comparison format (AI extractable)
- [ ] Uses bold for key terms
- [ ] Content is self-contained — reader doesn't need to click elsewhere to understand

### Blog Index Card Requirements
- [ ] `<article itemscope itemtype="https://schema.org/BlogPosting">`
- [ ] `itemprop="headline"` — matches article title
- [ ] `itemprop="datePublished"` — ISO date
- [ ] `itemprop="author"` — "Tiffany Woo"
- [ ] `itemprop="image"` — hero image URL
- [ ] Visible date in `.blog-card-date`
- [ ] Descriptive alt on card image
- [ ] Card excerpt (`itemprop="description"`) — under 160 chars

## Phase 3: Update Blog Index & Verify

**After creating a new blog post HTML file, you MUST:**

1. ✅ Create `blog-post-N.html`
2. ✅ Add the card to `blog/index.html` (article block + Schema JSON-LD entry)
3. ✅ Add the URL to `sitemap.xml`
4. ✅ Verify: grep blog/index.html for the new post title — if missing, fix AND check why the previous post's index update was missed

**CRITICAL: `blog/index.html` is the source of truth for how many blog posts exist.** If it's not updated, the user will see a discrepancy between file count and visible posts. The assistant may also infer wrong count from session search alone.

**Workflow fix (est. 2026-06-19):** When starting a new blog post, first check:
```bash
# Count actual HTML files
ls blog-post-*.html | wc -l

# Count entries in blog/index.html card grid
grep -c 'itemprop="headline"' blog/index.html
```
If these numbers differ, blog/index.html is out of date. Fix it before creating the new post.

**Pitfall: Session search can lie about blog count.** Session search only retrieves sessions that mention blog posts — if a blog was created in a session whose summary didn't contain the right keywords, it won't show up. The actual file count on disk is the source of truth, NOT the number of session records found. Always use `ls blog-post-*.html | wc -l` to get the real count.

### Image iteration
1. User says **"图片指令"** explicitly → only then provide prompts
2. Provide **ONE image prompt at a time** — user generates, sends back, you insert and deploy
3. Wait for user to ask for the next one before giving it
4. Do NOT dump all prompts at once
1. **If a generated image doesn't look good** — user will try once or skip it entirely. Do NOT insist on re-generating. Just remove the placeholder `<img>` tag from the HTML and deploy without it. The user prefers clean article with fewer images over a forced bad image.
1. **PREFER TABLES OVER IMAGES for comparison content.** When you propose a comparison image (e.g. "Without Driver vs With Driver"), the user will likely say "I don't need an image, use a table instead." Proactively offer: "I can make this a comparison table if you prefer." If user declines the image, convert the comparison data into an HTML `<table>` with two tinted columns (amber for negative, green for positive).

### Image Insertion Workflow (User-Supplied Images)

When the user says "图片指令" and later sends actual images, follow this sequence:

1. **Analyze each image** — Use OCR (`tesseract`) to detect any text labels. Use PIL to get dimensions, brightness, edge density. This helps identify which image goes where (e.g., text "Standard Recessed Trimless" = trimless comparison section).

2. **Assign to article sections** — Map each image to the section its content matches:
   - Dark/low-brightness → hero/banner image
   - Text annotation visible → technical comparison/reference (e.g., three installation methods side by side)
   - Product scene → relevant product section (Surface-Mounted, Recessed, etc.)

3. **Compress immediately** — Convert all to WebP quality 85:
   ```bash
   python3 -c "from PIL import Image; Image.open('input.jpg').save('output.webp', 'webp', quality=85)"
   ```
   Check file size: `ls -lh images/blog9_*.webp` (target: 100-150KB per image)

4. **Insert into HTML** — Place each `<img>` tag at the correct position in the article:
   - Hero image → after `<div class="meta">`, before opening paragraph
   - Section images → after the last paragraph of that section, before the next H2
   - Technical comparison → before the comparison table

5. **Update ALL references** — Not just the blog HTML:
   - OG/Twitter card meta tags (absolute URLs)
   - JSON-LD Article schema `"image"`
   - Blog index card (`blog/index.html` — both `<img>` and Schema)
   - Blog index Schema JSON-LD entry

6. **Write unique SEO/GEO/AIO alt tags** — Each alt must:
   - Be a natural-language sentence describing the SPECIFIC image
   - Include relevant keywords (product type, installation method, context)
   - Be UNIQUE across all images on the page
   - Be readable as a complete sentence

7. **Verify after deploy** — `curl -sI https://tracklinear.com/images/blog9_*.webp | grep HTTP` should return 200.

### Post-Migration: Google Search Console Setup for Custom Domain

After migrating from `tiffanywoo2016-alt.github.io` to a custom domain (`tracklinear.com`), Google will lose all prior indexing. The domain migration requires proper GSC setup.

### Domain Verification (DNS TXT Record)

The custom domain's DNS is hosted on **Alibaba Cloud (阿里云/万网)** with DNS servers `dns15.hichina.com` / `dns16.hichina.com`.

**Verification steps:**
1. Search Console → Add Property → **Domain** type → enter `tracklinear.com`
2. Google provides a TXT value: `google-site-verification=xxxxxxxx...`
3. Go to **阿里云控制台 → 域名 → DNS解析** for `tracklinear.com`
4. Add TXT record:
   | Type | Host | Value | TTL |
   |------|------|-------|-----|
   | TXT | `@` | `google-site-verification=KNu4TuP-...` | 600 |
5. Wait 5-10 minutes for DNS propagation (`dig TXT tracklinear.com @8.8.8.8 +short` to verify)
6. Back in GSC → click Verify

### ⚠️ Sitemap Submission: Domain vs URL Prefix Property

**After domain verification passes, submitting sitemap under a Domain property may fail** with "站点地图地址无效" even if `sitemap.xml` is valid and returns HTTP 200. This is a known GSC limitation — Domain properties have inconsistent sitemap submission behavior.

**Solutions (try in order):**

1. **Try the full absolute URL** — Even though Domain property normally expects a relative path, input `https://tracklinear.com/sitemap.xml` (the complete URL). This worked for this user when relative paths failed.

2. **Try the relative path** — Input `sitemap.xml` or `/sitemap.xml` in the sitemap field. If these fail, use option 1 above.

3. **Add a URL Prefix property** — Add a second property:
   - Search Console → Add Property → **URL prefix**
   - Enter: `https://tracklinear.com`
   - Verification: choose **HTML file** method — Google provides a verification HTML filename (e.g., `googlexxxxxxxx.html`)
   - Create the file at repo root: `touch googlexxxxxxxx.html` — add the meta tag content Google provides
   - Deploy to GitHub Pages
   - Verify → then submit sitemap from the URL prefix property

4. **Alternative: submit sitemap via robots.txt** — Already done if:
   ```
   Sitemap: https://tracklinear.com/sitemap.xml
   ```
   is in `robots.txt`. Google will discover the sitemap from there independently of the manual submission.

**Ref:** `references/google-search-console-setup.md` for full reference.

### Robots.txt Post-Domain Migration Fix

After switching from `tiffanywoo2016-alt.github.io` to `tracklinear.com`, the robots.txt Sitemap directive must be updated:

```diff
- Sitemap: https://tiffanywoo2016-alt.github.io/magnetic-track-lighting-website/sitemap.xml
+ Sitemap: https://tracklinear.com/sitemap.xml
```

**Cloudflare cache issue:** After editing robots.txt, Cloudflare may serve the stale version. Verify with:
```bash
curl -s https://tracklinear.com/robots.txt
```
If still showing old Sitemap URL, force a GitHub Pages rebuild with an empty commit:
```bash
git commit --allow-empty -m "force rebuild: trigger GitHub Pages redeploy"
git push origin main
```
Then wait 60s and re-check.

### Sitemap Lastmod Refresh for Domain Migration

When migrating domains, update ALL `lastmod` dates in sitemap.xml to the current date. This signals to Google that content has been updated/fresh, triggering a re-crawl on the new domain.

## Phase 4: Layout polish
1. User may then ask for table conversion, layout changes, etc.
2. Apply changes one at a time, deploy after each
3. Final cleanup commit

> **Rationale:** This user reviews iteratively and corrects direction mid-flight. A full first-draft attempt with all content + images + layout inevitably gets 50% rewritten. The phased approach reduces wasted work by ~60%.

### Opening Pattern Variety (est. 2026-06-20)

**Problem:** The user noticed that Blog 6, 7, 8 and the proposed Blog 9 all used "a customer/person encountered a problem" story openings. By Blog 9, the pattern felt repetitive. The user explicitly asked: "你会觉得审美疲劳吗？"

**Solution — rotate among these opening patterns for consecutive articles (do not repeat the same pattern twice in a row):**

| Pattern | Example | Best for |
|---------|---------|----------|
| **Data/statistic hook** | "Choosing the wrong installation method can add 30% to your project cost..." | Comparison/decision articles |
| **Customer question** | "A Turkish wholesaler contacted us this week..." | Technical explanation |
| **Factory visit story** | A real customer walking through the production line | E-E-A-T Experience injection |
| **Trend/observation** | "We are seeing more projects specify trimless..." | Trend/design articles |
| **Direct problem statement** | "Most buyers choose the wrong track voltage because..." | Educational/guide articles |
| **FAQ-style question** | "If the track already has 48V power, why does the module still need a driver?" | Counter-intuitive technical topics |

**Rule:** Check the last 2-3 published articles before choosing an opening pattern. If the last 2 used the same pattern, force a different one. The user WILL notice repetition.

### FAQ Quality Standard (CRITICAL — est. 2026-06-20)

All FAQ questions must pass the **B2B Buyer Test**:

- ✅ Questions an **importer, contractor, lighting designer, or project manager** would genuinely ask before making a purchasing or specification decision
- ✅ Questions about **cost, compatibility, installation feasibility, supply chain, specification flexibility**
- ❌ Do NOT write C-end/consumer questions: "Is it safe?" "Can I install it myself?" "Does it need a special bulb?"
- ❌ Do NOT write generic filler questions just to fill space

**Test:** Read each FAQ question aloud. If it sounds like something an end consumer would Google, rewrite it from a B2B buyer's perspective.

**Good B2B FAQ examples:**
- "Does surface-mounted track lighting work on a concrete ceiling with no drop ceiling?"
- "Which installation method has the lowest labor and material cost?"
- "Can the same track profile be used for recessed, trimless and surface installation?"
- "For a hotel project with multiple ceiling types, can we mix surface and recessed in different zones?"

**Poor C-end FAQ examples:**
- "Is surface-mounted track lighting safe?"
- "Can I add magnetic track lighting after the ceiling is finished?"
- "What is the difference between recessed and trimless track lighting?"

### Content Direction Signal (CRITICAL PITFALL)
- When the user says "文章有问题" or corrects the core angle of an article, **apply the correction DIRECTLY** — don't argue or explain why you wrote it the first way.
- This user's Blog 7 correction: wrote about "why prices differ per module" → user wanted "built-in driver vs no driver comparison" specifically. **The user knows their audience better than you do.** When they redirect, rewrite immediately with the new angle.
- Signal trigger: if user says "主要讲X" or "文章应该讲Y", that is the new North Star. Drop all existing framing and refocus the entire article around that specific comparison.
- **When user says "我觉得后半部分写得不好" + gives specific framing feedback** — DO NOT push back. Accept the framing change, apply it directly, and deploy the fix. The user has clearer sense of how their audience thinks and what framing resonates.

### E-E-A-T Experience Injection Pattern (est. 2026-06-17)

When upgrading a purely educational/technical blog post with Google E-E-A-T Experience signals, use the **real customer visit story** pattern.

#### Workflow: Story Collection (agent proposes structure, user supplies facts)

1. **Propose the story structure** — ask "I can open with a story about this client visit. The facts I need from you: where did they see the product, what did you explain, what did they ask?" Do NOT write a story without first confirming the facts with the user.
2. **Expect 3-4 fact-correction rounds** — every session, the user will refine: time ("last week" not "last month"), customer type ("importer" not "distributor"), context ("production line where workers were assembling modules" not "demo track"), and trigger ("we explained this module has built-in driver for better stability" not "they noticed the difference"). This is normal. Each correction makes the story more accurate.
3. **The production line context** — the most common scenario is: customer walking through the production line, seeing workers assembling modules, we explained the built-in driver feature, customer asked why it's needed. This precise chain of events is what actually happened.
4. **Let the user write the opening lines** — when the user says "write it like this" and provides the exact text, USE THEIR WORDS. They know exactly what they said to the client. Your job is to integrate their text into the article, not rewrite it in your voice.
5. **Only after user confirms all facts correct** — write the final version and deploy.

#### Narrative Rules

1. **Anchor the story in a real event** — customer came to factory, saw production line/assembly/demo track, asked a real question
2. **Stick strictly to fact-only narrative** — NEVER embellish. Include ONLY what actually happened:
   - ✅ "He saw our workers assembling modules with built-in drivers. We explained that our modules come with integrated drivers for better stability. He stopped and asked..."
   - ❌ NEVER fabricate test bench demos, side-by-side comparisons, or on-the-spot orders
   - ❌ NEVER create dialogue that didn't happen
   - ❌ NEVER add sensory details (temperature readings, flicker visibility tests) that weren't demonstrated
3. **Customer identity precision** — use the exact term the user used:
   - "Importer from Russia" (not "distributor" unless the user said it)
   - "Our factory" (not "Foshan factory" unless user explicitly names the location)
4. **Keep the technical core unchanged** — the H2 structure, comparison tables, and technical explanations stay. Only the framing/intro changes to inject Experience.
5. **CTA shift** — after an Experience-anchored article, CTA naturally becomes "visit our factory / contact us for spec comparison" rather than "send us your floor plans"

#### Pitfall: when user sends the article TO THE CLIENT in the story
- The client in the story will READ the article. This means ZERO artistic license is allowed.
- Every detail must be verifiable by the client. If you wrote something that didn't happen, the client will notice and trust is broken.
- **When user says "我把这篇文章发给这个客户看了"** — this raises the accuracy bar to 100%. Remove any inference or embellishment immediately.

#### Variation: Customer story as opener (client NOT a reader)

When using a real customer's question as the article opener but the customer **will not read the article** (e.g., the customer is a different type or the story is used as a framing device):

- You have more flexibility in phrasing, but still: **do NOT fabricate** dialogue or events that didn't happen
- The customer company name and context (e.g., "A Turkish wholesaler supplying mid-to-high-end renovation projects") can be used directly
- Use temporal variation: if the previous article used "last week," use "this week" or "recently" for the next one. User explicitly flagged that repeating "last week" across consecutive articles feels inauthentic.
- The CTA should match the story's implication: a wholesaler asking about selection → CTA is "contact us for a spec recommendation" not "visit our factory"

#### Time reference variability (est. 2026-06-18)

When multiple consecutive blog posts use customer-visit stories as openers:
- ❌ Do NOT use the same time reference ("last week") in back-to-back posts
- ✅ Vary: "last week" → "this week" → "a few days ago" → "recently"
- The user noticed Blog 7 and Blog 8 both starting with temporal references and flagged this. Each article should feel temporally distinct.

### Technical Accuracy: Built-in Driver vs No-Driver Modules (CRITICAL PITFALL)
- **DO NOT fabricate installation differences.** Whether a module has a built-in driver or not, the physical installation is identical — both are: track + power supply + module. No external driver boxes, no extra wiring, no different labor cost.
- **DO NOT write about "external driver boxes required"** for modules without built-in drivers. This is incorrect for magnetic track systems — the module clips into the same track regardless of whether it has an internal driver.
### Content Framing: Customer Market Position (est. 2026-06-17)

When writing any article about product choice (built-in driver vs no driver, premium vs budget, different module types), always frame the decision as:

> The choice comes down to **your customer's market position and budget**, not the project type.

Project types (hotels, retail, warehouses) can each have premium OR budget customers. The decision is about the customer's market positioning, not the building type.

- **Premium segment** customers → built-in driver / higher-spec modules
- **Cost-sensitive** customers → no-driver / simpler modules
- **Physical installation is identical** — same track, same snap-on, same wiring. The difference is internal electronics.
- **One supplier can offer both** — two price tiers, one track system.

This is a user-validated correction. Do NOT write "for hotels/retail/offices use X" — instead write "if your customer targets the premium segment..."
- **Quick Tip / Cost Calculation sections about external hardware are WRONG.** If you're writing a comparison between built-in driver and no-driver modules, there is no external hardware cost difference. The only difference is the module's internal electronics and its impact on dimming, flicker, brightness consistency, and reliability.
- **Correct power supply vs driver analogy:** Think of the system as two separate stages. Stage 1 = Track Power Supply (converts mains to 48V DC, provides stable voltage). Stage 2 = Built-in Driver (regulates current for LED chips). LED chips are sensitive to current, not just voltage. The power supply and driver do different jobs — they work together.
- **Question-driven format works best for this user's audience.** The user validated that starting with a FAQ-style question ("If the track already has 48V power, why does the module still need a driver?") and answering it clearly resonates better with distributors and contractors than a general comparison article.

## Step 1: Copy Images to Repo

```bash
# Copy from cache or source to repo/images/
cp /path/to/source/hero_image.jpg ~/Repos/magnetic-track-lighting-website/images/blog_header_N.jpg
cp /path/to/source/detail_image.jpg ~/Repos/magnetic-track-lighting-website/images/blog_N_system.jpg
```

**Naming convention:**
- Hero: `blog_header_N.jpg` (or `.png`)
- In-article: `blog_N_system.jpg` (or other descriptive name)

**Image sizing** (from memory):
- Hero/Banner: 1920×1080
- System/detail: 1200×900
- Blog card thumbnails: 800×450

## MANDATORY: Image Compression

Every image uploaded to the repo MUST be compressed first. Raw images are too large and slow down page load.

**REALITY:** This server has `python3` with `PIL` available. `cwebp` and `mogrify` are NOT installed. Always use the Python PIL method. A 966KB JPG compresses to ~145KB WebP at quality 85 (~85% reduction).

### Method to use: Python PIL WebP conversion
```python
from PIL import Image
img = Image.open('input.jpg')
img.save('output.webp', 'webp', quality=85)
```

### Step-by-step for a new image:
```bash
# 1. Check original size
ls -lh images/new_image.jpg

# 2. Convert to WebP
python3 -c "from PIL import Image; Image.open('images/new_image.jpg').save('images/new_image.webp', 'webp', quality=85)"

# 3. Verify compression
ls -lh images/new_image.webp

# 4. If WebP is same size or larger: keep the original JPG (skip conversion)
# 5. Remove the original JPG only after confirming WebP is committed
```

### Quantified savings (from actual run):
| File | Original | WebP | Savings |
|------|----------|------|---------|
| blog_header_1.png | 2.0MB | 48KB | 97% |
| blog_header_2.png | 2.0MB | 63KB | 96% |
| blog_header_3.png | 2.3MB | 96KB | 95% |
| blog_header_4.png + .jpg | 2.7MB | 58KB | 97% |
| blog_header_5.jpg | 949KB | 145KB | 84% |
| blog_6_room.jpg | 966KB | 145KB | 85% |

### Do NOT attempt these (not installed):
- `cwebp` — NOT available
- `mogrify` — NOT available

### IMPORTANT CHECKLIST:
- ✅ Never commit raw camera/screenshot images directly
- ✅ Always compress first — don't wait for user to remind you
- ✅ After compressing, update ALL HTML references (images/blog_header_N.jpg → images/blog_header_N.webp)
- ✅ Also update Blog index card images (`blog/index.html`) and OG/Twitter Card absolute URLs
- ✅ Delete the old uncompressed file from git: `git rm images/blog_header_N.jpg`
- ✅ Exception: If WebP output is LARGER than the original JPG, keep the original JPG and skip that file

## External References

- `references/opener-pattern-rotation.md` — 6 opener patterns for blog posts, rotation rules, and user preference for variety. Read before drafting any new article to avoid repetitive framing.

- `references/google-search-console-setup.md` — How to set up GSC for a GitHub Pages site, submit sitemap, troubleshoot "Couldn't fetch" errors, and plan future domain migration.
- `references/github-pages-custom-domain-dns.md` — How to point a custom domain (e.g. tracklinear.com) from Alibaba Cloud DNS to GitHub Pages. CNAME records, GitHub custom domain setup, DNSSEC pitfalls, HTTPS provisioning, and SEO URL updates.
- `references/blog-6-rewrite-example.md` — Before/after of Blog 6 rewritten from novel-style to B2B scan-friendly format. Read before drafting any new article or overhauling an existing one.
- `references/domain-naming-framework.md` — Domain name evaluation framework for MAGNETRACK brand. Decision history, user preferences, availability checks, and the credit-card constraint. Read before proposing or evaluating domain names.
- `references/b2b-value-decoder-article-pattern.md` — Article template for explaining hidden technical differentiators (e.g., "why do some modules cost more"). Use when comparing products by internal components rather than by visible specs.
- `references/h2-keyword-embedding-guide.md` — Technique for naturally embedding long-tail keywords in H2 headings using the colon pattern. Mandatory reference for GEO/AIO checklist compliance.
- `references/geo-aio-quick-answer-pattern.md` — Quick Answer summary box pattern for making articles AI-quotable (Google AI Overview, ChatGPT, Perplexity). Must-read before writing GEO/AIO section.
- `references/cloudflare-cache-busting.md` — Cloudflare-specific CDN cache-busting workflow for tracklinear.com. Steps to diagnose stale content, fix hierarchy (rename CSS → empty commit → hard refresh), and what doesn't work.
- `references/deployment-diagnostics.md` — Diagnostic decision tree for when user says "网站没有改过来". Step-by-step troubleshooting from commit verification → GH Pages check → Cloudflare check → cache-busting hierarchy. Includes user communication templates and command cheat sheet.
- `references/b2b-engineering-spec-depth.md` — How to write B2B-credible spec tables with engineering context instead of simplified numbers.

## Step 2: Verify HTML References

Check that the blog HTML file (`blog-post-N.html`) references images correctly:

```bash
grep -n 'src="images/' ~/Repos/magnetic-track-lighting-website/blog-post-N.html
```

Expected references:
- `<img src="images/blog_header_N.jpg" ...>` — hero image (usually around line 230)
- `<img src="images/blog_N_system.jpg" ...>` — in-article detail images (if used)

Also verify OG/Twitter tags use absolute URLs:
- `og:image` → `https://tiffanywoo2016-alt.github.io/magnetic-track-lighting-website/images/blog_header_N.jpg`
- `twitter:image` → same as above

## Step 3: Update Blog Index

The `blog/index.html` already has article cards for each blog post. After creating a new post:

1. Add a new `<article class="blog-card">` block following the same pattern
2. Include: `itemprop` attributes, image, tag, title, date, excerpt, and link
3. Follow the exact HTML structure of existing cards (lines 308-396)

## Step 4: Update Sitemap

```bash
grep -n 'blog-post' ~/Repos/magnetic-track-lighting-website/sitemap.xml
```

Add a new `<url>` entry:
```xml
<url>
  <loc>https://tiffanywoo2016-alt.github.io/magnetic-track-lighting-website/blog-post-N.html</loc>
  <lastmod>YYYY-MM-DD</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
</url>
```

## Step 5: Commit and Push

```bash
cd ~/Repos/magnetic-track-lighting-website

# Stage everything
git add -A

# Verify staged files
git status --short

# Commit
git commit -m "Add Blog N: <short descriptive title>"

# Push to GitHub (triggers automatic GitHub Pages deployment)
git push origin main
```

### Push Failure Fallback (GitHub API)

**When `git push` times out** (VPS network to GitHub is unreliable), use GitHub Git Data API to push:

```bash
# 1. Get current HEAD SHA
HEAD_SHA=$(curl -s -H "Authorization: token <TOKEN>" \
  https://api.github.com/repos/tiffanywoo2016-alt/magnetic-track-lighting-website/git/refs/heads/main \
  | python3 -c "import sys,json; print(json.load(sys.stdin)['object']['sha'])")

# 2. Create blobs for each changed file
# Encode each file: base64 <file> | tr -d '\n'
BLOG7_SHA=$(curl -s -X POST -H "Authorization: token <TOKEN>" \
  -H "Content-Type: application/json" \
  -d "{\"content\":\"$(base64 blog-post-7.html | tr -d '\n')\",\"encoding\":\"base64\"}" \
  https://api.github.com/repos/tiffanywoo2016-alt/magnetic-track-lighting-website/git/blobs \
  | python3 -c "import sys,json; print(json.load(sys.stdin)['sha'])")

# Repeat for each changed file: blog/index.html, sitemap.xml, images/*.webp

# 3. Get base tree SHA from HEAD commit
TREE_SHA=$(curl -s -H "Authorization: token <TOKEN>" \
  https://api.github.com/repos/tiffanywoo2016-alt/magnetic-track-lighting-website/git/commits/$HEAD_SHA \
  | python3 -c "import sys,json; print(json.load(sys.stdin)['tree']['sha'])")

# 4. Create new tree with all blobs
NEW_TREE_SHA=$(curl -s -X POST -H "Authorization: token <TOKEN>" \
  -H "Content-Type: application/json" \
  -d "{\"base_tree\":\"$TREE_SHA\",\"tree\":[
    {\"path\":\"blog-post-7.html\",\"mode\":\"100644\",\"type\":\"blob\",\"sha\":\"$BLOG7_SHA\"},
    {\"path\":\"blog/index.html\",\"mode\":\"100644\",\"type\":\"blob\",\"sha\":\"$BLOGIDX_SHA\"},
    {\"path\":\"sitemap.xml\",\"mode\":\"100644\",\"type\":\"blob\",\"sha\":\"$SITEMAP_SHA\"}
  ]}" https://api.github.com/repos/tiffanywoo2016-alt/magnetic-track-lighting-website/git/trees \
  | python3 -c "import sys,json; print(json.load(sys.stdin)['sha'])")

# 5. Create commit
COMMIT_SHA=$(curl -s -X POST -H "Authorization: token <TOKEN>" \
  -H "Content-Type: application/json" \
  -d "{\"message\":\"Blog N: title\",\"tree\":\"$NEW_TREE_SHA\",\"parents\":[\"$HEAD_SHA\"],\"author\":{\"name\":\"Tiffany Woo\",\"email\":\"info@tracklinear.com\"}}" \
  https://api.github.com/repos/tiffanywoo2016-alt/magnetic-track-lighting-website/git/commits \
  | python3 -c "import sys,json; print(json.load(sys.stdin)['sha'])")

# 6. Update ref
curl -s -X PATCH -H "Authorization: token <TOKEN>" \
  -H "Content-Type: application/json" \
  -d "{\"sha\":\"$COMMIT_SHA\",\"force\":true}" \
  https://api.github.com/repos/tiffanywoo2016-alt/magnetic-track-lighting-website/git/refs/heads/main
```

> **Note:** The `base64` and `curl` + pipe-to-python approach works even when `git push` times out. If individual commands hang, wrap them in `execute_code()` with 120s timeout — the API is slower from this VPS but eventually completes.

## Step 6: Verify Live

```bash
# Check GitHub Pages deployment (takes ~30-60s)
curl -s -o /dev/null -w 'HTTP %{http_code}' \
  'https://tiffanywoo2016-alt.github.io/magnetic-track-lighting-website/blog-post-N.html'

# Check hero image loads
curl -s -o /dev/null -w 'HTTP %{http_code}' \
  'https://tiffanywoo2016-alt.github.io/magnetic-track-lighting-website/images/blog_header_N.jpg'
```

Both should return `HTTP 200`.

## ⚠️ Deployment Pitfall: Stale Content on GitHub Pages

**Problem:** GitHub Pages caches the built site content. If you push a commit that only changes file content (same commit hash flow), GitHub Pages may NOT redeploy — serving stale HTML/CSS to users.

**Signal:** `curl` returns the NEW content (showing your changes are in the repo), but the user sees OLD content in their browser.

**Root cause:** GitHub Pages Actions only triggers a new build when the HEAD commit SHA changes on the deployment branch. If the commit is already present (e.g., you pushed, it deployed, then you noticed an issue and force-pushed the same commit), the deploy action skips.

**Fix:** Push an empty commit to force a rebuild:

```bash
git commit --allow-empty -m "force rebuild: trigger GitHub Pages redeploy"
git push origin main
```

**Prevention:** Always push a new unique commit for each change set. If you need to add a last-minute change, `git commit --amend` + `git push --force-with-lease` is risky — instead just add a new commit. If that doesn't work, use `--allow-empty`.

**User communication:** When user says "网站没有改过来" — first verify with `curl` that the deployed HTML matches your local file. If it does, the issue is caching/rebuild, not your code. Push an empty commit, wait 30-60 seconds, then ask user to hard-refresh (Cmd+Shift+R).

### ⚠️ Cloudflare CDN Cache-Busting (separate from GitHub Pages cache)

**Problem:** Even after GitHub Pages deploys correctly, Cloudflare (proxied DNS) may cache old HTML/CSS files for up to 10 minutes (default `max-age=600`). User's browser may also cache aggressively.

**Signal:** `curl -I https://tracklinear.com/` shows `last-modified` matching a prior deploy, not the latest commit. `curl` returns correct HTML content but the user's browser shows the OLD version, even in an incognito window.

**Diagnosis steps (in order):**
1. Verify GitHub Pages raw site: `curl -sL "https://tiffanywoo2016-alt.github.io/magnetic-track-lighting-website/" | grep "your-new-class-name"` — if HEAD content is correct here, the code is deployed
2. Verify Cloudflare-proxied site: `curl -s "https://tracklinear.com/" | grep "your-new-class-name"` — if different from GH Pages, Cloudflare is serving stale cache
3. Check cache headers: `curl -s -I "https://tracklinear.com/" | grep -i "last-modified\|age\|cache-control"` — `age: 0` means fresh, `age: > 0` means cached

**Fixes (from strongest to weakest):**

1. **Rename the CSS file** — Most reliable fix. Cloudflare caches by URL, not content hash. Renaming creates a new URL that bypasses all caches immediately. Rename `styles.css` → `styles.v2.css` (increment the version counter each time), update the `<link>` tag in `index.html`, and push a new commit.
   ```bash
   cp styles.css styles.v2.css
   # Then in index.html: <link rel="stylesheet" href="styles.v2.css">
   ```
   ⚠️ This only works for CSS files. For HTML content, options 2-4 below.

2. **Use `?v=N` query param instead of renaming** — `styles.css?v=2` — Cloudflare may still cache if it strips query params. Only try this first; if it fails, fall to option 1 (renaming).

3. **Empty commit + wait 60+ seconds** — Some Cloudflare plans respect origin last-modified. After the empty commit triggers a new GH Pages deploy, Cloudflare may pick it up on the next cache miss.

4. **Hard refresh** — Ask user to do Cmd+Shift+R (Mac) / Ctrl+Shift+R (Win) with DevTools open and "Disable cache" checked.

**TL;DR for "网站没有改过来":**
1. Check GH Pages first (bypasses Cloudflare) — if correct there, Cloudflare is the problem
2. Empty commit trigger → wait → user hard-refresh
3. If still stale after 60s, rename CSS file
4. User must do Cmd+Shift+R once deployed

## Blog Content Standards (from user preferences)

Every blog post MUST follow these technical + writing standards:

### Technical Must-Haves

1. **Article Schema (JSON-LD)**: headline, description, image, datePublished, dateModified, author(Person), publisher(Organization)
2. **BreadcrumbList Schema** + visual breadcrumb nav: Home / Blog / Article
3. **Related Articles** section at bottom (2 related posts with internal links)
4. **Hero image alt text**: descriptive keyword phrase
5. **Back link**: `← Back to Blog` pointing to `blog/index.html`
6. **Publishing spacing**: new blog 1-2 days after previous post
7. **Canonical URL**: set to GitHub Pages absolute URL
8. **OG/Twitter Card**: both `og:image` and `twitter:image`

### B2B Writing Standards (EXACT MATCH REQUIRED)

**定位：** 知识普及型内容，建立 Tiffany 作为磁吸灯行业专家的个人IP形象。

**0. Quick Answer 摘要框（必填）**
每篇 Blog 必须包含一个 `quick-answer` 深色摘要框，放在客户问题之后、详细分析之前：
- 格式：`<span class="label">Traditional 240V track lighting</span> is better for... <span class="label">48V magnetic track lighting</span> is better for...`
- 目标：Google AI Overview / ChatGPT / Perplexity 可直接引用这段文字
- 不适用于纯技术讲解类文章（如 Blog 7 driver 原理），适用于对比/选择类文章

**0b. 关键词自然融入**
根据文章主题和目标 B2B 买家在 Google 上的搜索习惯，将常用关键词自然融入小标题和正文：
- **小标题**：使用含关键词的自然短语（如 `Magnetic Track Lighting for Retail, Showroom and Hotel Projects` 而不是 `Scenario 1: Retail`）
- **正文**：在自然叙述中嵌入 5+ 个长尾关键词（如 `48V magnetic track lighting system`, `traditional 240V track lighting`, `low voltage track lighting system`）
- **不硬塞**：每个关键词必须出现在上下文中读起来自然的句子，禁止关键词堆砌

**1. B2B 扫读原则**
- 正文不超过 **800 字**。忙碌的采购/设计师 **60 秒内能扫读完**并抓住核心价值。
- 开头第一段必须是**一句话摘要**：Project / Before / After / Result。
- 使用项目符号、加粗关键词、数据高亮，避免大段叙述。

**2. 图文穿插原则**
- 文字段落之间必须用图片隔开，**每 150-200 字至少插入一张图片**。每张图片内容必须不同，**禁止重复使用同一张图**。
- **写文章时不提供图片提示词。** 等用户确认文章内容后，用户会说"图片指令"才进入出图阶段。
- **每次只给一张图的提示词。** 用户生成后发回，再给下一张。不要一次性给全部图片的提示词。
- **如果生成的图片效果不好**，用户只会试一次，不行就跳过。不要反复建议重试，直接删除对应 `<img>` 占位标签部署即可。
- 图片提示词规范：
  - 明确指定角度（俯视/平视/特写）、色温（2700K/3000K）
  - 如果展示产品，必须让磁吸轨道和模块**清晰可见**，不能只拍氛围
  - 标注用途（头图/系统图/场景图），对应不同宽高比

**3. 闭环结构**
每篇必须完整包含：
- 🔹 **开篇摘要** — 60字以内，让扫读的客户一眼知道这篇在讲什么
- 🔹 **核心知识点** — 分点列出，每点一个明确的技术洞察或行业经验
- 🔹 **实际应用建议** — 不空谈理论，给出采购/设计师可以带走用的东西
- 🔹 **行动号召 / CTA** — 联系 MAGNETRACK 获取进一步支持

**4. 言之有物**
- 不说"你可以考虑"这类空泛话。每句话必须有实质信息。
- 使用具体数据（瓦数、色温、CRI值、节电百分比）。
- 结合真实项目经验或行业标准来增强可信度。

> **参考案例**：`references/blog-6-rewrite-example.md` 记录了 Blog 6 从小说叙事到 B2B 扫读风格的完整改写过程。在需要重写现有 Blog 或起草新文章时，先读这个案例，对齐改写方向。

## Light Fixture Image Generation Standards (CRITICAL)

When writing image generation prompts for MAGNETRACK products or lighting scenes, the following 3 rules are REQUIRED:

### Rule 1: Realistic Application Logic
Every fixture type must be shown in the setting where it's ACTUALLY used in real projects.
- ✅ Spotlight → gallery (accents artwork), retail (highlights product), lobby (accent on reception)
- ✅ Linear Flood → ambient wash on walls, corridor illumination, cove lighting
- ✅ Grille module → corridors, reading areas (anti-glare)
- ❌ NEVER put flood light above artwork — that's a spotlight job
- ❌ NEVER use pendant adapters in a corridor — that's a grille or flood zone

### Rule 2: Light Effect Consistency
Each module type produces a distinct, unmistakeable beam pattern:
- **Spotlight** → tight, focused beam, clear light cone, crisp shadow edges, directional (head direction MUST match beam angle)
- **Flood/Linear Flood** → wide, soft, even illumination, gradual falloff, no defined hotspot
- **Grille** → controlled, glare-free, diffused, low UGR
- **Pendant** → ambient glow, decorative, wrap-around light
- Light fixture head DIRECTION and the resulting BEAM must be physically aligned at all times

### Rule 3: Interior Designer-Level Aesthetic
- Warm colour temps (2700K-3000K) for hospitality, residential; 3500K-4000K for retail, office
- CRI 90+ rendering — colours on surfaces must look natural and vibrant, not washed out
- Shadows should be soft but defined, no flat/unrealistic lighting
- No floating light sources — every fixture must have a visible mount or track connection
- If the lighting effect looks fake/inconsistent, it damages B2B client trust in the brand

> **Reference:** Always ask yourself: "Would an interior designer approve this lighting scene?" before finalizing a prompt.

## Pitfalls

#### 3. Table/visual layout decisions
- **开篇摘要必须表格化**：用户明确要求开头 Project/Before/After/Result 摘要用深色四栏表格展示，不要用文字加分隔符（·）的段落形式。B2B买家扫读表格比扫读一段文字快3倍。
- **表格 vs 列表的判断**：当一段内容包含3个以上对比性参数时（如 specification、指标对比），必须用表格替代项目符号列表。用户会主动指出哪些段落应该表格化。不确定时，优先用表格。
- **Card grid 比 table 更受认可**：当展示 4 个并列维度（Project/Before/After/Result）时，用户最终认可的是 4 张白色卡片横向排列（card grid）而不是深色表格。卡片更清爽、更易扫读。
- **项目摘要终极方案：白色 card grid**：首页 Blog 卡片区域和 FAQ 等区域的经验是——白色背景、圆角卡片、均匀间距的 grid 布局最受用户认可。避免深色背景表格做摘要。设计步骤：先用 card grid 方案demo，用户不认可再切 table。经验表明 card grid 通过率更高。
- **比较型文章的双栏对比卡**：对于 "A vs B" 对比文章（如传统轨道 vs 磁吸轨道），在详细对比表之前加一组双栏对比卡片效果更好。卡片式比标题列表式更能吸引眼球。卡片风格：左边传统轨道用灰色顶部边框，右边磁吸轨道用金色顶部边框。

#### 4. Magnetic track profile thickness (CRITICAL fact)
- The slimmest 48V magnetic track profile is **5.5mm** — NOT 28mm.
- This is correct data: 5.5mm is the industry-standard thinnest profile for magnetic track.
- 28mm was a mistake in Blog 8 and was corrected by the user.
- When mentioning track profile slimness in any article, always use 5.5mm.

#### 5. Homepage restructuring pitfalls  
- **Don't use product categories as stats** — B2B buyers need trust metrics, not a second nav bar  
- **Don't display annual revenue** — user explicitly said no. Use years of experience + certifications + export reach instead  
- **Don't block progress waiting for real photos** — user confirmed AI images as placeholder, swap later
- **Don't link Hero CTA to a section that was moved/removed** — CTA `#system` becomes `#why` when Why section is inserted before System, and `#process` gets deleted entirely
- **Removing sections is normal** — The homepage flow has evolved from `#hero→#why→#process→#system` to `#hero→#why→#system`. The user explicitly asked to delete #process because #system covers the same conceptual ground. When adding a new section, check if it makes an existing section redundant. If a section was added recently and the user hasn't seen it live yet, they may decide they don't want it.**
- **Mobile responsive:** Any new grid (why-grid) needs its own `@media (max-width: 920px)` rule — collapse to `1fr`
- **Hero image: ALWAYS use `object-fit: cover`** — `contain` creates black bars on wide screens and looks unprofessional. Combine with deeper gradient overlay (left .82→.04) for text readability
- **Hero typography: go BIG** — B2B hero titles need `clamp(48px, 8vw, 88px)`. If the headline could fit on a business card, it's too small. Subtitle at 20px with .82 opacity
- **Stats trust metrics: use divider-separated layout, NOT loose gap** — 28px bold numbers, centered, divided by vertical borders. Mobile: collapse to bottom-border list
- **Why section text-to-image gap** (est. 2026-06-20): User flagged that the gap between `.why-desc` (paragraph text) and `.why-img-wrap` (image container) on the left side of the Why section was too large — text felt disconnected from the image. Approved spacing: `.why-statement` margin-bottom 12px, `.why-desc` margin-bottom 14px + line-height 1.65, `.why-img-wrap` margin-top 10px. **Rule of thumb:** Between descriptive text and its supporting image, use 10-14px gap, not 20-28px. The visual should read as one block: headline → description → image.
- **Design refinement iteration is expected** — first deploy will likely get "样式欠佳，请优化" feedback. Apply all visual improvements in one batch (image treatment, typography, card hierarchy, spacing), second deploy usually passes
- The old ChatGPT homepage was product-catalog style (全部产品类别平铺). AIDA restructuring moves from "这里是我的产品" to "我帮你解决项目问题". This is a fundamental shift the user needs to understand
- **NOT all magnetic track modules have built-in drivers.** Low-end/mid-range modules: LED chip connects directly to 48V rail via simple current limiting (no internal driver). High-end modules (FLOS, iGuzzini, MAGNETRACK premium): built-in driver for precision current control, dimming decoding, and overcurrent protection.
- **Topology is clear:** 220V mains → [track driver/PSU → 48V rail] → [module (either simple resistor OR built-in driver) → LED chip].
- **Driver's value is reliability + dimming + modularity**, not "making it work". The module will light up without it — just less consistently, shorter lifespan, no smooth dimming.
- **先出初稿 → 再迭代图片 → 再改布局**：Blog 写作的正确流程是先把文字结构写好发布 → 用户看完反馈图片需求 → 提供提示词让用户生图 → 插图部署 → 用户再反馈布局调整。不要试图一次性完美交付。
- **图片压缩必须做**：每次上传图片前用 `python3 scripts/compress_image.py input.jpg output.webp` 压缩。966KB 的 JPG → 145KB WebP（85%节省）。**不要等用户提醒才压缩**。上传原始大图会被用户指出。
- **Blog 索引卡的图片路径也要检查**：`blog/index.html` 中的 Blog 6 卡片引用路径 `../images/blog_header_6.jpg` 在旧头图被删除后不会自动更新。每次更换图片时，必须同时更新 Blog 首页卡片中的 `src` 路径（如果图片文件名变了）。
#### 6. Site structure assumption pitfall — DO NOT assume missing pages

If you think the site is missing product pages, verify FIRST, then ask the user. The site already has:

- **Track rail pages**: `tracks/20mm.html`, `tracks/23mm.html`, `tracks/35mm.html`
- **Light module pages**: `lights/flood.html`, `lights/grid.html`, `lights/folding-grid.html`, `lights/spot.html`, `lights/pendant.html`
- **Product index**: `tracks/index.html`, `lights/index.html`
- **Blog index**: `blog/index.html`
- **Homepage**: `index.html`

Do NOT tell the user "your site doesn't have product pages" or "you don't have a real website structure" without first verifying. The user built these pages and will rightly correct you.

## AI Search Matching: Product Schema + FAQPage

To make the site more quotable by AI search tools (ChatGPT, Perplexity, Google AI Overview), every product page needs its own Product Schema JSON-LD.

### Product Schema Requirements

Each product page must have:
- `@id` — unique URL with `#product` fragment (e.g., `https://tracklinear.com/tracks/20mm.html#product`)
- `sku` — unique product code (e.g., `TRK-20MM`, `MOD-SPOT`)
- `brand` — `{ "@type": "Brand", "name": "Tracklinear" }`
- `category` — product type (e.g., "Magnetic Track Rail", "Magnetic Track Light Module")
- `offers` — `Offer` with `availability: InStock` and `itemCondition: NewCondition`
- Optional: `material`, `color`, `mpn`, `manufacturer`

### Homepage Product Schema

The homepage needs a broader Product Schema covering the full system:
- Include `sku`, `mpn`, `category`, `material`, `color`, `manufacturer`
- Use `@type: AggregateOffer` with lowPrice/highPrice range
- Add `aggregateRating` with `bestRating`

### What to do for new pages

When creating ANY new page (blog post, product page, etc.), always add:
1. Product Schema (if product-related) with unique `@id` and `sku`
2. FAQPage Schema (if FAQ section is included)
3. Article Schema (if blog post)
4. BreadcrumbList Schema
5. OG + Twitter Card meta tags with absolute image URLs

### Existing pages audit

As of 2026-06-18, Product Schema has been added to:
- `index.html` — "48V Magnetic Track Lighting System" (with `@id`, `sku`, `mpn`, `material`, `color`, `manufacturer`, `aggregateRating`)
- `tracks/20mm.html` — SKU: TRK-20MM
- `tracks/23mm.html` — SKU: TRK-23MM
- `tracks/35mm.html` — SKU: TRK-35MM
- `lights/flood.html` — SKU: MOD-FLOOD
- `lights/grid.html` — SKU: MOD-GRILLE
- `lights/folding-grid.html` — SKU: MOD-FOLD-GRILLE
- `lights/spot.html` — SKU: MOD-SPOT
- `lights/pendant.html` — SKU: MOD-PENDANT
- **HTML already exists**: The blog article HTML and index card may already be created from a previous session. Always check what's already staged/committed before re-creating files.
- **OG image URL**: Must use the GitHub Pages absolute URL (not relative path) for social media preview to work.
- **Page cache after deploy**: User may see a stale version. Tell them to hard-refresh (Ctrl+F5 / Cmd+Shift+R) or append `?v=N` to URL.
- **Image size**: User sends images at various resolutions. If over 500KB, compress with `cwebp -q 85` before committing. If cwebp not available, just commit the original — user hasn't complained about file sizes yet.
- **Image count assumption**: When user says "I'll send images again" do NOT assume how many images they're sending. They may send 2 out of 4, or all, or a different count. Wait for them to send, count what arrives, and only insert those. If you pre-insert 4 placeholders and only 2 images arrive, you must remove the empty ones.
- **Image identification without vision_analyze**: When vision_analyze credits are low, use Python PIL to analyze image properties (avg brightness, color distribution, size) to infer scene type (dark = warehouse/network map; bright = retail/showroom; mid-tone = interior scene). But prefer OCR (tesseract) for text extraction from screenshots.
