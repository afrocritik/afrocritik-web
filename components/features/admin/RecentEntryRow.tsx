import Image from "next/image";
import { MoreHorizontal } from "lucide-react";
import { StatusBadge } from "./StatusBadge";
import type { RecentEntry } from "./constants";

const CELL = "h-16 border-b-[0.09px] border-neutral-500/50 px-3 py-2 align-middle font-inter text-base leading-6 text-white";

export function RecentEntryRow({ entry }: Readonly<{ entry: RecentEntry }>) {
  return (
    <tr>
      <td className="h-16 border-b-[0.09px] border-neutral-500/50 px-3 py-2 align-middle">
        <div className="flex items-center gap-2">
          <Image
            src={entry.image}
            alt={entry.title}
            width={36}
            height={36}
            className="size-9 shrink-0 rounded-[5px] object-cover"
          />
          <span className="font-inter text-base font-semibold leading-6 text-white/60">
            {entry.title}
          </span>
        </div>
      </td>
      <td className={CELL}>{entry.type}</td>
      <td className={CELL}>{entry.category}</td>
      <td className={CELL}>{entry.addedBy}</td>
      <td className={CELL}>{entry.date}</td>
      <td className="h-16 border-b-[0.09px] border-neutral-500/50 px-3 py-2 text-center align-middle">
        <StatusBadge status={entry.status} />
      </td>
      <td className="h-16 border-b-[0.09px] border-neutral-500/50 px-3 py-2 text-center align-middle">
        <button
          type="button"
          aria-label={`Actions for ${entry.title}`}
          className="inline-flex size-6 items-center justify-center rounded-[3.06px] text-white/60 transition-colors hover:bg-white/10"
        >
          <MoreHorizontal className="size-4" />
        </button>
      </td>
    </tr>
  );
}
