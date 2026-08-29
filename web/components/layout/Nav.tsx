"use client";

import Link from "next/link";
import { useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { Logo } from "@/components/primitives/Logo";
import { ButtonGhost } from "@/components/primitives/ButtonGhost";
import { ButtonPrimary } from "@/components/primitives/ButtonPrimary";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { cn } from "@/lib/cn";
import { LOGIN_ITEM, NAV_ITEMS, PRIMARY_CTA } from "@/lib/nav";

export function Nav() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 48);
  });

  return (
    <header
      className={cn(
        "relative sticky top-0 z-40 transition-[padding] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]",
        scrolled ? "px-4 pt-4" : "px-0 pt-0",
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-24 backdrop-blur-3xl backdrop-saturate-150"
        style={{
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, black 34%, rgba(0,0,0,0.78) 52%, rgba(0,0,0,0.42) 74%, transparent 100%)",
          maskImage:
            "linear-gradient(to bottom, black 0%, black 34%, rgba(0,0,0,0.78) 52%, rgba(0,0,0,0.42) 74%, transparent 100%)",
        }}
      />
      <div
        className={cn(
          "relative z-[1] mx-auto flex h-[60px] items-center gap-10 transition-[max-width,border-radius,background-color,border-color,box-shadow,padding] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]",
          scrolled
            ? "max-w-[min(1120px,calc(100%-32px))] rounded-full border border-border/60 bg-bg/88 px-8 shadow-[0_12px_40px_-20px_rgba(0,0,0,0.45)] backdrop-blur-xl"
            : "max-w-none border-b border-border bg-bg px-[100px]",
        )}
      >
        <Link
          href="/"
          className="inline-flex shrink-0 items-center"
          aria-label="StackGen home"
        >
          <Logo />
        </Link>

        <nav aria-label="Primary" className="flex items-center gap-[26px]">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-[13.5px] tracking-[-0.1px] text-text-secondary no-underline transition-[color,transform] duration-500 hover:-translate-y-px hover:text-text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="min-h-px min-w-px flex-1" aria-hidden />

        <div className="flex items-center gap-[18px]">
          <ButtonGhost href={LOGIN_ITEM.href}>{LOGIN_ITEM.label}</ButtonGhost>
          <ButtonPrimary href={PRIMARY_CTA.href}>
            {PRIMARY_CTA.label}
          </ButtonPrimary>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
