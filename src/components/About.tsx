import { useScrollReveal } from "@/hooks/useScrollReveal";
import { usePersona } from "@/contexts/PersonaContext";
import TypographyTooltip from "@/components/TypographyTooltip";

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M3.5 8H12.5M8.5 4L12.5 8L8.5 12" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const About = () => {
  const { ref, isVisible } = useScrollReveal();
  const { isCorporate } = usePersona();

  return (
    <section id="about" className="section-padding">
      <div className="container-wide">
        <div
          ref={ref}
          className={`grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>

          <div className="relative">
            <div className="relative overflow-hidden rounded-lg">
              <img
                alt="Portrait"
                className="w-full aspect-[4/5] object-cover"
                loading="lazy"
                src="/lovable-uploads/ce822e23-4bec-4757-b02c-7d84b25db1f0.png" />
            </div>
          </div>

          <div>
            <p className="text-primary text-sm tracking-[0.2em] uppercase font-body font-medium mb-4">About</p>
            <TypographyTooltip>
              <h2 className="font-heading text-4xl md:text-5xl text-foreground mb-8 leading-tight">
                {isCorporate
                  ? "Passionate about innovation. Driven by excellence."
                  : "Anything sparked your curiosity! hmm? Driven by impact."}
              </h2>
            </TypographyTooltip>
            <div className="space-y-5 text-muted-foreground font-body leading-relaxed text-lg">
              {isCorporate ? (
                <>
                  <p>I specialize in building immersive AR and VR experiences with a focus on spatial computing, real-time rendering, and user-centered design. My work bridges the gap between cutting-edge technology and intuitive user experiences.</p>
                  <p>With deep expertise in 3D development and spatial mathematics, I ensure every project delivers seamless performance and exceptional quality across all platforms and devices.</p>
                  <p>From hardware design to software development, I deliver end-to-end solutions that push the boundaries of what's possible in extended reality. I'd love to bring that expertise to your team.</p>
                </>
              ) : (
                <>
                  <p>Look, I basically fix reality because the default version is mid as hell. I spend my days building AR and VR worlds where the physics actually work and the vibes are solid, mostly so you have something cooler to look at than a blank wall.</p>
                  <p>It's a lot of sweating over code and spatial math just to make sure your headset doesn't turn into an expensive f*cking paperweight.</p>
                  <p>I design the gear, I build the substance, and you get to pretend you're in the future. It's a tough job, but someone's gotta make this digital shit look good. haha now hire me cause i got more humour than your entire teaam!</p>
                </>
              )}
            </div>
            <a
              href="#contact"
              className="inline-flex mt-10 neon-btn"
              style={{
                "--neon-gradient": "linear-gradient(90deg, #3b82f6, #06b6d4)",
                "--neon-dot": "#06b6d4",
              } as React.CSSProperties}
            >
              <span className="neon-label">
                {isCorporate ? "Schedule a consultation" : "Let's build something"}
              </span>
              <span className="neon-arrow"><ArrowIcon /></span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
