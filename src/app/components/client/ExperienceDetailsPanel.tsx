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
    <>
      <div className="mb-6">
        <p
          className={`font-mono text-xs mb-2 ${isLight ? "text-indigo-600" : "text-indigo-400"}`}
        >
          {selectedExp.period}
        </p>
        <h3
          className={`text-2xl font-bold mb-1 ${isLight ? "text-gray-900" : ""}`}
        >
          {selectedExp.role}
        </h3>
        <p className={isLight ? "text-gray-500" : "text-gray-400"}>
          {selectedExp.company} · {selectedExp.location}
        </p>
      </div>

      <div className="space-y-3 mb-8">
        {selectedExp.details.map((detail, i) => (
          <div key={i} className="flex gap-3">
            <span
              className={`mt-1.5 ${isLight ? "text-indigo-500" : "text-indigo-400"}`}
            >
              →
            </span>
            <p
              className={`leading-relaxed ${isLight ? "text-gray-600" : "text-gray-300"}`}
            >
              {detail}
            </p>
          </div>
        ))}
      </div>

      <div>
        <p
          className={`font-mono text-xs uppercase tracking-wider mb-3 ${isLight ? "text-gray-400" : "text-gray-500"}`}
        >
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
    </>
  );

  const mobileOverlay = mobileOpen ? (
    <div
      className={`fixed inset-0 z-9999 lg:hidden overflow-y-auto animate-slide-in-up ${
        isLight ? "bg-white" : "bg-[#080c18]"
      }`}
    >
      <div className="relative p-6 pt-16 min-h-full">
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
        <div
          className={'glass-card'}
        >
          {details}
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
      {/* Mobile overlay — portaled to body to escape stacking contexts */}
      {mounted && createPortal(mobileOverlay, document.body)}

      {/* Desktop card */}
      <div
        key={selectedExp.id}
        className={`hidden lg:block ${isLight ? "light-card" : "glass-card"} rounded-2xl p-8 animate-slide-in-right max-h-[calc(100vh-8rem)] overflow-y-auto`}
      >
        {details}
      </div>
    </>
  );
}
