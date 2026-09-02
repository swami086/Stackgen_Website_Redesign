"use client";

import type { ComponentConfig } from "@puckeditor/core";
import type { ComponentType } from "react";
import { ReplicaHero } from "@/components/replica/sections/Hero";
import { ReplicaLogos } from "@/components/replica/sections/Logos";
import { ReplicaProblem } from "@/components/replica/sections/Problem";
import { ReplicaSolution } from "@/components/replica/sections/Solution";
import { ReplicaAssemblies } from "@/components/replica/sections/Assemblies";
import { ReplicaShell } from "@/components/replica/sections/Shell";
import { ReplicaWhoItsFor } from "@/components/replica/sections/WhoItsFor";
import { ReplicaContentProvider } from "@/components/replica/ReplicaContentContext";
import { useTheme } from "@/components/replica/theme/ThemeProvider";
import { replicaContent } from "@/content/replica";
import { mergeReplicaContent } from "@/puck/lib/merge-content";
import { bodyField, ctaFields, eyebrowField, headingField, linkFields } from "@/puck/fields/common";

function homeSectionBlock(
  label: string,
  fields: Record<string, unknown>,
  defaultProps: Record<string, unknown>,
  renderSection: (
    theme: "light" | "dark",
    props: Record<string, unknown>,
  ) => ReturnType<typeof mergeReplicaContent>,
  Section: ComponentType<{ theme: "light" | "dark" }>,
): ComponentConfig {
  return {
    label,
    fields: fields as ComponentConfig["fields"],
    defaultProps,
    render: (props) => {
      const { theme } = useTheme();
      return (
        <ReplicaContentProvider value={renderSection(theme, props as Record<string, unknown>)}>
          <Section theme={theme} />
        </ReplicaContentProvider>
      );
    },
  };
}

export const stackGenHomeHeroBlock = homeSectionBlock(
  "Home Hero",
  {
    heading: headingField,
    sub: bodyField,
    ...ctaFields,
  },
  {
    id: "home-hero",
    heading: replicaContent.hero.heading,
    sub: replicaContent.hero.sub,
    primaryCta: replicaContent.hero.primaryCta,
    primaryHref: replicaContent.hero.primaryHref,
    secondaryCta: replicaContent.hero.secondaryCta,
    secondaryHref: replicaContent.hero.secondaryHref,
  },
  (_theme, props) =>
    mergeReplicaContent({
      hero: {
        heading: String(props.heading),
        sub: String(props.sub),
        primaryCta: String(props.primaryCta),
        primaryHref: String(props.primaryHref),
        secondaryCta: String(props.secondaryCta),
        secondaryHref: String(props.secondaryHref),
      },
    }),
  ReplicaHero,
);

export const stackGenHomeLogosBlock = homeSectionBlock(
  "Home Logos",
  {
    eyebrow: eyebrowField,
  },
  { id: "home-logos", eyebrow: replicaContent.logos.eyebrow },
  (_t, props) =>
    mergeReplicaContent({ logos: { eyebrow: String(props.eyebrow) } }),
  ReplicaLogos,
);

export const stackGenHomeProblemBlock = homeSectionBlock(
  "Home Problem",
  {
    eyebrow: eyebrowField,
    heading: headingField,
    body: bodyField,
    filmCaption: { type: "text", label: "Diagram caption" },
    learnMoreLabel: linkFields.label,
    learnMoreHref: linkFields.href,
    symptoms: {
      type: "array",
      label: "Symptoms (diagram fragments)",
      getItemSummary: (item: { title?: string }) => item.title || "Symptom",
      arrayFields: { title: { type: "text", label: "Text" } },
    },
  },
  {
    id: "home-problem",
    eyebrow: replicaContent.problem.eyebrow,
    heading: replicaContent.problem.heading,
    body: replicaContent.problem.body,
    filmCaption: replicaContent.problem.filmCaption,
    learnMoreLabel: replicaContent.problem.learnMore.label,
    learnMoreHref: replicaContent.problem.learnMore.href,
    symptoms: replicaContent.problem.symptoms.map((s) => ({ title: s })),
  },
  (_t, props) =>
    mergeReplicaContent({
      problem: {
        eyebrow: String(props.eyebrow),
        heading: String(props.heading),
        body: String(props.body),
        filmCaption: String(props.filmCaption),
        learnMore: {
          label: String(props.learnMoreLabel),
          href: String(props.learnMoreHref),
        },
        symptoms: Array.isArray(props.symptoms)
          ? props.symptoms.map((item: { title?: string }) => String(item.title ?? ""))
          : undefined,
      },
    }),
  ReplicaProblem,
);

export const stackGenHomeSolutionBlock = homeSectionBlock(
  "Home Solution",
  {
    eyebrow: eyebrowField,
    heading: headingField,
    body: bodyField,
    claim: { type: "text", label: "Claim" },
    demoCaption: { type: "text", label: "Diagram caption" },
  },
  {
    id: "home-solution",
    eyebrow: replicaContent.solution.eyebrow,
    heading: replicaContent.solution.heading,
    body: replicaContent.solution.body,
    claim: replicaContent.solution.claim,
    demoCaption: replicaContent.solution.demoCaption,
  },
  (_t, props) =>
    mergeReplicaContent({
      solution: {
        eyebrow: String(props.eyebrow),
        heading: String(props.heading),
        body: String(props.body),
        claim: String(props.claim),
        demoCaption: String(props.demoCaption),
      },
    }),
  ReplicaSolution,
);

export const stackGenHomeAssembliesBlock = homeSectionBlock(
  "Home How It Works",
  {
    eyebrow: eyebrowField,
    heading: headingField,
    body: bodyField,
    learnMoreLabel: linkFields.label,
    learnMoreHref: linkFields.href,
  },
  {
    id: "home-assemblies",
    eyebrow: replicaContent.assemblies.eyebrow,
    heading: replicaContent.assemblies.heading,
    body: replicaContent.assemblies.body,
    learnMoreLabel: replicaContent.assemblies.learnMore.label,
    learnMoreHref: replicaContent.assemblies.learnMore.href,
  },
  (_t, props) =>
    mergeReplicaContent({
      assemblies: {
        eyebrow: String(props.eyebrow),
        heading: String(props.heading),
        body: String(props.body),
        learnMore: {
          label: String(props.learnMoreLabel),
          href: String(props.learnMoreHref),
        },
      },
    }),
  ReplicaAssemblies,
);

export const stackGenHomeShellBlock = homeSectionBlock(
  "Home Shell / OCG",
  {
    eyebrow: eyebrowField,
    heading: headingField,
    body1: { type: "textarea", label: "Body paragraph 1" },
    body2: { type: "textarea", label: "Body paragraph 2" },
  },
  {
    id: "home-shell",
    eyebrow: replicaContent.shell.eyebrow,
    heading: replicaContent.shell.heading,
    body1: replicaContent.shell.body1,
    body2: replicaContent.shell.body2,
  },
  (_t, props) =>
    mergeReplicaContent({
      shell: {
        eyebrow: String(props.eyebrow),
        heading: String(props.heading),
        body1: String(props.body1),
        body2: String(props.body2),
      },
    }),
  ReplicaShell,
);

export const stackGenHomeWhoItsForBlock = homeSectionBlock(
  "Home Offerings",
  {
    eyebrow: eyebrowField,
    heading: headingField,
    sub: bodyField,
    osTitle: { type: "text", label: "OS title" },
    pillars: {
      type: "array",
      label: "Product pillars",
      getItemSummary: (item: { title?: string }) => item.title || "Pillar",
      arrayFields: {
        label: { type: "text", label: "Phase label" },
        title: { type: "text", label: "Title" },
        body: { type: "textarea", label: "Body" },
        href: { type: "text", label: "Link URL" },
      },
    },
    roles: {
      type: "array",
      label: "Audience roles",
      getItemSummary: (item: { title?: string }) => item.title || "Role",
      arrayFields: {
        title: { type: "text", label: "Role" },
        body: { type: "textarea", label: "Body" },
        href: { type: "text", label: "Link URL" },
      },
    },
    osChips: {
      type: "array",
      label: "OS chips",
      getItemSummary: (item: { label?: string }) => item.label || "Chip",
      arrayFields: { label: { type: "text", label: "Label" } },
    },
  },
  {
    id: "home-who",
    eyebrow: replicaContent.whoItsFor.eyebrow,
    heading: replicaContent.whoItsFor.heading,
    sub: replicaContent.whoItsFor.sub,
    osTitle: replicaContent.whoItsFor.osTitle,
    pillars: replicaContent.whoItsFor.pillars.map((p) => ({ ...p })),
    roles: replicaContent.whoItsFor.roles.map((r) => ({ ...r })),
    osChips: replicaContent.whoItsFor.osChips.map((label) => ({ label })),
  },
  (_t, props) =>
    mergeReplicaContent({
      whoItsFor: {
        eyebrow: String(props.eyebrow),
        heading: String(props.heading),
        sub: String(props.sub),
        osTitle: String(props.osTitle),
        pillars: Array.isArray(props.pillars)
          ? props.pillars.map(
              (item: { label?: string; title?: string; body?: string; href?: string }) => ({
                label: String(item.label ?? ""),
                title: String(item.title ?? ""),
                body: String(item.body ?? ""),
                href: String(item.href ?? ""),
              }),
            )
          : undefined,
        roles: Array.isArray(props.roles)
          ? props.roles.map((item: { title?: string; body?: string; href?: string }) => ({
              title: String(item.title ?? ""),
              body: String(item.body ?? ""),
              href: String(item.href ?? ""),
            }))
          : undefined,
        osChips: Array.isArray(props.osChips)
          ? props.osChips.map((item: { label?: string }) => String(item.label ?? ""))
          : undefined,
      },
    }),
  ReplicaWhoItsFor,
);

export const homeBlocks = {
  StackGenHomeHero: stackGenHomeHeroBlock,
  StackGenHomeLogos: stackGenHomeLogosBlock,
  StackGenHomeProblem: stackGenHomeProblemBlock,
  StackGenHomeSolution: stackGenHomeSolutionBlock,
  StackGenHomeAssemblies: stackGenHomeAssembliesBlock,
  StackGenHomeShell: stackGenHomeShellBlock,
  StackGenHomeWhoItsFor: stackGenHomeWhoItsForBlock,
};
