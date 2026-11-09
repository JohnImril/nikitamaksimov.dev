import { Hero } from "@/components/hero/hero";
import { EngineeringStrengths } from "@/components/impact/engineering-strengths";
import { FeaturedWork } from "@/components/work/featured-work";
import { ExperienceSection } from "@/components/experience/experience-section";
import { AboutSection, ContactSection } from "@/components/home-sections";

export default function Home() {
  return (
    <main id="main-content" tabIndex={-1}>
      <Hero />
      <EngineeringStrengths />
      <FeaturedWork />
      <ExperienceSection />
      <AboutSection />
      <ContactSection />
    </main>
  );
}
