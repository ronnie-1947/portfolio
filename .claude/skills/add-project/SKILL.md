---
name: add-project
description: Add a new project entry to the portfolio's Projects section. Use when the user gives details for a new project to showcase (name, links, images/video, tech, description) and wants it added to the site.
---

# Add Project

Adds a new entry to the `projects` array in `src/app/config/portfolio.ts`, which
drives the Projects section (`ProjectCard` → `ProjectModal` → `MediaCarousel`).
No other files need to change — the UI reads entirely from this config.

## Inputs to gather from the user

Ask for whatever wasn't already given:

- **Name** — project title.
- **What it is / what it does** — enough to write the tagline + description yourself.
- **Live link**, **GitHub repo link**, and/or **paper link** — at least one, but not
  necessarily all three (some projects are repo-only, some are live-only).
- **Images** — Cloudinary delivery URLs (`https://res.cloudinary.com/<cloud>/image/upload/...`).
- **YouTube demo** (optional) — full URL or video ID.
- **Tech stack** — languages/frameworks/infra actually used.
- **Category** — one of `"Frontend" | "Backend" | "Full-Stack" | "Research"`. Infer
  from the description if not stated explicitly.

## Writing the description

- If a GitHub link is provided, fetch the repo README (WebFetch or `gh api
  repos/<owner>/<repo>/readme`) and use it as the primary source for the
  tagline and description — don't just restate the user's one-liner.
- `tagline`: one sentence, shown on the card. Concrete, not marketing fluff.
- `description`: 2–3 paragraphs for the modal — what it does, how it's built
  (architecture/stack choices worth mentioning), and any notable constraint or
  outcome. Match the tone of existing entries in `portfolio.ts` (plain,
  specific, no buzzwords like "leverage" or "seamless").
- Never invent metrics, user counts, or outcomes the user didn't state.

## Building the entry

Append to the `projects` array in `src/app/config/portfolio.ts`, matching the
`Project` type already defined in that file:

```ts
{
  id: "kebab-case-slug",       // derived from the title, must be unique
  title: "Project Name",
  category: "Frontend" | "Backend" | "Full-Stack" | "Research",
  tagline: "...",
  description: ["...", "...", "..."],
  cover: "<first/best image URL>",   // 16:9 card image
  media: [
    // cover image first, then any youtube demo, then the remaining images
    { type: "image", src: "...", alt: "specific, describes what's on screen" },
    { type: "youtube", videoId: "...", title: "Product demo — ..." },
    { type: "image", src: "...", alt: "..." },
  ],
  tech: ["...", "..."],
  links: {
    live: "https://...",     // omit key entirely if not provided
    github: "https://...",
    paper: "https://...",
  },
  highlight: "...",           // optional short badge, e.g. "In production", "Live demo available"
},
```

Rules:
- `id` must be a unique kebab-case slug not already used by another project.
- Every `media[].alt` must be specific (what's actually shown), never a
  generic placeholder — mirror the style of existing entries.
- Only include `links` keys the user actually gave you — don't fabricate a
  `live` or `github` URL.
- If `highlight` isn't obvious from what the user said, ask rather than
  guessing (e.g. via AskUserQuestion) — it's a visible badge, not filler.
- `next.config.ts` already whitelists `res.cloudinary.com` and `i.ytimg.com`
  for `next/image`; if an image is hosted elsewhere, flag that a
  `remotePatterns` entry needs to be added there too.

## After adding

Read back the new object once to confirm it's valid TS (matching commas,
closing brackets) — this file has no test coverage, so a syntax slip only
surfaces at build time. Optionally run `npm run lint`.
