export function SectionHeaderSplit({
  label,
  heading,
  body,
  className,
}: {
  label: string;
  heading: string;
  body?: string;
  className?: string;
}) {
  return (
    <div
      className={['flex gap-12 max-[1023px]:flex-col max-[1023px]:gap-5', className].filter(Boolean).join(' ')}
    >
      <div className="w-[520px] shrink-0 max-[1023px]:w-auto">
        <p className="text-sm text-text-tertiary">{label}</p>
        <h2 className="mt-2 text-[32px] font-semibold leading-[1.2] tracking-[-0.018em] text-text-primary">
          {heading}
        </h2>
      </div>
      {body ? (
        <p className="w-[480px] text-base leading-normal text-text-secondary max-[1023px]:w-auto">
          {body}
        </p>
      ) : null}
    </div>
  );
}
