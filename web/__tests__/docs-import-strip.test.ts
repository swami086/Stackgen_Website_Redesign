import { stripDocusaurusChrome, titleFromMarkdown } from "@/lib/docs/strip";

const RAW = `[Skip to main content](https://docs.stackgen.com/docs/concepts/appstacks#__docusaurus_skipToContent_fallback)

**Estimated read time: 2 min read**

On this page

Focus mode

Text sizeAAA

## Overview [direct](https://docs.stackgen.com/docs/concepts/appstacks#overview "Direct link to Overview")

An **appStack** is a collection of resources.

- [Overview](https://docs.stackgen.com/docs/concepts/appstacks#overview)
`;

test("strips skip-link, read time, focus chrome, and trailing toc", () => {
  const out = stripDocusaurusChrome(RAW);
  expect(out).not.toMatch(/Skip to main content/);
  expect(out).not.toMatch(/Estimated read time/);
  expect(out).not.toMatch(/Focus mode/);
  expect(out).not.toMatch(/Text size/);
  expect(out).toContain("An **appStack** is a collection of resources.");
  expect(out).toMatch(/^## Overview$/m);
});

test("titleFromMarkdown uses first heading", () => {
  expect(titleFromMarkdown("## Overview\n\nHello")).toBe("Overview");
});
