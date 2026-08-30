"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { PhosphorIcon } from "@/components/primitives/PhosphorIcon";
import { docsNav, flattenAllPages } from "@/lib/docs/nav";

const MAX_RESULTS = 12;
const allPages = flattenAllPages(Object.values(docsNav));

export function DocsSearch() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "/") return;
      const target = event.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable) {
        return;
      }
      event.preventDefault();
      inputRef.current?.focus();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const normalized = query.trim().toLowerCase();
  const results = useMemo(() => {
    if (!normalized) return [];
    return allPages
      .filter((page) => {
        const haystack = `${page.title} ${page.slug.join(" ")} ${page.href}`.toLowerCase();
        return haystack.includes(normalized);
      })
      .slice(0, MAX_RESULTS);
  }, [normalized]);

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <PhosphorIcon
          name="magnifying-glass"
          size={18}
          className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-text-secondary"
        />
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          aria-label="Search docs"
          placeholder="Search docs"
          className="w-full rounded-md border border-border bg-surface py-2 pr-3 pl-10 text-sm text-text-primary placeholder:text-text-secondary focus:border-accent-text focus:outline-none"
        />
      </div>
      {normalized && results.length === 0 ? (
        <p className="absolute z-10 mt-2 w-full rounded-md border border-border bg-surface p-3 text-sm text-text-secondary">
          No matching pages
        </p>
      ) : null}
      {results.length > 0 ? (
        <ul className="absolute z-10 mt-2 w-full overflow-hidden rounded-md border border-border bg-surface shadow-sm">
          {results.map((page) => (
            <li key={page.href}>
              <Link
                href={page.href}
                className="block px-4 py-2 text-sm text-text-primary no-underline hover:bg-bg"
              >
                {page.title}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
