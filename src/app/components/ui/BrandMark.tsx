// "RB" gradient tile used as the site logo in the header and footer.
const SIZES = {
  md: "size-8 text-[13px]",
  sm: "size-6 text-[10px]",
};

export default function BrandMark({ size = "md" }: { size?: keyof typeof SIZES }) {
  return (
    <span
      aria-hidden="true"
      className={`rb-brand-tile grid flex-none place-items-center rounded-md font-extrabold tracking-[-0.04em] text-[#0d1117] ${SIZES[size]}`}
    >
      RB
    </span>
  );
}
