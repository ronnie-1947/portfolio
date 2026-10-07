import Container from "./ui/Container";
import HeroDetails from "./HeroDetails";
import HeroProfile from "./HeroProfile";
import ReadmeCard from "./ReadmeCard";
import CareerGlobe, { type CareerStop } from "./client/CareerGlobe";
import { EMAIL, GITHUB_HANDLE, GITHUB_URL, LINKEDIN_HANDLE, LINKEDIN_URL, PROFILE_IMAGE, RESUME_URL, type Profile } from "../config/portfolio";

type OverviewSectionProps = {
  profile: Profile;
  stops: CareerStop[];
  coreSkills: string[];
  degree: string;
  university: string;
};

// 01 Overview — hero (profile + career globe) and the README card.
export default function OverviewSection({ profile, stops, coreSkills, degree, university }: OverviewSectionProps) {
  return (
    <section
      id="about"
      data-band="overview"
      className="relative overflow-hidden bg-canvas pt-[clamp(24px,4vw,56px)] pb-12 text-ink"
    >
      <div aria-hidden="true" className="rb-hero-grid pointer-events-none absolute inset-0" />
      <div aria-hidden="true" className="rb-hero-stars pointer-events-none absolute inset-0" />
      <div
        aria-hidden="true"
        className="rb-glow rb-glow-hero pointer-events-none absolute -top-[22%] -right-[14%] aspect-square w-[min(1100px,120vw)]"
      />
      <Container className="relative">
        <div className="grid grid-cols-1 items-center gap-[clamp(32px,4vw,64px)] lg:grid-cols-2 xl:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <div className="flex min-w-0 flex-col gap-5">
            <HeroProfile name={profile.name} handle={GITHUB_HANDLE} image={PROFILE_IMAGE} status={profile.status} roles={profile.roles} />
            <HeroDetails
              bio={profile.bio}
              organization={profile.organization}
              location={profile.location}
              email={EMAIL}
              linkedinUrl={LINKEDIN_URL}
              linkedinHandle={LINKEDIN_HANDLE}
              githubUrl={GITHUB_URL}
              githubHandle={GITHUB_HANDLE}
              resumeUrl={RESUME_URL}
            />
          </div>
          <CareerGlobe stops={stops} />
        </div>
        <ReadmeCard
          owner={profile.siteHandle}
          greeting={profile.readme.greeting}
          reach={profile.readme.reach}
          currentWork={profile.readme.currentWork}
          coreSkills={coreSkills}
          degree={degree}
          university={university}
          email={EMAIL}
        />
      </Container>
    </section>
  );
}
