import type { Experience } from "../config/portfolio";
import Container from "./ui/Container";
import SectionHeading from "./ui/SectionHeading";
import CommitGraph from "./client/CommitGraph";
import type { CommitView } from "./client/CommitItem";

// 02 Experience — roles as a `git log --graph`, newest first.
export default function ExperienceSection({ experiences }: { experiences: Experience[] }) {
  const commits: CommitView[] = experiences.map((e, i) => ({
    id: String(e.id),
    hash: e.hash,
    role: e.role,
    company: e.company,
    location: e.location,
    period: e.period,
    badge: e.employmentType?.toUpperCase(),
    branch: !!e.parallelTo,
    parallelTo: e.parallelTo,
    forksBranch: !!experiences[i + 1]?.parallelTo,
    details: e.details,
    tech: e.skills,
  }));

  return (
    <section
      id="experience"
      data-band="experience"
      className="rb-band-fade rb-band-pad relative text-ink"
    >
      <Container>
        <div className="mx-auto max-w-[1100px]">
          <CommitGraph heading={<SectionHeading anchor="experience" title="Experience" command="git log --graph career" prompt />} commits={commits} />
        </div>
      </Container>
    </section>
  );
}
