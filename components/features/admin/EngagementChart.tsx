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
import { ENGAGEMENT_DATA } from "./constants";

const AXIS = "#8B6B4A";

export function EngagementChart() {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={ENGAGEMENT_DATA} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <defs>
          <linearGradient id="engagement-bar" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E0A938" />
            <stop offset="100%" stopColor="#C8922A" />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="#3D1F00" strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="entity"
          stroke={AXIS}
          tick={{ fill: AXIS, fontSize: 11 }}
          tickLine={false}
          axisLine={{ stroke: "#3D1F00" }}
        />
        <YAxis
          stroke={AXIS}
          tick={{ fill: AXIS, fontSize: 10 }}
          tickLine={false}
          axisLine={false}
          domain={[0, 100]}
          ticks={[0, 20, 40, 60, 80, 100]}
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
        <Bar dataKey="value" name="Engagement" fill="url(#engagement-bar)" radius={[6, 6, 0, 0]} maxBarSize={48} />
      </BarChart>
    </ResponsiveContainer>
  );
}
