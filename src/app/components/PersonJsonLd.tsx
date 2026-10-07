import { EMAIL, GITHUB_URL, LINKEDIN_URL, PROFILE_IMAGE, organizations, profile, skills } from "../config/portfolio";
import { SITE_NAME, SITE_TITLE, SITE_URL } from "../config/site";

// schema.org Person / ProfilePage / WebSite graph for the home page. `sameAs`
// ties the site to the LinkedIn and GitHub profiles so search engines treat
// them as one person (knowledge panel, name searches).
export default function PersonJsonLd() {
  const person = `${SITE_URL}/#person`;
  const website = `${SITE_URL}/#website`;

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": person,
        name: profile.name,
        url: SITE_URL,
        image: `${SITE_URL}${PROFILE_IMAGE}`,
        jobTitle: "Software Developer & Security Engineer",
        description: profile.bio,
        email: `mailto:${EMAIL}`,
        address: { "@type": "PostalAddress", addressCountry: "CA" },
        worksFor: { "@type": "Organization", name: profile.organization },
        alumniOf: organizations.map((org) => ({ "@type": "CollegeOrUniversity", name: org.name })),
        knowsAbout: [...new Set(Object.values(skills).flat())],
        sameAs: [LINKEDIN_URL, GITHUB_URL],
      },
      {
        "@type": "WebSite",
        "@id": website,
        url: SITE_URL,
        name: SITE_NAME,
        inLanguage: "en",
        publisher: { "@id": person },
      },
      {
        "@type": "ProfilePage",
        "@id": `${SITE_URL}/#profile`,
        url: SITE_URL,
        name: SITE_TITLE,
        isPartOf: { "@id": website },
        mainEntity: { "@id": person },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // Escape "<" so profile text can never close the script tag early.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }}
    />
  );
}
