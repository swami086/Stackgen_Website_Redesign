import nav from "@/content/docs/nav.json";
import {
  flattenAllPages,
  flattenNavPages,
  nestLeaves,
  prevNextForHref,
  uniquifyLeafTitles,
  type DocsNavLeaf,
  type DocsNavNode,
  type DocsNavRoot,
} from "@/lib/docs/nav-tree";

export type { DocsNavLeaf as DocsNavPage, DocsNavNode, DocsNavRoot };

type ImportedRoot = {
  title: string;
  href: string;
  children: { title: string; href: string; children: DocsNavLeaf[] }[];
};

function leavesFromImported(root: ImportedRoot): DocsNavLeaf[] {
  return root.children.flatMap((group) => group.children);
}

function productNav(product: "stackgen" | "aiden" | "observenow", imported: ImportedRoot): DocsNavRoot {
  const leaves = uniquifyLeafTitles(leavesFromImported(imported));
  return nestLeaves(product, imported.title, leaves);
}

const imported = nav as {
  stackgen: ImportedRoot;
  aiden: ImportedRoot;
  observenow: ImportedRoot;
};

export const docsNav = {
  stackgen: productNav("stackgen", imported.stackgen),
  aiden: productNav("aiden", imported.aiden),
  observenow: productNav("observenow", imported.observenow),
};

export function navForProduct(product: string): DocsNavRoot | null {
  if (product === "stackgen" || product === "aiden" || product === "observenow") {
    return docsNav[product];
  }
  return null;
}

export { flattenAllPages, flattenNavPages, prevNextForHref };
export { crumbsForHref, nodeContainsHref } from "@/lib/docs/nav-tree";
