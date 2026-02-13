import { toast } from "sonner";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { env } from "@/lib/env";
import type { RelayInfo } from "@/lib/types";

interface RelayFormState {
  region: string;
  language: string;
  excludeCount: number;
  instances: number;
  displayedInstances: number;
  isFetching: boolean;
  relays: RelayInfo[];
  setRegion: (region: string) => void;
  setLanguage: (language: string) => void;
  setExcludeCount: (count: number) => void;
  setInstances: (instances: number) => void;
  setIsFetching: (fetching: boolean) => void;
  submitForm: () => Promise<void>;
  setRelays: (relays: RelayInfo[]) => void;
}

const initialState = {
  region: "EU",
  language: "EN",
  excludeCount: 40,
  instances: 2,
  displayedInstances: 2,
  isFetching: false,
  relays: [],
};

export const useRelayFormStore = create<RelayFormState>()(
  persist(
    (set, get) => ({
      ...initialState,

      setRegion: (region: string) => set({ region }),

      setLanguage: (language: string) => set({ language }),

      setExcludeCount: (excludeCount: number) => set({ excludeCount }),

      setInstances: (instances: number) => set({ instances }),

      setIsFetching: (isFetching: boolean) => set({ isFetching }),

      setRelays: (relays: RelayInfo[]) => set({ relays }),

      submitForm: async () => {
        const { region, language, excludeCount, instances } = get();

        set({ isFetching: true });

        try {
          const mappedRegion = region === "OC" ? "AS" : region;

          const response = await fetch(
            `${env.API_BASE_URL}/v1/relays?region=${mappedRegion}&language=${language}&excludeCount=${excludeCount}&instances=${instances}`,
          );

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          set({ relays: data.relays, displayedInstances: instances });
        } catch (error) {
          console.error("Form submission error:", error);
          toast.error("Failed to fetch relays", {
            description:
              error instanceof Error ? error.message : "Please try again later",
          });
          set({ relays: [] });
        } finally {
          set({ isFetching: false });
        }
      },
    }),
    {
      name: "relay-form-storage",
      partialize: (state) => ({
        region: state.region,
        language: state.language,
        excludeCount: state.excludeCount,
        instances: state.instances,
      }),
    },
  ),
);
