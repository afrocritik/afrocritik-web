import Link from "next/link";
import { RECOMMENDED } from "./constants";

export function RecommendedForYou() {
  return (
    <div className="h-full rounded-xl border border-yellow-700 bg-[#50321C80] p-5">
      <h2 className="font-['Baskervville'] text-xl font-semibold leading-5 text-white">
        Recommended for you
      </h2>
      <ul className="mt-5 flex flex-col gap-5">
        {RECOMMENDED.map((item) => (
          <li key={item.slug}>
            <Link
              href={`/works/${item.slug}`}
              className="group flex items-start gap-3.5"
            >
              <div className="h-[72px] w-16 shrink-0 overflow-hidden rounded-md bg-bg-secondary">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="line-clamp-1 font-inter text-sm font-normal leading-[1.3] text-white transition-colors group-hover:line-clamp-none group-hover:text-amber">
                  {item.title}
                </p>
                {item.subtitle && (
                  <p className="mt-1 line-clamp-1 font-inter text-[10px] font-light leading-[1.3] text-white/60 group-hover:line-clamp-none">
                    {item.subtitle}
                  </p>
                )}
                <span className="mt-2 inline-flex items-center rounded-[3px] bg-yellow-800/70 px-[6px] py-[3.5px] font-inter text-[8px] font-normal leading-none text-white">
                  {item.type}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
