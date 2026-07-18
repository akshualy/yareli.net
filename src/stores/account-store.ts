import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AccountState {
  accountInformationString: string;
  accountId: string | null;
  setAccountInformationString: (accountInformation: string) => void;
  reset: () => void;
}

const initialState = {
  accountInformationString: "",
  accountId: null as string | null,
};

function parseAccountId(accountInformationString: string): string | null {
  try {
    const data = JSON.parse(accountInformationString.replace(/\n/g, ""));
    const id = data?.user_id ?? data?.account_id;
    if (typeof id === "string" && id) {
      return id;
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
        set({
          accountInformationString,
          accountId: parseAccountId(accountInformationString),
        });
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
          state.setAccountInformationString(state.accountInformationString);
        }
      },
    },
  ),
);
