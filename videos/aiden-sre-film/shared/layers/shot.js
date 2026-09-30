export function selectPass(id, pass) {
  const out = {};
  for (const p of ["bg", "mid", "fg"]) {
    const el = document.getElementById(`${id}-${p}`);
    if (pass === "all" || p === pass) out[p] = p === "bg" ? el : el.querySelector(".cam");
    else el.style.display = "none";
  }
  document.documentElement.dataset.pass = pass;
  return out;
}

export function shotData(id, mode) {
  const s = window.SG_DATA.shots[id];
  return { meta: s.meta, timing: s[mode] ?? s.full, cam: window.SG_DATA.cameras[id] };
}

export function cueT(timing, text) {
  const o = timing.ost.find(x => x.text === text);
  if (!o) throw new Error(`no cue "${text}" in ${timing.id}`);
  return o.t;
}
