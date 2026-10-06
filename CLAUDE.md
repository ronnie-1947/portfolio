# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A personal portfolio site for Ripunjoy Buddha, built with Next.js (App Router), React 19, TypeScript, and Tailwind CSS 4. Two routes: the home page (`/`, a GitHub-profile-style single page: Overview, Experience, Pinned projects, Skills, Academic background, Contact) and the project showcase (`/projects`).

## Commands

```bash
npm run dev      # start dev server (Next.js, http://localhost:3000)
npm run build    # production build
npm run start    # serve production build
npm run lint     # eslint (flat config via eslint.config.mjs)
```

There is no test suite configured in this repo.

## Architecture

- `src/app/page.tsx` composes the home page in order: the shared `Navbar` side nav (same component as `/projects`; its phone top pill is turned off with `mobileNav={false}` because the home header covers phones), `SiteHeader` (sticky header + command palette + phone menu), `OverviewSection`, `ExperienceSection`, `PinnedSection`, `SkillsSection`, `EducationSection`, `ContactSection`, `SiteFooter`. `src/app/projects/page.tsx` is the separate project showcase (still on the older `Navbar` / `ProjectsSection` components and styles).
- All page content (profile, work experience, skills, education, credentials, projects, globe stops, pinned order, links) is centralized as typed data in `src/app/config/portfolio.ts`. To update resume/portfolio content, edit that file rather than the components.
- **Server/client split pattern**: section components in `src/app/components/` are server components that type their props, shape the data and delegate interactivity to `"use client"` components under `src/app/components/client/` (e.g. `ExperienceSection.tsx` → `client/CommitGraph.tsx`). Keep `"use client"` on the smallest piece that needs it; static markup stays in server components, and client wrappers (`TiltCard`, `Reveal`) take server-rendered children.
- `src/app/components/ui/` holds small shared primitives (`Container`, `SectionHeading`, `Topic`, `Label`, `Counter`, `Kbd`, CSS-only `Tooltip`, `BrandMark`, `buttonStyles.ts`, a few Octicons missing from `react-icons/go`). Icons come from `react-icons/go` (GitHub Octicons).
- `src/app/lib/` holds framework-free helpers and hooks: `useMediaQuery.ts`, `sections.ts` (section ids, scroll-to-section), `useScrollSpy.ts`, `useReveal.ts`, `focusTrap.ts`, `useCopyText.ts`, `skillCode.ts`, `careerGlobe.ts` (canvas globe renderer), `cloudinary.ts`.

## Styling and theming

- Tailwind CSS 4 (via `@tailwindcss/postcss`, no `tailwind.config.*`). Tokens, custom variants and section-specific classes live in `src/app/globals.css`. Home-page classes are prefixed `rb-` and sit in the "Home v2" block at the end of the file; everything above it serves `/projects`.
- The home page is dark only. Its palette is defined once on `.rb-home` in `globals.css`; components use the semantic tokens (`bg-canvas`, `bg-surface`, `border-line`, `text-ink`, `text-muted`, `text-accent`, `bg-topic`, …), never raw hex. `data-variant="surface"` (Pinned band) shifts to the darker canvas, and `data-fade="surface"` on the band below fades in from it.
- Custom variants: `fine:` / `coarse:` (mouse vs touch). Extra breakpoints: `xs` 360px, `desk` 1440px, `3xl` 1920px. Layout tiers follow the design: phone < 768, tablet 768–1023, laptop 1024–1439, desktop ≥ 1440.
- Rules in `globals.css` outside `@layer` beat Tailwind utilities, so don't put a utility on an element to override an `rb-` class property — change the class instead. `buttonClass()` takes display as its own argument for the same reason.
- Path alias `@/*` maps to `src/*` (see `tsconfig.json`).
- Fonts and the `<html>/<body>` shell live in `src/app/layout.tsx`: Mona Sans (`font-display`) and Monaspace Neon (`font-code`, self-hosted from `@fontsource/monaspace-neon`) for the home page; Geist plus DM Sans/Space Mono (Google Fonts import in `globals.css`) for `/projects`.
- The globe's land mask is the static `public/globe/land-dots.json`; regenerate it with `scripts/generate-globe-dots.mjs` (instructions in the file).
