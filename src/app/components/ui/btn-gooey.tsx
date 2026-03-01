"use client";

import { useId } from "react";

// ─── SVG path shapes ────────────────────────────────────────────────────────

/** Resting pill / rounded-rect shape */
const REST =
  "M 90 210 C 90 180 90 150 150 150 C 150 150 180 150 180 150 C 180 150 300 150 300 150 C 300 150 330 150 330 150 C 390 150 390 180 390 210 C 390 240 390 270 330 270 C 330 270 300 270 300 270 C 300 270 180 270 180 270 C 180 270 150 270 150 270 C 90 270 90 240 90 210";

/** Blob keyframes – intentionally asymmetric for an organic feel */
const BLOB_25 =
  "M 90 210 C 90 180 110 160 130 160 C 160 160 180 140 200 130 C 230 120 270 100 290 140 C 310 170 340 100 360 140 C 370 160 390 180 390 210 C 390 240 380 290 350 280 C 330 270 300 280 280 290 C 260 300 230 300 220 290 C 200 270 160 310 140 280 C 130 260 90 240 90 210";

const BLOB_50 =
  "M 90 210 C 90 180 100 150 120 130 C 150 100 180 140 200 130 C 230 120 270 100 290 140 C 300 160 330 130 360 140 C 390 150 390 180 390 210 C 390 240 380 300 350 280 C 330 270 320 230 280 260 C 260 280 220 310 200 290 C 180 270 160 280 140 280 C 110 280 90 240 90 210";

const BLOB_75 =
  "M 90 210 C 90 180 110 180 130 170 C 150 160 170 130 200 130 C 240 130 260 150 290 140 C 310 130 340 120 360 140 C 380 160 390 180 390 210 C 390 240 380 260 350 270 C 320 280 290 270 270 260 C 240 250 230 280 210 290 C 180 310 130 300 110 280 C 90 260 90 240 90 210";

// ─── Component ───────────────────────────────────────────────────────────────

export interface GooeyButtonProps {
  /** Button label */
  label: string;
  /** Navigate on click */
  href?: string;
  onClick?: () => void;
  /** Blob fill color (default: indigo #6366f1) */
  fill?: string;
  /** Label text color (default: white) */
  textFill?: string;
  /** Font size in SVG coordinate units (default: 42) */
  fontSize?: number;
  /** CSS width of the rendered element (default: clamp(9rem, 35vw, 12.5rem)) */
  width?: string | number;
  /** Open href in new tab */
  newTab?: boolean;
  /** Always animate the blob (default: false — animates only on hover) */
  animate?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export default function GooweyButton({
  label,
  href,
  onClick,
  fill = "#6366f1",
  textFill = "#ffffff",
  fontSize = 32,
  width = "clamp(12rem, 38vw, 14rem)",
  newTab = false,
  animate = false,
  className = "",
  style,
}: GooeyButtonProps) {
  // Unique ids so multiple instances on the same page don't clash
  const uid = useId().replace(/:/g, "");
  const animName = `gm-${uid}`;
  const svgClass = `gb-${uid}`;
  const pathClass = `gp-${uid}`;

  const widthCss = typeof width === "number" ? `${width}px` : width;
  // Semi-transparent glow that matches the fill color
  const glow = `${fill}88`;

  const svg = (
    <svg
      className={`${svgClass}${className ? ` ${className}` : ""}`}
      viewBox="45 100 400 220"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block", width: widthCss, ...style }}
      onClick={href ? undefined : onClick}
      role={!href && onClick ? "button" : undefined}
      aria-label={label}
    >
      <defs>
        <style>{`
          @keyframes ${animName} {
            0%,100% { d: path("${REST}");    }
            25%     { d: path("${BLOB_25}"); }
            50%     { d: path("${BLOB_50}"); }
            75%     { d: path("${BLOB_75}"); }
          }

          .${svgClass} {
            cursor: pointer;
            overflow: visible;
            transition: filter .25s ease;
          }

          /* Glow on hover */
          .${svgClass}:hover {
            filter: drop-shadow(0 0 20px ${glow});
          }

          /* Blob morphing */
          ${animate
            ? `.${pathClass} { animation: ${animName} 2s cubic-bezier(.45, 0, .55, 1) infinite; }`
            : `.${svgClass}:hover .${pathClass} { animation: ${animName} 2s cubic-bezier(.45, 0, .55, 1) infinite; }`
          }

          /* Slight press feedback */
          .${svgClass}:active .${pathClass} {
            transform: scale(.96);
            transform-box: fill-box;
            transform-origin: center;
          }
        `}</style>
      </defs>

      {/* The morphing blob */}
      <path className={pathClass} d={REST} fill={fill} />

      {/* Centered label */}
      <text
        x="240"
        y="210"
        textAnchor="middle"
        dominantBaseline="middle"
        fill={textFill}
        style={{
          fontSize: `${fontSize}px`,
          fontFamily: "inherit",
          fontWeight: 500,
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        {label}
      </text>
    </svg>
  );

  if (href) {
    return (
      <a
        href={href}
        target={newTab ? "_blank" : undefined}
        rel={newTab ? "noopener noreferrer" : undefined}
        onClick={onClick}
        style={{ display: "inline-block", textDecoration: "none" }}
      >
        {svg}
      </a>
    );
  }

  return svg;
}
