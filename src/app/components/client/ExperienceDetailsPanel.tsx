"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { Experience } from "../ExperienceSection";

export default function ExperienceDetailsPanel({
  selectedExp,
  theme,
  mobileOpen,
  onClose,
}: {
  selectedExp: Experience;
  theme: "dark" | "light";
  mobileOpen: boolean;
  onClose: () => void;
}) {
  const isLight = theme === "light";
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll only on mobile when panel is open
  useEffect(() => {
    if (!mobileOpen) {
      document.body.style.overflow = "";
      return;
    }
    const mq = window.matchMedia("(min-width: 1024px)");
    if (!mq.matches) {
      document.body.style.overflow = "hidden";
    }
    const onChange = () => {
      document.body.style.overflow = mq.matches ? "" : "hidden";
    };
    mq.addEventListener("change", onChange);
    return () => {
      mq.removeEventListener("change", onChange);
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const details = (
    <div key={selectedExp.id} className="detail-animate-in">
      {/* Header */}
      <div className="mb-6 2xl:mb-8">
        <p
          className={`font-mono text-xs 2xl:text-sm mb-2 tracking-wide ${
            isLight ? "text-indigo-600" : "text-indigo-400"
          }`}
        >
          {selectedExp.period}
        </p>
        <h3
          className={`text-xl md:text-2xl 2xl:text-3xl font-bold mb-1 leading-tight ${
            isLight ? "text-gray-900" : ""
          }`}
        >
          {selectedExp.role}
        </h3>
        <p
          className={`text-sm md:text-base 2xl:text-lg flex flex-wrap items-center gap-x-2 gap-y-1.5 ${
            isLight ? "text-gray-500" : "text-gray-400"
          }`}
        >
          <span>
            {selectedExp.company} · {selectedExp.location}
          </span>
          {selectedExp.employmentType && (
            <span
              className={`font-mono text-[0.65rem] 2xl:text-xs uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                isLight
                  ? "bg-indigo-50 border-indigo-200 text-indigo-600"
                  : "bg-indigo-500/10 border-indigo-500/20 text-indigo-300"
              }`}
            >
              {selectedExp.employmentType}
            </span>
          )}
        </p>
      </div>

      {/* Details */}
      <div className="space-y-3 2xl:space-y-4 mb-8 2xl:mb-10">
        {selectedExp.details.map((detail, i) => (
          <div
            key={i}
            className="detail-item flex gap-3"
            style={{ animationDelay: `${i * 0.08 + 0.1}s` }}
          >
            <span
              className={`mt-1 text-sm 2xl:text-base shrink-0 ${
                isLight ? "text-indigo-500" : "text-indigo-400"
              }`}
            >
              →
            </span>
            <p
              className={`text-sm md:text-base 2xl:text-lg leading-relaxed ${
                isLight ? "text-gray-600" : "text-gray-300"
              }`}
            >
              {detail}
            </p>
          </div>
        ))}
      </div>

      {/* Technologies */}
      <div>
        <p
          className={`font-mono text-xs 2xl:text-sm uppercase tracking-wider mb-3 2xl:mb-4 ${
            isLight ? "text-gray-400" : "text-gray-500"
          }`}
        >
          Technologies
        </p>
        <div className="flex flex-wrap gap-2 2xl:gap-3">
          {selectedExp.skills.map((skill, i) => (
            <span
              key={i}
              className={`skill-tag px-3 py-1.5 2xl:px-4 2xl:py-2 text-xs md:text-sm 2xl:text-base rounded-full cursor-default ${
                isLight
                  ? "bg-indigo-50 border border-indigo-200 text-indigo-700"
                  : "bg-indigo-500/10 border border-indigo-500/20 text-indigo-300"
              }`}
              style={{ animationDelay: `${i * 0.05 + 0.3}s` }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  const mobileOverlay = mobileOpen ? (
    <div
      className={`fixed inset-0 z-9999 lg:hidden overflow-y-auto animate-slide-in-up ${
        isLight ? "bg-white" : "bg-[#080c18]"
      }`}
    >
      <div className="relative px-4 py-4 pt-14 min-h-full">
        <button
          onClick={onClose}
          aria-label="Close"
          className={`fixed top-4 right-4 z-10000 w-11 h-11 flex items-center justify-center rounded-full text-xl font-bold transition-colors shadow-lg ${
            isLight
              ? "bg-gray-100 hover:bg-gray-200 text-gray-700"
              : "bg-white/10 hover:bg-white/20 text-gray-300"
          }`}
        >
          ✕
        </button>
        <div className={isLight ? "light-card rounded-2xl p-4" : "glass-card rounded-2xl p-4"}>
          {details}
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
      {mounted && createPortal(mobileOverlay, document.body)}

      {/* Desktop card */}
      <div
        key={selectedExp.id}
        className={`hidden lg:block ${
          isLight ? "light-card" : "glass-card"
        } rounded-2xl p-8 2xl:p-10 animate-slide-in-right max-h-[calc(100vh-8rem)] overflow-y-auto`}
      >
        {details}
      </div>
    </>
  );
}
