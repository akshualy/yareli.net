import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LayoutState {
  legacyLayout: boolean;
  setLegacyLayout: (legacyLayout: boolean) => void;
}

export const useLayoutStore = create<LayoutState>()(
  persist(
    (set) => ({
      legacyLayout: false,
      setLegacyLayout: (legacyLayout: boolean) => set({ legacyLayout }),
    }),
    {
      name: "layout-storage",
    },
  ),
);
