"use client";

import { OperationalContextGraph } from "@/components/replica/diagrams/OperationalContextGraph";
import { AtmosphereField } from "@/components/replica/shared/AtmosphereField";
import { useReplicaContent } from "@/components/replica/ReplicaContentContext";
import { cn } from "@/lib/cn";
import { REPLICA_FRAMES } from "@/lib/replica-frames";

type ReplicaShellProps = {
  theme: "light" | "dark";
  className?: string;
};

export function ReplicaShell({ theme, className }: ReplicaShellProps) {
  const { eyebrow, heading, body1, body2 } = useReplicaContent().shell;

  return (
    <section
      id="ocg"
      data-pencil-id={REPLICA_FRAMES[theme].shell}
      className={cn(
        // Match Assemblies / WhoItsFor content width — no nested glass plate.
        "relative overflow-hidden flex w-full flex-col items-center px-4 py-8 md:gap-5 md:px-16 md:py-10",
        className,
      )}
    >
      <AtmosphereField slot="ground-shell" theme={theme} />
      <div className="relative z-10 flex w-full flex-col items-center gap-3 md:gap-4">
        <div className="flex w-full flex-col items-center gap-1.5">
          <div className="rounded-full border border-border bg-surface px-3 py-1">
            <span className="whitespace-nowrap font-mono text-[11px] font-medium tracking-[2px] text-text-tertiary">
              {eyebrow}
            </span>
          </div>
          <h2 className="max-w-3xl text-center text-[28px] font-bold leading-[1.1] tracking-[-1px] text-text-primary md:text-[32px]">
            {heading}
          </h2>
          <p className="max-w-xl text-center text-sm leading-snug text-text-secondary md:text-[15px]">
            {body1}
          </p>
          <p className="max-w-xl text-center text-sm leading-snug text-text-tertiary">
            {body2}
          </p>
        </div>
        <OperationalContextGraph theme={theme} />
      </div>
    </section>
  );
}
