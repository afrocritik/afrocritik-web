"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "./constants";
import { DashboardNavIcon } from "./DashboardNavIcon";

/**
 * The dashboard sidebar is hidden below `lg`, so small-screen users need a
 * separate way to move between dashboard sections. This is a horizontally
 * scrollable pill bar shown only under `lg`, mirroring the sidebar's items
 * plus a logout action.
 */
export function DashboardMobileNav() {
  const pathname = usePathname();

  return (
    <nav className="lg:hidden border-b border-yellow-700/60 bg-[#50321C80]">
      <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar px-4 py-3">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex shrink-0 items-center gap-2 rounded-full px-4 py-2 font-inter text-sm font-semibold leading-4 transition-colors",
                active
                  ? "bg-[#50321C] outline outline-1 outline-offset-[-0.89px] outline-yellow-700 text-orange-400"
                  : "text-white hover:bg-white/5"
              )}
            >
              <DashboardNavIcon icon={item.icon} active={active} />
              {item.label}
            </Link>
          );
        })}

        <button
          type="button"
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex shrink-0 items-center gap-2 rounded-full bg-white/10 px-4 py-2 font-inter text-sm font-semibold leading-4 text-white transition-colors hover:bg-white/15"
        >
          <LogOut className="size-4 shrink-0" />
          Logout
        </button>
      </div>
    </nav>
  );
}
