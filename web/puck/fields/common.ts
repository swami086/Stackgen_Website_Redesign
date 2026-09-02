import type { Field } from "@puckeditor/core";

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
