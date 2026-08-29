import { ContextGraph } from "@/components/replica/diagrams/ContextGraph";
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
        "flex w-full flex-col items-center rounded-[20px] border border-border bg-surface px-[var(--spacing-pad-x)] py-8",
        className,
      )}
    >
      <div className="flex w-full flex-col items-center gap-6">
        <div className="flex w-full flex-col items-center gap-2">
          <div className="flex items-center justify-center rounded-full border border-border bg-surface px-3 py-1.5">
            <span className="whitespace-nowrap font-mono text-[11px] font-medium tracking-[2px] text-text-tertiary">
              {eyebrow}
            </span>
          </div>
          <h2 className="max-w-[900px] text-center text-[32px] font-bold leading-[1.1] tracking-[-1px] text-text-primary">
            {heading}
          </h2>
          <p className="max-w-[720px] text-center text-base leading-normal text-text-secondary">
            {body1}
          </p>
          <p className="max-w-[720px] text-center text-sm leading-normal text-text-tertiary">
            {body2}
          </p>
        </div>
        <ContextGraph theme={theme} />
      </div>
    </section>
  );
}
