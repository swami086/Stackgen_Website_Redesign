import { SectionShell } from "@/components/primitives/SectionShell";
import platform from "@/content/platform";

export function TwoPlanes() {
  const { deterministic, agentic } = platform.twoPlanes;

  return (
    <SectionShell
      className="bg-surface py-[96px]"
      aria-labelledby="two-planes-heading"
    >
      <div className="mx-auto grid max-w-[1240px] grid-cols-2 gap-6">
        {[deterministic, agentic].map((plane) => (
          <article
            key={plane.title}
            className="flex flex-col gap-4 rounded-lg border border-border bg-bg p-8"
          >
            <h2
              id={plane === deterministic ? "two-planes-heading" : undefined}
              className="text-xl font-semibold text-text-primary"
            >
              {plane.title}
            </h2>
            <p className="text-base leading-[1.6] text-text-secondary">
              {plane.body}
            </p>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
