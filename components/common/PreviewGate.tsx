import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Soft sign-in wall for detail pages. Signed-in users get the page untouched;
 * signed-out visitors see the top of it (hero + first sections) clipped by a
 * fade, with a sign-in / sign-up prompt where the content cuts off — enough
 * of a taste of the page to want the rest.
 *
 * Note this is a presentation gate: the clipped content is still in the
 * server-rendered HTML. Keep anything genuinely private out of these pages.
 */
export function PreviewGate({
  locked,
  callbackUrl,
  children,
}: Readonly<{ locked: boolean; callbackUrl: string; children: ReactNode }>) {
  if (!locked) return <>{children}</>;

  const next = encodeURIComponent(callbackUrl);

  return (
    <div className="relative">
      <div
        className="pointer-events-none max-h-[900px] select-none overflow-hidden"
        aria-hidden
        // @ts-expect-error — `inert` isn't in React 18's HTML attribute types yet
        inert=""
      >
        {children}
      </div>
      <div
        className="absolute inset-x-0 bottom-0 flex h-[520px] items-end justify-center px-6 pb-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(22,9,7,0) 0%, rgba(22,9,7,0.85) 45%, #160907 80%)",
        }}
      >
        <div className="w-full max-w-[520px] rounded-2xl border border-[#9C5C08] bg-[#2C1500]/90 p-6 text-center backdrop-blur">
          <h2 className="font-baskervville text-2xl text-white md:text-3xl">
            Sign in to keep reading
          </h2>
          <p className="mt-2 font-inter text-base text-[#E7D8C3]">
            Create a free account to unlock the full page — timelines, media archive, related
            works and more.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link
              href={`/signin?callbackUrl=${next}`}
              className="inline-flex h-11 items-center rounded-lg px-6 font-inter text-base font-medium text-yellow-950 transition-opacity hover:opacity-90"
              style={{ background: "linear-gradient(42deg, #A16207 15%, #FB923C 81%)" }}
            >
              Sign in
            </Link>
            <Link
              href={`/signup?callbackUrl=${next}`}
              className="inline-flex h-11 items-center rounded-lg border border-[#9C5C08] px-6 font-inter text-base font-medium text-[#F3E5D0] transition-colors hover:bg-white/5"
            >
              Create account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
