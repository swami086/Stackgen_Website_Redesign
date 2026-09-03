# Task 6 report: Live Pencil export helper

**Status:** DONE

## Deliverables

| File | Action |
|------|--------|
| `web/scripts/export-pencil-home.md` | Created — operator steps, `pick` visitor snippet, `PencilLike` shape, seed/verify commands |
| `web/puck/fixtures/home-zXASg-full.json` | Created — live MCP dump of `zXASg` (`resolveInstances: true`, depth 99) |
| `web/__tests__/pen-home-full-fixture-smoke.test.ts` | Created — fixture size smoke + optional `mapPencilTree` assertion |

## MCP export

- Used Pencil MCP `execute` on `NextJS.pen` with `Get("zXASg", { depth: 99, resolveInstances: true })` and recursive `pick` serializer.
- Fixture: **62,243 bytes**, root **`children.length === 9`** (Nav, Hero, Logos, Problem, Solution, Assemblies, Shell OCG, Who it's for, Footer).

## Test summary

```
pnpm vitest run __tests__/pen-home-full-fixture-smoke.test.ts
```

| Test | Result |
|------|--------|
| root has many section children (`children.length > 5`) | PASS |
| mapPencilTree yields a wide section tree | PASS |

**2/2 passed**

## Concerns

None. Full Home fixture produced via live Pencil MCP; smoke tests green.
