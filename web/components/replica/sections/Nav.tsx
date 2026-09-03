"use client";

/**
 * Floating island nav — Soft Structuralism + Apple Liquid Glass.
 *
 * Principles (Adopting Liquid Glass):
 * - Distinct functional layer floating above content
 * - Clear glass over media-rich hero; regular denser glass when scrolled
 * - Minimize on scroll-down / expand on scroll-up (tabBarMinimizeBehavior)
 * - Scroll-edge veil for legibility; no Tier-3 glow on glass (no stacking)
 * - Primary CTA stays solid (glassProminent analog)
 * - Island hugs content (no flex-1 canyon between links and CTA)
 *
 * Research: Apple Adopting Liquid Glass; Firecrawl CLI; impeccable animate
 * (layout morph 300–500ms); navigation-menus timing.
 */
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type FocusEvent,
} from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useReplicaContent } from "@/components/replica/ReplicaContentContext";
import { ReplicaLogo } from "@/components/replica/shared/ReplicaLogo";
import { ReplicaPrimaryPill } from "@/components/replica/shared/ReplicaPrimaryPill";
import { ThemeToggle } from "@/components/replica/theme/ThemeToggle";
import { REPLICA_FRAMES } from "@/lib/replica-frames";
import {
  ProductMegaMenu,
  type ProductMegaMenuColumn,
} from "@/components/replica/nav/ProductMegaMenu";
import { cn } from "@/lib/cn";
import { DUR, EASE_CSS } from "@/lib/motion-tokens";
import {
  NAV_SCROLL_DENSITY_DEFAULTS,
  nextNavScrolled,
} from "@/lib/nav-scroll-density";

const NAV_LINK_CLASS =
  "relative z-[2] whitespace-nowrap text-[13.5px] tracking-[-0.1px] text-text-secondary no-underline transition-colors hover:text-text-primary";

/** Collapsed out of the compact island (still available when expanded / hovered). */
const COMPACT_HIDE = new Set(["Case Studies", "Company"]);

/** Hover-expand settle so leave doesn't snap compact mid-pointer travel. */
const HOVER_LEAVE_MS = 180;

type ReplicaNavProps = {
  theme: "light" | "dark";
  className?: string;
};

function isNavLinkActive(pathname: string | null, href: string) {
  if (!pathname || href === "#") return false;
  if (pathname === href) return true;
  return pathname.startsWith(`${href}/`);
}

export function ReplicaNav({ theme, className }: ReplicaNavProps) {
  const { links, cta, megaMenu } = useReplicaContent().nav;
  const pathname = usePathname();
  /** clear = over hero media; regular = content scrolled under (Apple variants). */
  const [liquidVariant, setLiquidVariant] = useState<"clear" | "regular">(
    "clear",
  );
  const [scrolled, setScrolled] = useState(false);
  const [hoverExpand, setHoverExpand] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  /** Below lg the island can't hold all links + nested CTA without clipping. */
  const [narrowChrome, setNarrowChrome] = useState(false);
  const hoverLeaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastY = useRef(0);

  const density: "expanded" | "compact" =
    !scrolled || hoverExpand || megaOpen ? "expanded" : "compact";

  const hideSecondary = density === "compact" || narrowChrome;

  const clearHoverLeave = useCallback(() => {
    if (hoverLeaveTimer.current) {
      clearTimeout(hoverLeaveTimer.current);
      hoverLeaveTimer.current = null;
    }
  }, []);

  const onMegaOpenChange = useCallback((open: boolean) => {
    setMegaOpen(open);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const sync = () => setNarrowChrome(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Material: hero sentinel. Density: scroll-direction + hysteresis (separate).
  useEffect(() => {
    const sentinel = document.getElementById("hero-substrate-end");
    if (!sentinel) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setLiquidVariant(entry!.isIntersecting ? "clear" : "regular");
      },
      { rootMargin: "-64px 0px 0px 0px", threshold: 0 },
    );
    io.observe(sentinel);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const { compactY } = NAV_SCROLL_DENSITY_DEFAULTS;
    lastY.current = window.scrollY;
    setScrolled(window.scrollY >= compactY);

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const y = window.scrollY;
        const delta = y - lastY.current;
        lastY.current = y;
        setScrolled((prev) => nextNavScrolled(prev, y, delta));
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => () => clearHoverLeave(), [clearHoverLeave]);

  const onIslandEnter = () => {
    clearHoverLeave();
    setHoverExpand(true);
  };

  const onIslandLeave = () => {
    clearHoverLeave();
    hoverLeaveTimer.current = setTimeout(() => {
      setHoverExpand(false);
      hoverLeaveTimer.current = null;
    }, HOVER_LEAVE_MS);
  };

  const onIslandBlur = (event: FocusEvent<HTMLDivElement>) => {
    const next = event.relatedTarget as Node | null;
    if (next && event.currentTarget.contains(next)) return;
    onIslandLeave();
  };

  const islandStyle: CSSProperties = {
    transitionProperty:
      "max-width, width, height, padding, gap, background, box-shadow, backdrop-filter",
    transitionDuration: `${DUR.navMorph}s`,
    transitionTimingFunction: EASE_CSS.emphasize,
  };

  const headerStyle: CSSProperties = {
    transitionDuration: `${DUR.navMorph}s`,
    transitionTimingFunction: EASE_CSS.emphasize,
    ["--nav-top" as string]: density === "compact" ? "1rem" : "1.5rem",
    ["--nav-island-h" as string]: density === "compact" ? "3rem" : "60px",
  };

  return (
    <header
      data-pencil-id={REPLICA_FRAMES[theme].nav}
      data-nav-density={density}
      data-liquid-glass=""
      data-nav-minimize="on-scroll-down"
      className={cn(
        "fixed left-0 right-0 top-0 z-50 flex justify-center transition-[padding]",
        density === "compact" ? "px-4 pt-4" : "px-6 pt-6",
        className,
      )}
      style={headerStyle}
    >
      {/* Apple scrollEdgeEffect analog — only when content runs under the nav. */}
      <div
        className="nav-scroll-edge"
        data-active={scrolled && !hoverExpand ? "true" : "false"}
        aria-hidden
      />

      <div
        data-nav-material={liquidVariant === "clear" ? "glass" : "solid"}
        data-liquid-variant={liquidVariant}
        data-nav-island=""
        onMouseEnter={onIslandEnter}
        onMouseLeave={onIslandLeave}
        onFocusCapture={onIslandEnter}
        onBlurCapture={onIslandBlur}
        className={cn(
          "relative z-[1] flex w-auto max-w-6xl items-center rounded-full",
          density === "expanded" ? "h-[60px] gap-6 px-5" : "h-12 gap-4 px-3.5",
          liquidVariant === "clear" ? "glass-real" : "glass-real-dense",
        )}
        style={islandStyle}
      >
        <Link
          href="/"
          className="relative z-[2] inline-flex shrink-0 items-center"
          aria-label="StackGen home"
        >
          <ReplicaLogo />
        </Link>

        <nav
          aria-label="Primary"
          className={cn(
            "relative z-[2] flex min-w-0 items-center transition-[gap]",
            density === "expanded" ? "gap-5" : "gap-3.5",
          )}
          style={{
            transitionDuration: `${DUR.navMorph}s`,
            transitionTimingFunction: EASE_CSS.emphasize,
          }}
        >
          {links.map((item) => {
            if (hideSecondary && COMPACT_HIDE.has(item.label)) {
              return null;
            }

            if (item.label === "Products") {
              return (
                <ProductMegaMenu
                  key={item.label}
                  onOpenChange={onMegaOpenChange}
                  columns={
                    megaMenu?.columns as unknown as
                      | readonly ProductMegaMenuColumn[]
                      | undefined
                  }
                >
                  <button type="button" className={NAV_LINK_CLASS}>
                    {item.label}
                  </button>
                </ProductMegaMenu>
              );
            }

            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  NAV_LINK_CLASS,
                  isNavLinkActive(pathname, item.href) && "text-text-primary",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div
          className={cn(
            "relative z-[2] ml-1 flex shrink-0 items-center transition-[gap]",
            density === "expanded" ? "gap-3" : "gap-2",
          )}
          style={{
            transitionDuration: `${DUR.navMorph}s`,
            transitionTimingFunction: EASE_CSS.emphasize,
          }}
        >
          <ReplicaPrimaryPill label={cta.label} href={cta.href} variant="nav" />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
