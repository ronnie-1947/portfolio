"use client";

import { useState } from "react";
import CredentialCoin from "./CredentialCoin";
import type { Credential } from "../../config/portfolio";
import { useFinePointer } from "../../lib/useMediaQuery";

type CredentialBadgesProps = {
  credentials: Credential[]; // one "degree" then two "certification" entries
  className?: string;
};

const HEADING = "m-0 self-end border-b border-line pb-2 font-code text-xs font-semibold text-muted";

// Other degrees and certifications as flip badges (one flipped at a time).
export default function CredentialBadges({ credentials, className = "" }: CredentialBadgesProps) {
  const [flipped, setFlipped] = useState<string | null>(null);
  const finePointer = useFinePointer();

  return (
    <div className={className}>
      <div className="rb-coins">
        <h3 className={`rb-coins-h1 ${HEADING}`}>Other Degrees</h3>
        <h3 className={`rb-coins-h2 ${HEADING}`}>Professional · Certifications</h3>
        {credentials.slice(0, 3).map((c, i) => (
          <CredentialCoin
            key={c.id}
            credential={c}
            slot={(i + 1) as 1 | 2 | 3}
            flipped={flipped === c.id}
            finePointer={finePointer}
            onFlip={(on) => setFlipped((cur) => (on ? c.id : cur === c.id ? null : cur))}
          />
        ))}
      </div>
      <p className="m-0 font-code text-xs text-muted">
        <span className="coarse:hidden">Hover a badge, or focus it and press Enter, to flip</span>
        <span className="hidden coarse:inline">Tap a badge to flip</span>
      </p>
    </div>
  );
}
