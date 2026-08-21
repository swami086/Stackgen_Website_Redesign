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
      className={['flex gap-12', className].filter(Boolean).join(' ')}
    >
      <div className="w-[520px] shrink-0">
        <p className="text-sm text-text-tertiary">{label}</p>
        <h2 className="mt-2 text-[32px] font-semibold leading-[1.2] tracking-[-0.018em] text-text-primary">
          {heading}
        </h2>
      </div>
      {body ? (
        <p className="w-[480px] text-base leading-normal text-text-secondary">
          {body}
        </p>
      ) : null}
    </div>
  );
}
