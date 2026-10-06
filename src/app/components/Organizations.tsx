import Image from "next/image";
import Tooltip from "./ui/Tooltip";

type Organization = { name: string; logo?: string; monogram?: string };

// Org avatars, like the "Organizations" strip on a GitHub profile.
export default function Organizations({ organizations }: { organizations: Organization[] }) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="m-0 text-base font-semibold">Organizations</h3>
      <div className="flex gap-2">
        {organizations.map((org) => (
          <Tooltip key={org.name} label={org.name}>
            <span
              tabIndex={0}
              role="img"
              aria-label={org.name}
              className={`grid size-11 cursor-default place-items-center overflow-hidden rounded-md border border-line ${
                org.logo ? "bg-white" : "bg-surface text-[13px] font-bold tracking-[0.02em] text-muted"
              }`}
            >
              {org.logo ? <Image src={org.logo} alt="" width={34} height={34} className="size-[34px] object-contain" /> : org.monogram}
            </span>
          </Tooltip>
        ))}
      </div>
    </div>
  );
}
