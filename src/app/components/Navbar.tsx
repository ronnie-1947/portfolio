"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const PROJECTS_PATH = "/projects";

// Same-page sections on `/` — these drive the scroll-spy.
const sectionItems = [
  {
    id: "about",
    label: "Home",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    id: "experience",
    label: "Experience",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: "skills",
    label: "Skills",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    id: "education",
    label: "Education",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665-.33m6.843 3.752A12.066 12.066 0 0112 21c-2.132 0-4.15-.523-6.003-1.434M12 14v7m0 0l3.16-1.623M12 21l-3.16-1.623" />
      </svg>
    ),
  },
  {
    id: "contact",
    label: "Contact",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];

// The Projects item is a route, not a section — inserted after Skills.
const projectsItem = {
  id: "projects",
  label: "Projects",
  icon: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
    </svg>
  ),
};

const PROJECTS_INDEX = sectionItems.findIndex((item) => item.id === "skills") + 1;

const linkClass = (isActive: boolean) =>
  `w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 ${
    isActive
      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/40"
      : "text-gray-400 hover:text-white hover:bg-white/10"
  }`;

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [active, setActive] = useState("about");

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const id = e.currentTarget.getAttribute("href")?.slice(1);
    if (id) {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    // Scroll-spy only applies to the one-page home route.
    if (!isHome) return;

    const handleScroll = () => {
      const sections = sectionItems
        .map((item) => document.getElementById(item.id))
        .filter(Boolean) as HTMLElement[];

      const scrollY = window.scrollY + window.innerHeight * 0.4;

      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i].offsetTop <= scrollY) {
          setActive(sections[i].id);
          return;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  const renderItems = () => {
    const nodes = sectionItems.map((item) => (
      <a
        key={item.id}
        href={isHome ? `#${item.id}` : `/#${item.id}`}
        onClick={isHome ? handleSmoothScroll : undefined}
        title={item.label}
        className={linkClass(isHome && active === item.id)}
      >
        {item.icon}
      </a>
    ));

    nodes.splice(
      PROJECTS_INDEX,
      0,
      <Link
        key={projectsItem.id}
        href={PROJECTS_PATH}
        title={projectsItem.label}
        className={linkClass(!isHome && pathname === PROJECTS_PATH)}
      >
        {projectsItem.icon}
      </Link>,
    );

    return nodes;
  };

  return (
    <>
      {/* Desktop: vertical pill nav on left */}
      <nav className="hidden md:flex fixed left-6 top-1/2 -translate-y-1/2 z-50 flex-col items-center gap-2 p-3 rounded-full bg-white/4 backdrop-blur-md border border-white/9 shadow-[0_0.5rem_2rem_rgba(0,0,0,0.3)]">
        {renderItems()}
      </nav>

      {/* Mobile: horizontal floating pill nav at top */}
      <nav className="md:hidden fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 px-2 py-2 rounded-full bg-white/4 backdrop-blur-md border border-white/9 shadow-[0_0.5rem_2rem_rgba(0,0,0,0.3)]">
        {renderItems()}
      </nav>
    </>
  );
}
