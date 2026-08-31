"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { replicaContent } from "@/content/replica";
import { cn } from "@/lib/cn";
import { REPLICA_FRAMES } from "@/lib/replica-frames";
import { DUR, EASE } from "@/lib/motion-tokens";
import { useReducedMotionSafe } from "@/components/replica/motion/useReducedMotionSafe";
import { GridSubstrate } from "@/components/replica/motion/GridSubstrate";
import { AtmosphereField } from "@/components/replica/shared/AtmosphereField";

type ReplicaHeroProps = {
  theme: "light" | "dark";
  className?: string;
};

export function ReplicaHero({ theme, className }: ReplicaHeroProps) {
  const { heading, sub, primaryCta, primaryHref, secondaryCta, secondaryHref } =
    replicaContent.hero;
  const reduced = useReducedMotionSafe();
  const tokens = heading.split(/(\s+)/);

  return (
    <section
      data-pencil-id={REPLICA_FRAMES[theme].hero}
      className={cn(
        "relative flex min-h-[100dvh] w-full flex-col items-center pt-24",
        className,
      )}
    >
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <AtmosphereField slot="hero-field" theme={theme} />
        <GridSubstrate />
      </div>

      <div className="grid w-full max-w-[1200px] flex-1 grid-cols-1 px-6 lg:grid-cols-12 lg:gap-10">
        <div className="flex flex-col justify-center lg:col-span-7">
          <h1 className="max-w-[800px] text-[56px] font-bold leading-[1.1] tracking-[-1px] text-text-primary">
            {tokens.map((tok, i) =>
              /^\s+$/.test(tok) ? (
                <span key={i}>{tok}</span>
              ) : (
                <span key={i} className="inline-block overflow-hidden align-bottom">
                  <motion.span
                    data-word
                    className="inline-block"
                    initial={reduced ? false : { y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{
                      duration: DUR.shell,
                      delay: reduced ? 0 : i * 0.06,
                      ease: EASE.emphasize,
                    }}
                  >
                    {tok}
                  </motion.span>
                </span>
              ),
            )}
          </h1>
          <p className="mt-6 max-w-[700px] text-[17px] leading-[1.4] text-text-secondary">
            {sub}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href={primaryHref}
              className="glow-source inline-flex items-center justify-center whitespace-nowrap rounded-full bg-accent px-6 py-3 text-sm font-medium text-on-accent no-underline"
            >
              {primaryCta}
            </Link>
            <Link
              href={secondaryHref}
              className="group inline-flex items-center gap-3 whitespace-nowrap rounded-full px-6 py-3 text-sm font-medium text-text-primary no-underline outline outline-1 -outline-offset-1 outline-border"
            >
              {secondaryCta}
              <span
                className="flex size-6 items-center justify-center rounded-full bg-surface-raised"
                aria-hidden
              >
                <svg viewBox="0 0 14 14" fill="currentColor" className="size-3">
                  <path d="M6.9 2.35a.45.45 0 0 0-.32.17.45.45 0 0 0-.15.6c.03.09.26.32 1.36 1.37 1.58 1.58 1.58 1.6 0 .01-3.46.01h-3.45a.45.45 0 0 0-.39.38.45.45 0 0 0 .15.62c.09.1.17.17.25.2.09.03.53.03 3.01.03 3.43 0 3.43.01 0 .01-1.58 1.6-1.36 1.37-.23.24-.26.32-.06.64.03.17.15.28.28.28.18 0 .42-.18.52-.46l1.68-1.68q2.11-2.1 2.15-2.18a.45.45 0 0 0 0-.56q-.04-.08-2.15-2.18-2.1-2.1-2.18-2.14a.45.45 0 0 0-.24-.06z" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
        <div className="flex flex-col justify-center lg:col-span-5">
          {/* Ambient hub teaser goes here */}
        </div>
      </div>

      <div id="hero-substrate-end" className="absolute bottom-0 h-px w-full" />
    </section>
  );
}
