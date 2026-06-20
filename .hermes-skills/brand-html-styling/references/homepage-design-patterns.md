# Homepage Design Patterns (Tracklinear)

## Section Order (AIDA)

| Section | ID | Purpose | AIDA Stage |
|---------|----|---------|------------|
| 1. Hero / Banner | (inline) | Attention — value prop + trust pills | Attention |
| 2. Why Tracklinear | `#why` | Interest/Desire — pain points + solutions | Interest → Desire |
| 3. Complete System | `#system` | Desire — product categories overview, left=image right=4 items | Desire |
| 4. Installation | `#installation` | Desire — technical capability | Desire |
| 5. Modules | `#modules` | Desire — module type options | Desire |
| 6. Optics | (optics-section) | Desire — technical depth | Desire |
| 7. Applications | `#applications` | Desire — use case evidence | Desire |
| 8. Blog Preview | `#blog-preview` | Conviction — thought leadership | Conviction |
| 9. FAQ | `#faq` | Conviction — answer objections | Conviction |
| 10. OEM | `#oem` | Action — OEM capability | Action |
| 11. Contact | `#contact` | Action — inquiry form | Action |

## Hero Pill Copy Guidelines

Keep pills to **3 items max**. First pill = track width options (most specific), second = system completeness, third = OEM readiness.

Correct examples:
- `20 / 23 / 35mm Systems` / `Complete 48V System` / `OEM / ODM Ready`
- `20 / 23 / 35mm Systems` / `Complete 48V System` / `OEM / ODM Support`

Incorrect:
- `13+ Years` / `Complete System` / `CE & RoHS` / `OEM/ODM Support` (too many, wrong priority)
- `Tracks + Modules + Drivers` (too generic, overlaps with subtitle)

## Why Section: Title Evolution

The section headline went through 3 iterations:
1. ❌ `We don't just supply components — we match your project.` (too markety)
2. ❌ `We reduce system-matching risk before production.` (starts with "We" — user wants international B2B style)
3. ✅ `Reduce system-matching risk before production.` (starts with verb, no "We")

## Complete System Section (#system)

The #system section follows a **Split Layout** pattern: left = full product combination image, right = titled copy + 4 numbered category items with descriptions.

### Purpose
Unlike the old "Complete System" copy that said "Everything works together from one source.", the new pattern delivers a more concrete pitch:

> **Title**: "Complete 48V Magnetic Track Lighting System"
> **Subtitle**: "Track rails, magnetic modules, 48V drivers and accessories are matched together to reduce installation mismatch."

The goal is: the buyer scans the image on the left, sees rail + spot + grille + linear + pendant + driver + accessories, and immediately understands "this supplier sells the whole system, not just lights." No lengthy text required.

### Layout Structure (user-approved June 2026)

```
┌───────────────────────────────────┬─────────────────────────────┐
│                                   │  Complete 48V Magnetic Track │
│   [Product Combo Image]           │  Lighting System             │
│   (52% width, min-height 520px)   │                              │
│   object-fit: cover               │  Track rails, magnetic       │
│                                   │  modules, 48V drivers and    │
│                                   │  accessories are matched...  │
│                                   │                              │
│                                   │  01  Track Rails             │
│                                   │      Surface, recessed and   │
│                                   │      trimless options.       │
│                                   │  02  Magnetic Modules        │
│                                   │      Spot, grille, flood...  │
│                                   │  03  48V Drivers             │
│                                   │      Matched by wattage...   │
│                                   │  04  Connectors & Accessories│
│                                   │      Power feeds,connectors  │
└───────────────────────────────────┴──────────────────────────────┘
```

### HTML Structure

```html
<section id="system">
  <div class="container">
    <div class="system-layout">
      <div class="system-img">
        <img alt="..." src="images/20series-system.webp"
             width="1200" height="675"
             loading="lazy" decoding="async" />
      </div>
      <div class="system-right">
        <h2 class="system-title">Complete 48V Magnetic Track Lighting System</h2>
        <p class="system-sub">Track rails, magnetic modules, 48V drivers and accessories are matched together to reduce installation mismatch.</p>
        <div class="system-items">
          <div class="system-item">
            <span class="system-num">01</span>
            <div class="system-body">
              <span class="system-label">Track Rails</span>
              <span class="system-desc">Surface, recessed and trimless options.</span>
            </div>
          </div>
          <!-- Repeat for 02-04 with descriptions -->
        </div>
      </div>
    </div>
  </div>
</section>
```

### CSS

```css
.system-layout {
  display: grid;
  grid-template-columns: 52% 1fr;
  gap: 80px;
  align-items: center;
}
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
.system-title {
  font-size: clamp(28px, 3vw, 38px);
  letter-spacing: -.04em;
  line-height: 1.08;
  margin: 0 0 16px;
}
.system-sub {
  font-size: 16px; line-height: 1.7;
  color: var(--muted);
  margin: 0 0 40px;
  max-width: 480px;
}
.system-items { display: flex; flex-direction: column; gap: 0; }
.system-item {
  display: flex; align-items: flex-start; gap: 14px;
  padding: 18px 0;
  border-bottom: 1px solid rgba(0,0,0,.06);
}
.system-item:last-child { border-bottom: none; }
.system-num {
  font-size: 13px; font-weight: 800;
  color: var(--gold);
  letter-spacing: .06em;
  min-width: 28px;
  flex-shrink: 0;
  padding-top: 1px;
}
.system-body { flex: 1; }
.system-label {
  font-size: 18px; font-weight: 600;
  color: var(--text);
  display: block;
  margin-bottom: 4px;
}
.system-desc {
  font-size: 14px;
  line-height: 1.55;
  color: #6a6a6a;
}
```

### Design Rules

- **Left column**: 52% width, min-height 520px, image uses object-fit: cover (may crop — warn user)
- **Right column**: Title → subtitle → 4 items with description under each label
- **4 items**: Each has gold number + bold label (18px) + grey description (14px)
- **Separators**: `border-bottom: 1px solid rgba(0,0,0,.06)` between items, none on last
- **No background fill** on items — clean, minimal, architectural
- **No CTA** in this section — it's informational (Desire stage), not action

### Mobile (≤768px)
- Stack to single column: image on top, text below
- `grid-template-columns: 1fr; gap: 40px`
- Reduce section padding from 120px to 80px

## Why Section: Left Side Gap

The #why section's left column (`why-left`) can look sparse when paired with 5 right-side cards. If the user notes "左下角空" (bottom left empty), add a product image below the statement/description area.

### Evolved Layout (as of June 2026)

The left column has been restructured through user feedback:

```
Reduce system-matching risk before production.
Before quotation, we help check track type, module wattage,
driver capacity, control method and accessories.
[场景图 — 自然显示 height: auto, margin-top: 20px, border-radius: 20px]
```

Tags (dark pills) were removed per user request ("删除黑色标签").

### HTML
```html
<div class="why-left">
  <div class="why-statement">Reduce system-matching risk before production.</div>
  <div class="why-desc">Before quotation, we help check track type, module wattage, driver capacity, control method and accessories.</div>
  <div class="why-img-wrap">
    <img alt="..." src="images/why-product.webp" width="1448" height="1086" loading="lazy" decoding="async" />
  </div>
</div>
```

### CSS (natural flow — no height stretching)
```css
.why-left { position: sticky; top: 100px; }
.why-img-wrap {
  border-radius: 20px;
  overflow: hidden;
  margin-top: 20px;
}
.why-img-wrap img {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 20px;
}
```

### Height alignment with right column (when user requests it)
Change to stretch layout:
```css
.why-split { align-items: stretch; }
.why-left {
  position: sticky; top: 100px;
  display: flex; flex-direction: column; height: 100%;
}
.why-img-wrap { flex: 1; border-radius: 20px; overflow: hidden; margin-top: 20px; min-height: 120px; }
.why-img-wrap img { width: 100%; height: 100%; object-fit: cover; display: block; border-radius: 20px; }
```

### Image Requirements
- User uploads product scene/component photos (often PNG 1448×1086)
- Save as WebP (quality 85-88) into `images/` directory
- File naming: `why-product.webp`
- **No dark background/border wrapping** — insert naturally with just `border-radius: 20px`
- **Image color tuning**: If image R-channel ratio > 0.38 (too warm/orange), desaturate to 75%, brighten 1.08x, shift R*0.92 G*0.96 B*1.08 for cleaner warmth matching brand palette

## General Design Rules

- **Gold is an accent only.** Never use gold as background or primary title color.
- **Do NOT put CE/RoHS in hero trust pills.** Certifications are trust-builders, not first-impression triggers.
- **Maintain consistent section spacing.** All sections: `padding: 96px 0`. Section head bottom margin: `56px`.
- **Keep section backgrounds = `white` for About/Why, `#f7f5f1` for section backgrounds, `var(--dark)` for feature highlights.**
- **When converting card-grid to split-list layout**: Delete `section-head` wrapper; replace with inline title+sub+items inside a div. Compare layout widths (image: 1200×900 is horizontal — good for left column; don't use a vertical 900×1200 image in this layout).
- **Image insertion: NEVER wrap images in dark containers.** User explicitly hates black borders/frames. Just `<img>` with `border-radius` and at most `box-shadow`.
