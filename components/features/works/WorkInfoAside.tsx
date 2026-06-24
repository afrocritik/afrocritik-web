import Link from "next/link";
import Image from "next/image";

const GLANCE_ICONS: Record<string, string> = {
  Origin: "/inner-glance-origin.png",
  Period: "/inner-glance-period.png",
  "Key Focus": "/inner-glance-key-focus.png",
  "Global Impact": "/inner-glance-key-focus.png",
  Region: "/inner-glance-origin.png",
  Country: "/inner-glance-origin.png",
  Year: "/inner-glance-period.png",
};

interface GlanceItem { label: string; value: string }
interface RelatedWork { title: string; year?: number; slug?: string }

interface Props {
  atAGlance?: GlanceItem[];
  quickFacts?: string[];
  relatedWorks?: RelatedWork[];
}

export function WorkInfoAside({ atAGlance = [], quickFacts = [], relatedWorks = [] }: Props) {
  if (atAGlance.length === 0 && quickFacts.length === 0 && relatedWorks.length === 0) {
    return (
      <aside className="hidden lg:flex lg:w-[250px] lg:shrink-0 lg:flex-col gap-4">
        <div className="bg-yellow-950/50 rounded-2xl border-[1.20px] border-yellow-700 p-5">
          <p className="text-white/40 font-inter text-sm italic">
            Details not available yet.
          </p>
        </div>
      </aside>
    );
  }

  return (
    <aside className="hidden lg:flex lg:w-[250px] lg:shrink-0 lg:flex-col gap-4">
      {atAGlance.length > 0 && (
        <div className="bg-yellow-950/50 rounded-2xl border-[1.20px] border-yellow-700 p-5">
          <h3 className="w-44 text-white text-lg font-semibold font-inter leading-5 mb-4">
            At a glance
          </h3>
          <ul className="flex flex-col gap-2">
            {atAGlance.map((row) => (
              <li key={row.label} className="flex items-start gap-1.5">
                <div className="size-6 relative overflow-hidden shrink-0">
                  <Image
                    src={GLANCE_ICONS[row.label] ?? "/inner-glance-origin.png"}
                    alt={row.label}
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="flex flex-col gap-1">
                  <div className="self-stretch justify-start">
                    <span className="text-white text-base font-medium font-inter leading-snug">
                      {row.label}
                    </span>
                  </div>
                  <div className="self-stretch text-white text-xs font-light font-inter leading-snug">
                    {row.value}
                  </div>
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {quickFacts.length > 0 && (
        <div className="bg-yellow-950/50 rounded-xl border border-yellow-700 p-5 flex flex-col">
          <h3 className="w-44 text-white text-lg font-semibold font-inter leading-5 mb-4">
            Quick Facts
          </h3>
          <ul className="flex flex-col gap-3">
            {quickFacts.map((fact) => (
              <li key={fact} className="flex items-start gap-2">
                <span className="mt-[3px] size-1.5 shrink-0 rounded-full bg-white/60" />
                <span className="text-white text-[11px] font-normal font-inter leading-[1.4]">
                  {fact}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {relatedWorks.length > 0 && (
        <div className="bg-yellow-950/50 rounded-xl border border-yellow-700 p-5">
          <h3 className="text-white text-base font-semibold font-inter leading-4 mb-3">
            Related Works
          </h3>
          <ul className="flex flex-col gap-2">
            {relatedWorks.map((w) => (
              <li key={w.title}>
                <Link href={w.slug ? `/works/${w.slug}` : "#"} className="flex items-center gap-3 group">
                  <Image
                    src="/inner-related-image.png"
                    alt={w.title}
                    width={32}
                    height={44}
                    className="w-8 h-11 shrink-0 rounded-[5px] object-cover"
                  />
                  <span className="flex flex-col gap-1">
                    <span className="w-24 justify-start text-white text-[10px] font-light font-inter leading-[10px] group-hover:text-amber transition-colors">
                      {w.title}
                    </span>
                    {w.year && (
                      <div className="p-1 bg-yellow-800/70 rounded-sm inline-flex justify-center items-center gap-1 self-start">
                        <span className="text-[7.06px] font-normal font-inter leading-[7.06px] text-amber">
                          {w.year}
                        </span>
                      </div>
                    )}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
}
