import ExperienceSection from "./components/ExperienceSection";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import EducationSection from "./components/EducationSection";
import ContactSection from "./components/ContactSection";
import {
  PROFILE_IMAGE,
  experiences,
  skills,
  primaryEducation,
  otherEducation,
  certifications,
  projects,
} from "./config/portfolio";
import SkillsSection from "./components/SkillsSection";
import FeaturedProjectsSection from "./components/FeaturedProjectsSection";

// Home only teases the top projects; the rest live on /projects.
const FEATURED_PROJECT_COUNT = 4;

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-[#080c18] text-gray-100 overflow-x-hidden font-sans">
      {/* Gradient orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-cyan-600/15 rounded-full blur-[7.5rem]" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-indigo-600/15 rounded-full blur-[7.5rem]" />
        <div className="absolute top-3/4 left-1/3 w-64 h-64 bg-purple-600/10 rounded-full blur-[6.25rem]" />
      </div>

      <Navbar />
      <HeroSection profileImage={PROFILE_IMAGE} />

      {/* Experience Section */}
      <section
        id="experience"
        className="bg-white min-h-screen relative pt-14 md:pt-20 2xl:pt-28 pb-8 md:pb-12 px-6 md:px-10 2xl:px-16 z-10"
      >
        <div className="max-w-7xl 2xl:max-w-360 mx-auto">
          <div className="mb-12 md:mb-16 2xl:mb-20 animate-fade-in-up">
            <p className="font-mono text-xs md:text-sm 2xl:text-base text-indigo-500 tracking-wider uppercase mb-2">
              Career Journey
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl font-bold text-gray-900">
              Experience
            </h2>
          </div>
          <ExperienceSection experiences={experiences} theme="light" />
        </div>
      </section>

      {/* Projects teaser — same white block as Experience, wave into Skills */}
      <FeaturedProjectsSection
        projects={projects.slice(0, FEATURED_PROJECT_COUNT)}
        totalCount={projects.length}
      />

      <SkillsSection skills={skills} />

      {/* Education & Certifications */}
      <EducationSection
        primary={primaryEducation}
        other={otherEducation}
        certifications={certifications}
      />
      <ContactSection />
    </div>
  );
}
