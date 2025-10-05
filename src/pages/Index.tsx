import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { PreLoader } from "@/components/PreLoader";
import { CustomCursor } from "@/components/CustomCursor";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { StatsSection } from "@/components/StatsSection";
import { MarqueeSection } from "@/components/MarqueeSection";
import { AboutSection } from "@/components/AboutSection";
import { ShowcaseSection } from "@/components/ShowcaseSection";
import { ProductAssemblySection } from "@/components/ProductAssemblySection";
import { GraphSection } from "@/components/GraphSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { LogosSection } from "@/components/LogosSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <CustomCursor />
      <AnimatePresence mode="wait">
        {loading && <PreLoader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <div className="min-h-screen">
          <Navbar />
          <main>
            <HeroSection />
            <StatsSection />
            <MarqueeSection />
            <AboutSection />
            <ShowcaseSection />
            <ProductAssemblySection />
            <GraphSection />
            <TestimonialsSection />
            <LogosSection />
          </main>
          <Footer />
        </div>
      )}
    </>
  );
};

export default Index;
