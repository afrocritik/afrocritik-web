"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { GROWTH_SERIES } from "./constants";
import { useDashboardData } from "./useDashboardData";

const GRID = "rgba(255,255,255,0.3)";
const AXIS_LINE = "rgba(255,255,255,0.5)";
const TICK = "#ffffff";

export function ContentGrowthChart() {
  const { data, isLoading } = useDashboardData();
  if (isLoading && !data)
    return (
      <div
        className="h-[288px] w-full animate-pulse rounded-lg"
        style={{ background: "#50321C40" }}
      />
    );
  const GROWTH = data?.growth ?? [];
  if (GROWTH.length === 0)
    return (
      <div className="flex h-[288px] w-full items-center justify-center font-inter text-sm text-white/50">
        No content growth data yet.
      </div>
    );
  return (
    <ResponsiveContainer width="100%" height={288}>
      <AreaChart data={GROWTH} margin={{ top: 10, right: 8, left: -16, bottom: 0 }}>
        <defs>
          {GROWTH_SERIES.map((s) => (
            <linearGradient key={s.key} id={`growth-${s.key}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={s.color} stopOpacity={0.3} />
              <stop offset="100%" stopColor={s.color} stopOpacity={0} />
            </linearGradient>
          ))}
        </defs>
        <CartesianGrid
          stroke={GRID}
          strokeDasharray="3 3"
          strokeWidth={0.64}
          vertical={true}
        />
        <XAxis
          dataKey="date"
          stroke={GRID}
          tick={{ fill: TICK, fontSize: 9 }}
          tickLine={false}
          axisLine={{ stroke: AXIS_LINE, strokeWidth: 0.64 }}
          interval={0}
          tickMargin={8}
        />
        <YAxis
          stroke="none"
          tick={{ fill: TICK, fontSize: 9 }}
          tickLine={false}
          axisLine={false}
          domain={[0, "auto"]}
          allowDecimals={false}
        />
        <Tooltip
          contentStyle={{
            background: "#1a0900",
            border: "1px solid rgba(202,138,4,0.4)",
            borderRadius: 8,
            fontSize: 12,
          }}
          labelStyle={{ color: "#fff" }}
          itemStyle={{ textTransform: "capitalize" }}
        />
        {GROWTH_SERIES.map((s) => (
          <Area
            key={s.key}
            type="monotone"
            dataKey={s.key}
            name={s.label}
            stroke={s.color}
            strokeWidth={1.28}
            fill={`url(#growth-${s.key})`}
            fillOpacity={1}
            isAnimationActive={false}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  );
}
