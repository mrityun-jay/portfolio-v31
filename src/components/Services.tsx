import { useScrollReveal } from "@/hooks/useScrollReveal";
import { usePersona } from "@/contexts/PersonaContext";
import TypographyTooltip from "@/components/TypographyTooltip";

const services = [
  {
    title: "Product Strategy",
    description: "Research-driven strategy that aligns user needs with business objectives for measurable outcomes.",
    corporateDescription: "Comprehensive product strategy leveraging market research, competitive analysis, and user insights to deliver measurable business outcomes.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
      </svg>
    ),
  },
  {
    title: "UX/UI Design",
    description: "Intuitive interfaces built on user research, validated through testing, and polished to perfection.",
    corporateDescription: "User-centered interface design grounded in rigorous research methodologies, iterative testing, and industry-leading design principles.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" />
      </svg>
    ),
  },
  {
    title: "Creative Development",
    description: "Pixel-perfect front-end development with smooth animations and performance-first architecture.",
    corporateDescription: "Production-grade front-end engineering with an emphasis on performance optimization, accessibility compliance, and seamless animations.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    title: "Branding",
    description: "Distinctive visual identities that capture essence, build trust, and create lasting recognition.",
    corporateDescription: "Strategic brand development that establishes distinctive market positioning, builds stakeholder trust, and drives long-term brand equity.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
];

const Services = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();
  const { isCorporate } = usePersona();

  return (
    <section className="section-padding surface-dark">
      <div className="container-wide">
        <div
          ref={headerRef}
          className={`mb-20 transition-all duration-700 ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-primary text-sm tracking-[0.2em] uppercase font-body font-medium mb-4">Services</p>
          <TypographyTooltip>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-surface-dark-foreground">
              {isCorporate ? "Core Capabilities." : "What I do."}
            </h2>
          </TypographyTooltip>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} isCorporate={isCorporate} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ServiceCard = ({ service, index, isCorporate }: { service: typeof services[0]; index: number; isCorporate: boolean }) => {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <div
      ref={ref}
      className={`p-8 md:p-10 rounded-lg border border-surface-dark-foreground/10 group hover:border-primary/30 transition-all duration-500 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="text-surface-dark-foreground/50 group-hover:text-primary transition-colors duration-300 mb-5">
        {service.icon}
      </div>
      <TypographyTooltip>
        <h3 className="font-heading text-xl md:text-2xl text-surface-dark-foreground mb-3">
          {service.title}
        </h3>
      </TypographyTooltip>
      <p className="text-surface-dark-foreground/60 font-body leading-relaxed">
        {isCorporate ? service.corporateDescription : service.description}
      </p>
    </div>
  );
};

export default Services;
