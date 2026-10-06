"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import { Logo } from "./Logo";
import { MegaMenu } from "./MegaMenu";

function HamburgerIcon() {
  return (
    <div className="flex size-10 items-center justify-center overflow-hidden sm:size-12 lg:size-16">
      <Image src="/icons/ui/menu.png" alt="Menu" width={48} height={32} className="w-8 sm:w-12" />
    </div>
  );
}

/**
 * Signed-in app chrome for the dashboard. Differs from the marketing `Navbar`:
 * search is always present and there's a notification bell.
 */
export function DashboardNavbar() {
  const { data: session } = useSession();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) router.push(`/explore?q=${encodeURIComponent(query)}`);
  };

  return (
    <header className="w-full">
      <div className="flex items-center gap-2 px-4 pt-5 pb-4 sm:gap-5 sm:px-6 sm:pt-6 sm:pb-5 md:px-8">
        {/* Brand — only on small screens, where the sidebar (which holds the
            logo) is hidden */}
        <Logo className="lg:hidden" />

        {/* Center search — always visible on the dashboard */}
        <form
          onSubmit={submitSearch}
          className="relative hidden h-14 min-w-0 flex-1 md:block lg:h-[72px]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="58"
            height="58"
            viewBox="0 0 70 71"
            fill="none"
            className="pointer-events-none absolute left-2 top-1/2 size-11 -translate-y-1/2 lg:left-3 lg:size-[58px]"
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
            className="h-14 w-full rounded-xl border border-amber-line bg-zinc-300/30 pl-14 pr-4 font-inter text-base text-white lg:h-[72px] lg:pl-[76px] lg:pr-5 lg:text-lg placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-amber"
          />
        </form>

        {/* Right actions: Bell → Hamburger → Explore → Avatar */}
        <div className="ml-auto flex shrink-0 items-center gap-0.5 sm:gap-3 lg:gap-5">
          {/* Phones have no search bar — a shortcut to the archive search */}
          <Link
            href="/explore"
            aria-label="Search"
            className="flex size-10 items-center justify-center text-[#F3E5D0] transition-opacity hover:opacity-70 md:hidden"
          >
            <Search className="size-6" />
          </Link>

          {/* Notifications */}
          <button
            type="button"
            aria-label="Notifications"
            className="flex size-10 items-center justify-center transition-opacity hover:opacity-70 sm:size-12 lg:size-16"
          >
            <Image
              src="/icons/dashboard/notification.png"
              alt="Notifications"
              width={40}
              height={40}
              className="size-7 object-contain sm:size-8 lg:size-10"
            />
          </button>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(true)}
            className="transition-opacity hover:opacity-70"
            aria-label="Menu"
          >
            <HamburgerIcon />
          </button>

          {/* Explore */}
          <Link
            href="/explore"
            className="hidden md:inline-flex h-12 items-center justify-center gap-2.5 rounded-xl px-5 py-2 font-inter text-lg font-medium capitalize leading-8 lg:h-[60px] lg:px-7 lg:py-2.5 lg:text-2xl text-yellow-950 transition-opacity hover:opacity-90"
            style={{
              background: "linear-gradient(42deg, #A16207 15%, #FB923C 81%)",
            }}
          >
            Explore
          </Link>

          {/* Avatar */}
          <Avatar className="ml-1 size-10 cursor-pointer overflow-hidden rounded-full sm:ml-0 sm:size-12">
            <AvatarImage
              src={session?.user?.image || "/images/avatars/default-avatar.png"}
              alt="User"
              className="size-full object-cover"
            />
            <AvatarFallback className="bg-bg-secondary text-amber">
              {session?.user?.name?.[0]?.toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      <MegaMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
