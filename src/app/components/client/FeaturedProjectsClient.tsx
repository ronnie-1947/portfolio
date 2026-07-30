"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Project } from "../../config/portfolio";
import { blurBackground, slideLoader, thumbLoader } from "../../lib/cloudinary";
import ProjectModal from "./ProjectModal";

const AUTOPLAY_MS = 7000;
const SWIPE_THRESHOLD = 50; // px
const MAX_VISIBLE_TECH = 4;

export default function FeaturedProjectsClient({
  projects,
}: {
  projects: Project[];
}) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [modalProject, setModalProject] = useState<Project | null>(null);
  // Element that opened the modal, so focus can be returned on close.
  const triggerRef = useRef<HTMLElement | null>(null);
  const touchStartX = useRef<number | null>(null);

  const count = projects.length;
  const autoplaying = count > 1 && !paused && !reduceMotion && !modalProject;

  const goTo = useCallback(
    (next: number) => {
      if (count === 0) return;
      setActive(((next % count) + count) % count);
    },
    [count],
  );

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  // Auto-advance, unless hovered/focused, in a modal, or motion is reduced.
  useEffect(() => {
    if (!autoplaying) return;
    const timer = setTimeout(
      () => setActive((i) => (i + 1) % count),
      AUTOPLAY_MS,
    );
    return () => clearTimeout(timer);
  }, [active, autoplaying, count]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < SWIPE_THRESHOLD) return;
    goTo(delta > 0 ? active - 1 : active + 1);
  };

  const openModal = (project: Project, trigger: HTMLElement | null) => {
    triggerRef.current = trigger;
    setModalProject(project);
  };

  const closeModal = () => {
    setModalProject(null);
    triggerRef.current?.focus();
    triggerRef.current = null;
  };

  if (count === 0) return null;

  return (
    <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 2xl:gap-12 items-start">
      {/* ─── Carousel ─────────────────────────────────────────────────────── */}
      {/* min-w-0: without it the slide track's intrinsic width blows out the grid. */}
      <div className="min-w-0 lg:col-span-8 2xl:col-span-8">
        <div className="relative">
          {/* Soft aurora glow behind the frame */}
          <div
            aria-hidden
            className="absolute -inset-3 rounded-[2rem] bg-linear-to-r from-indigo-200/60 via-purple-200/50 to-cyan-200/60 blur-2xl opacity-70"
          />

          <div
            className="relative rounded-2xl md:rounded-3xl overflow-hidden border border-indigo-100 bg-white shadow-[0_0.75rem_2.5rem_rgba(99,102,241,0.18)]"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={() => setPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            aria-roledescription="carousel"
            aria-label="Featured projects"
          >
            {/* Autoplay progress */}
            {count > 1 && (
              <div className="absolute top-0 inset-x-0 h-1 z-30 bg-indigo-100">
                <div
                  key={active}
                  className="autoplay-bar h-full w-full bg-linear-to-r from-indigo-500 via-purple-500 to-cyan-400"
                  style={{
                    animationDuration: `${AUTOPLAY_MS}ms`,
                    animationPlayState: autoplaying ? "running" : "paused",
                  }}
                />
              </div>
            )}

            {/* Slide track */}
            <div
              className="flex w-full transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]"
              style={{ transform: `translateX(-${active * 100}%)` }}
            >
              {projects.map((project, i) => {
                const isActive = i === active;
                return (
                  <div
                    key={project.id}
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`${i + 1} of ${count}: ${project.title}`}
                    aria-hidden={!isActive}
                    className="relative w-full min-w-0 shrink-0"
                  >
                    {/* Image */}
                    <div
                      className="relative aspect-video overflow-hidden bg-gray-100"
                      style={blurBackground(project.cover, "16:9")}
                    >
                      <Image
                        loader={slideLoader}
                        src={project.cover}
                        alt={`${project.title} cover`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 60vw"
                        priority={i === 0}
                        className={`object-cover transition-transform ease-out duration-[8s] ${
                          isActive && !reduceMotion ? "scale-105" : "scale-100"
                        }`}
                      />
                      {/* Caption scrim (desktop only — mobile puts text below) */}
                      <div className="hidden sm:block absolute inset-0 bg-linear-to-t from-[#080c18]/85 from-5% via-[#080c18]/25 via-40% to-transparent to-70%" />

                      {/* Badges */}
                      <div className="absolute top-3 left-3 sm:top-5 sm:left-5 flex flex-wrap items-center gap-2">
                        <span className="font-mono text-[0.6rem] sm:text-[0.65rem] uppercase tracking-wider px-2.5 py-1 rounded-full bg-indigo-600 text-white shadow-md shadow-indigo-500/30">
                          {project.category}
                        </span>
                        {project.highlight && (
                          <span className="font-mono text-[0.6rem] sm:text-[0.65rem] uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-indigo-700 shadow-sm">
                            {project.highlight}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Caption — stacked on mobile, overlaid from sm up */}
                    <div className="relative p-4 sm:absolute sm:inset-x-0 sm:bottom-0 sm:p-6 md:p-8">
                      <h3 className="text-base sm:text-xl md:text-2xl 2xl:text-3xl font-bold text-gray-900 sm:text-white">
                        {project.title}
                      </h3>
                      <p className="mt-1 max-w-xl text-xs sm:text-sm md:text-base text-gray-600 sm:text-gray-300 line-clamp-2">
                        {project.tagline}
                      </p>

                      <div className="mt-2.5 flex flex-wrap gap-1.5 sm:gap-2">
                        {project.tech.slice(0, MAX_VISIBLE_TECH).map((tech) => (
                          <span
                            key={tech}
                            className="inline-flex items-center px-2 py-0.5 sm:px-2.5 sm:py-1 text-[0.65rem] sm:text-xs rounded-lg text-indigo-700 border border-indigo-100 bg-indigo-50 sm:text-gray-100 sm:border-white/20 sm:bg-white/10 sm:backdrop-blur-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="mt-3 sm:mt-4 flex flex-wrap items-center gap-2 sm:gap-2.5">
                        <button
                          type="button"
                          tabIndex={isActive ? 0 : -1}
                          onClick={(e) => openModal(project, e.currentTarget)}
                          aria-haspopup="dialog"
                          className="group/btn inline-flex items-center gap-1.5 sm:gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 transition-all duration-300 hover:bg-indigo-500 sm:bg-white sm:text-gray-900 sm:shadow-black/20 sm:hover:bg-indigo-600 sm:hover:text-white cursor-pointer"
                        >
                          View details
                          <svg
                            className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-0.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>

                        {project.links.live && (
                          <a
                            href={project.links.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            tabIndex={isActive ? 0 : -1}
                            className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium text-indigo-700 border border-indigo-200 transition-all duration-300 hover:bg-indigo-50 sm:text-white sm:border-white/25 sm:hover:bg-white/10"
                          >
                            Live site
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Prev / next — hidden on touch-first widths, swipe covers it */}
            {count > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => goTo(active - 1)}
                  aria-label="Previous project"
                  className="hidden sm:flex absolute left-4 top-[38%] -translate-y-1/2 w-10 h-10 items-center justify-center rounded-full bg-white/90 text-gray-700 backdrop-blur-sm shadow-lg transition-all duration-300 hover:bg-indigo-600 hover:text-white hover:scale-110 cursor-pointer"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => goTo(active + 1)}
                  aria-label="Next project"
                  className="hidden sm:flex absolute right-4 top-[38%] -translate-y-1/2 w-10 h-10 items-center justify-center rounded-full bg-white/90 text-gray-700 backdrop-blur-sm shadow-lg transition-all duration-300 hover:bg-indigo-600 hover:text-white hover:scale-110 cursor-pointer"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Dots + counter */}
        {count > 1 && (
          <div className="flex items-center justify-center gap-3 mt-5">
            <div className="flex items-center gap-2">
              {projects.map((project, i) => (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Show ${project.title}`}
                  aria-current={i === active}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    i === active
                      ? "w-8 bg-linear-to-r from-indigo-500 to-purple-500"
                      : "w-2 bg-indigo-200 hover:bg-indigo-300"
                  }`}
                />
              ))}
            </div>
            <span className="font-mono text-xs text-gray-400 tabular-nums">
              {String(active + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
            </span>
          </div>
        )}
      </div>

      {/* ─── Collage: snap strip on mobile, staggered grid from lg up ─────── */}
      <div className="min-w-0 lg:col-span-4 2xl:col-span-4 flex gap-3 md:gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory -mx-6 px-6 pb-1 lg:mx-0 lg:px-0 lg:pb-0 lg:overflow-visible lg:grid lg:grid-cols-2 lg:content-start lg:[&>*:nth-child(even)]:mt-10">
        {projects.map((project, i) => {
          const isActive = i === active;
          return (
            <button
              key={project.id}
              type="button"
              onClick={() => goTo(i)}
              aria-pressed={isActive}
              aria-label={`Show ${project.title} in the carousel`}
              style={{ animationDelay: `${i * 0.08}s` }}
              className={`project-card group relative w-36 sm:w-48 lg:w-auto shrink-0 snap-start rounded-xl lg:rounded-2xl overflow-hidden text-left opacity-0 animate-fade-in-up cursor-pointer border-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
                isActive
                  ? "border-indigo-400 shadow-[0_0.5rem_1.5rem_rgba(99,102,241,0.28)]"
                  : "border-transparent shadow-[0_0.125rem_0.75rem_rgba(15,23,42,0.08)]"
              }`}
            >
              <div
                className="relative aspect-4/3 bg-gray-100"
                style={blurBackground(project.cover, "4:3")}
              >
                <Image
                  loader={thumbLoader}
                  src={project.cover}
                  alt={`${project.title} preview`}
                  fill
                  sizes="(max-width: 1024px) 13rem, 20vw"
                  className={`object-cover transition-all duration-500 group-hover:scale-105 ${
                    isActive ? "" : "grayscale-[35%] group-hover:grayscale-0"
                  }`}
                />
                <div
                  className={`absolute inset-0 transition-opacity duration-300 bg-linear-to-t from-[#080c18]/90 via-[#080c18]/25 to-transparent ${
                    isActive ? "opacity-100" : "opacity-75 group-hover:opacity-95"
                  }`}
                />
                <div className="absolute inset-x-0 bottom-0 p-3">
                  <p className="font-mono text-[0.6rem] uppercase tracking-wider text-indigo-200">
                    {project.category}
                  </p>
                  <p className="text-xs md:text-sm font-semibold text-white line-clamp-1">
                    {project.title}
                  </p>
                </div>
                {isActive && (
                  <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 rounded-full bg-indigo-400 timeline-dot-active" />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {modalProject && (
        <ProjectModal project={modalProject} onClose={closeModal} />
      )}
    </div>
  );
}
