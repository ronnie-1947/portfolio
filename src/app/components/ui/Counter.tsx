// Small grey count bubble next to a tab or link label.
export default function Counter({ children }: { children: React.ReactNode }) {
  return <span className="rounded-full bg-counter px-1.5 text-xs font-medium leading-[18px] text-ink">{children}</span>;
}
