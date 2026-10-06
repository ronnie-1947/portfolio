// Keyboard key hint, e.g. the "/" in "Type / to search".
export default function Kbd({ children }: { children: React.ReactNode }) {
  return <kbd className="rounded border border-line px-[5px] font-code text-[11px] leading-[17px]">{children}</kbd>;
}
