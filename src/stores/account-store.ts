import { create } from "zustand";
import { persist } from "zustand/middleware";
import { fetchProfile } from "@/app/account/actions";
import type { Profile } from "@/lib/types";

interface AccountState {
  accountInformationString: string;
  accountId: string | null;
  profile: Profile | null;
  profileLoading: boolean;
  profileError: boolean;
  setAccountInformationString: (accountInformation: string) => void;
  reset: () => void;
}

const initialState = {
  accountInformationString: "",
  accountId: null as string | null,
  profile: null as Profile | null,
  profileLoading: false,
  profileError: false,
};

function parseAccountId(accountInformationString: string): string | null {
  try {
    const data = JSON.parse(accountInformationString.replace(/\n/g, ""));
    if (typeof data?.account_id === "string" && data.account_id) {
      return data.account_id;
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
    (set, get) => ({
      ...initialState,

      setAccountInformationString: (accountInformationString: string) => {
        const accountId = parseAccountId(accountInformationString);
        set({
          accountInformationString,
          accountId,
          profile: null,
          profileLoading: accountId !== null,
          profileError: false,
        });

        if (!accountId) {
          return;
        }

        fetchProfile(accountId)
          .then((profile) => {
            if (get().accountId !== accountId) {
              return;
            }
            set({ profile, profileLoading: false, profileError: !profile });
          })
          .catch(() => {
            if (get().accountId !== accountId) {
              return;
            }
            set({ profileLoading: false, profileError: true });
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
