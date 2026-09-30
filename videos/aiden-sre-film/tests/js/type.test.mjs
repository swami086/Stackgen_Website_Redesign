import test from "node:test";
import assert from "node:assert/strict";
import { splitWords } from "../../shared/layers/type.js";

test("marks bold substring words", () => {
  assert.deepEqual(splitWords("Your AI SRE teammate.", "AI SRE"), [
    { word: "Your", bold: false }, { word: "AI", bold: true },
    { word: "SRE", bold: true }, { word: "teammate.", bold: false }]);
});
test("no bold", () => { assert.equal(splitWords("One two", null).every(w => !w.bold), true); });
