import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  href = "/",
}: {
  className?: string;
  href?: string;
}) {
  return (
    <Link
      href={href}
      className={cn("flex items-center gap-2.5 group shrink-0", className)}
    >
      <svg
        viewBox="0 0 32 32"
        className="h-8 w-8 text-amber transition-transform group-hover:-rotate-6"
        fill="none"
      >
        <path
          d="M24.5 5.5c-7 1-13 6-15.5 13.5l-3 8.5 8.5-3C22 22 27 16 28 9l-3.5-3.5Z"
          fill="currentColor"
        />
        <path
          d="M6 27 17 16"
          stroke="#1C0A00"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="text-xl font-bold tracking-tight text-white font-sans">
          afrocritik
        </span>
        <span className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.25em] text-amber">
          Institute
        </span>
      </span>
    </Link>
  );
}
