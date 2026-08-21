import Image from "next/image";
import { MonoLabel } from "@/components/primitives/MonoLabel";
import { SectionShell } from "@/components/primitives/SectionShell";
import type { ProductMechanism } from "@/content/products";

type MechanismProps = {
  mechanism: ProductMechanism;
};

export function Mechanism({ mechanism }: MechanismProps) {
  const {
    heading,
    body,
    image,
    callouts,
    steps,
    footnote,
    prompt,
    correlation,
    handoff,
  } = mechanism;

  return (
    <SectionShell
      className="bg-surface py-[72px]"
      aria-labelledby="product-mechanism-heading"
    >
      <div className="mx-auto flex max-w-[1240px] flex-col gap-6">
        <h2
          id="product-mechanism-heading"
          className="max-w-[820px] text-[32px] font-medium leading-[1.15] tracking-[-0.025em] text-text-primary"
        >
          {heading}
        </h2>
        <p className="max-w-[760px] text-base leading-[1.55] text-text-secondary">
          {body}
        </p>

        {image ? (
          <div className="overflow-hidden border border-[#1F2124] bg-[#0B0C0E]">
            <Image
              src={image.src}
              alt={image.captionDetail}
              width={1040}
              height={585}
              className="h-auto w-full"
            />
            <div className="flex items-center gap-3 border-t border-[#1F2124] px-6 py-4">
              <MonoLabel className="text-accent-text">{image.captionLabel}</MonoLabel>
              <span className="text-[13px] text-text-secondary">
                {image.captionDetail}
              </span>
            </div>
          </div>
        ) : null}

        {callouts && callouts.length > 0 ? (
          <div className="flex gap-5">
            {callouts.map((callout) => (
              <div
                key={callout.label}
                className="flex w-[510px] flex-col gap-2.5 rounded-2xl border border-border bg-surface-raised p-[18px]"
              >
                <MonoLabel className="text-accent-text">{callout.label}</MonoLabel>
                <p className="text-[15px] leading-[1.45] text-text-secondary">
                  {callout.detail}
                </p>
              </div>
            ))}
          </div>
        ) : null}

        {prompt ? (
          <div className="rounded-2xl border border-border bg-surface-raised p-[14px_18px]">
            <MonoLabel className="text-accent-text">{prompt.label}</MonoLabel>
            <p className="mt-1.5 text-lg font-medium leading-[1.25] text-text-primary">
              {prompt.text}
            </p>
          </div>
        ) : null}

        {correlation ? (
          <div className="rounded-[22px] border border-border bg-surface p-5">
            <div className="grid grid-cols-3 gap-4 border-b border-border pb-4">
              {correlation.signals.map((signal) => (
                <div key={signal.category} className="flex flex-col gap-1">
                  <span className="text-sm font-medium text-text-primary">
                    {signal.category}
                  </span>
                  <span className="text-sm text-text-secondary">
                    {signal.detail}
                  </span>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-6 py-4">
              <div>
                <MonoLabel>{correlation.infraState.label}</MonoLabel>
                <ul className="mt-2 list-none space-y-1 p-0">
                  {correlation.infraState.items.map((item) => (
                    <li key={item} className="text-sm text-text-secondary">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <MonoLabel>{correlation.changeHistory.label}</MonoLabel>
                <ul className="mt-2 list-none space-y-1 p-0">
                  {correlation.changeHistory.items.map((item) => (
                    <li key={item} className="text-sm text-text-secondary">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="rounded-xl border border-border bg-surface-raised p-4">
              <MonoLabel>{correlation.insight.label}</MonoLabel>
              <p className="mt-2 text-base font-medium text-text-primary">
                {correlation.insight.text}
              </p>
            </div>
          </div>
        ) : null}

        {steps && steps.length > 0 ? (
          <div className="rounded-3xl border border-border bg-surface-raised px-7 py-6">
            <ol className="m-0 list-none space-y-0 p-0">
              {steps.map((step, index) => (
                <li
                  key={step.tag}
                  className="flex gap-[18px] border-b border-border py-[18px] last:border-b-0"
                >
                  <div className="flex w-7 flex-col items-center gap-2 pt-1">
                    <span
                      className="h-2.5 w-2.5 rounded-full bg-accent"
                      aria-hidden="true"
                    />
                    {index < steps.length - 1 ? (
                      <span
                        className="h-[74px] w-0.5 bg-border"
                        aria-hidden="true"
                      />
                    ) : null}
                  </div>
                  <div className="flex flex-1 flex-col gap-2">
                    <span className="inline-flex w-fit rounded-full bg-accent px-2.5 py-1.5 font-mono text-[10.5px] text-on-accent">
                      {step.tag}
                    </span>
                    <h3 className="text-2xl font-medium tracking-[-0.017em] text-text-primary">
                      {step.title}
                    </h3>
                    <p className="text-[15px] leading-[1.45] text-text-secondary">
                      {step.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        ) : null}

        {handoff ? (
          <div className="rounded-2xl border border-border bg-surface-raised p-[18px]">
            <MonoLabel className="text-accent-text">{handoff.label}</MonoLabel>
            <p className="mt-2 text-[15px] leading-[1.45] text-text-secondary">
              {handoff.text}
            </p>
          </div>
        ) : null}

        {footnote ? (
          <p className="text-sm text-text-tertiary">{footnote}</p>
        ) : null}
      </div>
    </SectionShell>
  );
}
