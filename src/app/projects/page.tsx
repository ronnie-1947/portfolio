import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import ProjectsSection from "../components/ProjectsSection";
import { projects } from "../config/portfolio";

export const metadata: Metadata = {
  title: "Projects — Ripunjoy Buddha",
  description:
    "Selected work by Ripunjoy Buddha — full-stack products, secure backend systems and cybersecurity research.",
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-[#080c18] text-gray-100 overflow-x-hidden font-sans">
      {/* Gradient orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-cyan-600/15 rounded-full blur-[7.5rem]" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-indigo-600/15 rounded-full blur-[7.5rem]" />
        <div className="absolute top-3/4 left-1/3 w-64 h-64 bg-purple-600/10 rounded-full blur-[6.25rem]" />
      </div>

      <Navbar />
      <ProjectsSection projects={projects} />
    </div>
  );
}
