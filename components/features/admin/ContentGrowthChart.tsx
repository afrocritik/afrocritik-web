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
import { GROWTH_DATA, GROWTH_SERIES } from "./constants";

const AXIS = "#8B6B4A";

export function ContentGrowthChart() {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={GROWTH_DATA} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <defs>
          {GROWTH_SERIES.map((s) => (
            <linearGradient key={s.key} id={`growth-${s.key}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={s.color} stopOpacity={0.55} />
              <stop offset="100%" stopColor={s.color} stopOpacity={0.05} />
            </linearGradient>
          ))}
        </defs>
        <CartesianGrid stroke="#3D1F00" strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="date"
          stroke={AXIS}
          tick={{ fill: AXIS, fontSize: 10 }}
          tickLine={false}
          axisLine={{ stroke: "#3D1F00" }}
          interval={1}
        />
        <YAxis
          stroke={AXIS}
          tick={{ fill: AXIS, fontSize: 10 }}
          tickLine={false}
          axisLine={false}
          domain={[0, 100]}
          ticks={[0, 25, 50, 75, 100]}
        />
        <Tooltip
          contentStyle={{
            background: "#251200",
            border: "1px solid #3D1F00",
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
            stackId="1"
            stroke={s.color}
            strokeWidth={1.5}
            fill={`url(#growth-${s.key})`}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  );
}
