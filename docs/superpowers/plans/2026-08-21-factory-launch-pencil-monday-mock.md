# Factory Launch Monday Home Mock (Pencil) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Put a Monday 24 Aug 2026 review mock of the factory-launch Home on `Stack_Linear.pen` (light + dark, 1440) using pencil-web-design-expert, without touching App Replica frames.

**Architecture:** New canvas column to the right of App Replica (`P2Ie2J` / Home `nwYaY`). Two top-level page frames share layout and `$ds-*` tokens; dark is a `Copy` with `theme:{mode:"dark"}`. Narrative and bans come from the spec. Pencil Path B only: `get_app_state` / `get_guidelines` / `execute`.

**Tech Stack:** Pencil MCP (`project-0-Stackgen_Website_Redesign-pencil-docker`) · file `Stack_Linear.pen` · existing `ds-*` theme axis `mode: [light, dark]` · Inter via current replica type · lucide icons · `TakeScreenshot` as the visual test

**Spec:** `docs/superpowers/specs/2026-08-21-factory-launch-homepage-changes-design.md`  
**Meeting:** `docs/meetings/Meeting-Summary-2026-08-21-weekly-xfn-factory-launch.md`  
**Skill:** `pencil-web-design-expert` (Discover → Define → Design → Deliver). Landing Page guide for narrative. Bind color/type to `$ds-*`, not a new style palette.

## Global Constraints

1. **File:** always `filePath: "/Users/swami/Documents/Stackgen_Website_Redesign/Stack_Linear.pen"`. Never Read/Grep the `.pen`.
2. **Do not modify** App Replica Home `nwYaY` / `y1kHUi`, products, Platform, or marketing-column frames. Copy nav/footer **from** `nwYaY`, then edit the copy.
3. **First execute of the session:** `get_app_state({ include_schema: true, include_canvas_design: true, include_scripts_and_shaders: false })`. Load `get_guidelines({ category: "guide", name: "Landing Page" })` once.
4. **`execute` rules:** never set `id` on Insert/Copy; persist ids with `name=Insert(...)` (no `const`/`let` for ids across calls); on failure use `edits` + `editId`, never resend the snippet; one section per execute; name every node; `alignItems` only `start` | `center` | `end`.
5. **Tokens:** `GetVariables()` first. Use `$ds-bg`, `$ds-surface`, `$ds-surface-raised`, `$ds-border`, `$ds-text-primary`, `$ds-text-secondary`, `$ds-text-tertiary`, `$ds-accent`, `$ds-accent-text`, `$ds-on-accent`. Do not `SetVariables({replace:true})`. Do not introduce a second palette.
6. **Viewport:** page width **1440**, `clip: true`, `layout: "vertical"`, `height: "fit_content"`. No mobile frame.
7. **H1 locked for this mock:** `Autonomous DevOps Factory`. No hero body, no hero support, no Agentic OS paragraph. CTA label `Get started`.
8. **Bans (fail the task if any appear on the mock):** `intent router`, `Olly`, `InfraOps`, `Aiden for DevOps`, `Jira` as hero input, `PagerDuty` mapped to Aiden for SRE, `10×`, `10x`, CLI/Slack/MCP as section 3, PLACEHOLDER testimonial names, operator-autonomy dashboard, AI browser chrome / PIP / traffic lights, em dash in copy.
9. **Do not invent** OS/governance/memory/trust-and-safety body copy. OS slab labels only: `Context graph`, `Memory`, `Workflows / skills`.
10. **Intents:** only the three call examples as live chips. Extra slots say `Awaiting Dharani Excel`. Do not invent seven polished scenarios.
11. **Logos (text wordmarks, marketing set):** Siemens · Bank of Columbia · Autodesk · Nielsen · NIQ · Innovaccer · InMobi · Corcentric · OneTrust. Do not lead with Piramal or greytHR. greytHR quote later, published only.
12. **Product UI pop-out:** image fill `./web/public/media/aiden-home-change-surface/hero-HKEV6rkRDzU-1920.png` (or the path that already works on replica Mechanism). Frame **1040×585**, `cornerRadius: 0`, fill `#0B0C0E`. Caption: `Animation placeholder: product UI pop-out`.
13. **Motion:** Pencil is static. Encode motion in `context` on named nodes (marquee, intent rotate, UI pop-out). Easing `cubic-bezier(0.2, 0.8, 0.2, 1)`; marquee ambient 700–1200ms; intent rotate scene 520ms; reduced-motion = final state visible.
14. **Commits:** only if the human asks. Checkpoint = `TakeScreenshot` + `Print` of new ids.
15. **Scope:** Home mock only. No product pages, no Platform rewrite, no Next.js.

## File map (canvas, not code)

| Node / artifact | Responsibility |
|---|---|
| Context `Factory Launch Monday` (new, right of `P2Ie2J`) | Column label |
| Note `Brief` | Discover deliverable: who / what / why / CTA / success |
| Frame `Monday — Home` (light, `theme:{mode:"light"}`) | Review mock |
| Frame `Monday — Home — Dark Mode` | Same tree, dark tokens |
| Children of Home (in order) | Nav · Hero (H1+CTA+diagram+pop-out) · Logos marquee · One platform / four outcomes · Hard intents · Proof (greytHR) · Industries · Compliance · Final CTA · Footer |
| `docs/superpowers/plans/2026-08-21-factory-launch-pencil-monday-mock.md` | This plan |
| Export (optional) | `exports/pencil-pdf/` or `.superpowers/sdd/monday-mock/` PNG of both frames |

**Do not create:** Surfaces/CLI/Slack band, Problem, Factory Process, ADF Loop section, Agentic OS product cards, OCG five-column band, four PLACEHOLDER quotes.

---

### Task 0: Preflight (read-only)

**Files:**
- Read via MCP: `Stack_Linear.pen`
- Spec: `docs/superpowers/specs/2026-08-21-factory-launch-homepage-changes-design.md`

**Interfaces:**
- Produces: `dsVars` (names that exist), `replicaHomeId = "nwYaY"`, `replicaColumnId = "P2Ie2J"`, `origin = {x,y}` from `FindEmptySpace`

- [ ] **Step 1: Load schema**

Call `get_app_state` with `include_schema: true`, `include_canvas_design: true`, `include_scripts_and_shaders: false`. Confirm active file is `Stack_Linear.pen` and `nwYaY` is Replica — Home.

- [ ] **Step 2: Confirm tokens and replica Home structure**

```js
Print(GetVariables())
Print(Get("P2Ie2J", {depth: 0}))
Get("nwYaY", (n, c) => c.depth <= 1 && Print(n.id, n.name, n.type, c.bounds.width, c.bounds.height))
origin = FindEmptySpace({width: 1600, height: 9000, direction: "right", padding: 240, nodeId: "P2Ie2J"})
Print(origin)
```

Expected: `ds-bg` (and siblings) present; `nwYaY` children include Nav, Hero, Logos, Surfaces (proof we are **not** editing this tree); `origin.x` sits to the right of the replica column.

- [ ] **Step 3: Ban-scan the replica Home so you know the contrast**

```js
Get("nwYaY", n => n.type === "text" && typeof n.content === "string" && /CLI|Slack|MCP|Surfaces|PLACEHOLDER|10×|10x|intent router/i.test(n.content) && Print(n.id, n.content.slice(0, 80)))
```

Expected: replica still has PLG / placeholders. Leave it. The new column must print **zero** of those.

---

### Task 1: Discover artifacts (brief + column)

**Files:**
- Modify: `Stack_Linear.pen` (new context + note only)

**Interfaces:**
- Produces: `mondayColId`, `briefNoteId`

- [ ] **Step 1: Insert column context and brief note**

```js
origin = FindEmptySpace({width: 1600, height: 400, direction: "right", padding: 240, nodeId: "P2Ie2J"})
mondayColId = Insert(document, {
  type: "context",
  name: "Factory Launch Monday",
  x: origin.x,
  y: origin.y,
  width: 1440,
  height: 160,
  content: "Monday 24 Aug 2026 Home mock. Do not edit App Replica nwYaY / y1kHUi. Spec: 2026-08-21-factory-launch-homepage-changes-design.md.",
  fontFamily: "Inter",
  fontSize: 14,
  fill: "$ds-text-secondary"
})
briefNoteId = Insert(document, {
  type: "note",
  name: "Brief",
  x: origin.x,
  y: origin.y + 200,
  width: 720,
  height: 280,
  content: "Who: Platform / SRE leaders (enterprise).\nWhat: ADF Home fold that explains the factory before surfaces.\nWhy: X-Fn factory launch review Mon 24 Aug.\nPrimary action: Get started.\nSuccess: Room can narrate intent → orchestrator → outcome without asking what an intent router is.",
  fontFamily: "Inter",
  fontSize: 14,
  fill: "$ds-text-primary"
})
Print(mondayColId, briefNoteId, origin)
```

Expected: two new top-level nodes to the right of App Replica. Replica Home unchanged.

- [ ] **Step 2: Screenshot the new label**

```js
TakeScreenshot([mondayColId, briefNoteId])
```

---

### Task 2: Page shell (light)

**Files:**
- Modify: `Stack_Linear.pen`

**Interfaces:**
- Consumes: `origin` from Task 1 (re-`FindEmptySpace` if the session is fresh)
- Produces: `mondayHomeId`

- [ ] **Step 1: Insert the light page frame**

```js
origin = FindEmptySpace({width: 1440, height: 200, direction: "bottom", padding: 80, nodeId: mondayColId})
mondayHomeId = Insert(document, {
  type: "frame",
  name: "Monday — Home",
  x: origin.x,
  y: origin.y,
  width: 1440,
  height: "fit_content",
  clip: true,
  layout: "vertical",
  gap: 0,
  padding: 0,
  fill: "$ds-bg",
  theme: {mode: "light"},
  placeholder: true
})
Print(mondayHomeId)
```

Expected: empty 1440-wide light page under the column label.

---

### Task 3: Nav + footer copies

**Files:**
- Modify: `Stack_Linear.pen` (`mondayHomeId` only)

**Interfaces:**
- Consumes: `nwYaY` nav/footer child ids from Task 0 Print
- Produces: nav and footer instances inside `mondayHomeId`

- [ ] **Step 1: Copy Nav from replica Home (do not Copy the whole page)**

Re-read replica children, then Copy **only** the Nav frame (name match, e.g. `Nav` / `Nav Desktop`):

```js
navSrc = Get("nwYaY", n => n.type === "frame" && /nav/i.test(n.name || "") ? n.id : undefined)[0]
footerSrc = Get("nwYaY", n => n.type === "frame" && /footer/i.test(n.name || "") ? n.id : undefined)[0]
Print("navSrc", navSrc, "footerSrc", footerSrc)
mondayNavId = Copy(navSrc, mondayHomeId)
Print(mondayNavId)
```

If replica Nav is a `ref`, Copy still works. Do not Copy Surfaces.

- [ ] **Step 2: Visual check**

```js
TakeScreenshot([mondayHomeId])
```

Expected: nav on `$ds-bg`, Schedule demo still in nav per replica CTA density. Footer is added in Task 11 after sections exist (Copy now or then; if you Copy now, `Move` it to the end after later Inserts, or Insert sections **before** the footer by using `Move(footerId, mondayHomeId, index)`).

**Preferred order:** Copy Nav now; Copy Footer in Task 11 so new sections stack above it.

---

### Task 4: Hero copy (one line + CTA)

**Files:**
- Modify: `Stack_Linear.pen`

**Interfaces:**
- Produces: `mondayHeroId`

Landing Page guide: one idea, one headline, one CTA. Fitts: CTA is the accent target. Hick: no second hero CTA.

- [ ] **Step 1: Hero band**

```js
mondayHeroId = Insert(mondayHomeId, {
  type: "frame",
  name: "Hero",
  layout: "vertical",
  width: "fill_container",
  height: "fit_content",
  gap: 24,
  padding: [80, 96, 40, 96],
  fill: "$ds-bg",
  alignItems: "start"
})
Insert(mondayHeroId, {
  type: "text",
  name: "Hero H1",
  content: "Autonomous DevOps Factory",
  fontFamily: "Inter",
  fontSize: 56,
  fontWeight: "600",
  lineHeight: 1.1,
  fill: "$ds-text-primary",
  textGrowth: "fixed-width",
  width: 960
})
cta = Insert(mondayHeroId, {
  type: "frame",
  name: "Hero CTA",
  layout: "horizontal",
  padding: [12, 20],
  cornerRadius: 8,
  fill: "$ds-accent",
  width: "fit_content",
  height: "fit_content",
  alignItems: "center",
  context: "Hover: 120ms accent lift, cubic-bezier(0.2, 0.8, 0.2, 1). Focus ring $ds-accent. Reduced-motion: no lift."
})
Insert(cta, {
  type: "text",
  name: "Hero CTA Label",
  content: "Get started",
  fontFamily: "Inter",
  fontSize: 15,
  fontWeight: "600",
  fill: "$ds-on-accent"
})
Print(mondayHeroId)
```

- [ ] **Step 2: Screenshot and fail if body copy snuck in**

```js
TakeScreenshot([mondayHeroId])
Get(mondayHeroId, n => n.type === "text" && /operating system|foundations for an Autonomous|intent router/i.test(n.content || "") && Print("FAIL", n.content))
```

Expected: H1 + pill CTA only. No support paragraph.

---

### Task 5: Hero diagram (layers A–E)

**Files:**
- Modify: `Stack_Linear.pen`

**Interfaces:**
- Consumes: `mondayHeroId`
- Produces: `heroDiagramId`

This is the product. One diagram. Label the middle **agent orchestrator**. No product-SKU agent boxes.

- [ ] **Step 1: Diagram card + intent chips (Layer A)**

```js
heroDiagramId = Insert(mondayHeroId, {
  type: "frame",
  name: "Hero Diagram",
  layout: "vertical",
  width: "fill_container",
  height: "fit_content",
  gap: 16,
  padding: 24,
  cornerRadius: 12,
  fill: "$ds-surface",
  stroke: "$ds-border",
  strokeWidth: 1,
  context: "Intent chips rotate every 520ms. Active chip holds. Reduced-motion: show migrate my AWS only."
})
Insert(heroDiagramId, {
  type: "text",
  name: "Intent Label",
  content: "Hard intents (wireframe). Dharani Excel pending.",
  fontFamily: "Inter",
  fontSize: 12,
  fontWeight: "500",
  fill: "$ds-text-tertiary"
})
intentRow = Insert(heroDiagramId, {
  type: "frame",
  name: "Intent Row",
  layout: "horizontal",
  gap: 8,
  width: "fill_container",
  height: "fit_content"
})
const intents = [
  {label: "migrate my AWS", active: true},
  {label: "restore service", active: false},
  {label: "explain anomaly", active: false}
]
for (const intent of intents) {
  chip = Insert(intentRow, {
    type: "frame",
    name: "Intent " + intent.label,
    layout: "horizontal",
    padding: [10, 14],
    cornerRadius: 8,
    fill: intent.active ? "$ds-accent" : "$ds-surface-raised",
    stroke: "$ds-border",
    strokeWidth: intent.active ? 0 : 1
  })
  Insert(chip, {
    type: "text",
    name: "Intent text " + intent.label,
    content: intent.label,
    fontFamily: "Inter",
    fontSize: 14,
    fontWeight: "500",
    fill: intent.active ? "$ds-on-accent" : "$ds-text-primary"
  })
}
Print(heroDiagramId)
```

Do **not** add a Jira icon or ticket input.

- [ ] **Step 2: Middle row — orchestrator + outcomes (Layers B, C, E)**

```js
mid = Insert(heroDiagramId, {
  type: "frame",
  name: "Orchestrator Row",
  layout: "horizontal",
  gap: 16,
  width: "fill_container",
  height: "fit_content",
  alignItems: "start"
})
orch = Insert(mid, {
  type: "frame",
  name: "Agent Orchestrator",
  layout: "vertical",
  gap: 12,
  padding: 20,
  width: "fill_container",
  height: "fit_content",
  cornerRadius: 8,
  fill: "$ds-surface-raised",
  stroke: "$ds-border",
  strokeWidth: 1
})
Insert(orch, {
  type: "text",
  name: "Orchestrator Label",
  content: "Agent orchestrator",
  fontFamily: "Inter",
  fontSize: 13,
  fontWeight: "600",
  fill: "$ds-text-tertiary"
})
Insert(orch, {
  type: "text",
  name: "Orchestrator Body",
  content: "Routes work to the agents the job needs (incident, RCA, and others). Not four product boxes.",
  fontFamily: "Inter",
  fontSize: 14,
  lineHeight: 1.45,
  fill: "$ds-text-secondary",
  textGrowth: "fixed-width",
  width: 520
})
os = Insert(orch, {
  type: "frame",
  name: "OS Slab",
  layout: "horizontal",
  gap: 8,
  width: "fill_container",
  height: "fit_content"
})
for (const label of ["Context graph", "Memory", "Workflows / skills"]) {
  cell = Insert(os, {
    type: "frame",
    name: "OS " + label,
    layout: "vertical",
    padding: 12,
    width: "fill_container",
    cornerRadius: 8,
    fill: "$ds-surface",
    stroke: "$ds-border",
    strokeWidth: 1
  })
  Insert(cell, {
    type: "text",
    name: "OS label " + label,
    content: label,
    fontFamily: "Inter",
    fontSize: 13,
    fontWeight: "500",
    fill: "$ds-text-primary"
  })
}
out = Insert(mid, {
  type: "frame",
  name: "Outcomes",
  layout: "vertical",
  gap: 8,
  padding: 20,
  width: 280,
  height: "fit_content",
  cornerRadius: 8,
  fill: "$ds-surface-raised",
  stroke: "$ds-border",
  strokeWidth: 1
})
Insert(out, {
  type: "text",
  name: "Outcomes Label",
  content: "Outcomes",
  fontFamily: "Inter",
  fontSize: 13,
  fontWeight: "600",
  fill: "$ds-text-tertiary"
})
for (const line of ["Infra deployed", "RCA done"]) {
  Insert(out, {
    type: "text",
    name: "Outcome " + line,
    content: line,
    fontFamily: "Inter",
    fontSize: 16,
    fontWeight: "600",
    fill: "$ds-text-primary"
  })
}
```

Do **not** label anything `intent router`. Do **not** add Aiden for Infrastructure / Automation / Observability / SRE as the four middle boxes.

- [ ] **Step 3: Integration band (Layer D)**

```js
band = Insert(heroDiagramId, {
  type: "frame",
  name: "Integration Band",
  layout: "horizontal",
  gap: 12,
  padding: [12, 4],
  width: "fill_container",
  height: "fit_content",
  alignItems: "center",
  justifyContent: "space_between"
})
Insert(band, {
  type: "text",
  name: "Integrations Caption",
  content: "Your stack feeds the orchestrator",
  fontFamily: "Inter",
  fontSize: 12,
  fill: "$ds-text-tertiary"
})
tools = Insert(band, {
  type: "frame",
  name: "Integration Marks",
  layout: "horizontal",
  gap: 16,
  width: "fit_content"
})
for (const name of ["AWS", "Git", "PagerDuty", "Prometheus", "Terraform"]) {
  Insert(tools, {
    type: "text",
    name: "Tool " + name,
    content: name,
    fontFamily: "Inter",
    fontSize: 13,
    fontWeight: "500",
    fill: "$ds-text-secondary"
  })
}
```

PagerDuty is **one mark in a row**, not an arrow into Aiden for SRE.

- [ ] **Step 4: Screenshot + layout problems**

```js
TakeScreenshot([heroDiagramId])
Get(heroDiagramId, (n, c) => c.problems && Print("CLIP", n.name, c.problems))
Get(heroDiagramId, n => n.type === "text" && /intent router|Jira|Aiden for SRE|CLI|Slack/i.test(n.content || "") && Print("BAN", n.content))
```

Expected: no CLIP, no BAN lines.

---

### Task 6: Product UI pop-out placeholder

**Files:**
- Modify: `Stack_Linear.pen`
- Image: `web/public/media/aiden-home-change-surface/hero-HKEV6rkRDzU-1920.png`

**Interfaces:**
- Produces: `popoutId`

- [ ] **Step 1: 16:9 product window under the diagram**

```js
popoutId = Insert(mondayHeroId, {
  type: "frame",
  name: "Product UI Pop-out",
  layout: "vertical",
  gap: 8,
  width: 1040,
  height: "fit_content",
  context: "Animation placeholder: frame lifts 16px over 400ms cubic-bezier(0.2, 0.8, 0.2, 1). No browser chrome. Reduced-motion: static."
})
shell = Insert(popoutId, {
  type: "rectangle",
  name: "Product UI Shell",
  width: 1040,
  height: 585,
  cornerRadius: 0,
  fill: {
    type: "image",
    url: "./web/public/media/aiden-home-change-surface/hero-HKEV6rkRDzU-1920.png",
    mode: "fit"
  },
  stroke: "#1F2124",
  strokeWidth: 1
})
Insert(popoutId, {
  type: "text",
  name: "Pop-out Caption",
  content: "Animation placeholder: product UI pop-out",
  fontFamily: "Inter",
  fontSize: 12,
  fill: "$ds-text-tertiary"
})
Print(popoutId)
```

If the relative URL fails, Copy the Mechanism image node from `nwYaY` instead of inventing a new still. Do **not** `Generate(..., "ai", ...)` a fake dashboard.

- [ ] **Step 2: Screenshot**

```js
TakeScreenshot([popoutId])
```

Expected: full-bleed app UI, no traffic lights, 16:9 (not 1040×640).

---

### Task 7: Logos marquee

**Files:**
- Modify: `Stack_Linear.pen`

**Interfaces:**
- Produces: `mondayLogosId`

- [ ] **Step 1: Wordmark row**

```js
mondayLogosId = Insert(mondayHomeId, {
  type: "frame",
  name: "Logos",
  layout: "vertical",
  gap: 16,
  padding: [32, 96],
  width: "fill_container",
  height: "fit_content",
  fill: "$ds-bg",
  context: "Marquee placeholder: translateX loop 900ms linear ambient. Reduced-motion: static row."
})
Insert(mondayLogosId, {
  type: "text",
  name: "Logos Caption",
  content: "Marquee placeholder",
  fontFamily: "Inter",
  fontSize: 12,
  fill: "$ds-text-tertiary"
})
row = Insert(mondayLogosId, {
  type: "frame",
  name: "Logo Row",
  layout: "horizontal",
  gap: 32,
  width: "fill_container",
  height: "fit_content",
  justifyContent: "space_between",
  alignItems: "center"
})
for (const name of ["Siemens", "Bank of Columbia", "Autodesk", "Nielsen", "NIQ", "Innovaccer", "InMobi", "Corcentric", "OneTrust"]) {
  Insert(row, {
    type: "text",
    name: "Logo " + name,
    content: name,
    fontFamily: "Inter",
    fontSize: 15,
    fontWeight: "600",
    fill: "$ds-text-tertiary"
  })
}
```

Do not put greytHR or Piramal in this row. Do not use near-black SVG fills on `$ds-bg`.

- [ ] **Step 2: Screenshot**

```js
TakeScreenshot([mondayLogosId])
```

---

### Task 8: One platform / four pillar outcomes

**Files:**
- Modify: `Stack_Linear.pen`

**Interfaces:**
- Produces: `pillarsId`

Short. Not CLI/Slack. No 10×.

- [ ] **Step 1: Four outcome cells**

```js
pillarsId = Insert(mondayHomeId, {
  type: "frame",
  name: "One Platform",
  layout: "vertical",
  gap: 24,
  padding: [72, 96],
  width: "fill_container",
  height: "fit_content",
  fill: "$ds-bg"
})
Insert(pillarsId, {
  type: "text",
  name: "Platform Eyebrow",
  content: "ONE GRAPH. FOUR OUTCOMES.",
  fontFamily: "Inter",
  fontSize: 12,
  fontWeight: "500",
  fill: "$ds-text-tertiary"
})
Insert(pillarsId, {
  type: "text",
  name: "Platform Heading",
  content: "One platform. Multiple use cases.",
  fontFamily: "Inter",
  fontSize: 32,
  fontWeight: "600",
  fill: "$ds-text-primary",
  textGrowth: "fixed-width",
  width: 720
})
grid = Insert(pillarsId, {
  type: "frame",
  name: "Pillar Grid",
  layout: "horizontal",
  gap: 16,
  width: "fill_container"
})
const pillars = [
  ["Build", "Policy-checked infrastructure change in your Git."],
  ["Operate", "Gates before merge. Replayable. Attributable."],
  ["Observe", "Signals correlated to change and infra state."],
  ["Remediate", "Investigate, then act inside policy."]
]
for (const [title, body] of pillars) {
  card = Insert(grid, {
    type: "frame",
    name: "Pillar " + title,
    layout: "vertical",
    gap: 8,
    padding: 20,
    width: "fill_container",
    cornerRadius: 8,
    fill: "$ds-surface",
    stroke: "$ds-border",
    strokeWidth: 1
  })
  Insert(card, {
    type: "text",
    name: "Pillar title " + title,
    content: title,
    fontFamily: "Inter",
    fontSize: 16,
    fontWeight: "600",
    fill: "$ds-text-primary"
  })
  Insert(card, {
    type: "text",
    name: "Pillar body " + title,
    content: body,
    fontFamily: "Inter",
    fontSize: 14,
    lineHeight: 1.45,
    fill: "$ds-text-secondary",
    textGrowth: "fixed-width",
    width: 240
  })
}
```

Do not name the four cells after the four products as if they were agents. Product names may appear **once** in a footer line if needed: `Aiden for Infrastructure, Automation, Observability, and SRE share the graph.` Optional; skip if it crowds.

- [ ] **Step 2: Screenshot + 10× scan**

```js
TakeScreenshot([pillarsId])
Get(pillarsId, n => n.type === "text" && /10×|10x|CLI|Slack/i.test(n.content || "") && Print("BAN", n.content))
```

---

### Task 9: Hard intents band (high on the page)

**Files:**
- Modify: `Stack_Linear.pen`

**Interfaces:**
- Produces: `intentsBandId`

- [ ] **Step 1: Three live cards + Excel slots**

```js
intentsBandId = Insert(mondayHomeId, {
  type: "frame",
  name: "Hard Intents",
  layout: "vertical",
  gap: 24,
  padding: [72, 96],
  width: "fill_container",
  height: "fit_content",
  fill: "$ds-bg"
})
Insert(intentsBandId, {
  type: "text",
  name: "Intents Heading",
  content: "Ask something hard. Get a bounded outcome.",
  fontFamily: "Inter",
  fontSize: 32,
  fontWeight: "600",
  fill: "$ds-text-primary",
  textGrowth: "fixed-width",
  width: 800
})
Insert(intentsBandId, {
  type: "text",
  name: "Intents Note",
  content: "Three intents from the 21 Aug call. Five slots wait for Dharani Excel. Not shipped claims.",
  fontFamily: "Inter",
  fontSize: 14,
  fill: "$ds-text-secondary",
  textGrowth: "fixed-width",
  width: 720
})
grid = Insert(intentsBandId, {
  type: "frame",
  name: "Intent Cards",
  layout: "horizontal",
  gap: 16,
  width: "fill_container"
})
const rows = [
  ["migrate my AWS", "Infra landed in Git, policy-checked"],
  ["restore service", "RCA assembled, action inside policy"],
  ["explain anomaly", "Change + topology in one answer"]
]
for (const [intent, outcome] of rows) {
  card = Insert(grid, {
    type: "frame",
    name: "Case " + intent,
    layout: "vertical",
    gap: 8,
    padding: 20,
    width: "fill_container",
    cornerRadius: 8,
    fill: "$ds-surface",
    stroke: "$ds-border",
    strokeWidth: 1
  })
  Insert(card, {type: "text", name: "Case intent " + intent, content: intent, fontFamily: "Inter", fontSize: 16, fontWeight: "600", fill: "$ds-text-primary"})
  Insert(card, {type: "text", name: "Case outcome " + intent, content: outcome, fontFamily: "Inter", fontSize: 14, fill: "$ds-text-secondary", textGrowth: "fixed-width", width: 280})
}
slots = Insert(intentsBandId, {
  type: "frame",
  name: "Excel Slots",
  layout: "horizontal",
  gap: 12,
  width: "fill_container"
})
for (let i = 1; i <= 5; i++) {
  slot = Insert(slots, {
    type: "frame",
    name: "Excel Slot " + i,
    layout: "vertical",
    padding: 16,
    width: "fill_container",
    cornerRadius: 8,
    stroke: "$ds-border",
    strokeWidth: 1,
    fill: "$ds-bg"
  })
  Insert(slot, {type: "text", name: "Slot label " + i, content: "Awaiting Dharani Excel", fontFamily: "Inter", fontSize: 13, fill: "$ds-text-tertiary"})
}
```

- [ ] **Step 2: Screenshot**

```js
TakeScreenshot([intentsBandId])
```

Expected: this band sits **above** proof. Confirm `Get(mondayHomeId, {depth:1})` child order: Nav, Hero, Logos, One Platform, Hard Intents, …

---

### Task 10: Proof (greytHR only) + industries + compliance

**Files:**
- Modify: `Stack_Linear.pen`
- Copy: published quote from spec / `docs/proof/customer-logos-and-quotes.md`

**Interfaces:**
- Produces: `proofId`, `industriesId`, `complianceId`

- [ ] **Step 1: Single published quote**

```js
proofId = Insert(mondayHomeId, {
  type: "frame",
  name: "In Their Words",
  layout: "vertical",
  gap: 16,
  padding: [72, 96],
  width: "fill_container",
  fill: "$ds-bg"
})
Insert(proofId, {
  type: "text",
  name: "Quote",
  content: "Aiden transformed how our engineers interact with observability. Natural language insights replaced complex queries and reduced dependency on SREs.",
  fontFamily: "Inter",
  fontSize: 22,
  lineHeight: 1.4,
  fill: "$ds-text-primary",
  textGrowth: "fixed-width",
  width: 900
})
Insert(proofId, {
  type: "text",
  name: "Cite",
  content: "Abhishek Gaurav, Head of Engineering and DevOps, greytHR",
  fontFamily: "Inter",
  fontSize: 14,
  fill: "$ds-text-secondary"
})
```

No Nielsen / Innovaccer / HEALTHCARE / MANUFACTURER cards. No `PLACEHOLDER` string.

- [ ] **Step 2: Industries (keep real proof only)**

```js
industriesId = Insert(mondayHomeId, {
  type: "frame",
  name: "Industries",
  layout: "horizontal",
  gap: 24,
  padding: [40, 96],
  width: "fill_container",
  fill: "$ds-bg"
})
for (const [t, b] of [
  ["Financial services", "53,000 deployments a week, 24% rework, at one leading Latin American bank."],
  ["Healthcare", "Innovaccer runs governed infrastructure change on Aiden today."]
]) {
  col = Insert(industriesId, {type: "frame", name: t, layout: "vertical", gap: 8, width: "fill_container"})
  Insert(col, {type: "text", name: t + " t", content: t, fontFamily: "Inter", fontSize: 16, fontWeight: "600", fill: "$ds-text-primary"})
  Insert(col, {type: "text", name: t + " b", content: b, fontFamily: "Inter", fontSize: 14, fill: "$ds-text-secondary", textGrowth: "fixed-width", width: 560})
}
```

- [ ] **Step 3: Compliance badges**

Copy the replica Home compliance badge row if it exists (SOC 2 / PCI SSC / HIPAA). Otherwise three labeled frames, no fake PCI checkmark.

```js
compSrc = Get("nwYaY", n => n.type === "frame" && /compliance|cert/i.test(n.name || "") ? n.id : undefined)[0]
Print("compSrc", compSrc)
if (compSrc) Copy(compSrc, mondayHomeId)
```

- [ ] **Step 4: Screenshot + PLACEHOLDER scan**

```js
TakeScreenshot([proofId])
Get(mondayHomeId, n => n.type === "text" && /PLACEHOLDER|\[NAME\]/i.test(n.content || "") && Print("BAN", n.content))
```

---

### Task 11: Final CTA + footer

**Files:**
- Modify: `Stack_Linear.pen`

**Interfaces:**
- Produces: `finalCtaId`, footer copy

Do not invent new OS sentences. Keep replica-safe close.

- [ ] **Step 1: Close band**

```js
finalCtaId = Insert(mondayHomeId, {
  type: "frame",
  name: "Final CTA",
  layout: "vertical",
  gap: 16,
  padding: [80, 96, 96, 96],
  width: "fill_container",
  fill: "$ds-surface",
  alignItems: "start"
})
Insert(finalCtaId, {
  type: "text",
  name: "Final Heading",
  content: "See the factory on a demo.",
  fontFamily: "Inter",
  fontSize: 36,
  fontWeight: "600",
  fill: "$ds-text-primary"
})
btn = Insert(finalCtaId, {
  type: "frame",
  name: "Final CTA Button",
  layout: "horizontal",
  padding: [12, 20],
  cornerRadius: 8,
  fill: "$ds-accent"
})
Insert(btn, {
  type: "text",
  name: "Final CTA Label",
  content: "Schedule demo",
  fontFamily: "Inter",
  fontSize: 15,
  fontWeight: "600",
  fill: "$ds-on-accent"
})
```

Nav keeps Schedule demo; hero stays Get started (replica CTA density).

- [ ] **Step 2: Copy footer from replica and Move to end**

```js
footerSrc = Get("nwYaY", n => n.type === "frame" && /footer/i.test(n.name || "") ? n.id : undefined)[0]
mondayFooterId = Copy(footerSrc, mondayHomeId)
Print(mondayFooterId)
```

- [ ] **Step 3: Clear placeholder flag and screenshot the page**

```js
Update(mondayHomeId, {placeholder: false})
TakeScreenshot([mondayHomeId])
Get(mondayHomeId, (n, c) => c.depth === 1 && Print(c.index, n.name, c.bounds.height))
```

Expected child order:

0 Nav  
1 Hero  
2 Logos  
3 One Platform  
4 Hard Intents  
5 In Their Words  
6 Industries  
7 Compliance (if copied)  
8 Final CTA  
9 Footer  

No Surfaces.

---

### Task 12: Dark mode sibling

**Files:**
- Modify: `Stack_Linear.pen`

**Interfaces:**
- Consumes: `mondayHomeId`
- Produces: `mondayHomeDarkId`

- [ ] **Step 1: Copy + theme**

```js
b = Get(mondayHomeId, {depth: 0})
mondayHomeDarkId = Copy(mondayHomeId, document, {
  name: "Monday — Home — Dark Mode",
  x: b.x + 1600,
  y: b.y,
  theme: {mode: "dark"}
})
Print(mondayHomeDarkId)
TakeScreenshot([mondayHomeDarkId])
```

Expected: same layout, `$ds-*` invert. Wordmarks still visible on `#0B0C0E` (`$ds-text-tertiary` in dark, not black SVGs).

- [ ] **Step 2: Contrast spot-check**

```js
Get(mondayHomeDarkId, n => n.type === "text" && n.fontSize >= 14 && Print(n.name, n.fill), {resolveVariables: true})
```

Tertiary on dark must not be `#101010`. If a copied replica footer still uses old `$accent` purple, leave footer as-is unless unreadable; do not restyle the whole replica system.

---

### Task 13: Deliver QA (ban scan, heuristics, export)

**Files:**
- Modify: none unless a BAN/CLIP print appears
- Optional export: `.superpowers/sdd/monday-mock/monday-home-light.png` and `monday-home-dark.png`

**Interfaces:**
- Consumes: `mondayHomeId`, `mondayHomeDarkId`

- [ ] **Step 1: Ban visitor (this is the failing test if copy drifted)**

```js
const ban = /intent router|Olly|InfraOps|Aiden for DevOps|PLACEHOLDER|10×|10x|Every surface|IDE via MCP/i
Get(mondayHomeId, n => n.type === "text" && ban.test(n.content || "") && Print("BAN", n.id, n.content))
Get(mondayHomeDarkId, n => n.type === "text" && ban.test(n.content || "") && Print("BAN-DARK", n.id, n.content))
Get(mondayHomeId, (n, c) => c.problems && Print("CLIP", n.name, c.problems))
```

Expected: empty. If `IDE via MCP` appears, you copied Surfaces. Delete that child.

- [ ] **Step 2: Heuristic pass (pencil-web-design-expert)**

| Check | Pass |
|---|---|
| Nielsen: one H1, diagram is the explanation | |
| WCAG AA: `$ds-text-primary` on `$ds-bg` (already tokenized) | |
| 8pt: padding 96 / 80 / 24 / 16 | |
| Hick: one hero CTA | |
| Progressive disclosure: Excel slots labeled | |
| No Surfaces in depth-1 names | |

```js
Get(mondayHomeId, (n, c) => c.depth === 1 && Print(n.name))
```

- [ ] **Step 3: Export**

```js
Export([mondayHomeId], "png", ".superpowers/sdd/monday-mock/monday-home-light.png", {scale: 2})
Export([mondayHomeDarkId], "png", ".superpowers/sdd/monday-mock/monday-home-dark.png", {scale: 2})
```

- [ ] **Step 4: Handoff note on canvas**

```js
Insert(document, {
  type: "note",
  name: "Handoff",
  x: Get(mondayHomeId, {depth: 0}).x,
  y: Get(mondayHomeId, {depth: 0}).y - 200,
  width: 640,
  height: 200,
  content: "Monday mock. Light + dark. Spec 2026-08-21-factory-launch-homepage-changes. Not code. Not App Replica. Wait on Dharani Excel and Product PRFAQ before OS copy.",
  fontFamily: "Inter",
  fontSize: 13,
  fill: "$ds-text-primary"
})
```

---

## Self-review

1. **Spec coverage:** D1–D10, §3.1 order, §4 diagram layers, §5 intents, §6 logos/quotes, §7 no invented OS, §8 no 10×, §9 no Surfaces, Monday acceptance §14.
2. **Placeholders:** Excel slots and animation captions are explicit, not fake customer copy.
3. **Type consistency:** `mondayHomeId` / `mondayHeroId` / `heroDiagramId` used the same way in later tasks. Re-`Get` by `name === "Monday — Home"` if a new session lost globals.
4. **Out of scope (correctly omitted):** Next.js, product pages, Platform PRFAQ copy, mutating `nwYaY`.

---

## Execution handoff

Plan complete and saved to `docs/superpowers/plans/2026-08-21-factory-launch-pencil-monday-mock.md`. Two execution options:

**1. Subagent-Driven (recommended)** — fresh subagent per task, screenshot review between tasks, fast iteration. REQUIRED SUB-SKILL: superpowers:subagent-driven-development. Each subagent must use pencil-web-design-expert + Pencil `execute` with this filePath.

**2. Inline Execution** — this session, executing-plans, one task at a time with screenshot checkpoints.

Which approach?
