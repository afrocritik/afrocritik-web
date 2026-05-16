import Link from "next/link";
import { ChevronRight, Download } from "lucide-react";

function titleCase(slug: string) {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

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
    <div className="bg-bg-primary">
      <div className="container flex items-center gap-1.5 py-4 text-xs text-ink-muted">
        <Link href="/explore?tab=reports" className="hover:text-amber">
          Reports
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-ink-secondary">{title}</span>
      </div>

      <div className="container grid gap-8 pb-16 md:grid-cols-[280px_1fr]">
        <div className="flex aspect-[3/4] items-center justify-center rounded-xl bg-gradient-to-br from-amber to-[#7A4A12] p-4 text-center font-display text-xl font-bold text-white">
          {title}
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-amber">
            Annual Report
          </p>
          <h1 className="mt-1 font-display text-3xl font-bold text-white md:text-4xl">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-secondary">
            Each year, the Afrocritik Report maps the cultural forces shaping
            Africa and its diaspora — the breakthroughs, the ruptures, and the
            tensions that define the moment.
          </p>
          <button className="mt-6 flex items-center gap-2 rounded-md bg-amber px-6 py-3 text-sm font-semibold text-white hover:bg-amber-hover">
            <Download className="h-4 w-4" /> Download Report
          </button>
        </div>
      </div>

      <section className="container pb-20">
        <h2 className="mb-6 font-display text-2xl font-bold text-white">
          What The Report Signals
        </h2>
        <div className="grid gap-5 md:grid-cols-3">
          {SIGNALS.map((s) => (
            <div
              key={s.title}
              className="rounded-xl border border-amber-line bg-bg-card p-6"
            >
              <h3 className="font-display text-lg font-bold text-amber">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-secondary">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
