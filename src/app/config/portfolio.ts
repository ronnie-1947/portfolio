export const PROFILE_IMAGE = "/profile.JPG";
export const LINKEDIN_URL = "https://www.linkedin.com/in/ripunjoy-buddha";
export const GITHUB_URL = "https://github.com/ronnie-1947";

export const experiences = [
  {
    id: 1,
    role: "Senior Software & Security Engineer",
    company: "Avaros",
    location: "London, ON",
    period: "Nov 2024 – Present",
    details: [
      "Develop scalable backend services using Go and build modern, responsive frontend interfaces with React, TypeScript",
      "Build AI-powered features for Scribe and EMR systems used by clinics across Canada",
      "Architect secure distributed systems, including firewall setup and AWS hardening",
      "Design compliance-aware healthcare infrastructure",
    ],
    skills: [
      "Go",
      "React",
      "TypeScript",
      "AWS",
      "Security",
      "AI/ML",
      "Healthcare Tech",
    ],
  },
  {
    id: 2,
    role: "Founding Software Engineer",
    company: "Dice Health",
    location: "ON",
    period: "Jun 2024 – Oct 2024",
    details: [
      "Built AI-powered scribe (speech-to-text) for clinical documentation using Next.js, Deepgram, and OpenAI",
      "Architected and deployed full cloud-native system on AWS EKS (Kubernetes)",
      "Developed secure APIs for real-time medical transcription workflows",
    ],
    skills: [
      "Next.js",
      "Deepgram",
      "OpenAI",
      "AWS EKS",
      "Kubernetes",
      "Real-time APIs",
    ],
  },
  {
    id: 3,
    role: "Backend Developer",
    company: "Engaged Inc.",
    location: "Cambridge, ON",
    period: "Nov 2022 – Oct 2023",
    details: [
      "Led backend API development using NodeJS",
      "Migrated PHP services to Node.js, reducing response time by 25%",
      "Improved system performance by 20% through refactoring and optimization",
    ],
    skills: [
      "Node.js",
      "PHP",
      "API Design",
      "Performance Optimization",
      "System Migration",
    ],
  },
  {
    id: 4,
    role: "Software Engineer",
    company: "PT Flokq Spaces",
    location: "Jakarta, Indonesia",
    period: "Oct 2021 – Aug 2022",
    details: [
      "Full-stack developer (Web & React Native) delivering cross-platform features",
      "Reduced technical debt through system migration and modernization",
      "Improved SEO via Next.js optimizations and sitemap generation",
    ],
    skills: ["React Native", "Next.js", "Full-Stack", "SEO", "Cross-platform"],
  },
  {
    id: 5,
    role: "Full Stack Developer & Team Lead",
    company: "Silpkala",
    location: "India",
    period: "Jan 2021 – Sep 2021",
    details: [
      "Led development team for full-stack web applications",
      "Coordinated project deliverables and technical architecture",
    ],
    skills: ["Team Leadership", "Full-Stack", "Project Management"],
  },
  {
    id: 6,
    role: "Full Stack Developer & Project Coordinator",
    company: "TVGuestpert Publishing",
    location: "USA",
    period: "Mar 2020 – Jan 2021",
    details: [
      "Developed and maintained publishing platform features",
      "Coordinated between development and editorial teams",
    ],
    skills: ["Full-Stack", "Publishing Tech", "Project Coordination"],
  },
];

export const skills = {
  "Core Expertise": [
    "Full-Stack Development",
    "Secure System Design",
    "API Architecture (REST, GraphQL)",
    "Cloud-Native Deployment",
    "Web Penetration Testing",
  ],
  Frontend: ["React", "Next.js", "React Native", "Tailwind CSS", "TypeScript"],
  Backend: ["Node.js", "Go", "Express", "Python"],
  Databases: ["PostgreSQL", "MySQL", "MongoDB", "Prisma"],
  "Cloud/DevOps": ["AWS (EC2, EKS, S3, GuardDuty)", "Docker", "Kubernetes"],
  Security: ["OAuth", "Nmap", "Wireshark", "Burp Suite", "OSINT"],
  AI: ["OpenAI API", "Claude API", "AI Agents"],
};

export const primaryEducation = {
  university: "University of Guelph",
  degree: "Master of Cybersecurity & Threat Intelligence",
  year: "2023 – 2024",
  location: "Guelph, Ontario, Canada",
  logo: "/university/guelph-logo.png",
  collageImages: [
    { src: "/university/collage-1.png", alt: "Campus life" },
    { src: "/university/collage-2.jpeg", alt: "Graduation" },
    { src: "/university/collage-5.jpg", alt: "University event" },
    { src: "/university/collage-3.jpeg", alt: "University campus" },
    { src: "/university/collage-4.jpeg", alt: "Student life" },
  ],
};

export const otherEducation = [
  {
    degree: "Cyber Security PG Certificate",
    school: "Durham College",
    year: "2023",
  },
];

export const certifications = [
  { name: "CompTIA Security+ ce", period: "2022–2025" },
  { name: "CCNA", period: "2022–2025" },
];

/* ─── Projects ───────────────────────────────────────────────────────────────
 * All media is externally hosted:
 *   - images  → Cloudinary delivery URLs (https://res.cloudinary.com/<cloud>/image/upload/...)
 *   - videos  → YouTube, store the video ID only (the part after `v=` / `youtu.be/`)
 *   - papers  → GitHub `blob/main/...pdf` or `raw.githubusercontent.com` URLs
 * The Cloudinary URLs below point at Cloudinary's public `demo` cloud so layout can be
 * verified before real assets exist. Replace every `TODO: replace` marker.
 * ------------------------------------------------------------------------- */

export type ProjectMedia =
  | { type: "image"; src: string; alt: string }
  | { type: "youtube"; videoId: string; title: string };

export type ProjectLinks = {
  live?: string; // running site
  github?: string; // code reference (some projects are repo-only: github set, live omitted)
  paper?: string; // external URL — GitHub blob URL or raw.githubusercontent.com
};

export type Project = {
  id: string; // slug, e.g. "clinic-scribe"
  title: string;
  category: "Frontend" | "Backend" | "Full-Stack" | "Research";
  tagline: string; // one-liner for the card
  description: string[]; // paragraphs for the modal
  cover: string; // card image (16:9) — full Cloudinary delivery URL
  media: ProjectMedia[]; // carousel content (images + youtube mixed)
  tech: string[]; // tag chips
  links: ProjectLinks;
  highlight?: string; // optional metric/badge
};

export const projects: Project[] = [
  {
    id: "clinic-scribe",
    title: "AI Clinical Scribe",
    category: "Full-Stack",
    tagline:
      "Ambient AI scribe demo that turns live clinical conversations into structured, reviewable notes.",
    description: [
      "A demonstration app for medical consultation recording and clinical note generation. It captures audio from a consultation, streams it to Deepgram for real-time speech-to-text, and uses an LLM to turn the resulting transcript into a structured clinical note the clinician can review before signing off.",
      "Built with Next.js 14 (App Router) and NextAuth v5, supporting both credential and Google OAuth login. Consultations, transcripts and generated notes are persisted in PostgreSQL via Prisma, with a Redux Toolkit store managing session state on the client and a server-side API proxy keeping provider credentials off the browser.",
      "Users bring their own OpenAI key through a settings screen, and the whole stack — Next.js app plus Postgres — ships as a Docker Compose setup for easy local spin-up.",
    ],
    cover:
      "https://res.cloudinary.com/kolart/image/upload/v1785092977/ai_scribe-rec_jyajoz.png",
    media: [
      {
        type: "image",
        src: "https://res.cloudinary.com/kolart/image/upload/v1785092977/ai_scribe-rec_jyajoz.png",
        alt: "Live consultation recording screen with real-time transcript",
      },
      {
        type: "youtube",
        videoId: "4-uFQcHCV30",
        title: "Product demo — AI Clinical Scribe walkthrough",
      },
      {
        type: "image",
        src: "https://res.cloudinary.com/kolart/image/upload/v1785092976/ai_scribe-login_b3vzwy.png",
        alt: "Login screen with credential and Google OAuth options",
      },
      {
        type: "image",
        src: "https://res.cloudinary.com/kolart/image/upload/v1785092976/ai_scribe-openai-settings_hyxsm3.png",
        alt: "Settings screen for configuring a personal OpenAI API key",
      },
      {
        type: "image",
        src: "https://res.cloudinary.com/kolart/image/upload/v1785092974/ai_scribe-personal-settings_u7vtgh.png",
        alt: "Personal account settings screen",
      },
      {
        type: "image",
        src: "https://res.cloudinary.com/kolart/image/upload/v1785092974/ai_scribe-finish_mdibik.png",
        alt: "Finished consultation with generated structured clinical note",
      },
    ],
    tech: [
      "Next.js",
      "NextAuth",
      "Deepgram",
      "OpenAI",
      "PostgreSQL",
      "Prisma",
      "Redux Toolkit",
      "Tailwind CSS",
      "Docker",
    ],
    links: {
      live: "https://ai-scribe-prototype.vercel.app",
      github: "https://github.com/ronnie-1947/AI-scribe-prototype",
    },
    highlight: "Live demo available",
  },
];
