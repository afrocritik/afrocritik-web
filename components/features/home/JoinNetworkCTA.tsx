import Link from "next/link";

export function JoinNetworkCTA() {
  return (
    <div className="container flex flex-col items-center text-center">
      <h2 className="w-[681px] text-center justify-center text-white text-5xl font-bold font-['Baskervville'] capitalize leading-[52.80px]">
        Join The Network Building Africa&apos;s Cultural Infrastructure
      </h2>
      <p className="w-[704px] h-20 text-center justify-center text-orange-100 text-sm font-semibold font-sans capitalize leading-4 pt-4">
        Whether you&apos;re a scholar, critic, funder, or creative — the
        Afrocritik Institute is building something that must exist. The question
        is whether you&apos;ll help shape it.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {/* Subscribe */}
        <Link
          href="/signup"
          className="inline-flex w-48 h-14 px-7 py-2.5 justify-center items-center gap-2.5 rounded-xl"
          style={{ background: "linear-gradient(42deg, #92400E 15%, #FB923C 81%)" }}
        >
          <span className="text-yellow-950 text-xl font-medium font-sans capitalize leading-7">
            SUBSCRIBE
          </span>
        </Link>

        {/* Become a Contributor */}
        <Link
          href="/signup"
          className="inline-flex w-52 h-14 justify-center items-center rounded-lg outline outline-1 outline-offset-[-1px] outline-orange-400"
        >
          <span className="whitespace-nowrap text-white text-base font-semibold font-sans leading-5">
            Become a Contributor
          </span>
        </Link>

        {/* Partner with Us */}
        <Link
          href="#"
          className="inline-flex w-48 h-14 justify-center items-center rounded-lg outline outline-1 outline-offset-[-1px] outline-orange-400"
        >
          <span className="whitespace-nowrap text-white text-base font-semibold font-sans leading-5">
            Partner with Us
          </span>
        </Link>
      </div>
    </div>
  );
}
