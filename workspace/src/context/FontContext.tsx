import React, { createContext, useContext, ReactNode } from "react";

interface FontContextType {
  fontsLoaded: boolean;
}

const FontContext = createContext<FontContextType>({ fontsLoaded: false });

export const useFontContext = () => useContext(FontContext);

interface FontProviderProps {
  children: ReactNode;
  fontsLoaded: boolean;
}

export const FontProvider: React.FC<FontProviderProps> = ({ children, fontsLoaded }) => {
  return (
    <FontContext.Provider value={{ fontsLoaded }}>
      {children}
    </FontContext.Provider>
  );
};