# B2B Homepage AIDA Restructure Methodology

When the user asks to restructure the homepage or evaluate its B2B effectiveness, apply the AIDA framework. This reference documents the ACTUAL implementation on MAGNETRACK's homepage (2026-06-13), including page structure, CSS patterns, and trust-building strategies.

**Core constraint:** This is a personal brand site, NOT a factory/company site. Trust must be built through expertise (Blog) and stated as MAGNETRACK-brand facts (not factory affiliation).

## AIDA Audit Template

### A — Attention (Hero section)
Check:
- ✅ Does the headline state a clear value proposition (not a feature)?
- ✅ Does the sub-headline identify the target buyer?
- ✅ Are the CTAs action-oriented (not "Learn More")?
- ❌ **Common mistake**: Hero shows products instead of solution. B2B buyers don't enter a site to see product photos — they enter to find out if you can solve their problem.

### I — Interest
Check:
- ✅ Does the page flow lead the buyer from "what is this" to "can this solve my project"?
- ❌ **Common mistake**: Product specifications too early. Show applications first (retail, hotel, office) — buyers identify with project types, not module specs.
- ✅ Stats/highlights bar is good for quick credibility.

### D — Desire
Check:
- ✅ What evidence exists that this supplier/knowledge is trustworthy?
- ✅ If no factory/certification pages (personal brand), BLOG is the primary trust signal.
- ✅ System overview, installation options — these show depth.
- ❌ **Common mistake**: Too many product-detail sections (Modules, Optics) that belong on sub-pages. Homepage should only have enough product info to build desire, not to replace the product catalog.

### A — Action (CTA/Contact)
Check:
- ✅ Contact section should have multiple touchpoints (email, form, WhatsApp)
- ✅ FAQ at the bottom serves as last barrier removal
- ✅ Blog section serves as credibility closing argument
- ❌ **Common mistake**: Hiding contact below the fold without any above-fold CTA

## IMPLEMENTED: MAGNETRACK 10-Section Homepage (2026-06-13)

### Final Structure
```
1. Hero → Pain-driven headline + 2 CTAs (Why MAGNETRACK / Get Quotation)
2. Stats → Trust data (13+ Years / 100+ SKUs / CE&RoHS / 24h Response)
3. Why MAGNETRACK → 6-card trust grid (Factory-Direct, CE, System Matching, OEM/ODM, Export 30+ Countries, Spec Support)
4. Applications → Project-type matching (Office / Retail / Hotel)
5. System → Track rails + Modules + Drivers + Accessories (left/right split layout with 20 Series product photo)
6. Installation → Trimless / Surface / Pendant
7. Blog → Professional expertise cards (3 latest articles)
8. FAQ → 8 B2B purchase-decision questions
9. OEM/ODM → Private-label support + call to action
10. Contact → Form + Email + WhatsApp
```

### Hero Writing Playbook
```
Eyebrow: ✦ 13 Years · Direct from Foshan Factory
H1:      Source complete 48V magnetic track systems — not just parts.
P:       Stop piecing together tracks, modules, and drivers from different suppliers. We deliver fully matched systems with CE/RoHS certification, OEM/ODM support, and specification guidance for your projects.
CTA1:    Why MAGNETRACK → (links to #why)
CTA2:    Get a Quotation ↓ (links to #contact)
```

**Key principle:** B2B hero = pain-point-driven headline + benefits in sub + trust badge in eyebrow. NOT product-catalog-style hero.

### Stats Block Design
❌ **Before (product categories):** Track Rails / Light Modules / Power Matching / Control Options
✅ **After (trust metrics):** 13+ Years / 100+ SKUs / CE & RoHS / 24h Response

**Rule for B2B personal brand sites:** Stats should answer "can I trust this supplier?" not "what products do you have?" The latter has its own section later.

### Why MAGNETRACK Grid (6 cards, 3-column)
This is the D (Desire) block in AIDA. For a personal brand with no factory photos yet:
- Use SVG/icons for visual variety (why-icon divs with emoji: 🏭✓⚙📦🌍📋)
- Each card = one trust pillar, max 2 sentences
- Card style: `background: var(--bg)` (#f5f3ef), `border-radius: 24px`, `padding: 28px`, dark icon background
- Grid: `grid-template-columns: repeat(3, 1fr)` with 18px gap
- Responsive: collapse to 1 column at 920px

**Six trust pillars used:**
1. Factory-Direct Since 2012 (Foshan base, no specific factory name)
2. CE & RoHS Certified (mention ENEC/SAA support)
3. Complete System Matching (20/23/35mm, built-in/external/DALI/Tuya)
4. OEM / ODM / Private Label
5. Export to 30+ Countries
6. Specification Support (send project → get recommendation)

**What NOT to include (user explicit preference):**
- ❌ Annual sales revenue ($12M+) — user said "不想显示年销售额"
- ❌ Factory name (RAYS LIGHTING, 晨曦, Grandlec, Henglun)
- ❌ Real factory photos — user doesn't have them yet, will replace AI images later
- ✅ Use AI-generated images as placeholder, swap when real photos available

### CSS Patterns Used for Homepage

```css
.why-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}
.why-card {
  background: var(--bg);
  border-radius: 24px;
  padding: 28px;
  transition: all .22s ease;
}
.why-card:hover { transform: translateY(-3px); box-shadow: 0 12px 30px rgba(0,0,0,.06); }
.why-icon {
  width: 48px; height: 48px; border-radius: 16px;
  background: var(--dark); color: var(--gold-light);
  display: grid; place-items: center;
  font-size: 21px; margin-bottom: 16px;
}
.why-card h3 { margin: 0 0 10px; font-size: 18px; }
.why-card p { color: #5a5a5a; line-height: 1.65; font-size: 14px; margin: 0; }
```

### Navigation Updates Required
When restructuring:
- Update nav link `#system` to `#why` if Hero CTA points to Why section
- Add `#why` to mobile menu OR remove stale section links
- Update mobile menu to match new section IDs

## When to Propose This Restructure

**Triggers:**
- User says "首页结构需要改" or "不符合B2B买家"
- User mentions "AIDA" or buyer psychology
- User complains about "太长了" or "太多产品了"
- Blog count reaches 5+ (enough content to serve as trust signal)
- User compares new site to old ChatGPT-generated site structure → explain: old = product-catalog style, AIDA = buyer-decision style

## User's Design Preferences (Important)

- ✅ **Card grid layout** (白色card grid) preferred over tables for summaries
- ✅ **Inline styles for one-off components** — the entire site uses inline `<style>` blocks in index.html, not separate CSS files. Keep the pattern.
- ✅ **Section labels** (eyebrow like "Application Solutions", "Knowledge Base") in gold (#b08a57)
- ✅ **Compact FAQ cards** with small text (15px h3, 14px p, 20px 24px padding) — user said "feels fine" after space optimization
- ❌ Avoid deep dark tables for summaries — white card grid is more accepted

## Image Strategy for Homepage

- WebP for all images (already converted site-wide)
- Image dimensions: Banner 1920×1080, system 1200×900, installation 900×1200, cards 800×450
- Applications section uses images/image_6~8.webp (office, retail, hotel)
- 📸 **User has no factory/product photos.** Use AI-generated images as placeholder. When user provides real photos later, swap. Do NOT block progress waiting for photos.

## ⚠️ Design Refinement Patterns (Learned 2026-06-13)

User said "样式欠佳，请优化" on the initial Phase 1 deployment. Below are the specific fixes that addressed the issues:

### Hero Image: `contain` → `cover`
**Problem:** First deploy used `object-fit: contain` on hero images. On wide screens, this left large black bars on both sides of the image — the hero looked empty and unprofessional.
**Fix:** Switch to `object-fit: cover` and increase the gradient overlay opacity:
```css
.hero img { object-fit: cover; }
.hero::after { background: linear-gradient(90deg, rgba(0,0,0,.82), rgba(0,0,0,.45), rgba(0,0,0,.04)); }
```
The deeper left gradient (.82 vs .75) ensures text is always readable against any hero image.

### Hero Typography: Bigger + Tighter
**Problem:** Title at `clamp(44px, 7vw, 82px)` with `line-height: 1.04` felt small relative to the hero's visual impact. Subtitle text at 19px blended into the background.
**Fix:** Bump everything up:
```css
.hero h1 { font-size: clamp(48px, 8vw, 88px); line-height: 1.02; letter-spacing: -.05em; }
.hero p { font-size: 20px; color: rgba(255,255,255,.82); margin: 30px 0 42px; }
```
**Rule of thumb for B2B hero titles:** If the headline could fit on a business card, it's too small. Hero = billboard space.

### Stats Layout: Grid + Divider
**Problem:** Initial stats used `gap: 28px` with 19px text — looked like a loose list, not a professional metrics bar. Text was too small for trust data.
**Fix:** Switch to divider-separated grid with 28px titles:
```css
.stats { padding: 24px 0; }
.stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; padding: 8px 0; }
.stats-grid > div { text-align: center; padding: 20px 16px; border-right: 1px solid rgba(0,0,0,.06); }
.stats-grid > div:last-child { border-right: none; }
.stat-title { font-size: 28px; font-weight: 800; letter-spacing: -.02em; }
.stat-sub { font-size: 13px; margin-top: 6px; line-height: 1.4; }
```
On mobile, remove dividers and use bottom borders instead:
```css
@media (max-width: 920px) {
  .stats-grid > div { border-right: none; border-bottom: 1px solid rgba(0,0,0,.06); }
  .stats-grid > div:last-child { border-bottom: none; }
}
```

### Why Cards: Grey Flat → White Card
**Problem:** Initial `.why-card` used `background: var(--bg)` (#f5f3ef) without borders or shadows. The entire Why section looked flat and indistinguishable from the section background.
**Fix:** Switch to white cards with borders + shadows — creates depth and visual hierarchy:
```css
.why-card {
  background: white;
  border-radius: 20px;
  padding: 28px 26px;
  border: 1px solid rgba(0,0,0,.04);
  box-shadow: 0 4px 20px rgba(0,0,0,.04);
  transition: all .25s ease;
}
.why-card:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(0,0,0,.08); }
.why-icon { border-radius: 14px; font-size: 22px; margin-bottom: 18px; }
.why-card h3 { font-size: 17px; margin: 0 0 8px; }
.why-card p { line-height: 1.6; }
```

### Design Iteration Workflow (for this user)
1. **Deploy first version quickly** — don't over-polish before deployment
2. User reviews live → user says "样式欠佳，请优化"
3. **Apply all visual fixes in a single batch** (hero image treatment, typography scale, card hierarchy, spacing)
4. Push again — second review usually passes
5. **One batch of visual feedback per section is normal.** Don't be surprised when user asks for refinement on initial deploy

### Key CSS Pattern (Refined Version)
The current (approved) design uses these CSS variables:
```css
:root {
  --bg: #f5f3ef;      /* page background */
  --dark: #151515;    /* header/text/icon backgrounds */
  --text: #161616;    /* body text */
  --gold: #b08a57;    /* labels, accents */
  --gold-light: #e6c08c; /* icon text, eyebrow text */
  --card: #ffffff;     /* white card backgrounds */
  --soft: #efe8df;    /* OEM section background */
}
```

## History
- 2026-06-13: Original 11-section structure audited against AIDA. Identified: too product-focused, no trust signal for personal brand, Applications buried deep. Proposed 8-section restructure. User confirmed approach with "好" — began implementation.
- 2026-06-13: Phase 1 deployed — Hero rewritten (pain-driven), Stats converted (product cats→trust metrics), Why MAGNETRACK section created (6-card grid). AI images used as placeholder; user confirmed will replace with real factory photos later. User also confirmed NO annual revenue display — replaced with 13+ years + CE/RoHS + 30+ countries.
- 2026-06-13: Phase 1 style refinement — user said "样式欠佳，请优化". Applied: hero img cover, bigger title (88px), stats divider layout, white cards + borders for Why section. Second deploy approved. Documented all refinements above.
- 2026-06-13: Domain evaluation session — user evaluated lumitraclighting.com → tracklinear.com → tracklinearlighting.com. Decision framework captured in references/domain-naming-framework.md. No registration action taken yet.
- 2026-06-19: #system section rewritten from `.grid-system` (2-column left image + 4 card-grid items) to `.system-layout` (left/right split — image + 4 compact numbered items). Title changed from "Everything works together from one source" to "A Complete 48V Magnetic Track Lighting System". Left image replaced with user-provided "20 Series" product composition photo (cropped from 1085×1450 portrait to 1200×865 landscape). CSS moved inline to bypass Cloudflare cache. #process section deleted as redundant — user explicitly requested removal.
