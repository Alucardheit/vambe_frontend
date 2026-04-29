import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Vambe — Análisis comercial con IA",
    template: "%s | Vambe",
  },
  description:
    "Sube tus transcripciones de ventas y obtén análisis accionable e indicadores sobre industria, interés y probabilidad de cierre.",
  openGraph: {
    title: "Vambe — Análisis comercial con IA",
    description:
      "Convierte tus conversaciones en decisiones con análisis e indicadores impulsados por IA.",
    locale: "es_CL",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#020617",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full bg-slate-950 text-white">{children}</body>
    </html>
  );
}
