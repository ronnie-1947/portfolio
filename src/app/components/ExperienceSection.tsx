"use client";

import { useState } from "react";

type Experience = {
  id: number;
  role: string;
  company: string;
  location: string;
  period: string;
  details: string[];
  skills: string[];
};

export default function ExperienceSection({
  experiences,
  theme = "dark",
}: {
  experiences: Experience[];
  theme?: "dark" | "light";
}) {
  const [selectedExp, setSelectedExp] = useState<Experience | null>(null);
  const isLight = theme === "light";

  return (
    <div className="grid lg:grid-cols-5 gap-8">
      {/* Timeline */}
      <div className="lg:col-span-2 relative">
        {/* Vertical line */}
        <div className="absolute left-4 top-0 bottom-0 w-px timeline-line"></div>

        <div className="space-y-2">
          {experiences.map((exp, index) => (
            <div
              key={exp.id}
              className={`experience-item relative pl-12 py-4 cursor-pointer rounded-lg ${
                selectedExp?.id === exp.id
                  ? isLight
                    ? "active border border-indigo-100 bg-indigo-50/60"
                    : "active glass-card"
                  : isLight
                  ? "hover:bg-indigo-50/50"
                  : "hover:bg-white/5"
              }`}
              onClick={() => setSelectedExp(exp)}
              onMouseEnter={() => setSelectedExp(exp)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Timeline dot */}
              <div
                className={`absolute left-2.5 top-6 w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                  selectedExp?.id === exp.id
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
                  selectedExp?.id === exp.id
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
      <div className="lg:col-span-3 lg:sticky lg:top-24 h-fit">
        {selectedExp ? (
          <div
            className={`${isLight ? "light-card" : "glass-card"} rounded-2xl p-8 animate-slide-in-right`}
            key={selectedExp.id}
          >
            <div className="mb-6">
              <p className={`font-mono text-xs mb-2 ${isLight ? "text-indigo-600" : "text-indigo-400"}`}>
                {selectedExp.period}
              </p>
              <h3 className={`text-2xl font-bold mb-1 ${isLight ? "text-gray-900" : ""}`}>{selectedExp.role}</h3>
              <p className={isLight ? "text-gray-500" : "text-gray-400"}>
                {selectedExp.company} · {selectedExp.location}
              </p>
            </div>

            <div className="space-y-3 mb-8">
              {selectedExp.details.map((detail, i) => (
                <div key={i} className="flex gap-3">
                  <span className={`mt-1.5 ${isLight ? "text-indigo-500" : "text-indigo-400"}`}>→</span>
                  <p className={`leading-relaxed ${isLight ? "text-gray-600" : "text-gray-300"}`}>{detail}</p>
                </div>
              ))}
            </div>

            <div>
              <p className={`font-mono text-xs uppercase tracking-wider mb-3 ${isLight ? "text-gray-400" : "text-gray-500"}`}>
                Technologies
              </p>
              <div className="flex flex-wrap gap-2">
                {selectedExp.skills.map((skill, i) => (
                  <span
                    key={i}
                    className={`skill-tag px-3 py-1.5 text-sm rounded-full ${
                      isLight
                        ? "bg-indigo-50 border border-indigo-200 text-indigo-700"
                        : "bg-indigo-500/10 border border-indigo-500/20 text-indigo-300"
                    }`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className={`${isLight ? "light-card" : "glass-card"} rounded-2xl p-8 flex items-center justify-center min-h-[300px]`}>
            <p className={`text-center ${isLight ? "text-gray-400" : "text-gray-500"}`}>
              <span className="block text-4xl mb-2">←</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
