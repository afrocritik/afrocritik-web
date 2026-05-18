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

function ViewAllLink({ text, href }: Readonly<{ text: string; href: string }>) {
  return (
    <Link
      href={href}
      className="shrink-0 text-sm font-medium text-amber transition-colors hover:text-amber-hover"
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
}

export function SectionHeading({
  title,
  linkText,
  linkHref,
  font = "sans",
}: Readonly<SectionHeadingProps>) {
  return (
    <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <HeadingTitle title={title} font={font} />
      {linkText && linkHref && <ViewAllLink text={linkText} href={linkHref} />}
    </div>
  );
}
