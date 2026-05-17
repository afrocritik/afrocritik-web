import Link from "next/link";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  linkText?: string;
  linkHref?: string;
  theme?: "dark" | "light";
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  linkText,
  linkHref,
  theme = "dark",
  align = "left",
  className,
}: Readonly<SectionHeadingProps>) {
  const light = theme === "light";
  const centered = align === "center";

  return (
    <div
      className={cn(
        "mb-8 flex gap-4",
        centered
          ? "flex-col items-center text-center"
          : "flex-col md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className="max-w-2xl">
        <h2
          className={cn(
            "font-montserrat w-[698px] justify-center text-white text-4xl font-bold md:text-[32px] md:leading-tight capitalize leading-10",
            light ? "text-ink-dark" : "text-white",
          )}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            className={cn(
              "mt-2 text-sm md:text-base",
              light ? "text-[#6B4A2A]" : "text-ink-secondary",
            )}
          >
            {subtitle}
          </p>
        )}
      </div>
      {linkText && linkHref && (
        <Link
          href={linkHref}
          className="shrink-0 text-sm font-medium text-amber transition-colors hover:text-amber-hover"
        >
          {linkText}
        </Link>
      )}
    </div>
  );
}
