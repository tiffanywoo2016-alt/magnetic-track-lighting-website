# Image Prompt Standards for MAGNETRACK Blog Images

## Three Golden Rules

### Rule 1: Realistic Application Logic
Every fixture type in the prompt must be shown in the setting where it's ACTUALLY used:
| Fixture | Correct usage | Wrong usage |
|---------|---------------|-------------|
| Spotlight | Gallery (accents artwork), retail (highlights product), lobby (accent on reception desk) | Putting floodlight above a painting |
| Linear Flood | Ambient wash on walls, corridor illumination, cove lighting | Pointing a flood as a focused accent |
| Grille Module | Corridors, reading areas, bedrooms (anti-glare, UGR<19) | Using in a restaurant where accent is needed |
| Pendant Adapter | Over dining tables, reception desks, bar counters | Using in a corridor (that's grille or flood zone) |

### Rule 2: Light Effect Consistency
Each module type produces a specific beam pattern:
- **Spotlight** → Tight, focused beam, clear light cone, crisp shadow edges. Head direction MUST match beam angle.
- **Flood/Linear Flood** → Wide, soft, even illumination, gradual falloff, no defined hotspot.
- **Grille** → Controlled, glare-free, diffused, low UGR. Even spread.
- **Pendant** → Ambient glow, decorative, wrap-around light. No sharp beam.

**NEVER** show a spotlight with a wide, flood-like beam, or a flood module with a tight hotspot.

### Rule 3: Interior Designer-Level Aesthetic
- Warm colour temps: **2700K-3000K** for hospitality and residential; **3500K-4000K** for retail, office
- **CRI 90+ rendering** — colours on lit surfaces must look vibrant and natural, not washed out
- Shadows: **soft but defined** — no flat/unrealistic lighting with no shadow
- Light fixture **must have visible mount or track connection** — no floating light sources
- **Beam angle must be physically aligned** with the fixture head direction

> **Test:** Before finalizing any prompt, ask: "Would an interior designer approve this lighting scene?"

## Prompt Structure Template

```
[Setting description] with [specific fixture type(s)] producing [specific beam effect] on [target surface/object].
Lighting: [colour temperature], [CRI level], [atmosphere words].
Style: [photography style]. [Aspect ratio]. No people.
```

## Past Prompt Examples (for reference)

### Guest Room (approved by user)
> *"A warm, inviting boutique hotel guest room seen from a low angle that clearly shows the ceiling. A recessed magnetic track lighting system is visible in the ceiling channel above the bed, with two small adjustable spotlights casting warm light onto the headboard and a pendant module hanging above the nightstand. The lighting is warm 2700K, creating a calm and restful atmosphere. Natural materials: wooden floor, linen bedding, soft beige walls. The track and modules are clearly visible as part of the design, not hidden. Soft shadows, cozy high-end hospitality mood. Interior photography style, professional lighting, 16:9."*

## Common Mistakes to Avoid
- ❌ Showing a flood module where a spotlight should be (e.g., washing artwork)
- ❌ Beam angle that doesn't match the fixture's physical direction
- ❌ Flat lighting with no shadows — looks fake
- ❌ Wrong colour temperature for the setting (e.g., cool 4000K in a hotel lobby)
- ❌ Prompts that only describe atmosphere without specifying the product/fixture
