'use client';

import Link from 'next/link';
import { NAV_ITEMS, PRIMARY_CTA } from '@/lib/nav';
import { ButtonPrimary } from './ButtonPrimary';
import { Logo } from './Logo';

export function Nav({ className }: { className?: string }) {
  return (
    <nav
      className={[
        'flex h-[60px] items-center gap-10 border-b border-border-hairline bg-bg-base px-pad-x',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <Link href="/" aria-label="StackGen home">
        <Logo variant="wordmark" />
      </Link>

      <div className="flex items-center gap-[26px]">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="text-[13.5px] tracking-[-0.01em] text-text-secondary hover:text-text-primary"
          >
            {item.label}
          </Link>
        ))}
      </div>

      <div className="ml-auto flex items-center gap-[18px]">
        <ButtonPrimary href={PRIMARY_CTA.href}>{PRIMARY_CTA.label}</ButtonPrimary>
      </div>
    </nav>
  );
}
