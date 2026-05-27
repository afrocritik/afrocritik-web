import Link from "next/link";
import { Logo } from "./Logo";

const SOCIALS = [
  {
    label: "Discord",
    href: "#",
    path: "M20.32 4.37A19.79 19.79 0 0 0 15.43 2.85a.07.07 0 0 0-.08.04c-.21.37-.44.86-.6 1.24a18.27 18.27 0 0 0-5.5 0c-.16-.39-.4-.87-.62-1.24a.08.08 0 0 0-.08-.04A19.74 19.74 0 0 0 3.68 4.37a.07.07 0 0 0-.03.03C.53 9.05-.32 13.58.1 18.06a.08.08 0 0 0 .03.06 19.9 19.9 0 0 0 5.99 3.03.08.08 0 0 0 .08-.03c.46-.63.87-1.3 1.23-2a.08.08 0 0 0-.04-.1 13.1 13.1 0 0 1-1.87-.9.08.08 0 0 1 0-.12l.37-.3a.07.07 0 0 1 .08 0c3.93 1.8 8.18 1.8 12.06 0a.07.07 0 0 1 .08 0l.37.3a.08.08 0 0 1 0 .12c-.6.35-1.22.65-1.87.9a.08.08 0 0 0-.04.1c.36.7.78 1.36 1.23 2a.08.08 0 0 0 .08.03 19.84 19.84 0 0 0 6-3.03.08.08 0 0 0 .04-.05c.5-5.18-.84-9.67-3.55-13.66a.06.06 0 0 0-.03-.03ZM8.02 15.33c-1.18 0-2.16-1.08-2.16-2.42 0-1.33.96-2.42 2.16-2.42 1.2 0 2.18 1.1 2.16 2.42 0 1.34-.96 2.42-2.16 2.42Zm7.97 0c-1.18 0-2.15-1.08-2.15-2.42 0-1.33.95-2.42 2.15-2.42 1.21 0 2.18 1.1 2.16 2.42 0 1.34-.95 2.42-2.16 2.42Z",
  },
  {
    label: "YouTube",
    href: "#",
    path: "M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.2C0 8.07 0 12 0 12s0 3.93.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.81ZM9.55 15.57V8.43L15.82 12l-6.27 3.57Z",
  },
  {
    label: "Twitter",
    href: "#",
    path: "M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.68l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23Zm-1.16 17.52h1.83L7.08 4.13H5.12L17.08 19.77Z",
  },
  {
    label: "Instagram",
    href: "#",
    path: "M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85 0 3.2-.01 3.58-.07 4.85-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07-3.2 0-3.58-.01-4.85-.07-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.65-.07-4.85 0-3.2.01-3.58.07-4.85.15-3.23 1.67-4.77 4.92-4.92C8.42 2.17 8.8 2.16 12 2.16ZM12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12c0 3.26.01 3.67.07 4.95.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24c3.26 0 3.67-.01 4.95-.07 4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95 0-3.26-.01-3.67-.07-4.95-.2-4.35-2.62-6.78-6.98-6.98C15.67.01 15.26 0 12 0Zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.41-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88Z",
  },
];

const EXPLORE_LINKS = [
  { label: "Archive", href: "/explore" },
  { label: "Ideas", href: "/explore?tab=ideas" },
  { label: "People", href: "/explore?tab=people" },
  { label: "Reports", href: "/explore?tab=reports" },
];

const INSTITUTE_LINKS = [
  { label: "Five Pillars", href: "/#pillars" },
  { label: "African Philosophy", href: "/#philosophy" },
  { label: "Prize for Criticism", href: "#" },
  { label: "Contribute", href: "#" },
];

import { cn } from "@/lib/utils";

export function Footer({ className }: Readonly<{ className?: string }>) {
  return (
    <footer className={cn("border-t border-amber-line bg-base pt-16 pb-24", className)}>
      <div className="container grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-[1fr_auto_auto_1fr]">
        {/* Brand */}
        <div className="flex flex-col gap-3">
          <Logo />
          <p className="max-w-xs font-inter text-xs font-semibold capitalize leading-relaxed text-neutral-500">
            A Pan-African Non-Profit Cultural Institution Building The
            Infrastructure For African Cultural Criticism, With Bases In Lagos
            And Long Beach.
          </p>
          <div className="flex flex-col gap-3.5">
            <p className="font-inter text-base font-normal leading-6 text-stone-300">
              Join our community
            </p>
            <div className="flex items-center gap-2.5">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex size-8 items-center justify-center text-zinc-500 transition-colors hover:text-amber"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Explore */}
        <div className="w-32">
          <h4 className="mb-6 font-baskervville text-xl font-bold capitalize leading-9 text-amber">Explore</h4>
          <ul className="flex flex-col gap-2 font-inter text-base text-stone-300">
            {EXPLORE_LINKS.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Institute */}
        <div className="w-40">
          <h4 className="mb-6 font-baskervville text-xl font-bold capitalize leading-9 text-amber">Institute</h4>
          <ul className="flex flex-col gap-2 font-inter text-base text-stone-300">
            {INSTITUTE_LINKS.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="mb-6 text-2xl font-bold capitalize leading-9 text-white font-baskervville">
            Join Our Weekly Digest
          </h4>
          <div className="flex flex-col gap-5">
            <p className="max-w-xs font-inter text-base leading-6 text-stone-300">
              Get useful articles in your inbox every week.
            </p>
            <form className="flex h-14 items-center gap-3 rounded-[20px] bg-white pl-5">
              <input
                type="email"
                placeholder="Enter your email here"
                className="min-w-0 flex-1 bg-transparent font-inter text-base text-zinc-800 placeholder:text-zinc-500 focus:outline-none"
              />
              <button
                type="submit"
                className="h-14 w-40 shrink-0 rounded-[20px] bg-gradient-to-r from-yellow-700 to-orange-400 font-inter text-base font-semibold text-white transition-opacity hover:opacity-90"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
}
