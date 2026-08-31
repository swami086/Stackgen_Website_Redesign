"use client";

import Link from "next/link";
import { AtmosphereField } from "@/components/replica/shared/AtmosphereField";
import { ProblemChaosFilm } from "@/components/replica/diagrams/ProblemChaosFilm";
import { replicaContent } from "@/content/replica";
import { cn } from "@/lib/cn";
import { REPLICA_FRAMES } from "@/lib/replica-frames";

type Props = { theme: "light" | "dark"; className?: string };

/**
 * Approach C Problem — A+B hybrid (Ramp chaos inside Framer/Tines cinema plate).
 * Copy stays short; symptoms live as film fragments, not a text list.
 */
export function ReplicaProblem({ theme, className }: Props) {
  const p = replicaContent.problem;
  return (
    <section
      id="problem"
      data-pencil-id={REPLICA_FRAMES[theme].problem}
      className={cn(
        "relative overflow-hidden flex w-full flex-col items-center gap-6 px-4 py-10 md:px-16 md:py-12",
        className,
      )}
    >
      <AtmosphereField slot="ground-shell" theme={theme} />
      <div className="relative z-10 flex w-full max-w-3xl flex-col items-center gap-3 text-center">
        <div className="rounded-full border border-border bg-surface px-3 py-1">
          <span className="font-mono text-[11px] font-medium tracking-[2px] text-text-tertiary">
            {p.eyebrow}
          </span>
        </div>
        <h2 className="text-[28px] font-bold leading-[1.1] tracking-[-1px] text-text-primary md:text-[32px]">
          {p.heading}
        </h2>
        <p className="text-sm font-semibold text-text-primary">{p.punchline}</p>
        {/* body kept in content for SEO/a11y; not shown as a wall of text */}
        <p className="sr-only">{p.body}</p>
      </div>

      <div className="relative z-10 w-full max-w-3xl">
        <ProblemChaosFilm caption={p.filmCaption} />
      </div>

      <Link
        href={p.learnMore.href}
        className="relative z-10 text-sm text-accent-text no-underline"
      >
        {p.learnMore.label} →
      </Link>
    </section>
  );
}
