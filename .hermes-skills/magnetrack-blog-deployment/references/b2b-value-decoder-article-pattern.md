# B2B "Value Decoder" Article Pattern

## When to Use This Pattern

This article type explains **why a product costs what it costs** by revealing a hidden technical differentiator that B2B buyers can't see on the surface. Use it when:

- The user asks "why do some products cost more than others?"
- The product has an invisible component that strongly affects performance/price
- The competition sells similar-looking products at lower prices
- The user wants to educate buyers on "what to look for" when comparing quotes

## Pattern Template

### Title Formula
`Same Product, Different Price — Why {Product A} Costs More Than {Product B}`

OR

`What You're Actually Paying For: The Hidden Component in {Product Category}`

### Structure

1. **Pain question** (lead paragraph): State the buyer's confusion directly. "If you've ever compared X from different suppliers, you've noticed this puzzling thing..."

2. **Reveal the hidden component** (section 1): Name the component explicitly. Not all products have it. Some do, some don't. This IS the price gap.

3. **Why it matters** (section 2): Explain the practical consequences with a side-by-side comparison:
   - With component → consistent quality, longer life, dimming, modularity
   - Without component → cheaper upfront, but limitations in X/Y/Z

4. **Specification checklist** (section 3): Give the buyer actionable specs to ask suppliers for — this builds trust and positions you as the knowledgeable partner.

5. **CTA**: "Need help selecting the right product? We provide spec sheets and BOM-level quotations."

### Required Formatting

- Use `<div class="compare-grid">` with two cards side by side (similar to the with-driver / without-driver comparison)
- Use a `<table class="spec-table">` for the specification checklist
- Use a `<div class="cta-box">` for the final CTA
- Hero image should be an exploded view or cross-section showing the hidden component
- A second illustration can use an analogy diagram (e.g., water pipe analogy for driver)
- A third image should show the product installed in a real project setting

### Examples

| Topic | Hidden Component | B2B Buyer Takeaway |
|-------|-----------------|-------------------|
| LED track modules | Built-in driver | Ask: does this module have an internal driver? What constant current? |
| (Future) | | |

## Validated Technical Fact (from Tracklinear Blog 7)

Not all magnetic track modules have built-in drivers:
- **Low/mid-end**: LED chip connects directly to 48V rail via simple resistor/current limiting — no driver
- **High-end/premium**: built-in driver for precision CC, dimming, overcurrent protection
- **Topology**: 220V mains → [track driver/PSU → 48V rail] → [module (either resistor OR built-in driver) → LED chip]
- The module WILL light up without a driver — just less consistently, shorter lifespan, no smooth dimming

> **CRITICAL: Do NOT fabricate installation differences.** Modules with and without built-in drivers have IDENTICAL physical installation — both clip into the same track, no external driver boxes, no extra wiring. The difference is internal electronics only: dimming capability, flicker, brightness consistency, and reliability.

> **How to frame the choice:** It's about the customer's market positioning and budget (premium vs cost-sensitive), NOT about project type (hotel vs retail vs office). A price-sensitive hotel project might choose no-driver; a quality-focused office might choose built-in driver — it depends on the buyer's priorities.

> Always verify technical accuracy of component explanations with the user before writing. The user's product knowledge exceeds yours on this.
