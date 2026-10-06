// Blue "topic" pill used for tech tags.
export default function Topic({ children }: { children: React.ReactNode }) {
  return (
    <span className="whitespace-nowrap rounded-full bg-topic px-2.5 text-xs font-medium leading-[22px] text-topic-ink">
      {children}
    </span>
  );
}
