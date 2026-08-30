import Link from "next/link";

type ReplicaPrimaryPillProps = {
  label: string;
  href?: string;
  variant?: "nav" | "hero";
};

export function ReplicaPrimaryPill({
  label,
  href = "#",
  variant = "hero",
}: ReplicaPrimaryPillProps) {
  const variantClassName =
    variant === "nav"
      ? "rounded-lg px-3.5 py-2 text-sm"
      : "rounded-full px-4 py-3 text-sm";

  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center bg-accent font-medium text-on-accent no-underline ${variantClassName}`}
    >
      {label}
    </Link>
  );
}
