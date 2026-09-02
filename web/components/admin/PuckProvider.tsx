"use client";

import { PuckConfigProvider } from "@delmaredigital/payload-puck/client";
import { stackgenEditorConfig } from "@/puck/stackgen-config";

export default function PuckProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PuckConfigProvider config={stackgenEditorConfig}>{children}</PuckConfigProvider>;
}
