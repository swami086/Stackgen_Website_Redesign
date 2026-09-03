import type { Field } from "@puckeditor/core";
import type { PhosphorIconName } from "@/lib/phosphor-icons";

/** Curated subset of PhosphorIconName for role/feature icon pickers. */
export const ROLE_ICON_OPTIONS: Array<{ label: string; value: PhosphorIconName }> = [
  { label: "Heartbeat", value: "heartbeat" },
  { label: "Terminal", value: "terminal-window" },
  { label: "Sync arrows", value: "arrows-clockwise" },
  { label: "Stack", value: "stack" },
  { label: "Shield check", value: "shield-check" },
  { label: "Chart line", value: "chart-line" },
  { label: "Magnifying glass", value: "magnifying-glass" },
  { label: "Broadcast", value: "broadcast" },
  { label: "Compass", value: "compass" },
];

export const linkFields = {
  label: { type: "text" as const, label: "Label" },
  href: { type: "text" as const, label: "URL" },
};

export const eyebrowField: Field<string> = {
  type: "text",
  label: "Eyebrow",
};

export const headingField: Field<string> = {
  type: "text",
  label: "Heading",
};

export const bodyField: Field<string> = {
  type: "textarea",
  label: "Body",
};

export const ctaFields = {
  primaryCta: { type: "text" as const, label: "Primary CTA label" },
  primaryHref: { type: "text" as const, label: "Primary CTA URL" },
  secondaryCta: { type: "text" as const, label: "Secondary CTA label" },
  secondaryHref: { type: "text" as const, label: "Secondary CTA URL" },
};

export const productSlugField = {
  type: "select" as const,
  label: "Product",
  options: [
    { label: "Aiden for InfraOps", value: "aiden-for-infraops" },
    { label: "Aiden for DevOps", value: "aiden-for-devops" },
    { label: "Aiden for Observability", value: "aiden-for-observability" },
    { label: "Aiden for SRE", value: "aiden-for-sre" },
  ],
};

export const logoItemFields = {
  src: { type: "text" as const, label: "Image path" },
  alt: { type: "text" as const, label: "Alt text" },
};

export const cardFields = {
  title: { type: "text" as const, label: "Title" },
  body: { type: "textarea" as const, label: "Body" },
};

export const pillarCardFields = {
  label: { type: "text" as const, label: "Phase label" },
  title: { type: "text" as const, label: "Title" },
  body: { type: "textarea" as const, label: "Body" },
  href: { type: "text" as const, label: "Link URL" },
};

export const roleCardFields = {
  title: { type: "text" as const, label: "Role" },
  body: { type: "textarea" as const, label: "Body" },
  href: { type: "text" as const, label: "Link URL" },
};

export const faqItemFields = {
  question: { type: "text" as const, label: "Question" },
  answer: { type: "textarea" as const, label: "Answer" },
};
