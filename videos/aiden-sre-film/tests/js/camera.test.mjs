import test from "node:test";
import assert from "node:assert/strict";
import { poseAt, transformFor } from "../../shared/layers/camera.js";

const K = (t, o = {}) => ({ t, x: 0, y: 0, z: 0, rx: 0, ry: 0, rz: 0, scale: 1, ...o });
const cam = { duration: 4, keys: [K(0), K(2, { x: 100 }), K(4, { x: 100, scale: 1.1 })] };

test("poseAt endpoints and interior keys", () => {
  assert.equal(poseAt(cam, 0).x, 0);
  assert.equal(poseAt(cam, 0.25).x, 50);
  assert.equal(poseAt(cam, 0.5).x, 100);
  assert.ok(Math.abs(poseAt(cam, 1).scale - 1.1) < 1e-9);
});
test("mid pass uses 3D transform; flat passes turn z into scale", () => {
  const p = { x: 0, y: 0, z: 240, rx: 0, ry: 0, rz: 0, scale: 1 };
  assert.match(transformFor(p, 1, "mid"), /translate3d\(0px, 0px, 240px\)/);
  const s = Number(transformFor(p, 1, "fg").match(/scale\(([\d.]+)\)/)[1]);
  assert.ok(s > 1.1 && s < 1.12);
});
