# B2B FAQ Content Methodology

How to source and write FAQ content that B2B buyers actually search for.

## Core Principle

**B2B FAQs answer procurement/decision questions, not product questions.**

A product FAQ asks "Does it support smart control?" A B2B FAQ asks "What certifications do you have?" The difference is the buyer's intent: the first assumes they've already decided to buy; the second helps them decide whether to consider you.

## Sourcing Methodology

### Step 1: Google "People also ask" + autocomplete
- The user can search from their browser (the agent's server can't access Google directly in China)
- Ask the user to search these terms in incognito/private mode and screenshot:
  - `magnetic track lighting` — see "People also ask" section
  - `magnetic track lighting commercial`
  - `magnetic track lighting supplier`
  - `magnetic track lighting installation`
  - `LED track lighting wholesale`
  - Scroll to bottom of search results for "Related searches"
- **B2B-relevant questions** from actual Google data for this product (confirmed 2026-06-13):
  - "What is the difference between track lighting and magnetic track lighting?"
  - "What is a 48V magnetic track lighting system?"
- **B2C questions to filter out**:
  - "Does magnetic track lighting get hot?" (consumer worry)
  - "Can I use 24V LED on 48V track?" (DIY question)
  - "Which magnetic track is best?" (too vague)

### Step 2: Filter through the buyer's decision chain
Ask: "Would a procurement manager/architect/contractor search this before buying?"

**High-value B2B question categories** (confirmed with user):
1. **Certification & compliance** — CE, RoHS, UL, ETL
2. **Commercial viability** — MOQ, sample policy, lead time
3. **Customization** — custom track lengths, color finishes, OEM
4. **Product differentiation** — 20mm vs 23mm vs 35mm, what's different from competitors
5. **Safety for commercial use** — 48V ELV classification

### Step 3: Write answers that a buyer can act on
- Don't just describe — tell them what to expect
- Include specific numbers (3-7 days, 20-30 days, CE/RoHS)
- Always end with a next step ("

## FAQ vs Blog Boundary — Blog FAQ Must Be B2B (CRITICAL — corrected 2026-06-19)

When writing an FAQ section inside a blog article (at the bottom, just before CTA), every question must pass the B2B test: "Would a **project decision-maker** search this?" NOT "Would a homeowner/DIY shopper ask this?"

### ✅ Good Blog FAQ Questions (B2B Decision-Maker Level)

- "Does surface-mounted track lighting work on a concrete ceiling with no drop ceiling?" — installation feasibility for a specifier
- "Which installation method has the lowest labor and material cost?" — budget planning for contractor/project manager
- "Can the same track profile be used for recessed, trimless and surface installation?" — procurement decision, supply chain concern
- "For a hotel project with multiple ceiling types, can we mix surface and recessed in different zones?" — project-level design question

### ❌ Bad Blog FAQ Questions (Consumer Level — DO NOT USE)

- "Is it safe?" — no serious B2B buyer asks this about 48V low-voltage
- "Can I add it after the ceiling is finished?" — consumer renovation question
- "What is the difference between recessed and trimless?" — too basic for professional
- "Which is best for my home?" — not a B2B question at all

### Detection Rule

If a FAQ question could be answered by reading a product description on Amazon or any e-commerce site → it's consumer-level. Discard.

If a FAQ question requires knowledge of construction phases, supply chain logistics, project budgeting, multi-zone coordination, or contractor qualification → it's B2B-level. Keep.

### How This Was Learned

Blog 9's FAQ was flagged by the user as "C端客户问的问题" (consumer-level questions). The original 4 questions were replaced with B2B questions about concrete ceiling compatibility, labor cost comparison, track profile interoperability, and mixed-installation hotel projects. All 4 replacements passed user review.

### Blog FAQ vs Product Page FAQ — Different Domains

| Blog FAQ topic (article about installation methods) | Product FAQ topic (product page for a track) |
|------------------------------------------------------|-----------------------------------------------|
| "Can same track profile be used for all 3 methods?" | "Does 20mm track support DALI dimming?" |
| "Which installation has lowest labor cost?" | "What is the max load for a 10m run?" |
| "Can we mix surface + recessed in different hotel zones?" | "Are 20mm tracks from different brands interchangeable?" |

Blog FAQ = decision guidance (which method/path to choose)
Product FAQ = specification clarity (what this product can do)

## Structure Template for Each FAQ Item

```html
<div class="faq-item">
  <h3>Question?</h3>
  <p>Answer with <strong>key terms bolded</strong>. Include specific numbers. End with a clear outcome or next step.</p>
</div>
```

## Schema.org Markup Template

```json
{
  "@type": "Question",
  "name": "Question text?",
  "acceptedAnswer": {
    "@type": "Answer",
    "text": "Concise answer text."
  }
}
```

## When Writing New FAQ Content

1. **Ask the user first**: "What questions do your clients actually ask you?" — real client questions are worth 10x Google data
2. **If user is new to the industry** (this user started recently): rely on competitor FAQ analysis + Google data
3. **Filter through the personal-brand lens**: Since this site is a personal project (not a factory), avoid questions that imply factory ownership (e.g., "What is your production capacity?") — redirect those to neutral answers
4. **Review quarterly**: As the user gains real client experience, swap out Google-sourced questions for real ones

## Product-Specific FAQ Quality (2026-06-19)

**When adding FAQ to product pages, every question must pass this test:** "Would a real customer ask this specifically about THIS product, or could any lighting supplier answer it?"

### ✅ Product-specific FAQs (good)
- "How many LED fixtures can a single 20mm magnetic track run support without voltage drop?" — load planning, specific to 48V systems
- "Are 20mm magnetic tracks from different brands interchangeable with the same LED modules?" — inventory risk, specific to this track width
- "Does the 20mm track support DALI dimming or 0-10V control?" — control integration, commercial buyers need this
- "What is the maximum weight a 35mm magnetic track can support for pendant light installation?" — structural decision, only matters for 35mm
- "What is the difference between a flood module and a spot module on magnetic track?" — selection decision, buyer needs to choose
- "Does the flood module come with a built-in driver, or do I need a separate external driver?" — specification clarity

### ❌ Generic FAQs to avoid (these were deployed in error on 2026-06-18 and had to be replaced)
- "What color finishes do you offer?" — any track supplier
- "Can the track be cut to custom lengths?" — industry standard for all tracks
- "What is the beam angle?" — basic spec, not a buying decision
- "Where is a flood module best used?" — too vague, doesn't drive decision
- "Can flood modules be dimmed?" — yes/no not helpful without context
- "What track width options are available?" — not useful on a specific product page

### FAQ Answer Quality Standards (2026-06-19)

Every FAQ answer MUST include:
1. **Specific technical data** — wattage (150W/200W/300W per feed), weight (8-12kg retention), angles (60°/90°/120°), etc.
2. **Buyer decision context** — "For a wholesaler/contractor..." not "For general use..."
3. **Differentiation** — explain WHY your product handles this specific need
4. **Next step or CTA** — "Share your project layout with our engineering team"

Bad answer example (generic):
> "The load capacity depends on the driver power, track length and module wattage. Contact us for a load calculation."

Good answer example (specific):
> "For runs up to 10 meters, a single feed supports up to 150W (roughly 6-8 standard spot modules). For longer runs exceeding 15 meters or higher load requirements, we recommend mid-point power feeds. Share your project layout with our engineering team."

### B2B Buyer Question Dimensions (researched 2026-06-19)

Product FAQ questions cluster into 3 core dimensions that real B2B buyers search for:

| Dimension | Example Question | Applies To |
|-----------|-----------------|------------|
| **Load & Capacity** | "How many fixtures per circuit?" / "Max weight?" | All tracks |
| **Interoperability** | "Can I mix brands?" / "Standard footprint?" | 20mm, 23mm |
| **Control Integration** | "DALI? 0-10V? TRIAC?" | All products |
| **Selection Logic** | "20mm vs 23mm vs 35mm?" / "Flood vs Spot?" | Product comparisons |
| **Technical Specs** | "Built-in driver or external?" | Light modules |

When writing FAQ for a product, pick 2-3 of these dimensions that are most decision-critical for that product.

## Source Prioritization for FAQ Content (when user is new to the industry)

If user says "I don't know what B2B customers search for — you research it":

1. **Search Google for competitor FAQ pages** and real People Also Ask results
2. **Categorize results** into the 5 B2B dimensions above
3. **Filter out B2C/homeowner questions** (DIY installation, heat concerns, bulb replacement)
4. **Keep only questions where YOUR product gives a unique answer** — if the answer would be the same for any brand, it's not worth including
5. **Draft answers that position YOUR product's differentiators**, not generic industry facts

Real Google data patterns for magnetic track lighting B2B (researched 2026-06-19):
- Voltage drop / load per circuit — very common for 48V system buyers
- Cross-brand module compatibility — top concern for wholesalers/importers
- Dimming protocol support — essential for commercial specifiers
- Weight capacity for pendants — unique to 35mm track, frequently searched
- Beam angle selection logic — common for flood/spot decision

## Dual Implementation: JSON-LD + Visible UI (CRITICAL — learned 2026-06-19)

**The user expects FAQ to be VISIBLE on the page, not just in structured data.**

When adding FAQ to product pages, both components are required:

### Component 1: JSON-LD FAQPage (in `<head>`)
This is for Google Rich Results and AI search tools. Goes in the `<head>` section.

### Component 2: Visible FAQ Accordion (in `<body>`, near bottom before Contact section)
This is for users who scroll to the page. User said "页面上没有看到有什么改动" when only JSON-LD was added.

#### Visible FAQ HTML structure:

```html
  </main>

  <!-- FAQ Section -->
  <section class="faq-section">
    <div class="container">
      <div class="section-head">
        <div class="section-kicker">Frequently Asked Questions</div>
        <h2>Common Questions About [Product Name]</h2>
        <p>Answers for importers, contractors and lighting specifiers...</p>
      </div>
      <div class="faq-list">
        <div class="faq-item">
          <button class="faq-question" onclick="toggleFaq(this)">
            <span>Question text?</span>
            <span class="faq-icon">+</span>
          </button>
          <div class="faq-answer">
            <p>Answer text.</p>
          </div>
        </div>
        <!-- repeat for each FAQ item -->
      </div>
    </div>
  </section>

  <!-- Contact Section -->
```

#### CSS to add to `styles.css`:

```css
/* ===== FAQ Section ===== */
.faq-section {
  background: #f8f8f8;
  padding: 96px 0;
}
.faq-section .section-head {
  margin-bottom: 48px;
}
.faq-list {
  max-width: 820px;
  margin: 0 auto;
}
.faq-item {
  background: white;
  border-radius: 12px;
  margin-bottom: 12px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0,0,0,.04);
}
.faq-question {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  padding: 24px 28px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 17px;
  font-weight: 600;
  color: #111;
  text-align: left;
  line-height: 1.5;
  transition: background .2s;
}
.faq-question:hover {
  background: #f5f5f5;
}
.faq-icon {
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #eee;
  font-size: 18px;
  font-weight: 300;
  transition: transform .3s ease;
  color: #666;
}
.faq-item.open .faq-icon {
  transform: rotate(45deg);
  background: #c8a35c;
  color: white;
}
.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height .35s ease, padding .35s ease;
  padding: 0 28px;
}
.faq-item.open .faq-answer {
  max-height: 400px;
  padding: 0 28px 24px;
}
.faq-answer p {
  color: #555;
  font-size: 16px;
  line-height: 1.75;
  margin: 0;
}
```

#### JavaScript toggle function (add to page's existing `<script>` block):

```javascript
function toggleFaq(btn) {
  btn.parentElement.classList.toggle('open');
}
```

#### Placement: Insert between `</main>` and `<!-- Contact Section -->`.

#### Deduplication: `grep -c '\"@type\": \"FAQPage\"'` before adding — ensure only 1 FAQPage block exists.

#### Workflow for adding FAQ to a product page:
1. Add JSON-LD FAQPage in `<head>` (or update existing one — check first!)
2. Add visible FAQ accordion section in `<body>` near bottom
3. Add toggleFaq function to inline `<script>`
4. Add FAQ CSS to `styles.css`
5. **Verify both components are present** before commit

### Pitfall: Two-component forgetfulness
When the user says "add FAQ to product pages", the agent's instinct is to write JSON-LD only (because that's the Schema-markup task). This is wrong. The user checks the LIVE rendered page, not View Source. Without visible UI, the user will correctly say "没有看到改动". Always implement both components.

## History
Before adding FAQPage to any page:
1. `grep -c '\"@type\": \"FAQPage\"' product-page.html` — count existing FAQPage blocks
2. If count > 0: read the existing block, **merge** your new questions into it instead of adding a second block
3. If count == 0: safe to add new block
4. **Always verify after edit**: re-grep to confirm only 1 FAQPage block exists

**Pitfall:** If you add FAQ to two separate sessions without checking, you'll create duplicate FAQPage blocks. This happened to 20mm.html on 2026-06-18 (two FAQPage blocks: one with 3 specialized questions, one with 3 generic ones). Both were deployed until detected and fixed. Two FAQPage blocks on one page is invalid Schema.org.

### FAQ content source priority
1. Actual customer inquiries (best — ask user: "what do your clients ask?")
2. Product-specific differentiators (what makes YOUR product unique)
3. Selection/comparison answers (helps customer decide between options)
4. Industry-generic questions (lowest value — avoid if possible)

---

## History
- 2026-06-13: Initial methodology written.
- 2026-06-19: Added product-specific FAQ quality rules (user corrected: FAQ must be for HER product and HER customers, not generic industry questions).
- 2026-06-19: Added dual implementation pattern (JSON-LD + visible accordion) after user flagged invisible FAQ.
- 2026-06-19: Added Blog FAQ vs Product FAQ boundary. User flagged Blog 9 FAQ as consumer-level. Added B2B detection rule, good/bad example table, and domain-separation guide.
