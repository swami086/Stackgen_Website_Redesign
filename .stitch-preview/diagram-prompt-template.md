# StackGen × Google Stitch — Diagram prompt template

Paste **Block A** as Stitch project design context (or attach `.stitch-preview/DESIGN.md`).
Paste **Block B** as the screen prompt. Fill every `{{SLOT}}`. Attach a reference PNG when you have one.

Stitch generates UI screens. Treat the diagram as one marketing plate, not a full landing page.

---

## Block A — Design context (paste once per Stitch project)

```
You are generating a StackGen marketing diagram plate for labs.google/stitch.

Follow DESIGN.md (StackGen Landing, Soft Structuralism) exactly.

World: dual-theme Soft Structuralism. Dark default #0B0C0E / #151619 / #1D1F24 / hairline #2A2C33. Light twin #FCFCFD / #F4F5F7 / #ECEDF0 / #E3E5E9. Type: Geist Sans + Geist Mono for 11px uppercase cadence labels. One accent: Factory Violet dark #8C85FF / light #5B4FE8, only on the hub OR one hot path OR the CTA.

Materials: every major plate and hub is a double-bezel (outer tray + inner core). Diagram plates use specular glass (gradient fill, top catch, 1px gradient hairline, ZERO backdrop-blur). Nested chips are compact rounded-md tiles, 11px labels, never tall consumer pills, never clipped.

Visual-heavy: geometry, icons, beams, nodes beat paragraphs. Short labels only. Motion-ready still: nodes visible, one lit route, 2–4 in-flight beads. No neon, no mesh blobs, no purple-on-white, no people, no watermarks.

Names on this plate must match the live homepage: Aiden for Infrastructure, Aiden for Automation, Aiden for Observability, Aiden for SRE, Aiden OS, Operational Context Graph. Ban: Olly, InfraOps, Aiden for DevOps, em dashes, AI marketing clichés.
```

---

## Block B — Per-diagram screen prompt

```
Generate ONE horizontal UI screen: a StackGen landing-page diagram plate.

THEME: {{dark | light}}
ASPECT: {{16:9 | 16:10}} landscape. Desktop 1440. One plate only — do not draw hero, nav, or other sections.

JOB OF THIS PLATE
{{one sentence: what the SRE should understand in 3 seconds}}

METAPHOR (pick one)
{{signal-drop | neural-mesh | corridor-stitch | assemble | chaos-film | hub-spoke | other: …}}

ANATOMY (must all be present, none truncated)
{{numbered list of regions, top→bottom or left→hub→right}}
1. …
2. …
3. …

LABELS (verbatim — do not paraphrase)
{{bullet list of every visible string}}

HUB / HOT PATH
- Brightest object: {{name}}
- Accent violet only on: {{hub | named route}}
- Rest of graph: Hairline Border / Tertiary Ink

CHIPS
- Style: compact rounded-md, pad 4×8px, 11px, Raised Core, 1px Hairline
- Items: {{list}}
- Vendor marks: {{none | named official marks: AWS, GitHub, …}}

CONNECTORS
- Rest: 1px hairline, orthogonal or gentle Bezier, isotropic
- Active: 1px Factory Violet + 2–4 beads
- Do not draw floating triangles or rainbow wires

COMPLETENESS CHECK (fail the frame if any is false)
- Double-bezel on the outer plate and on {{hub / shells}}
- Every named chip is fully readable and unclipped
- Every vendor or satellite has a visible feeder into its parent
- Ask bar (if OCG): sits ABOVE the graph, not inside it
- Same composition would swap cleanly to the other theme

BANNED
Neon glow, backdrop-blur on the diagram, glass-on-glass, Inter, 3 equal marketing cards, fake KPIs, people, watermarks, truncated words, second brand hue, purple wash.

OUTPUT
One polished Soft Structuralism product diagram. Implementation-clear: a frontend engineer could rebuild it in React with $ds-* tokens.
```

---

## Slot cheat sheet (live landing)

| Plate | Section | Metaphor | Spine to paste into ANATOMY |
|---|---|---|---|
| Problem chaos film | `#problem` | `chaos-film` | Cinema double-bezel plate. Siloed fragments: Observability · Deploy · Infrastructure. Caption `90 minutes · no shared context`. Violet on one broken connector only. |
| Inner → Outer | Assemblies | `corridor-stitch` or `assemble` | LEFT INNER LOOP chips IDE · Git · CI / CD · IaC. CENTER Context Graph hub + satellites intent · entities · policies · memory. RIGHT OUTER LOOP Runtime · Infrastructure · Observability. Corridor stitch through the hub. Quiet hub, motion in the join. |
| Offerings | Assemblies | `assemble` | Four app cards (Infrastructure / Automation / Observability / SRE) with icon + sub. Center Aiden OS double-bezel: Grounded · Governed · Useful. Accent column rails. Neutral surfaces. |
| Integrations | Assemblies | marquee still | One row of vendor pills, size-8 marks, h-12 chips, edge fades implied. Pause-on-hover ready. |
| OCG / Shell | `#ocg` | `neural-mesh` or `signal-drop` | TOP ask bar. CENTER Intent Router double-bezel hub. Four equal docks N/E/S/W: Infrastructure (AWS/Terraform/EKS) · Automation (GitHub/GitLab/Jira) · Observability (Datadog/Prometheus/PagerDuty + checkout-api) · SRE (OPA/Slack/Backstage). Feeders vendors→assembly→router. BOTTOM Aiden OS strip: Governance · Guardrails · Identity · Audit · Integrations. Accent only on Intent Router + one Observe route. |
| Who it's for | `#who` | portraits-dock | Four product portrait wells + role dock (SRE · Platform Engineering · Developers · DevSecOps) + Aiden OS glass-tile chips. Gloss on docks, not on portraits. |

---

## How to run in Stitch

1. New project → paste Block A into Design system / instructions.
2. Optional: upload `.stitch-preview/DESIGN.md` and a reference PNG from `exports/web-shelf/` or `.impeccable/mocks/`.
3. New screen → paste filled Block B. Set desktop 1440, landscape.
4. Generate dark first. Duplicate screen, set THEME to `light`, keep anatomy identical, swap tokens only.
5. Reject any frame that violates Completeness or Banned. Do not "fix in paint" — regenerate with a tighter ANATOMY list.

## Pairing with code

Stitch is concept + layout. Live diagrams stay React (`web/components/replica/diagrams/*`) on `$ds-*`. Do not ship the Stitch PNG as the production diagram unless the task is explicitly a raster plate.
