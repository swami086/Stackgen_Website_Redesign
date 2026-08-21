const [, , nodeId, name] = process.argv;
if (!nodeId || !name) {
  console.error('usage: node extract-geometry.mjs <nodeId> <name>');
  process.exit(1);
}
console.log(`
const root = Get(${JSON.stringify(nodeId)}, { depth: 0 });
const out = { nodeId: ${JSON.stringify(nodeId)}, name: ${JSON.stringify(name)},
  viewBox: [0, 0, Math.round(root.width || 0), Math.round(root.height || 0)], nodes: [] };
let ox = null, oy = null;
Get(${JSON.stringify(nodeId)}, (n, c) => {
  if (ox === null) { ox = c.bounds.x; oy = c.bounds.y; }
  out.nodes.push({
    id: n.id, name: n.name || null, type: n.type,
    x: Math.round(c.bounds.x - ox), y: Math.round(c.bounds.y - oy),
    width: Math.round(c.bounds.width), height: Math.round(c.bounds.height),
    fill: n.fill ?? null, stroke: n.stroke ?? null,
    strokeWidth: n.strokeWidth ?? null, cornerRadius: n.cornerRadius ?? null,
    text: n.content ?? null, fontSize: n.fontSize ?? null,
    fontWeight: n.fontWeight ?? null, fontFamily: n.fontFamily ?? null,
    depth: c.depth
  });
  if (c.problems) Print("PROBLEM", n.id, n.name, c.problems);
}, { resolveVariables: false, resolveInstances: true });
Print(JSON.stringify(out));
`);
