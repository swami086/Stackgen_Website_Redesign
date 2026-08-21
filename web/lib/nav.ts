export type NavItem = { label: string; href: string };

export const NAV_ITEMS: NavItem[] = [
  { label: "Product", href: "/product/aiden-for-infrastructure" },
  { label: "Platform", href: "/platform" },
  { label: "Enterprise", href: "/enterprise" },
  { label: "Pricing", href: "/pricing" },
  { label: "News", href: "/news" },
  { label: "Company", href: "#" },
];

export const LOGIN_ITEM = { label: "Login" as const, href: "#" };

export const PRIMARY_CTA = { label: "Schedule demo" as const, href: "#" };
