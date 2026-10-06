"use client";

import { useRef, type MouseEvent } from "react";
import { GoGlobe, GoMortarBoard, GoShieldCheck } from "react-icons/go";
import type { Credential } from "../../config/portfolio";
import { useReveal } from "../../lib/useReveal";

const EMBLEMS = {
  "mortar-board": GoMortarBoard,
  "shield-check": GoShieldCheck,
  globe: GoGlobe,
};

type CredentialCoinProps = {
  credential: Credential;
  slot: 1 | 2 | 3; // grid position, see .rb-coins in globals.css
  flipped: boolean;
  finePointer: boolean;
  onFlip: (flipped: boolean) => void;
};

/**
 * A credential as a coin: emblem on the front, issuer and years on the back.
 * Mouse users flip it by hovering; touch and keyboard users tap / press Enter.
 */
export default function CredentialCoin({ credential: c, slot, flipped, finePointer, onFlip }: CredentialCoinProps) {
  const ref = useRef<HTMLDivElement>(null);
  useReveal(ref, slot - 1);
  const Emblem = EMBLEMS[c.emblem];

  const onClick = (e: MouseEvent) => {
    // detail === 0 means the click came from the keyboard.
    if (!finePointer || e.detail === 0) onFlip(!flipped);
  };

  return (
    <div ref={ref} className={`rb-coin-slot-${slot} flex min-w-0 flex-col items-center gap-2.5 pt-2 text-center`}>
      <button
        type="button"
        onClick={onClick}
        onMouseEnter={() => finePointer && onFlip(true)}
        onMouseLeave={() => onFlip(false)}
        onBlur={() => onFlip(false)}
        aria-pressed={flipped}
        aria-label={`${c.title} — ${c.issuer}, ${c.years}. ${flipped ? "Showing details." : "Press to flip."}`}
        className={`rb-coin rb-coin--${c.accent} aspect-square w-full max-w-28 cursor-pointer rounded-full border-0 bg-transparent p-0 [perspective:900px] md:size-[148px] md:max-w-none lg:size-40`}
      >
        <span className="rb-coin-inner">
          <span className="rb-coin-face rb-coin-front">
            <span className="rb-coin-disc">
              <span className="flex flex-col items-center gap-1.5">
                <Emblem aria-hidden="true" className="size-[30px] text-[var(--coin)] md:size-11 lg:size-12" />
                <span className="font-code text-[9px] font-semibold tracking-[0.12em] text-[var(--coin)] md:text-[11px]">{c.short}</span>
              </span>
            </span>
          </span>
          <span className="rb-coin-face rb-coin-back">
            <span className="text-[11px] font-semibold leading-[1.25] text-ink md:text-[13px]">{c.issuer}</span>
            <span className="font-code text-[10px] font-semibold text-[var(--coin)] md:text-xs">{c.years}</span>
            <span className="hidden font-code text-[10px] uppercase tracking-[0.08em] text-muted md:inline">{c.kind}</span>
          </span>
        </span>
      </button>
      <div className="flex max-w-[220px] flex-col items-center gap-0.5">
        <span className="text-[13px] font-semibold leading-[1.3] text-balance md:text-[15px]">{c.title}</span>
        <span className="font-code text-xs text-muted">{c.meta}</span>
      </div>
    </div>
  );
}
