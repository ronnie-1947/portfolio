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
        type: "youtube",
        videoId: "4-uFQcHCV30",
        title: "Product demo — AI Clinical Scribe walkthrough",
      },
      {
        type: "image",
        src: "https://res.cloudinary.com/kolart/image/upload/v1785092977/ai_scribe-rec_jyajoz.png",
        alt: "Live consultation recording screen with real-time transcript",
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
  {
    id: "spotify-clone",
    title: "Spotify Clone",
    category: "Full-Stack",
    tagline:
      "A Spotify Clone built with React that logs in with a real Spotify account and pulls in the user's own playlists.",
    description: [
      "A Spotify Clone built with React and Next.js that authenticates against a real Spotify account. Once logged in, it automatically pulls the user's own playlists straight from their Spotify library instead of relying on mock data.",
      "It also supports searching Spotify's catalog for favorite artists and bands, surfacing results the same way the official client would.",
      "The frontend is built with React and styled with Sass, backed by a Node.js server that exposes a RESTful API layer for talking to the Spotify Web API. The app is deployed on Vercel.",
    ],
    cover:
      "https://res.cloudinary.com/kolart/image/upload/v1784670530/portfolio/spotify_1_y4c7r3.png",
    media: [
      {
        type: "youtube",
        videoId: "Jq8ueH-fwnU",
        title: "Product demo — Spotify Clone walkthrough",
      },
      {
        type: "image",
        src: "https://res.cloudinary.com/kolart/image/upload/v1784670530/portfolio/spotify_1_y4c7r3.png",
        alt: "Spotify Clone main view showing the logged-in user's playlists",
      },
      {
        type: "image",
        src: "https://res.cloudinary.com/kolart/image/upload/v1784670530/portfolio/spotify_3_eudfly.png",
        alt: "Spotify Clone search results for an artist",
      },
      {
        type: "image",
        src: "https://res.cloudinary.com/kolart/image/upload/v1784670531/portfolio/spotify_4_ud1xmt.jpg",
        alt: "Spotify Clone playlist detail view",
      },
    ],
    tech: ["React", "Next.js", "Node.js", "RESTful API", "JavaScript", "Sass"],
    links: {
      live: "https://spotify-clone-hyuql1cmq-ronnie-1947.vercel.app",
      github: "https://github.com/ronnie-1947/spotify-clone",
    },
    highlight: "Live demo available",
  },
  {
    id: "tvguestpert",
    title: "TVGuestpert",
    category: "Full-Stack",
    tagline:
      "Full-stack platform where TV guest experts showcase media appearances, sell their books, and manage paid memberships — live in production.",
    description: [
      "TVGuestpert is a production web application built around TV guest experts — authors, entrepreneurs and specialists who appear on network segments. The homepage showcases a guest's recent media placement alongside sign-up paths for producers/bookers and for new guest experts joining the platform.",
      "The platform bundles several product surfaces into one app: an e-commerce shop where guest experts sell their books directly (with per-title pricing and an Amazon buy link), a blogging system, portfolio pages, and monthly/yearly paid memberships. A CMS lets users and admins track payments, edit profiles, and update UI content, while session-limited login protects accounts.",
      "The backend is built on Node.js and Express with MongoDB for storage, exposed through a RESTful API, and styled with Sass on the frontend. Admin access sits behind a dedicated Identity and Access Management system for authorization, and the app is deployed on a Linux server behind NGINX.",
    ],
    cover:
      "https://res.cloudinary.com/kolart/image/upload/v1784670545/portfolio/tvg_main_ulkrfr.jpg",
    media: [
      {
        type: "image",
        src: "https://res.cloudinary.com/kolart/image/upload/v1784670545/portfolio/tvg_main_ulkrfr.jpg",
        alt: "TVGuestpert homepage highlighting a guest expert's TV news segment appearance",
      },
      {
        type: "youtube",
        videoId: "vuPrMAGYu2c",
        title: "Product demo — TVGuestpert walkthrough",
      },
      {
        type: "image",
        src: "https://res.cloudinary.com/kolart/image/upload/v1784670530/portfolio/tvg_book_pvos25.png",
        alt: "Guest expert's book listing page in the platform's e-commerce shop",
      },
      {
        type: "image",
        src: "https://res.cloudinary.com/kolart/image/upload/v1784670558/portfolio/tvg_login_nfwm6t.png",
        alt: "Login screen with a session-timeout security notice",
      },
      {
        type: "image",
        src: "https://res.cloudinary.com/kolart/image/upload/v1784670544/portfolio/tvg_shop_gucyjx.png",
        alt: "E-commerce product page for a guest expert's book with price and Buy on Amazon button",
      },
    ],
    tech: [
      "Node.js",
      "Express",
      "MongoDB",
      "RESTful API",
      "Sass",
      "JavaScript",
      "HTML",
      "NGINX",
      "Linux",
      "Git",
    ],
    links: {
      live: "https://www.tvguestpert.com",
    },
    highlight: "In production",
  },
  {
    id: "happy-haul",
    title: "HappyHaul",
    category: "Frontend",
    tagline:
      "Marketing site for an Ottawa moving company, built to load instantly and convert visitors into booked jobs.",
    description: [
      "HappyHaul is the public-facing site for a small moving and hauling business in Ottawa, currently live in production. It presents services, service areas and a clear path to get a quote, built to feel fast and trustworthy on any device.",
      "The site is a Next.js app rendered with static site generation, so every page is pre-built and served instantly with no server round-trip on request. Tailwind CSS handles styling and Redux manages shared UI state across the booking/quote flow.",
    ],
    cover:
      "https://res.cloudinary.com/kolart/image/upload/v1785093162/happy-haul-1_utluvd.png",
    media: [
      {
        type: "image",
        src: "https://res.cloudinary.com/kolart/image/upload/v1785093162/happy-haul-1_utluvd.png",
        alt: "HappyHaul homepage hero section",
      },
      {
        type: "image",
        src: "https://res.cloudinary.com/kolart/image/upload/v1785093153/happy-haul-2_cr8wi5.png",
        alt: "HappyHaul services overview section",
      },
      {
        type: "image",
        src: "https://res.cloudinary.com/kolart/image/upload/v1785093162/happy-haul-3_yebber.png",
        alt: "HappyHaul page showing service details",
      },
      {
        type: "image",
        src: "https://res.cloudinary.com/kolart/image/upload/v1785093161/happy-haul-4_mjt9cp.png",
        alt: "HappyHaul contact / quote request section",
      },
    ],
    tech: ["Next.js", "SSG", "Tailwind CSS", "Redux", "TypeScript"],
    links: {
      live: "https://www.happyhaul.ca",
    },
    highlight: "In production",
  },
  {
    id: "netflix-clone",
    title: "Netflix Clone",
    category: "Frontend",
    tagline:
      "A pixel-for-pixel Netflix UI clone that pulls live trending titles from TMDB and plays their YouTube trailers inline.",
    description: [
      "This project recreates the look and feel of Netflix's browse experience — the hero banner, genre rows like Netflix Originals, Trending Now and Comedy Movies, and hover-driven browsing — but backs it with real data instead of static mockups. Movie listings come from the TMDB API, so the rows stay current with whatever's actually trending.",
      "Selecting a title resolves its trailer on YouTube via the `movie-trailer` package and plays it inline with `react-youtube`, so browsing feels closer to the real product than a static gallery would. The frontend is built with Next.js, React and TypeScript, Axios handles the TMDB requests, and Sass handles styling.",
      "It's a small, self-contained demo built to demonstrate front-end UI/UX skills — matching Netflix's layout and interaction details closely rather than building out account or streaming functionality.",
    ],
    cover:
      "https://res.cloudinary.com/kolart/image/upload/v1784670505/portfolio/Netflix_main_jtummx.png",
    media: [
      {
        type: "image",
        src: "https://res.cloudinary.com/kolart/image/upload/v1784670505/portfolio/Netflix_main_jtummx.png",
        alt: "Netflix Clone hero banner for a featured title with Play and My List buttons above the Netflix Originals row",
      },
      {
        type: "youtube",
        videoId: "Tv1x5UjoyGk",
        title: "Product demo — Netflix Clone walkthrough",
      },
      {
        type: "image",
        src: "https://res.cloudinary.com/kolart/image/upload/v1784670505/portfolio/Netflix_1_tuzaua.png",
        alt: "Netflix Clone browse view showing the Netflix Originals and Trending Now title rows",
      },
      {
        type: "image",
        src: "https://res.cloudinary.com/kolart/image/upload/v1784670505/portfolio/Netflix_2_kp8mek.png",
        alt: "Netflix Clone with an inline YouTube trailer playing above the Comedy Movies row",
      },
    ],
    tech: [
      "Next.js",
      "React",
      "TypeScript",
      "Axios",
      "TMDB API",
      "react-youtube",
      "Sass",
    ],
    links: {
      live: "https://netflix-clone-eight-lime.vercel.app/",
      github: "https://github.com/ronnie-1947/netflix_clone",
    },
    highlight: "Live demo available",
  },
  {
    id: "pinterest-clone",
    title: "Pinterest Clone",
    category: "Full-Stack",
    tagline:
      "A Pinterest-style photo discovery app with a responsive masonry grid, keyword search, and a full-screen pin viewer.",
    description: [
      "A Pinterest-style photo viewer that recreates the core browsing experience of Pinterest: a responsive masonry grid of photo cards on the home feed, a search bar for finding pins by keyword (searching \"trip\", for example, surfaces a grid of travel photography), and a full-screen lightbox that opens a selected pin over the dimmed grid behind it.",
      "The frontend is built with React and styled with Sass to get the staggered, variable-height card layout right, backed by a Node.js server that exposes a RESTful API for fetching and searching photo data.",
      "The app is deployed on Netlify as a live prototype focused on getting the masonry layout and browsing interactions right.",
    ],
    cover:
      "https://res.cloudinary.com/kolart/image/upload/v1784671482/portfolio/pintrest_1_yin1ca.png",
    media: [
      {
        type: "image",
        src: "https://res.cloudinary.com/kolart/image/upload/v1784671482/portfolio/pintrest_1_yin1ca.png",
        alt: "Pinterest Clone home feed showing a responsive masonry grid of photo pins",
      },
      {
        type: "youtube",
        videoId: "9029CyPL1z0",
        title: "Product demo — Pinterest Clone walkthrough",
      },
      {
        type: "image",
        src: "https://res.cloudinary.com/kolart/image/upload/v1784671480/portfolio/pinterest_2_zqgrhd.png",
        alt: "Pinterest Clone full-screen pin viewer showing a photo of a person holding a red smoke flare, overlaid on the dimmed grid behind it",
      },
      {
        type: "image",
        src: "https://res.cloudinary.com/kolart/image/upload/v1784671481/portfolio/pinterest_3_ruggqi.png",
        alt: "Pinterest Clone search results for \"trip\" showing a masonry grid of travel photography",
      },
    ],
    tech: ["React", "JavaScript", "Node.js", "RESTful API", "Sass", "Git"],
    links: {
      live: "https://ripunjoypintrestprototype.netlify.app",
      github: "https://github.com/ronnie-1947/pinterest-clone",
    },
    highlight: "Live demo available",
  },
  {
    id: "blockchain-iam",
    title: "Decentralized IAM & Passwordless Auth",
    category: "Research",
    tagline:
      "A blockchain-based identity system where users log in without passwords — proving wallet ownership by decrypting a cryptographic challenge — and grant or revoke access to their own encrypted data.",
    description: [
      "A University of Guelph research project (with Shivam Baikerikar) that reimagines identity and access management without a central authority. Instead of storing everyone's identity data in one breach-prone repository, each user controls their own identity through a blockchain wallet, and a Public Key Infrastructure (PKI) replaces passwords entirely. The accompanying paper motivates the design, surveys prior blockchain-IAM work, and walks through the authentication and data-sharing protocols.",
      "The system is built from four cooperating apps: a user wallet app, a third-party relying-party app (the University of Guelph, in the demo), a Node.js/Express backend that acts as the communication hub over REST and a WebSocket relay, and an Ethereum smart contract deployed to a local Ganache chain via Truffle. Signing up derives a wallet address, private key and public key from a mnemonic phrase; only the address-to-public-key mapping lives on-chain (User.sol), while sensitive PII is encrypted client-side with AES and kept in the backend's off-chain vault — never leaving the browser in plaintext.",
      "Two protocols carry the whole experience. Passwordless login is a challenge-response: the relying party fetches the user's public key, encrypts a one-time code with it (RSA-OAEP), and relays it to the wallet, which decrypts it with the private key to prove ownership — no password ever stored or sent. Data sharing is consent-driven: every request names a purpose and expiry, the user is prompted to accept or revoke, and data is only ever decrypted with the user's own key. It's an educational prototype meant to run locally against Ganache, demonstrating the architecture rather than shipping as a hardened product.",
    ],
    cover:
      "https://res.cloudinary.com/kolart/image/upload/v1785103243/portfolio/blockchain-iam-architecture_sxovty.png",
    media: [
      {
        type: "image",
        src: "https://res.cloudinary.com/kolart/image/upload/v1785103243/portfolio/blockchain-iam-architecture_sxovty.png",
        alt: "System architecture: user wallet app and third-party app connected through a Node/Express backend hub to an Ethereum smart contract on Ganache",
      },
      {
        type: "image",
        src: "https://res.cloudinary.com/kolart/image/upload/v1785103242/portfolio/blockchain-iam-login-flow_ab3hfw.png",
        alt: "Passwordless login flow: third-party encrypts a one-time code with the user's public key, the wallet decrypts it with the private key to authenticate",
      },
      {
        type: "image",
        src: "https://res.cloudinary.com/kolart/image/upload/v1785103243/portfolio/blockchain-iam-consent-flow_k8s73y.png",
        alt: "Consent-driven data-sharing flow: request with purpose and expiry, user accept/revoke prompt, and AES-GCM client-side encryption of sensitive fields",
      },
    ],
    tech: [
      "Solidity",
      "Truffle",
      "Ganache",
      "Web3.js",
      "Ethereum",
      "Node.js",
      "Express",
      "WebSocket",
      "React",
      "RSA-OAEP",
      "AES-GCM",
      "PKI",
    ],
    links: {
      github: "https://github.com/ronnie-1947/blockchain-auth-iam",
      paper:
        "https://github.com/ronnie-1947/blockchain-auth-iam/blob/main/public/blockchain-iam-paper.pdf",
    },
    highlight: "Educational demo",
  },
  {
    id: "soar-analysis",
    title: "Streamlining Security: An Analysis of SOAR Implementations",
    category: "Research",
    tagline:
      "A research paper on how Security Orchestration, Automation, and Response (SOAR) platforms cut alert fatigue and speed up incident response in modern SOCs.",
    description: [
      "A University of Guelph research paper (co-authored with Shivam Baikerikar and Fatemeh Khodaparast) examining Security Orchestration, Automation, and Response (SOAR) as an approach to managing cybersecurity incidents. It frames the core problem facing modern Security Operations Centers — analysts drowning in alerts from firewalls, IDS/IPS, endpoint, email, and threat-intel tools — and the alert fatigue, delayed response, and missed incidents that follow.",
      "Drawing on academic literature, industry surveys, and case studies, the paper maps where SOAR fits into the SIEM-driven SOC workflow and breaks down what can actually be automated across the incident lifecycle: alert assignment, information gathering, enrichment, analysis, user interaction, response, and lessons-learned. It walks through concrete playbook use-cases — detonating a suspicious URL via VirusTotal, malware investigation and response, and phishing triage — and reports resolution times and the alert types teams face most (phishing 74%, malware 56%, endpoint 53%).",
      "The full paper is presented as a self-contained, readable web version rather than a PDF, so it can be read directly in the browser on any device.",
    ],
    cover:
      "https://res.cloudinary.com/kolart/image/upload/v1785106805/SOAR-1_zslp3u.png",
    media: [
      {
        type: "image",
        src: "https://res.cloudinary.com/kolart/image/upload/v1785106805/SOAR-1_zslp3u.png",
        alt: "Infographic — the challenge: multiple security tools flooding analysts with alerts, causing alert fatigue, time pressure, and delayed response",
      },
      {
        type: "image",
        src: "https://res.cloudinary.com/kolart/image/upload/v1785106802/SOAR-2_noiisp.png",
        alt: "Infographic — the SOAR platform taking in data sources and orchestrating, automating, and responding to produce prioritized alerts and enriched context",
      },
      {
        type: "image",
        src: "https://res.cloudinary.com/kolart/image/upload/v1785106804/SOAR-3_r1rlrj.png",
        alt: "Infographic — the SOAR workflow from alert to resolution across detect, analyze & enrich, triage & decide, respond, and learn & improve, with common playbooks",
      },
      {
        type: "image",
        src: "https://res.cloudinary.com/kolart/image/upload/v1785106801/SOAR-4_r8refp.png",
        alt: "Infographic — impact of SOAR on security operations alongside a bar chart of common alerts faced by teams, led by phishing at 74%",
      },
    ],
    tech: [
      "SOAR",
      "SIEM",
      "SOC",
      "Incident Response",
      "Security Automation",
      "Threat Intelligence",
    ],
    links: {
      paper: "/projects/soar-paper.html",
    },
    highlight: "Web-readable paper",
  },
  {
    id: "federated-learning-dp",
    title: "Secure Federated Learning with Differential Privacy",
    category: "Research",
    tagline:
      "A federated learning system where clients train on their own data and only noisy, differentially private weight updates ever reach the server — raw records never leave the device.",
    description: [
      "A University of Guelph cybersecurity project (CIS*6560, under Prof. Rozita Dara) that pairs federated learning with differential privacy to train a shared model without pooling anyone's data. Centralizing training data creates one high-value target — a single breach exposes every contributor and drags the store under regimes like GDPR and HIPAA. Federated learning removes that target by keeping data on the device, but it isn't enough on its own: trained models memorize, and an attacker studying gradients or outputs can still infer facts about the training set. The paper works through four concrete attack surfaces — data breaches, membership inference, model inversion, and linkage attacks — and shows which of the two techniques answers each.",
      "The implementation is a PyTorch + Flower + Opacus stack trained on MNIST (70,000 handwritten digits) split across simulated clients. Flower's server runs FedAvg, averaging each client's update weighted by how many examples it trained on; Opacus wraps the model, optimizer, and data loader in a PrivacyEngine that clips per-sample gradients (max_grad_norm) and adds calibrated Gaussian noise (noise_multiplier) before anything is shared. The codebase is deliberately split so neither half knows the other exists — model.py knows nothing about Flower, and lib/federated.py knows nothing about MNIST or CNNs — so swapping in a different model or dataset leaves the federated/DP machinery untouched. A run.sh script boots the server and three clients in parallel; each client only ever prints its own logs.",
      "Across four rounds with ten clients, distributed loss fell from 43.68 to 39.62 and accuracy climbed from 4.77% to 11.65% — a healthy trend, but modest numbers the report is explicit about: hardware limits capped how far training could go, and thin documentation for libraries like PySyft meant testing several frameworks before settling on Flower + Opacus. The write-up is presented as a self-contained interactive web report — steppable pipeline and code, a repo-architecture walkthrough, and a live noise slider that shows the privacy/accuracy trade-off — rather than a PDF.",
    ],
    cover:
      "https://res.cloudinary.com/kolart/image/upload/v1785263621/fl_1_i2aoji.png",
    media: [
      {
        type: "image",
        src: "https://res.cloudinary.com/kolart/image/upload/v1785263621/fl_1_i2aoji.png",
        alt: "Infographic — the problem with centralized learning: three hospitals shipping private data into one central server, flagged high risk for data breach, privacy violation, compliance issues, and single point of failure",
      },
      {
        type: "image",
        src: "https://res.cloudinary.com/kolart/image/upload/v1785263620/fl_2_yia0i7.png",
        alt: "Infographic — the federated solution: each hospital trains a local model and sends only encrypted, differentially private updates up to a securely aggregated global model, so data never leaves local sites",
      },
      {
        type: "image",
        src: "https://res.cloudinary.com/kolart/image/upload/v1785263620/fl_3_iethof.png",
        alt: "Infographic — how differential privacy works: noise added to an original update produces a noisy update, with the epsilon privacy-budget guarantee and the resulting privacy, compliance, collaboration, and performance benefits",
      },
    ],
    tech: [
      "Python",
      "PyTorch",
      "Flower",
      "Opacus",
      "Differential Privacy",
      "Federated Learning",
      "FedAvg",
      "CNN",
      "Hydra",
      "MNIST",
    ],
    links: {
      github: "https://github.com/ronnie-1947/federated-learning",
      paper: "/projects/federated-learning-report.html",
    },
    highlight: "Web-readable paper",
  },
];
