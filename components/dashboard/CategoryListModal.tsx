"use client";

import { useEffect, useMemo, useState } from "react";
import type { CategoryStat } from "@/lib/api";

interface CategoryListModalProps {
  title: string;
  data: CategoryStat[];
  onClose: () => void;
}

type SortMode = "count" | "alpha";

export function CategoryListModal({ title, data, onClose }: CategoryListModalProps) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortMode>("count");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const base = q ? data.filter((d) => d.label.toLowerCase().includes(q)) : data;
    if (sort === "alpha") {
      return [...base].sort((a, b) => a.label.localeCompare(b.label));
    }
    return [...base].sort((a, b) => b.count - a.count);
  }, [data, query, sort]);

  const maxCount = Math.max(...data.map((d) => d.count), 1);
  const totalCount = data.reduce((acc, d) => acc + d.count, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-10" role="dialog" aria-modal="true">
      <button
        type="button"
        aria-label="Cerrar"
        className="absolute inset-0 cursor-default bg-slate-950/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative flex max-h-full w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-950 to-slate-900 shadow-2xl">
        <header className="flex items-start justify-between gap-4 border-b border-white/10 px-6 py-5">
          <div className="min-w-0">
            <h2 className="truncate text-lg font-bold text-white">{title}</h2>
            <p className="mt-1 text-xs text-slate-400">
              {data.length} categorías · {totalCount} clientes en total
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-slate-400 transition hover:bg-white/10 hover:text-white"
            aria-label="Cerrar"
          >
            ✕
          </button>
        </header>

        <div className="flex flex-wrap items-center gap-2 border-b border-white/10 px-6 py-3">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar…"
            className="h-9 flex-1 min-w-[10rem] rounded-full border border-white/10 bg-white/5 px-4 text-sm text-slate-100 placeholder:text-slate-500 focus:border-cyan-400/50 focus:outline-none focus:ring-1 focus:ring-cyan-400/30"
          />
          <div className="flex rounded-full border border-white/10 bg-white/5 p-1 text-xs">
            {(["count", "alpha"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setSort(m)}
                className={`rounded-full px-3 py-1.5 font-medium transition ${
                  sort === m ? "bg-white/15 text-white" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {m === "count" ? "Por cantidad" : "Alfabético"}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {filtered.length === 0 ? (
            <p className="py-8 text-center text-sm text-slate-500">Sin coincidencias.</p>
          ) : (
            <ul className="space-y-3">
              {filtered.map((item, idx) => (
                <li key={`${item.label}-${idx}`}>
                  <div className="mb-1 flex items-center justify-between gap-3">
                    <p className="truncate text-sm text-slate-200">{item.label}</p>
                    <div className="flex shrink-0 items-center gap-3 text-xs">
                      <span className="text-slate-400">{item.count}</span>
                      <span className="w-10 text-right font-semibold text-cyan-300">
                        {item.percentage.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                      style={{ width: `${(item.count / maxCount) * 100}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
