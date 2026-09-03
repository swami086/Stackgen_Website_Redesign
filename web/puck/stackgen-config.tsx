"use client";

import {
  baseConfig,
  mergeConfigs,
} from "@delmaredigital/payload-puck/config";
import { editorConfig } from "@delmaredigital/payload-puck/config/editor";
import { chromeBlocks } from "@/puck/blocks/chrome/chrome-blocks";
import { homeBlocks } from "@/puck/blocks/home/home-blocks";
import { productBlocks } from "@/puck/blocks/product/product-blocks";
import { blogBlocks } from "@/puck/blocks/blog/blog-blocks";
import { PuckRenderProviders } from "@/puck/PuckRenderProviders";

const stackGenRoot = {
  render: ({ children }: { children: React.ReactNode }) => (
    <PuckRenderProviders>{children}</PuckRenderProviders>
  ),
};

const stackGenComponents = {
  ...chromeBlocks,
  ...homeBlocks,
  ...productBlocks,
  ...blogBlocks,
};

const stackGenCategories = {
  chrome: {
    title: "Chrome",
    components: Object.keys(chromeBlocks),
  },
  home: {
    title: "Home",
    components: Object.keys(homeBlocks),
  },
  product: {
    title: "Product",
    components: Object.keys(productBlocks),
  },
  blog: {
    title: "Blog",
    components: Object.keys(blogBlocks),
  },
};

/** Server-safe config — extends payload-puck base with StackGen blocks. */
export const stackgenConfig = mergeConfigs({
  base: baseConfig,
  components: stackGenComponents,
  categories: stackGenCategories,
  root: stackGenRoot,
});

/** Editor config — full interactivity for Payload Puck admin. */
export const stackgenEditorConfig = mergeConfigs({
  base: editorConfig,
  components: stackGenComponents,
  categories: stackGenCategories,
  root: stackGenRoot,
});
