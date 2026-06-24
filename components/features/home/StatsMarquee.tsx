import Image from "next/image";
import { Fragment } from "react";

interface StatEntry {
  value: string;
  label: string;
}

const DEFAULT_STATS: StatEntry[] = [
  { value: "1,000+", label: "Works" },
  { value: "15,000+", label: "Articles" },
  { value: "50+", label: "Countries" },
  { value: "120,000+", label: "Data Points" },
];

function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "4px",
        whiteSpace: "nowrap",
        color: "rgba(196, 150, 60, 0.60)",
        fontFamily: "var(--font-inter)",
        fontSize: "24px",
        fontWeight: 600,
        lineHeight: "110%",
        textTransform: "capitalize",
      }}
    >
      <span>{value}</span>
      <span>{label}</span>
    </div>
  );
}

export function StatsMarquee({ stats }: Readonly<{ stats?: StatEntry[] }>) {
  const source = stats && stats.length > 0 ? stats : DEFAULT_STATS;
  const repeatedStats = Array.from({ length: 10 }, () => source).flat();

  return (
    <div
      style={{
        height: "80px",
        border: "1px solid rgba(156, 92, 8, 0.30)",
        background: "rgba(35, 23, 6, 0.60)",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "24px",
          animation: "marquee 60s linear infinite",
          paddingRight: "24px",
        }}
      >
        {repeatedStats.map((stat, idx) => (
          <Fragment key={idx}>
            <StatItem value={stat.value} label={stat.label} />
            <Image
              src="/Ellipse 6.svg"
              alt=""
              width={8}
              height={8}
              aria-hidden
            />
          </Fragment>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
