"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { CATEGORY_DATA } from "./constants";
import { useDashboardData } from "./useDashboardData";

export function ContentByCategoryChart() {
  const { data, isLoading } = useDashboardData();
  if (isLoading && !data)
    return (
      <div
        className="h-[256px] w-full animate-pulse rounded-lg"
        style={{ background: "#50321C40" }}
      />
    );
  const CATEGORY = data?.category?.length ? data.category : CATEGORY_DATA;
  return (
    <div className="flex flex-col items-center gap-4">
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={CATEGORY}
            dataKey="value"
            nameKey="label"
            cx="50%"
            cy="50%"
            innerRadius={58}
            outerRadius={90}
            paddingAngle={2}
            stroke="white"
            strokeWidth={1.36}
          >
            {CATEGORY.map((slice) => (
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

      <div className="inline-flex flex-wrap items-center justify-center gap-2.5">
        {CATEGORY.map((slice) => (
          <div key={slice.label} className="flex items-center gap-2">
            <span
              className="size-2 shrink-0 rounded-[1px]"
              style={{ backgroundColor: slice.color }}
            />
            <span className="font-inter text-xs font-normal leading-5 text-white">
              {slice.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
