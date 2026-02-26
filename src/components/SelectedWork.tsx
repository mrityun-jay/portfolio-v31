import { useScrollReveal } from "@/hooks/useScrollReveal";
import { usePersona } from "@/contexts/PersonaContext";
import TypographyTooltip from "@/components/TypographyTooltip";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";

const dudeProjects = [
  { title: "Coming Soon", description: "A fintech analytics platform that increased user engagement by 47% through intuitive data visualization.", tags: ["UX/UI", "Web App", "Fintech"], image: project1 },
  { title: "Coming Soon", description: "Mobile-first investment app redesign that drove a 3x increase in daily active users.", tags: ["Mobile", "UX", "AI"], image: project2 },
  { title: "Coming Soon", description: "Complete brand identity system for a creative agency, from strategy to digital touchpoints.", tags: ["Branding", "Identity", "Print"], image: project3 },
  { title: "Coming Soon", description: "Premium e-commerce experience that boosted conversion rates by 62% for a luxury footwear brand.", tags: ["E-Commerce", "UX/UI", "Web App"], image: project4 },
];

const corporateProjects = [
  { title: "Coming Soon", description: "Enterprise analytics platform delivering actionable financial insights, resulting in a 47% increase in user engagement.", tags: ["UX/UI", "Web App", "Fintech"], image: project1 },
  { title: "Coming Soon", description: "Strategic mobile application redesign focused on user retention, achieving a 3x growth in daily active users.", tags: ["Mobile", "UX", "AI"], image: project2 },
  { title: "Coming Soon", description: "Comprehensive brand identity development for a creative agency, encompassing strategy through digital implementation.", tags: ["Branding", "Identity", "Print"], image: project3 },
  { title: "Coming Soon", description: "High-end e-commerce platform optimization that achieved a 62% improvement in conversion rates for a premium footwear brand.", tags: ["E-Commerce", "UX/UI", "Web App"], image: project4 },
];

const ProjectCard = ({ project, index }: { project: typeof dudeProjects[0]; index: number }) => {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <div
      ref={ref}
      className={`group cursor-pointer transition-all duration-700 ${
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
      style={{ transitionDelay: `${index * 100}ms` }}>
      <div className="relative overflow-hidden rounded-lg bg-secondary mb-6">
        <img src={project.image} alt={project.title} className="w-full aspect-[16/10] object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
      </div>
      <div className="flex flex-wrap gap-2 mb-3">
        {project.tags.map((tag) =>
        <span key={tag} className="text-xs font-body tracking-wider uppercase text-muted-foreground border border-border px-3 py-1 rounded-full">
            {tag}
          </span>
        )}
      </div>
      <TypographyTooltip>
        <h3 className="font-heading text-2xl md:text-3xl text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
          {project.title}
        </h3>
      </TypographyTooltip>
      <p className="text-muted-foreground font-body leading-relaxed max-w-lg">
        {project.description}
      </p>
    </div>
  );
};

const SelectedWork = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();
  const { isCorporate } = usePersona();
  const projects = isCorporate ? corporateProjects : dudeProjects;

  return (
    <section id="work" className="section-padding">
      <div className="container-wide">
        <div
          ref={headerRef}
          className={`mb-20 transition-all duration-700 ${
          headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <p className="text-primary text-sm tracking-[0.2em] uppercase font-body font-medium mb-4">Selected Work</p>
          <TypographyTooltip>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-foreground">
              {isCorporate ? "Featured Projects; proven results." : "Look What I Build; deliver results."}
            </h2>
          </TypographyTooltip>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 lg:gap-12">
          {projects.map((project, i) =>
          <ProjectCard key={project.title + i} project={project} index={i} />
          )}
        </div>
      </div>
    </section>
  );
};

export default SelectedWork;
