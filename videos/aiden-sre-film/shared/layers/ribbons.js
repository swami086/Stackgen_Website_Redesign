import * as THREE from "../vendor/three.module.min.js";
import { ribbonSeeds, ribbonAt, STAGE } from "./ribbon-math.js";

const VERT = `attribute float aU; attribute float aSide; varying float vU; varying float vSide;
void main(){ vU = aU; vSide = aSide; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`;
const FRAG = `uniform vec3 uColor; uniform float uOpacity; uniform float uFlow; varying float vU; varying float vSide;
void main(){
  float edge = 1.0 - smoothstep(0.55, 1.0, abs(vSide));
  float band = 0.35 + 0.65 * pow(fract(vU * 2.0 - uFlow), 6.0);
  float fade = smoothstep(0.0, 0.08, vU) * (1.0 - smoothstep(0.92, 1.0, vU));
  gl_FragColor = vec4(uColor, edge * band * fade * uOpacity);
}`;
const SAMPLES = 160;

function cssColor(name) {
  return new THREE.Color(getComputedStyle(document.documentElement).getPropertyValue(name).trim());
}

export function mountRibbons(host, { seed, count = 28, modes, split = 0.7 }) {
  const canvas = document.createElement("canvas");
  canvas.style.cssText = "position:absolute;inset:0;width:100%;height:100%";
  host.appendChild(canvas);
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, preserveDrawingBuffer: true });
  renderer.setPixelRatio(2);
  renderer.setSize(STAGE.w, STAGE.h, false);
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(0, STAGE.w, 0, STAGE.h, -10, 10);
  const violet = cssColor("--sg-violet"), cyan = cssColor("--sg-cyan");
  const ribbons = ribbonSeeds(seed, count).map((s, idx) => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(SAMPLES * 6), 3));
    const aU = new Float32Array(SAMPLES * 2), aSide = new Float32Array(SAMPLES * 2);
    for (let i = 0; i < SAMPLES; i++) {
      aU[2 * i] = aU[2 * i + 1] = i / (SAMPLES - 1);
      aSide[2 * i] = -1; aSide[2 * i + 1] = 1;
    }
    geo.setAttribute("aU", new THREE.BufferAttribute(aU, 1));
    geo.setAttribute("aSide", new THREE.BufferAttribute(aSide, 1));
    const index = [];
    for (let i = 0; i < SAMPLES - 1; i++) { const a = 2 * i; index.push(a, a + 1, a + 2, a + 1, a + 3, a + 2); }
    geo.setIndex(index);
    const mat = new THREE.ShaderMaterial({
      vertexShader: VERT, fragmentShader: FRAG, transparent: true, depthTest: false, depthWrite: false,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      uniforms: { uColor: { value: idx / count < split ? violet : cyan }, uOpacity: { value: s.alpha }, uFlow: { value: 0 } },
    });
    scene.add(new THREE.Mesh(geo, mat));
    return { s, geo, mat };
  });

  function render(t) {
    for (const r of ribbons) {
      const { points, opacity } = ribbonAt(r.s, modes, t);
      const curve = new THREE.CatmullRomCurve3(points.map(p => new THREE.Vector3(p.x, p.y, 0)));
      const pos = r.geo.attributes.position.array;
      for (let i = 0; i < SAMPLES; i++) {
        const u = i / (SAMPLES - 1), p = curve.getPoint(u), tan = curve.getTangent(u);
        const nx = -tan.y * r.s.width / 2, ny = tan.x * r.s.width / 2;
        pos.set([p.x + nx, p.y + ny, 0, p.x - nx, p.y - ny, 0], i * 6);
      }
      r.geo.attributes.position.needsUpdate = true;
      r.mat.uniforms.uFlow.value = t * r.s.speed * 0.35;
      r.mat.uniforms.uOpacity.value = r.s.alpha * opacity;
    }
    renderer.render(scene, camera);
  }

  function bind(tl, duration) {
    const proxy = { t: 0 };
    render(window.__hfThreeTime || 0);
    tl.to(proxy, { t: duration, duration, ease: "none", onUpdate: () => render(proxy.t) }, 0);
  }

  window.addEventListener("hf-seek", (event) => render(event.detail.time));
  return { render, bind };
}
