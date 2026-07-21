# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A personal portfolio site for Ripunjoy Buddha, built with Next.js (App Router), React 19, TypeScript, and Tailwind CSS 4. Single-page site: Hero, Experience, Skills, Education, Contact sections.

## Commands

```bash
npm run dev      # start dev server (Next.js, http://localhost:3000)
npm run build    # production build
npm run start    # serve production build
npm run lint     # eslint (flat config via eslint.config.mjs)
```

There is no test suite configured in this repo.

## Architecture

- App Router single-page app: everything renders from `src/app/page.tsx`, which composes section components in order (Navbar, Hero, Experience, Skills, Education, Contact). There is no routing beyond the one page.
- All page content (work experience, skills, education, certifications, profile links/images) is centralized as typed data in `src/app/config/portfolio.ts`. To update resume/portfolio content, edit that file rather than the components.
- **Server/client split pattern**: most section components (e.g. `ExperienceSection.tsx`) are plain server components that just type their props and delegate rendering to a matching `"use client"` component under `src/app/components/client/` (e.g. `client/ExperienceClient.tsx`). When a section needs interactivity (hover/click state, animation), keep the server component as a thin typed wrapper and put the `"use client"` logic in `components/client/`.
- `src/app/components/ui/` holds small presentational/decorative primitives (gooey buttons, background shapes, wave mask dividers) shared across sections.
- Styling is Tailwind CSS 4 (via `@tailwindcss/postcss`, no `tailwind.config.*`) plus a set of hand-written keyframe animations, glass/light card styles, and section-specific utility classes (timeline, photo collage grid, avatar glow) defined directly in `src/app/globals.css`. Reuse those existing classes/animations for new UI rather than re-implementing similar effects inline.
- Sections alternate dark (`bg-[#080c18]`, page default) and light (`bg-white`) backgrounds; components that support both take a `theme: "dark" | "light"` prop (see `ExperienceSection`) rather than reading a global theme context.
- Path alias `@/*` maps to `src/*` (see `tsconfig.json`).
- Fonts (Geist via `next/font/google`, plus DM Sans/Space Mono via Google Fonts import in `globals.css`) and the `<html>/<body>` shell live in `src/app/layout.tsx`.
