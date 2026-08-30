import { OperationalContextGraph } from "@/components/replica/diagrams/OperationalContextGraph";
import { AtmosphereField } from "@/components/replica/shared/AtmosphereField";
import { replicaContent } from "@/content/replica";
import { cn } from "@/lib/cn";
import { REPLICA_FRAMES } from "@/lib/replica-frames";

type ReplicaShellProps = {
  theme: "light" | "dark";
  className?: string;
};

export function ReplicaShell({ theme, className }: ReplicaShellProps) {
  const { eyebrow, heading, body1, body2 } = replicaContent.shell;

  return (
    <section
      data-pencil-id={REPLICA_FRAMES[theme].shell}
      className={cn(
        "relative overflow-hidden flex w-full flex-col items-center rounded-[20px] border border-border bg-surface px-[var(--spacing-pad-x)] py-6",
        className,
      )}
    >
      <AtmosphereField slot="ground-shell" theme={theme} />
      <div className="relative z-10 flex w-full flex-col items-center gap-4">
        <div className="flex w-full flex-col items-center gap-1.5">
          <div className="flex items-center justify-center rounded-full border border-border bg-surface px-3 py-1">
            <span className="whitespace-nowrap font-mono text-[11px] font-medium tracking-[2px] text-text-tertiary">
              {eyebrow}
            </span>
          </div>
          <h2 className="max-w-[900px] text-center text-[28px] font-bold leading-[1.1] tracking-[-1px] text-text-primary md:text-[32px]">
            {heading}
          </h2>
          <p className="max-w-[720px] text-center text-sm leading-normal text-text-secondary md:text-base">
            {body1}
          </p>
          <p className="max-w-[720px] text-center text-sm leading-normal text-text-tertiary">
            {body2}
          </p>
        </div>
        <OperationalContextGraph theme={theme} />
      </div>
    </section>
  );
}
