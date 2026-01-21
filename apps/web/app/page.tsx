import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { UptimeSection } from "@/components/uptime-section";
import { IncidentSection } from "@/components/incident-section";
import { StatusPageSection } from "@/components/status-page.section";
import { ComparisonSection } from "@/components/comparison-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { CTASection } from "@/components/cta-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0b0c14] overflow-x-hidden">
      <Navbar />
      <Hero />
      <UptimeSection />
      <IncidentSection />
      <StatusPageSection />
      <ComparisonSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </main>
  );
}