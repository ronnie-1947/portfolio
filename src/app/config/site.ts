// Site-wide SEO settings: the production origin plus the default title and
// description used by layout metadata, the sitemap, robots and the OG image.

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://ripunjoybuddha.com").replace(/\/$/, "");

export const SITE_NAME = "Ripunjoy Buddha";

export const SITE_TITLE = "Ripunjoy Buddha — Software Developer & Security Engineer";

export const SITE_DESCRIPTION =
  "Full stack software developer and security engineer building secure AI, cloud and healthcare software with React, Next.js, Go and AWS. Remote across Canada, the US, the UK and Europe.";
