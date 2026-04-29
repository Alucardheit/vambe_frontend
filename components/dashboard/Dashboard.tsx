"use client";

import Link from "next/link";
import { useMemo, useSyncExternalStore } from "react";
import {
  getIndicatorsServerSnapshot,
  getIndicatorsSnapshot,
  parseStoredIndicators,
  subscribeIndicators,
  type StoredIndicators,
} from "@/lib/indicators-storage";
import { AreaChart } from "./AreaChart";
import { CategoryChart } from "./CategoryChart";
import { ClosedRateCard } from "./ClosedRateCard";
import { StatCard } from "./StatCard";

export function Dashboard() {
  const raw = useSyncExternalStore(
    subscribeIndicators,
    getIndicatorsSnapshot,
    getIndicatorsServerSnapshot
  );
  const stored = useMemo(() => parseStoredIndicators(raw), [raw]);

  if (!stored) {
    return <EmptyState />;
  }

  const { data, meta } = stored;
  const computedAt = new Date(meta.computedAt);

  return (
    <div className="w-full space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Panel de Indicadores
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            {meta.filename ? <>Archivo: <span className="text-slate-200">{meta.filename}</span> · </> : null}
            Modelo: <span className="text-slate-200">{meta.model}</span> ·{" "}
            Idioma: <span className="text-slate-200">{meta.language.toUpperCase()}</span> ·{" "}
            <time dateTime={meta.computedAt}>
              {computedAt.toLocaleString()}
            </time>
          </p>
        </div>
        <Link
          href="/analyze"
          className="inline-flex h-10 items-center rounded-full border border-white/15 bg-white/5 px-4 text-sm font-medium text-white transition hover:bg-white/10"
        >
          Analizar otro CSV
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total de clientes"
          value={data.total_clients}
          icon="👥"
          color="cyan"
        />
        <StatCard
          label="Clientes cerrados"
          value={data.closed_rate.closed}
          icon="✓"
          color="emerald"
        />
        <StatCard
          label="Errores de análisis"
          value={data.analysis_errors}
          icon="⚠️"
          color={data.analysis_errors > 0 ? "rose" : "amber"}
        />
        <StatCard
          label="Tasa de cierre"
          value={`${data.closed_rate.closed_percentage.toFixed(1)}%`}
          icon="📊"
          color="amber"
        />
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <ClosedRateCard data={data.closed_rate} />
        <CategoryChart title="Nivel de Interés" data={data.by_nivel_interes} />
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <CategoryChart
          title="Por Industria"
          data={data.by_industria}
          maxItems={6}
        />
        <CategoryChart
          title="Por Vendedor"
          data={data.by_vendedor}
          maxItems={6}
        />
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <CategoryChart
          title="Por Fuente de Lead"
          data={data.by_fuente_lead}
          maxItems={6}
        />
        <CategoryChart
          title="Probabilidad de Cierre"
          data={data.by_probabilidad_cierre}
        />
      </div>

      <AreaChart
        data={data.industria_area_chart}
        title="Tasa de Cierre por Industria"
      />

      <div className="grid gap-8 lg:grid-cols-2">
        <ClosedRateList
          title="Tasa de Cierre por Industria"
          items={data.closed_rate_by_industria}
        />
        <ClosedRateList
          title="Tasa de Cierre por Vendedor"
          items={data.closed_rate_by_vendedor}
        />
      </div>
    </div>
  );
}

function ClosedRateList({
  title,
  items,
}: {
  title: string;
  items: StoredIndicators["data"]["closed_rate_by_industria"];
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-gradient-to-br from-slate-950/55 to-slate-900/25 p-6 backdrop-blur-xl">
      <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-cyan-200">
        {title}
      </h3>
      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between rounded-lg bg-white/5 p-3"
          >
            <div>
              <p className="text-sm font-medium text-slate-200">{item.label}</p>
              <p className="text-xs text-slate-500">
                {item.closed} de {item.total}
              </p>
            </div>
            <p className="text-lg font-bold text-emerald-400">
              {item.closed_percentage.toFixed(0)}%
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-white/10 bg-white/[0.02] py-16 text-center">
      <p className="text-lg font-semibold text-white">
        Aún no hay indicadores
      </p>
      <p className="max-w-md text-sm text-slate-400">
        Sube un CSV en la página de análisis y te traemos aquí con el dashboard
        listo.
      </p>
      <Link
        href="/analyze"
        className="mt-2 inline-flex h-11 items-center rounded-full bg-blue-600 px-5 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_rgba(37,99,235,0.7)] transition hover:bg-blue-500"
      >
        Ir a analizar
      </Link>
    </div>
  );
}
