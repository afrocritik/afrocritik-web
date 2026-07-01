"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import { Logo } from "./Logo";
import { MegaMenu } from "./MegaMenu";

function HamburgerIcon() {
  return (
    <div className="flex size-11 items-center justify-center overflow-hidden sm:size-16">
      <Image src="/Menu-Icon.png" alt="Menu" width={48} height={32} className="w-8 sm:w-12" />
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
      <div className="container flex items-center gap-3 pt-5 pb-4 sm:gap-5 sm:pt-6 sm:pb-5">
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
        <div className="flex items-center gap-3 shrink-0 sm:gap-5">
          {/* Hamburger — first on the right */}
          <button
            onClick={() => setMenuOpen(true)}
            className="transition-opacity hover:opacity-70"
            aria-label="Menu"
          >
            <HamburgerIcon />
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
              className="inline-flex h-11 w-auto px-4 sm:h-[60px] sm:w-[162px] sm:px-0 items-center justify-center gap-2.5 rounded-xl transition-opacity hover:opacity-90"
              style={{
                background: "linear-gradient(42deg, #A16207 15%, #FB923C 81%)",
              }}
            >
              <span className="font-inter text-base sm:text-2xl font-medium capitalize leading-8 text-yellow-950 whitespace-nowrap">
                Sign in
              </span>
            </Link>
          )}
        </div>
      </div>

      <MegaMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
