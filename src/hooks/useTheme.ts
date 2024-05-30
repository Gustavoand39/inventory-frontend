import { useCallback, useEffect, useState } from "react";
import { Theme, IThemeReturn } from "../interfaces/ThemeContext";

/**
 * Retorna el tema guardado en el localStorage si existe,
 * de lo contrario retorna el tema del sistema.
 *
 * @returns {Theme} - Tema guardado o el tema del sistema.
 */
const getTheme = (): Theme => {
  const theme = localStorage.getItem("theme") as Theme;
  return theme ?? "system";
};

/**
 * Hook personalizado para manejar el tema de la aplicación.
 *
 * @returns {IThemeReturn} - Objeto con el tema actual y una función para cambiarlo.
 */
const useTheme = (): IThemeReturn => {
  const [theme, setTheme] = useState<Theme>(getTheme);

  /**
   * Actualiza las clases del cuerpo del documento según el tema oscuro o claro.
   *
   * @param {boolean} isDark - Indicador de si el tema es oscuro.
   */
  const updateTheme = (isDark: boolean): void => {
    const classList = document.body.classList;
    const darkClasses = ["dark", "text-foreground", "bg-background"];

    isDark ? classList.add(...darkClasses) : classList.remove(...darkClasses);
  };

  /**
   * Verifica y aplica el tema actual según la preferencia del usuario o del sistema.
   */
  const checkTheme = useCallback((): void => {
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
      updateTheme(systemTheme.matches);
    } else {
      updateTheme(theme === "dark");
    }
  }, [theme]);

  /**
   * Efecto que ejecuta checkTheme al montar el componente y cuando el tema cambia.
   * Se añade un listener para cambios en el tema del sistema solo si el tema actual es "system".
   */
  useEffect(() => {
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");

      // Listener para cambios en el esquema de color del sistema
      const systemThemeListener = (e: MediaQueryListEvent) => {
        if (theme === "system") updateTheme(e.matches);
      };

      // Añadir el listener y ejecutar checkTheme
      systemTheme.addEventListener("change", systemThemeListener);
      checkTheme();

      // Limpiar el listener al desmontar el componente o cambiar la dependencia
      return () =>
        systemTheme.removeEventListener("change", systemThemeListener);
    } else {
      // Ejecutar checkTheme al montar el componente si el tema no es "system"
      checkTheme();
    }
  }, [theme, checkTheme]);

  /**
   * Cambia el tema y actualiza el estado.
   * También guarda el nuevo tema en localStorage.
   *
   * @param {Theme} newTheme - Nuevo tema a aplicar.
   */
  const toggleTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return { theme, toggleTheme };
};

export default useTheme;
