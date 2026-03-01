const FILL: Record<"dark-to-light" | "light-to-dark", string> = {
  "dark-to-light": "#ffffff",
  "light-to-dark": "#080c18",
};

interface WaveMaskProps {
  variant: "dark-to-light" | "light-to-dark";
  className?: string;
}

export default function WaveMask({ variant, className = "" }: WaveMaskProps) {
  return (
    <div
      className={`absolute -bottom-0.5 left-0 right-0 z-10 ${className}`}
      style={{ lineHeight: 0 }}
    >
      <svg
        viewBox="0 0 1440 110"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="block w-full h-27.5"
      >
        <path
          fill={FILL[variant]}
          d="M0,60 C360,110 720,5 1080,60 C1200,85 1340,35 1440,60 L1440,110 L0,110 Z"
        />
      </svg>
    </div>
  );
}
