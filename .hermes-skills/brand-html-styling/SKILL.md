---
name: brand-html-styling
description: >-
  Style HTML pages to match an established brand design language.
  For Tracklinear brand: warm architectural/technical feel.
  Covers: FAQ accordions, product cards, homepage Hero (banner),
  Why section (AIDA split layout with issue cards), section layouts,
  design corrections from user feedback.
---

# Brand HTML Styling

## When to Load

- User asks to add a new section to an existing brand page (FAQ, testimonials, specs, etc.)
- User says something "looks like a template" or "doesn't match the brand"
- User gives specific color / spacing / typography corrections
- Adding or redesigning any visible UI element to an established brand website
- Adding a FAQ accordion section to any product page

## Brand Design Language (Tracklinear)

### Core Values
- **Architectural / Technical / Premium / Calm** — not SaaS, not template-y
- B2B lighting manufacturer. Target: importers, distributors, contractors, specifiers.
- Everything should feel like a product engineering document, not a marketing landing page.

### Visual Palette

| Token | Value | Use |
|-------|-------|-----|
| Page/Section background | `#f7f5f1` | Section backgrounds, page body |
| Card background | `#ffffff` | Content containers |
| Card border | `1px solid #e7e1d8` | Defines card edges cleanly |
| Text (dark) | `#111111` | Headings, question text |
| Text (body) | `#3f454b` | Answer text, descriptions (not `#555` or `var(--muted)`) |
| Text (muted) | `#666666` | Subtle secondary copy |
| Gold accent | `#b88746` (NOT `#b08a57`) | **Use sparingly** — numbers, links, decorative |
| Icon bg (closed) | `#f1ebe2` | Icon backgrounds before open state |
| Icon bg (open) | `#e7e1d8` | Icon backgrounds when expanded |

### Typography
- Font: `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`
- Question text: `18px` (desktop), `16px` (mobile), `font-weight: 600`, `#111111`
- Answer text: `16px` (desktop), `15px` (mobile), `line-height: 1.75`, `#3f454b`, `max-width: 660px`
- Section title: `clamp(34px, 5vw, 56px)`, thin letter-spacing
- Section kicker label: `#b88746`, uppercase, `letter-spacing: .22em`
- Bold within answers: `font-weight: 700`, `color: #111` (to contrast with `#3f454b` body text)

### Spacing
- Section vertical padding: `96px 0`
- Section head bottom margin: `56px`
- Card gap: `12px` between cards
- Card CTA bottom margin: `52px`

## FAQ Accordion Component

This is the **canonical** design — the result of 7+ rounds of user iteration. Do not deviate from this structure.

### ⚠️ Critical Rules (from user feedback)

1. **HTML Structure: Use `.faq-card-inner` as the click trigger, NOT `<button>`.** Button elements caused clickability issues in flex layouts. Use a `<div>` with `onclick` on the parent container instead.

2. **Icon position: `margin-left: auto` inside a flex row, inside the clickable area.** The `+` / `–` circle must be at the **far right** of the question row, aligned with the end of the answer text below it.

3. **Icon shape: Use flex layout, NOT grid.** Grid with 3 columns caused the icon circle to become oval/distorted due to column sizing. Use `display: flex` on the clickable row with `flex-shrink: 0` + explicit `width/height/min-width/min-height` on the icon for a guaranteed perfect circle.

4. **Icon behavior: `+` → `–` text swap, NOT rotation.** Use JavaScript `icon.textContent = isOpen ? '–' : '+'`. No CSS rotation transforms.

5. **Width: Cards must match section width.** Do NOT set `max-width` on `.faq-list`. Set `max-width: 840px; margin: 0 auto` on `.faq-card` itself so each card is centered but the section visually spans the full `.container` width (1200px). This prevents the "凹进去" effect.

6. **Answer indentation: Align with question text, NOT with number column.** Since `.faq-number` uses `width: 48px; text-align: center` (not `padding-left: 24px`), the answer padding should be `60px` (48px number column + 12px gap). On mobile: `48px`.\n\n   ⚠️ **Critical: Use `min-width` on `.faq-number`.** Without `min-width: 48px`, variable-width digits (01 vs 03) cause the number column width to differ between cards, creating a \"凹进去\" visual mismatch. Always set both `width` and `min-width` to the same value.

7. **Bold keywords in answers.** Wrap key numbers, technical terms, and product-specific specs in `<strong>`: wattage ranges (`120–150W`), quantities (`8–12 pcs`), control protocols (`DALI`, `0-10V`), technical concepts (`sample testing`, `mid-point feeding`). Add CSS: `.faq-answer strong { font-weight: 700; color: #111; }`.

8. **Visible content must match JSON-LD exactly.** If the page has a `<script type="application/ld+json">` with FAQPage schema, the visible FAQ text must be identical in content.

9. **Gold is an accent only** — use for numbers (`01`, `02`), link text, decorative icon backgrounds. Never use gold as a primary background or title color.

10. **Every FAQ section headline must include "Systems"** — e.g. "Common Questions About 20mm Magnetic Track Systems" — because the product is a system (track + driver + modules), not just a rail.

11. **Subtitle must include SEO keywords** — include "importers, contractors", "lighting specifiers", "48V magnetic track lighting projects".

### HTML Structure (canonical)

```html
<section class="faq-section">
  <div class="container">
    <div class="section-head">
      <div class="section-kicker">Frequently Asked Questions</div>
      <h2>Common Questions About<br>[Product] Track Systems</h2>
      <p>Practical answers for importers, contractors and lighting specifiers working on 48V magnetic track lighting projects.</p>
    </div>
    <div class="faq-list">
      <div class="faq-card">
        <div class="faq-card-inner" onclick="toggleFaq(this)">
          <div class="faq-number">01</div>
          <div class="faq-question">
            <span class="faq-text">Question text here</span>
            <span class="faq-icon">+</span>
          </div>
        </div>
        <div class="faq-answer">
          <p>Answer with <strong>bold keywords</strong>.</p>
          <p>Optional second paragraph.</p>
        </div>
      </div>
      <!-- Repeat .faq-card for 02, 03... -->
    </div>
    <div class="faq-cta">
      <p>Have a different question? <a href="#contact">Talk to our engineering team →</a></p>
    </div>
  </div>
</section>
```

### CSS (canonical)

```css
.faq-section {
  background: #f7f5f1;
  padding: 96px 0;
}

.faq-section .section-head {
  margin-bottom: 56px;
}

.faq-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.faq-card {
  background: #ffffff;
  border: 1px solid #e0d8cf;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(20, 20, 20, 0.05);
  transition: box-shadow .25s ease;
  max-width: 840px;
  margin: 0 auto;
}

.faq-card:hover { box-shadow: 0 10px 30px rgba(20,20,20,0.07); }
.faq-card.open { box-shadow: 0 10px 30px rgba(20,20,20,0.07); }

.faq-card-inner {
  display: flex;
  align-items: flex-start;
  cursor: pointer;
}

.faq-number {
  flex-shrink: 0;
  width: 48px;
  min-width: 48px;
  text-align: center;
  padding: 24px 0 0 0;
  font-size: 12px;
  font-weight: 700;
  color: #b88746;
  letter-spacing: .1em;
}

.faq-question {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 24px 16px 12px;
  font-size: 18px;
  font-weight: 600;
  color: #111111;
  text-align: left;
  line-height: 1.5;
  user-select: none;
}

.faq-card.open .faq-question { padding-bottom: 8px; }

.faq-text { flex: 1; }

.faq-icon {
  flex-shrink: 0;
  width: 34px;
  height: 34px;
  min-width: 34px;
  min-height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #f1ebe2;
  font-size: 20px;
  font-weight: 400;
  line-height: 1;
  transition: background .25s ease;
  color: #b88746;
  margin-left: auto;
}

.faq-card.open .faq-icon { background: #e7e1d8; }

.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height .4s ease, padding .4s ease;
  padding: 0 24px 0 60px;
}

.faq-card.open .faq-answer {
  max-height: 500px;
  padding: 0 24px 28px 60px;
}

.faq-answer p {
  color: #3f454b;
  font-size: 16px;
  line-height: 1.75;
  margin: 0 0 10px;
  max-width: 660px;
}

.faq-answer p:last-child { margin-bottom: 0; }

.faq-answer strong {
  font-weight: 700;
  color: #111;
}

.faq-cta {
  text-align: center;
  margin-top: 52px;
  font-size: 16px;
  color: #666;
}

.faq-cta a {
  color: #b88746;
  font-weight: 600;
  transition: opacity .2s;
}

.faq-cta a:hover { opacity: .7; }

/* Mobile */
@media (max-width: 640px) {
  .faq-number {
    padding: 18px 0 0 0;
    width: 38px;
    min-width: 38px;
    font-size: 11px;
  }
  .faq-question {
    font-size: 16px;
    padding: 14px 14px 14px 8px;
  }
  .faq-icon {
    width: 30px; height: 30px;
    min-width: 30px; min-height: 30px;
    font-size: 17px;
  }
  .faq-answer { padding: 0 16px 0 48px; }
  .faq-card.open .faq-answer { padding: 0 16px 22px 48px; }
  .faq-answer p { font-size: 15px; }
}
```

### JavaScript

```javascript
function toggleFaq(el) {
  const card = el.parentElement;
  const icon = card.querySelector('.faq-icon');
  const isOpen = card.classList.toggle('open');
  icon.textContent = isOpen ? '–' : '+';
}
```

### Pitfalls

- **Do NOT use `<button>` for the clickable question area.** Button elements in flex layouts caused click dead zones. Use `<div>` with `onclick` on the parent `.faq-card-inner` container instead.
- **Do NOT use CSS grid for the card layout.** Grid with multiple columns caused the icon circle to render as oval/ellipse. Use flex with `flex-shrink: 0` + explicit dimensions.
- **Do NOT use `var(--gold)`** unless it matches `#b88746`. The brand's gold accent is `#b88746`, not `#b08a57` (old MAGNETRACK gold).
- **Do NOT use `faq-item` class name.** Use `faq-card`.
- **Do NOT use rotating `+` → `×` animation** — SaaS style. Use `+` → `–` text swap.
- **Do NOT use heavy shadows or floating card effect.** Shadow should be almost invisible (`0 10px 30px rgba(20,20,20,0.04)`).
- **Do NOT constrain `.faq-list` with `max-width`.** Each `.faq-card` gets its own `max-width: 840px`. The section spans full container width to avoid "凹进去" visual mismatch with other sections.
- **Answers must be concise.** Split into short paragraphs (2-3 lines each). Use `<strong>` for key numbers and technical terms.
- **Never leave visible FAQ without corresponding JSON-LD.** Always add/update both together.

## Pattern: Homepage Hero (Banner)

The Hero is the first thing B2B buyers see. It must communicate **system completeness**, not just product features.

### Copy Structure (AIDA: Attention)

| Element | Rule | Example |
|---------|------|---------|
| H1 Line 1 | Product category + voltage | `Complete 48V Magnetic Track Lighting` |
| H1 Line 2 | Target application | `for Modern Interior Projects` |
| **Exactly 2 lines** on desktop | Use `<br>` for line break | No 3-line wrapping |
| Subtitle | Components + application list | `Tracks, magnetic modules, drivers and accessories matched as one 48V system — for residential, retail, office, hotel and showroom projects.` |
| SEO note | Include application keywords | villas/apartments → `residential, retail, office, hotel, showroom` |

### CTA Buttons
- Primary: `Get a Quotation →` (gold `btn-gold`)
- Secondary: `View System →` (ghost `btn-ghost`)
- Spacing: `gap: 16px`, `padding: 16px 36px`, `margin-bottom: 44px`

### Trust Pills (Banner Tags)
Style: **Glass morphism pills** — not solid background tags.

```css
.hero-pills {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  flex-wrap: nowrap;  /* desktop: one line */
  margin-top: 28px;
}
.hero-pill {
  display: inline-flex; align-items: center; justify-content: center;
  white-space: nowrap;
  padding: 8px 16px; border-radius: 999px;\n  font-size: 12.5px; font-weight: 700; line-height: 1;\n  color: #ffffff;\n  background: rgba(255, 255, 255, 0.16);\n  border: 1px solid rgba(255, 255, 255, 0.42);\n  backdrop-filter: blur(6px);\n  -webkit-backdrop-filter: blur(6px);
}
.hero-pill:hover {
  background: rgba(198, 156, 93, 0.22);
  border-color: rgba(198, 156, 93, 0.72);
}
```

Mobile (≤920px): `.hero-pills { flex-wrap: wrap; }`

⚠️ **Critical**: Keep pills to **3 items max** to fit on one line. Each should be short: `20 / 23 / 35mm Systems` / `Complete 48V System` / `OEM / ODM Ready`. Do NOT include certification labels (CE, RoHS) as top-level trust signals — they belong in the product detail, not the hero.

### Hero Spacing (Breathing Room)
- `.hero-content max-width`: `880px` (wider = more premium feel, ensures 2-line title display)
- `.hero-content padding`: `120px 0` (not 100px — more vertical breathing room)
- `.hero h1` must have `max-width: 800px; margin: 0 auto` — without this, the title may wrap into 3 lines on some viewport sizes. **User insisted on exactly 2 lines.**
- `.hero h1 line-height`: `1.2` (experimented with 1.15 but 1.2 was more natural)
- `.hero-sub max-width`: `720px` (wider than 680px to match wider container)
- `.hero-sub margin`: `32px auto 36px` (abundant spacing between elements)
- Gradient overlay: `rgba(0,0,0,.78)` left → `rgba(0,0,0,.06)` right (deeper tone)

## Pattern: Why Section (AIDA: Interest/Desire)

Use a **split layout**: left = strong statement + pain point framing, right = issue/solution cards.

### Structure

```html
<section id="why" style="background:white;">
  <div class="container">
    <div class="section-head">
      <div class="section-kicker">Why Tracklinear</div>
      <h2>Why Project Buyers Work With Tracklinear</h2>
      <p>Magnetic track lighting requires more than choosing a rail or a light module. We help buyers match the full system before ordering.</p>
    </div>
    <div class="why-split">
      <!-- Left -->
      <div class="why-left">
        <div class="why-statement">We reduce system-matching risk before production.</div>
        <div class="why-desc">Before quotation, we help check track type, module wattage, driver capacity, control method and accessories — so buyers receive a complete system instead of mismatched components.</div>
        <div class="why-tags">
          <span class="why-tag">Track + Module Matching</span>
          <span class="why-tag">Driver + Control Matching</span>
          <span class="why-tag">OEM / Project Support</span>
        </div>
      </div>
      <!-- Right: 5 issue cards -->
      <div class="why-right">
        <div class="issue-card">
          <div class="issue-num">01</div>
          <div class="issue-body">
            <div class="issue-title">System Compatibility</div>
            <div class="issue-desc">Track width, conductor position, module structure and accessories are checked as one system.</div>
          </div>
        </div>
        <!-- Repeat for 02-05 -->
      </div>
    </div>
  </div>
</section>
```

### Left Column Rules
- **Strong statement**: Large bold text, `max-width: 420px`
- **Description paragraph**: `15px`, `line-height: 1.75`, `color: #4b4b4b` (not `#5a5a5a` — user wanted slightly darker for readability), `max-width: 440px`, `margin-bottom: 28px` — adds information density so left side isn't sparse
- **Tags**: Dark background with gold text, `border-radius: 999px`, small `12px` font, `gap: 10px` between tags. Tags can be **removed entirely** if user says "删除黑色标签" — they go below the image if present.
- **Headline style**: Start with a verb, NOT "We" — e.g. "Reduce system-matching risk before production." not "We reduce...". This sounds more like an international B2B brand section headline.
- **User-requested restructure (evolved layout)**: The Why left column can be restructured from `statement → desc → tags` to `statement → desc → [product image]` with tags removed. Image sits below desc with `margin-top: 20px`, uses `height: auto` natural flow (NOT `object-fit: cover`). When user says "拉大一些" → remove vertical margins, keep only `margin-top: 20px` above image.
- **Height alignment with right column**: When user wants the image height to match the right column (5 cards), change `why-split` to `align-items: stretch` and `why-left` to `display: flex; flex-direction: column; height: 100%`. Then `why-img-wrap` gets `flex: 1; min-height: 120px` and `.why-img-wrap img` gets `height: 100%; object-fit: cover`. This makes the image fill the remaining left column height, matching the right column's visual weight.

### Image Color Tuning (for brand palette matching)

When user uploads a product photo that doesn't match the warm architectural palette (#f5f3ef, #b88746 gold):

```python
from PIL import Image, ImageEnhance
import numpy as np

img = Image.open('input.webp')

# Step 1: Reduce saturation (remove orange cast)
enhancer = ImageEnhance.Color(img)
img = enhancer.enhance(0.75)

# Step 2: Brighten to match light bg
enhancer = ImageEnhance.Brightness(img)
img = enhancer.enhance(1.08)

# Step 3: Color shift — reduce red, increase blue for cleaner warmth
arr = np.array(img).astype(np.float32)
arr[:,:,0] *= 0.92  # reduce red
arr[:,:,1] *= 0.96  # slightly reduce green
arr[:,:,2] *= 1.08  # increase blue
arr = np.clip(arr, 0, 255).astype(np.uint8)

img = Image.fromarray(arr)
img.save('output.webp', 'WEBP', quality=88)
```

**When to tune**: The image has R-channel ratio > 0.38 (too warm/orange) AND the brand palette is clean warm (R~0.36, G~0.34, B~0.30). The target is a clean warm feel — not cold/clinical, not overly orange.

### Right Column Rules
- **5 horizontal cards**, stacked with `gap: 12px`
- Card background: `#f7f5f1` (NOT `var(--bg)` — explicit value matches warm palette)
- Card border: `1px solid rgba(0,0,0,.05)` (very light)
- Card shadow: `box-shadow: 0 8px 24px rgba(20,20,20,.05)` (barely visible)
- Hover: `translateY(-2px)` + gold border `rgba(184, 135, 70, 0.35)` + shadow `0 10px 24px rgba(0,0,0,.05)` — **upward motion, not sideways**. Light, refined touch.
- Number: `width: 36px`, `font-size: 13px`, `font-weight: 800`, gold `#b88746`
- Title: `16px`, `font-weight: 700`, `#111` — use **noun-phrase titles** like `System Compatibility`, `Driver & Control Matching`, `Installation Method Fit`, `Project Scene Matching`, `OEM / Distributor Support`
- Description: `14px`, `line-height: 1.65`, `#5a5a5a`

### CSS

```css
.why-split {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 48px;
  align-items: start;
}
.why-left { position: sticky; top: 100px; }
.why-statement {
  font-size: clamp(22px, 2.8vw, 30px);
  font-weight: 700; line-height: 1.3; letter-spacing: -.03em;
  color: var(--dark); margin-bottom: 18px; max-width: 400px;
}
.why-desc {\n  font-size: 15px; line-height: 1.7; color: #4b4b4b;\n  margin-bottom: 28px; max-width: 440px;\n}
.why-tags { display: flex; flex-wrap: wrap; gap: 8px; }
.why-tag {
  display: inline-block; background: var(--dark); color: #f1d1a2;
  border-radius: 999px; padding: 7px 16px;
  font-size: 12px; font-weight: 700; letter-spacing: .03em;
}
.why-right { display: flex; flex-direction: column; gap: 12px; }
.issue-card {
  display: flex; align-items: flex-start; gap: 20px;
  background: #f7f5f1; border: 1px solid rgba(0,0,0,.05);
  border-radius: 18px; padding: 20px 24px;
  transition: all .3s ease;
}
.issue-card:hover {\n  transform: translateY(-2px);\n  border-color: rgba(184, 135, 70, 0.35);\n  box-shadow: 0 10px 24px rgba(0,0,0,.05);\n}
.issue-num {
  flex-shrink: 0; width: 36px;
  font-size: 13px; font-weight: 800; color: #b88746; letter-spacing: .08em;
}
.issue-body { flex: 1; }
.issue-title { font-size: 16px; font-weight: 700; color: #111; margin-bottom: 3px; }
.issue-desc { font-size: 14px; line-height: 1.65; color: #5a5a5a; }
```

### Why Section Responsive
At `max-width: 920px`: `.why-split { grid-template-columns: 1fr; }` — stack left above right. Remove sticky on left (or keep, but left becomes less important).

### Prevents the "empty left side" problem
Always pair the strong statement with a descriptive paragraph (`why-desc`) so the left column has enough visual weight against 5 cards on the right.

## Pattern: How It Works Section (4-Step Process Flow)

Use this on the homepage (or as a standalone section) to show B2B buyers the project workflow. It reduces uncertainty by making the procurement process concrete.

### Section Structure

```html
<section id="process">
  <div class="container">
    <div class="section-head">
      <div class="section-kicker">How It Works</div>
      <h2>From Project Requirement to Matched 48V System</h2>
      <p>Share your ceiling condition, project scene, track length and control preference. We help match the suitable tracks, modules, drivers and accessories before quotation.</p>
    </div>
    <div class="steps-grid">
      <div class="step-card">
        <div class="step-num-wrap">
          <span class="step-num">01</span>
          <div class="step-line"></div>
        </div>
        <div class="step-body">
          <div class="step-icon">📋</div>
          <h3>Share Project Details</h3>
          <p>Project type, ceiling condition, layout size and preferred installation method.</p>
        </div>
      </div>
      <!-- Repeat for 02-04 with step-line (last card omits the line) -->
    </div>
  </div>
</section>
```

### Card Walkway (step sequence)

Each card = one numbered step in the procurement flow. Max 4 cards.

| Step | Title | Content Focus |
|------|-------|---------------|
| 01 | Share Project Details | Project type, ceiling condition, layout, installation method |
| 02 | Choose Track System | 20/23/35mm options for different applications |
| 03 | Match Modules & Drivers | Spotlights, grille, flood, pendant + 48V drivers by wattage/control |
| 04 | Receive System Quotation | Complete system pricing — track + modules + drivers + connectors |

### Design Rules

- 4-column grid on desktop: `grid-template-columns: repeat(4, 1fr); gap: 20px`
- Cards: white background, `border-radius: 24px`, `padding: 32px 28px`
- Each card gets a **number circle** (dark bg, gold text, 36px) + a **connector line** (1px grey) to the right, creating visual flow
- The **last card** has no connector line (``.step-card:last-child .step-line { display: none; }``)
- Icon box below the number: `44px × 44px`, dark bg, gold, `border-radius: 14px`
- Hover: `translateY(-3px)` + soft shadow + gold border edge

### CSS

```css
.steps-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}
.step-card {
  background: white; border-radius: 24px; padding: 32px 28px;
  border: 1px solid rgba(0,0,0,.04);
  box-shadow: 0 8px 24px rgba(0,0,0,.04);
  transition: all .3s ease;
  display: flex; flex-direction: column;
}
.step-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 16px 40px rgba(0,0,0,.08);
  border-color: rgba(176,138,87,.15);
}
.step-num-wrap { display: flex; align-items: center; gap: 12px; margin-bottom: 24px; }
.step-num {
  flex-shrink: 0; width: 36px; height: 36px; border-radius: 50%;
  background: var(--dark); color: #f1d1a2;
  display: flex; align-items: center; justify-content: center;
  font-size: 13px; font-weight: 800; letter-spacing: .04em;
}
.step-line { flex: 1; height: 1px; background: rgba(0,0,0,.08); }
.step-card:last-child .step-line { display: none; }
.step-body { flex: 1; }
.step-icon {
  width: 44px; height: 44px; border-radius: 14px;
  background: var(--dark); color: var(--gold-light);
  display: grid; place-items: center; font-size: 18px; margin-bottom: 20px;
}
.step-body h3 { margin: 0 0 8px; font-size: 18px; color: var(--dark); }
.step-body p { color: #5a5a5a; line-height: 1.6; font-size: 14px; margin: 0; }
```

Responsive: at ≤920px, `.steps-grid { grid-template-columns: 1fr; }` — cards stack vertically.

## B2B FAQ Content Pipeline (Tracklinear-specific)

When the user says "I'm new to the industry, I don't know what customers ask" — use this pipeline:

### Step 1: Research Real B2B Questions
- Delegate 3-4 parallel search tasks, one per product (20mm, 23mm, 35mm, flood)
- Search for: "People Also Ask" data, competitor FAQ pages, industry forum questions
- Target: questions that **only make sense for that specific product** (e.g. 20mm → voltage drop limits, 35mm → pendant weight capacity)
- Filter out: generic industry FAQs (color finishes, beam angle definitions, basic dimming questions)

### Step 2: Draft FAQ (3 per product max)
Each question must pass all three tests:
1. **B2B search intent** — is this something an importer/contractor/specifier would Google?
2. **Product specificity** — can another product answer the same question? If yes, rewrite.
3. **Concrete data** — does the answer include specific numbers (wattage, quantity, dimensions)?

### Step 3: Build Visible FAQ + JSON-LD
- Add **both** visible accordion section (see FAQ Accordion Component above) AND FAQPage schema
- Visible content and JSON-LD `acceptedAnswer.text` must be **identical**
- Use `<strong>` for key numbers and technical terms

### Step 4: User Review & Iteration
Expected user corrections:
- Wording adjustments (user has strong voice preferences)
- Content accuracy (user may correct technical details)
- "Too generic" — rewrite to be even more specific to that product

### ⚠️ Common Pitfalls on First Pass
| Mistake | Correct Approach |
|---------|-----------------|
| Writing questions that work for any track product | Make each question unique to its track width/module type |
| Answering with generic industry knowledge | Include specific Tracklinear specs: wattage limits, magnetic retention kg, conductor pitch |
| Only adding JSON-LD (invisible) | Always add **visible** FAQ section AND JSON-LD |
| Long single-paragraph answers | Split into 2 short paragraphs with `<strong>` on key data |
| Wrapping images in dark `.img-panel` divs | **User hates black borders/frames on images.** Insert images naturally — just `<img>` with `border-radius` and `box-shadow` at most. NO `background: #111`, no dark wrappers, no thick borders. Image should appear to float naturally on the page background. |
| Using `object-fit: contain` when user wants image to match column height | Use `object-fit: cover` on `.system-img img` with flex container. For Why section images, use `height: auto` natural flow — don't force-fit. |
| Saving uploaded images without processing | Always convert to WebP quality 85, rename semantically (`why-product.webp`, `20series-system.webp`), add proper `width`/`height` attributes.

## Pattern: Complete System Section (#system)

See `references/homepage-design-patterns.md` → **Complete System Section (#system)**

The #system section uses a **split layout**: left = full product combination image, right = section title/subtitle + 4 numbered category items with descriptions.

Key rule: This is an **informational (Desire stage)** section — no CTA, no card backgrounds, no section-kicker. The visual weight comes from the image + clean structured text list.

### ⚠️ Layout Proportions (user-approved June 2026)

```
grid-template-columns: 52% 1fr  (left image = 52%, right text = ~40%)
gap: 80px
image min-height: 520px
```

This makes the image feel like "系统主视觉 / system hero visual", not a side illustration. The user explicitly wants the image to have **visual presence**.

### Item Structure: Label + Description

Each item now has a **label** (bold, 18px) + **description** (14px, #6a6a6a). No more `.system-dot`.

```html
<div class="system-item">
  <span class="system-num">01</span>
  <div class="system-body">
    <span class="system-label">Track Rails</span>
    <span class="system-desc">Surface, recessed and trimless options.</span>
  </div>
</div>
```

CSS:
```css
.system-body { flex: 1; }
.system-label { font-size: 18px; font-weight: 600; color: var(--text); display: block; margin-bottom: 4px; }
.system-desc { font-size: 14px; line-height: 1.55; color: #6a6a6a; }
.system-item { display: flex; align-items: flex-start; gap: 14px; padding: 18px 0; border-bottom: 1px solid rgba(0,0,0,.06); }
.system-num { font-size: 13px; font-weight: 800; color: var(--gold); letter-spacing: .06em; min-width: 28px; padding-top: 1px; flex-shrink: 0; }
```

### ⚠️ Image height matching text column

When the user asks "make image height match the text column height", do NOT use `height: auto` + `object-fit: contain`. Instead:

```css
.system-img {
  display: flex;
  height: 100%;
  min-height: 520px;
}
.system-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 24px;
  box-shadow: 0 20px 60px rgba(0,0,0,.1);
}
```

This uses the Grid layout's `align-items: center` (already set on `.system-layout`) to make both columns equal height, and `object-fit: cover` crops the image to fill the container. ⚠️ Tell the user the image may crop — ask if they want to adjust `object-position` if a key part gets cut off.

### Mobile (≤768px)
- Stack to single column: image on top, text below
- `grid-template-columns: 1fr; gap: 40px`

## Pattern: Product Page Section Hierarchy

On a product page (track/light), the section order below the main content is:

1. Product specifications table / features
2. Installation options (if applicable)
3. FAQ section
4. Contact section
5. Footer

FAQ goes **before** Contact, after all product-specific explainer content.
