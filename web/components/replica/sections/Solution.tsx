"use client";

import { AtmosphereField } from "@/components/replica/shared/AtmosphereField";
import { useReplicaContent } from "@/components/replica/ReplicaContentContext";
import { cn } from "@/lib/cn";
import { REPLICA_FRAMES } from "@/lib/replica-frames";

type Props = { theme: "light" | "dark"; className?: string };

function PlayIcon() {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

/** Prior Soft Structuralism video plate — stand-in until Factory pillars Pencil ships. */
export function ReplicaSolution({ theme, className }: Props) {
  const s = useReplicaContent().solution;

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
        className="w-full max-w-3xl rounded-[20px] border border-border bg-surface p-1.5"
      >
        <div
          className="relative flex h-[480px] w-full flex-col items-center justify-center gap-4 overflow-hidden rounded-[14px] border border-border bg-surface-raised"
          role="img"
          aria-label={`Video placeholder: ${s.demoCaption}`}
          data-video-placeholder="solution"
        >
          <AtmosphereField slot="video-still" theme={theme} className="z-0" />
          <div className="relative z-10 flex flex-col items-center gap-4">
            <div
              className="flex h-16 w-16 items-center justify-center rounded-full bg-accent text-on-accent"
              aria-hidden
            >
              <PlayIcon />
            </div>
            <p className="text-sm text-text-secondary">{s.demoCaption}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
