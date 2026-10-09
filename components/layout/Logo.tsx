import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  href = "/",
  compact = false,
}: Readonly<{
  className?: string;
  href?: string;
  /** Half-size logo for the slim site header. */
  compact?: boolean;
}>) {
  return (
    <Link href={href} className={cn("block w-fit shrink-0 relative", className)}>
      <Image
        src="/images/brand/logo.png"
        alt="Afrocritik"
        width={211}
        height={86}
        className="object-contain"
        style={{
          width: compact ? "clamp(80px, 22vw, 106px)" : "clamp(150px, 42vw, 210.847px)",
          height: "auto",
          aspectRatio: "106/43",
        }}
        priority
      />
      <div
        style={{
          position: "absolute",
          width: compact ? "clamp(30px, 8vw, 40px)" : "clamp(56px, 15vw, 78px)",
          color: "#F3E5D0",
          textAlign: "center",
          fontFamily: "Wittgenstein",
          fontSize: compact ? "clamp(6px, 1.6vw, 8px)" : "clamp(11px, 3.2vw, 16px)",
          fontWeight: 600,
          lineHeight: "110%",
          textTransform: "capitalize",
          bottom: compact ? "clamp(3px, 0.9vw, 5px)" : "clamp(7px, 1.8vw, 10px)",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        Institute
      </div>
    </Link>
  );
}
