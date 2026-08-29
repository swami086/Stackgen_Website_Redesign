import Link from "next/link";
import { ReplicaLogo } from "@/components/replica/shared/ReplicaLogo";
import { replicaContent } from "@/content/replica";
import { cn } from "@/lib/cn";
import { REPLICA_FRAMES } from "@/lib/replica-frames";
import { ArrowUpRight } from "@phosphor-icons/react";

type ReplicaFooterProps = {
  theme: "light" | "dark";
  className?: string;
};

type FooterColumnProps = {
  title: string;
  items: readonly string[];
};

function FooterColumn({ title, items }: FooterColumnProps) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-2.5">
      <p className="text-[13px] font-medium text-text-primary">{title}</p>
      {items.map((item) => (
        <Link
          key={item}
          href="#"
          className="text-[13px] text-text-secondary no-underline transition-colors hover:text-text-primary"
        >
          {item}
        </Link>
      ))}
    </div>
  );
};

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
      className="inline-flex text-text-tertiary transition-colors hover:text-text-secondary"
    >
      {children}
    </Link>
  );
}

function LinkedInIcon() {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width={4} height={12} x={2} y={9} />
      <circle cx={4} cy={4} r={2} />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export function ReplicaFooter({ theme, className }: ReplicaFooterProps) {
  const {
    ctaHeading,
    ctaSub,
    cta,
    brand,
    product,
    platform,
    company,
    legal,
    legalLinks,
  } = replicaContent.footer;

  return (
    <footer
      data-pencil-id={REPLICA_FRAMES[theme].footer}
      className={cn(
        "flex w-full flex-col gap-8 border-t border-border bg-bg px-24 pb-8 pt-12",
        className,
      )}
    >
      <div className="flex w-full items-center justify-between gap-6 rounded-2xl border border-border bg-surface px-6 py-5">
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <p className="text-lg font-semibold text-text-primary">{ctaHeading}</p>
          <p className="text-[13px] text-text-secondary">{ctaSub}</p>
        </div>
        <Link
          href="#"
          className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-accent pl-5 pr-2 py-2 text-[13px] font-semibold text-on-accent no-underline transition-transform active:scale-[0.98]"
        >
          {cta}
          <div data-cta-icon className="flex size-8 items-center justify-center rounded-full bg-black/10 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-px group-hover:scale-105">
            <ArrowUpRight size={16} weight="bold" className="text-on-accent" />
          </div>
        </Link>
      </div>

      <div className="flex w-full gap-16">
        <div className="flex w-[280px] shrink-0 flex-col gap-3">
          <ReplicaLogo />
          <p className="text-[13px] text-text-tertiary">{brand}</p>
        </div>
        <FooterColumn title="Product" items={product} />
        <FooterColumn title="Platform" items={platform} />
        <FooterColumn title="Company" items={company} />
      </div>

      <div className="flex w-full items-center justify-between gap-6 border-t border-border pt-5">
        <p className="text-xs text-text-tertiary">{legal}</p>
        <div className="flex items-center gap-5">
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
        <div className="flex items-center gap-3">
          <FooterSocialLink href="#" label="LinkedIn">
            <LinkedInIcon />
          </FooterSocialLink>
          <FooterSocialLink href="#" label="Twitter">
            <TwitterIcon />
          </FooterSocialLink>
          <FooterSocialLink href="#" label="GitHub">
            <GitHubIcon />
          </FooterSocialLink>
        </div>
      </div>
    </footer>
  );
}
