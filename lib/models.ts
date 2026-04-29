export type Provider = "openai" | "gemini" | "claude" | "huggingface";

export interface ModelOption {
  id: string;
  label: string;
  description?: string;
}

export interface ProviderInfo {
  id: Provider;
  label: string;
  envVar: string;
  models: ModelOption[];
}

export const PROVIDERS: ProviderInfo[] = [
  {
    id: "openai",
    label: "OpenAI",
    envVar: "OPENAI_API_KEY",
    models: [
      {
        id: "gpt-4o-mini",
        label: "GPT-4o mini",
        description: "Rápido y económico",
      },
      { id: "gpt-4o", label: "GPT-4o", description: "Mayor calidad" },
    ],
  },
  {
    id: "gemini",
    label: "Gemini",
    envVar: "GOOGLE_API_KEY",
    models: [
      {
        id: "gemini-2.0-flash",
        label: "Gemini 2.0 Flash",
        description: "Rápido",
      },
      {
        id: "gemini-1.5-pro",
        label: "Gemini 1.5 Pro",
        description: "Mayor calidad",
      },
    ],
  },
  {
    id: "claude",
    label: "Claude",
    envVar: "ANTHROPIC_API_KEY",
    models: [
      {
        id: "claude-haiku-4-5",
        label: "Claude Haiku 4.5",
        description: "Rápido",
      },
      {
        id: "claude-sonnet-4-6",
        label: "Claude Sonnet 4.6",
        description: "Mayor calidad",
      },
    ],
  },
  {
    id: "huggingface",
    label: "Hugging Face",
    envVar: "HF_TOKEN",
    models: [
      {
        id: "HuggingFaceTB/SmolLM2-1.7B-Instruct",
        label: "SmolLM2 1.7B",
        description: "Modelo abierto pequeño",
      },
    ],
  },
];

export const DEFAULT_PROVIDER: Provider = "gemini";
export const DEFAULT_MODEL_ID =
  PROVIDERS.find((p) => p.id === DEFAULT_PROVIDER)!.models[0].id;

export function getProvider(id: Provider): ProviderInfo {
  const found = PROVIDERS.find((p) => p.id === id);
  if (!found) throw new Error(`Provider desconocido: ${id}`);
  return found;
}
