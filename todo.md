# TODO — Projects Showcase Page

Goal: Add a new `/projects` page (Upwork-style portfolio grid) showing at least 3 projects.
Cards open a popup (modal) with an image/YouTube carousel, description, tech stack, and links
(live site, GitHub, paper/PDF). Must match the existing site design (dark `#080c18` + indigo/cyan/purple
accents, glass cards, Space Mono labels, existing keyframe animations).

---

## Design decisions (follow these, don't re-decide)

- **New route, not a section**: `src/app/projects/page.tsx`. The home page stays as-is.
- **Page theme**: dark (`bg-[#080c18]`), same fixed gradient orbs as `src/app/page.tsx`, cards use the
  existing `.glass-card` style. Heading style copies the home sections: `font-mono` uppercase indigo
  kicker + big bold title (optionally `.gradient-text` on one word).
- **Architecture**: follow the existing server/client split (see `ExperienceSection.tsx` →
  `client/ExperienceClient.tsx`). Server components only type props and delegate; all interactivity
  (filters, modal, carousel) lives under `src/app/components/client/`.
- **Data-driven**: all project content lives in `src/app/config/portfolio.ts` as typed data. Components
  never hardcode project content.
- **No new dependencies.** Carousel and modal are hand-rolled (the site has no UI library; keep it that way).
- **YouTube**: never autoload iframes. Render a thumbnail "facade" (`https://i.ytimg.com/vi/<id>/hqdefault.jpg`)
  with a play button; swap in the iframe embed (`https://www.youtube-nocookie.com/embed/<id>?autoplay=1`)
  only on click.

---

## Step 1 — Data model + seed content (`src/app/config/portfolio.ts`)

Add exported types and a `projects` array:

```ts
export type ProjectMedia =
  | { type: "image"; src: string; alt: string }
  | { type: "youtube"; videoId: string; title: string };

export type ProjectLinks = {
  live?: string;      // running site
  github?: string;    // code reference (some projects are repo-only: github set, live omitted)
  paper?: string;     // external URL — GitHub blob URL (renders in GitHub's PDF viewer) or raw.githubusercontent.com
};

export type Project = {
  id: string;                       // slug, e.g. "clinic-scribe"
  title: string;
  category: "Frontend" | "Backend" | "Full-Stack" | "Research";
  tagline: string;                  // one-liner for the card
  description: string[];            // paragraphs for the modal
  cover: string;                    // card image (16:9) — full Cloudinary delivery URL
  media: ProjectMedia[];            // carousel content (images + youtube mixed)
  tech: string[];                   // tag chips
  links: ProjectLinks;
  highlight?: string;               // optional metric/badge, e.g. "Used by clinics across Canada"
};

export const projects: Project[] = [ /* min 3 entries */ ];
```

Seed with **at least 3 placeholder projects** covering all card shapes so every UI path is exercised:
1. A **frontend/full-stack** project with `live` + `github` links, images + one YouTube video.
2. A **backend-heavy** project with `github` only (no live site), images/architecture diagrams.
3. A **research/backend** project with a `paper` link (no live site).

Use real content where known from the resume data already in this file (e.g. AI scribe work); otherwise
clearly-marked placeholders (`TODO: replace`) so Ripunjoy can fill in real text, Cloudinary URLs, video IDs.

**All media is externally hosted — no local asset files:**
- Images (covers + carousel) live on **Cloudinary**: use full delivery URLs
  (`https://res.cloudinary.com/<cloud-name>/image/upload/...`) directly in `cover` and `media[].src`.
- Videos are on **YouTube**: store only the video ID (the part after `v=` or `youtu.be/`), not the full URL.
- Papers live in **GitHub repos**: `links.paper` is a `blob/main/...pdf` URL (GitHub's viewer) or a
  `raw.githubusercontent.com` URL (direct/inline PDF). No self-hosted PDFs.

## Step 2 — Remote image config (`next.config.ts`)

No `public/projects/` or `public/papers/` folders. Instead, add `images.remotePatterns`:

```ts
images: {
  remotePatterns: [
    { protocol: "https", hostname: "res.cloudinary.com" },
    { protocol: "https", hostname: "i.ytimg.com" }, // only if next/image renders YouTube thumbnails
  ],
}
```

- The `i.ytimg.com` entry is needed **only if** YouTube thumbnails are rendered with `next/image`;
  otherwise use a plain `<img>` for thumbnails and skip that entry.
- Placeholder entries can use Cloudinary's demo cloud or any `res.cloudinary.com` URL so `next/image`
  doesn't 404 and layout can be verified before real URLs are supplied.

## Step 3 — Page route (`src/app/projects/page.tsx`)

Server component:
- `export const metadata = { title: "Projects — Ripunjoy Buddha", description: ... }`.
- Same page shell as home: `min-h-screen bg-[#080c18] text-gray-100 overflow-x-hidden font-sans`
  + the same three fixed gradient-orb divs (copy from `page.tsx`).
- Renders `<Navbar />` (updated in Step 6) and `<ProjectsSection projects={projects} />`.
- Section header matches home sections: kicker `Selected Work`, title `Projects`, plus a short
  subtitle line. Wrap in `animate-fade-in-up`.

## Step 4 — Components

### 4a. `src/app/components/ProjectsSection.tsx` (server, thin)
Types props (`projects: Project[]`), renders `<section id="projects">` wrapper with the header and
delegates the grid to `client/ProjectsClient`.

### 4b. `src/app/components/client/ProjectsClient.tsx` (`"use client"`)
- **Filter tabs**: All / Frontend / Backend / Full-Stack / Research — pill buttons styled like the
  navbar pills (active: `bg-indigo-600 text-white shadow-indigo-500/40`; inactive:
  `text-gray-400 hover:bg-white/10`). Only render tabs for categories that exist in the data.
- **Grid**: responsive `grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6`. Cards animate in with
  the existing `.animate-fade-in-up` pattern and staggered `animationDelay` (same trick as
  `experience-item` / `skill-tag`).
- Holds `selectedProject` state; renders `<ProjectModal>` when set.

### 4c. `src/app/components/client/ProjectCard.tsx`
Upwork-tile style, `glass-card rounded-2xl overflow-hidden` with hover lift:
- Cover image (`next/image`, `fill`, 16:9 wrapper, `object-cover`, slight zoom on hover via
  `group-hover:scale-105 transition-transform`).
- Category badge (top-left over the image, `font-mono text-xs` pill) and a play-icon badge if the
  project has YouTube media.
- Body: title, `tagline` (`line-clamp-2 text-gray-400`), tech chips (reuse `.skill-tag` styling,
  cap at ~4 + "+N more").
- Footer row: small icon links for live / GitHub / paper (inline SVG icons, same stroke style as
  `Navbar.tsx`). These use `stopPropagation` so clicking them doesn't open the modal.
- Whole card is a `button`/clickable div (`cursor-pointer`, `aria-haspopup="dialog"`) → opens modal.

### 4d. `src/app/components/client/ProjectModal.tsx`
- Fixed overlay `z-[60]` (above navbar's z-50): `bg-black/70 backdrop-blur-sm animate-fade-in`;
  panel: `glass-card` on `bg-[#0b1020]` base, `rounded-2xl`, `max-w-3xl w-full max-h-[90vh]
  overflow-y-auto`, entrance via existing `.animate-slide-in-up`.
- Content: `<MediaCarousel media={project.media} />` on top; below it title + category badge +
  optional `highlight`, description paragraphs, full tech chip list, and link buttons —
  "Live Site" (primary indigo button), "GitHub", "Read Paper" (outline buttons); render only the
  links that exist. External links: `target="_blank" rel="noopener noreferrer"`.
- Behavior (all required):
  - close on backdrop click, close (×) button, and `Escape` key;
  - `document.body.style.overflow = "hidden"` while open, restored on cleanup;
  - `role="dialog" aria-modal="true" aria-labelledby` on the title;
  - focus the close button on open, return focus to the card on close.

### 4e. `src/app/components/client/MediaCarousel.tsx`
Hand-rolled, dependency-free:
- Track div with `flex transition-transform duration-500` + `translateX(-index * 100%)`;
  slides `w-full shrink-0` in a 16:9 `overflow-hidden rounded-xl` frame.
- Image slides: `next/image` `fill object-cover`.
- YouTube slides: thumbnail facade + centered play button; on click replace with
  `<iframe src="https://www.youtube-nocookie.com/embed/<id>?autoplay=1" allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen>` filling the frame.
  **When navigating away from a video slide, unmount the iframe** so audio stops.
- Controls: prev/next arrow buttons (hidden when only 1 item), dot indicators (active dot indigo,
  wider), left/right arrow-key support while modal is open, touch swipe via
  `onTouchStart`/`onTouchEnd` delta.

## Step 5 — CSS additions (`src/app/globals.css`)

Reuse existing keyframes (`fadeInUp`, `fadeIn`, `slideInUp`) — do **not** duplicate them. Add only:
- `.project-card` hover treatment (translateY(-0.25rem) + indigo glow shadow, mirroring
  `.light-card:hover` / `.skill-tag:hover` feel but for dark glass cards);
- anything the carousel/modal needs that Tailwind utilities can't express cleanly (keep this minimal —
  prefer Tailwind classes in JSX, matching how the rest of the site is built).

## Step 6 — Navbar cross-page support (`src/app/components/Navbar.tsx`)

Currently hardcoded to same-page `#anchor` scroll-spy. Required changes:
- Add a **Projects** item (briefcase/folder SVG icon, same 24×24 stroke style) after Skills (or after
  Experience — keep order consistent on both nav variants).
- Use `usePathname()` from `next/navigation`:
  - On `/`: section items behave exactly as today (smooth scroll + scroll-spy). Projects item is a
    `next/link` to `/projects`.
  - On `/projects`: section items link to `/#<id>` as normal navigation (no `preventDefault`, no
    scroll-spy), Projects item is highlighted active.
- Keep both desktop (left vertical pill) and mobile (top horizontal pill) variants working; verify the
  mobile pill still fits with 6 items (if cramped, reduce gap/padding slightly).
- No visual redesign — same classes, same active/inactive styles.

## Step 7 — Verify

1. `npm run lint` — clean.
2. `npm run build` — compiles; `/projects` is statically generated.
3. `npm run dev`, manually check:
   - `/projects` renders ≥3 cards; filters work; empty-filter state never occurs (tabs derived from data).
   - Card click → modal opens; carousel arrows/dots/swipe/keyboard work; YouTube plays on click and
     stops when the slide changes or modal closes; Escape/backdrop/× all close; background doesn't scroll
     while modal is open; focus returns to the card.
   - Link icons on cards open external URLs without opening the modal.
   - Navbar: Projects link works from home; on `/projects` clicking Experience goes to `/#experience`
     and lands on the section; active states correct on both pages.
   - Responsive: 375px (mobile pill nav + 1-col grid), 768px, 1440px. No horizontal overflow.
   - Design consistency: side-by-side with home page — same fonts, orbs, card language, animations.

## Step 8 — Content handoff (user action, list at end of implementation)

After implementation, print/update a checklist of everything Ripunjoy must supply:
- [ ] Real project entries in `projects` array (titles, descriptions, tech, links, YouTube video IDs)
- [ ] Cloudinary delivery URLs for each project's `cover` and carousel `media[].src`
- [ ] GitHub URLs for paper PDFs (`blob/main/...pdf` or `raw.githubusercontent.com`) and repo links
- [ ] Replace every `TODO: replace` placeholder in `portfolio.ts`

---

## File change summary

| File | Action |
|---|---|
| `src/app/config/portfolio.ts` | add `Project` types + `projects` data |
| `src/app/projects/page.tsx` | new route (server) |
| `src/app/components/ProjectsSection.tsx` | new (server, thin wrapper) |
| `src/app/components/client/ProjectsClient.tsx` | new (grid + filters + modal state) |
| `src/app/components/client/ProjectCard.tsx` | new |
| `src/app/components/client/ProjectModal.tsx` | new |
| `src/app/components/client/MediaCarousel.tsx` | new |
| `src/app/components/Navbar.tsx` | add Projects item + cross-page routing |
| `src/app/globals.css` | minimal additions (project-card hover) |
| `next.config.ts` | `images.remotePatterns` for `res.cloudinary.com` (+ `i.ytimg.com` if `next/image` renders YouTube thumbnails) |
