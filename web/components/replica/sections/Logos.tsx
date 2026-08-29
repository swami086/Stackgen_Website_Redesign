import { replicaContent } from "@/content/replica";
import { cn } from "@/lib/cn";
import { REPLICA_FRAMES } from "@/lib/replica-frames";
import { Stagger } from "@/components/replica/motion/Stagger";
import { STAGGER } from "@/lib/motion-tokens";

type ReplicaLogosProps = {
  theme: "light" | "dark";
  className?: string;
};

export function ReplicaLogos({ theme, className }: ReplicaLogosProps) {
  const { eyebrow, items } = replicaContent.logos;

  return (
    <section
      data-pencil-id={REPLICA_FRAMES[theme].logos}
      className={cn(
        "flex w-full flex-col items-center gap-8 p-24",
        className,
      )}
    >
      <p className="whitespace-nowrap text-center font-mono text-[11px] font-medium tracking-[2px] text-text-tertiary">
        {eyebrow}
      </p>
      <Stagger step={STAGGER.logo} className="flex w-full flex-row items-center justify-between gap-8">
        {items.map((logo) => (
          <div
            key={logo.alt}
            className="flex h-8 shrink-0 items-center justify-center"
          >
            <img
              src={logo.src}
              alt={logo.alt}
              className="h-5 w-auto max-w-full object-contain"
            />
          </div>
        ))}
      </Stagger>
    </section>
  );
}
