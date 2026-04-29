import type { IndicatorsResponse } from "./api";

const KEY = "vambe:indicators";

export interface StoredIndicators {
  data: IndicatorsResponse;
  meta: {
    filename?: string;
    provider: string;
    model: string;
    language: "es" | "en";
    computedAt: string;
  };
}

const listeners = new Set<() => void>();

function notify() {
  for (const l of listeners) l();
}

export function saveIndicators(stored: StoredIndicators): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(KEY, JSON.stringify(stored));
    notify();
  } catch {
    // Storage might be full or disabled — fail silently.
  }
}

export function clearIndicators(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(KEY);
  notify();
}

// React external-store interface

export function subscribeIndicators(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  listeners.add(callback);
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) callback();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", onStorage);
  };
}

export function getIndicatorsSnapshot(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return sessionStorage.getItem(KEY);
  } catch {
    return null;
  }
}

export function getIndicatorsServerSnapshot(): null {
  return null;
}

export function parseStoredIndicators(
  raw: string | null
): StoredIndicators | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as StoredIndicators;
  } catch {
    return null;
  }
}
