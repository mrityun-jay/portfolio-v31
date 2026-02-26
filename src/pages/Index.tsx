import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import SelectedWork from "@/components/SelectedWork";
import About from "@/components/About";
import Services from "@/components/Services";
import Footer from "@/components/Footer";
import { PersonaProvider, usePersona } from "@/contexts/PersonaContext";
import { FontProvider } from "@/contexts/FontContext";
import { useEffect, useRef, useState } from "react";

const IndexContent = () => {
  const { isCorporate } = usePersona();
  const [blurring, setBlurring] = useState(false);
  const prevCorporate = useRef(isCorporate);

  useEffect(() => {
    // Only trigger the blur-in animation when switching TO dude mode
    if (!isCorporate && prevCorporate.current !== isCorporate) {
      setBlurring(true);
      const t = setTimeout(() => setBlurring(false), 800);
      prevCorporate.current = isCorporate;
      return () => clearTimeout(t);
    }
    prevCorporate.current = isCorporate;
  }, [isCorporate]);

  return (
    <main
      className={`bg-background text-foreground min-h-screen transition-colors duration-500 ${
        !isCorporate ? "dude-mode" : ""
      } ${blurring ? "dude-blur-in" : ""}`}
    >
      <Navigation />
      <Hero />
      <SelectedWork />
      <About />
      <Services />
      <Footer />
    </main>
  );
};

const Index = () => {
  return (
    <PersonaProvider>
      <FontProvider>
        <IndexContent />
      </FontProvider>
    </PersonaProvider>
  );
};

export default Index;
