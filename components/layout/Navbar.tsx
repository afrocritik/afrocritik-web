"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { Search, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import { Logo } from "./Logo";

const NAV_LINKS = [
  { label: "Archive", href: "/explore" },
  { label: "Ideas", href: "/explore?tab=ideas" },
  { label: "People", href: "/explore?tab=people" },
  { label: "Reports", href: "/explore?tab=reports" },
];

function HamburgerIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="36"
      height="24"
      viewBox="0 0 40 28"
      fill="none"
    >
      <path
        d="M2 14H38M2 2H38M2 26H38"
        stroke="#F3E5D0"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const showSearch = pathname !== "/";

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) router.push(`/explore?q=${encodeURIComponent(query)}`);
  };

  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-amber-line backdrop-blur"
      style={{ background: "#3B1E08" }}
    >
      <div className="container flex h-[141px] items-center gap-6">
        <Logo />

        {/* Center search — only on interior pages */}
        {showSearch ? (
          <form
            onSubmit={submitSearch}
            className="relative hidden max-w-xl flex-1 md:block ml-2"
          >
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-muted" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Works, Ideas, People, Reports..."
              className="w-full rounded-full border border-amber-line bg-bg-secondary py-2.5 pl-11 pr-4 text-sm text-white placeholder:text-ink-muted focus:border-amber focus:outline-none focus:ring-1 focus:ring-amber"
            />
          </form>
        ) : (
          <div className="flex-1" />
        )}

        {/* Right actions: Hamburger → Sign In */}
        <div className="flex items-center gap-5 shrink-0">
          {/* Explore — interior pages only */}
          {showSearch && (
            <Link
              href="/explore"
              className="hidden md:inline-flex items-center justify-center px-[30px] py-[10px] rounded-xl text-sm font-semibold text-white"
              style={{
                background:
                  "linear-gradient(103deg, #9C5C08 15.53%, #ED9828 70.3%)",
              }}
            >
              Explore
            </Link>
          )}

          {/* Hamburger — before Sign In */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="transition-opacity hover:opacity-70"
            aria-label="Menu"
          >
            {menuOpen ? (
              <X className="h-7 w-7 text-[#F3E5D0]" />
            ) : (
              <HamburgerIcon />
            )}
          </button>

          {/* Sign In / Avatar */}
          {session ? (
            <Avatar className="h-10 w-10 cursor-pointer border border-amber-line">
              <AvatarImage src={session.user?.image || ""} alt="User" />
              <AvatarFallback className="bg-bg-secondary text-amber">
                {session.user?.name?.[0]?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
          ) : (
            <Link
              href="/signin"
              className="inline-flex items-center justify-center gap-[10px] rounded-xl transition-opacity hover:opacity-90"
              style={{
                width: "146px",
                height: "54px",
                background:
                  "linear-gradient(103deg, #9C5C08 15.53%, #ED9828 70.3%)",
                color: "#4D311D",
                fontFamily: "var(--font-inter)",
                fontSize: "24px",
                fontWeight: 500,
                lineHeight: "140%",
                textTransform: "capitalize",
              }}
            >
              Sign in
            </Link>
          )}
        </div>
      </div>

      {menuOpen && (
        <nav className="border-t border-amber-line bg-bg-secondary">
          <div className="container flex flex-col py-4">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="py-2.5 text-sm text-ink-secondary transition-colors hover:text-amber"
              >
                {l.label}
              </Link>
            ))}
            {!session && (
              <Link
                href="/signin"
                onClick={() => setMenuOpen(false)}
                className="py-2.5 text-sm font-medium text-amber"
              >
                Sign in
              </Link>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
