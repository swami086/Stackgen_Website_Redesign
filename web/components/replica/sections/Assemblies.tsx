import { AtmosphereField } from "@/components/replica/shared/AtmosphereField";
import { InnerOuterLoop } from "@/components/replica/diagrams/InnerOuterLoop";
import { Integrations } from "@/components/replica/diagrams/Integrations";
import { Offerings } from "@/components/replica/diagrams/Offerings";
import { replicaContent } from "@/content/replica";
import { cn } from "@/lib/cn";
import { REPLICA_FRAMES } from "@/lib/replica-frames";

type ReplicaAssembliesProps = {
  theme: "light" | "dark";
  className?: string;
};

export function ReplicaAssemblies({ theme, className }: ReplicaAssembliesProps) {
  const { heading } = replicaContent.assemblies;

  return (
    <section
      data-pencil-id={REPLICA_FRAMES[theme].assemblies}
      className={cn(
        "relative overflow-hidden flex w-full flex-col items-center gap-4 px-4 py-8 md:gap-5 md:px-16 md:py-10",
        className,
      )}
    >
      <AtmosphereField slot="ground-assemblies" theme={theme} />
      <div className="relative z-10 flex w-full flex-col items-center gap-4 md:gap-5">
        <h2 className="whitespace-nowrap text-[28px] font-bold tracking-[-0.5px] text-text-primary md:text-[32px]">
          {heading}
        </h2>
        <InnerOuterLoop theme={theme} />
        <Offerings theme={theme} />
        <Integrations theme={theme} />
      </div>
    </section>
  );
}
