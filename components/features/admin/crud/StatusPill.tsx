import { cn } from "@/lib/utils";

const STYLES: Record<string, string> = {
  published: "bg-emerald-800 text-white",
  active: "bg-emerald-800 text-white",
  draft: "bg-yellow-600 text-white",
  pending: "bg-yellow-600 text-white",
  archived: "bg-neutral-600 text-white",
  inactive: "bg-neutral-600 text-white",
  suspended: "bg-red-900 text-white",
};

export function StatusPill({ status }: Readonly<{ status: string }>) {
  const key = status?.toLowerCase?.() ?? "";
  const label = status ? status[0].toUpperCase() + status.slice(1) : "—";
  return (
    <span
      className={cn(
        "inline-flex h-7 items-center justify-center rounded-md px-2.5 font-inter text-sm font-normal leading-5",
        STYLES[key] ?? "bg-neutral-700 text-white"
      )}
    >
      {label}
    </span>
  );
}
