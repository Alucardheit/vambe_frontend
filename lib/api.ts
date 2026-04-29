const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export type Language = "es" | "en";

// ----- Indicators -----

export interface CategoryStat {
  label: string;
  count: number;
  percentage: number;
}

export interface ClosedRate {
  total: number;
  closed: number;
  not_closed: number;
  closed_percentage: number;
  not_closed_percentage: number;
}

export interface ClosedRateByCategory {
  label: string;
  total: number;
  closed: number;
  not_closed: number;
  closed_percentage: number;
}

export interface ChartSeries {
  name: string;
  values: number[];
}

export interface StackedAreaChart {
  categories: string[];
  series: ChartSeries[];
}

export interface IndicatorsResponse {
  total_clients: number;
  analysis_errors: number;
  closed_rate: ClosedRate;
  by_industria: CategoryStat[];
  by_nivel_interes: CategoryStat[];
  by_probabilidad_cierre: CategoryStat[];
  by_fuente_lead: CategoryStat[];
  by_vendedor: CategoryStat[];
  closed_rate_by_industria: ClosedRateByCategory[];
  closed_rate_by_vendedor: ClosedRateByCategory[];
  industria_area_chart: StackedAreaChart;
}

// ----- Client analysis -----

export interface AnalyzedClientRowES {
  nombre: string;
  vendedor_asignado: string;
  closed: string;
  industria: string;
  caso_de_uso: string;
  volumen_interacciones: string;
  necesidades_especificas: string;
  fuente_lead: string;
  puntos_positivos: string;
  puntos_negativos: string;
  objeciones_principales: string;
  nivel_interes: string;
  probabilidad_cierre: string;
  proximos_pasos_sugeridos: string;
  resumen: string;
}

export interface AnalyzedClientRowEN {
  name: string;
  salesperson: string;
  closed: string;
  industry: string;
  use_case: string;
  interaction_volume: string;
  specific_needs: string;
  lead_source: string;
  positive_points: string;
  negative_points: string;
  main_objections: string;
  interest_level: string;
  closing_probability: string;
  suggested_next_steps: string;
  summary: string;
}

export type AnalyzedClientRow = AnalyzedClientRowES | AnalyzedClientRowEN;

export interface AnalyzeResponse {
  language: Language;
  count: number;
  rows: AnalyzedClientRow[];
}

// ----- Request options -----

export interface RequestOptions {
  provider?: string;
  model?: string;
  signal?: AbortSignal;
}

// ----- API helpers -----

async function readErrorDetail(response: Response): Promise<string> {
  try {
    const data = await response.json();
    if (typeof data?.detail === "string") return data.detail;
    if (data?.detail) return JSON.stringify(data.detail);
  } catch {
    /* fallthrough */
  }
  return response.statusText || `HTTP ${response.status}`;
}

function buildQuery(
  language: Language,
  options: RequestOptions = {},
  extra: Record<string, string> = {}
): string {
  const params = new URLSearchParams({ language, ...extra });
  if (options.provider) params.set("provider", options.provider);
  if (options.model) params.set("model", options.model);
  return params.toString();
}

export async function analyzeClients(
  file?: File,
  language: Language = "es",
  options: RequestOptions = {}
): Promise<AnalyzeResponse> {
  const formData = new FormData();
  if (file) formData.append("file", file);

  const query = buildQuery(language, options, { format: "json" });
  const response = await fetch(`${API_BASE_URL}/clients/analyze?${query}`, {
    method: "POST",
    body: formData,
    signal: options.signal,
  });

  if (!response.ok) {
    throw new Error(await readErrorDetail(response));
  }
  return response.json();
}

export async function computeIndicators(
  file?: File,
  language: Language = "es",
  options: RequestOptions = {}
): Promise<IndicatorsResponse> {
  const formData = new FormData();
  if (file) formData.append("file", file);

  const query = buildQuery(language, options);
  const response = await fetch(`${API_BASE_URL}/indicators/compute?${query}`, {
    method: "POST",
    body: formData,
    signal: options.signal,
  });

  if (!response.ok) {
    throw new Error(await readErrorDetail(response));
  }
  return response.json();
}

// ----- CSV helpers (client-side, no extra Gemini calls) -----

export function rowsToCsv(rows: Record<string, unknown>[]): string {
  if (rows.length === 0) return "";
  const headers = Object.keys(rows[0]);
  const escape = (v: unknown): string =>
    `"${String(v ?? "").replace(/"/g, '""')}"`;
  const lines = [headers.map(escape).join(",")];
  for (const row of rows) {
    lines.push(headers.map((h) => escape(row[h])).join(","));
  }
  return lines.join("\n");
}

export function downloadCsv(rows: Record<string, unknown>[], filename: string): void {
  const csv = rowsToCsv(rows);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  URL.revokeObjectURL(url);
  document.body.removeChild(a);
}
