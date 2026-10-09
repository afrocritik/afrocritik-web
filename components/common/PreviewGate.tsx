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
        className="pointer-events-none relative z-0 max-h-[900px] select-none overflow-hidden"
        style={{ isolation: "isolate" }}
        aria-hidden
        // @ts-expect-error — `inert` isn't in React 18's HTML attribute types yet
        inert=""
      >
        {children}
      </div>
      <div
        className="absolute inset-x-0 bottom-0 flex h-[520px] items-end justify-center px-6 pb-10"
        style={{
          zIndex: 50,
          background:
            "linear-gradient(180deg, rgba(22,9,7,0) 0%, rgba(22,9,7,0.85) 45%, #160907 80%)",
        }}
      >
        <div className="w-full max-w-[520px] rounded-2xl border border-[#9C5C08] p-6 text-center shadow-2xl"
          style={{ background: "#2C1500" }}>
          <h2
            className="font-baskervville text-2xl md:text-3xl"
            style={{ color: "#FFFFFF" }}
          >
            Sign in to keep reading
          </h2>
          <p
            className="mt-3 font-inter text-lg leading-relaxed"
            style={{ color: "#F3E5D0" }}
          >
            Create a free account to unlock the full page — timelines, media archive, related
            works and more.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link
              href={`/signin?callbackUrl=${next}`}
              className="inline-flex h-12 items-center rounded-lg px-7 font-inter text-lg font-semibold transition-opacity hover:opacity-90"
              style={{ color: "#422006", background: "linear-gradient(42deg, #A16207 15%, #FB923C 81%)" }}
            >
              Sign in
            </Link>
            <Link
              href={`/signup?callbackUrl=${next}`}
              className="inline-flex h-12 items-center rounded-lg border-2 px-7 font-inter text-lg font-semibold transition-colors hover:bg-white/10"
              style={{ color: "#FFFFFF", borderColor: "#ED9828" }}
            >
              Create account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
