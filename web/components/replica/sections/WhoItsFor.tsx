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
import { replicaContent } from "@/content/replica";
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
  "aiden-for-infrastructure": {
    src: "/media/aiden-infra-security-audit/product-ui-skills-canvas.jpg",
    alt: "Aiden for Infrastructure skills canvas",
  },
  "aiden-for-automation": {
    src: "/media/aiden-home-change-surface/hero-app-only-1920.png",
    alt: "Aiden for Automation investigation surface",
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
  "aiden-for-infrastructure",
  "aiden-for-automation",
  "aiden-for-observability",
  "aiden-for-sre",
];

const ROLE_ICONS: Record<string, PhosphorIconName> = {
  "Platform Engineering": "rocket-launch",
  Developers: "terminal-window",
  DevSecOps: "shield-check",
  SRE: "heartbeat",
};

export function ReplicaWhoItsFor({ theme, className }: ReplicaWhoItsForProps) {
  const { eyebrow, heading, sub, pillars, roles, osTitle, osChips } =
    replicaContent.whoItsFor;

  return (
    <section
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
                href={`/product/${slug}`}
                data-bento-cell=""
                data-who-portrait=""
                className="group flex min-w-0 flex-col overflow-hidden rounded-[14px] border border-border bg-surface transition-colors hover:border-border-hover"
              >
                <div className="relative aspect-video overflow-hidden bg-surface-raised">
                  {/*
                    Same rule as Aiden OS left-frame (openmemory Task 10):
                    landscape product UI must not be stretched into a taller well.
                    Frame = video aspect; object-contain preserves intrinsic ratio.
                  */}
                  <img
                    src={media.src}
                    alt={media.alt}
                    className="absolute inset-0 h-full w-full object-contain object-top transition-transform duration-500 group-hover:scale-[1.02]"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="flex flex-col gap-1 px-3 py-2.5">
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

        {/* Role dock — Deel/Option B: name+icon chips, no paragraphs */}
        <div
          data-who-roles
          className="flex w-full flex-wrap items-center justify-center gap-2 rounded-xl border border-border bg-surface px-3 py-2.5"
        >
          <span className="mr-1 font-mono text-[9px] font-semibold uppercase tracking-[1.5px] text-text-tertiary">
            Roles
          </span>
          {roles.map((role) => (
            <div
              key={role.title}
              data-bento-cell=""
              data-who-role=""
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-bg px-2.5 py-1.5"
              title={role.body}
            >
              <PhosphorIcon
                name={ROLE_ICONS[role.title] ?? "stack"}
                className="size-3.5 text-accent"
              />
              <span className="text-[12px] font-medium text-text-primary">
                {role.title}
              </span>
            </div>
          ))}
        </div>

        {/* Aiden OS rail — chips fill the bar */}
        <div
          data-who-os
          className="flex w-full flex-wrap items-center gap-2 rounded-xl border border-[var(--ds-layer-os-stroke)] bg-[var(--ds-layer-os-bg)] px-3 py-2.5"
        >
          <span className="shrink-0 text-sm font-bold text-accent-text">
            {osTitle}
          </span>
          <div className="flex min-w-0 flex-1 flex-wrap gap-1.5">
            {osChips.map((chip) => (
              <span
                key={chip}
                className="inline-flex items-center rounded-full border border-border bg-bg px-2.5 py-1 text-[11px] text-text-secondary"
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
