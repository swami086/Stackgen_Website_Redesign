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
        "flex w-full flex-col items-center gap-8 p-24",
        className,
      )}
    >
      <h2 className="whitespace-nowrap text-[36px] font-bold tracking-[-0.5px] text-text-primary">
        {heading}
      </h2>
      <InnerOuterLoop theme={theme} />
      <Offerings theme={theme} />
      <Integrations theme={theme} />
    </section>
  );
}
