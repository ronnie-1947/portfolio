import Link from "next/link";
import { GoLock, GoRepo } from "react-icons/go";
import { projectStatus, type Project } from "../config/portfolio";
import Topic from "./ui/Topic";
import { buttonClass } from "./ui/buttonStyles";
import { LanguageDot, StatusLabel } from "./ui/ProjectMeta";
import ProjectShot from "./client/ProjectShot";
import TiltCard from "./client/TiltCard";

const host = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

// Wide (≥1280px) 2×2 featured card: details on the left, a skewed browser window on the right.
export default function FeatureProjectCard({ project }: { project: Project }) {
  const detail = `/projects#${project.id}`;
  const live = project.links.live;
  return (
    <TiltCard className="flex h-full">
      <div className="flex flex-1 items-stretch gap-6 p-6">
        <div className="flex min-w-0 flex-[0_1_300px] flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <GoRepo aria-hidden="true" className="size-4 flex-none text-muted" />
            <span className="font-code text-xs text-muted">Featured · {project.category}</span>
            <StatusLabel status={projectStatus(project)} />
          </div>
          <Link href={detail} className="text-[clamp(24px,2.2vw,30px)] font-bold leading-[1.15] tracking-[-0.02em] text-accent hover:underline">
            {project.title}
          </Link>
          <p className="m-0 text-[15px] leading-[1.6] text-muted text-pretty">{project.tagline}</p>
          <LanguageDot language={project.tech[0]} />
          <div className="flex flex-wrap gap-1.5">
            {project.tech.slice(0, 4).map((t) => (
              <Topic key={t}>{t}</Topic>
            ))}
          </div>
          <div className="mt-auto flex flex-wrap gap-2 pt-2">
            {live && (
              <a href={live} target="_blank" rel="noopener" className={buttonClass("primary", "md")}>
                Live site ↗
              </a>
            )}
            <Link href={detail} className={buttonClass("secondary", "md")}>
              View details
            </Link>
          </div>
        </div>
        <div className="flex min-w-0 flex-[1_1_360px] items-center py-2 [perspective:1400px]">
          {/* Fixed dark browser chrome in every theme, like a real screenshot. */}
          <div className="rb-browser-skew w-full overflow-hidden rounded-lg border border-[#30363d] bg-[#0d1117] shadow-[0_30px_60px_-24px_rgba(31,35,40,0.45)]">
            <div className="flex h-8 items-center gap-1.5 border-b border-[#30363d] bg-[#161b22] px-2.5">
              <span className="size-2.5 rounded-full bg-[#30363d]" />
              <span className="size-2.5 rounded-full bg-[#30363d]" />
              <span className="size-2.5 rounded-full bg-[#30363d]" />
              <span className="mx-2 flex h-5 min-w-0 flex-1 items-center gap-1.5 overflow-hidden whitespace-nowrap rounded-md border border-[#30363d] bg-[#0d1117] px-2 font-code text-[11px] text-[#7d8590]">
                <GoLock aria-hidden="true" className="size-3 flex-none" />
                {live ? host(live) : project.id}
              </span>
            </div>
            <div className="relative aspect-video">
              <ProjectShot
                src={project.cover}
                alt={`${project.title} — screenshot of the live demo`}
                fill
                sizes="(min-width: 1920px) 720px, (min-width: 1440px) 600px, 520px"
                className="object-cover object-top"
              />
            </div>
          </div>
        </div>
      </div>
    </TiltCard>
  );
}
