export type Metric = { value: string; label: string; mechanism: string };
export type IndustryProvenance =
  | { kind: 'published-url'; sourceUrl: string }
  | { kind: 'approved-evidence'; approvedEvidence: string };
export type Industry = {
  slug: string;
  name: string;
  promise: string;
  evidence: string;
  href: string;
  provenance: IndustryProvenance;
};
export type MomentumItem = {
  kind: 'report' | 'event' | 'credential';
  title: string;
  detail: string;
  href?: string;
};
export type ProductPrompt =
  | {
      status: 'approved';
      text: string;
      sourceProduct: string;
      provenance: {
        sourceProduct: string;
        sourceType: 'approved-demo-copy' | 'approved-mechanism-copy';
        artifact: string;
      };
    }
  | {
      status: 'unavailable';
      sourceProduct: string;
      requiredSourceType: 'approved-demo-copy' | 'approved-mechanism-copy';
      reason: string;
    };
export type FeaturedCasePoster =
  | { status: 'verified'; src: string }
  | { status: 'pending'; note: string };
export type FeaturedCase = {
  videoId: string;
  poster: FeaturedCasePoster;
  quoteRef: string;
};
export type Quote =
  | { text: string; attribution: string; role: string; company: string;
      status: 'published'; sourceUrl: string }
  | { text: string; attribution: string; role: string; company: string;
      status: 'placeholder' };
export type Cta = { label: string; href: string };
export type NavItem = { label: string; href: string };
export type DiagramProps = { className?: string; titleId?: string };
export type SectionProps<T> = { content: T; className?: string };
