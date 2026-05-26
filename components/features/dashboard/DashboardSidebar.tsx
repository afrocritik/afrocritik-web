"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {
  ArrowRight,
  BarChart3,
  Bookmark,
  Library,
  LayoutDashboard,
  LogOut,
  MoreVertical,
  PenSquare,
  Settings,
  Users,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Logo } from "@/components/layout/Logo";
import { cn } from "@/lib/utils";
import { NAV_ITEMS, type DashboardNavItem } from "./constants";

const ICONS: Record<DashboardNavItem["icon"], typeof LayoutDashboard> = {
  dashboard: LayoutDashboard,
  library: Library,
  saved: Bookmark,
  people: Users,
  reports: BarChart3,
  contribution: PenSquare,
  settings: Settings,
};

function NavLink({
  item,
  active,
}: Readonly<{ item: DashboardNavItem; active: boolean }>) {
  const Icon = ICONS[item.icon];
  return (
    <Link
      href={item.href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-4 py-3 font-inter text-sm font-medium transition-colors",
        active
          ? "bg-amber text-yellow-950"
          : "text-ink-secondary hover:bg-amber-soft hover:text-amber"
      )}
    >
      <Icon className="size-[18px] shrink-0" />
      {item.label}
    </Link>
  );
}

function ReportCard() {
  return (
    <div className="rounded-xl border border-amber-line bg-white/[0.03] p-4">
      <h3 className="font-inter text-sm font-semibold text-white">
        Afrocritik 2025 Report
      </h3>
      <p className="mt-1 font-inter text-xs leading-relaxed text-ink-muted">
        Explore key insights and intelligence shaping African culture.
      </p>
      <div className="mt-3 overflow-hidden rounded-md">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/The-Afrocritik-Report.png"
          alt="The Afrocritik Report 2025"
          className="h-28 w-full object-cover"
        />
      </div>
      <Link
        href="/reports/afrocritik-2025"
        className="mt-3 inline-flex items-center gap-1.5 rounded-md bg-amber px-3 py-1.5 font-inter text-xs font-semibold text-yellow-950 transition-opacity hover:opacity-90"
      >
        Read Report
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
    <aside className="hidden w-64 shrink-0 self-start flex-col border-r border-amber-line/40 px-5 py-8 lg:flex">
      <Logo />

      <nav className="mt-8 flex flex-col gap-1">
        {NAV_ITEMS.map((item) => (
          <NavLink key={item.href} item={item} active={pathname === item.href} />
        ))}
      </nav>

      {/* Report card, logout and profile follow the nav in normal flow. */}
      <div className="mt-6 flex flex-col gap-6">
        <ReportCard />

        <button
          type="button"
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex items-center gap-3 rounded-lg px-4 py-3 font-inter text-sm font-medium text-ink-secondary transition-colors hover:bg-amber-soft hover:text-amber"
        >
          <LogOut className="size-[18px] shrink-0" />
          Logout
        </button>

        <div className="flex items-center gap-3 border-t border-amber-line pt-5">
          <Avatar className="size-10 overflow-hidden rounded-full">
            <AvatarImage
              src={session?.user?.image || "/Interest-Avatar.png"}
              alt={name}
              className="size-10 object-cover"
            />
            <AvatarFallback className="bg-bg-secondary text-amber">
              {name[0]?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="truncate font-inter text-sm font-semibold text-white">
              {name}
            </p>
            <p className="truncate font-inter text-xs text-ink-muted">
              Senior Critic
            </p>
          </div>
          <button
            type="button"
            aria-label="Account options"
            className="text-ink-muted transition-colors hover:text-amber"
          >
            <MoreVertical className="size-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
