import ExperienceSection from "./components/ExperienceSection";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import {
  PROFILE_IMAGE,
  experiences,
  skills,
  education,
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
      <section className="py-32 px-6 relative bg-white z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Education */}
            <div>
              <p className="font-mono text-sm text-indigo-500 tracking-wider uppercase mb-2">
                Academic Background
              </p>
              <h2 className="text-3xl font-bold mb-8 text-gray-900">
                Education
              </h2>
              <div className="space-y-6">
                {education.map((edu, i) => (
                  <div key={i} className="light-card rounded-xl p-6">
                    <p className="font-mono text-xs text-gray-400 mb-2">
                      {edu.year}
                    </p>
                    <h3 className="font-semibold text-lg mb-1 text-gray-900">
                      {edu.degree}
                    </h3>
                    <p className="text-indigo-600">{edu.school}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div>
              <p className="font-mono text-sm text-indigo-500 tracking-wider uppercase mb-2">
                Professional
              </p>
              <h2 className="text-3xl font-bold mb-8 text-gray-900">
                Certifications
              </h2>
              <div className="space-y-4">
                {certifications.map((cert, i) => (
                  <div
                    key={i}
                    className="light-card rounded-xl p-6 flex justify-between items-center"
                  >
                    <h3 className="font-semibold text-gray-900">{cert.name}</h3>
                    <span className="font-mono text-xs text-gray-400">
                      {cert.period}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-mono text-sm text-indigo-500 tracking-wider uppercase mb-2">
            Let&apos;s Connect
          </p>
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            <span className="gradient-text">Get in Touch</span>
          </h2>
          <p className="text-xl text-gray-500 mb-12 max-w-2xl mx-auto">
            Interested in working together or have a question? I&apos;d love to
            hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:ripunjoy.buddha@gmail.com"
              className="group px-8 py-4 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-medium text-white transition-all duration-200 hover:shadow-lg hover:shadow-indigo-500/20 flex items-center justify-center gap-3"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              ripunjoy.buddha@gmail.com
            </a>
            <a
              href="https://linkedin.com/in/ripunjoy-buddha"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 light-card rounded-xl font-medium text-gray-700 hover:text-indigo-600 transition-all duration-200 flex items-center justify-center gap-3"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn Profile
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-gray-200 relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-mono text-sm text-gray-400">
            © 2024 Ripunjoy Buddha. Built with Next.js
          </p>
          <p className="text-sm text-gray-400">Ottawa, ON, Canada</p>
        </div>
      </footer>
    </div>
  );
}
