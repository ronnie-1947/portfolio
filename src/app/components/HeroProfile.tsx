import Image from "next/image";
import WhoamiTyper from "./client/WhoamiTyper";

type HeroProfileProps = {
  name: string;
  handle: string;
  image: string;
  status: string;
  roles: string[];
};

/**
 * Avatar, name, handle, status and `$ whoami`. One DOM order, three layouts —
 * see `.rb-profile` in globals.css: phone puts the avatar beside the name,
 * tablet tucks whoami under the name, laptop stacks everything in a column
 * with the status bubble pinned to the avatar.
 */
export default function HeroProfile({ name, handle, image, status, roles }: HeroProfileProps) {
  return (
    <div className="rb-profile">
      <div className="rb-profile-avatar relative size-24 flex-none rounded-full shadow-[0_0_0_1px_var(--rb-bd),0_12px_40px_rgba(1,4,9,0.35)] md:size-[140px] lg:size-[200px] xl:size-[232px] desk:size-[260px] 3xl:size-[296px]">
        <Image
          src={image}
          alt={`Portrait of ${name}`}
          fill
          priority
          sizes="(min-width: 1920px) 296px, (min-width: 1440px) 260px, (min-width: 1280px) 232px, (min-width: 1024px) 200px, (min-width: 768px) 140px, 96px"
          className="rounded-full bg-surface object-cover object-[50%_30%]"
        />
        {/* Laptop up: collapsed to its emoji, expands on hover/focus (always open on touch). */}
        <button
          type="button"
          aria-label={`Status: ${status}`}
          className="absolute bottom-[4%] left-[72%] z-2 hidden h-[38px] max-w-[38px] cursor-default items-center gap-2 overflow-hidden whitespace-nowrap rounded-[19px] border border-line bg-surface px-[9px] text-[13px] text-ink shadow-[0_4px_14px_rgba(1,4,9,0.3)] transition-[max-width] duration-350 ease-out hover:max-w-[320px] focus-visible:max-w-[320px] coarse:max-w-[320px] lg:flex"
        >
          <span aria-hidden="true" className="flex-none text-base leading-none">
            🛠️
          </span>
          <span>{status}</span>
        </button>
      </div>
      <div className="rb-profile-id">
        <div className="rb-profile-names flex min-w-0 flex-col gap-1.5">
          <h1 className="rb-fs-name rb-gradient-text m-0 w-fit max-w-full pb-1 font-extrabold leading-[1.02] tracking-[-0.035em] text-balance">
            {name}
          </h1>
          <div className="font-code text-[clamp(14px,1.3vw,18px)] text-muted">{handle}</div>
        </div>
        <WhoamiTyper roles={roles} className="rb-profile-who" />
      </div>
      <div className="rb-profile-bubble inline-flex min-h-9 items-center gap-2 rounded-[18px] border border-line bg-surface px-3 py-1.5 text-[13px]">
        <span aria-hidden="true" className="text-[15px] leading-none">
          🛠️
        </span>
        {status}
      </div>
    </div>
  );
}
