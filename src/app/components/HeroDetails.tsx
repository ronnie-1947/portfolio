import Link from "next/link";
import { GoChevronRight, GoCodeSquare, GoDownload, GoLink, GoLocation, GoMail, GoOrganization } from "react-icons/go";
import Tooltip from "./ui/Tooltip";
import { buttonClass, iconButtonClass } from "./ui/buttonStyles";

type HeroDetailsProps = {
  bio: string;
  organization: string;
  location: string;
  email: string;
  linkedinUrl: string;
  linkedinHandle: string;
  githubUrl: string;
  githubHandle: string;
  resumeUrl: string;
};

const stripScheme = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "");

const META_ROW = "flex min-h-11 items-center gap-2.5 fine:min-h-6";
const META_ICON = "size-4 flex-none text-muted";
const META_LINK = "text-ink wrap-anywhere hover:text-accent hover:underline";

// Bio, profile meta list and the hero call-to-action row.
export default function HeroDetails(props: HeroDetailsProps) {
  const { bio, organization, location, email, linkedinUrl, linkedinHandle, githubUrl, githubHandle, resumeUrl } = props;
  return (
    <>
      <p className="m-0 max-w-[60ch] text-[clamp(16px,1.2vw,18px)] leading-[1.6] text-ink text-pretty">{bio}</p>
      <ul className="m-0 flex list-none flex-col gap-1.5 p-0 text-sm">
        <li className={META_ROW}>
          <GoOrganization aria-hidden="true" className={META_ICON} />
          <span className="font-semibold">{organization}</span>
        </li>
        <li className={META_ROW}>
          <GoLocation aria-hidden="true" className={META_ICON} />
          {location}
        </li>
        <li className={META_ROW}>
          <GoMail aria-hidden="true" className={META_ICON} />
          <a href={`mailto:${email}`} className={META_LINK}>
            {email}
          </a>
        </li>
        <li className={META_ROW}>
          <GoLink aria-hidden="true" className={META_ICON} />
          <a href={linkedinUrl} target="_blank" rel="noopener" className={META_LINK}>
            {stripScheme(linkedinUrl)}
          </a>
        </li>
        <li className={META_ROW}>
          <GoCodeSquare aria-hidden="true" className={META_ICON} />
          <a href={githubUrl} target="_blank" rel="noopener" className={META_LINK}>
            {stripScheme(githubUrl)}
          </a>
        </li>
      </ul>
      <div className="mt-1 flex flex-wrap items-center gap-2">
        <Link href="/projects" className={buttonClass("primary", "hero", "basis-full md:basis-auto")}>
          View my work
          <GoChevronRight aria-hidden="true" className="size-4" />
        </Link>
        <a href={resumeUrl} download className={buttonClass("secondary", "hero", "flex-auto md:flex-none")}>
          <GoDownload aria-hidden="true" className="size-4" />
          Download resume
        </a>
        <Tooltip label={`GitHub · ${githubHandle}`}>
          <a href={githubUrl} target="_blank" rel="noopener" aria-label={`GitHub profile: ${githubHandle}`} className={iconButtonClass()}>
            <GoCodeSquare aria-hidden="true" className="size-4" />
          </a>
        </Tooltip>
        <Tooltip label={`LinkedIn · ${linkedinHandle}`}>
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener"
            aria-label={`LinkedIn profile: ${linkedinHandle}`}
            className={`${iconButtonClass()} text-[15px] font-extrabold tracking-[-0.02em]`}
          >
            <span aria-hidden="true">in</span>
          </a>
        </Tooltip>
      </div>
    </>
  );
}
