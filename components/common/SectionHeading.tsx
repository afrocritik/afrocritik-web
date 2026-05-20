import Link from "next/link";
import { cn } from "@/lib/utils";

function HeadingTitle({
  title,
  font,
}: Readonly<{ title: string; font: "sans" | "serif" }>) {
  return (
    <h2
      className={cn(
        "max-w-2xl text-white text-3xl font-bold capitalize leading-tight md:text-4xl",
        font === "serif" ? "font-baskervville" : "font-montserrat",
      )}
    >
      {title}
    </h2>
  );
}

function ViewAllLink({
  text,
  href,
  bleedRight,
}: Readonly<{ text: string; href: string; bleedRight?: boolean }>) {
  return (
    <Link
      href={href}
      className={cn(
        "shrink-0 text-sm font-medium text-amber transition-colors hover:text-amber-hover",
        bleedRight && "self-end",
      )}
      style={
        bleedRight
          ? { marginRight: "calc(24px - max(24px, 50vw - 636px))" }
          : undefined
      }
    >
      {text}
    </Link>
  );
}

interface SectionHeadingProps {
  title: string;
  linkText?: string;
  linkHref?: string;
  font?: "sans" | "serif";
  bleedRight?: boolean;
}

export function SectionHeading({
  title,
  linkText,
  linkHref,
  font = "sans",
  bleedRight,
}: Readonly<SectionHeadingProps>) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2",
        bleedRight
          ? "mb-2"
          : "mb-8 md:flex-row md:items-end md:justify-between md:gap-4",
      )}
    >
      <HeadingTitle title={title} font={font} />
      {linkText && linkHref && (
        <ViewAllLink text={linkText} href={linkHref} bleedRight={bleedRight} />
      )}
    </div>
  );
}
