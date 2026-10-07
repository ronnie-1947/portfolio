import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { PROFILE_IMAGE, profile } from "./config/portfolio";
import { SITE_URL } from "./config/site";

// Share card for every route (link previews on LinkedIn, Slack, X, …).
// Rendered at build time by Satori: inline styles only, and colors are the
// .rb-home palette from globals.css written out, since CSS variables don't apply here.

export const alt = `${profile.name} — Software Developer & Security Engineer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BG = "#0d1117";
const LINE = "#30363d";
const INK = "#e6edf3";
const MUTED = "#7d8590";
const GREEN = "#3fb950";
const GRAD = "linear-gradient(90deg, #a371f7 0%, #2f81f7 55%, #56d4dd 100%)";

export default async function Image() {
  const photo = await readFile(join(process.cwd(), "public", PROFILE_IMAGE));
  const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: BG,
          backgroundImage: "radial-gradient(circle at 85% 0%, rgba(47,129,247,0.18), transparent 55%)",
          color: INK,
        }}
      >
        <div style={{ display: "flex", flex: 1, alignItems: "center", gap: 64, paddingBottom: 40 }}>
          <img
            src={photoSrc}
            alt=""
            width={300}
            height={300}
            style={{ borderRadius: 9999, border: `4px solid ${LINE}`, objectFit: "cover", objectPosition: "50% 30%" }}
          />
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ display: "flex", fontSize: 26, color: MUTED }}>{profile.siteHandle}</div>
            <div
              style={{
                display: "flex",
                fontSize: 84,
                fontWeight: 800,
                letterSpacing: "-0.035em",
                lineHeight: 1.05,
                backgroundImage: GRAD,
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              {profile.name}
            </div>
            <div style={{ display: "flex", fontSize: 38, fontWeight: 600 }}>Software Developer & Security Engineer</div>
            <div style={{ display: "flex", fontSize: 26, color: MUTED }}>React · Next.js · Go · AWS · AI</div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: `1px solid ${LINE}`,
            paddingTop: 28,
            fontSize: 26,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 14, height: 14, borderRadius: 9999, background: GREEN }} />
            Canada · US · UK · Europe — open to remote
          </div>
          <div style={{ display: "flex", color: MUTED }}>{new URL(SITE_URL).host}</div>
        </div>
      </div>
    ),
    size,
  );
}
