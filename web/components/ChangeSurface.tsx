export type ChangeSurfaceProps = {
  intent: string;
  diff: string;
  verdict: { state: 'pass' | 'halt'; label: string; rule: string };
  mergeTarget: string;
  className?: string;
  /** Plan file path shown in the generated-plan column header. */
  planFile?: string;
  /** Agent path label in the surface header. */
  agentLabel?: string;
  /** Halt notice body copy when verdict state is halt. */
  haltBody?: string;
};

type DiffLineKind = 'add' | 'remove' | 'change' | 'context';

function diffLineKind(line: string): DiffLineKind {
  if (line.startsWith('+')) return 'add';
  if (line.startsWith('-')) return 'remove';
  if (line.startsWith('~')) return 'change';
  return 'context';
}

const diffLineColor: Record<DiffLineKind, string> = {
  add: 'text-[var(--color-pass)]',
  remove: 'text-[var(--color-halt)]',
  change: 'text-[var(--color-halt)]',
  context: 'text-text-secondary',
};

export function ChangeSurface({
  intent,
  diff,
  verdict,
  mergeTarget,
  className,
  planFile,
  agentLabel,
  haltBody,
}: ChangeSurfaceProps) {
  const diffLines = diff.split('\n');
  const verdictColors =
    verdict.state === 'pass'
      ? 'border-[var(--color-pass)] bg-[color-mix(in_srgb,var(--color-pass)_12%,transparent)] text-[var(--color-pass)]'
      : 'border-[var(--color-halt)] bg-[color-mix(in_srgb,var(--color-halt)_12%,transparent)] text-[var(--color-halt)]';

  return (
    <div
      className={[
        'overflow-hidden rounded-2xl border border-border-card bg-surface-sunken',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <header className="flex h-[54px] items-center gap-3 border-b border-border-hairline px-[18px]">
        <span
          aria-hidden="true"
          className="size-[11px] shrink-0 rounded-[3px] bg-accent"
        />
        {agentLabel ? (
          <span className="font-mono text-xs text-text-primary">{agentLabel}</span>
        ) : null}
        <span className="font-mono text-[11px] text-text-tertiary">run 4c81e2</span>
        <span className="flex-1" />
        <div className="rounded-md bg-accent-dim px-[10px] py-1.5">
          <span className="font-mono text-[10.5px] text-accent-text">
            TIRITH POLICY GATE
          </span>
        </div>
      </header>

      <div className="flex min-h-[420px]">
        <div
          className="w-[340px] shrink-0 border-r border-border-hairline p-5"
          data-part="intent"
        >
          <p className="font-mono text-[10.5px] uppercase text-text-tertiary">
            Intent
          </p>
          <p className="mt-4 text-[14.5px] leading-normal text-text-primary">
            {intent}
          </p>
        </div>

        <div className="w-[538px] shrink-0 border-r border-border-hairline p-5">
          <div className="mb-4 flex items-center gap-3">
            <p className="font-mono text-[10.5px] uppercase text-text-tertiary">
              Generated plan
            </p>
            {planFile ? (
              <p className="ml-auto font-mono text-[10.5px] text-text-tertiary">
                {planFile}
              </p>
            ) : null}
          </div>
          <pre
            className="overflow-x-auto font-mono text-[11.5px] leading-[22px]"
            data-part="diff"
          >
            <code>
              {diffLines.map((line, index) => (
                <span
                  key={index}
                  className={['block', diffLineColor[diffLineKind(line)]].join(' ')}
                  data-part="diff-line"
                >
                  {line.length > 0 ? line : ' '}
                </span>
              ))}
            </code>
          </pre>
        </div>

        <div className="flex min-w-0 flex-1 flex-col p-5">
          <p className="font-mono text-[10.5px] uppercase text-text-tertiary">
            Policy evaluation
          </p>

          <div
            className={[
              'mt-4 inline-flex w-fit items-center rounded-md border px-3 py-1 font-mono text-[11px]',
              verdictColors,
            ].join(' ')}
            data-part="verdict"
          >
            {verdict.label}
          </div>

          <p className="mt-2 font-mono text-[11px] text-text-secondary">
            {verdict.rule}
          </p>

          {verdict.state === 'halt' && haltBody ? (
            <p className="mt-4 text-xs leading-normal text-text-secondary">
              {haltBody}
            </p>
          ) : null}

          <p
            className="mt-auto pt-6 font-mono text-[11px] text-text-secondary"
            data-part="merge-target"
          >
            {mergeTarget}
          </p>
        </div>
      </div>

      <footer className="border-t border-border-hairline bg-bg-base px-[18px] py-3">
        <p className="font-mono text-[11px] text-text-tertiary">
          3 of 4 policies auto-cleared · 1 escalated to the change owner · 0 actions
          executed outside policy
        </p>
      </footer>
    </div>
  );
}
