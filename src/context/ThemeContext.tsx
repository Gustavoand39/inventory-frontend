import { createContext, useContext, ReactNode } from "react";
import useTheme from "../hooks/useTheme";
import { IThemeReturn } from "../interfaces/ThemeContext";

/**
 * Contexto para el tema de la aplicación.
 * Permite compartir el estado del tema y la función para cambiarlo a través de la aplicación.
 */
const ThemeContext = createContext<IThemeReturn | undefined>(undefined);

type ThemeProviderProps = {
  children: ReactNode;
};

/**
 * Proveedor de tema.
 * Envuelve la aplicación y proporciona el estado del tema y la función para cambiarlo.
 *
 * @param {ThemeProviderProps} children - Componentes hijos que serán envueltos por el proveedor.
 * @returns {JSX.Element} - Elemento JSX con el proveedor de contexto de tema.
 */
export const ThemeProvider = ({
  children,
}: ThemeProviderProps): JSX.Element => {
  const { theme, toggleTheme } = useTheme();

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Hook personalizado para usar el contexto del tema.
 * Devuelve el estado del tema y la función para cambiarlo.
 * Debe ser usado dentro de un ThemeProvider.
 *
 * @throws {Error} - Si el hook es usado fuera de un ThemeProvider.
 * @returns {IThemeReturn} - Objeto con el tema actual y la función para cambiarlo.
 */
export const useThemeContext = (): IThemeReturn => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error(
      "useThemeContext debe ser usado dentro de un ThemeProvider"
    );
  }
  return context;
};
