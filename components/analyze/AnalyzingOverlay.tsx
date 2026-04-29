"use client";

import { useEffect, useState } from "react";

const MESSAGES = [
  "Subiendo archivo...",
  "Conectando con el modelo...",
  "Leyendo transcripciones...",
  "Detectando industrias...",
  "Calificando intereses...",
  "Identificando objeciones...",
  "Estimando probabilidad de cierre...",
  "Calculando indicadores...",
  "Preparando dashboard...",
  "Casi listo...",
];

const INTERVAL_MS = 2200;

export function AnalyzingOverlay() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % MESSAGES.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 px-6 backdrop-blur-md"
    >
      <div className="flex flex-col items-center gap-8 text-center">
        <div className="relative h-24 w-24">
          <span className="absolute inset-0 animate-ping rounded-full bg-blue-500/25" />
          <span className="absolute inset-2 animate-spin rounded-full border-4 border-white/10 border-t-blue-500" />
          <span className="absolute inset-0 flex items-center justify-center text-2xl">
            ◆
          </span>
        </div>

        <div className="space-y-2">
          <p className="text-2xl font-semibold tracking-tight text-white">
            Analizando con IA
          </p>
          <p
            key={index}
            className="min-h-[1.25rem] animate-[fadeIn_0.4s_ease-out] text-sm text-slate-400"
          >
            {MESSAGES[index]}
          </p>
        </div>

        <div className="flex items-center gap-1.5">
          {MESSAGES.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i <= index ? "w-6 bg-blue-500" : "w-1.5 bg-white/15"
              }`}
            />
          ))}
        </div>

        <span className="sr-only">Procesando, por favor espera</span>
      </div>
    </div>
  );
}
