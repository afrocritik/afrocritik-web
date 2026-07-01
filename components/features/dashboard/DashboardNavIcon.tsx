import { LayoutDashboard, Library, Settings, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DashboardNavItem } from "./constants";

const IMAGE_ICONS: Partial<Record<DashboardNavItem["icon"], string>> = {
  saved: "/dashboard-saved.png",
  reports: "/dashboard-report.png",
  contribution: "/dashboard-contributor.png",
};

const LUCIDE_ICONS: Partial<Record<DashboardNavItem["icon"], LucideIcon>> = {
  dashboard: LayoutDashboard,
  library: Library,
  people: Users,
  settings: Settings,
};

/** Shared nav icon used by the dashboard sidebar and the mobile nav bar. */
export function DashboardNavIcon({
  icon,
  active,
}: Readonly<{
  icon: DashboardNavItem["icon"];
  active: boolean;
}>) {
  const imageSrc = IMAGE_ICONS[icon];
  if (imageSrc) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={imageSrc}
        alt=""
        aria-hidden="true"
        className={cn(
          "size-4 shrink-0",
          active
            ? "[filter:brightness(0)_saturate(100%)_invert(67%)_sepia(67%)_saturate(589%)_hue-rotate(329deg)_brightness(105%)_contrast(97%)]"
            : "brightness-0 invert"
        )}
      />
    );
  }
  const Icon = LUCIDE_ICONS[icon];
  if (!Icon) return null;
  return (
    <Icon
      className={cn("size-4 shrink-0", active ? "text-orange-400" : "text-white")}
    />
  );
}
