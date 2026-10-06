// CSS-only tooltip: shows while the wrapped control is hovered or focused.
// The control must carry its own aria-label — the bubble is decorative.
type TooltipProps = {
  label: string;
  children: React.ReactNode;
};

// Sits above the control, in the band's inverted colours.
export default function Tooltip({ label, children }: TooltipProps) {
  return (
    <span className="group/tip relative inline-flex">
      {children}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute z-10 whitespace-nowrap rounded-md px-2 py-1 text-xs font-medium opacity-0 transition-opacity duration-150 group-hover/tip:opacity-100 group-focus-within/tip:opacity-100 bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2 bg-ink text-canvas`}
      >
        {label}
      </span>
    </span>
  );
}
