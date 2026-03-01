import Image from "next/image";
import GooeyButton from "./ui/btn-gooey";
import TypewriterEffect from "./client/TypewriterEffect";
import BgShapes1 from "./ui/bg-shapes-1";
import WaveMask from "./ui/WaveMask";
import { LINKEDIN_URL, GITHUB_URL } from "../config/portfolio";

export default function HeroSection({
  profileImage,
}: {
  profileImage: string;
}) {
  return (
    <section
      id="about"
      className="min-h-dvh flex flex-col items-center justify-center px-6 pt-16 pb-32 sm:pt-20 sm:pb-28 md:pt-24 md:pb-20 relative"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/background.png')", zIndex: 0 }}
      />

      <div className="absolute inset-0 bg-black/85" style={{ zIndex: 1 }} />
      <BgShapes1 />

      <div className="relative mt-8 z-20 text-center space-y-3 sm:space-y-4 lg:space-y-6 animate-fade-in-up max-w-2xl mx-auto w-full">
        {/* Profile avatar with glowing border */}
        <div className="flex justify-center">
          <div className="avatar-glow-wrapper">
            <Image
              src={profileImage}
              alt="Profile"
              width={202}
              height={202}
              sizes="(max-width: 375px) 120px, (max-width: 480px) 150px, 208px"
              className="avatar-photo"
            />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight cursor-default transition-transform duration-200 hover:transform-[skewX(-8deg)_scale(1.05)] inline-block">
          Hi, I&apos;m{" "}
          <span className="bg-linear-to-br from-cyan-300 to-indigo-400 bg-clip-text text-transparent">
            Ripunjoy
          </span>
        </h1>

        <TypewriterEffect />

        <p className="text-gray-100 leading-relaxed max-w-xl mx-auto text-sm sm:text-base md:text-lg">
          5+ years crafting secure, scalable systems. From AI-powered healthcare
          applications to cloud-native architectures, I build software
          that&apos;s both powerful and protected.
        </p>

        <div className="flex flex-row gap-2 justify-center items-center">
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="text-indigo-400 hover:text-indigo-200 transition-all duration-200 hover:scale-110 active:scale-95"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-7 h-7 sm:w-10 sm:h-10"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="text-indigo-400 hover:text-indigo-200 transition-all duration-200 hover:scale-110 active:scale-95"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-7 h-7 sm:w-10 sm:h-10"
            >
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
          </a>
          <GooeyButton href="#experience" label="View my work ->" animate />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 animate-bounce z-20">
        <div className="w-6 h-10 rounded-full border-2 border-gray-600 flex justify-center pt-2">
          <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full" />
        </div>
      </div>

      <WaveMask variant="dark-to-light" />
    </section>
  );
}
