// Section title plus the terminal-style subline ("$ git log --graph career").
// `anchor` marks the heading the header tabs and scroll-spy jump to.
type SectionHeadingProps = {
  anchor: string;
  title: string;
  command?: string;
  prompt?: boolean; // prefix the command with a green "$"
};

export default function SectionHeading({ anchor, title, command, prompt = false }: SectionHeadingProps) {
  return (
    <div>
      <h2 data-anchor={anchor} className="rb-fs-h2 m-0 font-extrabold leading-[1.1] tracking-[-0.03em]">
        {title}
      </h2>
      {command && (
        <p className="mt-2 mb-0 font-code text-[13px] text-muted">
          {prompt && <span className="text-success">$ </span>}
          {command}
        </p>
      )}
    </div>
  );
}
