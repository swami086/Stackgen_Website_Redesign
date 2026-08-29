"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { replicaContent } from "@/content/replica";
import { ReplicaLogo } from "@/components/replica/shared/ReplicaLogo";
import { ReplicaPrimaryPill } from "@/components/replica/shared/ReplicaPrimaryPill";
import { ThemeToggle } from "@/components/replica/theme/ThemeToggle";
import { REPLICA_FRAMES } from "@/lib/replica-frames";
import { cn } from "@/lib/cn";
import { EASE_CSS } from "@/lib/motion-tokens";

type ReplicaNavProps = {
  theme: "light" | "dark";
  className?: string;
};

export function ReplicaNav({ theme, className }: ReplicaNavProps) {
  const { links, cta } = replicaContent.nav;
  const [material, setMaterial] = useState<"glass" | "solid">("glass");

  useEffect(() => {
    const sentinel = document.getElementById("hero-substrate-end");
    if (!sentinel) return;
    // IntersectionObserver, never a scroll listener.
    const io = new IntersectionObserver(
      ([entry]) => setMaterial(entry!.isIntersecting ? "glass" : "solid"),
      { rootMargin: "-64px 0px 0px 0px", threshold: 0 },
    );
    io.observe(sentinel);
    return () => io.disconnect();
  }, []);

  return (
    <header
      data-pencil-id={REPLICA_FRAMES[theme].nav}
      className={cn(
        "fixed left-0 right-0 top-0 z-50 flex justify-center px-6 pt-6",
        className,
      )}
    >
      <div
        data-nav-material={material}
        className={cn(
          "flex h-[60px] w-full max-w-[1200px] items-center gap-10 rounded-full px-6 transition-[background,box-shadow,backdrop-filter] duration-240 glow-source",
          material === "glass" ? "glass-real" : "glass-specular",
        )}
        style={{ transitionTimingFunction: EASE_CSS.standard }}
      >
        <Link
          href="/"
          className="inline-flex shrink-0 items-center"
          aria-label="StackGen home"
        >
          <ReplicaLogo />
        </Link>

        <nav aria-label="Primary" className="flex items-center gap-[26px]">
          {links.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="whitespace-nowrap text-[13.5px] tracking-[-0.1px] text-text-secondary no-underline transition-colors hover:text-text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="min-h-px min-w-px flex-1" aria-hidden />

        <div className="flex items-center gap-[18px]">
          <ReplicaPrimaryPill label={cta.label} href={cta.href} variant="nav" />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
