import SkillsClient from "./client/SkillsClient";

function SkillsSection({ skills }: { skills: Record<string, string[]> }) {
  return <SkillsClient skills={skills} />;
}

export default SkillsSection;
