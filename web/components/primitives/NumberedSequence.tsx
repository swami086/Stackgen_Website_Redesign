export type SequenceItem = { title: string; body: string; href?: string };

export function NumberedSequence({
  items,
  className,
}: {
  items: SequenceItem[];
  className?: string;
}) {
  return (
    <ol className={['grid gap-8', className].filter(Boolean).join(' ')}>
      {items.map((item, index) => (
        <li key={item.title} className="flex flex-col gap-3 border-t border-border-hairline pt-4">
          <span
            data-part="index"
            aria-hidden="true"
            className="font-mono text-[11px] tracking-[0.2em] text-accent-text"
          >
            {String(index + 1).padStart(2, '0')}
          </span>
          <h3 className="text-2xl leading-[29px] tracking-[0.01em] text-text-primary">{item.title}</h3>
          <p className="max-w-[52ch] text-base leading-6 tracking-[0.04em] text-text-secondary">
            {item.body}
          </p>
        </li>
      ))}
    </ol>
  );
}
