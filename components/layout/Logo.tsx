import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  href = "/",
}: Readonly<{
  className?: string;
  href?: string;
}>) {
  return (
    <Link href={href} className={cn("block w-fit shrink-0 relative", className)}>
      <Image
        src="/logo.png"
        alt="Afrocritik"
        width={211}
        height={86}
        className="object-contain"
        style={{ width: "210.847px", height: "85.532px", aspectRatio: "106/43" }}
        priority
      />
      <div
        style={{
          position: "absolute",
          width: "78px",
          color: "#F3E5D0",
          textAlign: "center",
          fontFamily: "Wittgenstein",
          fontSize: "16px",
          fontWeight: 600,
          lineHeight: "110%",
          textTransform: "capitalize",
          bottom: "10px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        Institute
      </div>
    </Link>
  );
}
