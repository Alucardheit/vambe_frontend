"use client";

import type { ClosedRate } from "@/lib/api";

interface ClosedRateCardProps {
  data: ClosedRate;
}

export function ClosedRateCard({ data }: ClosedRateCardProps) {
  return (
    <div className="rounded-xl border border-white/10 bg-gradient-to-br from-slate-950/55 to-slate-900/25 p-6 backdrop-blur-xl">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-cyan-200">
          Tasa Global de Cierre
        </h3>
        <span className="text-2xl font-bold text-cyan-400">
          {data.closed_percentage.toFixed(1)}%
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-lg bg-white/5 p-3">
          <p className="text-xs text-slate-400">Cerrados</p>
          <p className="mt-1 text-lg font-bold text-emerald-400">
            {data.closed}
          </p>
          <p className="text-xs text-slate-500">de {data.total}</p>
        </div>
        <div className="rounded-lg bg-white/5 p-3">
          <p className="text-xs text-slate-400">No cerrados</p>
          <p className="mt-1 text-lg font-bold text-amber-400">
            {data.not_closed}
          </p>
          <p className="text-xs text-slate-500">de {data.total}</p>
        </div>
      </div>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/5">
        <div
          className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400"
          style={{ width: `${data.closed_percentage}%` }}
        />
      </div>
    </div>
  );
}
