import Link from 'next/link';
import type { ReactNode } from 'react';

export function ButtonGhost({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={[
        'inline-flex h-8 items-center justify-center rounded-lg border border-border-hairline',
        'bg-transparent px-[14px] py-2 text-[13.5px] font-medium tracking-[-0.01em] text-text-primary',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </Link>
  );
}
