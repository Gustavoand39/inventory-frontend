export type Theme = "system" | "dark" | "light";

export interface IThemeReturn {
  theme: Theme;
  toggleTheme: (theme: Theme) => void;
}
