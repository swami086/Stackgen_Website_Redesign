export type DocsNavLeaf = {
  title: string;
  href: string;
  slug: string[];
};

export type DocsNavNode = {
  title: string;
  href?: string;
  slug: string[];
  children: DocsNavNode[];
};

export type DocsNavRoot = {
  title: string;
  href: string;
  children: DocsNavNode[];
};

const ACRONYMS: Record<string, string> = {
  aws: "AWS",
  gcp: "GCP",
  azure: "Azure",
  cli: "CLI",
  mcp: "MCP",
  iac: "IaC",
  api: "API",
  iam: "IAM",
  sre: "SRE",
  pat: "PAT",
  oci: "OCI",
  k8s: "Kubernetes",
  stackgen: "StackGen",
  aiden: "Aiden",
  observenow: "ObserveNow",
};

export function titleFromSegment(segment: string): string {
  if (segment.endsWith("flags") && segment.length > 5) {
    return `${titleFromSegment(segment.slice(0, -5))} flags`;
  }
  return segment
    .split(/[-_]/)
    .filter(Boolean)
    .map((part) => ACRONYMS[part.toLowerCase()] ?? part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function uniquifyLeafTitles(leaves: DocsNavLeaf[]): DocsNavLeaf[] {
  const titled = leaves.map((leaf) => ({ ...leaf }));
  const apply = (pick: (leaf: DocsNavLeaf) => string) => {
    const counts = new Map<string, number>();
    for (const leaf of titled) {
      const key = leaf.title.toLowerCase();
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }
    for (const leaf of titled) {
      if ((counts.get(leaf.title.toLowerCase()) ?? 0) > 1) {
        leaf.title = pick(leaf);
      }
    }
  };
  apply((leaf) => titleFromSegment(leaf.slug[leaf.slug.length - 1] ?? leaf.title));
  apply((leaf) =>
    leaf.slug
      .slice(-2)
      .map((segment) => titleFromSegment(segment))
      .join(" / "),
  );
  return titled;
}

function ensureChild(parent: DocsNavNode, segment: string): DocsNavNode {
  const existing = parent.children.find((child) => child.slug[child.slug.length - 1] === segment);
  if (existing) return existing;
  const slug = [...parent.slug, segment];
  const child: DocsNavNode = {
    title: titleFromSegment(segment),
    slug,
    children: [],
  };
  parent.children.push(child);
  return child;
}

export function nestLeaves(product: string, productTitle: string, leaves: DocsNavLeaf[]): DocsNavRoot {
  const pageHrefs = new Set(leaves.map((leaf) => leaf.href));
  const root: DocsNavNode = {
    title: productTitle,
    href: `/docs/${product}`,
    slug: [product],
    children: [],
  };

  for (const leaf of leaves) {
    const rest = leaf.slug.slice(1);
    if (rest.length === 0) {
      root.title = leaf.title;
      root.href = leaf.href;
      continue;
    }
    let node = root;
    for (const segment of rest) node = ensureChild(node, segment);
    node.title = leaf.title;
    node.href = leaf.href;
  }

  function mark(node: DocsNavNode) {
    if (node.href && !pageHrefs.has(node.href)) delete node.href;
    for (const child of node.children) mark(child);
  }
  mark(root);

  return {
    title: root.title,
    href: root.href ?? `/docs/${product}`,
    children: root.children,
  };
}

function uniqueLeaves(pages: DocsNavLeaf[]): DocsNavLeaf[] {
  const seen = new Set<string>();
  return pages.filter((page) => {
    if (seen.has(page.href)) return false;
    seen.add(page.href);
    return true;
  });
}

function walkPages(node: DocsNavNode, out: DocsNavLeaf[]) {
  if (node.href) out.push({ title: node.title, href: node.href, slug: node.slug });
  for (const child of node.children) walkPages(child, out);
}

export function flattenNavPages(root: DocsNavRoot): DocsNavLeaf[] {
  const pages: DocsNavLeaf[] = [];
  for (const child of root.children) walkPages(child, pages);
  return uniqueLeaves(pages);
}

export function flattenAllPages(roots: DocsNavRoot[]): DocsNavLeaf[] {
  const pages: DocsNavLeaf[] = [];
  for (const root of roots) {
    pages.push({
      title: root.title,
      href: root.href,
      slug: root.href.replace(/^\/docs\//, "").split("/"),
    });
    for (const child of root.children) walkPages(child, pages);
  }
  return uniqueLeaves(pages);
}

export function prevNextForHref(root: DocsNavRoot, href: string) {
  const pages = flattenNavPages(root).filter((page) => page.href !== root.href);
  const index = pages.findIndex((page) => page.href === href);
  if (index < 0) return { prev: null, next: null };
  return {
    prev: index > 0 ? pages[index - 1]! : null,
    next: index < pages.length - 1 ? pages[index + 1]! : null,
  };
}

export function crumbsForHref(root: DocsNavRoot, href: string): DocsNavLeaf[] {
  const crumbs: DocsNavLeaf[] = [{ title: root.title, href: root.href, slug: root.href.slice("/docs/".length).split("/") }];
  function walk(nodes: DocsNavNode[], trail: DocsNavLeaf[]): boolean {
    for (const node of nodes) {
      const next = node.href
        ? [...trail, { title: node.title, href: node.href, slug: node.slug }]
        : trail;
      if (node.href === href) {
        crumbs.splice(0, crumbs.length, ...next);
        return true;
      }
      if (walk(node.children, next)) return true;
    }
    return false;
  }
  walk(root.children, crumbs);
  return crumbs;
}

export function nodeContainsHref(node: DocsNavNode | DocsNavRoot, href: string): boolean {
  if ("href" in node && node.href === href) return true;
  return node.children.some((child) => nodeContainsHref(child, href));
}
