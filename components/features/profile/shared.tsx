import type { LucideIcon } from "lucide-react";

export const CARD =
  "rounded-2xl bg-[#F4A34B26] outline outline-1 -outline-offset-1 outline-[#F4A34B4D]";

export function joinedLabel(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return `Joined ${d.toLocaleString("en-US", { month: "long", year: "numeric" })}`;
}

export function daysAgo(iso?: string) {
  if (!iso) return "";
  const days = Math.max(0, Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000));
  if (days < 1) return "today";
  return `${days}d ago`;
}

export const stripProtocol = (u: string) => u.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
export const handle = (v: string) => (v.startsWith("@") ? v : `@${v.replace(/^https?:\/\/[^/]+\//, "")}`);

export function Chip({ icon: Icon, children }: Readonly<{ icon: LucideIcon; children: React.ReactNode }>) {
  return (
    <span className="inline-flex h-[30px] items-center gap-2 rounded-full bg-[#F4A34B26] px-3.5 font-inter text-xs text-white/80 outline outline-1 -outline-offset-1 outline-[#F4A34B4D]">
      <Icon className="size-3.5" />
      {children}
    </span>
  );
}

