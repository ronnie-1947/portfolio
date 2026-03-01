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
      // Only update on hover for mouse/pen — ignore touch
      if (e.pointerType === "mouse" || e.pointerType === "pen") {
        setSelectedExp(exp);
      }
    },
    [],
  );

  const handleClick = useCallback(
    (exp: Experience) => {
      setSelectedExp(exp);
      setMobileOpen(true);
    },
    [],
  );

  return (
    <div className="grid lg:grid-cols-5 gap-8">
      {/* Timeline */}
      <div className="lg:col-span-2 relative">
        <div className="absolute left-4 top-0 bottom-0 w-px timeline-line"></div>
        <div className="space-y-2">
          {experiences.map((exp, index) => (
            <div
              key={exp.id}
              className={`experience-item relative pl-12 py-4 cursor-pointer rounded-lg ${
                selectedExp.id === exp.id
                  ? isLight
                    ? "active border border-indigo-100 bg-indigo-50/60"
                    : "active glass-card"
                  : isLight
                  ? "hover:bg-indigo-50/50"
                  : "hover:bg-white/5"
              }`}
              onClick={() => handleClick(exp)}
              onPointerEnter={(e) => handlePointerEnter(exp, e)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div
                className={`absolute left-2.5 top-6 w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                  selectedExp.id === exp.id
                    ? "bg-indigo-500 border-indigo-500 scale-125"
                    : isLight
                    ? "bg-white border-gray-300"
                    : "bg-[#0a0a0b] border-gray-600"
                }`}
              ></div>
              <div className={`font-mono text-xs mb-1 ${isLight ? "text-gray-400" : "text-gray-500"}`}>
                {exp.period}
              </div>
              <h3
                className={`font-semibold transition-colors duration-200 ${
                  selectedExp.id === exp.id
                    ? isLight ? "text-gray-900" : "text-white"
                    : isLight ? "text-gray-700" : "text-gray-300"
                }`}
              >
                {exp.role}
              </h3>
              <p className={`text-sm ${isLight ? "text-indigo-600" : "text-indigo-400"}`}>{exp.company}</p>
              <p className={`text-xs ${isLight ? "text-gray-400" : "text-gray-500"}`}>{exp.location}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Details panel */}
      <div className="lg:col-span-3 lg:sticky lg:top-24">
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
