import { useState, useRef, useCallback, useEffect, ReactNode } from "react";

interface TypographyTooltipProps {
  children: ReactNode;
  fontFamily?: string;
}

const ANATOMY = [
  { term: "Baseline", def: "The invisible line on which letters sit." },
  { term: "X-height", def: "The height of lowercase letters like 'x'." },
  { term: "Ascender", def: "The part of a letter that extends above the x-height (b, d, h)." },
  { term: "Descender", def: "The part that drops below the baseline (g, p, y)." },
  { term: "Stem", def: "The main vertical stroke of a letter." },
  { term: "Counter", def: "The enclosed or partially enclosed space within a letter (o, e)." },
  { term: "Terminal", def: "The end of a stroke that doesn't have a serif." },
  { term: "Ligature", def: "Two or more characters joined into a single glyph (fi, fl)." },
  { term: "Kerning", def: "The spacing adjustment between individual character pairs." },
  { term: "Leading", def: "The vertical space between lines of text." },
];

const TypographyTooltip = ({ children, fontFamily }: TypographyTooltipProps) => {
  const [show, setShow] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0, width: 0 });
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = useCallback((e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setPos({ x: rect.left + rect.width / 2, y: rect.top, width: rect.width });
    timerRef.current = setTimeout(() => setShow(true), 500);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = null;
    setShow(false);
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const displayFont = fontFamily || getComputedStyle(document.documentElement).getPropertyValue("--font-heading").trim().replace(/"/g, "") || "Unknown";

  // Popup total width: two boxes 200px each + 12px gap = 412px
  const popupWidth = 412;
  const leftEdge = Math.min(Math.max(pos.x - popupWidth / 2, 8), window.innerWidth - popupWidth - 8);
  // Arrow position relative to the popup container
  const arrowLeft = pos.x - leftEdge;

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="inline"
    >
      {children}
      {show && (
        <div
          className="fixed z-[9999]"
          style={{
            left: leftEdge,
            top: pos.y,
            transform: "translateY(calc(-100% - 12px))",
            width: popupWidth,
            animation: "tooltipFadeUp 0.25s ease forwards",
          }}
          onMouseEnter={() => { /* keep open */ }}
          onMouseLeave={handleMouseLeave}
        >
          {/* Two popup boxes side by side */}
          <div className="flex gap-3">
            {/* Box 1 – Typeface */}
            <div className="flex-1 rounded-xl border border-border bg-popover text-popover-foreground p-4 shadow-2xl">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-body mb-1">Typeface</p>
              <p
                className="text-lg font-heading leading-tight"
                style={{ fontFamily: `"${displayFont}", serif` }}
              >
                {displayFont}
              </p>
              <div className="mt-3 pt-3 border-t border-border space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-body">Style</span>
                  <span className="text-xs font-body text-foreground">Serif</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-body">Weight</span>
                  <span className="text-xs font-body text-foreground">400–700</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-body">Usage</span>
                  <span className="text-xs font-body text-foreground">Headings</span>
                </div>
              </div>
            </div>

            {/* Box 2 – Anatomy */}
            <div className="flex-1 rounded-xl border border-border bg-popover text-popover-foreground p-4 shadow-2xl">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-body mb-2">Anatomy</p>
              <div className="space-y-1.5 max-h-[160px] overflow-y-auto pr-1">
                {ANATOMY.map((item) => (
                  <div key={item.term} className="flex gap-2">
                    <span className="text-[10px] font-semibold font-body text-foreground min-w-[60px]">{item.term}</span>
                    <span className="text-[10px] font-body text-muted-foreground leading-snug">{item.def}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Arrow pointing down toward the hovered element */}
          <div
            className="absolute"
            style={{
              left: Math.min(Math.max(arrowLeft - 8, 12), popupWidth - 28),
              bottom: -8,
              width: 0,
              height: 0,
              borderLeft: "8px solid transparent",
              borderRight: "8px solid transparent",
              borderTop: "8px solid hsl(var(--border))",
            }}
          />
          <div
            className="absolute"
            style={{
              left: Math.min(Math.max(arrowLeft - 7, 13), popupWidth - 27),
              bottom: -6,
              width: 0,
              height: 0,
              borderLeft: "7px solid transparent",
              borderRight: "7px solid transparent",
              borderTop: "7px solid hsl(var(--popover))",
            }}
          />

          <style>{`
            @keyframes tooltipFadeUp {
              from { opacity: 0; transform: translateY(calc(-100% - 4px)); }
              to   { opacity: 1; transform: translateY(calc(-100% - 12px)); }
            }
          `}</style>
        </div>
      )}
    </div>
  );
};

export default TypographyTooltip;
