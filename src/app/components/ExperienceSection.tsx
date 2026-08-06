import ExperienceClient from "./client/ExperienceClient";

export type Experience = {
  id: number;
  role: string;
  company: string;
  location: string;
  period: string;
  /** Optional badge next to the company, e.g. "Self-employed" */
  employmentType?: string;
  details: string[];
  skills: string[];
};

export default function ExperienceSection({
  experiences,
  theme = "dark",
}: {
  experiences: Experience[];
  theme?: "dark" | "light";
}) {
  return <ExperienceClient experiences={experiences} theme={theme} />;
}
