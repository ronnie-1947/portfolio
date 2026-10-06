import type { ComponentType } from "react";
import { GoBook, GoBriefcase, GoMail, GoMoon, GoMortarBoard, GoRepo, GoStack, GoSun } from "react-icons/go";
import PaintbrushIcon from "../ui/PaintbrushIcon";
import type { HomeSectionId } from "../../lib/sections";
import type { Theme } from "../../lib/theme";

type Icon = ComponentType<{ className?: string }>;

// Labels and icons for the home sections: header tabs and command palette.
export const SECTION_NAV: Record<HomeSectionId, { label: string; icon: Icon }> = {
  about: { label: "Overview", icon: GoBook },
  experience: { label: "Experience", icon: GoBriefcase },
  projects: { label: "Projects", icon: GoRepo },
  skills: { label: "Skills", icon: GoStack },
  education: { label: "Education", icon: GoMortarBoard },
  contact: { label: "Contact", icon: GoMail },
};

export const THEME_OPTIONS: { id: Theme; label: string; description: string; icon: Icon }[] = [
  { id: "mixed", label: "Mixed", description: "Default · dark hero, light content", icon: PaintbrushIcon },
  { id: "light", label: "Light", description: "Every band light", icon: GoSun },
  { id: "dark", label: "Dark", description: "Every band dark", icon: GoMoon },
];

/** Links the header, menu sheet and palette all point at. */
export type SiteLinks = {
  email: string;
  github: string;
  githubHandle: string;
  linkedin: string;
  linkedinHandle: string;
  resume: string;
};
