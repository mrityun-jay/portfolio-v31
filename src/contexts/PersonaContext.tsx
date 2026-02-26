import { createContext, useContext, useState, ReactNode, useCallback } from "react";

type Persona = "dude" | "corporate";

interface PersonaContextType {
  persona: Persona;
  setPersona: (p: Persona) => void;
  isCorporate: boolean;
  isTransitioning: boolean;
}

const PersonaContext = createContext<PersonaContextType>({
  persona: "corporate",
  setPersona: () => {},
  isCorporate: true,
  isTransitioning: false,
});

export const usePersona = () => useContext(PersonaContext);

export const PersonaProvider = ({ children }: { children: ReactNode }) => {
  const [persona, setPersonaState] = useState<Persona>(() => {
    const saved = sessionStorage.getItem("persona");
    return (saved === "dude" || saved === "corporate") ? saved : "corporate";
  });

  const [isTransitioning, setIsTransitioning] = useState(false);

  const setPersona = useCallback((p: Persona) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setPersonaState(p);
      sessionStorage.setItem("persona", p);
      setTimeout(() => setIsTransitioning(false), 400);
    }, 300);
  }, []);

  return (
    <PersonaContext.Provider value={{ persona, setPersona, isCorporate: persona === "corporate", isTransitioning }}>
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          pointerEvents: "none",
          backdropFilter: isTransitioning ? "blur(18px)" : "blur(0px)",
          WebkitBackdropFilter: isTransitioning ? "blur(18px)" : "blur(0px)",
          opacity: isTransitioning ? 1 : 0,
          transition: "opacity 300ms ease, backdrop-filter 300ms ease",
        }}
      />
      {children}
    </PersonaContext.Provider>
  );
};
