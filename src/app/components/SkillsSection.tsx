import React from "react";
import WaveMask from "./ui/WaveMask";

function SkillsSection({ skills }: { skills: Record<string, string[]> }) {
  return (
    <section id="skills" className="py-12 px-6 relative min-h-screen z-10">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <p className="font-mono text-sm text-indigo-500 tracking-wider uppercase mb-2">
            Technical Arsenal
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Skills & Tools
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(skills).map(([category, items]) => (
            <div
              key={category}
              className="light-card rounded-xl p-6 transition-all duration-300"
            >
              <h3 className="font-mono text-sm text-indigo-600 uppercase tracking-wider mb-4">
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {items.map((skill, i) => (
                  <span
                    key={i}
                    className="skill-tag px-3 py-1.5 text-sm bg-indigo-50 rounded-lg text-gray-700 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <WaveMask variant="dark-to-light" />
    </section>
  );
}

export default SkillsSection;
