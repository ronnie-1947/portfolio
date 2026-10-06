// Outlined status pill ("Live demo", "HEAD -> main", "Degree" …).
type LabelTone = "accent" | "success" | "done" | "muted";

const TONES: Record<LabelTone, string> = {
  accent: "border-accent text-accent",
  success: "border-success text-success",
  done: "border-done text-done",
  muted: "border-line text-muted",
};

type LabelProps = {
  tone: LabelTone;
  mono?: boolean;
  className?: string;
  children: React.ReactNode;
};

export default function Label({ tone, mono = false, className = "", children }: LabelProps) {
  const type = mono ? "font-code text-[11px]" : "text-xs font-medium";
  return (
    <span className={`flex-none whitespace-nowrap rounded-full border px-[7px] leading-[18px] ${type} ${TONES[tone]} ${className}`}>
      {children}
    </span>
  );
}
