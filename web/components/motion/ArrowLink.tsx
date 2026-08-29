"use client";

import Link from "next/link";
import { cn } from "@/lib/cn";

type ArrowLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

/** factory.ai "Read more" link — arrow rotates -45° on hover. */
export function ArrowLink({ href, children, className }: ArrowLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-1 text-sm text-text-secondary no-underline transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-accent-text",
        className,
      )}
    >
      {children}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-3.5 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:-rotate-45"
        aria-hidden
      >
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </svg>
    </Link>
  );
}
