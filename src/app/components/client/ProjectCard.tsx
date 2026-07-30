"use client";

import Image from "next/image";
import { useRef } from "react";
import type { Project } from "../../config/portfolio";
import { cloudinaryFill } from "../../lib/cloudinary";

const MAX_VISIBLE_TECH = 4;

const linkIcons = {
  live: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  ),
  github: (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.919.678 1.852 0 1.337-.012 2.415-.012 2.743 0 .268.18.58.688.482A10.02 10.02 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  ),
  paper: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
};

const linkLabels = {
  live: "Open live site",
  github: "View source on GitHub",
  paper: "Read the paper",
};

export default function ProjectCard({
  project,
  index,
  onSelect,
}: {
  project: Project;
  index: number;
  onSelect: (project: Project, trigger: HTMLElement | null) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const open = () => onSelect(project, cardRef.current);

  const hasVideo = project.media.some((m) => m.type === "youtube");
  const visibleTech = project.tech.slice(0, MAX_VISIBLE_TECH);
  const hiddenTechCount = project.tech.length - visibleTech.length;
  const linkEntries = (["live", "github", "paper"] as const).filter(
    (key) => project.links[key],
  );
  const secondaryLinks = linkEntries.filter((key) => key !== "live");

  return (
    <div
      ref={cardRef}
      role="button"
      tabIndex={0}
      aria-haspopup="dialog"
      aria-label={`View details for ${project.title}`}
      onClick={open}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          open();
        }
      }}
      style={{ animationDelay: `${index * 0.08}s` }}
      className="project-card group glass-card rounded-2xl overflow-hidden cursor-pointer flex flex-col opacity-0 animate-fade-in-up focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
    >
      {/* Cover */}
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-black/40">
        <Image
          src={cloudinaryFill(project.cover, "16:10")}
          alt={`${project.title} cover`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080c18]/70 via-transparent to-transparent" />

        {/* Category badge */}
        <span className="absolute top-3 left-3 font-mono text-[0.65rem] uppercase tracking-wider px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm border border-indigo-500/30 text-indigo-300">
          {project.category}
        </span>

        {/* Has-video badge */}
        {hasVideo && (
          <span
            title="Includes video"
            className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-full bg-black/60 backdrop-blur-sm border border-white/15 text-white"
          >
            <svg className="w-3.5 h-3.5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="text-lg font-semibold text-white transition-colors duration-300 group-hover:text-indigo-300">
          {project.title}
        </h3>
        <p className="mt-2 text-sm text-gray-400 line-clamp-2">{project.tagline}</p>

        {/* Tech chips */}
        <div className="mt-4 flex flex-wrap gap-2">
          {visibleTech.map((tech, i) => (
            <span
              key={tech}
              className="skill-tag inline-flex items-center px-2.5 py-1 text-xs rounded-lg text-gray-300 border border-indigo-500/25 bg-indigo-900/30"
              style={{ animationDelay: `${index * 0.08 + i * 0.04}s` }}
            >
              {tech}
            </span>
          ))}
          {hiddenTechCount > 0 && (
            <span className="inline-flex items-center px-2.5 py-1 text-xs rounded-lg text-gray-500 border border-white/10">
              +{hiddenTechCount} more
            </span>
          )}
        </div>

        {/* Footer links — live site is promoted to a labelled pill, the rest stay as icons */}
        {linkEntries.length > 0 && (
          <div className="mt-auto pt-4 flex items-center gap-1.5">
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${linkLabels.live} for ${project.title}`}
                onClick={(e) => e.stopPropagation()}
                className="live-link inline-flex items-center gap-2 pl-3 pr-3.5 py-1.5 rounded-full text-xs font-semibold text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
              >
                <span className="live-dot w-1.5 h-1.5 rounded-full bg-emerald-300" />
                Live Demo
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}

            <div className="ml-auto flex items-center gap-1">
              {secondaryLinks.map((key) => (
                <a
                  key={key}
                  href={project.links[key]}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={linkLabels[key]}
                  aria-label={`${linkLabels[key]} for ${project.title}`}
                  onClick={(e) => e.stopPropagation()}
                  className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 transition-all duration-300 hover:text-white hover:bg-white/10"
                >
                  {linkIcons[key]}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
