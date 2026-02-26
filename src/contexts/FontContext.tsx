import { createContext, useContext, useState, ReactNode, useEffect } from "react";

const CORPORATE_FONTS = [
  "Helvetica", "Arial", "Times New Roman", "Calibri", "Garamond",
  "Georgia", "Roboto", "Open Sans", "Lato", "Verdana",
  "Montserrat", "Futura", "Baskerville", "Proxima Nova", "Univers",
  "Avenir", "Century Gothic", "Franklin Gothic", "DIN", "Tahoma",
  "Cambria", "Palatino", "Minion Pro", "Book Antiqua", "Source Sans Pro",
] as const;

const DUDE_FONTS = [
  "Helvetica Now Variable", "Poppins", "Gilroy", "Inter", "Satoshi",
  "Neue Haas Grotesk", "Chivo", "GT America", "Gotham", "Clash Display",
  "Bebas Neue", "Playfair Display", "Cereal", "Maison Neue", "Brandon Grotesque",
  "TT Norms", "Avenir Next", "Butler", "Raleway", "Cookie",
  "Pacifico", "Sarabun", "Oxanium", "Baloo", "Space Grotesk",
] as const;

type FontName = string;

interface FontContextType {
  font: FontName;
  setFont: (f: FontName) => void;
  fonts: readonly string[];
  corporateFonts: readonly string[];
  dudeFonts: readonly string[];
}

const FontContext = createContext<FontContextType>({
  font: "Helvetica",
  setFont: () => {},
  fonts: CORPORATE_FONTS,
  corporateFonts: CORPORATE_FONTS,
  dudeFonts: DUDE_FONTS,
});

export const useFont = () => useContext(FontContext);

export const FontProvider = ({ children }: { children: ReactNode }) => {
  const [font, setFont] = useState<FontName>("Helvetica");
  const [isCorporate, setIsCorporate] = useState(true);

  // Listen for persona changes via class on document
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const hasDude = document.querySelector('.dude-mode');
      setIsCorporate(!hasDude);
    });
    observer.observe(document.body, { subtree: true, attributes: true, attributeFilter: ['class'], childList: true });
    return () => observer.disconnect();
  }, []);

  const currentFonts = isCorporate ? CORPORATE_FONTS : DUDE_FONTS;

  useEffect(() => {
    // Reset font when persona changes
    setFont(isCorporate ? "Helvetica" : "Poppins");
  }, [isCorporate]);

  useEffect(() => {
    // Load selected font from Google Fonts dynamically
    const familyParam = font.replace(/ /g, "+");
    const linkId = "dynamic-font-link";
    let link = document.getElementById(linkId) as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.id = linkId;
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }
    link.href = `https://fonts.googleapis.com/css2?family=${familyParam}:wght@300;400;500;600;700&display=swap`;

    document.documentElement.style.setProperty("--font-heading", `"${font}", serif`);
  }, [font]);

  return (
    <FontContext.Provider value={{ font, setFont, fonts: currentFonts, corporateFonts: CORPORATE_FONTS, dudeFonts: DUDE_FONTS }}>
      {children}
    </FontContext.Provider>
  );
};
