"use client";

import { useMemo, useState } from "react";
import type { AnalyzedClientRow } from "@/lib/api";
import { ClientDrawer } from "./ClientDrawer";

interface ClientsListProps {
  clients: AnalyzedClientRow[];
}

interface NormalizedClient {
  raw: AnalyzedClientRow;
  name: string;
  salesperson: string;
  industry: string;
  interest: string;
  closed: boolean;
  searchBlob: string;
}

function normalize(client: AnalyzedClientRow): NormalizedClient {
  const r = client as unknown as Record<string, unknown>;
  const get = (es: string, en: string): string =>
    (r[es] as string) ?? (r[en] as string) ?? "";
  const name = get("nombre", "name");
  const salesperson = get("vendedor_asignado", "salesperson");
  const industry = get("industria", "industry");
  const interest = get("nivel_interes", "interest_level");
  const closed = String(r.closed ?? "").trim() === "1";
  const searchBlob = [
    name,
    salesperson,
    industry,
    interest,
    get("caso_de_uso", "use_case"),
    get("resumen", "summary"),
  ]
    .join(" ")
    .toLowerCase();
  return { raw: client, name, salesperson, industry, interest, closed, searchBlob };
}

type StatusFilter = "all" | "closed" | "open";

export function ClientsList({ clients }: ClientsListProps) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [selected, setSelected] = useState<AnalyzedClientRow | null>(null);

  const normalized = useMemo(() => clients.map(normalize), [clients]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return normalized.filter((c) => {
      if (status === "closed" && !c.closed) return false;
      if (status === "open" && c.closed) return false;
      if (q && !c.searchBlob.includes(q)) return false;
      return true;
    });
  }, [normalized, query, status]);

  return (
    <div className="rounded-xl border border-white/10 bg-gradient-to-br from-slate-950/55 to-slate-900/25 p-6 backdrop-blur-xl">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-cyan-200">
          Explorar clientes
        </h3>
        <p className="text-xs text-slate-500">
          {filtered.length} de {clients.length}
        </p>
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar por nombre, vendedor, industria…"
          className="h-10 flex-1 min-w-[12rem] rounded-full border border-white/10 bg-white/5 px-4 text-sm text-slate-100 placeholder:text-slate-500 focus:border-cyan-400/50 focus:outline-none focus:ring-1 focus:ring-cyan-400/30"
        />
        <div className="flex rounded-full border border-white/10 bg-white/5 p-1 text-xs">
          {(["all", "closed", "open"] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setStatus(s)}
              className={`rounded-full px-3 py-1.5 font-medium transition ${
                status === s ? "bg-white/15 text-white" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {s === "all" ? "Todos" : s === "closed" ? "Cerrados" : "No cerrados"}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="py-8 text-center text-sm text-slate-500">
          No hay clientes que coincidan.
        </p>
      ) : (
        <ul className="max-h-[28rem] divide-y divide-white/5 overflow-y-auto">
          {filtered.map((c, idx) => (
            <li key={`${c.name}-${idx}`}>
              <button
                type="button"
                onClick={() => setSelected(c.raw)}
                className="group flex w-full items-center gap-4 px-1 py-3 text-left transition hover:bg-white/5"
              >
                <span
                  className={`h-2 w-2 shrink-0 rounded-full ${
                    c.closed ? "bg-emerald-400" : "bg-amber-400"
                  }`}
                  aria-hidden
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-slate-100 group-hover:text-white">
                    {c.name || "Sin nombre"}
                  </p>
                  <p className="truncate text-xs text-slate-500">
                    {c.industry || "—"} · {c.salesperson || "—"}
                  </p>
                </div>
                <span className="hidden shrink-0 rounded-full bg-white/5 px-2 py-1 text-[10px] uppercase tracking-wider text-slate-400 sm:block">
                  {c.interest || "—"}
                </span>
                <span className="text-slate-600 group-hover:text-slate-300" aria-hidden>
                  ›
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}

      <ClientDrawer client={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
