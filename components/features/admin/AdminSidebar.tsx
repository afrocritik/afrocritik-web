"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ExternalLink, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { cn } from "@/lib/utils";
import { ADMIN_NAV, type AdminNavItem } from "./constants";

function isActive(pathname: string, href: string) {
  if (href === "/admin") return pathname === "/admin";
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** Create/Edit screens render in a focused, collapsed-rail layout. */
function isFormRoute(pathname: string) {
  return pathname.endsWith("/new") || pathname.endsWith("/edit");
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
  collapsed,
}: Readonly<{ item: AdminNavItem; active: boolean; collapsed: boolean }>) {
  return (
    <Link
      href={item.href}
      title={collapsed ? item.label : undefined}
      className={cn(
        "flex w-full items-center gap-2.5 rounded-xl font-inter text-base font-semibold leading-4 transition-colors",
        collapsed ? "justify-center px-0" : "pl-3",
        active
          ? "h-11 bg-yellow-950/50 py-3 outline outline-1 outline-offset-[-0.89px] outline-yellow-700 text-orange-400"
          : "h-9 py-2.5 text-white hover:bg-white/5"
      )}
    >
      <NavIcon icon={item.icon} />
      {!collapsed && item.label}
    </Link>
  );
}

export function AdminSidebar() {
  const pathname = usePathname();
  // Create/Edit screens open with the rail collapsed for a focused layout;
  // the editor can expand it at any time. Moving between form and non-form
  // routes resets to that route's sensible default.
  const formRoute = isFormRoute(pathname);
  const [collapsed, setCollapsed] = useState(formRoute);
  useEffect(() => {
    setCollapsed(formRoute);
  }, [formRoute]);

  return (
    <aside
      className={cn(
        "hidden shrink-0 self-start flex-col border-r border-yellow-700 bg-[#50321C80] transition-[width] duration-200 lg:flex",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <div
        className={cn(
          "flex h-[116px] shrink-0 items-center gap-2",
          collapsed ? "flex-col justify-center px-2 py-3" : "justify-between px-4"
        )}
      >
        {collapsed ? (
          <Link href="/" aria-label="Afrocritik home" className="block shrink-0">
            <Image
              src="/logo.png"
              alt="Afrocritik"
              width={48}
              height={20}
              className="h-auto w-12 object-contain"
              priority
            />
          </Link>
        ) : (
          <Logo href="/" />
        )}
        <button
          type="button"
          onClick={() => setCollapsed((c) => !c)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-expanded={!collapsed}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="flex size-8 shrink-0 items-center justify-center rounded-lg text-white/70 transition-colors hover:bg-white/10 hover:text-white"
        >
          {collapsed ? (
            <PanelLeftOpen className="size-4" />
          ) : (
            <PanelLeftClose className="size-4" />
          )}
        </button>
      </div>

      <nav
        className={cn(
          "custom-scrollbar flex-1 overflow-y-auto pb-6",
          collapsed ? "px-2" : "px-4"
        )}
      >
        <div className="flex flex-col gap-7">
          {ADMIN_NAV.map((group) => (
            <div key={group.heading} className="flex flex-col gap-2">
              {!collapsed && (
                <p className="px-3 font-inter text-xs font-medium uppercase leading-3 text-white/80">
                  {group.heading}
                </p>
              )}
              <div className="flex flex-col gap-0.5">
                {group.items.map((item) => (
                  <NavLink
                    key={item.href}
                    item={item}
                    active={isActive(pathname, item.href)}
                    collapsed={collapsed}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>

      <div
        className={cn(
          "shrink-0 border-t border-yellow-700/50 py-4",
          collapsed ? "px-2" : "px-4"
        )}
      >
        <Link
          href="/"
          title={collapsed ? "View public site" : undefined}
          className={cn(
            "flex h-11 items-center gap-2.5 rounded-xl font-inter text-sm font-medium text-white/80 transition-colors hover:bg-white/5 hover:text-white",
            collapsed ? "justify-center px-0" : "px-3"
          )}
        >
          <ExternalLink className="size-3.5 shrink-0" />
          {!collapsed && "View public site"}
        </Link>
      </div>
    </aside>
  );
}
