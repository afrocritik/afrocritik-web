"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ExternalLink } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { cn } from "@/lib/utils";
import { ADMIN_NAV, type AdminNavItem } from "./constants";

function isActive(pathname: string, href: string) {
  if (href === "/admin") return pathname === "/admin";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function NavIcon({
  icon,
}: Readonly<{ icon: AdminNavItem["icon"] }>) {
  if (typeof icon === "string") {
    return (
      <span
        aria-hidden="true"
        className="size-4 shrink-0 bg-white"
        style={{
          WebkitMask: `url('/${icon}') no-repeat center / contain`,
          mask: `url('/${icon}') no-repeat center / contain`,
        }}
      />
    );
  }
  const Icon = icon as LucideIcon;
  return (
    <span className="flex size-4 shrink-0 items-center justify-center">
      <Icon className="size-4 text-white" />
    </span>
  );
}

function NavLink({
  item,
  active,
}: Readonly<{ item: AdminNavItem; active: boolean }>) {
  return (
    <Link
      href={item.href}
      className={cn(
        "flex w-full items-center gap-2.5 rounded-xl pl-3 font-inter text-base font-semibold leading-4 transition-colors",
        active
          ? "h-11 bg-yellow-950/50 py-3 outline outline-1 outline-offset-[-0.89px] outline-yellow-700 text-orange-400"
          : "h-9 py-2.5 text-white hover:bg-white/5"
      )}
    >
      <NavIcon icon={item.icon} />
      {item.label}
    </Link>
  );
}

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 shrink-0 self-start flex-col border-r border-yellow-700 bg-[#50321C80] lg:flex">
      <div className="flex h-[116px] shrink-0 items-center px-4">
        <Logo href="/" />
      </div>

      <nav className="custom-scrollbar flex-1 overflow-y-auto px-4 pb-6">
        <div className="flex flex-col gap-7">
          {ADMIN_NAV.map((group) => (
            <div key={group.heading} className="flex flex-col gap-2">
              <p className="px-3 font-inter text-xs font-medium uppercase leading-3 text-white/80">
                {group.heading}
              </p>
              <div className="flex flex-col gap-0.5">
                {group.items.map((item) => (
                  <NavLink
                    key={item.href}
                    item={item}
                    active={isActive(pathname, item.href)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>

      <div className="shrink-0 border-t border-yellow-700/50 px-4 py-4">
        <Link
          href="/"
          className="flex h-11 items-center gap-2.5 rounded-xl px-3 font-inter text-sm font-medium text-white/80 transition-colors hover:bg-white/5 hover:text-white"
        >
          <ExternalLink className="size-3.5 shrink-0" />
          View public site
        </Link>
      </div>
    </aside>
  );
}
