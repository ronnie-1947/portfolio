"use client";

import React, { useEffect, useMemo, useState } from "react";
import type { IconType } from "react-icons";
import {
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
  SiNodedotjs,
  SiGo,
  SiExpress,
  SiPython,
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiPrisma,
  SiAmazonwebservices,
  SiDocker,
  SiKubernetes,
  SiAuth0,
  SiWireshark,
  SiOpenai,
  SiAnthropic,
  SiGraphql,
  SiPortswigger,
} from "react-icons/si";
import {
  HiShieldCheck,
  HiCloud,
  HiCode,
} from "react-icons/hi";
import {
  TbBug,
  TbRadar2,
  TbSearch,
  TbRobot,
} from "react-icons/tb";
import WaveMask from "../ui/WaveMask";
import BgShapes1 from "../ui/bg-shapes-1";

const skillIcons: Record<string, IconType> = {
  // Core Expertise
  "Full-Stack Development": HiCode,
  "Secure System Design": HiShieldCheck,
  "API Architecture (REST, GraphQL)": SiGraphql,
  "Cloud-Native Deployment": HiCloud,
  "Web Penetration Testing": TbBug,
  // Frontend
  "React": SiReact,
  "Next.js": SiNextdotjs,
  "React Native": SiReact,
  "Tailwind CSS": SiTailwindcss,
  "TypeScript": SiTypescript,
  // Backend
  "Node.js": SiNodedotjs,
  "Go": SiGo,
  "Express": SiExpress,
  "Python": SiPython,
  // Databases
  "PostgreSQL": SiPostgresql,
  "MySQL": SiMysql,
  "MongoDB": SiMongodb,
  "Prisma": SiPrisma,
  // Cloud/DevOps
  "AWS (EC2, EKS, S3, GuardDuty)": SiAmazonwebservices,
  "Docker": SiDocker,
  "Kubernetes": SiKubernetes,
  // Security
  "OAuth": SiAuth0,
  "Nmap": TbRadar2,
  "Wireshark": SiWireshark,
  "Burp Suite": SiPortswigger,
  "OSINT": TbSearch,
  // AI
  "OpenAI API": SiOpenai,
  "Claude API": SiAnthropic,
  "AI Agents": TbRobot,
};

/** How long one highlight burst lasts — matches skillBorderSweep in globals.css. */
const HIGHLIGHT_MS = 1600;
/** Idle window between a lane's bursts. */
const GAP_MIN_MS = 300;
const GAP_MAX_MS = 1200;
/** Independent burst lanes; each drifts out of phase, so 2-3 tags glow at once. */
const LANES = 3;

const randomGap = () => GAP_MIN_MS + Math.random() * (GAP_MAX_MS - GAP_MIN_MS);

/**
 * Lights up a few random skill tags at a time, so the grid keeps moving even
 * when nothing is hovered. Returns the set of tag ids currently highlighted.
 */
function useRandomHighlights(tagIds: string[]) {
  const [active, setActive] = useState<Set<string>>(() => new Set());

  useEffect(() => {
    if (tagIds.length === 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lit = new Set<string>();
    const timers = new Set<ReturnType<typeof setTimeout>>();
    let cancelled = false;

    const sync = () => setActive(new Set(lit));

    // Never light the same tag from two lanes at once.
    const pick = () => {
      const free = tagIds.filter((id) => !lit.has(id));
      return free.length > 0 ? free[Math.floor(Math.random() * free.length)] : null;
    };

    const after = (delay: number, fn: () => void) => {
      const timer = setTimeout(() => {
        timers.delete(timer);
        if (!cancelled) fn();
      }, delay);
      timers.add(timer);
    };

    const runLane = (delay: number) => {
      after(delay, () => {
        const id = pick();
        if (!id) {
          runLane(randomGap());
          return;
        }
        lit.add(id);
        sync();
        after(HIGHLIGHT_MS, () => {
          lit.delete(id);
          sync();
          runLane(randomGap());
        });
      });
    };

    // Stagger the lanes' starts so they never sweep in lockstep.
    for (let lane = 0; lane < LANES; lane++) {
      runLane(lane * 500 + Math.random() * 400);
    }

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [tagIds]);

  return active;
}

function SkillsClient({ skills }: { skills: Record<string, string[]> }) {
  const tagIds = useMemo(
    () =>
      Object.entries(skills).flatMap(([category, items]) =>
        items.map((_, i) => `${category}-${i}`)
      ),
    [skills]
  );
  const activeTagIds = useRandomHighlights(tagIds);

  return (
    <section id="skills" className="pt-14 pb-40 md:pb-64 px-6 relative min-h-screen z-10 bg-[#080c18]">
      {/* Ambient glow blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
        <div className="absolute top-1/4 -left-24 w-80 h-80 bg-cyan-600/10 rounded-full blur-[6rem]" />
        <div className="absolute bottom-1/3 -right-24 w-80 h-80 bg-indigo-600/10 rounded-full blur-[6rem]" />
        <div className="absolute top-2/3 left-1/2 w-64 h-64 bg-purple-600/8 rounded-full blur-[5rem]" />
      </div>

      <BgShapes1 />

      <div className="relative max-w-6xl mx-auto" style={{ zIndex: 10 }}>
        <div className="mb-12">
          <p className="font-mono text-sm text-indigo-400 tracking-wider uppercase mb-2">
            Technical Arsenal
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold"
            style={{ color: "#67e8f9", textShadow: "0 0 40px rgba(6,182,212,0.4)" }}
          >
            Skills & Expertise
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(skills).map(([category, items]) => (
            <div
              key={category}
              className="glass-card rounded-xl p-3 transition-all duration-300 hover:border-cyan-500/30"
              style={{
                boxShadow:
                  "0 0 18px rgba(99,102,241,0.12), 0 0 4px rgba(6,182,212,0.08), inset 0 1px 0 rgba(255,255,255,0.06)",
              }}
            >
              <h3
                className="font-mono text-sm text-indigo-400 uppercase tracking-wider mb-4"
                style={{ textShadow: "0 0 14px rgba(129,140,248,0.5)" }}
              >
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {items.map((skill, i) => {
                  const Icon = skillIcons[skill];
                  const tagId = `${category}-${i}`;
                  return (
                    <span
                      key={i}
                      className={`skill-tag inline-flex items-center gap-1.5 px-3 py-1.5 text-base rounded-lg text-gray-300 cursor-default border border-indigo-500/25 bg-indigo-900/30 hover:border-cyan-400/50 hover:text-cyan-200 transition-all duration-200${
                        activeTagIds.has(tagId) ? " is-highlighted" : ""
                      }`}
                    >
                      {Icon && <Icon className="w-4 h-4 shrink-0" />}
                      {skill}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <WaveMask variant="dark-to-light" />
    </section>
  );
}

export default SkillsClient;
