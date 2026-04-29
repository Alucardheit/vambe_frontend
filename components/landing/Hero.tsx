import Link from "next/link";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BackgroundDots />

      <div className="mx-auto flex w-full max-w-5xl flex-col items-center px-6 text-center">
        <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-slate-400 sm:text-xs">
          Análisis comercial con IA
        </p>

        <h1 className="mt-6 text-balance text-5xl font-bold leading-[0.95] tracking-tight text-white sm:text-7xl lg:text-[7rem] lg:leading-[0.92]">
          Convierte tus
          <br />
          conversaciones
          <br />
          en decisiones
        </h1>

        <p className="mt-8 max-w-2xl text-pretty text-base text-slate-300 sm:text-lg">
          Sube tus transcripciones de ventas y obtén un{" "}
          <strong className="font-semibold text-white">
            análisis accionable
          </strong>{" "}
          y un{" "}
          <strong className="font-semibold text-white">
            panel de indicadores
          </strong>{" "}
          sobre industria, interés y probabilidad de cierre.
        </p>

        <div className="mt-10 flex w-full flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <Link
            href="/analyze"
            className="inline-flex h-14 w-full items-center justify-center rounded-full bg-blue-600 px-8 text-base font-semibold text-white shadow-[0_12px_32px_-10px_rgba(37,99,235,0.8)] transition hover:bg-blue-500 sm:w-auto"
          >
            Analizar clientes
          </Link>

          <Link
            href="/dashboard"
            className="inline-flex h-14 w-full items-center justify-center rounded-full border border-white/20 bg-transparent px-8 text-base font-semibold text-white transition hover:bg-white/5 sm:w-auto"
          >
            Ver dashboard
          </Link>
        </div>
      </div>
    </section>
  );
}

function BackgroundDots() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10"
    >
      <div className="absolute inset-x-0 top-0 h-[60%] bg-[radial-gradient(ellipse_at_top,_rgba(59,130,246,0.18),_transparent_60%)]" />
      <div className="absolute inset-x-0 bottom-0 h-[40%] bg-[radial-gradient(ellipse_at_bottom,_rgba(15,23,42,0.8),_transparent_70%)]" />
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
    </div>
  );
}
