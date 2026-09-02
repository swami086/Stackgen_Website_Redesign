import { stripHtml } from "@/lib/cms-overlay";

/** Split post HTML into plain-text paragraphs for Puck paragraph blocks. */
export function paragraphsFromHtml(html: string): string[] {
  const matches = [...html.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi)].map((match) =>
    stripHtml(match[1]),
  );
  const blocks = matches.filter(Boolean);
  return blocks.length ? blocks : [stripHtml(html)].filter(Boolean);
}
