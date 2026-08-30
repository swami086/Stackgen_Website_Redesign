import Link from "next/link";
import {
  ArrowUpRight,
  GithubLogo,
  LinkedinLogo,
  XLogo,
} from "@phosphor-icons/react";
import { ReplicaLogo } from "@/components/replica/shared/ReplicaLogo";
import { replicaContent } from "@/content/replica";
import { cn } from "@/lib/cn";
import { PRODUCTS } from "@/lib/products";
import { REPLICA_FRAMES } from "@/lib/replica-frames";

type ReplicaFooterProps = {
  theme: "light" | "dark";
  className?: string;
};

type FooterLink = {
  label: string;
  href: string;
};

const PRODUCT_LINKS: readonly FooterLink[] = Object.values(PRODUCTS).map(
  (product) => ({
    label: product.title,
    href: product.href,
  }),
);

const PLATFORM_LINKS: readonly FooterLink[] = [
  { label: "Aiden OS", href: "#" },
  { label: "Context Graph", href: "#" },
  { label: "AppStacks", href: "#" },
  { label: "Policies", href: "#" },
];

const COMPANY_HREFS: Record<string, string> = {
  Docs: "/docs",
  About: "#",
  Pricing: "#",
  Contact: "#",
  Security: "#",
};

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: readonly FooterLink[];
}) {
  return (
    <div className="flex min-w-0 flex-col gap-2.5">
      <p className="text-[12px] font-medium uppercase tracking-[0.08em] text-text-tertiary">
        {title}
      </p>
      <ul className="flex flex-col gap-2">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-[13px] text-text-secondary no-underline transition-colors hover:text-text-primary"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FooterSocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="inline-flex size-8 items-center justify-center rounded-lg border border-border bg-surface text-text-secondary transition-colors hover:border-border-hover hover:text-text-primary"
    >
      {children}
    </Link>
  );
}

/**
 * Footer — Soft Structuralism refinement.
 * Mobbin: Attio (CTA → columns → meta), Linear/Chronicle (brand left + tight
 * column cluster — no flex-1 stretch), Vercel (status under brand),
 * Runway (bordered social marks).
 */
export function ReplicaFooter({ theme, className }: ReplicaFooterProps) {
  const { ctaHeading, ctaSub, cta, brand, company, legal, legalLinks } =
    replicaContent.footer;

  const companyLinks: FooterLink[] = company.map((label) => ({
    label,
    href: COMPANY_HREFS[label] ?? "#",
  }));

  return (
    <footer
      data-pencil-id={REPLICA_FRAMES[theme].footer}
      className={cn(
        "flex w-full flex-col gap-8 border-t border-border bg-bg px-6 pb-8 pt-10 md:gap-10 md:px-16 md:pb-10 md:pt-12",
        className,
      )}
    >
      {/* CTA band — Attio / Relume: one job, left copy + right pill */}
      <div className="rounded-2xl border border-border bg-surface-raised/40 p-1">
        <div className="flex w-full flex-col items-start justify-between gap-4 rounded-[calc(1rem-2px)] border border-border bg-surface px-5 py-5 sm:flex-row sm:items-center md:px-7 md:py-6">
          <div className="flex min-w-0 flex-1 flex-col gap-1.5">
            <p className="text-lg font-semibold tracking-tight text-text-primary md:text-xl">
              {ctaHeading}
            </p>
            <p className="max-w-xl text-[13px] leading-snug text-text-secondary">
              {ctaSub}
            </p>
          </div>
          <Link
            href="#"
            className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-accent pl-5 pr-2 py-2 text-[13px] font-semibold text-on-accent no-underline transition-transform active:scale-[0.98]"
          >
            {cta}
            <div
              data-cta-icon
              className="flex size-8 items-center justify-center rounded-full bg-black/10 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-px group-hover:scale-105"
            >
              <ArrowUpRight
                size={16}
                weight="bold"
                className="text-on-accent"
              />
            </div>
          </Link>
        </div>
      </div>

      {/* Brand + columns — Chronicle/Linear: cluster, do not stretch flex-1 */}
      <div className="flex w-full flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
        <div className="flex max-w-xs shrink-0 flex-col gap-3">
          <ReplicaLogo />
          <p className="text-[13px] leading-snug text-text-tertiary">{brand}</p>
          <p className="inline-flex items-center gap-2 text-[12px] text-text-tertiary">
            <span
              className="size-1.5 shrink-0 rounded-full bg-pass"
              aria-hidden
            />
            Status: All systems normal
          </p>
        </div>

        <div className="grid w-full grid-cols-2 gap-x-10 gap-y-8 sm:max-w-2xl sm:grid-cols-3 lg:w-auto lg:max-w-none lg:shrink-0 lg:gap-x-14">
          <FooterColumn title="Product" links={PRODUCT_LINKS} />
          <FooterColumn title="Platform" links={PLATFORM_LINKS} />
          <FooterColumn title="Company" links={companyLinks} />
        </div>
      </div>

      {/* Meta bar — Attio: copyright | legal | social islands */}
      <div className="flex w-full flex-col gap-4 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <p className="text-xs text-text-tertiary">{legal}</p>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {legalLinks.map((item) => (
            <Link
              key={item}
              href="#"
              className="text-xs text-text-tertiary no-underline transition-colors hover:text-text-secondary"
            >
              {item}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <FooterSocialLink href="#" label="LinkedIn">
            <LinkedinLogo size={16} weight="regular" />
          </FooterSocialLink>
          <FooterSocialLink href="#" label="X">
            <XLogo size={16} weight="regular" />
          </FooterSocialLink>
          <FooterSocialLink href="#" label="GitHub">
            <GithubLogo size={16} weight="regular" />
          </FooterSocialLink>
        </div>
      </div>
    </footer>
  );
}
