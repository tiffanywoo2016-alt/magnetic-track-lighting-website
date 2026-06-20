# B2B CTA Checklist Pattern

> Captured from Blog 8 session (2026-06-18). User rejected generic "Contact us" and specified a project-checklist CTA pattern for comparison/decision-style blog posts.

## Core Pattern

For comparison-style articles (product A vs product B, decision guides, application guides), the CTA should:

1. **Ask a question matching the article's topic** — re-engages the reader's need
2. **List specific items the buyer should prepare** — reduces friction ("what do I need to send?")
3. **Describe the deliverable** — what will happen after they contact

### HTML Template

```html
<div class="cta-box">
  <h3>Need to Choose Between {Topic A} and {Topic B} for Your Project?</h3>
  <p>Send us:</p>
  <ul style="color: rgba(255,255,255,0.7); font-size: 15px; line-height: 2; padding-left: 20px; margin-bottom: 20px;">
    <li>Project type</li>
    <li>Ceiling type</li>
    <li>Track length</li>
    <li>Preferred installation method</li>
    <li>Quantity</li>
    <li>Dimming requirement</li>
  </ul>
  <p style="color: rgba(255,255,255,0.85); font-size: 16px; margin-bottom: 16px;">Our team will help you match the track, magnetic light modules, drivers and accessories as one complete system.</p>
  <a href="mailto:info@tracklinear.com?subject=Track%20System%20Inquiry" class="btn">Contact Us →</a>
</div>
```

### The 6-Item Checklist (User-Approved)

These 6 items apply to track lighting project inquiries:

| # | Item | Why |
|---|------|-----|
| 1 | Project type | Retail/hotel/villa/warehouse — sets the context |
| 2 | Ceiling type | Concrete/drywall/wood — determines mounting approach |
| 3 | Track length | Determines driver sizing and number of modules |
| 4 | Preferred installation method | Surface/recessed/trimless — affects track profile choice |
| 5 | Quantity | Budget and MOQ context |
| 6 | Dimming requirement | DALI/0-10V/TRIAC/none — affects module selection |

### Customizing for Different Article Types

- **Driver-focused article**: Replace checklist items with "Module type (with/without driver)", "Dimming protocol", "LED chip count"
- **Installation guide**: Replace with "Ceiling material", "Existing wiring", "Track layout (L/T/I)"
- **Retail-specific**: Replace with "Ceiling height", "Display layout frequency", "Lighting zones"

### CTA Title Formula

Match the CTA title to the article's primary buyer intent:

| Article Type | CTA Title |
|-------------|-----------|
| Comparison (X vs Y) | "Need to Choose Between {X} and {Y} for Your Project?" |
| Technical deep-dive | "Looking for a {Product} Supplier?" |
| Application guide | "Planning a {Venue} Project?" |
| Product feature | "Need {Product} Specs for Your Next Project?" |

### Do NOT Use

- ❌ Generic "Contact us for more information"
- ❌ "Get a quote" — this is early-stage B2B content; quoting is premature
- ❌ "Learn more" — too vague, no urgency
- ❌ Paragraph-only CTA with no list — reduces conversion by making the reader guess what to send

### When to Use

This CTA pattern is for **decision/selection** articles where the reader is evaluating options. For case studies or experience stories, use the factory-visit CTA pattern ("Come visit our factory or contact us for a detailed spec comparison").
