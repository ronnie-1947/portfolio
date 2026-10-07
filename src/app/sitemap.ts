import type { MetadataRoute } from "next";
import { projects } from "./config/portfolio";
import { SITE_URL } from "./config/site";

// Static site: lastModified is the build time, which is when content changes ship.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  // Research reports served from public/projects/*.html; external paper URLs are skipped.
  const papers = projects.flatMap((project) => (project.links.paper?.startsWith("/") ? [project.links.paper] : []));
  return [
    { url: SITE_URL, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/projects`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    ...papers.map((path) => ({ url: `${SITE_URL}${path}`, lastModified, changeFrequency: "yearly" as const, priority: 0.6 })),
  ];
}
