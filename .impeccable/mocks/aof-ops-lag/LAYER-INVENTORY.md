# Soft Structuralism: Ops Lag Layer Inventory

## 1. Recommended Pick
**soft-B-density.png**
**Why:** It best embodies the "Soft Structuralism" world by introducing richer layering and the signature double-bezel on the panels. The density of orbit particles in the Inner loop and the clear hourglass drip in the Outer loop provide excellent visual contrast between speed and lag, while faithfully preserving the required anatomy from the reference.

## 2. Exact Label List

### Top Header
- `The problem`
- `Outer Ops loop is failing to keep up with inner Dev loop`

### Inner Loop (Left Panel)
- `Inner Loop`
- `AI-assisted Build`
- `Deploy`
- `AI-generated code`
- `High-volume pushes`
- `Debug`

### Bridge (Center)
- `Slow Feedback / Noisy Signal`

### Outer Loop (Right Panel)
- `Outer Loop`
- `Observe`
- `Remediate`
- `Operate`
- `Compliance`
- `Observability`

## 3. Layer Stack for Pencil Redraw
*(Z-order from back to front)*

1. **Base Plate:** Ground `#0B0C0E`
2. **Structural Panels:** 
   - Left Panel Base (Inner Loop) with Soft Structuralism double-bezel (`#151619` / `#1D1F24`)
   - Right Panel Base (Outer Loop) with double-bezel
3. **Bridge Base:** Center trapezoid/neck connecting left and right panels
4. **Orbit Paths & Connections:**
   - Cyan Inner Loop path (circular)
   - Lavender Outer Loop path (slower square-ish orbit with dashed/broken segments)
   - Lag lines / dashed connections bridging into the Outer Loop
5. **Inner Loop Chips:** The 5 inner cards with hairline borders (`#2A2C33`)
6. **Outer Loop Centerpiece:** Large Lavender Hourglass (sand + drip details)
7. **Outer Loop Chips:** 
   - Observe, Remediate, Operate
   - Stacked Compliance & Observability cards (with segmented top bars)
8. **Bridge Content:** Text `Slow Feedback / Noisy Signal` and any accompanying subtle iconography
9. **Global Header:** `The problem` & main H2 text
10. **Top-Level Overlays:** Particles, motion streaks, hairline highlights

## 4. Coordinates / Relative Layout Notes

- **Inner 5 Chips (Left Panel):** Arranged in a clockwise circular flow. 
  - Top: `AI-assisted Build`
  - Right: `Deploy`
  - Bottom-Right: `AI-generated code`
  - Bottom-Left: `High-volume pushes`
  - Left: `Debug`
- **Bridge (Center):** Trapzeoid or hourglass-neck shape positioned perfectly centered between the Left and Right panels. The text should be horizontally centered within the bridge.
- **Outer 3 Chips (Right Panel):** Arranged around the central hourglass.
  - Top: `Observe`
  - Right: `Remediate`
  - Left: `Operate`
- **Hourglass:** Dominant center element of the Right Panel. Must feature sand dripping downward.
- **Compliance / Observability Cards:** Placed side-by-side at the bottom of the Right Panel. Each should have segmented status bars running along its top edge.

## 5. Motion Name Hints for Pencil
Use these node names in Pencil to hook up interactions/motion later:
- `@motion/inner-orbit-ring`: Continuous fast rotation for the cyan inner loop.
- `@motion/chip-pulse-inner`: Sequential activation state for the 5 inner chips.
- `@motion/bridge-flow`: Horizontal translation for dashed lines/particles crossing the bridge.
- `@motion/outer-orbit-slow`: Slow, segmented rotation for the lavender outer loop.
- `@motion/lag-lines`: Slow-moving dashed lines from Operate/Remediate into the Hourglass.
- `@motion/hourglass-drip`: Downward particle or scale animation for the hourglass sand.

## 6. What NOT to Invent
- **No Neon/Cyberpunk:** Do not add heavy glowing blobs or intense neon drop shadows. Keep it quiet.
- **No Glassmorphism Spam:** Avoid over-using blurs or translucent overlays. Rely on solid `#151619` / `#1D1F24` panels and `#2A2C33` hairlines.
- **No Extra Text:** Stick exactly to the labels provided. Do not add filler text, code snippets, or dummy data unless explicitly requested.
- **No Purple-on-White:** All palettes must adhere to the dark Soft Structuralism world.
- **No Random Logos:** You may include a tiny StackGen wordmark at the very top-left of the main frame, but do not invent other company logos or icons inside the chips.
