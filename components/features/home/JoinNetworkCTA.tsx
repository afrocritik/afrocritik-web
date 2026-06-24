import Link from "next/link";

interface CtaContent {
  heading?: string;
  subheading?: string;
  primaryButtonLabel?: string;
  secondaryButtonLabel?: string;
  tertiaryButtonLabel?: string;
}

export function JoinNetworkCTA({ cta }: Readonly<{ cta?: CtaContent }>) {
  const heading =
    cta?.heading || "Join The Network Building Africa's Cultural Infrastructure";
  const subheading =
    cta?.subheading ||
    "Whether you're a scholar, critic, funder, or creative — the Afrocritik Institute is building something that must exist. The question is whether you'll help shape it.";
  const primaryLabel = cta?.primaryButtonLabel || "SUBSCRIBE";
  const secondaryLabel = cta?.secondaryButtonLabel || "Become a Contributor";
  const tertiaryLabel = cta?.tertiaryButtonLabel || "Partner with Us";

  return (
    <div className="container flex flex-col items-center text-center">
      <h2 className="w-[681px] text-center justify-center text-white text-5xl font-bold font-baskervville capitalize leading-[52.80px]">
        {heading}
      </h2>
      <p className="w-[704px] text-center justify-center text-orange-100 text-sm font-semibold font-inter capitalize leading-relaxed pt-4">
        {subheading}
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        {/* Subscribe */}
        <Link
          href="/signup"
          className="inline-flex w-48 h-14 px-7 py-2.5 justify-center items-center gap-2.5 rounded-xl"
          style={{ background: "linear-gradient(42deg, #92400E 15%, #FB923C 81%)" }}
        >
          <span className="text-yellow-950 text-xl font-medium font-inter capitalize leading-7">
            {primaryLabel}
          </span>
        </Link>

        {/* Become a Contributor */}
        <Link
          href="/signup"
          className="group inline-flex w-52 h-14 justify-center items-center rounded-lg outline outline-1 outline-offset-[-1px] outline-orange-400 transition-colors hover:outline-transparent hover:bg-[linear-gradient(42deg,_#92400E_15%,_#FB923C_81%)]"
        >
          <span className="whitespace-nowrap text-white group-hover:text-yellow-950 text-base font-semibold font-inter leading-5 transition-colors">
            {secondaryLabel}
          </span>
        </Link>

        {/* Partner with Us */}
        <Link
          href="#"
          className="group inline-flex w-48 h-14 justify-center items-center rounded-lg outline outline-1 outline-offset-[-1px] outline-orange-400 transition-colors hover:outline-transparent hover:bg-[linear-gradient(42deg,_#92400E_15%,_#FB923C_81%)]"
        >
          <span className="whitespace-nowrap text-white group-hover:text-yellow-950 text-base font-semibold font-inter leading-5 transition-colors">
            {tertiaryLabel}
          </span>
        </Link>
      </div>
    </div>
  );
}
