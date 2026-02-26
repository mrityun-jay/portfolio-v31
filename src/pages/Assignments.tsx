import { useState, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { usePersona } from "@/contexts/PersonaContext";
import { PersonaProvider } from "@/contexts/PersonaContext";
import { FontProvider } from "@/contexts/FontContext";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const projectItems = ["CraftWorld", "Lobby"];
const assignmentItems = ["Assignment 1", "Assignment 2", "Assignment 3"];

const dudeGradients = [
  { bg: "linear-gradient(90deg, #7c3aed, #ec4899)", dot: "#ec4899" },
  { bg: "linear-gradient(90deg, #3b82f6, #06b6d4)", dot: "#06b6d4" },
  { bg: "linear-gradient(90deg, #06b6d4, #10b981)", dot: "#10b981" },
  { bg: "linear-gradient(90deg, #f59e0b, #ef4444)", dot: "#f59e0b" },
];

// 200 fonts
const FONTS = [
  "Arial","Arial Black","Arial Narrow","Helvetica","Helvetica Neue","Verdana","Tahoma",
  "Trebuchet MS","Geneva","Calibri","Candara","Optima","Futura","Gill Sans",
  "Century Gothic","Franklin Gothic Medium","Impact","Haettenschweiler",
  "Times New Roman","Georgia","Garamond","Palatino","Book Antiqua","Didot",
  "Baskerville","Caslon","Bodoni MT","Cambria","Constantia","Cochin",
  "Hoefler Text","Big Caslon","Trajan","Perpetua","Rockwell",
  "Courier New","Courier","Lucida Console","Lucida Sans Typewriter","Monaco",
  "Consolas","Andale Mono","Menlo",
  "Playfair Display","Merriweather","Lora","Cormorant Garamond","EB Garamond",
  "Libre Baskerville","DM Serif Display","DM Serif Text","Crimson Text",
  "Spectral","Newsreader","Zilla Slab","Arvo","Cardo","Gupter","Petrona",
  "Abhaya Libre","Inknut Antiqua","Alike Angular","Alike","Rosarivo",
  "Inter","Roboto","Roboto Condensed","Open Sans","Lato","Nunito","Nunito Sans",
  "Poppins","Raleway","Montserrat","Oswald","Source Sans Pro","Source Serif Pro",
  "Ubuntu","Fira Sans","Noto Sans","Outfit","Manrope","Plus Jakarta Sans",
  "DM Sans","Lexend","Lexend Deca","Sora","Be Vietnam Pro","Exo 2","Barlow",
  "Barlow Semi Condensed","Barlow Condensed","Mulish","Karla","Cabin","Rubik",
  "Jost","Quicksand","Hind","Noto Serif","Libre Franklin","Work Sans","Figtree",
  "Albert Sans","Bricolage Grotesque","Hanken Grotesk","Urbanist","Onest",
  "Instrument Sans","Space Grotesk","Space Mono","Syne","Syne Mono","Unbounded",
  "Chivo","Chivo Mono","Fragment Mono","Martian Mono","Azeret Mono","Victor Mono",
  "Fira Code","JetBrains Mono","Source Code Pro","Share Tech Mono","Inconsolata",
  "Cutive Mono","Overpass Mono","Anonymous Pro","Roboto Mono","IBM Plex Mono",
  "IBM Plex Sans","IBM Plex Serif","IBM Plex Sans Condensed",
  "Encode Sans","Encode Sans Condensed","Encode Sans Expanded",
  "Pacifico","Lobster","Dancing Script","Great Vibes","Sacramento","Satisfy",
  "Caveat","Caveat Brush","Indie Flower","Shadows Into Light","Kaushan Script",
  "Yellowtail","Cookie","Parisienne","Clicker Script","Pinyon Script",
  "Abril Fatface","Anton","Alfa Slab One","Permanent Marker","Righteous",
  "Fredoka One","Lilita One","Titan One","Boogaloo","Acme","Bangers",
  "Bebas Neue","Fjalla One","Rye",
  "Cormorant","Cormorant Infant","Cormorant SC","Cormorant Upright",
  "Fraunces","Familjen Grotesk","Geist","Geist Mono",
];

// ─────────────────────────────────────────────
// Typography demo renderers — each gets (text, font, color, muted, bg, border)
// ─────────────────────────────────────────────
type DemoProps = {
  text: string;
  font: string;
  color: string;
  muted: string;
  bg: string;
  border: string;
  accent: string;
};

const sample = (text: string) => text.trim() || "Typography";

// Anatomy demos
const BaselineDemo = ({ text, font, color, muted, bg, border, accent }: DemoProps) => {
  const word = sample(text).split(" ")[0].slice(0, 12);
  return (
    <div className="relative flex items-end justify-start overflow-hidden rounded-lg px-4" style={{ background: bg, border: `1px solid ${border}`, height: 80 }}>
      <span style={{ fontFamily: `"${font}", serif`, fontSize: 48, lineHeight: 1, color, position: "relative", zIndex: 1, paddingBottom: 8 }}>{word}</span>
      {/* baseline line */}
      <div style={{ position: "absolute", bottom: 16, left: 0, right: 0, height: 1.5, background: accent, opacity: 0.8 }} />
      <span style={{ position: "absolute", bottom: 18, right: 8, fontSize: 9, fontFamily: "sans-serif", color: accent, textTransform: "uppercase", letterSpacing: "0.1em" }}>baseline</span>
    </div>
  );
};

const XHeightDemo = ({ text, font, color, muted, bg, border, accent }: DemoProps) => {
  const word = sample(text).split(" ")[0].slice(0, 10);
  return (
    <div className="relative flex items-end justify-start overflow-hidden rounded-lg px-4" style={{ background: bg, border: `1px solid ${border}`, height: 80 }}>
      <span style={{ fontFamily: `"${font}", serif`, fontSize: 46, lineHeight: 1, color, position: "relative", zIndex: 1, paddingBottom: 8 }}>{word}</span>
      <div style={{ position: "absolute", bottom: 16, left: 0, right: 0, height: 1.5, background: muted, opacity: 0.5 }} />
      <div style={{ position: "absolute", bottom: 37, left: 0, right: 0, height: 1.5, background: accent, opacity: 0.85 }} />
      <span style={{ position: "absolute", bottom: 39, right: 8, fontSize: 9, fontFamily: "sans-serif", color: accent, textTransform: "uppercase", letterSpacing: "0.1em" }}>x-height</span>
    </div>
  );
};

const AscenderDemo = ({ text, font, color, muted, bg, border, accent }: DemoProps) => {
  const words = "bdhkl " + sample(text).split(" ")[0];
  return (
    <div className="relative flex items-end justify-start overflow-hidden rounded-lg px-4" style={{ background: bg, border: `1px solid ${border}`, height: 90 }}>
      <span style={{ fontFamily: `"${font}", serif`, fontSize: 46, lineHeight: 1, color, position: "relative", zIndex: 1, paddingBottom: 8 }}>{words}</span>
      <div style={{ position: "absolute", bottom: 16, left: 0, right: 0, height: 1, background: muted, opacity: 0.4 }} />
      <div style={{ position: "absolute", bottom: 38, left: 0, right: 0, height: 1, background: muted, opacity: 0.4 }} />
      <div style={{ position: "absolute", top: 8, left: 0, right: 0, height: 1.5, background: accent, opacity: 0.85 }} />
      <span style={{ position: "absolute", top: 10, right: 8, fontSize: 9, fontFamily: "sans-serif", color: accent, textTransform: "uppercase", letterSpacing: "0.1em" }}>ascender</span>
    </div>
  );
};

const DescenderDemo = ({ text, font, color, muted, bg, border, accent }: DemoProps) => {
  const words = "gjpqy " + sample(text).split(" ")[0];
  return (
    <div className="relative flex items-start justify-start overflow-hidden rounded-lg px-4 pt-3" style={{ background: bg, border: `1px solid ${border}`, height: 90 }}>
      <span style={{ fontFamily: `"${font}", serif`, fontSize: 46, lineHeight: 1, color, position: "relative", zIndex: 1 }}>{words}</span>
      <div style={{ position: "absolute", top: 52, left: 0, right: 0, height: 1.5, background: muted, opacity: 0.4 }} />
      <div style={{ position: "absolute", bottom: 10, left: 0, right: 0, height: 1.5, background: accent, opacity: 0.85 }} />
      <span style={{ position: "absolute", bottom: 12, right: 8, fontSize: 9, fontFamily: "sans-serif", color: accent, textTransform: "uppercase", letterSpacing: "0.1em" }}>descender</span>
    </div>
  );
};

const StemDemo = ({ text, font, color, muted, bg, border, accent }: DemoProps) => {
  const word = "H" + sample(text).slice(0, 6);
  return (
    <div className="relative flex items-center justify-start overflow-hidden rounded-lg px-4" style={{ background: bg, border: `1px solid ${border}`, height: 80 }}>
      <span style={{ fontFamily: `"${font}", serif`, fontSize: 52, lineHeight: 1, color, position: "relative", zIndex: 1 }}>{word}</span>
      {/* vertical highlight strip on left side suggesting stem */}
      <div style={{ position: "absolute", left: 18, top: 12, width: 4, height: 56, background: accent, opacity: 0.35, borderRadius: 2 }} />
      <span style={{ position: "absolute", top: 8, left: 26, fontSize: 9, fontFamily: "sans-serif", color: accent, textTransform: "uppercase", letterSpacing: "0.1em" }}>stem</span>
    </div>
  );
};

const CounterDemo = ({ text, font, color, muted, bg, border, accent }: DemoProps) => {
  const word = "OoeBbQq" + sample(text).slice(0, 4);
  return (
    <div className="relative flex items-center justify-start overflow-hidden rounded-lg px-4" style={{ background: bg, border: `1px solid ${border}`, height: 80 }}>
      <span style={{ fontFamily: `"${font}", serif`, fontSize: 48, lineHeight: 1, color, position: "relative", zIndex: 1 }}>{word}</span>
      <span style={{ position: "absolute", bottom: 8, right: 8, fontSize: 9, fontFamily: "sans-serif", color: accent, textTransform: "uppercase", letterSpacing: "0.1em" }}>counter ↗ enclosed space</span>
    </div>
  );
};

const TerminalDemo = ({ text, font, color, muted, bg, border, accent }: DemoProps) => {
  const word = "arc " + sample(text).slice(0, 8);
  return (
    <div className="relative flex items-center justify-start overflow-hidden rounded-lg px-4" style={{ background: bg, border: `1px solid ${border}`, height: 80 }}>
      <span style={{ fontFamily: `"${font}", serif`, fontSize: 48, lineHeight: 1, color, position: "relative", zIndex: 1 }}>{word}</span>
      <span style={{ position: "absolute", bottom: 8, right: 8, fontSize: 9, fontFamily: "sans-serif", color: accent, textTransform: "uppercase", letterSpacing: "0.1em" }}>terminal = stroke end</span>
    </div>
  );
};

const LigatureDemo = ({ text, font, color, muted, bg, border, accent }: DemoProps) => {
  const word = sample(text).replace(/\s+/g, "fi fl ffi ") || "fi fl ffi";
  return (
    <div className="relative flex flex-col gap-1 justify-center overflow-hidden rounded-lg px-4 py-2" style={{ background: bg, border: `1px solid ${border}`, minHeight: 80 }}>
      <div className="flex items-baseline gap-6">
        <div className="flex flex-col items-center">
          <span style={{ fontFamily: `"${font}", serif`, fontSize: 38, color, fontVariantLigatures: "none" }}>fi fl</span>
          <span style={{ fontSize: 9, fontFamily: "sans-serif", color: muted, textTransform: "uppercase", letterSpacing: "0.08em" }}>no ligature</span>
        </div>
        <div style={{ width: 1, height: 50, background: `${accent}44` }} />
        <div className="flex flex-col items-center">
          <span style={{ fontFamily: `"${font}", serif`, fontSize: 38, color: accent, fontVariantLigatures: "common-ligatures" }}>fi fl</span>
          <span style={{ fontSize: 9, fontFamily: "sans-serif", color: accent, textTransform: "uppercase", letterSpacing: "0.08em" }}>ligature ✓</span>
        </div>
      </div>
    </div>
  );
};

const KerningDemo = ({ text, font, color, muted, bg, border, accent }: DemoProps) => {
  const word = sample(text).split(" ").slice(0, 3).join(" ") || "AV WA To";
  return (
    <div className="relative flex flex-col gap-1.5 justify-center overflow-hidden rounded-lg px-4 py-3" style={{ background: bg, border: `1px solid ${border}`, minHeight: 80 }}>
      <div className="flex flex-col gap-1">
        <div>
          <span style={{ fontFamily: `"${font}", serif`, fontSize: 28, color: muted, letterSpacing: "0.25em" }}>{word}</span>
          <span style={{ fontSize: 9, fontFamily: "sans-serif", color: muted, marginLeft: 8, textTransform: "uppercase", letterSpacing: "0.08em" }}>loose</span>
        </div>
        <div>
          <span style={{ fontFamily: `"${font}", serif`, fontSize: 28, color, letterSpacing: "normal" }}>{word}</span>
          <span style={{ fontSize: 9, fontFamily: "sans-serif", color: muted, marginLeft: 8, textTransform: "uppercase", letterSpacing: "0.08em" }}>normal</span>
        </div>
        <div>
          <span style={{ fontFamily: `"${font}", serif`, fontSize: 28, color: accent, letterSpacing: "-0.06em" }}>{word}</span>
          <span style={{ fontSize: 9, fontFamily: "sans-serif", color: accent, marginLeft: 8, textTransform: "uppercase", letterSpacing: "0.08em" }}>tight kerning</span>
        </div>
      </div>
    </div>
  );
};

const LeadingDemo = ({ text, font, color, muted, bg, border, accent }: DemoProps) => {
  const words = sample(text);
  return (
    <div className="relative flex flex-col gap-0 justify-center overflow-hidden rounded-lg px-4 py-3" style={{ background: bg, border: `1px solid ${border}`, minHeight: 90 }}>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <p style={{ fontFamily: `"${font}", serif`, fontSize: 13, color: muted, lineHeight: 0.9 }}>{words}</p>
          <span style={{ fontSize: 9, fontFamily: "sans-serif", color: muted, textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 4, display: "block" }}>tight leading</span>
        </div>
        <div>
          <p style={{ fontFamily: `"${font}", serif`, fontSize: 13, color, lineHeight: 2 }}>{words}</p>
          <span style={{ fontSize: 9, fontFamily: "sans-serif", color: accent, textTransform: "uppercase", letterSpacing: "0.08em", display: "block" }}>loose leading</span>
        </div>
      </div>
    </div>
  );
};

// Typeface classification demos
const SerifDemo = ({ text, font, color, muted, bg, border, accent }: DemoProps) => (
  <div className="rounded-lg px-4 py-3 flex items-center gap-4" style={{ background: bg, border: `1px solid ${border}` }}>
    <div className="flex-1">
      <span style={{ fontFamily: '"Times New Roman", serif', fontSize: 32, color }}>{sample(text)}</span>
      <p style={{ fontSize: 9, fontFamily: "sans-serif", color: accent, textTransform: "uppercase", letterSpacing: "0.1em" }}>Times New Roman</p>
    </div>
    <div style={{ width: 1, height: 50, background: `${accent}33` }} />
    <div className="flex-1">
      <span style={{ fontFamily: '"Georgia", serif', fontSize: 32, color: muted }}>{sample(text)}</span>
      <p style={{ fontSize: 9, fontFamily: "sans-serif", color: muted, textTransform: "uppercase", letterSpacing: "0.1em" }}>Georgia</p>
    </div>
  </div>
);

const SansSerifDemo = ({ text, font, color, muted, bg, border, accent }: DemoProps) => (
  <div className="rounded-lg px-4 py-3 flex items-center gap-4" style={{ background: bg, border: `1px solid ${border}` }}>
    <div className="flex-1">
      <span style={{ fontFamily: '"Arial", sans-serif', fontSize: 32, color }}>{sample(text)}</span>
      <p style={{ fontSize: 9, fontFamily: "sans-serif", color: accent, textTransform: "uppercase", letterSpacing: "0.1em" }}>Arial</p>
    </div>
    <div style={{ width: 1, height: 50, background: `${accent}33` }} />
    <div className="flex-1">
      <span style={{ fontFamily: '"Helvetica Neue", sans-serif', fontSize: 32, color: muted }}>{sample(text)}</span>
      <p style={{ fontSize: 9, fontFamily: "sans-serif", color: muted, textTransform: "uppercase", letterSpacing: "0.1em" }}>Helvetica</p>
    </div>
  </div>
);

const ScriptDemo = ({ text, font, color, muted, bg, border, accent }: DemoProps) => (
  <div className="rounded-lg px-4 py-3" style={{ background: bg, border: `1px solid ${border}` }}>
    <span style={{ fontFamily: '"Brush Script MT", cursive', fontSize: 34, color }}>{sample(text)}</span>
    <p style={{ fontSize: 9, fontFamily: "sans-serif", color: accent, textTransform: "uppercase", letterSpacing: "0.1em" }}>Script / Cursive style</p>
  </div>
);

const DisplayDemo = ({ text, font, color, muted, bg, border, accent }: DemoProps) => (
  <div className="rounded-lg px-4 py-3" style={{ background: bg, border: `1px solid ${border}` }}>
    <span style={{ fontFamily: '"Impact", sans-serif', fontSize: 40, color, letterSpacing: "0.04em", textTransform: "uppercase" }}>{sample(text)}</span>
    <p style={{ fontSize: 9, fontFamily: "sans-serif", color: accent, textTransform: "uppercase", letterSpacing: "0.1em" }}>Display — bold, expressive, large use</p>
  </div>
);

const MonospaceDemo = ({ text, font, color, muted, bg, border, accent }: DemoProps) => (
  <div className="rounded-lg px-4 py-3" style={{ background: bg, border: `1px solid ${border}` }}>
    <span style={{ fontFamily: '"Courier New", monospace', fontSize: 24, color }}>{sample(text)}</span>
    <p style={{ fontSize: 9, fontFamily: "sans-serif", color: accent, textTransform: "uppercase", letterSpacing: "0.1em", marginTop: 4 }}>Monospace — equal width per character</p>
  </div>
);

// Serif vs Sans-serif comparison demos
const HistoricalDemo = ({ text, font, color, muted, bg, border, accent }: DemoProps) => (
  <div className="rounded-lg px-4 py-3 grid grid-cols-2 gap-3" style={{ background: bg, border: `1px solid ${border}` }}>
    <div>
      <span style={{ fontFamily: '"Trajan", "Times New Roman", serif', fontSize: 24, color }}>{sample(text)}</span>
      <p style={{ fontSize: 9, fontFamily: "sans-serif", color: muted, textTransform: "uppercase", letterSpacing: "0.08em" }}>Serif — Roman origin ~1st c.</p>
    </div>
    <div>
      <span style={{ fontFamily: '"Arial", sans-serif', fontSize: 24, color: accent }}>{sample(text)}</span>
      <p style={{ fontSize: 9, fontFamily: "sans-serif", color: accent, textTransform: "uppercase", letterSpacing: "0.08em" }}>Sans — Industrial ~19th c.</p>
    </div>
  </div>
);

const ReadabilityDemo = ({ text, font, color, muted, bg, border, accent }: DemoProps) => {
  const para = (sample(text) + " ").repeat(3).trim();
  return (
    <div className="rounded-lg px-4 py-3 grid grid-cols-2 gap-3" style={{ background: bg, border: `1px solid ${border}` }}>
      <div>
        <p style={{ fontFamily: '"Georgia", serif', fontSize: 12, color, lineHeight: 1.6 }}>{para}</p>
        <span style={{ fontSize: 9, fontFamily: "sans-serif", color: muted, textTransform: "uppercase", letterSpacing: "0.08em" }}>Serif — long print reads</span>
      </div>
      <div>
        <p style={{ fontFamily: '"Inter", "Arial", sans-serif', fontSize: 12, color: accent, lineHeight: 1.6 }}>{para}</p>
        <span style={{ fontSize: 9, fontFamily: "sans-serif", color: accent, textTransform: "uppercase", letterSpacing: "0.08em" }}>Sans — screens, UI</span>
      </div>
    </div>
  );
};

const PrintDemo = ({ text, font, color, muted, bg, border, accent }: DemoProps) => (
  <div className="rounded-lg px-4 py-3" style={{ background: bg, border: `1px solid ${border}` }}>
    <span style={{ fontFamily: '"Garamond","Times New Roman", serif', fontSize: 30, color }}>{sample(text)}</span>
    <p style={{ fontSize: 9, fontFamily: "sans-serif", color: accent, textTransform: "uppercase", letterSpacing: "0.1em", marginTop: 4 }}>Garamond / Bodoni — books, newspapers, formal print</p>
  </div>
);

const DigitalDemo = ({ text, font, color, muted, bg, border, accent }: DemoProps) => (
  <div className="rounded-lg px-4 py-3" style={{ background: bg, border: `1px solid ${border}` }}>
    <span style={{ fontFamily: '"Inter","Arial", sans-serif', fontSize: 30, color: accent }}>{sample(text)}</span>
    <p style={{ fontSize: 9, fontFamily: "sans-serif", color: accent, textTransform: "uppercase", letterSpacing: "0.1em", marginTop: 4 }}>Inter / Roboto — apps, websites, UI clarity</p>
  </div>
);

// Psychology demos
const TimesNewRomanDemo = ({ text, font, color, muted, bg, border, accent }: DemoProps) => (
  <div className="rounded-lg px-4 py-3" style={{ background: bg, border: `1px solid ${border}` }}>
    <span style={{ fontFamily: '"Times New Roman", serif', fontSize: 30, color }}>{sample(text)}</span>
    <p style={{ fontSize: 9, fontFamily: "sans-serif", color: accent, textTransform: "uppercase", letterSpacing: "0.1em", marginTop: 4 }}>Authority · Tradition · Academia · Legal documents</p>
  </div>
);

const HelveticaDemo = ({ text, font, color, muted, bg, border, accent }: DemoProps) => (
  <div className="rounded-lg px-4 py-3" style={{ background: bg, border: `1px solid ${border}` }}>
    <span style={{ fontFamily: '"Helvetica Neue","Arial", sans-serif', fontSize: 30, color: accent }}>{sample(text)}</span>
    <p style={{ fontSize: 9, fontFamily: "sans-serif", color: accent, textTransform: "uppercase", letterSpacing: "0.1em", marginTop: 4 }}>Neutral · Modern · Corporate — Lufthansa, Toyota, NASA</p>
  </div>
);

const ComicSansDemo = ({ text, font, color, muted, bg, border, accent }: DemoProps) => (
  <div className="rounded-lg px-4 py-3" style={{ background: bg, border: `1px solid ${border}` }}>
    <span style={{ fontFamily: '"Comic Sans MS","Comic Sans", cursive', fontSize: 28, color: muted }}>{sample(text)}</span>
    <p style={{ fontSize: 9, fontFamily: "sans-serif", color: muted, textTransform: "uppercase", letterSpacing: "0.1em", marginTop: 4 }}>Casual · Friendly · Informal — awareness campaigns, kids</p>
  </div>
);

// ─────────────────────────────────────────────
// Data: each section item has a DemoComponent
// ─────────────────────────────────────────────
const PART1_SECTIONS = [
  {
    title: "1. Typography Anatomy",
    description: "Each term is demonstrated using your typed text below.",
    items: [
      { term: "Baseline", label: "The invisible line letters sit on", Demo: BaselineDemo },
      { term: "X-height", label: "Height of lowercase letters like 'x'", Demo: XHeightDemo },
      { term: "Ascender", label: "Strokes rising above x-height (b, d, h)", Demo: AscenderDemo },
      { term: "Descender", label: "Strokes dipping below baseline (g, p, y)", Demo: DescenderDemo },
      { term: "Stem", label: "The main vertical stroke of a letter", Demo: StemDemo },
      { term: "Counter", label: "Enclosed space inside a letter (o, e)", Demo: CounterDemo },
      { term: "Terminal", label: "End of a stroke without a serif", Demo: TerminalDemo },
      { term: "Ligature", label: "Two characters joined into one glyph (fi, fl)", Demo: LigatureDemo },
      { term: "Kerning", label: "Spacing adjustment between character pairs", Demo: KerningDemo },
      { term: "Leading", label: "Vertical space between lines of text", Demo: LeadingDemo },
    ],
  },
  {
    title: "2. Typeface Classification",
    description: "Your text rendered in each typeface category.",
    items: [
      { term: "Serif", label: "Decorative strokes at letter ends — Times, Garamond", Demo: SerifDemo },
      { term: "Sans-serif", label: "Clean letterforms, no serifs — Arial, Helvetica", Demo: SansSerifDemo },
      { term: "Script", label: "Mimics cursive handwriting — Pacifico, Dancing Script", Demo: ScriptDemo },
      { term: "Display", label: "Bold & expressive for headlines — Impact, Bebas Neue", Demo: DisplayDemo },
      { term: "Monospace", label: "Equal-width characters — Courier, Fira Code", Demo: MonospaceDemo },
    ],
  },
  {
    title: "3. Serif vs. Sans-serif",
    description: "Your text illustrating the contrast across key dimensions.",
    items: [
      { term: "Historical Development", label: "Serifs from Roman stone ~1st c. vs Sans from 19th c.", Demo: HistoricalDemo },
      { term: "Readability & Legibility", label: "Serif for long print; Sans for digital screens", Demo: ReadabilityDemo },
      { term: "Print Applications", label: "Garamond & Bodoni in books, newspapers, formal docs", Demo: PrintDemo },
      { term: "Digital Applications", label: "Inter & Roboto for UI, apps, websites", Demo: DigitalDemo },
    ],
  },
  {
    title: "4. Psychology of Fonts",
    description: "Your text rendered in three psychologically distinct typefaces.",
    items: [
      { term: "Times New Roman", label: "Authority · Reliability · Academic & legal use", Demo: TimesNewRomanDemo },
      { term: "Helvetica", label: "Neutrality · Clarity · Global corporate identity", Demo: HelveticaDemo },
      { term: "Comic Sans", label: "Casual · Playful · Informal communications", Demo: ComicSansDemo },
    ],
  },
];

// ─────────────────────────────────────────────
// Part 1 Box
// ─────────────────────────────────────────────
const Part1Box = ({
  section,
  isDude,
  colorIndex,
  text,
  font,
}: {
  section: typeof PART1_SECTIONS[0];
  isDude: boolean;
  colorIndex: number;
  text: string;
  font: string;
}) => {
  const [expanded, setExpanded] = useState(true);
  const g = dudeGradients[colorIndex % dudeGradients.length];

  const panelBg = isDude ? "hsl(213 25% 10%)" : "hsl(var(--card))";
  const panelBorder = isDude ? "hsl(213 25% 22%)" : "hsl(var(--border))";
  const textColor = isDude ? "hsl(210 1% 88%)" : "hsl(var(--foreground))";
  const mutedColor = isDude ? "hsl(210 1% 50%)" : "hsl(var(--muted-foreground))";
  const accentColor = isDude ? g.dot : "hsl(var(--primary))";
  const itemBg = isDude ? "rgba(255,255,255,0.025)" : "hsl(var(--background))";

  return (
    <div
      className="rounded-2xl overflow-hidden transition-all duration-300"
      style={{
        background: panelBg,
        border: `1px solid ${panelBorder}`,
        boxShadow: isDude ? `0 0 28px ${g.dot}18` : "0 2px 20px rgba(0,0,0,0.06)",
      }}
    >
      {/* Header */}
      <button
        className="w-full flex items-center justify-between px-6 py-5 text-left transition-all duration-200"
        style={{
          borderBottom: expanded ? `1px solid ${panelBorder}` : "none",
          background: isDude ? `linear-gradient(90deg, ${g.dot}12, transparent)` : "transparent",
        }}
        onClick={() => setExpanded((v) => !v)}
      >
        <div>
          <h3 className="font-heading text-lg" style={{ color: textColor }}>{section.title}</h3>
        </div>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
          className="flex-shrink-0 transition-transform duration-300"
          style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)", color: mutedColor }}
        >
          <path d="M3 5.5L8 10.5L13 5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {expanded && (
        <div className="px-6 py-5">
          <p className="font-body text-xs mb-5" style={{ color: mutedColor }}>{section.description}</p>
          <div className="space-y-4">
            {section.items.map((item) => (
              <div
                key={item.term}
                className="rounded-xl overflow-hidden"
                style={{ border: `1px solid ${panelBorder}` }}
              >
                {/* Term header */}
                <div className="flex items-baseline gap-3 px-4 py-2" style={{ background: itemBg, borderBottom: `1px solid ${panelBorder}` }}>
                  <span className="text-[10px] font-body font-bold uppercase tracking-widest" style={{ color: accentColor }}>
                    {item.term}
                  </span>
                  <span className="text-[10px] font-body" style={{ color: mutedColor }}>— {item.label}</span>
                </div>
                {/* Live demo */}
                <div className="p-3" style={{ background: isDude ? "rgba(0,0,0,0.2)" : "transparent" }}>
                  <item.Demo
                    text={text}
                    font={font}
                    color={textColor}
                    muted={mutedColor}
                    bg={itemBg}
                    border={panelBorder}
                    accent={accentColor}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────
// Font Tester Panel
// ─────────────────────────────────────────────
const FontTesterPanel = ({
  isDude,
  text,
  setText,
  selectedFont,
  setSelectedFont,
  fontSize,
  setFontSize,
}: {
  isDude: boolean;
  text: string;
  setText: (v: string) => void;
  selectedFont: string;
  setSelectedFont: (v: string) => void;
  fontSize: number;
  setFontSize: (v: number) => void;
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = FONTS.filter((f) => f.toLowerCase().includes(search.toLowerCase()));

  const panelBg = isDude ? "hsl(213 25% 10%)" : "hsl(var(--card))";
  const panelBorder = isDude ? "hsl(213 25% 22%)" : "hsl(var(--border))";
  const textColor = isDude ? "hsl(210 1% 88%)" : "hsl(var(--foreground))";
  const mutedColor = isDude ? "hsl(210 1% 50%)" : "hsl(var(--muted-foreground))";
  const inputBg = isDude ? "hsl(213 25% 14%)" : "hsl(var(--background))";
  const accentColor = isDude ? "#06b6d4" : "hsl(var(--primary))";

  return (
    <div
      className="rounded-2xl p-6 flex flex-col gap-5"
      style={{
        background: panelBg,
        border: `1px solid ${panelBorder}`,
        boxShadow: isDude ? "0 0 32px rgba(6,182,212,0.07)" : "0 2px 24px rgba(0,0,0,0.06)",
      }}
    >
      <div>
        <p className="text-[10px] uppercase tracking-widest font-body mb-1" style={{ color: mutedColor }}>
          Typography Tester
        </p>
        <h3 className="font-heading text-xl" style={{ color: textColor }}>Type &amp; See It Live</h3>
        <p className="text-xs font-body mt-1" style={{ color: mutedColor }}>
          Your text updates all demonstrations on the right in real time.
        </p>
      </div>

      {/* Font Dropdown */}
      <div className="relative">
        <p className="text-[10px] uppercase tracking-widest font-body mb-2" style={{ color: mutedColor }}>Font Family</p>
        <button
          className="w-full flex items-center justify-between rounded-xl px-4 py-3 text-sm font-body transition-all duration-200"
          style={{ background: inputBg, border: `1px solid ${panelBorder}`, color: textColor, fontFamily: `"${selectedFont}", sans-serif` }}
          onClick={() => setDropdownOpen((v) => !v)}
        >
          <span>{selectedFont}</span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
            style={{ transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)", flexShrink: 0, transition: "transform 0.2s" }}
          >
            <path d="M2 4.5L7 9.5L12 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {dropdownOpen && (
          <div
            className="absolute left-0 right-0 z-[200] rounded-xl overflow-hidden mt-2"
            style={{
              background: isDude ? "hsl(213 25% 12%)" : "hsl(var(--popover))",
              border: `1px solid ${panelBorder}`,
              boxShadow: isDude ? "0 8px 40px rgba(0,0,0,0.5)" : "0 8px 32px rgba(0,0,0,0.15)",
            }}
          >
            <div className="p-2 border-b" style={{ borderColor: panelBorder }}>
              <input
                type="text"
                placeholder="Search 200 fonts…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-lg px-3 py-2 text-xs font-body outline-none"
                style={{ background: inputBg, color: textColor, border: `1px solid ${panelBorder}` }}
                autoFocus
              />
            </div>
            <div className="overflow-y-auto" style={{ maxHeight: "240px" }}>
              {filtered.length === 0 && (
                <p className="text-xs px-4 py-3 font-body" style={{ color: mutedColor }}>No fonts found</p>
              )}
              {filtered.map((font) => (
                <button
                  key={font}
                  className="w-full text-left px-4 py-2.5 text-sm transition-all duration-150"
                  style={{
                    fontFamily: `"${font}", sans-serif`,
                    color: font === selectedFont ? accentColor : textColor,
                    background: font === selectedFont
                      ? isDude ? "rgba(6,182,212,0.1)" : "hsl(var(--accent))"
                      : "transparent",
                  }}
                  onMouseEnter={(e) => { if (font !== selectedFont) (e.currentTarget as HTMLButtonElement).style.background = isDude ? "rgba(255,255,255,0.04)" : "hsl(var(--accent))"; }}
                  onMouseLeave={(e) => { if (font !== selectedFont) (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
                  onClick={() => { setSelectedFont(font); setDropdownOpen(false); setSearch(""); }}
                >
                  {font}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Font size */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-[10px] uppercase tracking-widest font-body" style={{ color: mutedColor }}>Preview Size</p>
          <span className="text-xs font-body font-semibold" style={{ color: accentColor }}>{fontSize}px</span>
        </div>
        <input type="range" min={12} max={96} value={fontSize} onChange={(e) => setFontSize(Number(e.target.value))}
          className="w-full" style={{ accentColor }} />
      </div>

      {/* Text input */}
      <div className="flex flex-col gap-2">
        <p className="text-[10px] uppercase tracking-widest font-body" style={{ color: mutedColor }}>Your Text</p>
        <textarea
          className="w-full rounded-xl px-4 py-3 font-body text-sm outline-none resize-none transition-all duration-200"
          style={{ background: inputBg, border: `1px solid ${panelBorder}`, color: textColor, minHeight: 90 }}
          placeholder="Type anything — it updates all demos live →"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onFocus={(e) => (e.currentTarget.style.borderColor = accentColor)}
          onBlur={(e) => (e.currentTarget.style.borderColor = panelBorder)}
        />
      </div>

      {/* Live preview */}
      <div
        className="rounded-xl px-5 py-4 min-h-[80px] flex items-center"
        style={{ background: inputBg, border: `1px solid ${panelBorder}` }}
      >
        <span
          className="leading-tight break-words"
          style={{ fontFamily: `"${selectedFont}", serif`, fontSize, color: textColor, transition: "font-size 0.15s" }}
        >
          {text || "Start typing…"}
        </span>
      </div>

      <p className="text-[10px] uppercase tracking-widest font-body text-center" style={{ color: mutedColor }}>
        Previewing: <span style={{ color: accentColor }}>{selectedFont}</span>
      </p>
    </div>
  );
};

// ─────────────────────────────────────────────
// Coming Soon Modal
// ─────────────────────────────────────────────
const ComingSoonModal = ({ projectName, isDude, onClose }: { projectName: string; isDude: boolean; onClose: () => void }) => {
  return (
    <div
      className="fixed inset-0 z-[9998] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(10px)" }}
      onClick={onClose}
    >
      <div
        className="relative flex flex-col items-center text-center p-10 rounded-2xl"
        style={{
          maxWidth: 400,
          width: "100%",
          background: isDude ? "hsl(213 25% 10%)" : "#ffffff",
          border: isDude ? "1px solid hsl(213 25% 22%)" : "1px solid #e2e8f0",
          boxShadow: isDude ? "0 0 80px rgba(124,58,237,0.2), 0 24px 80px rgba(0,0,0,0.5)" : "0 24px 80px rgba(0,0,0,0.12)",
          animation: "certModalIn 0.25s ease forwards",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Icon */}
        <div className="mb-5 flex items-center justify-center w-16 h-16 rounded-full"
          style={{ background: isDude ? "rgba(124,58,237,0.15)" : "#f3f0ff" }}>
          {isDude ? (
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path d="M14 3C8 3 3 8 3 14s5 11 11 11 11-5 11-11S20 3 14 3z" stroke="#7c3aed" strokeWidth="1.8"/>
              <path d="M14 9v6M14 18v1" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          ) : (
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <circle cx="14" cy="14" r="11" stroke="#7c3aed" strokeWidth="1.8"/>
              <path d="M10 14l3 3 5-5" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </div>

        {/* Project name */}
        <p className="text-[10px] font-body uppercase tracking-widest mb-2" style={{ color: isDude ? "#7c3aed" : "#7c3aed" }}>
          {projectName}
        </p>

        {/* Main message */}
        <h2 className="font-heading text-3xl mb-3" style={{ color: isDude ? "#f9fafb" : "#0f172a" }}>
          {isDude ? "Chill out man," : "Coming Soon"}
        </h2>
        {isDude && (
          <p className="font-heading text-xl mb-3" style={{ color: "#9ca3af" }}>
            I am working on it
          </p>
        )}

        <p className="font-body text-sm leading-relaxed mb-7" style={{ color: isDude ? "#6b7280" : "#64748b" }}>
          {isDude
            ? "This project is still cooking. Good things take time. Or whatever."
            : "This project is currently in development. Check back soon for updates."}
        </p>

        {/* Close button */}
        <button
          onClick={onClose}
          className="font-body text-sm font-semibold px-6 py-2.5 rounded-full transition-all duration-200 hover:opacity-80"
          style={{
            background: isDude ? "linear-gradient(90deg, #7c3aed, #ec4899)" : "#7c3aed",
            color: "white",
          }}
        >
          {isDude ? "Aight, got it" : "Got it"}
        </button>

        {/* Close X */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200"
          style={{ background: isDude ? "hsl(213 25% 18%)" : "#f1f5f9", color: isDude ? "#9ca3af" : "#64748b" }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M1.5 1.5l9 9M10.5 1.5l-9 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </button>
      </div>
      <style>{`@keyframes certModalIn { from { opacity:0; transform:scale(0.94) translateY(14px); } to { opacity:1; transform:scale(1) translateY(0); } }`}</style>
    </div>
  );
};

// ─────────────────────────────────────────────
// ─────────────────────────────────────────────
const HoverCard = ({
  label,
  items,
  isDude,
  itemScrollTargets = {},
  comingSoonItems = [],
}: {
  label: string;
  items: string[];
  isDude: boolean;
  itemScrollTargets?: Record<string, string>;
  comingSoonItems?: string[];
}) => {
  const [visible, setVisible] = useState(false);
  const [comingSoonProject, setComingSoonProject] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const handleMouseEnter = () => { timerRef.current = setTimeout(() => setVisible(true), 500); };
  const handleMouseLeave = () => { if (timerRef.current) clearTimeout(timerRef.current); setVisible(false); };

  const navigate = useNavigate();
  const handleItemClick = (item: string) => {
    if (comingSoonItems.includes(item)) {
      setComingSoonProject(item);
      setVisible(false);
      return;
    }
    const target = itemScrollTargets[item];
    if (target) {
      if (target.startsWith("/")) {
        navigate(target);
      } else {
        const el = document.getElementById(target);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
    setVisible(false);
  };

  return (
    <>
      {comingSoonProject && (
        <ComingSoonModal
          projectName={comingSoonProject}
          isDude={isDude}
          onClose={() => setComingSoonProject(null)}
        />
      )}
      <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {isDude ? (
        <div className="rounded-2xl p-8 cursor-pointer text-center transition-all duration-300"
          style={{ background: "hsl(213 25% 12%)", border: "1px solid hsl(213 25% 22%)", boxShadow: visible ? "0 0 40px rgba(6,182,212,0.18)" : "0 0 24px rgba(6,182,212,0.08)" }}>
          <h2 className="font-heading text-3xl md:text-4xl mb-2" style={{ color: "hsl(210 1% 88%)" }}>{label}</h2>
          <p className="font-body text-xs uppercase tracking-widest" style={{ color: "hsl(210 1% 55%)" }}>Hover to explore</p>
        </div>
      ) : (
        <div className="bg-card border border-border rounded-2xl p-8 cursor-pointer hover:border-primary/40 transition-all duration-300 text-center">
          <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-2">{label}</h2>
          <p className="text-muted-foreground font-body text-sm">Hover to explore</p>
        </div>
      )}
      {visible && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 z-50 pb-4" style={{ animation: "hoverCardFadeUp 0.25s ease forwards" }}>
          <div className="flex gap-3">
            {items.map((item, i) => {
              const g = dudeGradients[i % dudeGradients.length];
              const hasTarget = !!itemScrollTargets[item];
              const isComingSoon = comingSoonItems.includes(item);
              return isDude ? (
                <div
                  key={item}
                  onClick={() => handleItemClick(item)}
                  className="group relative rounded-xl px-6 py-4 shadow-xl whitespace-nowrap font-body text-sm font-semibold cursor-pointer min-w-[130px] text-center overflow-hidden transition-all duration-300"
                  style={{ background: "hsl(213 25% 12%)", border: `1px solid ${g.dot}`, color: "white", boxShadow: `0 0 18px ${g.dot}44` }}
                >
                  <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: g.bg }} />
                  <p className="relative z-10 text-[10px] uppercase tracking-widest mb-1" style={{ color: g.dot }}>
                    {isComingSoon ? "Soon" : hasTarget ? "Go to" : "Open"}
                  </p>
                  <p className="relative z-10 text-xs uppercase tracking-widest">{item}</p>
                </div>
              ) : (
                <div
                  key={item}
                  onClick={() => handleItemClick(item)}
                  className="bg-popover border border-border rounded-xl px-6 py-4 shadow-xl whitespace-nowrap text-popover-foreground font-body text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors duration-200 cursor-pointer min-w-[120px] text-center"
                >
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">
                    {isComingSoon ? "Soon" : hasTarget ? "Go to" : "Open"}
                  </p>
                  <p>{item}</p>
                </div>
              );
            })}
          </div>
          {/* Arrow pointing down */}
          <div className="flex justify-center">
            {isDude ? (
              <div style={{ width: 0, height: 0, borderLeft: "9px solid transparent", borderRight: "9px solid transparent", borderTop: "9px solid hsl(213 25% 22%)" }} />
            ) : (
              <div style={{ width: 0, height: 0, borderLeft: "9px solid transparent", borderRight: "9px solid transparent", borderTop: "9px solid hsl(var(--border))" }} />
            )}
          </div>
        </div>
      )}
      <style>{`
        @keyframes hoverCardFadeUp {
          from { opacity:0; transform:translateX(-50%) translateY(6px); }
          to   { opacity:1; transform:translateX(-50%) translateY(0); }
        }
      `}</style>
    </div>
    </>
  );
};

// ─────────────────────────────────────────────
// Certification Modal
// ─────────────────────────────────────────────
const CERTIFICATIONS = [
  {
    id: "google-ai",
    name: "Google AI Essentials",
    issuer: "Google × Coursera",
    date: "Jul 6, 2024",
    verifyUrl: "https://coursera.org/verify/277JCVTQENQF",
    pdfPath: "/cert-google-ai.pdf",
    description: "An online course authorized by Google and offered through Coursera. Covers foundational AI concepts including machine learning, neural networks, and practical AI tool usage.",
    skills: ["Machine Learning", "AI Tools", "Neural Networks", "Prompt Engineering", "Responsible AI"],
    color: "#4285F4",
    icon: (
      <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
        <path d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4z" fill="#4285F4"/>
        <path d="M24 10c-7.73 0-14 6.27-14 14s6.27 14 14 14 14-6.27 14-14-6.27-14-14-14z" fill="white"/>
        <path d="M20 17l8 7-8 7V17z" fill="#4285F4"/>
      </svg>
    ),
  },
  {
    id: "vr",
    name: "Virtual Reality Specialisation",
    issuer: "University of London × Coursera",
    date: "Apr 24, 2024",
    verifyUrl: "https://coursera.org/verify/specialization/DZCGLBSWCAY2",
    pdfPath: "/cert-vr.pdf",
    description: "5-course specialisation from the University of London covering VR fundamentals, 3D modelling, interaction design, social VR characters, and building a complete VR game in Unity.",
    skills: ["Unity 3D", "VR Design", "3D Modelling", "Interaction Design", "Social VR", "VR Game Dev"],
    color: "#7c3aed",
    icon: (
      <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
        <rect width="48" height="48" rx="10" fill="#7c3aed"/>
        <rect x="6" y="16" width="36" height="16" rx="4" fill="white" opacity="0.9"/>
        <circle cx="17" cy="24" r="5" fill="#7c3aed"/>
        <circle cx="31" cy="24" r="5" fill="#7c3aed"/>
        <rect x="21" y="22" width="6" height="4" fill="#7c3aed"/>
      </svg>
    ),
  },
  {
    id: "xr",
    name: "Extended Reality Specialisation",
    issuer: "University of Michigan × Coursera",
    date: "Mar 31, 2024",
    verifyUrl: "https://coursera.org/verify/specialization/WMGVC2X7CRG6",
    pdfPath: "/cert-xr.pdf",
    description: "3-course XR specialisation from University of Michigan covering AR/VR/MR/XR technologies, UX & interaction design for XR, and developing XR apps with WebXR, Unity & Unreal.",
    skills: ["AR/VR/MR", "WebXR", "Unity", "Unreal Engine", "XR UX Design", "Spatial Computing"],
    color: "#06b6d4",
    icon: (
      <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
        <rect width="48" height="48" rx="10" fill="#06b6d4"/>
        <circle cx="24" cy="24" r="10" fill="none" stroke="white" strokeWidth="2.5"/>
        <ellipse cx="24" cy="24" rx="5" ry="10" fill="none" stroke="white" strokeWidth="2" opacity="0.7"/>
        <line x1="14" y1="24" x2="34" y2="24" stroke="white" strokeWidth="2" opacity="0.7"/>
        <circle cx="24" cy="24" r="3" fill="white"/>
      </svg>
    ),
  },
  {
    id: "vr360",
    name: "VR and 360 Video Production",
    issuer: "Google AR & VR × Coursera",
    date: "Nov 21, 2023",
    verifyUrl: "https://coursera.org/verify/NWMHJ925YKS9",
    pdfPath: "/cert-vr360.pdf",
    description: "An online course authorized by Google AR & VR and offered through Coursera, covering the fundamentals of VR and 360 video production including filming, editing, and publishing immersive video experiences.",
    skills: ["VR Production", "360 Video", "Immersive Media", "Google Daydream", "Video Editing", "Spatial Storytelling"],
    color: "#10b981",
    icon: (
      <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
        <rect width="48" height="48" rx="10" fill="#10b981"/>
        {/* Camera body */}
        <rect x="8" y="16" width="24" height="17" rx="3" fill="white" opacity="0.9"/>
        {/* Lens */}
        <circle cx="20" cy="24" r="6" fill="#10b981"/>
        <circle cx="20" cy="24" r="3.5" fill="white" opacity="0.6"/>
        {/* 360 arc indicators */}
        <path d="M36 18 Q42 24 36 30" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
        <path d="M38 21 Q42 24 38 27" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5"/>
      </svg>
    ),
  },
];

const CertModal = ({ cert, onClose, isDude }: { cert: typeof CERTIFICATIONS[0]; onClose: () => void; isDude: boolean }) => {
  return (
    <div
      className="fixed inset-0 z-[9998] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(10px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full flex flex-col"
        style={{
          maxWidth: 860,
          maxHeight: "92vh",
          background: isDude ? "hsl(213 25% 10%)" : "#ffffff",
          border: `1px solid ${cert.color}55`,
          borderRadius: 20,
          boxShadow: `0 0 80px ${cert.color}25, 0 24px 80px rgba(0,0,0,0.5)`,
          animation: "certModalIn 0.25s ease forwards",
          overflow: "hidden",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 flex-shrink-0"
          style={{ borderBottom: `1px solid ${isDude ? "hsl(213 25% 18%)" : "#e2e8f0"}` }}>
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">{cert.icon}</div>
            <div>
              <p className="text-[10px] font-body uppercase tracking-widest" style={{ color: cert.color }}>{cert.issuer}</p>
              <h3 className="font-heading text-base leading-tight" style={{ color: isDude ? "#f9fafb" : "#0f172a" }}>{cert.name}</h3>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a href={cert.pdfPath} download
              className="text-[10px] font-body font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all duration-200 hover:opacity-80"
              style={{ background: isDude ? "hsl(213 25% 18%)" : "#f1f5f9", color: isDude ? "#d1d5db" : "#334155", border: `1px solid ${isDude ? "hsl(213 25% 24%)" : "#e2e8f0"}` }}>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M5 1v6M2 7l3 2 3-2M1 9h8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Download
            </a>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200"
              style={{ background: isDude ? "hsl(213 25% 18%)" : "#f1f5f9", color: isDude ? "#9ca3af" : "#64748b" }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Single unified content area — PDF top, info bottom */}
        <div className="overflow-y-auto flex-1 flex flex-col">

          {/* PDF embed — tall and prominent */}
          <div style={{ height: 480, flexShrink: 0, background: isDude ? "#0d111a" : "#f1f5f9" }}>
            <iframe
              src={`${cert.pdfPath}#toolbar=0&navpanes=0&scrollbar=1&view=FitH`}
              className="w-full h-full"
              style={{ border: "none" }}
              title={cert.name}
            />
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: isDude ? "hsl(213 25% 18%)" : "#e2e8f0", flexShrink: 0 }} />

          {/* Info section below PDF */}
          <div className="p-6 flex flex-col gap-5">
            {/* Date + verify */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <rect x="1" y="2" width="12" height="11" rx="2" stroke={isDude ? "#6b7280" : "#94a3b8"} strokeWidth="1.2"/>
                  <path d="M4 1v2M10 1v2M1 5h12" stroke={isDude ? "#6b7280" : "#94a3b8"} strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
                <span className="font-body text-xs" style={{ color: isDude ? "#9ca3af" : "#64748b" }}>Completed {cert.date}</span>
              </div>
              <a href={cert.verifyUrl} target="_blank" rel="noopener noreferrer"
                className="text-[10px] font-body font-bold uppercase tracking-widest px-2.5 py-1 rounded-lg flex items-center gap-1 transition-all duration-200 hover:opacity-80"
                style={{ background: `${cert.color}15`, color: cert.color, border: `1px solid ${cert.color}33` }}>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M4 2H2a1 1 0 00-1 1v5a1 1 0 001 1h5a1 1 0 001-1V6M6 1h3m0 0v3m0-3L4.5 5.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Verify
              </a>
            </div>

            <div style={{ height: 1, background: isDude ? "hsl(213 25% 18%)" : "#e2e8f0" }} />

            <p className="font-body text-sm leading-relaxed" style={{ color: isDude ? "#d1d5db" : "#334155" }}>
              {cert.description}
            </p>

            <div>
              <p className="text-[10px] font-body uppercase tracking-widest mb-2.5" style={{ color: isDude ? "#6b7280" : "#64748b" }}>Skills Covered</p>
              <div className="flex flex-wrap gap-2">
                {cert.skills.map(s => (
                  <span key={s} className="text-[11px] font-body font-medium px-3 py-1 rounded-full"
                    style={{ background: `${cert.color}15`, color: cert.color, border: `1px solid ${cert.color}30` }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-xl px-4 py-3"
              style={{ background: `${cert.color}10`, border: `1px solid ${cert.color}20` }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 1l1.854 3.756L14 5.528l-3 2.924.708 4.131L8 10.5l-3.708 2.083L5 8.452 2 5.528l4.146-.772L8 1z" fill={cert.color}/>
              </svg>
              <span className="font-body text-xs font-semibold" style={{ color: cert.color }}>Verified Certificate of Completion — Coursera</span>
            </div>
          </div>
        </div>
      </div>
      <style>{`@keyframes certModalIn { from { opacity:0; transform:scale(0.94) translateY(14px); } to { opacity:1; transform:scale(1) translateY(0); } }`}</style>
    </div>
  );
};

const CertificationsCard = ({ isDude }: { isDude: boolean }) => {
  const [activeCert, setActiveCert] = useState<typeof CERTIFICATIONS[0] | null>(null);
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => { timerRef.current = setTimeout(() => setVisible(true), 500); };
  const handleMouseLeave = () => { if (timerRef.current) clearTimeout(timerRef.current); setVisible(false); };

  return (
    <>
      <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {isDude ? (
          <div className="rounded-2xl p-8 cursor-pointer text-center transition-all duration-300"
            style={{ background: "hsl(213 25% 12%)", border: "1px solid hsl(213 25% 22%)", boxShadow: visible ? "0 0 40px rgba(6,182,212,0.18)" : "0 0 24px rgba(6,182,212,0.08)" }}>
            <h2 className="font-heading text-3xl md:text-4xl mb-2" style={{ color: "hsl(210 1% 88%)" }}>Certifications</h2>
            <p className="font-body text-xs uppercase tracking-widest" style={{ color: "hsl(210 1% 55%)" }}>Hover to explore</p>
          </div>
        ) : (
          <div className="bg-card border border-border rounded-2xl p-8 cursor-pointer hover:border-primary/40 transition-all duration-300 text-center">
            <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-2">Certifications</h2>
            <p className="text-muted-foreground font-body text-sm">Hover to explore</p>
          </div>
        )}

        {visible && (
          <div
            className="absolute bottom-full left-1/2 -translate-x-1/2 z-50 pb-4"
            style={{ animation: "hoverCardFadeUp 0.25s ease forwards" }}
          >
            {/* 2x2 grid of cert cards */}
            <div className="grid grid-cols-2 gap-3" style={{ width: 420 }}>
              {CERTIFICATIONS.map((cert, i) => {
                const g = dudeGradients[i % dudeGradients.length];
                return isDude ? (
                  <div
                    key={cert.id}
                    onClick={() => { setActiveCert(cert); setVisible(false); }}
                    className="group relative rounded-xl px-4 py-3 shadow-xl font-body text-sm font-semibold cursor-pointer text-center overflow-hidden transition-all duration-300"
                    style={{ background: "hsl(213 25% 12%)", border: `1px solid ${cert.color}`, color: "white", boxShadow: `0 0 18px ${cert.color}44` }}
                  >
                    <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: `${cert.color}22` }} />
                    <p className="relative z-10 text-[9px] uppercase tracking-widest mb-1" style={{ color: cert.color }}>View</p>
                    <p className="relative z-10 text-[10px] uppercase tracking-widest leading-snug">{cert.name}</p>
                  </div>
                ) : (
                  <div
                    key={cert.id}
                    onClick={() => { setActiveCert(cert); setVisible(false); }}
                    className="bg-popover border border-border rounded-xl px-4 py-3 shadow-xl text-popover-foreground font-body text-sm font-medium hover:bg-accent transition-colors duration-200 cursor-pointer text-center"
                    style={{ borderColor: `${cert.color}44` }}
                  >
                    <p className="text-[9px] uppercase tracking-widest mb-1" style={{ color: cert.color }}>View</p>
                    <p className="text-[10px] leading-snug">{cert.name}</p>
                  </div>
                );
              })}
            </div>

            {/* Arrow pointing DOWN toward the card */}
            <div className="flex justify-center">
              {isDude ? (
                <>
                  <div style={{ width: 0, height: 0, borderLeft: "9px solid transparent", borderRight: "9px solid transparent", borderTop: "9px solid hsl(213 25% 22%)" }} />
                </>
              ) : (
                <div style={{ width: 0, height: 0, borderLeft: "9px solid transparent", borderRight: "9px solid transparent", borderTop: "9px solid hsl(var(--border))" }} />
              )}
            </div>
          </div>
        )}
        <style>{`
          @keyframes hoverCardFadeUp {
            from { opacity:0; transform:translateX(-50%) translateY(6px); }
            to   { opacity:1; transform:translateX(-50%) translateY(0); }
          }
          @keyframes hoverCardFadeDown {
            from { opacity:0; transform:translateX(-50%) translateY(-6px); }
            to   { opacity:1; transform:translateX(-50%) translateY(0); }
          }
        `}</style>
      </div>

      {/* Modal */}
      {activeCert && <CertModal cert={activeCert} onClose={() => setActiveCert(null)} isDude={isDude} />}
    </>
  );
};
const AssignmentsContent = () => {
  const { isCorporate } = usePersona();
  const isDude = !isCorporate;

  const headingColor = isDude ? "hsl(210 1% 88%)" : "hsl(var(--foreground))";

  return (
    <main className={`bg-background text-foreground min-h-screen transition-colors duration-500 ${isDude ? "dude-mode" : ""}`}>
      <Navigation />

      {/* Work cards */}
      <section className="pt-32 pb-20 section-padding">
        <div className="container-wide">
          <div className="mb-4">
            <Link to="/" className="text-primary font-body text-sm hover:underline">← Back to Home</Link>
          </div>
          <h1 className="font-heading text-5xl md:text-6xl text-foreground mb-16">Work &amp; Assignments</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <CertificationsCard isDude={isDude} />
            <HoverCard label="Projects" items={projectItems} isDude={isDude} comingSoonItems={["CraftWorld", "Lobby"]} />
            <HoverCard label="Assignments" items={assignmentItems} isDude={isDude} itemScrollTargets={{ "Assignment 3": "/assignments/typography" }} />
          </div>
        </div>
      </section>


      <Footer />
    </main>
  );
};

const Assignments = () => (
  <PersonaProvider>
    <FontProvider>
      <AssignmentsContent />
    </FontProvider>
  </PersonaProvider>
);

export default Assignments;
