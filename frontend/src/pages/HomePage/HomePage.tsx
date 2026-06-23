import Hero from "../../components/sections/Hero";
import TrustedBy from "../../components/sections/TrustedBy";
import Features from "../../components/sections/Features";
import WhySection from "../../components/sections/WhySection";
import ProductWalkthrough from "../../components/sections/ProductWalkthrough";
import Comparison from "../../components/sections/Comparison";
import AISection from "../../components/sections/AISection";
import AnalyticsShowcase from "../../components/sections/AnalyticsShowcase";
import Collaboration from "../../components/sections/Collaboration";
import Pricing from "../../components/sections/Pricing";
import Testimonials from "../../components/sections/Testimonials";
import FAQ from "../../components/sections/FAQ";

export default function HomePage() {
  return (
    <main className="bg-[#09090b]">
      {/* 1. Hero Section (Centered layout with zoom mockup) */}
      <Hero />
      
      {/* 2. Trusted By (Partners logo ticker marquee) */}
      <TrustedBy />
      
      {/* 3. Features (Tabbed Interface with 3D tilts) */}
      <Features />
      
      {/* 4. Why Section (5 Benefit Bento Grid) */}
      <WhySection />

      {/* 5. Product Walkthrough (Demo scroll section) */}
      <ProductWalkthrough />
      
      {/* 6. Comparison (Before/After table) */}
      <Comparison />
      
      {/* 7. AI Section (Command Center Mockup) */}
      <AISection />
      
      {/* 8. Analytics Showcase (Velocity & sprint charts) */}
      <AnalyticsShowcase />
      
      {/* 9. Collaboration (Multiplayer / Team Hub) */}
      <Collaboration />
      
      {/* 10. Pricing (Subscription tiers) */}
      <Pricing />
      
      {/* 11. Testimonials (Customer quotes) */}
      <Testimonials />
      
      {/* 12. FAQ (Accordions) */}
      <FAQ />
    </main>
  );
}
