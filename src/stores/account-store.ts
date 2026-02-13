import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AccountInformation } from "@/lib/types";

interface AccountState {
  accountInformationString: string;
  accountInformation: AccountInformation | null;
  setAccountInformationString: (accountInformation: string) => void;
  reset: () => void;
}

const initialState = {
  accountInformationString: "",
  accountInformation: null as AccountInformation | null,
};

function parseAccountInformation(
  accountInformationString: string,
): AccountInformation | null {
  try {
    const data = JSON.parse(accountInformationString.replace(/\n/g, ""));
    if (data?.account) {
      return data;
    }
  } catch (error) {
    console.warn(
      "Error parsing account information:",
      error instanceof Error ? error.message : "Unknown error",
    );
  }
  return null;
}

export const useAccountStore = create<AccountState>()(
  persist(
    (set) => ({
      ...initialState,

      setAccountInformationString: (accountInformationString: string) => {
        const accountInformation = parseAccountInformation(
          accountInformationString,
        );
        set({ accountInformationString, accountInformation });
      },

      reset: () => set(initialState),
    }),
    {
      name: "account-storage",
      partialize: (state) => ({
        accountInformationString: state.accountInformationString,
      }),
      onRehydrateStorage: () => (state) => {
        if (state?.accountInformationString) {
          state.accountInformation = parseAccountInformation(
            state.accountInformationString,
          );
        }
      },
    },
  ),
);
