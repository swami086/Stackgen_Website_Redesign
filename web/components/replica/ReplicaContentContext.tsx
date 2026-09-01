"use client";

import { createContext, useContext, type ReactNode } from "react";
import { replicaContent, type ReplicaContent } from "@/content/replica";

const ReplicaContentContext = createContext<ReplicaContent>(replicaContent);

export function ReplicaContentProvider({
  value,
  children,
}: {
  value: ReplicaContent;
  children: ReactNode;
}) {
  return (
    <ReplicaContentContext.Provider value={value}>
      {children}
    </ReplicaContentContext.Provider>
  );
}

export function useReplicaContent(): ReplicaContent {
  return useContext(ReplicaContentContext);
}
