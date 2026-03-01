"use client";

import { useState, useEffect } from "react";

const roles = [
  "Security Engineer",
  "Full Stack Developer",
  "Cloud Architect",
  "AI Systems Builder",
];

export default function TypewriterEffect() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const currentRole = roles[roleIndex];
    const speed = isDeleting ? 50 : 100;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        const next = currentRole.slice(0, displayText.length + 1);
        setDisplayText(next);
        if (next === currentRole) {
          setIsPaused(true);
          setTimeout(() => {
            setIsPaused(false);
            setIsDeleting(true);
          }, 2200);
        }
      } else {
        const next = displayText.slice(0, -1);
        setDisplayText(next);
        if (next === "") {
          setIsDeleting(false);
          setRoleIndex((i) => (i + 1) % roles.length);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex, isPaused]);

  return (
    <p className="text-xl md:text-2xl text-gray-300 h-9 flex items-center justify-center gap-1">
      I&apos;m a{" "}
      <span className="text-cyan-400 font-medium">{displayText}</span>
      <span
        className="text-cyan-400 font-light"
        style={{ animation: "blink 1s step-end infinite" }}
      >
        |
      </span>
    </p>
  );
}
