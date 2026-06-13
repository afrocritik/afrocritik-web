import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Download } from "lucide-react";

function titleCase(slug: string) {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

const STATS = [
  { value: "151", label: "Pages" },
  { value: "5", label: "Sections" },
  { value: "20+", label: "Contributors" },
];

const SIGNALS = [
  { title: "Digital Renaissance", desc: "Streaming and digital distribution reshape how African work reaches audiences." },
  { title: "Global Crossover", desc: "African music and film achieve unprecedented international visibility." },
  { title: "Archive Deficit", desc: "Decades of cultural output remain undocumented and at risk of loss." },
];

export default function ReportDetailPage({
  params,
}: {
  readonly params: { slug: string };
}) {
  const title = titleCase(params.slug || "the-afrocritik-report-2025");

  return (
    <div className="bg-[#160907]">
      <div className="container">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 py-4 font-inter text-xs text-orange-100/70">
          <Link href="/explore?tab=reports" className="transition-colors hover:text-amber">
            Reports
          </Link>
          <ChevronRight className="size-3.5" />
          <span className="text-white">{title}</span>
        </div>

        {/* Hero */}
        <section className="grid gap-8 pb-14 md:grid-cols-[300px_1fr]">
          <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-yellow-700">
            <Image src="/EW-Image-3.png" alt={title} fill className="object-cover" />
          </div>

          <div className="flex flex-col">
            <p className="font-inter text-xs font-semibold uppercase tracking-wider text-amber">
              Annual Report
            </p>
            <h1 className="mt-2 font-baskervville text-4xl font-semibold leading-tight text-white md:text-5xl">
              {title}
            </h1>

            <p className="mt-5 max-w-2xl font-inter text-base font-light leading-relaxed text-orange-100">
              Each year, the Afrocritik Report maps the cultural forces shaping
              Africa and its diaspora — the breakthroughs, the ruptures, and the
              tensions that define the moment.
            </p>

            {/* Stat badges */}
            <div className="mt-6 flex flex-wrap gap-3">
              {STATS.map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl border border-yellow-700 bg-yellow-950/50 px-5 py-3 text-center"
                >
                  <div className="font-baskervville text-2xl font-semibold text-white">
                    {s.value}
                  </div>
                  <div className="font-inter text-xs uppercase tracking-wide text-orange-100/60">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            <button
              className="mt-7 inline-flex h-12 w-fit items-center gap-2 rounded-xl px-7 font-inter text-sm font-medium text-yellow-950 transition-opacity hover:opacity-90"
              style={{ background: "linear-gradient(42deg, #A16207 15%, #FB923C 81%)" }}
            >
              <Download className="size-4" /> Download Report
            </button>
          </div>
        </section>

        {/* Signals */}
        {SIGNALS.length > 0 && (
          <section className="pb-20">
            <h2 className="mb-6 font-baskervville text-3xl font-semibold capitalize text-white">
              What The Report Signals
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              {SIGNALS.map((s) => (
                <div
                  key={s.title}
                  className="rounded-xl border border-yellow-700 bg-yellow-950/50 p-6"
                >
                  <h3 className="font-baskervville text-xl font-semibold text-amber">
                    {s.title}
                  </h3>
                  <p className="mt-2 font-inter text-sm font-light leading-relaxed text-orange-100">
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
