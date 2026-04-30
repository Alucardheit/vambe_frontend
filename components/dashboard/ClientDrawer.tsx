"use client";

import { useEffect } from "react";
import type { AnalyzedClientRow } from "@/lib/api";

interface ClientDrawerProps {
  client: AnalyzedClientRow | null;
  onClose: () => void;
}

interface FieldSpec {
  label: string;
  key: keyof AnalyzedClientRow;
  tone?: "positive" | "negative" | "neutral";
}

const FIELDS: FieldSpec[] = [
  { label: "Resumen", key: "resumen" as keyof AnalyzedClientRow },
  { label: "Industria", key: "industria" as keyof AnalyzedClientRow },
  { label: "Caso de uso", key: "caso_de_uso" as keyof AnalyzedClientRow },
  { label: "Volumen de interacciones", key: "volumen_interacciones" as keyof AnalyzedClientRow },
  { label: "Necesidades específicas", key: "necesidades_especificas" as keyof AnalyzedClientRow },
  { label: "Fuente de lead", key: "fuente_lead" as keyof AnalyzedClientRow },
  { label: "Señales positivas de compra", key: "puntos_positivos" as keyof AnalyzedClientRow, tone: "positive" },
  { label: "Dolores del cliente", key: "puntos_negativos" as keyof AnalyzedClientRow, tone: "negative" },
  { label: "Objeciones principales", key: "objeciones_principales" as keyof AnalyzedClientRow, tone: "negative" },
  { label: "Nivel de interés", key: "nivel_interes" as keyof AnalyzedClientRow },
  { label: "Probabilidad de cierre", key: "probabilidad_cierre" as keyof AnalyzedClientRow },
  { label: "Próximos pasos sugeridos", key: "proximos_pasos_sugeridos" as keyof AnalyzedClientRow, tone: "positive" },
];

function getField(client: AnalyzedClientRow, key: keyof AnalyzedClientRow): string {
  const value = (client as unknown as Record<string, unknown>)[key];
  return typeof value === "string" ? value : "";
}

function getName(client: AnalyzedClientRow): string {
  return (
    (client as unknown as Record<string, unknown>).nombre as string ??
    (client as unknown as Record<string, unknown>).name as string ??
    "Cliente"
  );
}

function getSalesperson(client: AnalyzedClientRow): string {
  return (
    (client as unknown as Record<string, unknown>).vendedor_asignado as string ??
    (client as unknown as Record<string, unknown>).salesperson as string ??
    ""
  );
}

function isClosed(client: AnalyzedClientRow): boolean {
  const v = (client as unknown as Record<string, unknown>).closed;
  return String(v ?? "").trim() === "1";
}

export function ClientDrawer({ client, onClose }: ClientDrawerProps) {
  useEffect(() => {
    if (!client) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [client, onClose]);

  if (!client) return null;

  const closed = isClosed(client);

  return (
    <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true">
      <button
        type="button"
        aria-label="Cerrar"
        className="absolute inset-0 cursor-default bg-slate-950/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <aside className="relative flex h-full w-full max-w-2xl flex-col overflow-y-auto border-l border-white/10 bg-gradient-to-br from-slate-950 to-slate-900 shadow-2xl">
        <header className="sticky top-0 z-10 border-b border-white/10 bg-slate-950/85 px-6 py-5 backdrop-blur-xl">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h2 className="truncate text-xl font-bold text-white">{getName(client)}</h2>
              <p className="mt-1 text-xs text-slate-400">
                Vendedor: <span className="text-slate-200">{getSalesperson(client) || "—"}</span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  closed
                    ? "bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/30"
                    : "bg-amber-500/15 text-amber-300 ring-1 ring-amber-400/30"
                }`}
              >
                {closed ? "Cerrado" : "No cerrado"}
              </span>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full p-2 text-slate-400 transition hover:bg-white/10 hover:text-white"
                aria-label="Cerrar"
              >
                ✕
              </button>
            </div>
          </div>
        </header>

        <div className="space-y-5 px-6 py-6">
          {FIELDS.map((field) => {
            const value = getField(client, field.key);
            if (!value || value === "no especificado") return null;

            const tone = field.tone ?? "neutral";
            const accent =
              tone === "positive"
                ? "text-emerald-200"
                : tone === "negative"
                ? "text-rose-200"
                : "text-cyan-200";

            return (
              <section key={field.label} className="rounded-lg bg-white/[0.03] p-4 ring-1 ring-white/5">
                <h3 className={`mb-2 text-xs font-semibold uppercase tracking-wider ${accent}`}>
                  {field.label}
                </h3>
                <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-200 first-letter:uppercase">
                  {value}
                </p>
              </section>
            );
          })}
        </div>
      </aside>
    </div>
  );
}
