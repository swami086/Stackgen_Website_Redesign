# Task 6 Report: S27 both buttons visible at the hold

## Status

**DONE**

## Scope

- **Modified:** `videos/aiden-sre-film/shots/S27/index.html` only (lines 60–80)
- **Commits:** none

## Implementation summary

### Ribbon modes

- Opening rail at `t: 0`: `opacity: 1` → **`opacity: 0.35`**
- Settle at `t: 0.6`, `mode: "dormant"`, `opacity: 0.4` — **unchanged**

### CTA timing

Replaced cue-driven `type.cta(...)` with fixed times and explicit vertical position:

```javascript
  type.cta(tl, {
    primary: "Book a demo",
    secondary: "Try Community Edition",
    micro: "free for up to two users",
    y: 620,
  }, 1.2, 2.0);
```

- Primary at **1.2s**; secondary at **2.0s** (0.5s fade → full opacity by **2.5s**, before ~62% hold ~4.19s on a 6.766s shot)

## Verification

### Step 1 (pre-change baseline)

```text
rg -n "cueT\(timing, \"Try Community Edition\"\)" shots/S27/index.html
```

One match at line 79 (confirmed from file read before edit).

### Step 3 (post-change)

```text
rg -n "}, 1.2, 2.0\);" shots/S27/index.html
80:  }, 1.2, 2.0);

rg -n "opacity: 0.35" shots/S27/index.html
60:      { t: 0, mode: "rail", opacity: 0.35 },
```

- `}, 1.2, 2.0);`: **one match**
- `opacity: 0.35`: **one match**
- `cueT(timing, "Try Community Edition")`: **no matches** (expected after edit)

## Self-review vs brief

| Requirement | Met |
|-------------|-----|
| Opening ribbon opacity 0.35 | Yes |
| Ribbon settle t 0.6 opacity 0.4 unchanged | Yes |
| CTA times 1.2 and 2.0 | Yes |
| `y: 620` on CTA spec | Yes |
| Only `S27/index.html` edited | Yes |
| No commit | Yes |

## Concerns

- `cueT` remains imported from `shot.js` but is unused after this change. Brief scoped edits to lines 60–79; import left as-is.

## Test summary

Brief `rg` checks pass: one `}, 1.2, 2.0);`, one `opacity: 0.35`; late Try Community Edition cue removed.
