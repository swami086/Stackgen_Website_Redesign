import { AtmosphereField } from "@/components/replica/shared/AtmosphereField";
import { replicaContent } from "@/content/replica";
import { cn } from "@/lib/cn";
import { REPLICA_FRAMES } from "@/lib/replica-frames";

type ReplicaVideoProps = {
  theme: "light" | "dark";
  className?: string;
};

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

export function ReplicaVideo({ theme, className }: ReplicaVideoProps) {
  const { label } = replicaContent.video;

  return (
    <section
      data-pencil-id={REPLICA_FRAMES[theme].video}
      className={cn(
        "flex w-full flex-col items-center px-[var(--spacing-pad-x)]",
        className,
      )}
    >
      <div className="w-full rounded-[20px] border border-border bg-surface p-1.5">
        <div
          className="relative flex h-[480px] w-full flex-col items-center justify-center gap-4 overflow-hidden rounded-[14px] border border-border bg-surface-raised"
          role="img"
          aria-label={`Video placeholder: ${label}`}
        >
          <AtmosphereField slot="video-still" theme={theme} className="z-0" />
          <div className="relative z-10 flex flex-col items-center gap-4">
            <div
              className="flex h-16 w-16 items-center justify-center rounded-full bg-accent text-on-accent"
              aria-hidden
            >
              <PlayIcon />
            </div>
            <p className="text-sm text-text-secondary">{label}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
