'use client';

import Link from 'next/link';
import { NAV_ITEMS, PRIMARY_CTA } from '@/lib/nav';
import { ButtonPrimary } from './ButtonPrimary';
import { Logo } from './Logo';

export function Nav({ className }: { className?: string }) {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-bg-base focus:text-text-primary"
      >
        Skip to main content
      </a>
      <nav
      className={[
        'relative flex h-[60px] items-center gap-10 border-b border-border-hairline bg-bg-base px-pad-x max-[1023px]:h-14 max-[1023px]:gap-0',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <Link href="/" aria-label="StackGen home" className="shrink-0">
        <Logo variant="full" className="max-[1023px]:hidden" />
        <Logo variant="wordmark" className="hidden max-[1023px]:block" />
      </Link>

      <div className="flex items-center gap-[26px] max-[1023px]:hidden">
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
        <ButtonPrimary
          href={PRIMARY_CTA.href}
          className="max-[1023px]:hidden"
        >
          {PRIMARY_CTA.label}
        </ButtonPrimary>
        <details className="relative hidden max-[1023px]:block">
          <summary className="flex h-9 cursor-pointer list-none items-center rounded-lg border border-border-card px-3 text-[13px] text-text-secondary marker:hidden">
            Menu
          </summary>
          <div className="absolute right-0 top-12 z-40 flex w-52 flex-col gap-1 rounded-lg border border-border-card bg-bg-raised p-2 shadow-[0_12px_32px_#00000066]">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-2.5 text-sm text-text-secondary hover:bg-surface-card hover:text-text-primary"
              >
                {item.label}
              </Link>
            ))}
            <ButtonPrimary href={PRIMARY_CTA.href} className="mt-1 w-full">
              {PRIMARY_CTA.label}
            </ButtonPrimary>
          </div>
        </details>
      </div>
    </nav>
    </>
  );
}
