import Link from "next/link";
import { Logo } from "./Logo";

const navItems = [
  { label: "Análisis", href: "/analyze" },
  { label: "Dashboard", href: "/dashboard" },
];

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4 sm:top-6">
      <nav
        aria-label="Navegación principal"
        className="flex w-full max-w-5xl items-center justify-between gap-4 rounded-full border border-white/10 bg-slate-950/70 px-4 py-2.5 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.6)] backdrop-blur-xl sm:px-5"
      >
        <Link
          href="/"
          aria-label="Ir al inicio"
          className="flex items-center rounded-full px-2 py-1 transition hover:opacity-90"
        >
          <Logo />
        </Link>

        <ul className="hidden items-center gap-1 sm:flex">
          {navItems.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className="inline-flex items-center rounded-full px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/5 hover:text-white"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/analyze"
          className="inline-flex h-10 items-center rounded-full bg-blue-600 px-4 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_rgba(37,99,235,0.7)] transition hover:bg-blue-500"
        >
          Comenzar
        </Link>
      </nav>
    </header>
  );
}
