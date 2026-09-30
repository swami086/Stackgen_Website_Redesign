import test from "node:test";
import assert from "node:assert/strict";
import { mulberry32 } from "../../shared/layers/prng.js";

test("same seed, same sequence; range [0,1)", () => {
  const a = mulberry32(7), b = mulberry32(7);
  for (let i = 0; i < 100; i++) { const x = a(); assert.equal(x, b()); assert.ok(x >= 0 && x < 1); }
});
test("different seeds differ", () => { assert.notEqual(mulberry32(1)(), mulberry32(2)()); });
