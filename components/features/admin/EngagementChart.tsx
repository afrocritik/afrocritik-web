"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useDashboardData } from "./useDashboardData";

export function EngagementChart() {
  const { data, isLoading, isError } = useDashboardData();
  if (isLoading && !data)
    return (
      <div
        className="mt-8 h-[280px] w-full animate-pulse rounded-lg"
        style={{ background: "#50321C40" }}
      />
    );
  const ENGAGEMENT = data?.engagement ?? [];
  if (ENGAGEMENT.length === 0)
    return (
      <div className="mt-8 flex h-[280px] w-full items-center justify-center font-inter text-sm text-white/50">
        {isError ? "Couldn't load engagement." : "No engagement data yet."}
      </div>
    );
  return (
    <div className="mt-8">
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={ENGAGEMENT} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
          <CartesianGrid stroke="#7E7D7C" strokeWidth={2} vertical={false} />
          <XAxis
            dataKey="entity"
            tick={{ fill: "#FFFFFF", fontSize: 14 }}
            tickLine={false}
            axisLine={{ stroke: "#7E7D7C", strokeWidth: 2 }}
            interval={0}
          />
          <YAxis
            tick={{ fill: "#FFFFFF", fontSize: 14 }}
            tickLine={false}
            axisLine={false}
            domain={[0, "auto"]}
            allowDecimals={false}
            width={48}
            tickFormatter={(v: number) =>
              v >= 1000 ? `${(v / 1000).toFixed(0)}K` : String(v)
            }
          />
          <Tooltip
            cursor={{ fill: "rgba(200, 146, 42, 0.08)" }}
            contentStyle={{
              background: "#251200",
              border: "1px solid #3D1F00",
              borderRadius: 8,
              fontSize: 12,
            }}
            labelStyle={{ color: "#fff" }}
            itemStyle={{ color: "#C8922A" }}
          />
          <Bar dataKey="value" name="Engagement" fill="#CA8A04" maxBarSize={80} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
