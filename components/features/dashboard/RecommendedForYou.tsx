import Link from "next/link";
import { RECOMMENDED } from "./constants";

export function RecommendedForYou() {
  return (
    <div className="h-full rounded-xl border border-amber-line bg-white/[0.03] p-5">
      <h2 className="font-montserrat text-lg font-semibold text-white">
        Recommended for you
      </h2>
      <ul className="mt-4 flex flex-col gap-4">
        {RECOMMENDED.map((item) => (
          <li key={item.slug}>
            <Link
              href={`/works/${item.slug}`}
              className="group flex items-center gap-3"
            >
              <div className="size-12 shrink-0 overflow-hidden rounded-md bg-bg-secondary">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-inter text-sm font-semibold text-white transition-colors group-hover:text-amber">
                  {item.title}
                </p>
                <p className="truncate font-inter text-xs text-ink-muted">
                  {item.type}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
