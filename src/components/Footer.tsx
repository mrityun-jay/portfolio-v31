import { useScrollReveal } from "@/hooks/useScrollReveal";
import { usePersona } from "@/contexts/PersonaContext";
import TypographyTooltip from "@/components/TypographyTooltip";

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M3.5 8H12.5M8.5 4L12.5 8L8.5 12" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Footer = () => {
  const { ref, isVisible } = useScrollReveal();
  const { isCorporate } = usePersona();

  return (
    <footer id="contact" className="section-padding surface-dark border-t border-surface-dark-foreground/10">
      <div className="container-wide">
        <div
          ref={ref}
          className={`text-center max-w-3xl mx-auto transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <p className="text-primary text-sm tracking-[0.2em] uppercase font-body font-medium mb-6">Get in Touch</p>
          <TypographyTooltip>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-surface-dark-foreground mb-6 leading-tight">
              {isCorporate ? "Have a project in mind? Let's collaborate." : "Have a project? Let's talk."}
            </h2>
          </TypographyTooltip>
          <p className="text-surface-dark-foreground/60 font-body text-lg mb-10">
            {isCorporate
              ? "I welcome opportunities to discuss new projects, strategic partnerships, and innovative collaborations."
              : "Always open to discussing new projects, creative ideas, or opportunities to be part of something great."}
          </p>
          <a
            href="mailto:jaymrin01@gmail.com"
            className="neon-btn"
            style={{
              "--neon-gradient": "linear-gradient(90deg, #06b6d4, #10b981)",
              "--neon-dot": "#10b981",
            } as React.CSSProperties}
          >
            <span className="neon-label">jaymrin01@gmail.com</span>
            <span className="neon-arrow"><ArrowIcon /></span>
          </a>
        </div>

        <div className="mt-24 pt-8 border-t border-surface-dark-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-surface-dark-foreground/40 text-sm font-body">
            © 2026 Jaymrin. All rights reserved.
          </p>
          <div className="flex gap-6">
            {[
              { label: "Twitter", href: "#" },
              { label: "Dribbble", href: "#" },
              { label: "LinkedIn", href: "https://www.linkedin.com/in/mrityunjay0/" },
              { label: "GitHub", href: "#" },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target={social.href !== "#" ? "_blank" : undefined}
                rel={social.href !== "#" ? "noopener noreferrer" : undefined}
                className="text-sm text-surface-dark-foreground/40 hover:text-primary transition-colors duration-300 font-body"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
