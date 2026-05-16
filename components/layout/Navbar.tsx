"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import { Logo } from "./Logo";

const NAV_LINKS = [
  { label: "Archive", href: "/explore" },
  { label: "Ideas", href: "/explore?tab=ideas" },
  { label: "People", href: "/explore?tab=people" },
  { label: "Reports", href: "/explore?tab=reports" },
];

export function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  // The landing page carries its own hero search — keep the nav bar clean there.
  const showSearch = pathname !== "/";

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) router.push(`/explore?q=${encodeURIComponent(query)}`);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-amber-line bg-bg-primary/95 backdrop-blur">
      <div className="container flex h-[72px] items-center justify-between gap-4">
        <Logo />

        {/* Center search — hidden on the landing page */}
        {showSearch ? (
          <form
            onSubmit={submitSearch}
            className="relative hidden max-w-xl flex-1 md:block"
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

        {/* Right actions */}
        <div className="flex items-center gap-3 shrink-0">
          <Button
            asChild
            className="hidden rounded-md bg-amber px-6 text-white hover:bg-amber-hover md:flex"
          >
            <Link href="/explore">Explore</Link>
          </Button>

          {session ? (
            <Avatar className="h-10 w-10 cursor-pointer border border-amber-line">
              <AvatarImage src={session.user?.image || ""} alt="User" />
              <AvatarFallback className="bg-bg-secondary text-amber">
                {session.user?.name?.[0]?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
          ) : (
            <Button
              asChild
              variant="outline"
              className="hidden rounded-md border-amber-line bg-transparent text-white hover:bg-amber-soft md:flex"
            >
              <Link href="/signin">Sign in</Link>
            </Button>
          )}

          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="p-2 text-white transition-colors hover:text-amber"
            aria-label="Menu"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
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
