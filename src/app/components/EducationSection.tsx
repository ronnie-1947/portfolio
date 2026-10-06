import type { Credential, primaryEducation } from "../config/portfolio";
import Container from "./ui/Container";
import SectionHeading from "./ui/SectionHeading";
import DegreeCard from "./DegreeCard";
import Organizations from "./Organizations";
import CredentialBadges from "./client/CredentialBadges";
import PhotoCollage from "./client/PhotoCollage";
import Reveal from "./client/Reveal";

type EducationSectionProps = {
  education: typeof primaryEducation;
  credentials: Credential[];
  organizations: { name: string; logo?: string; monogram?: string }[];
};

// 05 Academic background — degree + campus collage, credential badges, organizations.
// Below 1024px the collage leads and the degree card follows.
export default function EducationSection({ education, credentials, organizations }: EducationSectionProps) {
  return (
    <section
      id="education"
      data-band="education"
      className="rb-band-fade rb-band-pad relative text-ink"
    >
      <Container>
        <div className="mb-7">
          <SectionHeading anchor="education" title="Academic background" command="ls ~/education" prompt />
        </div>
        <div className="grid grid-cols-1 items-stretch gap-x-6 gap-y-4 lg:grid-cols-2 xl:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <Reveal className="order-2 flex min-w-0 lg:order-none">
            <DegreeCard
              university={education.university}
              location={education.location}
              logo={education.logo}
              year={education.year}
              degree={education.degree}
              summary={education.summary}
            />
          </Reveal>
          <PhotoCollage images={education.collageImages} className="order-1 lg:order-none" />
        </div>
        <div className="mt-[var(--rb-edu-gap)] flex flex-wrap items-start justify-between gap-x-14 gap-y-10">
          <CredentialBadges credentials={credentials} className="flex min-w-0 basis-full flex-col gap-4 lg:flex-[0_1_auto]" />
          <Organizations organizations={organizations} />
        </div>
      </Container>
    </section>
  );
}
