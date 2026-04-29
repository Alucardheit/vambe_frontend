import { Dashboard } from "@/components/dashboard/Dashboard";

export const metadata = {
  title: "Dashboard | Vambe",
  description: "Panel de indicadores comerciales",
};

export default function DashboardPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),_transparent_32%),linear-gradient(135deg,#08111f_0%,#0f172a_48%,#111827_100%)] text-white">
      <div className="absolute inset-0 -z-10 opacity-70">
        <div className="absolute left-[-8rem] top-[-6rem] h-72 w-72 rounded-full bg-cyan-500/25 blur-3xl" />
        <div className="absolute right-[-6rem] top-32 h-80 w-80 rounded-full bg-amber-500/20 blur-3xl" />
        <div className="absolute bottom-[-8rem] left-1/3 h-96 w-96 rounded-full bg-sky-500/15 blur-3xl" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-6 py-8 sm:px-10 lg:px-12">
        <header className="mb-8 border-b border-white/10 pb-6">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-cyan-200/80">
              Vambe
            </p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
              Panel de Control
            </h1>
          </div>
        </header>

        <Dashboard />
      </div>
    </main>
  );
}
