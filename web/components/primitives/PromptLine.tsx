'use client';

import { useState } from 'react';

export function PromptLine({ prompt }: { prompt: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <div
      data-ground="panel"
      className="flex flex-wrap items-center gap-4 rounded-card border border-border-panel bg-panel px-4 py-3"
    >
      <code className="min-w-0 flex-1 overflow-x-auto font-mono text-[13px] text-text-on-panel">
        {prompt}
      </code>
      <button
        type="button"
        onClick={async () => {
          await navigator.clipboard.writeText(prompt);
          setCopied(true);
        }}
        className="ml-auto shrink-0 rounded-chip border border-border-panel px-3 py-1 font-mono text-[11px] tracking-[0.1em] text-accent uppercase"
      >
        Copy
      </button>
      <span
        role="status"
        aria-live="polite"
        className="min-w-[4.5rem] shrink-0 text-right font-mono text-[11px] text-text-muted-panel"
      >
        {copied ? 'Copied' : ''}
      </span>
    </div>
  );
}
