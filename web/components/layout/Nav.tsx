import Link from "next/link";
import { Logo } from "@/components/primitives/Logo";
import { ButtonGhost } from "@/components/primitives/ButtonGhost";
import { ButtonPrimary } from "@/components/primitives/ButtonPrimary";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { cn } from "@/lib/cn";
import { LOGIN_ITEM, NAV_ITEMS, PRIMARY_CTA } from "@/lib/nav";

export function Nav() {
  return (
    <header
      className={cn(
        "flex h-[60px] items-center gap-10 border-b border-border bg-bg px-[100px]",
      )}
    >
      <Link href="/" className="inline-flex shrink-0 items-center" aria-label="StackGen home">
        <Logo />
      </Link>

      <nav aria-label="Primary" className="flex items-center gap-[26px]">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="text-[13.5px] tracking-[-0.1px] text-text-secondary no-underline"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="min-h-px min-w-px flex-1" aria-hidden />

      <div className="flex items-center gap-[18px]">
        <ButtonGhost href={LOGIN_ITEM.href}>{LOGIN_ITEM.label}</ButtonGhost>
        <ButtonPrimary href={PRIMARY_CTA.href}>{PRIMARY_CTA.label}</ButtonPrimary>
        {/* intentional: dual-mode requirement */}
        <ThemeToggle />
      </div>
    </header>
  );
}
