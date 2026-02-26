import { useState, useEffect, useRef } from "react";
import { Switch } from "@/components/ui/switch";
import { usePersona } from "@/contexts/PersonaContext";
import { useFont } from "@/contexts/FontContext";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

// ─── Magnetic zoom nav item for dude mode ───
const MagneticNavItem = ({ label, href, isLink }: { label: string; href: string; isLink: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ scale: 1, x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const maxDist = 80;
    if (dist < maxDist) {
      const strength = 1 - dist / maxDist;
      setTransform({
        scale: 1 + strength * 0.7,
        x: dx * strength * 0.4,
        y: dy * strength * 0.4,
      });
    }
  };

  const handleMouseLeave = () => {
    setTransform({ scale: 1, x: 0, y: 0 });
  };

  const style: React.CSSProperties = {
    transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
    transition: transform.scale === 1 ? "transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)" : "transform 0.1s ease-out",
    display: "inline-block",
    transformOrigin: "left center",
  };

  const className = "font-body text-[10px] tracking-[0.2em] uppercase cursor-pointer select-none"
    + (transform.scale > 1 ? " text-foreground" : " text-foreground/50");

  return (
    <div ref={ref} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      {isLink ? (
        <Link to={href} style={style} className={className}>{label}</Link>
      ) : (
        <a href={href} style={style} className={className}>{label}</a>
      )}
    </div>
  );
};

const FontDropdown = ({
  font,
  setFont,
  fonts,
  fontOpen,
  setFontOpen,
  dropdownAlign = "left",
}: {
  font: string;
  setFont: (f: string) => void;
  fonts: string[];
  fontOpen: boolean;
  setFontOpen: (o: boolean) => void;
  dropdownAlign?: "left" | "right";
}) => (
  <div className="relative">
    <button
      onClick={() => setFontOpen(!fontOpen)}
      className="flex items-center gap-2 bg-surface-dark text-surface-dark-foreground/80 hover:text-surface-dark-foreground px-4 py-2 rounded-full font-body text-sm transition-colors duration-300"
    >
      <span className="max-w-[100px] truncate" style={{ fontFamily: `"${font}"` }}>
        {font}
      </span>
      <ChevronDown
        className={`w-3.5 h-3.5 transition-transform duration-200 ${fontOpen ? "rotate-180" : ""}`}
      />
    </button>
    {fontOpen && (
      <>
        <div className="fixed inset-0 z-40" onClick={() => setFontOpen(false)} />
        <div
          className={`absolute ${
            dropdownAlign === "left" ? "left-0" : "right-0"
          } top-full mt-2 z-50 w-64 max-h-80 overflow-y-auto rounded-xl border border-border bg-popover p-2 shadow-xl`}
        >
          {fonts.map((f) => (
            <button
              key={f}
              onClick={() => {
                setFont(f);
                setFontOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-body transition-colors duration-150 hover:bg-accent hover:text-accent-foreground ${
                font === f ? "bg-primary/10 text-primary" : "text-popover-foreground"
              }`}
              style={{ fontFamily: `"${f}", sans-serif` }}
            >
              {f}
            </button>
          ))}
        </div>
      </>
    )}
  </div>
);

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const { setPersona, isCorporate } = usePersona();
  const { font, setFont, fonts } = useFont();
  const [fontOpen, setFontOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-background/80 backdrop-blur-xl" : ""
      }`}
    >
      <div className="container-wide flex items-center justify-between h-20">

        {/* LEFT: Name + Toggle + Font dropdown (both modes) */}
        <div className="flex items-center gap-4">
          <div className="flex flex-col gap-0.5">
            <a href="#" className="font-heading text-2xl text-foreground leading-tight">
              Jaymrin
            </a>
            <div className="flex items-center gap-2.5">
              <span
                className={`text-[10px] font-body tracking-wider uppercase transition-colors duration-300 ${
                  isCorporate ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                Corporate
              </span>
              <Switch
                checked={!isCorporate}
                onCheckedChange={(checked) => setPersona(checked ? "dude" : "corporate")}
                className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-muted-foreground/30 h-4 w-8 flex-shrink-0"
              />
              <span
                className={`text-[10px] font-body tracking-wider uppercase transition-colors duration-300 pl-0.5 ${
                  !isCorporate ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                Dude
              </span>
            </div>
          </div>

          {/* Font dropdown sits right next to the name in BOTH modes */}
          <FontDropdown
            font={font}
            setFont={setFont}
            fonts={fonts}
            fontOpen={fontOpen}
            setFontOpen={setFontOpen}
            dropdownAlign="left"
          />
        </div>

        {/* RIGHT: Nav buttons — CORPORATE mode only */}
        {isCorporate && (
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center bg-surface-dark rounded-full px-1 py-1">
              {["Work", "About"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-sm font-body text-surface-dark-foreground/80 hover:text-surface-dark-foreground px-5 py-2 rounded-full transition-colors duration-300"
                >
                  {item}
                </a>
              ))}
            </div>

            <Link
              to="/assignments"
              className="neon-btn-secondary"
              style={{} as React.CSSProperties}
            >
              <span>Progress</span>
            </Link>

            <a
              href="#contact"
              className="neon-btn"
              style={{
                "--neon-gradient": "linear-gradient(90deg, #7c3aed, #ec4899)",
                "--neon-dot": "#ec4899",
              } as React.CSSProperties}
            >
              <span className="neon-label">Get in Touch</span>
              <span className="neon-arrow">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M3.5 8H12.5M8.5 4L12.5 8L8.5 12"
                    stroke="white"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </a>
          </div>
        )}
      </div>

      {/* DUDE mode: vertical stacked nav buttons on the left, vertically centered */}
      {!isCorporate && (
        <div className="fixed left-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4 items-start">
          {[
            { label: "Work Button", href: "#work", isLink: false },
            { label: "About Button", href: "#about", isLink: false },
            { label: "Progress", href: "/assignments", isLink: true },
            { label: "Let's Talk Button", href: "#contact", isLink: false },
          ].map(({ label, href, isLink }) => (
            <MagneticNavItem key={label} label={label} href={href} isLink={isLink} />
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navigation;
