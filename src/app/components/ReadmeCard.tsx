import { GoBook } from "react-icons/go";
import Reveal from "./client/Reveal";

type ReadmeCardProps = {
  owner: string;
  greeting: string;
  reach: string;
  currentWork: { name: string; summary: string };
  coreSkills: string[];
  degree: string;
  university: string;
  email: string;
};

// GitHub-profile-style README closing the Overview band.
export default function ReadmeCard({ owner, greeting, reach, currentWork, coreSkills, degree, university, email }: ReadmeCardProps) {
  return (
    <Reveal className="mt-[clamp(40px,6vw,80px)]">
      <article className="rounded-md border border-line bg-canvas">
        <header className="flex items-center gap-2 rounded-t-md border-b border-line bg-surface px-4 py-3 font-code text-[13px]">
          <GoBook aria-hidden="true" className="size-4 flex-none text-muted" />
          <span className="min-w-0 wrap-anywhere">
            <span className="text-accent">{owner}</span>
            <span className="text-muted"> / </span>
            <span className="font-semibold">README.md</span>
          </span>
        </header>
        <div className="p-[clamp(20px,3vw,32px)]">
          <div className="max-w-[72ch]">
            <h2 className="m-0 mb-4 border-b border-line pb-2.5 text-[clamp(20px,2.2vw,26px)] font-semibold leading-[1.3] tracking-[-0.01em] text-balance">
              {greeting}
            </h2>
            <ul className="m-0 flex list-disc flex-col gap-2 pl-[1.4em] text-base leading-[1.6] text-pretty">
              <li>
                🔭 Currently building <strong>{currentWork.name}</strong>: {currentWork.summary}
              </li>
              <li>🌍 {reach}</li>
              <li>🛡️ Core: {coreSkills.join(" · ")}</li>
              <li>
                🎓 {degree}, {university}
              </li>
              <li>
                📫{" "}
                <a href={`mailto:${email}`} className="text-accent hover:underline">
                  {email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </article>
    </Reveal>
  );
}
