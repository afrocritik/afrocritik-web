import { api } from "@/lib/api";

/**
 * The report promoted in the "What The Report Signals" block. An editor-curated
 * report on the Homepage global wins; otherwise the newest report. Shared by the
 * home and Explore pages so the block is identical on both.
 */
export async function getFeaturedReport(homepage: any): Promise<any | null> {
  const curated = homepage?.featuredReport;
  if (curated && typeof curated === "object") return curated;
  try {
    const res = await api.reports.list({ limit: 1, sort: "-createdAt", depth: 2 });
    return res?.docs?.[0] ?? null;
  } catch {
    return null;
  }
}
