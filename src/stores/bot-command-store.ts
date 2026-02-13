import { create } from "zustand";
import { persist } from "zustand/middleware";
import { BLESSING_BUFF_KEYS, type BlessingBuffKey } from "@/lib/constants";
import type { RelayInfo } from "@/lib/types";

type BlessingBuffState = Record<BlessingBuffKey, boolean>;

const initialBuffState = Object.fromEntries(
  BLESSING_BUFF_KEYS.map((key) => [key, false]),
) as BlessingBuffState;

interface BotCommandState {
  region: string;
  relay: RelayInfo["relay_name"];
  instance: string;
  minutesUntilBless: number;
  buffs: BlessingBuffState;
  setRegion: (region: string) => void;
  setRelay: (relay: RelayInfo["relay_name"]) => void;
  setInstance: (instance: string) => void;
  setMinutesUntilBless: (minutes: number) => void;
  toggleBuff: (key: BlessingBuffKey) => void;
  toggleAllBuffs: () => void;
}

const initialState = {
  region: "EU",
  relay: "Strata" as RelayInfo["relay_name"],
  instance: "1",
  minutesUntilBless: 5,
  buffs: initialBuffState,
};

export const useBotCommandStore = create<BotCommandState>()(
  persist(
    (set, get) => ({
      ...initialState,

      setRegion: (region: string) => set({ region }),

      setRelay: (relay: RelayInfo["relay_name"]) => set({ relay }),

      setInstance: (instance: string) => set({ instance }),

      setMinutesUntilBless: (minutesUntilBless: number) =>
        set({ minutesUntilBless }),

      toggleBuff: (key: BlessingBuffKey) =>
        set((state) => ({
          buffs: { ...state.buffs, [key]: !state.buffs[key] },
        })),

      toggleAllBuffs: () => {
        const { buffs } = get();
        const allChecked = BLESSING_BUFF_KEYS.every((key) => buffs[key]);
        const newValue = !allChecked;
        set({
          buffs: Object.fromEntries(
            BLESSING_BUFF_KEYS.map((key) => [key, newValue]),
          ) as BlessingBuffState,
        });
      },
    }),
    {
      name: "bot-command-storage",
    },
  ),
);
