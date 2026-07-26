"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import type { Project } from "../../config/portfolio";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";

const ALL = "All";

export default function ProjectsClient({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<string>(ALL);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  // Element that opened the modal, so focus can be returned on close.
  const triggerRef = useRef<HTMLElement | null>(null);

  // Tabs are derived from the data, so a filter can never yield an empty grid.
  const categories = useMemo(() => {
    const seen: string[] = [];
    for (const project of projects) {
      if (!seen.includes(project.category)) seen.push(project.category);
    }
    return [ALL, ...seen];
  }, [projects]);

  const visibleProjects = useMemo(
    () =>
      filter === ALL ? projects : projects.filter((p) => p.category === filter),
    [projects, filter],
  );

  const handleSelect = useCallback(
    (project: Project, trigger: HTMLElement | null) => {
      triggerRef.current = trigger;
      setSelectedProject(project);
    },
    [],
  );

  const handleClose = useCallback(() => {
    setSelectedProject(null);
    triggerRef.current?.focus();
    triggerRef.current = null;
  }, []);

  return (
    <div>
      {/* Filter tabs */}
      {categories.length > 2 && (
        <div className="flex flex-wrap gap-2 mb-8 md:mb-10">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setFilter(category)}
              aria-pressed={filter === category}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                filter === category
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/40"
                  : "text-gray-400 hover:text-white hover:bg-white/10"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {visibleProjects.map((project, index) => (
          // Keying on filter restarts the entrance animation when tabs change.
          <ProjectCard
            key={`${filter}-${project.id}`}
            project={project}
            index={index}
            onSelect={handleSelect}
          />
        ))}
      </div>

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={handleClose} />
      )}
    </div>
  );
}
