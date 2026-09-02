"use client";

import type { ComponentConfig } from "@puckeditor/core";
import { ReplicaNav } from "@/components/replica/sections/Nav";
import { ReplicaFooter } from "@/components/replica/sections/Footer";
import { useTheme } from "@/components/replica/theme/ThemeProvider";
import { ReplicaContentProvider } from "@/components/replica/ReplicaContentContext";
import { replicaContent } from "@/content/replica";
import { mergeReplicaContent } from "@/puck/lib/merge-content";
import { linkFields } from "@/puck/fields/common";

type NavLink = { label: string; href: string };

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
  },
  defaultProps: {
    id: "stackgen-nav",
    links: [...replicaContent.nav.links] as NavLink[],
    ctaLabel: replicaContent.nav.cta.label,
    ctaHref: replicaContent.nav.cta.href,
  },
  render: ({ links, ctaLabel, ctaHref }) => {
    const { theme } = useTheme();
    const content = mergeReplicaContent({
      nav: {
        links: links as typeof replicaContent.nav.links,
        cta: { label: ctaLabel, href: ctaHref },
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
    legal: { type: "text", label: "Legal line" },
  },
  defaultProps: {
    id: "stackgen-footer",
    ctaHeading: replicaContent.footer.ctaHeading,
    ctaSub: replicaContent.footer.ctaSub,
    cta: replicaContent.footer.cta,
    ctaHref: replicaContent.footer.ctaHref,
    brand: replicaContent.footer.brand,
    legal: replicaContent.footer.legal,
  },
  render: ({ ctaHeading, ctaSub, cta, ctaHref, brand, legal }) => {
    const { theme } = useTheme();
    const content = mergeReplicaContent({
      footer: { ctaHeading, ctaSub, cta, ctaHref, brand, legal },
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
