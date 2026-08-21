import Link from 'next/link';
import { PRIMARY_CTA } from '@/lib/nav';
import { Logo } from './Logo';

const FOOTER_COLUMNS = [
  {
    title: 'Product',
    links: [
      { label: 'Infrastructure', href: '/product/aiden-for-infrastructure' },
      { label: 'Automation', href: '/product/aiden-for-automation' },
      { label: 'Observability', href: '/product/aiden-for-observability' },
      { label: 'SRE', href: '/product/aiden-for-sre' },
    ],
  },
  {
    title: 'Platform',
    links: [
      { label: 'Integrations', href: '/platform#integrations' },
      { label: 'Cloud to Code', href: '/platform#cloud-to-code' },
      { label: 'Policies', href: '/platform#policies' },
      { label: 'IaC Lifecycle', href: '/platform#iac-lifecycle' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Contact', href: '/contact' },
      { label: PRIMARY_CTA.label, href: PRIMARY_CTA.href },
    ],
  },
] as const;

export function Footer({ className }: { className?: string }) {
  return (
    <footer
      className={[
        'flex flex-col gap-10 border-t border-border-hairline bg-bg-base px-pad-x py-12',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="flex gap-16">
        <div className="flex w-[280px] flex-col gap-3">
          <Logo />
          <p className="text-[13px] text-text-tertiary">
            Infrastructure that ships itself.
          </p>
        </div>

        {FOOTER_COLUMNS.map((column) => (
          <div key={column.title} className="flex w-64 flex-col gap-2.5">
            <p className="text-[13px] font-medium text-text-primary">{column.title}</p>
            {column.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[13px] text-text-secondary hover:text-text-primary"
              >
                {link.label}
              </Link>
            ))}
          </div>
        ))}
      </div>

      <p className="text-xs text-text-tertiary">© StackGen. All rights reserved.</p>
    </footer>
  );
}
