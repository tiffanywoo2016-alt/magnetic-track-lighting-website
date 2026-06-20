# GEO/AIO Quick Answer Summary Box Pattern

> Captured from Blog 8 optimization session (2026-06-18). This pattern makes articles more quotable by AI search engines (Google AI Overview, ChatGPT, Perplexity, etc.).

## The Problem

Standard blog intros are narrative — they set up context, tell a story, then reveal the answer. AI search engines extract short, direct answers. If the answer is buried 400 words into the article, AI may not cite it.

## The Solution: Quick Answer Summary Box

Insert a **dark-background summary box** immediately after the customer question/problem statement, before the detailed analysis begins. This box is AI-extractable and gives the direct answer in two bullet points.

### Placement (CRITICAL)

```
[Article image]
→ [Opening — story / data / question]
→ ✅ QUICK ANSWER BOX (insert here, 1st one)
→ [Detailed breakdown — sections, tables, scenarios]
→ [Comparison table]
→ ✅ QUICK ANSWER BOX (optional, 2nd one — summary after table)
→ [FAQ, CTA]
```

**NOT** before the customer question — that breaks the narrative flow. The reader needs to understand the question first, then see the answer, then get the detail.

**Multiple quick answers in one article:** If the article has a detailed comparison table, add a SECOND quick answer box AFTER the table to summarize the decision logic. This gives Google AI Overview a second extraction point. Do NOT add more than 2 per article.

### Quantity: 1-2 per article max

**User preference (est. 2026-06-19):** Only use 1-2 quick answer boxes per article. Do NOT add one after every section — that fragments attention and dilutes AI extraction quality.

Best positions:
- **Position 1 (mandatory):** After the opening hook, before detailed breakdown — Google grabs this as the AI Overview answer
- **Position 2 (optional):** After the comparison table, as a "so which one?" summary — useful for comparison articles with complex tables

### Standalone vs Embedded (Google Preference)

**Google AI Overview / SGE prefers standalone quick answers** — a visually distinct, self-contained block that AI can extract verbatim. Mixed into body text, the AI may only extract half a sentence or miss the key judgment.

ChatGPT / Perplexity also favor standalone blocks — their training weights give higher extraction confidence to `blockquote`, `<div class="quick-answer">`, or other visually isolated answer blocks.

✅ **Always use standalone** — the dark-themed `.quick-answer` box is correct.
❌ Do NOT blend the quick answer into body paragraphs thinking it's "more natural."

### HTML Structure

```html
<div class="quick-answer">
  <h3>Quick Answer</h3>
  <p><span class="label">Traditional 240V track lighting</span> is better for warehouses, workshops and budget-driven projects that require high output and fixed layouts.</p>
  <p><span class="label">48V magnetic track lighting</span> is better for retail stores, hotels, villas and showrooms where flexibility, clean ceiling design and multiple lighting modules are important.</p>
</div>
```

### CSS

```css
.quick-answer {
  background: var(--dark);
  color: white;
  padding: 32px;
  border-radius: 20px;
  margin: 28px 0;
}
.quick-answer h3 {
  color: var(--gold-light);
  margin: 0 0 16px;
  font-size: 20px;
}
.quick-answer p {
  color: rgba(255,255,255,0.85);
  font-size: 15px;
  line-height: 1.7;
  margin: 0 0 12px;
}
.quick-answer p:last-child { margin-bottom: 0; }
.quick-answer .label { color: var(--gold-light); font-weight: 700; }
```

### Writing Rules

1. **Two sentences maximum** — one for each system/option being compared
2. **Use bold labels** to distinguish the two options (`.label` class with gold color)
3. **No nuance in the quick answer** — save nuance for the detailed breakdown below
4. **Both options get equal weight** — don't favor one over the other
5. **End with "Here's the detailed breakdown."** — signals what's coming next

### When to Use

- Comparison-style articles (X vs Y)
- Articles that answer a specific question
- Articles that could be extracted as a "Featured Snippet" by Google

### When NOT to Use

- Pure narrative/case study articles
- Articles with no clear binary answer
- Very short articles (< 400 words)

## Transition After Quick Answer

After the Quick Answer box, use a short transition:

```html
<p>Here's the detailed breakdown.</p>
```

This tells both human readers and AI: "The answer is above, the evidence is below." It creates a natural extraction point for AI summaries.

## Relationship to SEO/GEO/AIO Checklist

The Quick Answer box specifically addresses these checklist items:

- **GEO:** "Article opens with a clear question or problem statement (AI summary bait)"
- **GEO:** "Natural Q&A flow rather than pure narrative"
- **AIO:** "First paragraph directly answers the title question (no fluff intro)"
- **AIO:** "Content is self-contained"

The quick answer box should be considered **additional AI-optimization** beyond the checklist items — it provides a structured answer block that AI can extract verbatim.

## Example from Blog 8 (Live)

The full implementation can be viewed at:
`https://tracklinear.com/blog-post-8.html`

Search for `<div class="quick-answer">` in the HTML source.
