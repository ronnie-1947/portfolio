import Image from "next/image";

// Site logo (public/logo_light.svg) used in the header and footer. Heights only; width follows the SVG's ~1.65:1 aspect.
const SIZES = {
  md: "h-6",
  sm: "h-4",
};

export default function BrandMark({ size = "md" }: { size?: keyof typeof SIZES }) {
  return <Image src="/logo_light.svg" alt="" aria-hidden="true" width={807} height={488} className={`w-auto flex-none ${SIZES[size]}`} />;
}
