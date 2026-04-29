"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { AnalyzingOverlay } from "@/components/analyze/AnalyzingOverlay";
import { ModelSelector } from "@/components/analyze/ModelSelector";
import { computeIndicators, type Language } from "@/lib/api";
import { saveIndicators } from "@/lib/indicators-storage";
import {
  DEFAULT_MODEL_ID,
  DEFAULT_PROVIDER,
  type Provider,
} from "@/lib/models";

export default function AnalyzePage() {
  const router = useRouter();

  const [provider, setProvider] = useState<Provider>(DEFAULT_PROVIDER);
  const [modelId, setModelId] = useState<string>(DEFAULT_MODEL_ID);
  const [language, setLanguage] = useState<Language>("es");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    if (
      selected.type !== "text/csv" &&
      !selected.name.toLowerCase().endsWith(".csv")
    ) {
      setError("Por favor selecciona un archivo CSV válido");
      return;
    }
    setFile(selected);
    setError(null);
  };

  const handleSubmit = async () => {
    if (!file) {
      setError("Selecciona un archivo CSV antes de continuar");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await computeIndicators(file, language, {
        provider,
        model: modelId,
      });

      saveIndicators({
        data,
        meta: {
          filename: file.name,
          provider,
          model: modelId,
          language,
          computedAt: new Date().toISOString(),
        },
      });

      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al analizar el CSV");
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 px-6 py-16 text-white sm:py-24">
      <BackgroundGlow />

      <div className="mx-auto w-full max-w-2xl">
        <header className="mb-10 text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-slate-400">
            Análisis comercial con IA
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Analizar clientes
          </h1>
          <p className="mt-3 text-sm text-slate-400">
            Elige un modelo, sube tu CSV y te llevamos al dashboard.
          </p>
        </header>

        <div className="space-y-8 rounded-3xl border border-white/10 bg-slate-900/40 p-6 backdrop-blur-xl sm:p-8">
          <ModelSelector
            provider={provider}
            modelId={modelId}
            onProviderChange={setProvider}
            onModelChange={setModelId}
          />

          <div>
            <label className="mb-3 block text-sm font-medium text-slate-300">
              Idioma del análisis
            </label>
            <div className="grid grid-cols-2 gap-2">
              <LanguageButton
                active={language === "es"}
                onClick={() => setLanguage("es")}
              >
                Español
              </LanguageButton>
              <LanguageButton
                active={language === "en"}
                onClick={() => setLanguage("en")}
              >
                English
              </LanguageButton>
            </div>
          </div>

          <div>
            <label className="mb-3 block text-sm font-medium text-slate-300">
              Archivo CSV
            </label>
            <label className="relative block">
              <input
                type="file"
                accept=".csv,text/csv"
                onChange={handleFileChange}
                className="sr-only"
              />
              <div className="cursor-pointer rounded-2xl border-2 border-dashed border-white/15 bg-white/[0.03] p-8 text-center transition hover:border-blue-500/40 hover:bg-white/5">
                {file ? (
                  <>
                    <p className="text-sm font-medium text-white">
                      {file.name}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {(file.size / 1024).toFixed(1)} KB
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-sm font-medium text-slate-200">
                      Arrastra o haz clic para subir CSV
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      Debe contener la columna Transcripcion
                    </p>
                  </>
                )}
              </div>
            </label>
          </div>

          {error ? (
            <div
              role="alert"
              className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-200"
            >
              {error}
            </div>
          ) : null}

          <button
            type="button"
            onClick={handleSubmit}
            disabled={!file || loading}
            className="inline-flex h-12 w-full items-center justify-center rounded-full bg-blue-600 px-6 text-base font-semibold text-white shadow-[0_12px_32px_-10px_rgba(37,99,235,0.8)] transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
          >
            {loading ? "Analizando..." : "Analizar y ver dashboard"}
          </button>
        </div>
      </div>

      {loading ? <AnalyzingOverlay /> : null}
    </main>
  );
}

function LanguageButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-xl border px-4 py-3 text-sm font-medium transition ${
        active
          ? "border-blue-500/60 bg-blue-600/15 text-white"
          : "border-white/10 bg-white/[0.03] text-slate-300 hover:border-white/20 hover:bg-white/5"
      }`}
    >
      {children}
    </button>
  );
}

function BackgroundGlow() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10"
    >
      <div className="absolute inset-x-0 top-0 h-[60%] bg-[radial-gradient(ellipse_at_top,_rgba(59,130,246,0.18),_transparent_60%)]" />
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
    </div>
  );
}
