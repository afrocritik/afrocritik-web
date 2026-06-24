import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Download } from "lucide-react";
import { api, getMediaUrl } from "@/lib/api";

export default async function ReportDetailPage({
  params,
}: {
  readonly params: { slug: string };
}) {
  let report: any = null;
  try {
    const res = await api.reports.list({
      "where[slug][equals]": params.slug,
      depth: 2,
    });
    report = res?.docs?.[0] ?? null;
  } catch {
    // API unreachable
  }

  if (!report) {
    return (
      <div className="bg-[#160907] min-h-screen">
        <div className="container py-20 text-center">
          <h1 className="text-white font-baskervville text-4xl">Report not found</h1>
          <p className="text-orange-100/50 mt-4 font-inter">
            This report has not been published yet or could not be found.
          </p>
          <Link href="/explore?tab=reports" className="mt-8 inline-block text-amber hover:underline font-inter">
            Browse all reports →
          </Link>
        </div>
      </div>
    );
  }

  const title = report.title ?? "";
  const coverUrl = getMediaUrl(report.coverImage);
  const pdfUrl = getMediaUrl(report.pdfFile);

  const stats: { value: string; label: string }[] = Array.isArray(report.stats)
    ? report.stats.map((s: any) => ({ value: s.value ?? "", label: s.label ?? "" }))
    : [];

  const signals: { title: string; desc: string }[] = Array.isArray(report.signals)
    ? report.signals.map((s: any) => ({ title: s.title ?? "", desc: s.description ?? "" }))
    : [];

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
            {coverUrl ? (
              <Image src={coverUrl} alt={title} fill className="object-cover" />
            ) : (
              <div className="flex h-full items-center justify-center bg-yellow-950/30">
                <span className="font-baskervville text-6xl text-white/20">
                  {report.year ?? title.charAt(0)}
                </span>
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <p className="font-inter text-xs font-semibold uppercase tracking-wider text-amber">
              {report.subtitle ?? "Annual Report"}
            </p>
            <h1 className="mt-2 font-baskervville text-4xl font-semibold leading-tight text-white md:text-5xl">
              {title}
            </h1>

            {report.summary ? (
              <p className="mt-5 max-w-2xl font-inter text-base font-light leading-relaxed text-orange-100">
                {report.summary}
              </p>
            ) : (
              <p className="mt-5 max-w-2xl font-inter text-base font-light leading-relaxed text-orange-100/40 italic">
                Summary not uploaded yet.
              </p>
            )}

            {/* Stat badges */}
            {stats.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-3">
                {stats.map((s) => (
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
            )}

            {pdfUrl ? (
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex h-12 w-fit items-center gap-2 rounded-xl px-7 font-inter text-sm font-medium text-yellow-950 transition-opacity hover:opacity-90"
                style={{ background: "linear-gradient(42deg, #A16207 15%, #FB923C 81%)" }}
              >
                <Download className="size-4" /> Download Report
              </a>
            ) : (
              <button
                disabled
                className="mt-7 inline-flex h-12 w-fit items-center gap-2 rounded-xl px-7 font-inter text-sm font-medium text-yellow-950/50 cursor-not-allowed"
                style={{ background: "linear-gradient(42deg, #A16207 15%, #FB923C 81%)", opacity: 0.4 }}
              >
                <Download className="size-4" /> Download Not Available Yet
              </button>
            )}
          </div>
        </section>

        {/* Signals */}
        {signals.length > 0 && (
          <section className="pb-20">
            <h2 className="mb-6 font-baskervville text-3xl font-semibold capitalize text-white">
              What The Report Signals
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              {signals.map((s) => (
                <div
                  key={s.title}
                  className="rounded-xl border border-yellow-700 bg-yellow-950/50 p-6"
                >
                  <h3 className="font-baskervville text-xl font-semibold text-amber">
                    {s.title}
                  </h3>
                  {s.desc && (
                    <p className="mt-2 font-inter text-sm font-light leading-relaxed text-orange-100">
                      {s.desc}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {signals.length === 0 && (
          <section className="pb-20">
            <p className="font-inter text-sm text-orange-100/40 italic">
              Report signals not uploaded yet.
            </p>
          </section>
        )}
      </div>
    </div>
  );
}
