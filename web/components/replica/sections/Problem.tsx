"use client";

import Link from "next/link";
import { AtmosphereField } from "@/components/replica/shared/AtmosphereField";
import { OpsLag } from "@/components/replica/diagrams/OpsLag";
import { useReplicaContent } from "@/components/replica/ReplicaContentContext";
import { cn } from "@/lib/cn";
import { REPLICA_FRAMES } from "@/lib/replica-frames";

type Props = { theme: "light" | "dark"; className?: string };

/**
 * AOF Problem — Soft Structuralism Ops Lag diagram (Pencil `ifJjx`).
 * Copy stays short; anatomy lives in the diagram plate, not a symptom list.
 */
export function ReplicaProblem({ theme, className }: Props) {
  const p = useReplicaContent().problem;
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
        {p.punchline ? (
          <p className="text-sm font-semibold text-text-primary">{p.punchline}</p>
        ) : null}
        {/* body kept in content for SEO/a11y; not shown as a wall of text */}
        <p className="sr-only">{p.body}</p>
      </div>

      <div className="relative z-10 w-full max-w-5xl">
        <OpsLag theme={theme} caption={p.filmCaption} />
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
