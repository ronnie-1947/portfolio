import type { SkillGroup } from "../config/portfolio";
import { skillCode } from "../lib/skillCode";
import Container from "./ui/Container";
import SectionHeading from "./ui/SectionHeading";
import SkillsExplorer, { type SkillFileView } from "./client/SkillsExplorer";
import type { StackLayer } from "./client/SkillStack";

type SkillsSectionProps = {
  skills: Record<SkillGroup, string[]>;
  files: { name: string; group: SkillGroup }[];
};

// core.md lights every layer; the rest light the layer their file is named after.
const layerFor = (fileName: string): StackLayer => {
  const base = fileName.split(".")[0];
  return base === "core" ? "all" : (base as StackLayer);
};

// 04 Skills — `tree skills/`: the stack illustration and a repo-style file browser.
export default function SkillsSection({ skills, files }: SkillsSectionProps) {
  const views: SkillFileView[] = files.map((f) => ({
    name: f.name,
    layer: layerFor(f.name),
    skills: skills[f.group],
    lines: skillCode(f.name, skills[f.group]),
  }));

  return (
    <section
      id="skills"
      data-band="skills"
      data-tone="dark"
      data-fade="light-surface"
      className="rb-band-fade-soft rb-band-pad relative overflow-hidden text-ink"
    >
      <div
        aria-hidden="true"
        className="rb-glow rb-glow-skills pointer-events-none absolute top-[18%] -left-[10%] aspect-square w-[min(900px,100vw)]"
      />
      <Container className="relative">
        <div className="mb-7">
          <SectionHeading anchor="skills" title="Skills" command="tree skills/" prompt />
        </div>
        <SkillsExplorer files={views} />
      </Container>
    </section>
  );
}
