import test from "node:test";
import assert from "node:assert/strict";
import { ribbonSeeds, pointsFor, modeWeights, ribbonAt } from "../../shared/layers/ribbon-math.js";

test("seeds are deterministic", () => {
  assert.deepEqual(ribbonSeeds(5, 4), ribbonSeeds(5, 4));
  assert.notDeepEqual(ribbonSeeds(5, 4), ribbonSeeds(6, 4));
});
test("converge ends at target; fan starts at target", () => {
  const s = ribbonSeeds(1, 1)[0], tgt = { x: 1500, y: 540 };
  const c = pointsFor(s, "converge", 1.2, tgt).at(-1);
  const f = pointsFor(s, "fan", 1.2, tgt)[0];
  for (const p of [c, f]) { assert.ok(Math.abs(p.x - 1500) < 1e-6); assert.ok(Math.abs(p.y - 540) < 1e-6); }
});
test("mode blend weights sum to 1 and settle", () => {
  const modes = [{ t: 0, mode: "dormant" }, { t: 2, mode: "storm" }];
  assert.deepEqual(modeWeights(modes, 1).map(m => m.w), [1]);
  const mid = modeWeights(modes, 2.4);
  assert.equal(mid.length, 2);
  assert.ok(Math.abs(mid[0].w + mid[1].w - 1) < 1e-9);
  assert.deepEqual(modeWeights(modes, 3).map(m => m.mode), ["storm"]);
});
test("ribbonAt is a pure function of (seed, modes, t)", () => {
  const s = ribbonSeeds(9, 1)[0], m = [{ t: 0, mode: "rail" }];
  assert.deepEqual(ribbonAt(s, m, 3.3), ribbonAt(s, m, 3.3));
});
test("unknown mode throws", () => { assert.throws(() => pointsFor(ribbonSeeds(1, 1)[0], "spiral", 0)); });
