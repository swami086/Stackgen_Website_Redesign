/**
 * CMS facade — embedded Payload (Local API) + TS fallback overlays.
 */
export {
  hrefPath,
  stripHtml,
  type CmsFieldData,
  type CmsPost,
} from "@/lib/cms-overlay";

export {
  getCardsRaw,
  getFaqsRaw,
  getHomeGlobalRaw,
  getOverlayProductContent,
  getOverlayReplicaContent,
  getPostRaw,
  getProductRaw,
  getPublishedPost,
  getPublishedPosts,
  isPayloadCmsEnabled,
  payloadBaseUrl,
  pingPayload,
} from "@/lib/payload-cms";
