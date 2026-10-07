import Navbar from "./components/Navbar";
import SiteHeader from "./components/SiteHeader";
import OverviewSection from "./components/OverviewSection";
import ExperienceSection from "./components/ExperienceSection";
import PinnedSection from "./components/PinnedSection";
import SkillsSection from "./components/SkillsSection";
import EducationSection from "./components/EducationSection";
import ContactSection from "./components/ContactSection";
import SiteFooter from "./components/SiteFooter";
import PersonJsonLd from "./components/PersonJsonLd";
import type { CareerStop } from "./components/client/CareerGlobe";
import {
  careerPath,
  credentials,
  experiences,
  organizations,
  pinnedProjectIds,
  primaryEducation,
  profile,
  projects,
  skillFiles,
  skills,
  type Project,
} from "./config/portfolio";

// Home v2 (GitHub-profile redesign). Previous version lives on branch `archive/home-v1` (tag `home-v1`).
export default function Portfolio() {
  const pinned = pinnedProjectIds.map((id) => projects.find((p) => p.id === id)).filter((p): p is Project => !!p);
  const unpinned = projects.filter((p) => !pinnedProjectIds.includes(p.id));

  const stops: CareerStop[] = careerPath.map(({ experienceId, ...stop }) => {
    const role = experiences.find((e) => e.id === experienceId);
    return { ...stop, company: role?.company ?? "", role: role?.role ?? "", date: role?.period ?? "" };
  });

  return (
    <div className="rb-home">
      <PersonJsonLd />
      {/* Same side nav as /projects; hidden on short viewports (see .rb-side-nav). */}
      <div className="rb-side-nav">
        <Navbar mobileNav={false} />
      </div>
      <SiteHeader
        handle={profile.siteHandle}
        counts={{ experience: experiences.length, projects: projects.length, education: 1 + credentials.length }}
        projects={[...pinned, ...unpinned]}
      />
      <main>
        <OverviewSection
          profile={profile}
          stops={stops}
          coreSkills={skills["Core Expertise"]}
          degree={primaryEducation.degree}
          university={primaryEducation.university}
        />
        <ExperienceSection experiences={experiences} />
        <PinnedSection pinned={pinned} totalCount={projects.length} />
        <SkillsSection skills={skills} files={skillFiles} />
        <EducationSection education={primaryEducation} credentials={credentials} organizations={organizations} />
        <ContactSection owner={profile.siteHandle} remote={profile.name.split(" ")[0].toLowerCase()} />
      </main>
      <SiteFooter name={profile.name} />
    </div>
  );
}
