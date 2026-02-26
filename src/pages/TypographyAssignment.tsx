import { useState } from "react";
import { Link } from "react-router-dom";
import { usePersona } from "@/contexts/PersonaContext";
import { PersonaProvider } from "@/contexts/PersonaContext";
import { FontProvider } from "@/contexts/FontContext";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

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
// Placeholder sections 5, 6, 7 — content coming
// ─────────────────────────────────────────────
const PLACEHOLDER_SECTIONS = [
  { title: "5. Expressive Typography", subtitle: "" },
  { title: "6. Typography Poster Design", subtitle: "" },
  { title: "7. Brand Identity Analysis", subtitle: "" },
];

// ─────────────────────────────────────────────
// Section 5 — Expressive Typography (emotion slider)
// ─────────────────────────────────────────────
const EMOTIONS = [
  {
    label: "Angry",
    emoji: "😡",
    description: "Jagged, bold, uppercase — raw aggression in every stroke",
    bg: "#0a0d1a",
    bgLight: "#1a0000",
    renderText: (text: string) => (
      <span style={{
        fontFamily: '"Impact", "Arial Black", sans-serif',
        fontSize: 52,
        fontWeight: 900,
        textTransform: "uppercase" as const,
        letterSpacing: "0.06em",
        color: "#e63329",
        textShadow: "3px 3px 0 #f59e0b, 6px 6px 0 #7f1d1d, -1px -1px 0 #f59e0b",
        WebkitTextStroke: "1px #f59e0b",
        lineHeight: 1.1,
        display: "inline-block",
        filter: "drop-shadow(0 4px 12px #dc262688)",
      }}>{text}</span>
    ),
  },
  {
    label: "Fear",
    emoji: "😨",
    description: "Dripping, distressed strokes — the horror of the unknown",
    bg: "#050508",
    bgLight: "#0d0d0d",
    renderText: (text: string) => (
      <span style={{
        fontFamily: '"Palatino Linotype", "Georgia", serif',
        fontSize: 52,
        fontWeight: 900,
        color: "#1a1a1a",
        textTransform: "uppercase" as const,
        letterSpacing: "0.12em",
        lineHeight: 1.1,
        display: "inline-block",
        textShadow: "0 4px 6px rgba(0,0,0,0.9), 0 8px 14px rgba(0,0,0,0.8), 2px 16px 8px rgba(0,0,0,0.6), -1px 22px 6px rgba(0,0,0,0.4)",
        filter: "drop-shadow(0 12px 18px rgba(0,0,0,1)) contrast(1.8)",
        WebkitTextStroke: "3px #111",
        color: "#f0f0f0",
      }}>{text}</span>
    ),
  },
  {
    label: "Sad",
    emoji: "😢",
    description: "Heavy, worn letterforms — weight of sorrow pressing down",
    bg: "#000000",
    bgLight: "#111111",
    renderText: (text: string) => (
      <span style={{
        fontFamily: '"Arial Black", "Impact", sans-serif',
        fontSize: 56,
        fontWeight: 900,
        color: "#ffffff",
        textTransform: "uppercase" as const,
        letterSpacing: "0.08em",
        lineHeight: 1.1,
        display: "inline-block",
        WebkitTextStroke: "2px #ffffff",
        textShadow: "0 0 1px #fff, 0 0 2px #fff, -3px 0 0 #000, 3px 0 0 #000, 0 3px 0 #000",
        filter: "contrast(2) blur(0.4px)",
        opacity: 0.9,
      }}>{text}</span>
    ),
  },
  {
    label: "Confused",
    emoji: "😕",
    description: "Each letter tilts its own way — chaotic, disoriented, lost",
    bg: "#fafafa",
    bgLight: "#ffffff",
    renderText: (text: string) => {
      const rotations = [3, -5, 7, -3, 8, -6, 4, -7, 5, -4, 6, -2, 9];
      const sizes =     [1, 0.85, 1.1, 0.9, 1.05, 0.8, 1.15, 0.88, 1, 0.92, 1.08, 0.85, 1];
      const chars = (text || "Type…").split("");
      return (
        <span style={{ display: "inline-flex", alignItems: "baseline", flexWrap: "wrap", justifyContent: "center", gap: 1 }}>
          {chars.map((ch, i) => (
            <span key={i} style={{
              fontFamily: '"Arial Rounded MT Bold", "Trebuchet MS", sans-serif',
              fontSize: `${Math.round(44 * (sizes[i % sizes.length]))}px`,
              fontWeight: 900,
              color: "#111111",
              display: "inline-block",
              transform: `rotate(${rotations[i % rotations.length]}deg) translateY(${i % 3 === 0 ? -4 : i % 3 === 1 ? 4 : 0}px)`,
              lineHeight: 1.2,
            }}>{ch === " " ? "\u00a0" : ch}</span>
          ))}
        </span>
      );
    },
  },
  {
    label: "Neutral",
    emoji: "😐",
    description: "Clean, balanced, no emotional lean — pure clarity",
    bg: "#f8fafc",
    bgLight: "#f1f5f9",
    renderText: (text: string) => (
      <span style={{
        fontFamily: '"Helvetica Neue", "Inter", "Arial", sans-serif',
        fontSize: 44,
        fontWeight: 400,
        color: "#1e293b",
        letterSpacing: "-0.01em",
        lineHeight: 1.2,
        display: "inline-block",
      }}>{text}</span>
    ),
  },
  {
    label: "Happy",
    emoji: "😄",
    description: "Flowing cursive script — light, warm and full of joy",
    bg: "#f9fafb",
    bgLight: "#f9fafb",
    renderText: (text: string) => (
      <span style={{
        fontFamily: '"Brush Script MT", "Dancing Script", "Segoe Script", cursive',
        fontSize: 58,
        fontWeight: 400,
        color: "#111111",
        letterSpacing: "0.02em",
        lineHeight: 1.3,
        display: "inline-block",
        filter: "drop-shadow(1px 1px 0 rgba(0,0,0,0.15))",
      }}>{text}</span>
    ),
  },
  {
    label: "Love",
    emoji: "🥰",
    description: "Bold cursive flourishes on blush — romantic and tender",
    bg: "#fadadd",
    bgLight: "#fadadd",
    renderText: (text: string) => (
      <span style={{
        fontFamily: '"Brush Script MT", "Segoe Script", cursive',
        fontSize: 62,
        fontWeight: 700,
        color: "#3d2020",
        letterSpacing: "0.02em",
        lineHeight: 1.3,
        display: "inline-block",
        textShadow: "3px 3px 0 #f4a0b0, 5px 5px 0 #e8889a",
        filter: "drop-shadow(0 2px 8px #f472b666)",
      }}>{text}</span>
    ),
  },
];

const Section5Box = ({ isDude }: { isDude: boolean }) => {
  const [expanded, setExpanded] = useState(false);
  const [emotionIndex, setEmotionIndex] = useState(4);
  const [inputText, setInputText] = useState("I LOVE");

  const g = dudeGradients[0];
  const panelBg     = isDude ? "hsl(213 25% 10%)"  : "hsl(var(--card))";
  const panelBorder = isDude ? "hsl(213 25% 22%)"  : "hsl(var(--border))";
  const textColor   = isDude ? "hsl(210 1% 88%)"   : "hsl(var(--foreground))";
  const mutedColor  = isDude ? "hsl(210 1% 50%)"   : "hsl(var(--muted-foreground))";
  const inputBg     = isDude ? "hsl(213 25% 14%)"  : "hsl(var(--background))";
  const accentColor = isDude ? g.dot               : "hsl(var(--primary))";

  const emotion = EMOTIONS[emotionIndex];
  const previewBg = isDude ? emotion.bg : emotion.bgLight;

  const emotionAccents = ["#dc2626","#6b21a8","#3b82f6","#f59e0b","#94a3b8","#111111","#f472b6"];
  const activeColor = emotionAccents[emotionIndex];

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
        <h3 className="font-heading text-lg" style={{ color: textColor }}>5. Expressive Typography</h3>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
          className="flex-shrink-0 transition-transform duration-300"
          style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)", color: mutedColor }}
        >
          <path d="M3 5.5L8 10.5L13 5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {expanded && (
        <div className="px-6 py-5 flex flex-col gap-6">
          <p className="font-body text-xs" style={{ color: mutedColor }}>
            Type anything below, then drag the slider to feel how typography conveys emotion.
          </p>

          {/* Text input */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-body font-bold uppercase tracking-widest" style={{ color: mutedColor }}>Your Text</label>
            <textarea
              className="w-full rounded-xl px-4 py-3 font-body text-sm outline-none resize-none transition-all duration-200"
              style={{ background: inputBg, border: `1px solid ${panelBorder}`, color: textColor, minHeight: 72 }}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onFocus={(e) => (e.currentTarget.style.borderColor = accentColor)}
              onBlur={(e) => (e.currentTarget.style.borderColor = panelBorder)}
              placeholder="Type something…"
            />
          </div>

          {/* Live preview */}
          <div
            className="rounded-xl px-6 py-10 flex items-center justify-center min-h-[140px] overflow-hidden transition-all duration-500"
            style={{ background: previewBg, border: `1px solid ${activeColor}33` }}
          >
            {emotion.renderText(inputText || "Type something…")}
          </div>

          {/* Emotion label + description */}
          <div className="flex items-center gap-3">
            <span className="text-2xl">{emotion.emoji}</span>
            <div>
              <p className="font-body font-bold text-sm" style={{ color: activeColor }}>{emotion.label}</p>
              <p className="font-body text-xs" style={{ color: mutedColor }}>{emotion.description}</p>
            </div>
          </div>

          {/* Slider */}
          <div className="flex flex-col gap-3">
            <input
              type="range"
              min={0}
              max={6}
              step={1}
              value={emotionIndex}
              onChange={(e) => setEmotionIndex(Number(e.target.value))}
              className="w-full"
              style={{ accentColor: activeColor }}
            />
            <div className="flex justify-between">
              {EMOTIONS.map((e, i) => (
                <button
                  key={e.label}
                  onClick={() => setEmotionIndex(i)}
                  className="flex flex-col items-center gap-1 transition-all duration-200"
                  style={{ opacity: i === emotionIndex ? 1 : 0.38, transform: i === emotionIndex ? "scale(1.18)" : "scale(1)" }}
                >
                  <span className="text-lg leading-none">{e.emoji}</span>
                  <span className="text-[9px] font-body uppercase tracking-wider" style={{ color: i === emotionIndex ? activeColor : mutedColor }}>
                    {e.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────
// Section 6 — Typography Poster Design (interactive analysis)
// ─────────────────────────────────────────────
const POSTER_HOTSPOTS = [
  {
    id: "husqvarna",
    label: "HUSQVARNA",
    top: "22%", left: "50%",
    hierarchy: "Level 1 — Primary Focus",
    font: "Heavy condensed sans-serif (Impact-class)",
    fontType: "Sans-Serif",
    color: "#111111",
    principle: "Contrast + Hierarchy",
    description: "The brand name commands total visual dominance. Its extreme weight and scale make it the unavoidable first read — this is intentional brand authority through typography alone. No image could do this faster.",
    demonstrates: ["Visual hierarchy", "Weight contrast", "Brand authority", "Typographic dominance"],
  },
  {
    id: "vitpilen",
    label: "VITPILEN",
    top: "33%", left: "50%",
    hierarchy: "Level 2 — Model Identity",
    font: "Wide-tracked geometric sans-serif",
    fontType: "Sans-Serif",
    color: "#333333",
    principle: "Tracking + Spacing",
    description: "Wide letter-spacing creates elegance and restraint — the antithesis of HUSQVARNA's aggression. This contrast in tracking shows how the same font family can express entirely different emotional registers.",
    demonstrates: ["Letter-spacing control", "Hierarchy contrast", "Elegance through space", "Typographic pairing"],
  },
  {
    id: "250",
    label: "250",
    top: "43%", left: "50%",
    hierarchy: "Level 2b — Expressive Accent",
    font: "Brush/handwritten script display",
    fontType: "Script / Display",
    color: "#111111",
    principle: "Style Contrast + Expression",
    description: "The handwritten '250' breaks the mechanical rigidity of the sans-serifs above. This deliberate style clash humanises the machine — injecting energy and motion into an otherwise precise composition. Script against sans-serif is a classic typographic pairing technique.",
    demonstrates: ["Serif vs sans-serif pairing", "Expressive contrast", "Humanising mechanical content", "Typographic rhythm"],
  },
  {
    id: "whitearrow",
    label: "WHITE ARROW",
    top: "7%", left: "55%",
    hierarchy: "Level 3 — Supporting Identity",
    font: "Spaced capitals sans-serif",
    fontType: "Sans-Serif",
    color: "#222222",
    principle: "Tracking + Restraint",
    description: "Widely tracked capitals in a supporting role — this is typographic understatement. The text exists to inform without competing, demonstrating how hierarchy is maintained through size and weight reduction rather than style change.",
    demonstrates: ["Supporting hierarchy", "Consistent type family", "Restraint in composition", "Informational layering"],
  },
  {
    id: "specs",
    label: "30 BHP · 6-SPEED · 152 KG · 248.8 CM³",
    top: "79%", left: "50%",
    hierarchy: "Level 4 — Technical Information",
    font: "Bold geometric sans-serif, monospaced rhythm",
    fontType: "Sans-Serif",
    color: "#111111",
    principle: "Rhythm + Repetition",
    description: "The specs line uses typographic rhythm — equal weight, consistent sizing, dot separators — to create a horizontal reading band. This demonstrates repetition and proximity principles: grouped information reads as a single unit, communicating precision and performance data with industrial clarity.",
    demonstrates: ["Typographic rhythm", "Repetition principle", "Proximity grouping", "Information hierarchy"],
  },
  {
    id: "body",
    label: "Body copy paragraph",
    top: "91%", left: "60%",
    hierarchy: "Level 5 — Descriptive Text",
    font: "Regular weight serif body text",
    fontType: "Serif",
    color: "#444444",
    principle: "Readability + Balance",
    description: "The only serif element in the poster — a deliberate shift to warmth and readability for long-form text. Serif fonts at body size slow the eye down to a reading pace. This contrast with the bold sans-serifs above shows mastery of font pairing: the right typeface for the right purpose.",
    demonstrates: ["Serif for readability", "Contrast with sans-serif", "Visual balance", "Typographic hierarchy completion"],
  },
];

const Section6Box = ({ isDude }: { isDude: boolean }) => {
  const [expanded, setExpanded] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<typeof POSTER_HOTSPOTS[0] | null>(POSTER_HOTSPOTS[0]);

  const panelBg     = isDude ? "hsl(213 25% 10%)"  : "hsl(var(--card))";
  const panelBorder = isDude ? "hsl(213 25% 22%)"  : "hsl(var(--border))";
  const textColor   = isDude ? "hsl(210 1% 88%)"   : "hsl(var(--foreground))";
  const mutedColor  = isDude ? "hsl(210 1% 50%)"   : "hsl(var(--muted-foreground))";
  const inputBg     = isDude ? "hsl(213 25% 14%)"  : "hsl(var(--background))";
  const accentColor = isDude ? "#06b6d4"            : "hsl(var(--primary))";
  const g = dudeGradients[1];

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
        className="w-full flex items-center justify-between px-6 py-5 text-left"
        style={{
          borderBottom: expanded ? `1px solid ${panelBorder}` : "none",
          background: isDude ? `linear-gradient(90deg, ${g.dot}12, transparent)` : "transparent",
        }}
        onClick={() => setExpanded(v => !v)}
      >
        <h3 className="font-heading text-lg" style={{ color: textColor }}>6. Typography Poster Design</h3>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
          className="flex-shrink-0 transition-transform duration-300"
          style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)", color: mutedColor }}
        >
          <path d="M3 5.5L8 10.5L13 5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {expanded && (
        <div className="p-6 flex flex-col gap-4">
          <p className="font-body text-xs" style={{ color: mutedColor }}>
            Hover over any highlighted element on the poster to reveal its typographic analysis.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

            {/* LEFT — Analysis panel */}
            <div className="flex flex-col gap-4 min-h-[560px]">
              {activeHotspot ? (
                <div
                  className="rounded-2xl p-5 flex flex-col gap-4 transition-all duration-300"
                  style={{ background: isDude ? "#111827" : "#ffffff", border: `1px solid ${isDude ? "#1f2937" : "#e2e8f0"}` }}
                >
                  {/* Hotspot label */}
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[10px] font-body uppercase tracking-widest mb-1" style={{ color: isDude ? "#6b7280" : "#64748b" }}>Active Element</p>
                      <h4 className="font-heading text-2xl leading-tight" style={{ color: isDude ? "#f9fafb" : "#0f172a" }}>{activeHotspot.label}</h4>
                    </div>
                    <span
                      className="text-[9px] font-body font-bold uppercase tracking-widest px-2.5 py-1 rounded-full flex-shrink-0 mt-1"
                      style={{ background: isDude ? "#1f2937" : "#e2e8f0", color: isDude ? "#d1d5db" : "#334155", border: `1px solid ${isDude ? "#374151" : "#cbd5e1"}` }}
                    >
                      {activeHotspot.fontType}
                    </span>
                  </div>

                  {/* Hierarchy badge */}
                  <div
                    className="rounded-lg px-4 py-2.5 flex items-center gap-2"
                    style={{ background: isDude ? "#1f2937" : "#f1f5f9", border: `1px solid ${isDude ? "#374151" : "#cbd5e1"}` }}
                  >
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: isDude ? "#9ca3af" : "#475569" }} />
                    <span className="font-body text-xs font-semibold" style={{ color: isDude ? "#e5e7eb" : "#1e293b" }}>{activeHotspot.hierarchy}</span>
                  </div>

                  {/* Font used */}
                  <div>
                    <p className="text-[10px] font-body uppercase tracking-widest mb-1" style={{ color: isDude ? "#6b7280" : "#64748b" }}>Font Used</p>
                    <p className="font-body text-sm font-medium" style={{ color: isDude ? "#f3f4f6" : "#0f172a" }}>{activeHotspot.font}</p>
                  </div>

                  {/* Principle */}
                  <div>
                    <p className="text-[10px] font-body uppercase tracking-widest mb-1" style={{ color: isDude ? "#6b7280" : "#64748b" }}>Design Principle</p>
                    <p className="font-body text-sm font-bold" style={{ color: isDude ? "#f9fafb" : "#0f172a" }}>{activeHotspot.principle}</p>
                  </div>

                  {/* Analysis */}
                  <div>
                    <p className="text-[10px] font-body uppercase tracking-widest mb-2" style={{ color: isDude ? "#6b7280" : "#64748b" }}>Analysis</p>
                    <p className="font-body text-sm leading-relaxed" style={{ color: isDude ? "#d1d5db" : "#334155" }}>{activeHotspot.description}</p>
                  </div>

                  {/* Demonstrates tags */}
                  <div>
                    <p className="text-[10px] font-body uppercase tracking-widest mb-2" style={{ color: isDude ? "#6b7280" : "#64748b" }}>Demonstrates</p>
                    <div className="flex flex-wrap gap-2">
                      {activeHotspot.demonstrates.map(d => (
                        <span
                          key={d}
                          className="text-[10px] font-body px-2.5 py-1 rounded-full"
                          style={{ background: isDude ? "#1f2937" : "#e2e8f0", color: isDude ? "#d1d5db" : "#334155", border: `1px solid ${isDude ? "#374151" : "#cbd5e1"}` }}
                        >
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  className="rounded-2xl flex flex-col items-center justify-center min-h-[300px] gap-3"
                  style={{ background: isDude ? "#111827" : "#ffffff", border: `1.5px dashed ${isDude ? "#1f2937" : "#e2e8f0"}` }}
                >
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <path d="M14 6v16M6 14h16" stroke={isDude ? "#4b5563" : "#94a3b8"} strokeWidth="1.8" strokeLinecap="round" opacity="0.4" />
                  </svg>
                  <p className="font-body text-xs text-center" style={{ color: isDude ? "#6b7280" : "#94a3b8" }}>Hover a highlighted<br />element on the poster</p>
                </div>
              )}

              {/* Element navigation */}
              <div className="flex flex-col gap-1.5">
                <p className="text-[10px] font-body uppercase tracking-widest mb-1" style={{ color: isDude ? "#6b7280" : "#6b7280" }}>All Elements</p>
                {POSTER_HOTSPOTS.map((h, i) => (
                  <button
                    key={h.id}
                    onMouseEnter={() => setActiveHotspot(h)}
                    onClick={() => setActiveHotspot(h)}
                    className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all duration-200"
                    style={{
                      background: activeHotspot?.id === h.id ? (isDude ? "#1e2433" : "#f1f5f9") : (isDude ? "#111827" : "#ffffff"),
                      border: `1px solid ${activeHotspot?.id === h.id ? (isDude ? "#374151" : "#cbd5e1") : (isDude ? "#1f2937" : "#e2e8f0")}`,
                    }}
                  >
                    <span
                      className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold flex-shrink-0"
                      style={{
                        background: activeHotspot?.id === h.id ? (isDude ? "#374151" : "#1e293b") : (isDude ? "#1f2937" : "#e2e8f0"),
                        color: activeHotspot?.id === h.id ? (isDude ? "#f9fafb" : "#f9fafb") : (isDude ? "#9ca3af" : "#475569"),
                      }}
                    >
                      {i + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-body text-xs font-semibold truncate" style={{ color: isDude ? "#f3f4f6" : "#0f172a" }}>{h.label}</p>
                      <p className="font-body text-[10px] truncate" style={{ color: isDude ? "#9ca3af" : "#64748b" }}>{h.hierarchy}</p>
                    </div>
                    <span
                      className="text-[9px] font-body px-2 py-0.5 rounded-full flex-shrink-0"
                      style={{
                        background: isDude ? "#1f2937" : "#e2e8f0",
                        color: isDude ? "#d1d5db" : "#334155",
                        border: `1px solid ${isDude ? "#374151" : "#cbd5e1"}`,
                      }}
                    >{h.fontType}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* RIGHT — Poster with hotspots */}
            <div className="relative rounded-xl overflow-hidden" style={{ border: `1px solid ${panelBorder}` }}>
              <img
                src="/husqvarna-poster.jpg"
                alt="Husqvarna Vitpilen 250 Typography Poster"
                className="w-full h-auto block"
                style={{ display: "block" }}
              />

              {/* Hotspot overlays */}
              {POSTER_HOTSPOTS.map((h) => (
                <button
                  key={h.id}
                  onMouseEnter={() => setActiveHotspot(h)}
                  onClick={() => setActiveHotspot(h)}
                  className="absolute flex items-center justify-center transition-all duration-200 group"
                  style={{
                    top: h.top,
                    left: h.left,
                    transform: "translate(-50%, -50%)",
                    zIndex: 10,
                  }}
                >
                  {/* Pulse ring */}
                  <span
                    className="absolute w-8 h-8 rounded-full animate-ping"
                    style={{
                      background: activeHotspot?.id === h.id ? accentColor : "#ffffff",
                      opacity: activeHotspot?.id === h.id ? 0.25 : 0.15,
                    }}
                  />
                  {/* Dot */}
                  <span
                    className="relative w-4 h-4 rounded-full flex items-center justify-center transition-all duration-200"
                    style={{
                      background: activeHotspot?.id === h.id ? accentColor : "#ffffff",
                      boxShadow: `0 0 0 2px ${activeHotspot?.id === h.id ? accentColor : "#ffffff"}, 0 2px 8px rgba(0,0,0,0.4)`,
                      transform: activeHotspot?.id === h.id ? "scale(1.4)" : "scale(1)",
                    }}
                  />
                  {/* Tooltip label */}
                  <span
                    className="absolute left-6 top-1/2 -translate-y-1/2 whitespace-nowrap font-body text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none"
                    style={{ background: isDude ? "hsl(213 25% 12%)" : "white", color: isDude ? "#d1d5db" : "#334155", border: `1px solid ${isDude ? "#374151" : "#cbd5e1"}`, boxShadow: "0 2px 8px rgba(0,0,0,0.2)" }}
                  >
                    {h.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────
// Section 7 — Brand Identity Analysis (HBO)
// ─────────────────────────────────────────────
const HBO_HOTSPOTS = [
  {
    id: "logo-whole",
    label: "HBO Logo — Full Identity",
    top: "50%", left: "50%",
    hierarchy: "Primary — Complete Brand Mark",
    font: "Bold geometric sans-serif (custom weight)",
    fontType: "Sans-Serif",
    principle: "Typography as Identity",
    description: "The HBO logo is 100% typographic — no icons, no graphics, no decoration. The entire brand identity is built from three letterforms alone. This is the highest demonstration of typographic power: type not just carrying information, but being the brand itself.",
    demonstrates: ["Type as identity", "Typographic sufficiency", "Brand authority", "Minimalist design"],
  },
  {
    id: "h-letter",
    label: "H — Structural Anchor",
    top: "50%", left: "18%",
    hierarchy: "Level 1 — Opening Frame",
    font: "Ultra-bold sans-serif, crossbar centered",
    fontType: "Sans-Serif",
    principle: "Balance + Weight",
    description: "The 'H' opens the logo with two massive vertical stems connected by a centered crossbar. Its equal left/right mass creates structural stability. The crossbar's central placement demonstrates optical balance — the eye reads it as perfectly mid-height even under geometric measurement.",
    demonstrates: ["Structural balance", "Vertical rhythm", "Stroke weight", "Geometric precision"],
  },
  {
    id: "b-letter",
    label: "B — Transitional Bridge",
    top: "50%", left: "48%",
    hierarchy: "Level 2 — Middle Connector",
    font: "Bold sans-serif with rounded bowls",
    fontType: "Sans-Serif",
    principle: "Rhythm + Transition",
    description: "The 'B' bridges the angular 'H' and the circular 'O'. Its two rounded bowls introduce curvature that prepares the eye for the 'O'. The upper bowl is slightly smaller than the lower — a deliberate typographic subtlety that creates visual stability by placing more mass at the base.",
    demonstrates: ["Transitional rhythm", "Bowl proportion", "Visual flow", "Optical sizing"],
  },
  {
    id: "o-outer",
    label: "O — Dominant Circle",
    top: "50%", left: "78%",
    hierarchy: "Level 1 — Visual Focal Point",
    font: "Perfect geometric circle, ultra-heavy stroke",
    fontType: "Sans-Serif",
    principle: "Dominance + Contrast",
    description: "The 'O' is the largest and most visually dominant element. Its circular form provides a complete contrast to the rectangular 'H' and 'B'. This shape contrast — rectangle vs circle — is a foundational principle of typographic composition. The heavy outer ring creates a frame that draws the eye inward.",
    demonstrates: ["Shape contrast", "Visual dominance", "Geometric tension", "Eye direction"],
  },
  {
    id: "o-inner",
    label: "Inner Circle — Negative Space",
    top: "50%", left: "78%",
    hierarchy: "Level 2 — Focal Anchor",
    font: "Counter space — negative form within O",
    fontType: "Counter / Negative Space",
    principle: "Negative Space + Memorability",
    description: "The concentric inner circle inside the 'O' is HBO's most distinctive typographic feature. This counter — the enclosed white space — functions like a lens or spotlight. It creates a visual anchor that makes the logo immediately recognisable at any size. This is how negative space becomes a brand asset.",
    demonstrates: ["Negative space as design", "Counter form", "Brand memorability", "Focal point creation"],
  },
  {
    id: "spacing",
    label: "Letter Spacing & Kerning",
    top: "88%", left: "50%",
    hierarchy: "Supporting — Compositional Control",
    font: "Tight uniform kerning across all three letters",
    fontType: "Spacing Principle",
    principle: "Kerning + Cohesion",
    description: "The three letters are spaced with precise, tight kerning — close enough to read as a single unified mark, yet with enough breathing room to keep each letterform legible. This controlled spacing is what prevents the logo from feeling cramped despite its extreme weight. Spacing is the invisible architecture of the logo.",
    demonstrates: ["Kerning control", "Visual unity", "Legibility at weight", "Spacing as structure"],
  },
];

const HboLogoImg = ({ activeId, onHover }: { activeId: string | null; onHover: (id: string | null) => void }) => {
  const isActive = (id: string) => activeId === id;
  const highlight = "#3b82f6";

  return (
    <div className="relative w-full flex flex-col items-center justify-center"
      style={{ background: "#ffffff", borderRadius: 16, minHeight: 280 }}>
      <img
        src="/hbo-logo.png"
        alt="HBO Logo"
        className="w-full h-auto block"
        style={{ borderRadius: 16 }}
      />
      {/* Hotspot dots */}
      <div className="absolute inset-0 pointer-events-none" style={{ borderRadius: 16 }}>
        {HBO_HOTSPOTS.map((h) => (
          <div
            key={h.id}
            className="absolute"
            style={{ top: h.top, left: h.left, transform: "translate(-50%, -50%)", pointerEvents: "auto", zIndex: 10 }}
            onMouseEnter={() => onHover(h.id)}
            onMouseLeave={() => onHover(null)}
          >
            <span className="absolute w-8 h-8 rounded-full animate-ping"
              style={{ background: isActive(h.id) ? highlight : "#000", opacity: isActive(h.id) ? 0.3 : 0.1, transform: "translate(-50%,-50%)" }} />
            <span
              className="relative block w-4 h-4 rounded-full border-2 border-white transition-all duration-200"
              style={{
                background: isActive(h.id) ? highlight : "#111",
                boxShadow: `0 0 0 2px ${isActive(h.id) ? highlight : "#555"}, 0 2px 6px rgba(0,0,0,0.4)`,
                transform: isActive(h.id) ? "scale(1.5)" : "scale(1)",
              }}
            />
          </div>
        ))}
      </div>
      <p className="text-[10px] font-body uppercase tracking-widest py-3" style={{ color: "#94a3b8" }}>
        Hover any element to analyse its typographic role
      </p>
    </div>
  );
};

const Section7Box = ({ isDude }: { isDude: boolean }) => {
  const [expanded, setExpanded] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<typeof HBO_HOTSPOTS[0] | null>(HBO_HOTSPOTS[0]);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const panelBg     = isDude ? "hsl(213 25% 10%)"  : "hsl(var(--card))";
  const panelBorder = isDude ? "hsl(213 25% 22%)"  : "hsl(var(--border))";
  const textColor   = isDude ? "hsl(210 1% 88%)"   : "hsl(var(--foreground))";
  const mutedColor  = isDude ? "hsl(210 1% 50%)"   : "hsl(var(--muted-foreground))";
  const g = dudeGradients[2];

  const handleHover = (id: string | null) => {
    setHoveredId(id);
    if (id) {
      const found = HBO_HOTSPOTS.find(h => h.id === id);
      if (found) setActiveHotspot(found);
    }
  };

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
        className="w-full flex items-center justify-between px-6 py-5 text-left"
        style={{
          borderBottom: expanded ? `1px solid ${panelBorder}` : "none",
          background: isDude ? `linear-gradient(90deg, ${g.dot}12, transparent)` : "transparent",
        }}
        onClick={() => setExpanded(v => !v)}
      >
        <h3 className="font-heading text-lg" style={{ color: textColor }}>7. Brand Identity Analysis</h3>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
          className="flex-shrink-0 transition-transform duration-300"
          style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)", color: mutedColor }}
        >
          <path d="M3 5.5L8 10.5L13 5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {expanded && (
        <div className="p-6 flex flex-col gap-4">
          <p className="font-body text-xs" style={{ color: mutedColor }}>
            Hover over any letter in the HBO logo to reveal its typographic analysis.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

            {/* LEFT — Analysis panel */}
            <div className="flex flex-col gap-4">
              {activeHotspot ? (
                <div
                  className="rounded-2xl p-5 flex flex-col gap-4 transition-all duration-300"
                  style={{ background: isDude ? "#111827" : "#ffffff", border: `1px solid ${isDude ? "#1f2937" : "#e2e8f0"}` }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[10px] font-body uppercase tracking-widest mb-1" style={{ color: isDude ? "#6b7280" : "#64748b" }}>Active Element</p>
                      <h4 className="font-heading text-2xl leading-tight" style={{ color: isDude ? "#f9fafb" : "#0f172a" }}>{activeHotspot.label}</h4>
                    </div>
                    <span
                      className="text-[9px] font-body font-bold uppercase tracking-widest px-2.5 py-1 rounded-full flex-shrink-0 mt-1"
                      style={{ background: isDude ? "#1f2937" : "#e2e8f0", color: isDude ? "#d1d5db" : "#334155", border: `1px solid ${isDude ? "#374151" : "#cbd5e1"}` }}
                    >
                      {activeHotspot.fontType}
                    </span>
                  </div>

                  <div className="rounded-lg px-4 py-2.5 flex items-center gap-2"
                    style={{ background: isDude ? "#1f2937" : "#f1f5f9", border: `1px solid ${isDude ? "#374151" : "#cbd5e1"}` }}>
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: isDude ? "#9ca3af" : "#475569" }} />
                    <span className="font-body text-xs font-semibold" style={{ color: isDude ? "#e5e7eb" : "#1e293b" }}>{activeHotspot.hierarchy}</span>
                  </div>

                  <div>
                    <p className="text-[10px] font-body uppercase tracking-widest mb-1" style={{ color: isDude ? "#6b7280" : "#64748b" }}>Font Used</p>
                    <p className="font-body text-sm font-medium" style={{ color: isDude ? "#f3f4f6" : "#0f172a" }}>{activeHotspot.font}</p>
                  </div>

                  <div>
                    <p className="text-[10px] font-body uppercase tracking-widest mb-1" style={{ color: isDude ? "#6b7280" : "#64748b" }}>Design Principle</p>
                    <p className="font-body text-sm font-bold" style={{ color: isDude ? "#f9fafb" : "#0f172a" }}>{activeHotspot.principle}</p>
                  </div>

                  <div>
                    <p className="text-[10px] font-body uppercase tracking-widest mb-2" style={{ color: isDude ? "#6b7280" : "#64748b" }}>Analysis</p>
                    <p className="font-body text-sm leading-relaxed" style={{ color: isDude ? "#d1d5db" : "#334155" }}>{activeHotspot.description}</p>
                  </div>

                  <div>
                    <p className="text-[10px] font-body uppercase tracking-widest mb-2" style={{ color: isDude ? "#6b7280" : "#64748b" }}>Demonstrates</p>
                    <div className="flex flex-wrap gap-2">
                      {activeHotspot.demonstrates.map(d => (
                        <span key={d} className="text-[10px] font-body px-2.5 py-1 rounded-full"
                          style={{ background: isDude ? "#1f2937" : "#e2e8f0", color: isDude ? "#d1d5db" : "#334155", border: `1px solid ${isDude ? "#374151" : "#cbd5e1"}` }}>
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ) : null}

              {/* All elements list */}
              <div className="flex flex-col gap-1.5">
                <p className="text-[10px] font-body uppercase tracking-widest mb-1" style={{ color: isDude ? "#6b7280" : "#64748b" }}>All Elements</p>
                {HBO_HOTSPOTS.map((h, i) => (
                  <button
                    key={h.id}
                    onMouseEnter={() => handleHover(h.id)}
                    onMouseLeave={() => handleHover(null)}
                    onClick={() => setActiveHotspot(h)}
                    className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all duration-200"
                    style={{
                      background: activeHotspot?.id === h.id ? (isDude ? "#1e2433" : "#f1f5f9") : (isDude ? "#111827" : "#ffffff"),
                      border: `1px solid ${activeHotspot?.id === h.id ? (isDude ? "#374151" : "#cbd5e1") : (isDude ? "#1f2937" : "#e2e8f0")}`,
                    }}
                  >
                    <span className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold flex-shrink-0"
                      style={{
                        background: activeHotspot?.id === h.id ? (isDude ? "#374151" : "#1e293b") : (isDude ? "#1f2937" : "#e2e8f0"),
                        color: activeHotspot?.id === h.id ? "#f9fafb" : (isDude ? "#9ca3af" : "#475569"),
                      }}>
                      {i + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-body text-xs font-semibold truncate" style={{ color: isDude ? "#f3f4f6" : "#0f172a" }}>{h.label}</p>
                      <p className="font-body text-[10px] truncate" style={{ color: isDude ? "#9ca3af" : "#64748b" }}>{h.hierarchy}</p>
                    </div>
                    <span className="text-[9px] font-body px-2 py-0.5 rounded-full flex-shrink-0"
                      style={{ background: isDude ? "#1f2937" : "#e2e8f0", color: isDude ? "#d1d5db" : "#334155", border: `1px solid ${isDude ? "#374151" : "#cbd5e1"}` }}>
                      {h.fontType}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* RIGHT — Interactive HBO Logo */}
            <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${panelBorder}` }}>
              <HboLogoImg activeId={hoveredId} onHover={handleHover} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────
// Section 7b — Alternative Logo (HBO + camera lens)
// ─────────────────────────────────────────────
const ALT_HOTSPOTS = [
  {
    id: "alt-h",
    label: "H — Bold Sans-Serif Anchor",
    top: "55%", left: "13%",
    hierarchy: "Level 1 — Opening Statement",
    font: "Heavy sans-serif, thick uniform strokes",
    fontType: "Sans-Serif",
    principle: "Strength + Authority",
    description: "The large black 'H' opens with extreme visual weight — thick, clean strokes with zero ornamentation. Its bold sans-serif form communicates modernity, confidence and readability. The absence of serifs keeps the mark minimal and contemporary, perfectly suited for a global media brand.",
    demonstrates: ["Bold weight", "Sans-serif clarity", "Visual authority", "Modern identity"],
  },
  {
    id: "alt-lens",
    label: "Lens — Letterform Substitution",
    top: "30%", left: "56%",
    hierarchy: "Level 1 — Conceptual Focal Point",
    font: "Camera lens replacing circular 'O'",
    fontType: "Conceptual Typography",
    principle: "Letter Substitution + Symbolism",
    description: "The camera lens replaces the 'O' while preserving its circular typographic structure. This is conceptual typography at its most powerful — the letter becomes a symbol without losing its positional identity. The lens connects the brand to film, media and broadcasting while maintaining the logo's readability.",
    demonstrates: ["Conceptual typography", "Symbol substitution", "Brand storytelling", "Circular form retention"],
  },
  {
    id: "alt-contrast",
    label: "Flat vs Detailed Contrast",
    top: "55%", left: "75%",
    hierarchy: "Level 2 — Visual Tension",
    font: "Flat black type vs photorealistic lens texture",
    fontType: "Contrast Principle",
    principle: "Contrast + Dynamic Interest",
    description: "Strong contrast exists between the flat, solid black letterforms and the highly detailed, realistic camera lens. This texture contrast creates visual interest and emphasis — the lens becomes a natural focal point precisely because it breaks the visual consistency. Contrast makes design dynamic.",
    demonstrates: ["Texture contrast", "Visual emphasis", "Focal point creation", "Design dynamism"],
  },
  {
    id: "alt-hierarchy",
    label: "Reading Order — Visual Hierarchy",
    top: "88%", left: "50%",
    hierarchy: "Level 3 — Eye Flow",
    font: "Hierarchy through size, weight and detail",
    fontType: "Hierarchy Principle",
    principle: "Visual Hierarchy + Reading Order",
    description: "The eye moves: H → Lens (O) → remaining letters. The bold 'H' commands first attention through sheer weight. The lens captures second attention through its realistic detail and circular contrast. The remaining letterforms provide structural context. This creates a deliberate, controlled reading order.",
    demonstrates: ["Eye movement control", "Reading order", "Hierarchy through contrast", "Structured composition"],
  },
  {
    id: "alt-balance",
    label: "Baseline & Structural Balance",
    top: "82%", left: "30%",
    hierarchy: "Level 4 — Compositional Stability",
    font: "All elements share baseline alignment",
    fontType: "Balance Principle",
    principle: "Balance + Alignment",
    description: "Despite replacing a letter with a photographic object, the logo maintains structural balance. All elements share the same baseline. The lens height matches the letterforms. The heavy 'H' on the left counterbalances the circular lens on the right. This is professional typographic composition — stability through alignment.",
    demonstrates: ["Baseline alignment", "Visual balance", "Horizontal stability", "Weight distribution"],
  },
];

const AltHboBox = ({ isDude }: { isDude: boolean }) => {
  const [expanded, setExpanded] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<typeof ALT_HOTSPOTS[0] | null>(ALT_HOTSPOTS[0]);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const panelBg     = isDude ? "hsl(213 25% 10%)"  : "hsl(var(--card))";
  const panelBorder = isDude ? "hsl(213 25% 22%)"  : "hsl(var(--border))";
  const textColor   = isDude ? "hsl(210 1% 88%)"   : "hsl(var(--foreground))";
  const mutedColor  = isDude ? "hsl(210 1% 50%)"   : "hsl(var(--muted-foreground))";
  const g = dudeGradients[3];

  const handleHover = (id: string | null) => {
    setHoveredId(id);
    if (id) {
      const found = ALT_HOTSPOTS.find(h => h.id === id);
      if (found) setActiveHotspot(found);
    }
  };

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
        className="w-full flex items-center justify-between px-6 py-5 text-left"
        style={{
          borderBottom: expanded ? `1px solid ${panelBorder}` : "none",
          background: isDude ? `linear-gradient(90deg, ${g.dot}12, transparent)` : "transparent",
        }}
        onClick={() => setExpanded(v => !v)}
      >
        <div>
          <h3 className="font-heading text-lg" style={{ color: textColor }}>Alternative</h3>
          <p className="font-body text-xs mt-0.5" style={{ color: mutedColor }}>Modified HBO logo — camera lens substitution</p>
        </div>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
          className="flex-shrink-0 transition-transform duration-300"
          style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)", color: mutedColor }}
        >
          <path d="M3 5.5L8 10.5L13 5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {expanded && (
        <div className="p-6 flex flex-col gap-4">
          <p className="font-body text-xs" style={{ color: mutedColor }}>
            Hover over any element in the alternative logo to see why this typographic choice works.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

            {/* LEFT — Analysis panel */}
            <div className="flex flex-col gap-4">
              {activeHotspot && (
                <div
                  className="rounded-2xl p-5 flex flex-col gap-4 transition-all duration-300"
                  style={{ background: isDude ? "#111827" : "#ffffff", border: `1px solid ${isDude ? "#1f2937" : "#e2e8f0"}` }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[10px] font-body uppercase tracking-widest mb-1" style={{ color: isDude ? "#6b7280" : "#64748b" }}>Active Element</p>
                      <h4 className="font-heading text-2xl leading-tight" style={{ color: isDude ? "#f9fafb" : "#0f172a" }}>{activeHotspot.label}</h4>
                    </div>
                    <span className="text-[9px] font-body font-bold uppercase tracking-widest px-2.5 py-1 rounded-full flex-shrink-0 mt-1"
                      style={{ background: isDude ? "#1f2937" : "#e2e8f0", color: isDude ? "#d1d5db" : "#334155", border: `1px solid ${isDude ? "#374151" : "#cbd5e1"}` }}>
                      {activeHotspot.fontType}
                    </span>
                  </div>

                  <div className="rounded-lg px-4 py-2.5 flex items-center gap-2"
                    style={{ background: isDude ? "#1f2937" : "#f1f5f9", border: `1px solid ${isDude ? "#374151" : "#cbd5e1"}` }}>
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: isDude ? "#9ca3af" : "#475569" }} />
                    <span className="font-body text-xs font-semibold" style={{ color: isDude ? "#e5e7eb" : "#1e293b" }}>{activeHotspot.hierarchy}</span>
                  </div>

                  <div>
                    <p className="text-[10px] font-body uppercase tracking-widest mb-1" style={{ color: isDude ? "#6b7280" : "#64748b" }}>Design Principle</p>
                    <p className="font-body text-sm font-bold" style={{ color: isDude ? "#f9fafb" : "#0f172a" }}>{activeHotspot.principle}</p>
                  </div>

                  <div>
                    <p className="text-[10px] font-body uppercase tracking-widest mb-2" style={{ color: isDude ? "#6b7280" : "#64748b" }}>Analysis</p>
                    <p className="font-body text-sm leading-relaxed" style={{ color: isDude ? "#d1d5db" : "#334155" }}>{activeHotspot.description}</p>
                  </div>

                  <div>
                    <p className="text-[10px] font-body uppercase tracking-widest mb-2" style={{ color: isDude ? "#6b7280" : "#64748b" }}>Demonstrates</p>
                    <div className="flex flex-wrap gap-2">
                      {activeHotspot.demonstrates.map(d => (
                        <span key={d} className="text-[10px] font-body px-2.5 py-1 rounded-full"
                          style={{ background: isDude ? "#1f2937" : "#e2e8f0", color: isDude ? "#d1d5db" : "#334155", border: `1px solid ${isDude ? "#374151" : "#cbd5e1"}` }}>
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* All elements list */}
              <div className="flex flex-col gap-1.5">
                <p className="text-[10px] font-body uppercase tracking-widest mb-1" style={{ color: isDude ? "#6b7280" : "#64748b" }}>All Elements</p>
                {ALT_HOTSPOTS.map((h, i) => (
                  <button key={h.id}
                    onMouseEnter={() => handleHover(h.id)}
                    onMouseLeave={() => handleHover(null)}
                    onClick={() => setActiveHotspot(h)}
                    className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all duration-200"
                    style={{
                      background: activeHotspot?.id === h.id ? (isDude ? "#1e2433" : "#f1f5f9") : (isDude ? "#111827" : "#ffffff"),
                      border: `1px solid ${activeHotspot?.id === h.id ? (isDude ? "#374151" : "#cbd5e1") : (isDude ? "#1f2937" : "#e2e8f0")}`,
                    }}
                  >
                    <span className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold flex-shrink-0"
                      style={{
                        background: activeHotspot?.id === h.id ? (isDude ? "#374151" : "#1e293b") : (isDude ? "#1f2937" : "#e2e8f0"),
                        color: activeHotspot?.id === h.id ? "#f9fafb" : (isDude ? "#9ca3af" : "#475569"),
                      }}>
                      {i + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-body text-xs font-semibold truncate" style={{ color: isDude ? "#f3f4f6" : "#0f172a" }}>{h.label}</p>
                      <p className="font-body text-[10px] truncate" style={{ color: isDude ? "#9ca3af" : "#64748b" }}>{h.hierarchy}</p>
                    </div>
                    <span className="text-[9px] font-body px-2 py-0.5 rounded-full flex-shrink-0"
                      style={{ background: isDude ? "#1f2937" : "#e2e8f0", color: isDude ? "#d1d5db" : "#334155", border: `1px solid ${isDude ? "#374151" : "#cbd5e1"}` }}>
                      {h.fontType}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* RIGHT — Alt logo with hotspots */}
            <div className="relative rounded-xl overflow-hidden" style={{ border: `1px solid ${panelBorder}` }}>
              <img
                src="/hbo-alt-logo.png"
                alt="HBO Alternative Logo — Camera Lens"
                className="w-full h-auto block"
              />
              {/* Hotspot dots */}
              <div className="absolute inset-0 pointer-events-none">
                {ALT_HOTSPOTS.map((h) => (
                  <div key={h.id} className="absolute"
                    style={{ top: h.top, left: h.left, transform: "translate(-50%, -50%)", pointerEvents: "auto", zIndex: 10 }}
                    onMouseEnter={() => handleHover(h.id)}
                    onMouseLeave={() => handleHover(null)}
                  >
                    <span className="absolute w-8 h-8 rounded-full animate-ping"
                      style={{ background: hoveredId === h.id ? "#3b82f6" : "#000", opacity: hoveredId === h.id ? 0.3 : 0.12, transform: "translate(-50%,-50%)" }} />
                    <span className="relative block w-4 h-4 rounded-full border-2 border-white transition-all duration-200"
                      style={{
                        background: hoveredId === h.id ? "#3b82f6" : "#111",
                        boxShadow: `0 0 0 2px ${hoveredId === h.id ? "#3b82f6" : "#555"}, 0 2px 6px rgba(0,0,0,0.4)`,
                        transform: hoveredId === h.id ? "scale(1.5)" : "scale(1)",
                      }} />
                  </div>
                ))}
              </div>
              <div className="px-4 py-3" style={{ background: isDude ? "#0d111a" : "#f8fafc" }}>
                <p className="text-[10px] font-body uppercase tracking-widest text-center" style={{ color: isDude ? "#6b7280" : "#94a3b8" }}>
                  Hover any element to analyse its typographic role
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────
// Placeholder box (unused but kept for safety)
// ─────────────────────────────────────────────
const PlaceholderBox = ({
  section,
  isDude,
  colorIndex,
}: {
  section: typeof PLACEHOLDER_SECTIONS[0];
  isDude: boolean;
  colorIndex: number;
}) => {
  const g = dudeGradients[colorIndex % dudeGradients.length];
  const panelBg    = isDude ? "hsl(213 25% 10%)"  : "hsl(var(--card))";
  const panelBorder= isDude ? "hsl(213 25% 22%)"  : "hsl(var(--border))";
  const textColor  = isDude ? "hsl(210 1% 88%)"   : "hsl(var(--foreground))";
  const mutedColor = isDude ? "hsl(210 1% 50%)"   : "hsl(var(--muted-foreground))";
  const accentColor= isDude ? g.dot               : "hsl(var(--primary))";

  return (
    <div
      className="rounded-2xl overflow-hidden transition-all duration-300"
      style={{
        background: panelBg,
        border: `1px solid ${panelBorder}`,
        boxShadow: isDude ? `0 0 28px ${g.dot}18` : "0 2px 20px rgba(0,0,0,0.06)",
        opacity: 0.6,
      }}
    >
      <div
        className="w-full flex items-center justify-between px-6 py-5"
        style={{
          borderBottom: `1px dashed ${panelBorder}`,
          background: isDude ? `linear-gradient(90deg, ${g.dot}0d, transparent)` : "transparent",
        }}
      >
        <h3 className="font-heading text-lg" style={{ color: textColor }}>{section.title}</h3>
        <span
          className="text-[9px] font-body font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
          style={{
            background: isDude ? "#1f2937" : "#e2e8f0",
            color: isDude ? "#d1d5db" : "#334155",
            border: `1px dashed ${isDude ? "#374151" : "#cbd5e1"}`,
          }}
        >
          Coming Soon
        </span>
      </div>
      <div className="px-6 py-8">
        <div
          className="w-full rounded-xl flex flex-col items-center justify-center py-10 gap-2"
          style={{
            border: `1.5px dashed ${isDude ? g.dot + "35" : "hsl(var(--border))"}`,
            background: isDude ? `${g.dot}07` : "hsl(var(--accent)/0.25)",
          }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 4V16M4 10H16" stroke={accentColor} strokeWidth="1.8" strokeLinecap="round" opacity="0.6" />
          </svg>
          <p className="font-body text-xs" style={{ color: mutedColor }}>Content will be added here</p>
        </div>
      </div>
    </div>
  );
};

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
  const [expanded, setExpanded] = useState(false);
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
// Page
// ─────────────────────────────────────────────
const TypographyAssignmentContent = () => {
  const { isCorporate } = usePersona();
  const isDude = !isCorporate;

  const [text, setText] = useState("The quick brown fox jumps over the lazy dog.");
  const [selectedFont, setSelectedFont] = useState("Inter");
  const [fontSize, setFontSize] = useState(32);

  const headingColor = isDude ? "hsl(210 1% 88%)" : "hsl(var(--foreground))";
  const mutedColor = isDude ? "hsl(210 1% 50%)" : "hsl(var(--muted-foreground))";
  const sectionBg = isDude ? "hsl(213 25% 8%)" : "transparent";

  return (
    <main className={`bg-background text-foreground min-h-screen transition-colors duration-500 ${isDude ? "dude-mode" : ""}`}>
      <Navigation />

      <section className="pt-32 pb-28 section-padding" style={{ background: sectionBg }}>
        <div className="container-wide">
          <div className="mb-4">
            <Link to="/assignments" className="text-primary font-body text-sm hover:underline">
              ← Back to Assignments
            </Link>
          </div>

          <div className="mb-10">
            <p className="text-[10px] uppercase tracking-widest font-body mb-2" style={{ color: mutedColor }}>
              Assignment 3 — Typography
            </p>
            <h1 className="font-heading text-4xl md:text-5xl" style={{ color: headingColor }}>
              Understanding the Essence of Typography
            </h1>
            <p className="font-body text-sm mt-2" style={{ color: mutedColor }}>
              Graphics Animation Tools
              <span className="ml-3 opacity-60">— Type in the box on the left. Every demo updates live.</span>
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-8 items-start">
            <div className="lg:sticky lg:top-24">
              <FontTesterPanel
                isDude={isDude}
                text={text}
                setText={setText}
                selectedFont={selectedFont}
                setSelectedFont={setSelectedFont}
                fontSize={fontSize}
                setFontSize={setFontSize}
              />
            </div>

            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3 mb-2">
                <span
                  className="text-[10px] font-body font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                  style={{
                    background: isDude ? "rgba(6,182,212,0.12)" : "hsl(var(--accent))",
                    color: isDude ? "#06b6d4" : "hsl(var(--primary))",
                    border: isDude ? "1px solid rgba(6,182,212,0.3)" : "1px solid hsl(var(--border))",
                  }}
                >
                  Part 1 — Theoretical Understanding
                </span>
              </div>
              {PART1_SECTIONS.map((section, i) => (
                <Part1Box
                  key={section.title}
                  section={section}
                  isDude={isDude}
                  colorIndex={i}
                  text={text}
                  font={selectedFont}
                />
              ))}
              <Section5Box isDude={isDude} />
            </div>
          </div>

          {/* Section 6 — full width */}
          <div className="mt-8">
            <Section6Box isDude={isDude} />
          </div>

          {/* Section 7 — full width */}
          <div className="mt-6">
            <Section7Box isDude={isDude} />
          </div>

          {/* Section 7b — Alternative logo */}
          <div className="mt-6">
            <AltHboBox isDude={isDude} />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

const TypographyAssignment = () => (
  <PersonaProvider>
    <FontProvider>
      <TypographyAssignmentContent />
    </FontProvider>
  </PersonaProvider>
);

export default TypographyAssignment;
