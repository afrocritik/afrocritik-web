import { cn } from "@/lib/utils";
import type { EntryStatus } from "./constants";

export function StatusBadge({ status }: Readonly<{ status: EntryStatus }>) {
  return (
    <span
      className={cn(
        "inline-flex h-7 items-center justify-center rounded-md px-2.5 font-inter text-sm font-normal leading-5 text-white",
        status === "Published" ? "bg-emerald-800" : "bg-yellow-600"
      )}
    >
      {status}
    </span>
  );
}
