import type { Project } from "../config/portfolio";
import ProjectsClient from "./client/ProjectsClient";

export default function ProjectsSection({ projects }: { projects: Project[] }) {
  return (
    <section
      id="projects"
      className="relative z-10 min-h-screen pt-28 md:pt-32 pb-20 md:pb-28 px-6 md:px-10 2xl:px-16"
    >
      <div className="max-w-7xl 2xl:max-w-360 mx-auto">
        <div className="mb-10 md:mb-14 animate-fade-in-up">
          <p className="font-mono text-xs md:text-sm 2xl:text-base text-indigo-400 tracking-wider uppercase mb-2">
            Selected Work
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl font-bold text-white">
            <span className="gradient-text">Projects</span>
          </h1>
          <p className="mt-4 max-w-2xl text-sm md:text-base text-gray-400">
            A selection of things I&apos;ve built — products, backend systems and
            research. Open any card for the full story, screenshots and links.
          </p>
        </div>

        <ProjectsClient projects={projects} />
      </div>
    </section>
  );
}
