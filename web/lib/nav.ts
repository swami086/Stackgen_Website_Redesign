export type NavItem = { label: string; href: string };

export const NAV_ITEMS: NavItem[] = [
  { label: "Products", href: "/product/aiden-for-infrastructure" },
  { label: "Platform", href: "/platform" },
  { label: "Customers", href: "/case-studies" },
  { label: "Resources", href: "/news" },
];

export const LOGIN_ITEM = { label: "Login" as const, href: "#" };

export const PRIMARY_CTA = { label: "Schedule demo" as const, href: "#" };
