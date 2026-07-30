"use client";

import { useEffect, useRef } from "react";
import type { Project } from "../../config/portfolio";
import MediaCarousel from "./MediaCarousel";

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

export default function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Escape to close.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  // Lock background scroll while open.
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  // Move focus into the dialog on open.
  useEffect(() => {
    closeButtonRef.current?.focus();
  }, []);

  const { links } = project;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={`project-modal-title-${project.id}`}
        className="glass-card bg-[#0b1020] rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-slide-in-up shadow-[0_1rem_4rem_rgba(0,0,0,0.6)]"
      >
        <div className="relative p-4 md:p-6">
          {/* Close */}
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-black/50 text-gray-300 border border-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-indigo-600 hover:text-white cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <MediaCarousel media={project.media} />

          {/* Header */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="font-mono text-[0.65rem] uppercase tracking-wider px-2.5 py-1 rounded-full bg-indigo-900/50 border border-indigo-500/30 text-indigo-300">
              {project.category}
            </span>
            {project.highlight && (
              <span className="font-mono text-[0.65rem] uppercase tracking-wider px-2.5 py-1 rounded-full bg-cyan-900/30 border border-cyan-400/30 text-cyan-300">
                {project.highlight}
              </span>
            )}
          </div>

          <h3
            id={`project-modal-title-${project.id}`}
            className="mt-3 text-2xl md:text-3xl font-bold text-white"
          >
            {project.title}
          </h3>
          <p className="mt-2 text-sm md:text-base text-gray-400">{project.tagline}</p>

          {/* Primary actions — kept above the fold, right under the title */}
          {(links.live || links.github || links.paper) && (
            <div className="mt-5 pb-5 flex flex-wrap gap-2.5 border-b border-white/10">
              {links.live && (
                <a
                  href={links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 transition-all duration-300 hover:bg-indigo-500 hover:-translate-y-0.5"
                >
                  {linkIcons.live}
                  Live Site
                </a>
              )}
              {links.github && (
                <a
                  href={links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-300 border border-white/15 transition-all duration-300 hover:border-indigo-400/50 hover:text-white hover:bg-white/5"
                >
                  {linkIcons.github}
                  GitHub
                </a>
              )}
              {links.paper && (
                <a
                  href={links.paper}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-300 border border-white/15 transition-all duration-300 hover:border-indigo-400/50 hover:text-white hover:bg-white/5"
                >
                  {linkIcons.paper}
                  Read Paper
                </a>
              )}
            </div>
          )}

          {/* Description */}
          <div className="mt-5 space-y-3">
            {project.description.map((paragraph, i) => (
              <p key={i} className="text-sm md:text-base text-gray-300 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Tech */}
          <div className="mt-6">
            <p className="font-mono text-xs text-indigo-400 uppercase tracking-wider mb-3">
              Tech Stack
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech, i) => (
                <span
                  key={tech}
                  className="skill-tag inline-flex items-center px-3 py-1.5 text-sm rounded-lg text-gray-300 border border-indigo-500/25 bg-indigo-900/30 transition-all duration-200 hover:border-cyan-400/50 hover:text-cyan-200"
                  style={{ animationDelay: `${i * 0.04}s` }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
