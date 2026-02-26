import { usePersona } from "@/contexts/PersonaContext";
import TypographyTooltip from "@/components/TypographyTooltip";

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M3.5 8H12.5M8.5 4L12.5 8L8.5 12" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Hero = () => {
  const { isCorporate } = usePersona();

  return (
    <section className="relative min-h-screen flex">
      <div className="flex-1 px-6 md:px-12 lg:px-20 pt-20 flex-row flex items-center justify-center">
        <div className="max-w-xl">
          <TypographyTooltip>
            <h1
              className="font-heading text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-foreground opacity-0 animate-fade-up"
              style={{ animationDelay: "0.3s" }}>
              {isCorporate ? "Hello, I craft digital products that deliver." : "Yeah Dude Welcome"}
            </h1>
          </TypographyTooltip>
          <p className="mt-8 text-lg md:text-xl text-muted-foreground font-body leading-relaxed max-w-md opacity-0 animate-fade-up"
            style={{ animationDelay: "0.5s" }}>
            {isCorporate
              ? "A multidisciplinary designer and developer specializing in immersive digital experiences that drive measurable business results."
              : "I build, I style, and I design; Bringing dreams to life, one line at a time."}
          </p>
          <div
            className="mt-10 flex items-center gap-5 opacity-0 animate-fade-up"
            style={{ animationDelay: "0.7s" }}>
            <a
              href="#work"
              className="neon-btn"
              style={{
                "--neon-gradient": "linear-gradient(90deg, #7c3aed, #ec4899)",
                "--neon-dot": "#ec4899",
              } as React.CSSProperties}
            >
              <span className="neon-label">{isCorporate ? "View Portfolio" : "Scroll for work"}</span>
              <span className="neon-arrow"><ArrowIcon /></span>
            </a>
            <a
              href="https://www.linkedin.com/in/mrityunjay0/"
              target="_blank"
              rel="noopener noreferrer"
              className="neon-link text-primary font-body text-sm font-medium hover:underline transition-all duration-300">
              {isCorporate ? "Connect on LinkedIn" : "LinkedIn, if you must"}
            </a>
          </div>
        </div>
      </div>

      <div className="hidden lg:block w-[45%] relative">
        <img
          alt="Abstract dark visual"
          className="absolute inset-0 w-full h-full object-cover rounded-none shadow-none border-none border-0"
          src="/lovable-uploads/e1df137f-f656-46bb-8103-d507f774eda2.png" />
      </div>

      <div className="absolute bottom-10 left-6 md:left-12 lg:left-20 flex items-center gap-3 opacity-0 animate-fade-in" style={{ animationDelay: "1.2s" }}>
        <div className="w-8 h-px bg-border" />
        <span className="text-muted-foreground text-xs tracking-[0.2em] uppercase font-body">Scroll</span>
      </div>
    </section>
  );
};

export default Hero;
