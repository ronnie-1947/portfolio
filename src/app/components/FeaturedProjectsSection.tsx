import type { Project } from "../config/portfolio";
import FeaturedProjectsClient from "./client/FeaturedProjectsClient";
import GooeyButton from "./ui/btn-gooey";
import WaveMask from "./ui/WaveMask";

/**
 * Home-page teaser for the work on `/projects`: a carousel of the top projects
 * paired with a clickable collage. Light theme so it reads as one white block
 * with the Experience section above it, and it carries the wave transition
 * down into the dark Skills section.
 */
export default function FeaturedProjectsSection({
  projects,
  totalCount,
}: {
  projects: Project[];
  totalCount: number;
}) {
  return (
    <section
      id="projects"
      className="bg-white relative z-10 overflow-hidden pt-10 sm:pt-14 md:pt-16 pb-36 md:pb-44 px-6 md:px-10 2xl:px-16"
    >
      {/* Decorative drifting blobs */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-16 -left-24 w-72 h-72 rounded-full bg-indigo-100/70 blur-3xl"
          style={{ animation: "float 14s ease-in-out infinite" }}
        />
        <div
          className="absolute top-1/3 -right-24 w-80 h-80 rounded-full bg-purple-100/60 blur-3xl"
          style={{ animation: "float-alt 17s ease-in-out infinite" }}
        />
      </div>

      <div className="relative max-w-7xl 2xl:max-w-360 mx-auto">
        {/* Hairline separating the two white sections */}
        <div className="mb-10 sm:mb-14 md:mb-16 h-px bg-linear-to-r from-transparent via-indigo-100 to-transparent" />

        <div className="mb-8 sm:mb-12 md:mb-14 flex flex-col sm:flex-row sm:flex-wrap sm:items-end sm:justify-between gap-5 md:gap-6 animate-fade-in-up">
          <div>
            <p className="flex items-center gap-2 font-mono text-xs md:text-sm 2xl:text-base text-indigo-500 tracking-wider uppercase mb-2">
              <span className="relative flex w-2 h-2">
                <span className="absolute inline-flex w-full h-full rounded-full bg-indigo-400 opacity-75 animate-ping" />
                <span className="relative inline-flex w-2 h-2 rounded-full bg-indigo-500" />
              </span>
              Selected Work
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl font-bold text-gray-900">
              Projects
            </h2>
            <p className="mt-3 max-w-xl text-sm md:text-base 2xl:text-lg text-gray-500">
              Things I&apos;ve built on my own — products, backend systems and
              security research.
            </p>
          </div>

          <GooeyButton
            href="/projects"
            label="All projects ->"
            fontSize={30}
            width="clamp(12rem, 38vw, 14rem)"
            animate
          />
        </div>

        <FeaturedProjectsClient projects={projects} />
      </div>

      <WaveMask variant="light-to-dark" />
    </section>
  );
}
