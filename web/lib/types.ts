export type Metric = { value: string; label: string; mechanism: string };
export type Industry = {
  slug: string;
  name: string;
  promise: string;
  evidence: string;
  href: string;
};
export type MomentumItem = {
  kind: 'report' | 'event' | 'credential';
  title: string;
  detail: string;
  href?: string;
};
export type Quote =
  | { text: string; attribution: string; role: string; company: string;
      status: 'published'; sourceUrl: string }
  | { text: string; attribution: string; role: string; company: string;
      status: 'placeholder' };
export type CustomerLogo = { name: string; file: string; width: number; height: number };
export type Cta = { label: string; href: string };
export type NavItem = { label: string; href: string };
export type DiagramProps = { className?: string; titleId?: string };
export type SectionProps<T> = { content: T; className?: string };
