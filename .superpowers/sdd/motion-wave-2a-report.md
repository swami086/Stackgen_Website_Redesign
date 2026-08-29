# Motion Wave 2A Report (InnerOuterLoop)

**Status:** Complete
**Commit:** feat: rebuild RBepL as a live work-item simulation
**Tests:** 5/5 passing in `web/__tests__/diagram-inner-outer-loop.test.tsx`
**Anchor Table Used:**
```tsx
const SOURCES = [
  { id: "ide", x: 0.14, y: 0.22, emits: "edit" },
  { id: "git", x: 0.14, y: 0.41, emits: "commit" },
  { id: "ci", x: 0.14, y: 0.6, emits: "pipeline" },
  { id: "iac", x: 0.14, y: 0.79, emits: "plan" },
] as const;

const HUB = { id: "hub", x: 0.5, y: 0.5 };

const SINKS = [
  { id: "runtime", x: 0.86, y: 0.3 },
  { id: "infra", x: 0.86, y: 0.5 },
  { id: "obs", x: 0.86, y: 0.7 },
] as const;
```
**Arrow Confirmation:** Static Lucide arrow connectors are completely absent. Travelling particles now carry direction.
**Concerns:** Spoke calculations assume perfectly matching width/height (80px core, 280px total track). If sizes change, the length and translation (`40px` offset, `100px` width) of spokes will need adjusting.
**Report Path:** `.superpowers/sdd/motion-wave-2a-report.md`