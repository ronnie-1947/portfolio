import Image from "next/image";
import { GoMortarBoard } from "react-icons/go";
import Label from "./ui/Label";

type DegreeCardProps = {
  university: string;
  location: string;
  logo: string;
  year: string;
  degree: string;
  summary: string;
};

// Primary degree, styled as a GitHub "Box".
export default function DegreeCard({ university, location, logo, year, degree, summary }: DegreeCardProps) {
  return (
    <article className="flex w-full min-w-0 flex-col overflow-hidden rounded-md border border-line bg-canvas">
      <header className="flex items-center gap-3 border-b border-line bg-surface px-4 py-3.5">
        <span className="grid size-11 flex-none place-items-center overflow-hidden rounded-md border border-line bg-white">
          <Image src={logo} alt={`${university} logo`} width={36} height={36} className="size-9 object-contain" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="text-[15px] font-semibold leading-[1.3]">{university}</div>
          <div className="text-[13px] text-muted">{location}</div>
        </div>
        <span className="flex-none whitespace-nowrap font-code text-xs text-muted">{year}</span>
      </header>
      <div className="flex flex-1 flex-col justify-center gap-3 p-[clamp(20px,2.4vw,32px)]">
        <h3 className="m-0 text-[clamp(22px,2vw,28px)] font-bold leading-[1.2] tracking-[-0.02em] text-balance">{degree}</h3>
        <p className="m-0 max-w-[60ch] text-base leading-[1.6] text-muted text-pretty">{summary}</p>
      </div>
      <footer className="flex items-center gap-2 border-t border-line px-4 py-3">
        <GoMortarBoard aria-hidden="true" className="size-4 flex-none text-done" />
        <Label tone="done">Degree</Label>
      </footer>
    </article>
  );
}
