"use client";

import {
  cloneElement,
  isValidElement,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type FocusEvent,
  type MouseEvent,
  type ReactElement,
} from "react";
import Link from "next/link";
import {
  productMegaMenuContent,
  productMegaMenuExploreHref,
} from "@/content/product-mega-menu";
import { cn } from "@/lib/cn";

/** Grace period so the pointer can cross the gap between trigger and fixed panel. */
const CLOSE_DELAY_MS = 200;

type MegaMenuTriggerProps = {
  "aria-expanded"?: boolean;
  "aria-controls"?: string;
  "aria-haspopup"?: boolean | "menu" | "dialog";
  onFocus?: (event: FocusEvent<HTMLElement>) => void;
  onMouseEnter?: (event: MouseEvent<HTMLElement>) => void;
};

type ProductMegaMenuProps = {
  children: ReactElement<MegaMenuTriggerProps>;
  /** Test-only: keep the catalog panel mounted and visible. */
  forceOpen?: boolean;
  /** Notify parent (e.g. floating nav) when the catalog opens/closes. */
  onOpenChange?: (open: boolean) => void;
  className?: string;
};

export function ProductMegaMenu({
  children,
  forceOpen = false,
  onOpenChange,
  className,
}: ProductMegaMenuProps) {
  const panelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [open, setOpen] = useState(forceOpen);
  const isOpen = forceOpen || open;

  useEffect(() => {
    onOpenChange?.(isOpen);
  }, [isOpen, onOpenChange]);

  const cancelClose = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const close = useCallback(() => {
    if (!forceOpen) setOpen(false);
  }, [forceOpen]);

  const scheduleClose = useCallback(() => {
    if (forceOpen) return;
    cancelClose();
    closeTimerRef.current = setTimeout(() => {
      setOpen(false);
      closeTimerRef.current = null;
    }, CLOSE_DELAY_MS);
  }, [cancelClose, forceOpen]);

  const openMenu = useCallback(() => {
    cancelClose();
    if (!forceOpen) setOpen(true);
  }, [cancelClose, forceOpen]);

  useEffect(() => () => cancelClose(), [cancelClose]);

  useEffect(() => {
    if (!isOpen || forceOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        cancelClose();
        close();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [cancelClose, close, forceOpen, isOpen]);

  useEffect(() => {
    if (!isOpen || forceOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        cancelClose();
        close();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [cancelClose, close, forceOpen, isOpen]);

  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (forceOpen) return;
    const next = event.relatedTarget as Node | null;
    if (next && rootRef.current?.contains(next)) return;
    scheduleClose();
  };

  const trigger = isValidElement<MegaMenuTriggerProps>(children)
    ? cloneElement(children, {
        "aria-expanded": isOpen,
        "aria-controls": panelId,
        "aria-haspopup": "menu" as const,
        onFocus: (event: FocusEvent<HTMLElement>) => {
          children.props.onFocus?.(event);
          openMenu();
        },
        onMouseEnter: (event: MouseEvent<HTMLElement>) => {
          children.props.onMouseEnter?.(event);
          openMenu();
        },
      })
    : children;

  return (
    <div
      ref={rootRef}
      className={cn("relative", className)}
      onMouseEnter={openMenu}
      onMouseLeave={scheduleClose}
      onBlur={handleBlur}
    >
      {trigger}

      {isOpen ? (
        <>
          {/* Full-width hit bridge under the nav pill → panel (fixed gap kill). */}
          <div
            aria-hidden="true"
            data-mega-bridge=""
            className="fixed inset-x-0 z-40"
            style={{
              top: "calc(var(--nav-top, 1.5rem) + var(--nav-island-h, 60px) - 4px)",
              height: "20px",
            }}
            onMouseEnter={openMenu}
          />
          {/* Fixed + viewport-centered so the panel shares the nav shell axis. */}
          <div
            id={panelId}
            role="menu"
            aria-label="Product catalog"
            data-pencil-id="BCszz"
            data-mega-align="nav-shell"
            className="fixed left-1/2 z-50 w-[min(1200px,calc(100vw-3rem))] -translate-x-1/2 px-0 pt-3"
            style={{
              top: "calc(var(--nav-top, 1.5rem) + var(--nav-island-h, 60px))",
            }}
            onMouseEnter={openMenu}
            onMouseLeave={scheduleClose}
          >
            <div
              data-pencil-id="rvmr8"
              /* Opaque panel — Apple Liquid Glass: no glass-on-glass under the nav island. */
              className="overflow-hidden rounded-[20px] border border-border bg-surface p-5 shadow-lg md:p-6"
            >
              <div data-pencil-id="r8gi4e" className="flex flex-col gap-5">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {productMegaMenuContent.columns.map((column) => (
                    <article
                      key={column.slug}
                      role="none"
                      className="flex min-w-0 flex-col gap-3 rounded-[14px] border border-border bg-surface-raised p-4"
                    >
                      <span className="text-[11px] font-semibold uppercase tracking-[1.5px] text-text-tertiary">
                        {column.phase}
                      </span>
                      <h3 className="text-[15px] font-bold leading-snug text-text-primary">
                        {column.title}
                      </h3>
                      <p className="text-[13px] leading-normal text-text-secondary">
                        {column.description}
                      </p>
                      <span className="text-[10px] font-semibold tracking-[2px] text-text-tertiary">
                        CAPABILITIES
                      </span>
                      <ul className="flex flex-col gap-1.5" role="none">
                        {column.capabilities.map((cap, index) => (
                          <li key={`${column.slug}-${index}`} role="none">
                            <span className="inline-flex rounded-full border border-border bg-bg px-2.5 py-1 text-[11px] text-text-secondary">
                              {cap}
                            </span>
                          </li>
                        ))}
                      </ul>
                      <Link
                        href={productMegaMenuExploreHref(column.slug)}
                        role="menuitem"
                        className="mt-auto text-[13px] font-medium text-accent-text no-underline transition-colors hover:text-text-primary"
                        aria-label={`Explore ${column.title}`}
                      >
                        Explore →
                      </Link>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
