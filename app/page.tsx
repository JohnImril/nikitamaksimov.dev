import { Hero } from "@/components/hero/hero";
import { ImpactMetrics } from "@/components/impact/impact-metrics";
import { FeaturedWork } from "@/components/work/featured-work";
import { ExperienceSection } from "@/components/experience/experience-section";
import { AboutSection, ContactSection } from "@/components/home-sections";

export default function Home() {
  return (
    <main id="main-content">
      <Hero />
      <ImpactMetrics />
      <FeaturedWork />
      <ExperienceSection />
      <AboutSection />
      <ContactSection />
    </main>
  );
}
