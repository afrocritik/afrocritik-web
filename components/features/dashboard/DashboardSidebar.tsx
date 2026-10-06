"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, LogOut, Settings, User } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Logo } from "@/components/layout/Logo";
import { cn, getImageUrl, getRoleLabel, getUserDisplayName } from "@/lib/utils";
import { api, getMediaUrl } from "@/lib/api";
import { CardImage } from "@/components/common/CardImage";
import { useCurrentUser } from "@/lib/hooks/useCurrentUser";
import { NAV_ITEMS, type DashboardNavItem } from "./constants";
import { DashboardNavIcon } from "./DashboardNavIcon";

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
          ? "bg-[#50321C80] outline outline-1 outline-offset-[-0.89px] outline-yellow-700 text-orange-400"
          : "text-white hover:bg-white/5"
      )}
    >
      <DashboardNavIcon icon={item.icon} active={active} />
      {item.label}
    </Link>
  );
}

function ReportCard() {
  // Same rule as the home page's report block: the report an editor curated on
  // the Homepage global wins, otherwise the newest published one (the Reports
  // collection only returns published docs to non-staff).
  const { data: homepage, isFetched: homepageLoaded } = useQuery({
    queryKey: ["homepage-global"],
    queryFn: () => api.homepage(),
    staleTime: 5 * 60_000,
  });
  const curated =
    homepage?.featuredReport && typeof homepage.featuredReport === "object"
      ? homepage.featuredReport
      : null;
  const { data: latest } = useQuery({
    queryKey: ["latest-report"],
    enabled: homepageLoaded && !curated,
    staleTime: 5 * 60_000,
    queryFn: () => api.reports.list({ limit: 1, sort: "-createdAt", depth: 2 }),
  });
  const report = curated ?? latest?.docs?.[0] ?? null;

  // Nothing published yet → no card, rather than promoting a report that doesn't exist.
  if (!report) return null;

  const cover = getMediaUrl(report.coverImage);
  const summary = report.summary || report.subtitle;

  return (
    <div className="relative h-[266px] w-full rounded-xl bg-rose-100/10 outline outline-1 outline-offset-[-0.89px] outline-yellow-700">
      <div className="absolute left-[17px] top-[16px] w-44">
        <p className="line-clamp-1 font-inter text-sm font-semibold leading-3 text-white">
          {report.title}
        </p>
        {summary && (
          <p className="mt-3 line-clamp-2 font-['Montserrat'] text-xs font-normal leading-4 text-white">
            {summary}
          </p>
        )}
      </div>
      <div className="absolute left-[17px] top-[78px] h-32 w-28 overflow-hidden rounded">
        <CardImage
          src={cover || undefined}
          alt={report.title ?? "Report"}
          className="size-full object-cover"
          // No (or broken) cover → the bundled default report art.
          fallback={
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src="/images/reports/report-cover-3d.png"
              alt={report.title ?? "Report"}
              className="size-full object-cover"
            />
          }
        />
      </div>
      <Link
        href={`/reports/${report.slug}`}
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
  const { data: user } = useCurrentUser();
  const name = getUserDisplayName(user);
  const avatar = getImageUrl(user?.avatar) || "/images/avatars/default-avatar.png";

  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 self-start flex-col overflow-y-auto px-4 pb-4 lg:flex bg-[#50321C80] border-r border-yellow-700">
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

      <div className="mt-6 flex flex-1 flex-col gap-4">
        <ReportCard />

        {/* Logout + account pinned to the bottom of the viewport on tall screens */}
        <div className="mt-auto flex flex-col gap-4">
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
                src={avatar}
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
                {getRoleLabel(user?.role)}
              </p>
            </div>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <button
                type="button"
                aria-label="Account options"
                className="flex flex-col items-center gap-1 p-1 transition-opacity hover:opacity-70"
              >
                <div className="size-1 rounded-full bg-white" />
                <div className="size-1 rounded-full bg-white" />
                <div className="size-1 rounded-full bg-white" />
              </button>
            </PopoverTrigger>
            <PopoverContent side="top" align="end" className="w-52 p-1.5">
              <Link
                href="/dashboard/profile"
                className="flex items-center gap-3 rounded-md px-3 py-2.5 font-inter text-sm text-ink-secondary transition-colors hover:bg-amber-soft"
              >
                <User className="size-4" /> View profile
              </Link>
              <Link
                href="/dashboard/settings"
                className="flex items-center gap-3 rounded-md px-3 py-2.5 font-inter text-sm text-ink-secondary transition-colors hover:bg-amber-soft"
              >
                <Settings className="size-4" /> Settings
              </Link>
              <div className="my-1 border-t border-white/10" />
              <button
                type="button"
                onClick={() => signOut({ callbackUrl: "/" })}
                className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left font-inter text-sm text-ink-secondary transition-colors hover:bg-amber-soft"
              >
                <LogOut className="size-4" /> Sign out
              </button>
            </PopoverContent>
          </Popover>
        </div>
        </div>
      </div>
    </aside>
  );
}
