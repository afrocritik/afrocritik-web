"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { CATEGORY_DATA } from "./constants";

export function ContentByCategoryChart() {
  return (
    <div className="flex flex-col items-center gap-4">
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={CATEGORY_DATA}
            dataKey="value"
            nameKey="label"
            cx="50%"
            cy="50%"
            innerRadius={58}
            outerRadius={90}
            paddingAngle={2}
            stroke="none"
          >
            {CATEGORY_DATA.map((slice) => (
              <Cell key={slice.label} fill={slice.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              background: "#251200",
              border: "1px solid #3D1F00",
              borderRadius: 8,
              fontSize: 12,
            }}
            itemStyle={{ color: "#fff" }}
          />
        </PieChart>
      </ResponsiveContainer>

      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
        {CATEGORY_DATA.map((slice) => (
          <div key={slice.label} className="flex items-center gap-1.5">
            <span
              className="size-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: slice.color }}
            />
            <span className="font-inter text-xs text-ink-secondary">{slice.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
