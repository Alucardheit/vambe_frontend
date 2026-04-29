import { Hero } from "@/components/landing/Hero";
import { Navbar } from "@/components/landing/Navbar";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
        <Hero />
      </main>
    </>
  );
}
