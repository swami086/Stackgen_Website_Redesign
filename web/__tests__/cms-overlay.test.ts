import { replicaContent } from "@/content/replica";
import { getProductContent } from "@/content/products";
import {
  hrefPath,
  overlayProductContent,
  overlayReplicaContent,
  stripHtml,
} from "@/lib/cms-overlay";

test("stripHtml and hrefPath keep overlay values usable in React text", () => {
  expect(stripHtml("<p>Keep control of how software ships.</p>")).toBe(
    "Keep control of how software ships.",
  );
  expect(hrefPath("https://stackgen.com/product/aiden-for-sre")).toBe(
    "/product/aiden-for-sre",
  );
  expect(hrefPath({ url: "https://stackgen.com/product/aiden-for-devops" })).toBe(
    "/product/aiden-for-devops",
  );
});

test("overlayReplicaContent patches home strings and card slots onto the TS fallback", () => {
  const overlaid = overlayReplicaContent(
    { "hero-heading": "CMS heading.", slug: "home" },
    [
      { slot: "home-symptom", title: "CMS symptom" },
      {
        slot: "home-pillar",
        "product-slug": "aiden-for-sre",
        title: "CMS SRE",
        label: "Remediate",
        body: "<p>CMS body</p>",
        href: "https://stackgen.com/product/aiden-for-sre",
      },
    ],
  );

  expect(overlaid.hero.heading).toBe("CMS heading.");
  expect(overlaid.hero.sub).toBe(replicaContent.hero.sub);
  expect(overlaid.problem.symptoms).toEqual(["CMS symptom"]);
  expect(overlaid.whoItsFor.pillars[3]).toMatchObject({
    title: "CMS SRE",
    body: "CMS body",
    href: "/product/aiden-for-sre",
  });
  expect(overlaid.whoItsFor.pillars[0].title).toBe(
    replicaContent.whoItsFor.pillars[0].title,
  );
});

test("empty CMS payload leaves TypeScript product copy in place", () => {
  expect(overlayReplicaContent(undefined, [])).toEqual(replicaContent);
  expect(overlayProductContent("aiden-for-sre", undefined, [], [])).toEqual(
    getProductContent("aiden-for-sre"),
  );
});

test("overlayProductContent patches hero and strips FAQ HTML", () => {
  const overlaid = overlayProductContent(
    "aiden-for-sre",
    { "hero-heading": "CMS SRE hero", slug: "aiden-for-sre" },
    [],
    [
      {
        "product-slug": "aiden-for-sre",
        question: "Does Aiden act autonomously?",
        answer: "<p>No. Humans approve.</p>",
      },
    ],
  );

  expect(overlaid.hero.heading).toBe("CMS SRE hero");
  expect(overlaid.hero.subhead).toBe(getProductContent("aiden-for-sre").hero.subhead);
  expect(overlaid.faq.items).toEqual([
    { question: "Does Aiden act autonomously?", answer: "No. Humans approve." },
  ]);
});
