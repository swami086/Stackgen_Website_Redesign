"use client";

import { PageRenderer } from "@delmaredigital/payload-puck/render";
import type { Data } from "@puckeditor/core";
import { stackgenEditorConfig } from "@/puck/config";

type PuckSitePageProps = {
  data: Data;
  className?: string;
};

/** Client boundary for Puck `<Render>` — replica sections need theme/motion context from layout. */
export function PuckSitePage({ data, className }: PuckSitePageProps) {
  return (
    <PageRenderer
      config={stackgenEditorConfig}
      data={data}
      className={className ?? "flex w-full flex-col bg-bg text-text-primary"}
    />
  );
}
