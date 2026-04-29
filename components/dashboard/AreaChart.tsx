"use client";

import type { StackedAreaChart } from "@/lib/api";

interface AreaChartProps {
  data: StackedAreaChart;
  title: string;
}

export function AreaChart({ data, title }: AreaChartProps) {
  if (!data.categories.length || !data.series.length) {
    return null;
  }

  const maxValue = Math.max(
    ...data.series.flatMap((s) => s.values),
    1
  );

  return (
    <div className="rounded-xl border border-white/10 bg-gradient-to-br from-slate-950/55 to-slate-900/25 p-6 backdrop-blur-xl">
      <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-cyan-200">
        {title}
      </h3>

      <div className="overflow-x-auto">
        <div className="min-w-full">
          {/* Legend */}
          <div className="mb-4 flex gap-4">
            {data.series.map((series) => (
              <div key={series.name} className="flex items-center gap-2">
                <div
                  className={`h-3 w-3 rounded-full ${
                    series.name === "closed"
                      ? "bg-emerald-400"
                      : "bg-amber-400"
                  }`}
                />
                <span className="text-xs text-slate-300 capitalize">
                  {series.name === "closed" ? "Cerrados" : "No cerrados"}
                </span>
              </div>
            ))}
          </div>

          {/* Chart */}
          <div className="space-y-2">
            {data.categories.map((category, idx) => {
              const closedValue = data.series[0]?.values[idx] || 0;
              const notClosedValue = data.series[1]?.values[idx] || 0;
              const total = closedValue + notClosedValue;
              const closedPercent =
                total > 0 ? (closedValue / total) * 100 : 0;

              return (
                <div key={`${category}-${idx}`}>
                  <div className="mb-1 flex items-center justify-between">
                    <p className="truncate text-xs font-medium text-slate-300">
                      {category}
                    </p>
                    <p className="text-xs text-slate-500">{total} clientes</p>
                  </div>
                  <div className="flex h-6 overflow-hidden rounded-lg bg-white/5">
                    <div
                      className="bg-gradient-to-r from-emerald-500 to-emerald-400"
                      style={{ width: `${closedPercent}%` }}
                      title={`Cerrados: ${closedValue}`}
                    />
                    <div
                      className="bg-gradient-to-r from-amber-500 to-amber-400"
                      style={{ width: `${100 - closedPercent}%` }}
                      title={`No cerrados: ${notClosedValue}`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
