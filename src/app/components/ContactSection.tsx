import { GoCodeSquare, GoDownload, GoMail } from "react-icons/go";
import { EMAIL, GITHUB_URL, LINKEDIN_URL, RESUME_URL } from "../config/portfolio";
import Container from "./ui/Container";
import { buttonClass } from "./ui/buttonStyles";
import IssueForm from "./client/IssueForm";
import Reveal from "./client/Reveal";
import TerminalCard from "./client/TerminalCard";

type ContactSectionProps = {
  owner: string; // repo-style owner name, e.g. "ripunjoy-buddha"
  remote: string; // git remote name in the terminal, e.g. "ripunjoy"
};

const LINK = buttonClass("secondary", "lg");

// 06 Contact — "open an issue" form, terminal card and contact links.
export default function ContactSection({ owner, remote }: ContactSectionProps) {
  return (
    <section
      id="contact"
      data-band="contact"
      className="rb-band-fade-soft rb-band-pad relative overflow-hidden text-ink"
    >
      <div
        aria-hidden="true"
        className="rb-glow rb-glow-contact pointer-events-none absolute -bottom-[40%] left-1/2 aspect-[1.6] w-[min(1200px,140vw)] -translate-x-1/2"
      />
      <Container className="relative">
        <div className="mx-auto mb-[var(--rb-contact-gap)] max-w-[760px] text-center">
          <h2 data-anchor="contact" className="rb-fs-display m-0 font-extrabold leading-[1.05] tracking-[-0.035em] text-balance">
            Let&apos;s build something together
          </h2>
          <p className="mx-auto mt-4 mb-0 max-w-[56ch] text-[clamp(16px,1.3vw,18px)] leading-[1.55] text-muted text-pretty">
            Interested in working together or have a question? I&apos;d love to hear from you.
          </p>
        </div>
        <div className="mx-auto grid max-w-[1100px] grid-cols-1 items-stretch gap-x-6 gap-y-4 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <Reveal className="flex min-w-0">
            <IssueForm owner={owner} email={EMAIL} />
          </Reveal>
          <Reveal index={1} className="flex min-w-0">
            <TerminalCard remote={remote} email={EMAIL} />
          </Reveal>
        </div>
        <nav aria-label="Contact links" className="mt-[var(--rb-contact-gap)] flex flex-wrap justify-center gap-2">
          <a href={`mailto:${EMAIL}`} className={LINK}>
            <GoMail aria-hidden="true" className="size-4" />
            Email
          </a>
          <a href={LINKEDIN_URL} target="_blank" rel="noopener" className={LINK}>
            <span aria-hidden="true" className="font-extrabold tracking-[-0.02em]">
              in
            </span>
            LinkedIn
          </a>
          <a href={GITHUB_URL} target="_blank" rel="noopener" className={LINK}>
            <GoCodeSquare aria-hidden="true" className="size-4" />
            GitHub
          </a>
          <a href={RESUME_URL} download className={LINK}>
            <GoDownload aria-hidden="true" className="size-4" />
            Resume
          </a>
        </nav>
      </Container>
    </section>
  );
}
