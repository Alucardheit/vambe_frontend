# Vambe — Frontend

Aplicación Next.js para análisis comercial con IA. Sube transcripciones de ventas en CSV y obtén un dashboard con indicadores accionables sobre industria, interés y probabilidad de cierre.

## Stack

- Next.js 16 (App Router) + React 19
- TypeScript
- Tailwind CSS v4
- ESLint (config Next.js)

## Requisitos

- Node.js 20 o superior
- npm 10 o superior
- Backend de Vambe corriendo (ver variable `NEXT_PUBLIC_API_URL`)

## Puesta en marcha

1. Clona el repositorio e instala dependencias:

   ```bash
   git clone <url-del-repo>
   cd vambe_frontend
   npm install
   ```

2. Crea tu archivo de variables de entorno copiando el ejemplo:

   ```bash
   cp .env.example .env.local
   ```

   Ajusta `NEXT_PUBLIC_API_URL` si tu backend corre en otra URL/puerto.

3. Levanta el servidor de desarrollo:

   ```bash
   npm run dev
   ```

   Abre [http://localhost:3000](http://localhost:3000).

## Variables de entorno

| Variable              | Descripción                              | Default                 |
| --------------------- | ---------------------------------------- | ----------------------- |
| `NEXT_PUBLIC_API_URL` | URL base del backend de Vambe (FastAPI). | `http://localhost:8000` |

El backend debe exponer los endpoints `POST /clients/analyze` y `POST /indicators/compute` y tener configuradas las API keys del proveedor de IA que se elija (`OPENAI_API_KEY`, `GOOGLE_API_KEY`, `ANTHROPIC_API_KEY` o `HF_TOKEN`).

## Scripts

| Comando         | Acción                                     |
| --------------- | ------------------------------------------ |
| `npm run dev`   | Servidor de desarrollo en `localhost:3000` |
| `npm run build` | Build de producción                        |
| `npm run start` | Sirve el build de producción               |
| `npm run lint`  | Ejecuta ESLint                             |

## Estructura

```
app/
  layout.tsx          # Layout raíz, fuente y metadatos globales
  page.tsx            # Landing
  analyze/page.tsx    # Carga de CSV + selección de proveedor/modelo
  dashboard/page.tsx  # Panel de indicadores
  globals.css         # Estilos globales (Tailwind)
components/
  landing/            # Hero, Navbar, Logo
  analyze/            # ModelSelector, AnalyzingOverlay
  dashboard/          # Dashboard, charts y tarjetas
lib/
  api.ts              # Cliente HTTP del backend
  models.ts           # Catálogo de proveedores y modelos
  indicators-storage.ts # Persistencia de indicadores en sessionStorage
```

## Flujo de uso

1. Entra a `/analyze`, elige proveedor y modelo, idioma y sube un CSV con la columna `Transcripcion`.
2. El frontend llama a `/indicators/compute` del backend, guarda la respuesta en `sessionStorage` y redirige a `/dashboard`.
3. El dashboard lee los indicadores y muestra gráficos y tarjetas. Vuelve a `/analyze` para procesar otro CSV.

## Build de producción

```bash
npm run build
npm run start
```
