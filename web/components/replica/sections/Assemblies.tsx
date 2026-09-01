"use client";

import Link from "next/link";
import { AtmosphereField } from "@/components/replica/shared/AtmosphereField";
import { InnerOuterLoop } from "@/components/replica/diagrams/InnerOuterLoop";
import { Integrations } from "@/components/replica/diagrams/Integrations";
import { Offerings } from "@/components/replica/diagrams/Offerings";
import { useReplicaContent } from "@/components/replica/ReplicaContentContext";
import { cn } from "@/lib/cn";
import { REPLICA_FRAMES } from "@/lib/replica-frames";

type ReplicaAssembliesProps = {
  theme: "light" | "dark";
  className?: string;
};

export function ReplicaAssemblies({ theme, className }: ReplicaAssembliesProps) {
  const { eyebrow, heading, body, learnMore } = useReplicaContent().assemblies;

  return (
    <section
      id="how-it-works"
      data-pencil-id={REPLICA_FRAMES[theme].assemblies}
      className={cn(
        "relative overflow-hidden flex w-full flex-col items-center gap-4 px-4 py-8 md:gap-5 md:px-16 md:py-10",
        className,
      )}
    >
      <AtmosphereField slot="ground-assemblies" theme={theme} />
      <div className="relative z-10 flex w-full flex-col items-center gap-4 md:gap-5">
        <div className="flex w-full max-w-3xl flex-col items-center gap-2 text-center">
          <div className="rounded-full border border-border bg-surface px-3 py-1">
            <span className="font-mono text-[11px] font-medium tracking-[2px] text-text-tertiary">
              {eyebrow}
            </span>
          </div>
          <h2 className="text-[28px] font-bold leading-[1.1] tracking-[-1px] text-text-primary md:text-[32px]">
            {heading}
          </h2>
          <p className="max-w-xl text-sm leading-snug text-text-secondary md:text-[15px]">
            {body}
          </p>
          <Link href={learnMore.href} className="text-sm text-accent-text no-underline">
            {learnMore.label} →
          </Link>
        </div>
        <InnerOuterLoop theme={theme} />
        <Offerings theme={theme} />
        <Integrations theme={theme} />
      </div>
    </section>
  );
}
