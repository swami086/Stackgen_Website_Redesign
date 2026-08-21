import { MonoLabel } from "@/components/primitives/MonoLabel";
import { SectionShell } from "@/components/primitives/SectionShell";
import home from "@/content/home";

export function AdfLoop() {
  const { heading, body, inputs, factory, outcomes, stateRail } = home.adfLoop;

  return (
    <SectionShell
      className="border-y border-border bg-surface py-[120px]"
      aria-labelledby="adf-loop-heading"
    >
      <div className="mx-auto flex max-w-[1240px] flex-col gap-14">
        <div className="flex gap-20">
          <h2
            id="adf-loop-heading"
            className="max-w-[520px] shrink-0 text-[42px] font-medium leading-[1.12] tracking-[-0.03em] text-text-primary"
          >
            {heading}
          </h2>
          <p className="flex-1 text-base leading-[1.6] text-text-secondary">
            {body}
          </p>
        </div>

        <div className="flex flex-col gap-10">
          <div className="grid grid-cols-3 gap-10">
            <div className="flex flex-col gap-4">
              <MonoLabel>{inputs.label}</MonoLabel>
              <div className="rounded-lg border border-border bg-bg p-5">
                <p className="font-medium text-text-primary">
                  {inputs.specTitle}
                </p>
                <p className="mt-1 text-sm text-text-tertiary">
                  {inputs.specCaption}
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {inputs.chips.map((chip) => (
                    <li
                      key={chip}
                      className="rounded-md border border-border px-2.5 py-1 text-xs text-text-secondary"
                    >
                      {chip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <MonoLabel>{factory.label}</MonoLabel>
              <div className="rounded-lg border border-border bg-bg p-5">
                <ul className="flex flex-wrap gap-2">
                  {factory.stages.map((stage) => (
                    <li
                      key={stage}
                      className="rounded-md border border-border px-3 py-1.5 text-sm font-medium text-text-primary"
                    >
                      {stage}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 font-medium text-text-primary">
                  {factory.osTitle}
                </p>
                <p className="mt-1 text-sm text-text-secondary">
                  {factory.osCaption}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <MonoLabel>{outcomes.label}</MonoLabel>
              <ul className="flex flex-col gap-4">
                {outcomes.items.map((item) => (
                  <li
                    key={item.label}
                    className="rounded-lg border border-border bg-bg p-5"
                  >
                    <p className="font-mono text-2xl text-accent-text">
                      {item.value}
                    </p>
                    <p className="mt-1 text-sm text-text-secondary">
                      {item.label}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <ul className="grid grid-cols-4 gap-0 border border-border">
            {stateRail.map((state) => (
              <li
                key={state.title}
                className="border-r border-border p-6 last:border-r-0"
              >
                <h3 className="text-base font-semibold text-text-primary">
                  {state.title}
                </h3>
                <p className="mt-2 text-sm leading-[1.5] text-text-secondary">
                  {state.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SectionShell>
  );
}
