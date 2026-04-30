"use client";

import { useState } from "react";
import type { CategoryStat } from "@/lib/api";
import { CategoryListModal } from "./CategoryListModal";

type Tone = "positive" | "negative" | "neutral";

interface InsightsListProps {
  title: string;
  data: CategoryStat[];
  tone?: Tone;
  icon?: string;
  maxItems?: number;
  emptyHint?: string;
}

const TONE_STYLES: Record<Tone, { bar: string; count: string; accent: string; hover: string }> = {
  positive: {
    bar: "bg-gradient-to-r from-emerald-500 to-emerald-400",
    count: "text-emerald-300",
    accent: "text-emerald-200",
    hover: "hover:border-emerald-400/40 hover:bg-emerald-400/10 hover:text-emerald-200",
  },
  negative: {
    bar: "bg-gradient-to-r from-rose-500 to-rose-400",
    count: "text-rose-300",
    accent: "text-rose-200",
    hover: "hover:border-rose-400/40 hover:bg-rose-400/10 hover:text-rose-200",
  },
  neutral: {
    bar: "bg-gradient-to-r from-cyan-500 to-blue-500",
    count: "text-cyan-300",
    accent: "text-cyan-200",
    hover: "hover:border-cyan-400/40 hover:bg-cyan-400/10 hover:text-cyan-200",
  },
};

export function InsightsList({
  title,
  data,
  tone = "neutral",
  icon,
  maxItems = 6,
  emptyHint,
}: InsightsListProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const styles = TONE_STYLES[tone];
  const displayData = data.slice(0, maxItems);
  const maxCount = Math.max(...displayData.map((d) => d.count), 1);
  const hidden = data.length - displayData.length;

  return (
    <div className="rounded-xl border border-white/10 bg-gradient-to-br from-slate-950/55 to-slate-900/25 p-6 backdrop-blur-xl">
      <h3 className={`mb-6 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider ${styles.accent}`}>
        {icon ? <span aria-hidden>{icon}</span> : null}
        <span>{title}</span>
      </h3>

      {displayData.length === 0 ? (
        <p className="text-sm text-slate-500">{emptyHint ?? "Sin datos suficientes."}</p>
      ) : (
        <ul className="space-y-3">
          {displayData.map((item, idx) => (
            <li key={`${title}-${idx}`}>
              <div className="mb-1.5 flex items-start justify-between gap-3">
                <p className="text-sm leading-snug text-slate-200 first-letter:uppercase">
                  {item.label}
                </p>
                <span className={`shrink-0 text-xs font-semibold ${styles.count}`}>
                  ×{item.count}
                </span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
                <div
                  className={`h-full ${styles.bar}`}
                  style={{ width: `${(item.count / maxCount) * 100}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      )}

      {hidden > 0 && (
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className={`mt-4 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300 transition ${styles.hover}`}
        >
          Ver {hidden} más
          <span aria-hidden>›</span>
        </button>
      )}

      {modalOpen ? (
        <CategoryListModal
          title={title}
          data={data}
          onClose={() => setModalOpen(false)}
        />
      ) : null}
    </div>
  );
}
