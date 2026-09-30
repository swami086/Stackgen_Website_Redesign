import test from "node:test";
import assert from "node:assert/strict";
import { arcPoint } from "../../shared/layers/cursor.js";

test("arc endpoints are exact", () => {
  assert.deepEqual(arcPoint({ x: 0, y: 0 }, { x: 100, y: 0 }, 0), { x: 0, y: 0 });
  assert.deepEqual(arcPoint({ x: 0, y: 0 }, { x: 100, y: 0 }, 1), { x: 100, y: 0 });
});
test("arc bows perpendicular at midpoint", () => {
  const m = arcPoint({ x: 0, y: 0 }, { x: 100, y: 0 }, 0.5, 0.12);
  assert.equal(m.x, 50);
  assert.ok(Math.abs(Math.abs(m.y) - 6) < 1e-9);
});
