import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { UptimeSection } from "@/components/uptime-section";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0b0c14] overflow-x-hidden">
      <Navbar />
      <Hero />
      <UptimeSection />
    </main>
  );
}