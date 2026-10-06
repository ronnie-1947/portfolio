import type { Project } from "../config/portfolio";
import { EMAIL, GITHUB_HANDLE, GITHUB_URL, LINKEDIN_HANDLE, LINKEDIN_URL, RESUME_URL, projectStatus } from "../config/portfolio";
import SiteHeaderClient from "./client/SiteHeaderClient";
import type { HomeSectionId } from "../lib/sections";

type SiteHeaderProps = {
  handle: string;
  counts: Partial<Record<HomeSectionId, number>>;
  // Projects listed in the command palette, in display order.
  projects: Project[];
};

export default function SiteHeader({ handle, counts, projects }: SiteHeaderProps) {
  return (
    <SiteHeaderClient
      handle={handle}
      counts={counts}
      projects={projects.map((p) => ({ id: p.id, title: p.title, status: projectStatus(p) }))}
      links={{
        email: EMAIL,
        github: GITHUB_URL,
        githubHandle: GITHUB_HANDLE,
        linkedin: LINKEDIN_URL,
        linkedinHandle: LINKEDIN_HANDLE,
        resume: RESUME_URL,
      }}
    />
  );
}
