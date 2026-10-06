import type { ComponentType } from "react";
import { GoBook, GoBriefcase, GoMail, GoMortarBoard, GoRepo, GoStack } from "react-icons/go";
import type { HomeSectionId } from "../../lib/sections";

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


/** Links the header, menu sheet and palette all point at. */
export type SiteLinks = {
  email: string;
  github: string;
  githubHandle: string;
  linkedin: string;
  linkedinHandle: string;
  resume: string;
};
