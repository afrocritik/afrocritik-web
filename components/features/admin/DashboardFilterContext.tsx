"use client";

import { createContext, useContext, useMemo, useState } from "react";

export const RANGES = [
  "Last 7 days",
  "Last 30 days",
  "Last 90 days",
  "All time",
] as const;

export type DashboardRange = (typeof RANGES)[number];

/** Number of days a range covers, or null for "All time" (no cutoff). */
export function rangeToDays(range: DashboardRange): number | null {
  switch (range) {
    case "Last 7 days":
      return 7;
    case "Last 30 days":
      return 30;
    case "Last 90 days":
      return 90;
    default:
      return null;
  }
}

interface DashboardFilterValue {
  range: DashboardRange;
  setRange: (r: DashboardRange) => void;
}

const DashboardFilterContext = createContext<DashboardFilterValue | undefined>(
  undefined,
);

export function DashboardFilterProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [range, setRange] = useState<DashboardRange>("Last 30 days");
  const value = useMemo(() => ({ range, setRange }), [range]);
  return (
    <DashboardFilterContext.Provider value={value}>
      {children}
    </DashboardFilterContext.Provider>
  );
}

export function useDashboardFilter(): DashboardFilterValue {
  const ctx = useContext(DashboardFilterContext);
  // Fall back to a static default when used outside the dashboard (e.g. tests),
  // so consumers never crash.
  return ctx ?? { range: "Last 30 days", setRange: () => {} };
}
