/**
 * Absolute origin for metadata and structured data. Set SITE_URL once the
 * domain is decided; on Vercel the production URL is used until then.
 */
export const siteUrl =
  process.env.SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");
