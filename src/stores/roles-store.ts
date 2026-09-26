import { create } from "zustand";
import { persist } from "zustand/middleware";

interface RolesState {
  affinity: string;
  credits: string;
  resource: string;
  damage: string;
  health: string;
  shields: string;
  narin: string;
  messagePrefix: string;
  playerFormat: string;
  messageDivider: string;
  messageSuffix: string;
  setAffinity: (affinity: string) => void;
  setCredits: (credits: string) => void;
  setResource: (resource: string) => void;
  setDamage: (damage: string) => void;
  setHealth: (health: string) => void;
  setShields: (shields: string) => void;
  setNarin: (narin: string) => void;
  setMessagePrefix: (messagePrefix: string) => void;
  setPlayerFormat: (playerFormat: string) => void;
  setMessageDivider: (messageDivider: string) => void;
  setMessageSuffix: (messageSuffix: string) => void;
  resetRoles: () => void;
}

const initialState = {
  affinity: "",
  credits: "",
  resource: "",
  damage: "",
  health: "",
  shields: "",
  narin: "",
  messagePrefix: "ROLES: ",
  playerFormat: "@{{name}} -> {{role}}",
  messageDivider: " | ",
  messageSuffix: "",
};

export const useRolesStore = create<RolesState>()(
  persist(
    (set) => ({
      ...initialState,

      setAffinity: (affinity: string) => set({ affinity }),

      setCredits: (credits: string) => set({ credits }),

      setResource: (resource: string) => set({ resource }),

      setDamage: (damage: string) => set({ damage }),

      setHealth: (health: string) => set({ health }),

      setShields: (shields: string) => set({ shields }),

      setNarin: (narin: string) => set({ narin }),

      setMessagePrefix: (messagePrefix: string) => set({ messagePrefix }),

      setPlayerFormat: (playerFormat: string) => set({ playerFormat }),

      setMessageDivider: (messageDivider: string) => set({ messageDivider }),

      setMessageSuffix: (messageSuffix: string) => set({ messageSuffix }),

      resetRoles: () => set(initialState),
    }),
    {
      name: "roles-storage",
    },
  ),
);
