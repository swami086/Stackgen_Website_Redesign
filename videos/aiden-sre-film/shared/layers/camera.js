export const PARALLAX = { bg: 0.25, mid: 1.0, fg: 1.35 };
const FIELDS = ["x", "y", "z", "rx", "ry", "rz", "scale"];

export function poseAt(cam, p) {
  const t = Math.min(Math.max(p, 0), 1) * cam.duration;
  const k = cam.keys;
  let i = 0;
  while (i < k.length - 2 && t > k[i + 1].t) i++;
  const a = k[i], b = k[i + 1];
  const u = b.t === a.t ? 1 : (t - a.t) / (b.t - a.t);
  const pose = {};
  for (const f of FIELDS) pose[f] = a[f] + (b[f] - a[f]) * u;
  return pose;
}

export function transformFor(pose, factor, pass, perspective = 2400) {
  const s = 1 + (pose.scale - 1) * factor;
  const x = pose.x * factor, y = pose.y * factor, z = pose.z * factor;
  if (pass === "mid") {
    return `translate3d(${x}px, ${y}px, ${z}px) rotateX(${pose.rx}deg) rotateY(${pose.ry}deg) rotateZ(${pose.rz}deg) scale(${s})`;
  }
  const zs = perspective / (perspective - z);
  return `translate(${x}px, ${y}px) rotate(${pose.rz * factor}deg) scale(${(s * zs).toFixed(5)})`;
}

export function applyCamera(tl, cam, roots, duration) {
  const proxy = { p: 0 };
  const paint = () => {
    const pose = poseAt(cam, proxy.p);
    for (const [pass, el] of Object.entries(roots)) {
      if (el) el.style.transform = transformFor(pose, PARALLAX[pass], pass, cam.perspective);
    }
  };
  paint();
  tl.to(proxy, { p: 1, duration, ease: cam.ease, onUpdate: paint }, 0);
}
