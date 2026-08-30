export type TocHeading = {
  id: string;
  text: string;
  depth: 2 | 3;
};

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

export function parseTocHeadings(body: string): TocHeading[] {
  const headings: TocHeading[] = [];
  const pattern = /^(#{2,3})\s+(.+)$/gm;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(body)) !== null) {
    const depth = match[1]!.length as 2 | 3;
    const raw = match[2]!.replace(/\s*\{#.+\}\s*$/, "").trim();
    headings.push({
      id: slugifyHeading(raw),
      text: raw,
      depth,
    });
  }

  return headings;
}

type DocsTocProps = {
  headings: TocHeading[];
};

export function DocsToc({ headings }: DocsTocProps) {
  if (headings.length === 0) return null;

  return (
    <nav aria-label="On this page" className="flex flex-col gap-3">
      <p className="text-sm font-medium text-text-primary">On this page</p>
      <ul className="flex list-none flex-col gap-2 p-0">
        {headings.map((heading) => (
          <li key={heading.id} className={heading.depth === 3 ? "pl-3" : undefined}>
            <a
              href={`#${heading.id}`}
              className="text-sm text-text-secondary no-underline transition-colors hover:text-text-primary"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
