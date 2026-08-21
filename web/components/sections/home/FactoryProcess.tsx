import { MonoLabel } from "@/components/primitives/MonoLabel";
import { SectionShell } from "@/components/primitives/SectionShell";
import home from "@/content/home";

export function FactoryProcess() {
  const { heading, body, steps } = home.factoryProcess;

  return (
    <SectionShell
      className="border-y border-border bg-surface py-[120px]"
      aria-labelledby="factory-process-heading"
    >
      <div className="mx-auto flex max-w-[1240px] flex-col gap-14">
        <div className="flex items-start justify-between gap-12">
          <h2
            id="factory-process-heading"
            className="max-w-[520px] text-[42px] font-medium leading-[1.12] tracking-[-0.03em] text-text-primary"
          >
            {heading}
          </h2>
          <p className="max-w-[480px] text-base leading-[1.6] text-text-secondary">
            {body}
          </p>
        </div>

        <ol className="grid grid-cols-4 gap-0">
          {steps.map((step) => (
            <li
              key={step.number}
              className="flex flex-col gap-3 border-r border-border pr-8 last:border-r-0"
            >
              <MonoLabel className="normal-case tracking-normal">
                {step.number}
              </MonoLabel>
              <h3 className="text-lg font-semibold text-text-primary">
                {step.title}
              </h3>
              <p className="text-sm leading-[1.5] text-text-secondary">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </SectionShell>
  );
}
