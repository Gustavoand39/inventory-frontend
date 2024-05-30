import { useState, useEffect, useRef } from "react";
import { Button } from "@nextui-org/react";
import {
  MoonIcon as Dark,
  SunIcon as Light,
  ComputerDesktopIcon as System,
} from "@heroicons/react/24/solid";
import useTheme from "../../hooks/useTheme";
import { Theme } from "../../interfaces/ThemeContext";

const ThemeSelector = (): JSX.Element => {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClick = (selectedTheme: Theme) => {
    toggleTheme(selectedTheme);
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={containerRef}>
      <Button
        isIconOnly
        variant="light"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Cambiar tema"
      >
        {theme === "system" ? (
          <System height={24} />
        ) : theme === "light" ? (
          <Light height={24} />
        ) : (
          <Dark height={24} />
        )}
      </Button>

      <div
        className={`w-40 absolute top-20 right-12 flex flex-col items-start rounded-lg border border-gray-200 shadow-md p-1 
          bg-white dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-950 ${
            isOpen ? "flex" : "hidden"
          }`}
      >
        <Button
          variant="light"
          className={`w-full flex justify-start font-semibold ${
            theme === "system"
              ? "text-teal-500 dark:text-teal-300 bg-gray-100 dark:bg-teal-950"
              : ""
          }`}
          startContent={<System height={24} />}
          onClick={() => handleClick("system")}
          aria-label="Tema del sistema"
        >
          Sistema
        </Button>

        <Button
          variant="light"
          className={`w-full justify-start font-semibold ${
            theme === "light" ? "text-teal-500 bg-gray-100" : ""
          }`}
          startContent={<Light height={24} />}
          onClick={() => handleClick("light")}
          aria-label="Tema claro"
        >
          Claro
        </Button>

        <Button
          variant="light"
          className={`w-full justify-start font-semibold ${
            theme === "dark" ? "text-teal-300 bg-teal-950" : ""
          }`}
          startContent={<Dark height={24} />}
          onClick={() => handleClick("dark")}
          aria-label="Tema oscuro"
        >
          Oscuro
        </Button>
      </div>
    </div>
  );
};

export default ThemeSelector;
