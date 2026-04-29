"use client";

import { PROVIDERS, getProvider, type Provider } from "@/lib/models";

interface ModelSelectorProps {
  provider: Provider;
  modelId: string;
  onProviderChange: (provider: Provider) => void;
  onModelChange: (modelId: string) => void;
}

export function ModelSelector({
  provider,
  modelId,
  onProviderChange,
  onModelChange,
}: ModelSelectorProps) {
  const current = getProvider(provider);

  return (
    <div className="space-y-4">
      <div>
        <label className="mb-3 block text-sm font-medium text-slate-300">
          Proveedor
        </label>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {PROVIDERS.map((p) => {
            const active = p.id === provider;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => {
                  onProviderChange(p.id);
                  onModelChange(p.models[0].id);
                }}
                aria-pressed={active}
                className={`rounded-xl border px-3 py-3 text-sm font-medium transition ${
                  active
                    ? "border-blue-500/60 bg-blue-600/15 text-white"
                    : "border-white/10 bg-white/[0.03] text-slate-300 hover:border-white/20 hover:bg-white/5"
                }`}
              >
                {p.label}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label
          htmlFor="model-select"
          className="mb-3 block text-sm font-medium text-slate-300"
        >
          Modelo
        </label>
        <select
          id="model-select"
          value={modelId}
          onChange={(e) => onModelChange(e.target.value)}
          className="w-full appearance-none rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/30"
        >
          {current.models.map((m) => (
            <option key={m.id} value={m.id} className="bg-slate-900">
              {m.label}
              {m.description ? ` — ${m.description}` : ""}
            </option>
          ))}
        </select>
        <p className="mt-2 text-xs text-slate-500">
          Requiere{" "}
          <code className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-[11px] text-slate-300">
            {current.envVar}
          </code>{" "}
          configurada en el backend.
        </p>
      </div>
    </div>
  );
}
