"use client";

import { PuckConfigProvider } from "@delmaredigital/payload-puck/client";
import { editorConfig } from "@/puck/config";

export default function PuckProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PuckConfigProvider config={editorConfig}>{children}</PuckConfigProvider>;
}
