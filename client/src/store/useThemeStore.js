import { create } from "zustand";

const savedTheme = localStorage.getItem("streamify-theme") || "coffee";

document.documentElement.setAttribute("data-theme", savedTheme);

export const useThemeStore = create((set) => ({
  theme: savedTheme,

  setTheme: (theme) => {
    document.documentElement.setAttribute("data-theme", theme);

    localStorage.setItem("streamify-theme", theme);

    set({ theme });
  },
}));