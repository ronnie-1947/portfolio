"use client";

import { useCallback, useState } from "react";
import type { Experience } from "../ExperienceSection";
import ExperienceDetailsPanel from "./ExperienceDetailsPanel";

export default function ExperienceClient({
  experiences,
  theme = "dark",
}: {
  experiences: Experience[];
  theme?: "dark" | "light";
}) {
  const [selectedExp, setSelectedExp] = useState<Experience>(experiences[0]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isLight = theme === "light";

  const handlePointerEnter = useCallback(
    (exp: Experience, e: React.PointerEvent) => {
      if (e.pointerType === "mouse" || e.pointerType === "pen") {
        setSelectedExp(exp);
      }
    },
    [],
  );

  const handleClick = useCallback((exp: Experience) => {
    setSelectedExp(exp);
    setMobileOpen(true);
  }, []);

  const selectedIndex = experiences.findIndex((e) => e.id === selectedExp.id);

  return (
    <div className="grid lg:grid-cols-5 2xl:grid-cols-7 gap-6 lg:gap-10 2xl:gap-14">
      {/* Timeline */}
      <div className="lg:col-span-2 2xl:col-span-3 relative">
        {/* Timeline track */}
        <div className="absolute left-4 lg:left-5 top-0 bottom-0 w-px timeline-line" />

        {/* Animated progress fill */}
        <div
          className="absolute left-4 lg:left-5 top-0 w-px transition-all duration-500 ease-out rounded-full"
          style={{
            height: `${((selectedIndex + 1) / experiences.length) * 100}%`,
            background:
              "linear-gradient(180deg, rgba(99,102,241,0.8) 0%, rgba(168,85,247,0.6) 100%)",
          }}
        />

        <div className="space-y-1 md:space-y-2">
          {experiences.map((exp, index) => (
            <div
              key={exp.id}
              className={`experience-item relative pl-11 lg:pl-14 py-3 md:py-4 2xl:py-5 cursor-pointer rounded-xl transition-all ${
                selectedExp.id === exp.id
                  ? isLight
                    ? "active border border-indigo-100 bg-indigo-50/60 shadow-sm"
                    : "active glass-card"
                  : isLight
                    ? "hover:bg-indigo-50/40"
                    : "hover:bg-white/5"
              }`}
              onClick={() => handleClick(exp)}
              onPointerEnter={(e) => handlePointerEnter(exp, e)}
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              {/* Timeline dot */}
              <div
                className={`absolute left-2.5 lg:left-3.5 top-5 md:top-6 w-3 h-3 lg:w-3.5 lg:h-3.5 rounded-full border-2 transition-all duration-300 ${
                  selectedExp.id === exp.id
                    ? "bg-indigo-500 border-indigo-500 scale-125 timeline-dot-active"
                    : isLight
                      ? "bg-white border-gray-300 hover:border-indigo-300"
                      : "bg-[#0a0a0b] border-gray-600 hover:border-indigo-500"
                }`}
              />

              {/* Period */}
              <div
                className={`font-mono text-[0.65rem] md:text-xs 2xl:text-sm mb-1 tracking-wide ${
                  isLight ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {exp.period}
              </div>

              {/* Role */}
              <h3
                className={`font-semibold text-sm md:text-base lg:text-base 2xl:text-lg leading-snug transition-colors duration-200 ${
                  selectedExp.id === exp.id
                    ? isLight
                      ? "text-gray-900"
                      : "text-white"
                    : isLight
                      ? "text-gray-700"
                      : "text-gray-300"
                }`}
              >
                {exp.role}
              </h3>

              {/* Company */}
              <p
                className={`text-xs md:text-sm 2xl:text-base mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1 ${
                  isLight ? "text-indigo-600" : "text-indigo-400"
                }`}
              >
                {exp.company}
                {exp.employmentType && (
                  <span
                    className={`font-mono text-[0.6rem] 2xl:text-[0.7rem] uppercase tracking-wider px-1.5 py-0.5 rounded-md ${
                      isLight
                        ? "bg-indigo-50 text-indigo-500/90"
                        : "bg-indigo-500/10 text-indigo-300/80"
                    }`}
                  >
                    {exp.employmentType}
                  </span>
                )}
              </p>

              {/* Location */}
              <p
                className={`text-[0.65rem] md:text-xs 2xl:text-sm ${
                  isLight ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {exp.location}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Details panel */}
      <div className="lg:col-span-3 2xl:col-span-4 lg:sticky lg:top-24 self-start">
        <ExperienceDetailsPanel
          selectedExp={selectedExp}
          theme={theme}
          mobileOpen={mobileOpen}
          onClose={() => setMobileOpen(false)}
        />
      </div>
    </div>
  );
}
