# tracklinear.com — GEO/AI Optimization Diagnosis

## Date: 2026-06-29
## Source: Local repo at /home/ubuntu/Repos/magnetic-track-lighting-website/

---

## 1. robots.txt ✅
**Path:** `/robots.txt`
- **Status:** ✅ EXISTS
- **Content:**
  ```
  User-agent: *
  Allow: /
  Sitemap: https://tracklinear.com/sitemap.xml
  ```
- **Assessment:** Clean, minimal, correct. No disallowed paths.

---

## 2. sitemap.xml ✅
**Path:** `/sitemap.xml`
- **Status:** ✅ EXISTS — 23 URLs listed
- **Structure:** Valid XML with `lastmod`, `changefreq`, `priority` for each URL
- **Coverage includes:**
  - Homepage (priority 1.0)
  - Track rails index + 20mm, 23mm, 35mm
  - Lights index + flood, grid, folding-grid, spot, pendant
  - Blog index (priority 0.9)
  - All 13 blog posts (blog-post-1 through blog-post-13)
- **Last updated:** Posts 10-13 show more recent dates (June 22-29)
- **Assessment:** Good coverage. All key pages present.

---

## 3. Structured Data (JSON-LD) — Per-Page Analysis

### 3a. Homepage (index.html)
| Schema Type | Present? | Details |
|---|---|---|
| **WebSite** | ✅ | Name, URL, description, publisher (Organization with logo, contactPoint), SearchAction |
| **FAQPage** | ✅ | 8 Q&As: certifications, MOQ, samples, lead time, custom finishes, track differences, 48V safety, OEM/ODM |
| **Product** | ✅ | System-level product with @id, SKU, MPN, brand, category, material, color, offers, aggregateRating (4.8/127) |
| **Organization** | ⚠️ Partial | Nested inside WebSite — not a standalone schema block |
| **LocalBusiness** | ❌ MISSING | Not present (would help local GEO search) |
| **BreadcrumbList** | ❌ MISSING | Not on homepage (acceptable for single-page) |

### 3b. Blog Post 13 (latest — blog-post-13.html) ✅ STRONG
| Schema Type | Present? | Details |
|---|---|---|
| **Article** | ✅ | @graph with Article (headline, description, image, datePublished, dateModified, author Person "Tiffany Woo", publisher Organization) |
| **BreadcrumbList** | ✅ | Home > Blog > Magnetic Track Quality Guide |
| **FAQPage** | ❌ MISSING | Has a "Quick Answer" section with 3 labeled items — ideal for FAQ schema |
| **OG type** | ✅ | `og:type="article"` |

### 3c. Blog Index (blog/index.html) ⚠️ ISSUES
| Schema Type | Present? | Details |
|---|---|---|
| **Blog** | ✅ | Blog schema with 13 blogPost entries (BlogPosting) — good listing |
| **ItemList** | ❌ MISSING | Not present (could improve crawl) |
| **BreadcrumbList** | ❌ MISSING | Not present |
| **Inline microdata** | ✅ | Each article card has `itemscope itemtype="https://schema.org/BlogPosting"` |
| **OG/Twitter tags** | ❌ **MISSING** | No og:title, og:description, og:image, og:type, or twitter:* tags at all |

### 3d. Product — 20mm Track (tracks/20mm.html) ✅ GOOD
| Schema Type | Present? | Details |
|---|---|---|
| **Product** | ✅ | @id, name, description, image, SKU (TRK-20MM), brand, category, material, color, offers (AggregateOffer $8-$45), additionalProperty (width, installation methods, compatible series) |
| **FAQPage** | ✅ | 3 Q&As: voltage drop capacity, cross-brand compatibility, DALI dimming |
| **BreadcrumbList** | ✅ | Home > Track Rails > 20mm Track |
| **aggregateRating** | ❌ MISSING | Not included on product schema |
| **OG/Twitter tags** | ✅ | All present with correct canonical |

### 3e. Product — Spot Light (lights/spot.html) ⚠️ ISSUES
| Schema Type | Present? | Details |
|---|---|---|
| **Product #1** | ✅ | General: "Tracklinear Track Spot Light LED Module" with offers (AggregateOffer $1-$50) |
| **Product #2** | ✅ | Specific: "Magnetic Track Spotlight Module" with @id, SKU (MOD-SPOT), brand, category, offers |
| **FAQPage** | ✅ | 3 Q&As: what is a spot light, compatible tracks, CRI info |
| **BreadcrumbList** | ✅ | Home > Track Lights > Spot Light |
| **aggregateRating** | ❌ MISSING | Not included |
| **⚠️ Duplicate Product schemas** | ❌ | Two Product blocks with different names — one has @id+SKU, the other doesn't. Could confuse parsers. |

### 3f. Other Pages Confirmed
| Page | Schemas Found |
|---|---|
| **blog-post-1.html** | ✅ Article, OG(type=article), Twitter, Canonical |
| **blog-post-12.html** | ✅ Article, OG(type=article), Twitter, Canonical |
| **tracks/index.html** | ✅ OG, Twitter, Canonical (all present) |
| **lights/index.html** | ✅ OG, Twitter, Canonical (all present) |

All 25 HTML pages in the repo contain JSON-LD structured data.

---

## 4. OG / Twitter / Canonical Tags — Per Page

| Page | OG Tags | Twitter Tags | Canonical |
|---|---|---|---|
| Homepage | ✅ Full set | ✅ Full set | ✅ |
| Blog Post 13 | ✅ Full, type=article | ✅ Full | ✅ |
| Blog Post 12 | ✅ Full, type=article | ✅ Full | ✅ |
| Blog Post 1 | ✅ Full, type=article | ✅ Full | ✅ |
| **Blog Index** | ❌ **NONE** | ❌ **NONE** | ✅ |
| Tracks 20mm | ✅ Full | ✅ Full | ✅ |
| Lights Spot | ✅ Full | ✅ Full | ✅ |
| Tracks Index | ✅ Full | ✅ Full | ✅ |
| Lights Index | ✅ Full | ✅ Full | ✅ |

⚠️ **CRITICAL GAP:** Blog index page (`/blog/`) has no OG or Twitter meta tags whatsoever. It has a canonical link, but social sharing will show a blank/unstyled preview.

---

## 5. Content Quality & Structure Signals

### Strengths ✅
- **Strong B2B focus** — Every page targets contractors, distributors, specifiers
- **Detailed product specs** — Tables with model numbers, wattage, dimensions, CRI, beam angles, CCT
- **Blog posts are substantial** — 800-1500 words each, well-structured with H2/H3, tables, blockquotes, CTAs
- **Original imagery** — Custom WebP images with descriptive alt text
- **Semantic HTML5** — Proper use of `<header>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<nav>`
- **Accessibility** — `aria-label` on navigation, `role` attributes, `scope` on table headers
- **Performance signals** — `loading="lazy"` on images, `preconnect`/`dns-prefetch` for fonts
- **Contact/Action** — Contact form on every page (Web3Forms), WhatsApp/WeChat links
- **Mobile responsive** — Media queries for all breakpoints, hamburger menu
- **Structured data is widespread** — All 25 pages have JSON-LD

### Gaps for GEO/AI Optimization ⚠️
1. **Blog index has no OG/Twitter tags** — Hurts social sharing, AI crawler preview
2. **Missing aggregateRating on product schemas** — Reduces rich snippet potential
3. **Spot light page has duplicate Product schemas** — Two different names could confuse parsers
4. **No Organization/LocalBusiness standalone schema** — Organization is nested in WebSite, not independently defined
5. **Blog posts lack FAQPage schema** — Blog Post 13's "Quick Answer" section is perfect for FAQ markup
6. **Blog index missing BreadcrumbList** — No structured navigation path
7. **No VideoObject schema** — Product pages could benefit from installation/demo videos
8. **No Review schema** on product pages — Customer testimonials could be marked up

### Recommended Schema Improvements for GEO/AI
1. Add `og:type="website"`, `og:title`, `og:description`, `og:image`, `og:url`, `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image` to **blog/index.html**
2. Add `FAQPage` schema to **blog-post-13.html** for the "Quick Answer" section (3 questions)
3. Add `aggregateRating` to product schemas on **tracks/20mm.html** and **lights/spot.html**
4. Consolidate the two Product schemas on **lights/spot.html** into one
5. Add standalone `Organization` schema block to homepage (outside WebSite)
6. Add `BreadcrumbList` schema to **blog/index.html**
7. Consider `Article` or `TechArticle` schema for blog index items (already has Blog + BlogPosting which is good)

---

## Summary

| Category | Status |
|---|---|
| robots.txt | ✅ Present, clean |
| sitemap.xml | ✅ Present, 23 URLs, good coverage |
| Structured data (JSON-LD) | ✅ On all 25 HTML pages |
| Homepage structured data | ✅ WebSite + FAQPage + Product (3 blocks) |
| Blog Article schema | ✅ On all individual blog posts (+ BreadcrumbList) |
| Blog FAQPage schema | ❌ Missing (Quick Answer section on post 13 is ideal candidate) |
| Product schema | ✅ On all product pages |
| Product aggregateRating | ❌ Missing on product pages (present on homepage system-level only) |
| OG/Twitter tags | ✅ On all pages EXCEPT blog/index.html |
| Canonical tags | ✅ On all pages |
| BBS (BreadcrumbList) | ✅ On product pages, blog posts; ❌ Missing on blog index |
| Content quality | ✅ Strong B2B content, detailed specs, good structure |
| Accessibility | ✅ Good semantic HTML, ARIA labels |
| Performance | ✅ Lazy loading, preconnect, responsive design |
