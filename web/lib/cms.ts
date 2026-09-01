/**
 * CMS router: embedded Payload (Local API) when CMS_PROVIDER=payload;
 * otherwise Webflow Data API. Overlay helpers fall back to TS copy when empty.
 */
export {
  hrefPath,
  overlayProductContent,
  overlayReplicaContent,
  stripHtml,
  type CmsFieldData,
  type CmsPost,
} from "@/lib/webflow-cms";

import type { ProductSlug } from "@/lib/products";
import type { ReplicaContent } from "@/content/replica";
import type { ProductPageContent } from "@/content/products";
import {
  getOverlayProductContent as getWebflowOverlayProductContent,
  getOverlayReplicaContent as getWebflowOverlayReplicaContent,
  getPublishedPost as getWebflowPublishedPost,
  getPublishedPosts as getWebflowPublishedPosts,
} from "@/lib/webflow-cms";
import {
  getPayloadOverlayProductContent,
  getPayloadOverlayReplicaContent,
  getPayloadPublishedPost,
  getPayloadPublishedPosts,
  isPayloadCmsEnabled,
} from "@/lib/payload-cms";

export async function getOverlayReplicaContent(): Promise<ReplicaContent> {
  if (isPayloadCmsEnabled()) {
    return getPayloadOverlayReplicaContent();
  }
  return getWebflowOverlayReplicaContent();
}

export async function getOverlayProductContent(
  slug: ProductSlug,
): Promise<ProductPageContent> {
  if (isPayloadCmsEnabled()) {
    return getPayloadOverlayProductContent(slug);
  }
  return getWebflowOverlayProductContent(slug);
}

export async function getPublishedPosts() {
  if (isPayloadCmsEnabled()) {
    return getPayloadPublishedPosts();
  }
  return getWebflowPublishedPosts();
}

export async function getPublishedPost(slug: string) {
  if (isPayloadCmsEnabled()) {
    return getPayloadPublishedPost(slug);
  }
  return getWebflowPublishedPost(slug);
}
