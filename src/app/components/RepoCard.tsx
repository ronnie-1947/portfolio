import Link from "next/link";
import { GoBook, GoLink, GoRepo } from "react-icons/go";
import { projectStatus, type Project } from "../config/portfolio";
import Topic from "./ui/Topic";
import { LanguageDot, StatusLabel } from "./ui/ProjectMeta";
import ProjectShot from "./client/ProjectShot";
import TiltCard from "./client/TiltCard";

type RepoCardProps = {
  project: Project;
  // Below 1280px the featured card is a regular card with a screenshot strip on top.
  withStrip?: boolean;
};

const host = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

// Pinned-repo card. The footer shows the link at rest and swaps to actions on hover/focus.
export default function RepoCard({ project, withStrip = false }: RepoCardProps) {
  const detail = `/projects#${project.id}`;
  const live = project.links.live;
  return (
    <TiltCard className="flex h-full flex-col">
      {withStrip && (
        <div className="relative aspect-[16/6] overflow-hidden border-b border-line bg-[#0d1117]">
          <ProjectShot
            src={project.cover}
            alt={`${project.title} — screenshot of the live demo`}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover object-top"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col gap-2.5 p-4">
        <div className="flex items-start gap-2">
          <GoRepo aria-hidden="true" className="mt-0.5 size-4 flex-none text-muted" />
          <Link href={detail} className="min-w-0 flex-1 text-[15px] font-semibold leading-[1.35] text-accent hover:underline">
            {project.title}
          </Link>
          <StatusLabel status={projectStatus(project)} />
        </div>
        <p className="m-0 text-sm leading-[1.55] text-muted text-pretty">{project.tagline}</p>
        <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-muted">
          <LanguageDot language={project.tech[0]} />
          <span className="font-code">{project.category}</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {project.tech.slice(0, 4).map((t) => (
            <Topic key={t}>{t}</Topic>
          ))}
        </div>
      </div>
      <div className="relative h-12 border-t border-line">
        <div
          aria-hidden="true"
          className="rb-repo-rest absolute inset-0 flex items-center gap-1.5 overflow-hidden whitespace-nowrap px-4 font-code text-xs text-muted"
        >
          {live ? <GoLink className="size-3.5 flex-none" /> : <GoBook className="size-3.5 flex-none" />}
          {live ? host(live) : "Write-up on /projects"}
        </div>
        <div className="rb-repo-actions absolute inset-0 flex items-center justify-between gap-2 pr-1.5 pl-2">
          <Link
            href={detail}
            className="inline-flex min-h-9 items-center gap-1.5 rounded-md border border-btn-line bg-btn px-2.5 text-[13px] font-medium text-ink hover:bg-btn-hover"
          >
            View details
          </Link>
          {live && (
            <a
              href={live}
              target="_blank"
              rel="noopener"
              className="inline-flex min-h-11 items-center rounded-md px-2.5 text-[13px] font-semibold text-accent hover:underline"
            >
              Live site ↗
            </a>
          )}
        </div>
      </div>
    </TiltCard>
  );
}
