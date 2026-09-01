"use client";

/**
 * Who It's For — Option B (product portraits + role dock).
 * Structure: Better Stack / Deel Mobbin pattern — UI vignette dominates,
 * short caption, then audience dock + OS rail. Vignettes are real product
 * UI frames (not Nano Banana). Soft Structuralism $ds-*.
 */
import Link from "next/link";
import { PhosphorIcon } from "@/components/primitives/PhosphorIcon";
import { AtmosphereField } from "@/components/replica/shared/AtmosphereField";
import { useReplicaContent } from "@/components/replica/ReplicaContentContext";
import { cn } from "@/lib/cn";
import type { PhosphorIconName } from "@/lib/phosphor-icons";
import type { ProductHeroSlug } from "@/lib/product-media";
import { REPLICA_FRAMES } from "@/lib/replica-frames";

type ReplicaWhoItsForProps = {
  theme: "light" | "dark";
  className?: string;
};

/** Real product UI stills from shipped demo footage — not generative comps. */
const PORTRAIT_SRC: Record<
  ProductHeroSlug,
  { src: string; alt: string }
> = {
  "aiden-for-infraops": {
    src: "/media/aiden-infra-security-audit/product-ui-skills-canvas.jpg",
    alt: "Aiden for InfraOps skills canvas",
  },
  "aiden-for-devops": {
    src: "/media/aiden-home-change-surface/hero-app-only-1920.png",
    alt: "Aiden for DevOps investigation surface",
  },
  "aiden-for-observability": {
    src: "/media/aiden-observability-sre-investigator/ui-45s.jpg",
    alt: "Aiden for Observability investigator",
  },
  "aiden-for-sre": {
    src: "/media/aiden-observability-sre-investigator/skills-investigator-1920.png",
    alt: "Aiden for SRE investigator skills",
  },
};

const PILLAR_SLUGS: ProductHeroSlug[] = [
  "aiden-for-infraops",
  "aiden-for-devops",
  "aiden-for-observability",
  "aiden-for-sre",
];

const ROLE_ICONS: Record<string, PhosphorIconName> = {
  SRE: "heartbeat",
  Developer: "terminal-window",
  DevOps: "arrows-clockwise",
};

export function ReplicaWhoItsFor({ theme, className }: ReplicaWhoItsForProps) {
  const { eyebrow, heading, sub, pillars, roles, osTitle, osChips } =
    useReplicaContent().whoItsFor;

  return (
    <section
      id="who"
      data-pencil-id={REPLICA_FRAMES[theme].whoItsFor}
      data-who-layout="portraits-dock"
      className={cn(
        "relative overflow-hidden flex w-full flex-col gap-5 bg-bg px-4 py-10 md:gap-6 md:px-16 md:py-12",
        className,
      )}
    >
      <AtmosphereField slot="ground-who" theme={theme} />
      <div className="relative z-10 flex w-full flex-col gap-5 md:gap-6">
        <header className="flex w-full flex-col items-center gap-2">
          <div className="rounded-full border border-border bg-surface px-3 py-1">
            <span className="text-[10px] font-semibold tracking-[2px] text-text-tertiary">
              {eyebrow}
            </span>
          </div>
          <h2 className="max-w-3xl text-center text-[28px] font-bold leading-[1.15] tracking-[-0.5px] text-text-primary md:text-[32px]">
            {heading}
          </h2>
          <p className="max-w-xl text-center text-sm leading-snug text-text-secondary md:text-[15px]">
            {sub}
          </p>
        </header>

        {/* Product portraits — Better Stack: vignette owns the cell */}
        <div
          data-who-pillars
          className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-3"
        >
          {pillars.map((pillar, i) => {
            const slug = PILLAR_SLUGS[i]!;
            const media = PORTRAIT_SRC[slug];
            return (
              <Link
                key={pillar.title}
                href={pillar.href}
                data-bento-cell=""
                data-who-portrait=""
                className="group flex min-w-0 flex-col overflow-hidden rounded-[14px] border border-border bg-surface shadow-sm transition-colors hover:border-border-hover"
              >
                <div className="relative aspect-video overflow-hidden bg-surface-raised">
                  {/*
                    Same rule as Aiden OS left-frame (openmemory Task 10):
                    landscape product UI must not be stretched into a taller well.
                    Frame = video aspect; object-contain preserves intrinsic ratio.
                    Gloss stays off the photo — glass-specular ::after was washing
                    Observability/SRE stills (Impeccable quieter).
                  */}
                  <img
                    src={media.src}
                    alt={media.alt}
                    className="absolute inset-0 z-0 h-full w-full object-contain object-top transition-transform duration-500 group-hover:scale-[1.02]"
                    loading="lazy"
                    decoding="async"
                  />
                  {/* Whisper rim only — not a fog sheet over product UI */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-6 bg-gradient-to-b from-white/[0.12] to-transparent"
                  />
                </div>
                <div className="relative z-10 flex flex-col gap-1 border-t border-border/60 px-3 py-2.5">
                  <span className="font-mono text-[9px] font-medium uppercase tracking-[1.5px] text-text-tertiary">
                    {pillar.label}
                  </span>
                  <h3 className="text-[13px] font-semibold leading-snug text-text-primary">
                    {pillar.title}
                  </h3>
                  <p className="text-[12px] leading-snug text-text-secondary">
                    {pillar.body}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Persona dock — titles plus job language, not tooltip-only chips. */}
        <div
          data-who-roles
          className="glass-specular relative z-10 flex w-full flex-col gap-2 rounded-xl px-3 py-2.5"
        >
          <span className="relative z-[2] font-mono text-[9px] font-semibold uppercase tracking-[1.5px] text-text-tertiary">
            For
          </span>
          <div className="relative z-[2] grid w-full grid-cols-1 gap-2 sm:grid-cols-3">
            {roles.map((role) => (
              <Link
                key={role.title}
                href={role.href}
                data-bento-cell=""
                data-who-role=""
                className="glass-tile flex min-w-0 flex-col items-start gap-1 rounded-xl px-3 py-2.5 transition-colors hover:border-border-hover"
              >
                <span className="inline-flex items-center gap-1.5">
                  <PhosphorIcon
                    name={ROLE_ICONS[role.title] ?? "stack"}
                    className="size-3.5 text-accent"
                  />
                  <span className="text-[12px] font-semibold text-text-primary">
                    {role.title}
                  </span>
                </span>
                <p className="text-[12px] leading-snug text-text-secondary">
                  {role.body}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Aiden OS rail — same liquid plate as Roles (was flat ds-layer-os matte). */}
        <div
          data-who-os
          className="glass-specular relative z-10 flex w-full flex-wrap items-center gap-2 rounded-xl px-3 py-2.5"
        >
          <span className="relative z-[2] shrink-0 text-sm font-bold text-accent-text">
            {osTitle}
          </span>
          <div className="relative z-[2] flex min-w-0 flex-1 flex-wrap gap-1.5">
            {osChips.map((chip) => (
              <span
                key={chip}
                className="glass-tile inline-flex items-center rounded-full px-2.5 py-1 text-[11px] text-text-secondary"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
