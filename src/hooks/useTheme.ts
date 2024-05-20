import { useEffect, useState } from "react";

interface IThemeReturn {
  isDarkMode: boolean;
  toggleTheme: () => void;
  handleCheckTheme: () => MediaQueryList;
  handleTheme: (isDarkMode: boolean) => void;
}

const useTheme = (): IThemeReturn => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    // ¿El tema del sistema es oscuro?
    const theme = handleCheckTheme();

    // Función para manejar el cambio de tema del sistema.
    const themeChangeHandler = (event: MediaQueryListEvent) =>
      setIsDarkMode(event.matches);

    // Si el tema del sistema es oscuro, cambia el estado y agrega un listener para los cambios.
    if (theme) {
      setIsDarkMode(theme.matches);
      theme.addEventListener("change", themeChangeHandler);
    }

    // Al desmontar el componente, remueve el listener
    return () => theme.removeEventListener("change", themeChangeHandler);
  }, []);

  // Manejar el cambio de tema en la aplicación
  useEffect(() => {
    handleTheme(isDarkMode);
  }, [isDarkMode]);

  // Cambiar el tema de la aplicación
  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  // Verificar si el tema del sistema es oscuro
  const handleCheckTheme = (): MediaQueryList =>
    window.matchMedia("(prefers-color-scheme: dark)");

  // Manejar el tema de la aplicación
  const handleTheme = (isDarkMode: boolean): void => {
    isDarkMode
      ? document.body.classList.add("dark", "text-foreground", "bg-background")
      : document.body.classList.remove(
          "dark",
          "text-foreground",
          "bg-background"
        );
  };

  return { isDarkMode, toggleTheme, handleCheckTheme, handleTheme };
};

export default useTheme;
