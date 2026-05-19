"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { X } from "lucide-react";
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
    <div className="flex size-16 items-center justify-center overflow-hidden">
      <Image src="/Menu-Icon.png" alt="Menu" width={48} height={32} />
    </div>
  );
}

export function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const showSearch = pathname !== "/";
  const showAvatar = !!session || showSearch;

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) router.push(`/explore?q=${encodeURIComponent(query)}`);
  };

  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-amber-line backdrop-blur"
      style={{ background: "#3B1E08" }}
    >
      <div className="container flex items-center gap-5 pt-6 pb-5">
        <Logo />

        {/* Center search — only on interior pages */}
        {showSearch ? (
          <form
            onSubmit={submitSearch}
            className="relative hidden h-[72px] flex-1 md:block"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="58"
              height="58"
              viewBox="0 0 70 71"
              fill="none"
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2"
            >
              <path
                d="M49.37 50.1779L59.5 60.0721M33.25 21.2019C39.049 21.2019 43.75 25.9481 43.75 31.8029M56.2333 33.6875C56.2333 46.4378 45.9956 56.774 33.3667 56.774C20.7378 56.774 10.5 46.4378 10.5 33.6875C10.5 20.9371 20.7378 10.601 33.3667 10.601C45.9956 10.601 56.2333 20.9371 56.2333 33.6875Z"
                stroke="rgba(212, 212, 216, 0.30)"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Works, Ideas, People, Reports..."
              className="h-[72px] w-full rounded-xl bg-zinc-300/30 pl-[76px] pr-5 font-inter text-lg text-white placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-amber"
            />
          </form>
        ) : (
          <div className="flex-1" />
        )}

        {/* Right actions: Hamburger → Explore → Avatar/Sign In */}
        <div className="flex items-center gap-5 shrink-0">
          {/* Hamburger — first on the right */}
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

          {/* Explore — interior pages only */}
          {showSearch && (
            <Link
              href="/explore"
              className="hidden md:inline-flex h-[60px] items-center justify-center gap-2.5 rounded-xl px-7 py-2.5 font-inter text-2xl font-medium capitalize leading-8 text-yellow-950 transition-opacity hover:opacity-90"
              style={{
                background: "linear-gradient(42deg, #A16207 15%, #FB923C 81%)",
              }}
            >
              Explore
            </Link>
          )}

          {/* Sign In / Avatar */}
          {showAvatar ? (
            <Avatar className="size-12 cursor-pointer overflow-hidden rounded-full">
              <AvatarImage
                src={session?.user?.image || "/Interest-Avatar.png"}
                alt="User"
                className="size-12 object-cover"
              />
              <AvatarFallback className="bg-bg-secondary text-amber">
                {session?.user?.name?.[0]?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
          ) : (
            <Link
              href="/signin"
              className="inline-flex h-[60px] w-[162px] items-center justify-center gap-2.5 rounded-xl transition-opacity hover:opacity-90"
              style={{
                background: "linear-gradient(42deg, #A16207 15%, #FB923C 81%)",
              }}
            >
              <span className="font-inter text-2xl font-medium capitalize leading-8 text-yellow-950">
                Sign in
              </span>
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
