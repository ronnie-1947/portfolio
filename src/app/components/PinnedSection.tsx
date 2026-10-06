import Link from "next/link";
import { GoChevronRight } from "react-icons/go";
import type { Project } from "../config/portfolio";
import Container from "./ui/Container";
import Counter from "./ui/Counter";
import SectionHeading from "./ui/SectionHeading";
import FeatureProjectCard from "./FeatureProjectCard";
import RepoCard from "./RepoCard";
import Reveal from "./client/Reveal";

type PinnedSectionProps = {
  pinned: Project[];
  totalCount: number;
};

// 03 Pinned — six projects. From 1280px the first becomes a 2×2 featured card.
export default function PinnedSection({ pinned, totalCount }: PinnedSectionProps) {
  const [featured] = pinned;
  return (
    <section
      id="projects"
      data-band="pinned"
      data-tone="light"
      data-variant="surface"
      data-fade="light"
      className="rb-band-pinned relative text-ink"
    >
      <Container>
        <div className="mb-7 flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
          <SectionHeading anchor="projects" title="Pinned" command={`${pinned.length} of ${totalCount} projects`} />
          <Link href="/projects" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-accent hover:underline">
            All projects
            <Counter>{totalCount}</Counter>
            <GoChevronRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {featured && (
            <Reveal className="col-span-2 row-span-2 hidden min-w-0 xl:block">
              <FeatureProjectCard project={featured} />
            </Reveal>
          )}
          {pinned.map((project, i) => (
            <Reveal key={project.id} index={i + 1} className={`min-w-0 ${i === 0 ? "xl:hidden" : ""}`}>
              <RepoCard project={project} withStrip={i === 0} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
