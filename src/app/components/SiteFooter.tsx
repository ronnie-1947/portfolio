import { EMAIL, GITHUB_URL, LINKEDIN_URL, RESUME_URL } from "../config/portfolio";
import BrandMark from "./ui/BrandMark";

const LINK = "inline-flex min-h-8 items-center text-muted hover:text-accent hover:underline";

export default function SiteFooter({ name }: { name: string }) {
  return (
    <footer data-band="footer" data-tone="dark" className="border-t border-line bg-canvas text-xs text-muted">
      <div className="rb-container flex flex-col flex-wrap items-center gap-x-6 gap-y-3 pt-7 pb-[max(28px,env(safe-area-inset-bottom))] text-center md:flex-row md:text-left">
        <span className="flex items-center gap-2.5">
          <BrandMark size="sm" />© {new Date().getFullYear()} {name}
        </span>
        <span>Built with Next.js and Claude Code</span>
        <span>🍁 Canada</span>
        <nav aria-label="Footer" className="flex flex-wrap justify-center gap-x-4 gap-y-1 md:ml-auto md:justify-start">
          <a href="#about" className={LINK}>
            Overview
          </a>
          <a href="/projects" className={LINK}>
            Projects
          </a>
          <a href={RESUME_URL} download className={LINK}>
            Resume
          </a>
          <a href={`mailto:${EMAIL}`} className={LINK}>
            Email
          </a>
          <a href={LINKEDIN_URL} target="_blank" rel="noopener" className={LINK}>
            LinkedIn
          </a>
          <a href={GITHUB_URL} target="_blank" rel="noopener" className={LINK}>
            GitHub
          </a>
        </nav>
      </div>
    </footer>
  );
}
