"use client";

import type { CategoryStat } from "@/lib/api";

interface CategoryChartProps {
  title: string;
  data: CategoryStat[];
  maxItems?: number;
}

export function CategoryChart({
  title,
  data,
  maxItems = 5,
}: CategoryChartProps) {
  const displayData = data.slice(0, maxItems);
  const maxCount = Math.max(...displayData.map((d) => d.count), 1);

  return (
    <div className="rounded-xl border border-white/10 bg-gradient-to-br from-slate-950/55 to-slate-900/25 p-6 backdrop-blur-xl">
      <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-cyan-200">
        {title}
      </h3>

      <div className="space-y-4">
        {displayData.map((item, idx) => (
          <div key={`${title}-${idx}`}>
            <div className="mb-2 flex items-center justify-between">
              <p className="truncate text-sm font-medium text-slate-200">
                {item.label}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">
                  {item.count}
                </span>
                <span className="w-8 text-right text-xs font-semibold text-cyan-300">
                  {item.percentage.toFixed(0)}%
                </span>
              </div>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/5">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                style={{ width: `${(item.count / maxCount) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {data.length > maxItems && (
        <p className="mt-4 text-xs text-slate-500">
          +{data.length - maxItems} más
        </p>
      )}
    </div>
  );
}
