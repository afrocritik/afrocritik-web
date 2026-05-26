"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { ArrowRight, LayoutDashboard, Library, LogOut, Settings, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Logo } from "@/components/layout/Logo";
import { cn } from "@/lib/utils";
import { NAV_ITEMS, type DashboardNavItem } from "./constants";

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

function NavIcon({
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

function NavLink({
  item,
  active,
}: Readonly<{ item: DashboardNavItem; active: boolean }>) {
  return (
    <Link
      href={item.href}
      className={cn(
        "flex h-11 w-full items-center gap-3 rounded-xl pl-6 py-3 font-inter text-base font-semibold leading-4 transition-colors",
        active
          ? "bg-yellow-950/50 outline outline-1 outline-offset-[-0.89px] outline-yellow-700 text-orange-400"
          : "text-white hover:bg-white/5"
      )}
    >
      <NavIcon icon={item.icon} active={active} />
      {item.label}
    </Link>
  );
}

function ReportCard() {
  return (
    <div className="relative h-[266px] w-full rounded-xl bg-rose-100/10 outline outline-1 outline-offset-[-0.89px] outline-yellow-700">
      <div className="absolute left-[17px] top-[16px] w-44">
        <p className="font-inter text-sm font-semibold leading-3 text-white">
          Afrocritik 2025 Report
        </p>
        <p className="mt-3 font-['Montserrat'] text-xs font-normal leading-4 text-white">
          Explore key insights and intelligence shaping African culture.
        </p>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/The-Afrocritik-Report.png"
        alt="The Afrocritik Report 2025"
        className="absolute left-[4px] top-[78px] h-32 w-28 object-cover rounded"
      />
      <Link
        href="/reports/afrocritik-2025"
        className="absolute left-[17px] top-[218px] inline-flex h-8 items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-yellow-700 to-orange-400 px-4 py-1.5 font-inter text-sm font-medium capitalize leading-5 text-yellow-950 transition-opacity hover:opacity-90 whitespace-nowrap"
      >
        Read report
        <ArrowRight className="size-3.5" />
      </Link>
    </div>
  );
}

export function DashboardSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const name = session?.user?.name || "Abdul Lawal";

  return (
    <aside className="hidden w-64 shrink-0 self-start flex-col px-4 lg:flex bg-yellow-950/50 border-r border-yellow-700">
      <div className="flex h-[116px] shrink-0 items-center">
        <Logo />
      </div>

      <nav className="mt-6 flex flex-col gap-1">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.href}
            item={item}
            active={pathname === item.href}
          />
        ))}
      </nav>

      <div className="mt-6 flex flex-col gap-4">
        <ReportCard />

        <button
          type="button"
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex h-11 w-full items-center gap-2.5 rounded-xl bg-white/10 pl-[26px] transition-colors hover:bg-white/15"
        >
          <LogOut className="size-4 shrink-0 text-white" />
          <span className="font-inter text-base font-semibold leading-4 text-white">
            Logout
          </span>
        </button>

        <div className="flex w-full items-center justify-between border-t border-white/10 py-7">
          <div className="flex items-center gap-3.5">
            <Avatar className="size-7 shrink-0 overflow-hidden rounded-full">
              <AvatarImage
                src={session?.user?.image || "/Interest-Avatar.png"}
                alt={name}
                className="size-7 object-cover"
              />
              <AvatarFallback className="bg-bg-secondary text-amber text-xs">
                {name[0]?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <p className="w-32 font-inter text-sm font-medium leading-5 text-white">
                {name}
              </p>
              <p className="font-inter text-[9.53px] font-light leading-4 text-orange-100/80">
                Senior Critic
              </p>
            </div>
          </div>
          <button
            type="button"
            aria-label="Account options"
            className="flex flex-col items-center gap-1 transition-opacity hover:opacity-70"
          >
            <div className="size-1 rounded-full bg-white" />
            <div className="size-1 rounded-full bg-white" />
            <div className="size-1 rounded-full bg-white" />
          </button>
        </div>
      </div>
    </aside>
  );
}
