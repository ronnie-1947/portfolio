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
} from "./config/portfolio";
import WaveMask from "./components/ui/WaveMask";
import SkillsSection from "./components/SkillsSection";

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
      <section id="experience" className=" bg-white min-h-screen relative py-14 px-6 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 animate-fade-in-up">
            <p className="font-mono text-sm text-indigo-500 tracking-wider uppercase mb-2">
              Career Journey
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              Experience
            </h2>
          </div>
          <ExperienceSection experiences={experiences} theme="light" />
        </div>
        <WaveMask variant="light-to-dark" />
      </section>

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
