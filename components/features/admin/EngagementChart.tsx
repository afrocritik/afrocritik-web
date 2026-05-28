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

export function EngagementChart() {
  return (
    <div className="mt-8">
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={ENGAGEMENT_DATA} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
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
          <Bar dataKey="value" name="Engagement" fill="#CA8A04" maxBarSize={80} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
