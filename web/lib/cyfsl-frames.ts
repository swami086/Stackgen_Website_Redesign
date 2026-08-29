/** Pencil node IDs for CYfSl section order — dark home only. */
export const CYFSL_FRAMES = {
  frame: "CYfSl",
  nav: "cYtoM",
  hero: "PzSjX",
  video: "coT3f",
  logos: "TKCFb",
  assemblies: "C2kYT",
  shell: "V2P0L",
  whoItsFor: "ck4Dy",
  footer: "Wp1Dh",
} as const;

export type CyfslFrameId = (typeof CYFSL_FRAMES)[keyof typeof CYFSL_FRAMES];
