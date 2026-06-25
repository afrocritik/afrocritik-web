"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LogOut, Plus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signOut, useSession } from "next-auth/react";
import { MegaMenu } from "@/components/layout/MegaMenu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const QUICK_CREATE = [
  { label: "Work", href: "/admin/works/new" },
  { label: "Person", href: "/admin/people/new" },
  { label: "Idea", href: "/admin/ideas/new" },
  { label: "Report", href: "/admin/reports/new" },
];

function HamburgerIcon() {
  return (
    <div className="flex size-16 items-center justify-center overflow-hidden">
      <Image src="/Menu-Icon.png" alt="Menu" width={48} height={32} />
    </div>
  );
}

export function AdminTopbar() {
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
      <div className="flex items-center gap-5 px-6 pt-6 pb-5 md:px-8">
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
            className="h-[72px] w-full rounded-xl border border-amber-line bg-zinc-300/30 pl-[76px] pr-5 font-inter text-lg text-white placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-amber"
          />
        </form>

        <div className="flex items-center gap-5 shrink-0">
          <button
            type="button"
            aria-label="Notifications"
            className="flex size-16 items-center justify-center transition-opacity hover:opacity-70"
          >
            <Image
              src="/dashboard-notification-icon.png"
              alt="Notifications"
              width={40}
              height={40}
              className="size-10 object-contain"
            />
          </button>

          <button
            onClick={() => setMenuOpen(true)}
            className="transition-opacity hover:opacity-70"
            aria-label="Menu"
          >
            <HamburgerIcon />
          </button>

          <Popover>
            <PopoverTrigger asChild>
              <button
                type="button"
                className="hidden md:inline-flex h-[60px] items-center justify-center gap-2.5 rounded-xl px-7 py-2.5 font-inter text-2xl font-medium capitalize leading-8 text-yellow-950 transition-opacity hover:opacity-90"
                style={{
                  background: "linear-gradient(42deg, #A16207 15%, #FB923C 81%)",
                }}
              >
                <Plus className="size-6" />
                Add New
              </button>
            </PopoverTrigger>
            <PopoverContent
              align="end"
              className="w-48 border-yellow-700/60 bg-[#2C1500] p-1"
            >
              {QUICK_CREATE.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block rounded-md px-3 py-2 font-inter text-sm text-white transition-colors hover:bg-white/5"
                >
                  New {item.label}
                </Link>
              ))}
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <button type="button" aria-label="Account menu" className="rounded-full">
                <Avatar className="size-12 cursor-pointer overflow-hidden rounded-full">
                  <AvatarImage
                    src={session?.user?.image || "/Interest-Avatar.png"}
                    alt="Admin"
                    className="size-12 object-cover"
                  />
                  <AvatarFallback className="bg-bg-secondary text-amber">
                    {session?.user?.name?.[0]?.toUpperCase() || "A"}
                  </AvatarFallback>
                </Avatar>
              </button>
            </PopoverTrigger>
            <PopoverContent
              align="end"
              className="w-56 border-yellow-700/60 bg-[#2C1500] p-1"
            >
              <div className="px-3 py-2">
                <p className="truncate font-inter text-sm font-medium text-white">
                  {session?.user?.name || "Admin"}
                </p>
                {session?.user?.email && (
                  <p className="truncate font-inter text-xs text-white/50">
                    {session.user.email}
                  </p>
                )}
              </div>
              <div className="my-1 h-px bg-yellow-700/40" />
              <Link
                href="/"
                className="block rounded-md px-3 py-2 font-inter text-sm text-white transition-colors hover:bg-white/5"
              >
                View site
              </Link>
              <button
                type="button"
                onClick={() => signOut({ callbackUrl: "/" })}
                className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left font-inter text-sm text-red-300 transition-colors hover:bg-white/5"
              >
                <LogOut className="size-4" />
                Logout
              </button>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <MegaMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
