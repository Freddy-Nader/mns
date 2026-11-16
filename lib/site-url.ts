/**
 * Absolute origin for metadata, sitemap and structured data. Set SITE_URL (or
 * NEXT_PUBLIC_SITE_URL) to the final domain. Without either, the production
 * deployment's domain is used, and finally the current Vercel host or localhost.
 */
const configured = process.env.SITE_URL ?? process.env.NEXT_PUBLIC_SITE_URL;

const fallback = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : process.env.NODE_ENV === "production"
    ? "https://mauricionader.vercel.app"
    : "http://localhost:3000";

export const siteUrl = (configured ?? fallback).replace(/\/+$/, "");
