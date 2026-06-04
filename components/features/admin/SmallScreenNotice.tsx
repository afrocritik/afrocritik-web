import Link from "next/link";
import { Laptop, ArrowLeft } from "lucide-react";
import { Logo } from "@/components/layout/Logo";

/**
 * Shown in place of the admin on screens narrower than `lg` (1024px).
 * The admin tooling is dense and laptop-oriented, so we steer small-screen
 * visitors to a larger device rather than degrade the experience.
 */
export function SmallScreenNotice() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-[#160907] px-6 py-12 text-center">
      <Logo href="/" />

      <div className="flex w-full max-w-md flex-col items-center gap-5 rounded-2xl border border-yellow-700 p-8" style={{ background: "#50321C80" }}>
        <span className="flex size-16 items-center justify-center rounded-full bg-yellow-950/60 text-orange-300">
          <Laptop className="size-8" />
        </span>

        <div className="flex flex-col gap-2">
          <h1 className="font-baskervville text-2xl font-semibold leading-7 text-white">
            Best viewed on a larger screen
          </h1>
          <p className="font-inter text-sm font-light leading-6 text-orange-100">
            The Afrocritik admin is built for managing content on laptops and
            desktops. Please switch to a device with a larger screen to
            continue.
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex h-11 items-center gap-2 rounded-xl px-5 font-inter text-sm font-medium text-yellow-950 transition-opacity hover:opacity-90"
          style={{ background: "linear-gradient(42deg, #A16207 15%, #FB923C 81%)" }}
        >
          <ArrowLeft className="size-4" />
          Back to site
        </Link>
      </div>
    </div>
  );
}
