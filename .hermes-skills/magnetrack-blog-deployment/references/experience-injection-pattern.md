# E-E-A-T Experience Injection Pattern

## When to Use

When upgrading a purely educational/technical blog post to include Google E-E-A-T Experience signals.

## Workflow: Agent Proposes → User Supplies Facts → 3-4 Correction Rounds

### Step 1: Propose the structure, NOT the story

Ask the user for the facts:
- "I can open with a story about this client visit. The facts I need: where did they see the product, what did you explain, what did they ask?"
- Do NOT write a full story draft without facts confirmed first.

### Step 2: User provides the text — USE THEIR WORDS

When the user says "write it like this" and provides exact text (e.g. "Last week, a lighting importer from Russia visited our factory..."), USE IT VERBATIM. The user knows exactly what was said to the client. Your job is to integrate, not rewrite.

**Critical nuance:** The user's exact words are FACT, not raw material for you to polish. If the user says "While touring the production line, they noticed that some magnetic light modules contained built-in drivers while others used simpler electronic solutions", that exact sentence must appear in the article. Do not change "touring" to "walking through", "noticed" to "saw", or "simpler electronic solutions" to "basic resistor circuits". The user chose those words because they correspond to what was actually said to the client.

### Step 3: Expect 3-4 fact-correction rounds

Every single session, the user will spot and correct:
- **Time** — "last month" → "last week"
- **Customer type** — "distributor" → "importer"
- **Context** — "demo track" → "production line where workers were assembling modules"
- **Trigger** — "they noticed the difference" → "we explained this module has built-in driver for better stability"

This is not failure — it's the process. Each correction makes the story more accurate. The agent must accept corrections without pushback.

### Step 4: Only deploy after user confirms all facts are correct

## The Standard Experience Opening Pattern

The most common scenario (validated across multiple sessions):

> Last week, a [customer type] from [country] visited our factory to discuss a [topic] project.
> While touring the production line, they noticed that some [product] modules contained built-in drivers while others used simpler electronic solutions.
> After examining the products for a few minutes, he asked a question that many distributors and contractors have asked before:
> [Customer's exact question — user provides this]
> It's a great question.
> In fact, understanding the difference between [X] and [Y] helps explain why some [products] cost more, last longer, and deliver more stable performance than others.

## Fact-Only vs Embellished Examples

| Element | Embellished (DON'T) | Fact-Only (DO) |
|---------|--------------------|----------------|
| Demo | "We walked to the test bench and showed him flicker at 80%" | "We explained that the driver regulates current, preventing flicker" |
| Customer action | "He placed an order on the spot" | "He understood the difference" |
| Factory detail | "Our Foshan factory" | "Our factory" (unless user specifies city) |
| Customer title | "A distributor from Russia" | Use exact term user gave (e.g. "An importer from Russia") |
| Test data | "Module hit 67°C in 6 minutes" | General engineering principle (e.g. "Risk of thermal runaway") |

## The Real Chain of Events (from actual session)

This is what actually happened — use as reference for future similar injections:
1. Importer from Russia visited the factory
2. Walking through the **production line**, saw **workers assembling modules**
3. **We explained** this module has built-in driver for better stability
4. Customer **asked**: "The track already has 48V. Why does the module still need a driver?"
5. **We explained** the difference between power supply and driver
6. Customer understood — no order, no test bench demo, no additional detail

## Critical Constraint

If the user says **"我把这篇文章发给这个客户看了"** — the client in the story will read it. Zero artistic license allowed. Every detail must be verifiable by the client. Remove any inference or embellishment immediately.
