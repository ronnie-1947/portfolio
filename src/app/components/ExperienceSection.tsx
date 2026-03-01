import ExperienceClient from "./client/ExperienceClient";
import WaveMask from "./ui/WaveMask";

export type Experience = {
  id: number;
  role: string;
  company: string;
  location: string;
  period: string;
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
  return <>
  <ExperienceClient experiences={experiences} theme={theme} />;
  <WaveMask variant="light-to-dark" />
  </>
}
