"use client";

import type { ComponentConfig } from "@puckeditor/core";
import { ReplicaNav } from "@/components/replica/sections/Nav";
import { ReplicaFooter } from "@/components/replica/sections/Footer";
import { useTheme } from "@/components/replica/theme/ThemeProvider";
import { ReplicaContentProvider } from "@/components/replica/ReplicaContentContext";
import { replicaContent } from "@/content/replica";
import { mergeReplicaContent } from "@/puck/lib/merge-content";
import { linkFields, productSlugField } from "@/puck/fields/common";
import { PRODUCT_PHASES } from "@/lib/products";

type NavLink = { label: string; href: string };

const megaMenuColumnFields = {
  phase: {
    type: "select" as const,
    label: "Phase label",
    options: PRODUCT_PHASES.map((phase) => ({ label: phase, value: phase })),
  },
  title: { type: "text" as const, label: "Column title" },
  description: { type: "textarea" as const, label: "Description" },
  slug: productSlugField,
  capabilities: {
    type: "array" as const,
    label: "Capability bullets",
    getItemSummary: (item: { text?: string }) => item.text || "Bullet",
    arrayFields: { text: { type: "text" as const, label: "Text" } },
  },
};

export const stackGenNavBlock: ComponentConfig = {
  label: "StackGen Nav",
  fields: {
    links: {
      type: "array",
      label: "Nav links",
      getItemSummary: (item) => item.label || "Link",
      arrayFields: linkFields,
    },
    ctaLabel: { type: "text", label: "CTA label" },
    ctaHref: { type: "text", label: "CTA URL" },
    megaMenu: {
      type: "array",
      label: "Products mega-menu columns",
      getItemSummary: (item: { title?: string }) => item.title || "Column",
      arrayFields: megaMenuColumnFields,
    },
  },
  defaultProps: {
    id: "stackgen-nav",
    links: [...replicaContent.nav.links] as NavLink[],
    ctaLabel: replicaContent.nav.cta.label,
    ctaHref: replicaContent.nav.cta.href,
    megaMenu: replicaContent.nav.megaMenu.columns.map((col) => ({
      ...col,
      capabilities: col.capabilities.map((text) => ({ text })),
    })),
  },
  render: ({ links, ctaLabel, ctaHref, megaMenu }) => {
    const { theme } = useTheme();
    const content = mergeReplicaContent({
      nav: {
        links: links as typeof replicaContent.nav.links,
        cta: { label: ctaLabel, href: ctaHref },
        megaMenu: {
          columns: Array.isArray(megaMenu)
            ? megaMenu.map(
                (col: {
                  phase?: string;
                  title?: string;
                  description?: string;
                  slug?: string;
                  capabilities?: Array<{ text?: string }>;
                }) => ({
                  phase: String(col.phase ?? ""),
                  title: String(col.title ?? ""),
                  description: String(col.description ?? ""),
                  slug: String(col.slug ?? ""),
                  capabilities: Array.isArray(col.capabilities)
                    ? col.capabilities.map((c) => String(c.text ?? ""))
                    : [],
                }),
              )
            : replicaContent.nav.megaMenu.columns.map((col) => ({
                ...col,
                capabilities: [...col.capabilities],
              })),
        },
      },
    });
    return (
      <ReplicaContentProvider value={content}>
        <ReplicaNav theme={theme} />
      </ReplicaContentProvider>
    );
  },
};

export const stackGenFooterBlock: ComponentConfig = {
  label: "StackGen Footer",
  fields: {
    ctaHeading: { type: "text", label: "CTA heading" },
    ctaSub: { type: "textarea", label: "CTA subhead" },
    cta: { type: "text", label: "Footer CTA label" },
    ctaHref: { type: "text", label: "Footer CTA URL" },
    brand: { type: "text", label: "Brand tagline" },
    company: {
      type: "array",
      label: "Company column links",
      getItemSummary: (item: { label?: string }) => item.label || "Link",
      arrayFields: { label: { type: "text", label: "Label" } },
    },
    legal: { type: "text", label: "Legal line" },
    legalLinks: {
      type: "array",
      label: "Legal links (Privacy, Terms, ...)",
      getItemSummary: (item: { label?: string }) => item.label || "Link",
      arrayFields: { label: { type: "text", label: "Label" } },
    },
  },
  defaultProps: {
    id: "stackgen-footer",
    ctaHeading: replicaContent.footer.ctaHeading,
    ctaSub: replicaContent.footer.ctaSub,
    cta: replicaContent.footer.cta,
    ctaHref: replicaContent.footer.ctaHref,
    brand: replicaContent.footer.brand,
    company: replicaContent.footer.company.map((label) => ({ label })),
    legal: replicaContent.footer.legal,
    legalLinks: replicaContent.footer.legalLinks.map((label) => ({ label })),
  },
  render: ({ ctaHeading, ctaSub, cta, ctaHref, brand, company, legal, legalLinks }) => {
    const { theme } = useTheme();
    const content = mergeReplicaContent({
      footer: {
        ctaHeading,
        ctaSub,
        cta,
        ctaHref,
        brand,
        legal,
        company: Array.isArray(company)
          ? company.map((item: { label?: string }) => String(item.label ?? ""))
          : undefined,
        legalLinks: Array.isArray(legalLinks)
          ? legalLinks.map((item: { label?: string }) => String(item.label ?? ""))
          : undefined,
      },
    });
    return (
      <ReplicaContentProvider value={content}>
        <ReplicaFooter theme={theme} />
      </ReplicaContentProvider>
    );
  },
};

export const chromeBlocks = {
  StackGenNav: stackGenNavBlock,
  StackGenFooter: stackGenFooterBlock,
};
