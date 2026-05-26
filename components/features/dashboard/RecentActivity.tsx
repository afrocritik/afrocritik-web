import { Download, FolderPlus, Heart, PenSquare } from "lucide-react";
import { RECENT_ACTIVITY, type ActivityItem } from "./constants";

const ICONS: Record<ActivityItem["icon"], typeof Heart> = {
  saved: Heart,
  downloaded: Download,
  contributed: PenSquare,
  collection: FolderPlus,
};

export function RecentActivity() {
  return (
    <div className="h-full rounded-xl border border-amber-line bg-white/[0.03] p-5">
      <h2 className="font-montserrat text-lg font-semibold text-white">
        Recent activity
      </h2>
      <ul className="mt-4 flex flex-col gap-4">
        {RECENT_ACTIVITY.map((item) => {
          const Icon = ICONS[item.icon];
          return (
            <li key={item.id} className="flex items-start gap-3">
              <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-amber-soft text-amber">
                <Icon className="size-3.5" />
              </span>
              <p className="flex-1 font-inter text-sm leading-snug text-ink-secondary">
                {item.text}{" "}
                <span className="font-semibold text-white">{item.highlight}</span>
              </p>
              <span className="shrink-0 font-inter text-xs text-ink-muted">
                {item.time}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
