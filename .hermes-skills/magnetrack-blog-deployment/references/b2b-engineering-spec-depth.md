# B2B Engineering Depth in Spec Tables

> Captured from Blog 8 session (2026-06-18). User explicitly said simplified numbers (e.g., "Up to ~150W") lack B2B credibility and asked for engineering-contextualized phrasing.

## The Principle

B2B spec tables should **teach the buyer what to consider**, not just dump a number. When a distributor or contractor reads your spec table, they should walk away knowing more than they did before — even if they don't remember the exact number.

## Simple vs Engineering Depth Examples

| Consideration | Simple (❌ B2B weak) | Engineering Depth (✅ B2B credible) |
|--------------|---------------------|-----------------------------------|
| Load per track | `Up to ~150W` | `Driver-dependent; limited by driver capacity, track length, module wattage and voltage drop` |
| Dimming | `TRIAC` | `DALI, 0-10V, TRIAC — smooth` |
| Module cost | `Higher` | `Higher (built-in driver)` |

## The Engineering Depth Criteria

A spec table cell passes the "engineering depth" test when it:

1. **Acknowledges variability** — use phrases like "driver-dependent", "varies by", "depends on..."
2. **Names the limiting factors** — not just "~600W" but "limited by driver capacity, track length, module wattage and voltage drop"
3. **Uses industry vocabulary** — voltage drop, driver capacity, circuit, module wattage — these signal to experienced buyers that the writer knows the industry
4. **Avoids false precision** — don't say "150W max" if the actual max depends on driver specs. Say "driver-dependent"

## When to Apply

- **Load per track** cells in comparison tables (ALWAYS contextualized)
- **Dimming compatibility** cells — list specific protocols, not just "yes"
- **Safety** cells — explain WHY it's safer (touch-safe at 48V vs exposed 240V)
- **Installation** cells — mention labor implications (electrician required vs not)

## When Simple Numbers Are Acceptable

- **Standardized specs** — CRI 90+, IP20, 48V — these are universal and don't need qualification
- **Physical dimensions** — 5.5mm track profile, 28mm housing depth — exact numbers are expected
- **Warranty** — 5 years, 3 years — clear contractual terms, not engineering variables

## Full Example (from Blog 8 Live)

| Consideration | Traditional Track (240V) | Magnetic Track (48V) |
|--------------|------------------------|---------------------|
| Load per track | Up to ~600W per circuit | Driver-dependent; limited by driver capacity, track length, module wattage and voltage drop |

The traditional side also got upgraded from `Up to ~600W` to `Up to ~600W per circuit` — the addition of "per circuit" adds engineering precision without extra words.
