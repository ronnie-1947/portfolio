import Image from "next/image";

type PrimaryEducation = {
  university: string;
  degree: string;
  year: string;
  location: string;
  logo: string;
  collageImages: { src: string; alt: string }[];
};

type OtherEducation = {
  degree: string;
  school: string;
  year: string;
};

type Certification = {
  name: string;
  period: string;
};

interface EducationSectionProps {
  primary: PrimaryEducation;
  other: OtherEducation[];
  certifications: Certification[];
}

export default function EducationSection({
  primary,
  other,
  certifications,
}: EducationSectionProps) {
  return (
    <section id="education" className="py-24 md:py-32 px-6 relative bg-white z-10">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="mb-16">
          <p className="font-mono text-sm text-indigo-500 tracking-wider uppercase mb-2">
            Academic Background
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Education
          </h2>
        </div>

        {/* Primary university — info left, collage right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-20">
          {/* Left — University details */}
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative size-20 md:size-28 rounded-xl overflow-hidden  shrink-0 ">
                <Image
                  src={primary.logo}
                  alt={`${primary.university} logo`}
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                  {primary.university}
                </h3>
                <p className="text-sm text-gray-500 font-mono">
                  {primary.location}
                </p>
              </div>
            </div>

            <div className="light-card rounded-2xl p-6 md:p-8">
              <p className="font-mono text-xs text-indigo-500 tracking-wider uppercase mb-3">
                {primary.year}
              </p>
              <h4 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3">
                {primary.degree}
              </h4>
              <p className="text-gray-500 leading-relaxed">
                Graduate program focused on advanced cybersecurity principles,
                threat intelligence analysis, and secure system design.
              </p>
            </div>
          </div>

          {/* Right — Photo collage */}
          <div className="photo-collage">
            <div className="collage-item collage-item-1">
              <Image
                src={primary.collageImages[0].src}
                alt={primary.collageImages[0].alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </div>
            <div className="collage-item collage-item-2">
              <Image
                src={primary.collageImages[1].src}
                alt={primary.collageImages[1].alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </div>
            <div className="collage-item collage-item-3">
              <Image
                src={primary.collageImages[2].src}
                alt={primary.collageImages[2].alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </div>
            <div className="collage-item collage-item-4">
              <Image
                src={primary.collageImages[3].src}
                alt={primary.collageImages[3].alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </div>
            <div className="collage-item collage-item-5">
              <Image
                src={primary.collageImages[4].src}
                alt={primary.collageImages[4].alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </div>
          </div>
        </div>

        {/* Bottom — Certifications & Other Degrees */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Other degrees */}
          {other.length > 0 && (
            <div>
              <p className="font-mono text-sm text-indigo-500 tracking-wider uppercase mb-2">
                Other Degrees
              </p>
              <h3 className="text-2xl font-bold mb-6 text-gray-900">
                Additional Education
              </h3>
              <div className="space-y-4">
                {other.map((edu, i) => (
                  <div key={i} className="light-card rounded-xl p-6">
                    <p className="font-mono text-xs text-gray-400 mb-2">
                      {edu.year}
                    </p>
                    <h4 className="font-semibold text-lg mb-1 text-gray-900">
                      {edu.degree}
                    </h4>
                    <p className="text-indigo-600">{edu.school}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          <div>
            <p className="font-mono text-sm text-indigo-500 tracking-wider uppercase mb-2">
              Professional
            </p>
            <h3 className="text-2xl font-bold mb-6 text-gray-900">
              Certifications
            </h3>
            <div className="space-y-4">
              {certifications.map((cert, i) => (
                <div
                  key={i}
                  className="light-card rounded-xl p-6 flex justify-between items-center"
                >
                  <h4 className="font-semibold text-gray-900">{cert.name}</h4>
                  <span className="font-mono text-xs text-gray-400">
                    {cert.period}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
