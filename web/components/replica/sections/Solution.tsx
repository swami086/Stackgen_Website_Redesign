"use client";

import { DiagramPlaceholder } from "@/components/replica/shared/DiagramPlaceholder";
import { homeDiagramPlaceholders } from "@/content/diagram-placeholders";
import { replicaContent } from "@/content/replica";
import { cn } from "@/lib/cn";
import { REPLICA_FRAMES } from "@/lib/replica-frames";

type Props = { theme: "light" | "dark"; className?: string };

export function ReplicaSolution({ theme, className }: Props) {
  const s = replicaContent.solution;

  return (
    <section
      id="solution"
      className={cn(
        "relative flex w-full flex-col items-center gap-6 px-4 py-10 md:px-16",
        className,
      )}
    >
      <div className="flex w-full max-w-3xl flex-col items-center gap-4 text-center">
        <div className="rounded-full border border-border bg-surface px-3 py-1">
          <span className="font-mono text-[11px] font-medium uppercase tracking-[2px] text-text-tertiary">
            {s.eyebrow}
          </span>
        </div>
        <h2 className="text-[28px] font-bold leading-[1.1] tracking-[-1px] text-text-primary md:text-[32px]">
          {s.heading}
        </h2>
        <p className="text-sm leading-snug text-text-secondary md:text-[15px]">{s.body}</p>
        <p className="text-sm font-semibold text-text-primary">{s.claim}</p>
      </div>

      <div className="flex w-full max-w-3xl gap-3 text-xs text-text-tertiary">
        <span>{s.demoLabelLeft}</span>
        <span aria-hidden>·</span>
        <span>{s.demoLabelRight}</span>
      </div>

      <div
        data-pencil-id={REPLICA_FRAMES[theme].video}
        className="w-full max-w-5xl"
      >
        <DiagramPlaceholder
          theme={theme}
          content={homeDiagramPlaceholders.solutionPillars}
        />
        <p className="sr-only">{s.demoCaption}</p>
      </div>
    </section>
  );
}
