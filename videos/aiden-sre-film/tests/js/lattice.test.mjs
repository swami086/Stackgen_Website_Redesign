import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { isoToStage } from "../../shared/layers/lattice.js";

test("iso projection", () => {
  assert.deepEqual(isoToStage(0, 0), { x: 960, y: 300 });
  assert.deepEqual(isoToStage(2, 1), { x: 1070, y: 492 });
});

test("graph has required services, unique cells, valid edges", () => {
  const g = JSON.parse(readFileSync(new URL("../../data/graph.json", import.meta.url)));
  const ids = new Set(g.nodes.map(n => n.id));
  for (const need of ["checkout-svc", "payments-api", "api-gateway", "kafka"]) assert.ok(ids.has(need));
  assert.equal(new Set(g.nodes.map(n => `${n.gx},${n.gy}`)).size, g.nodes.length);
  for (const [a, b] of g.edges) { assert.ok(ids.has(a)); assert.ok(ids.has(b)); }
});
