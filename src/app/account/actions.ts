"use server";

import type { Profile } from "@/lib/types";

type ProfileViewingData = {
  Results?: {
    AccountId?: { $oid?: string };
    DisplayName?: string;
    PlatformNames?: string[];
    PlayerLevel?: number;
    Created?: { $date?: { $numberLong?: string } };
  }[];
};

export async function fetchProfile(accountId: string): Promise<Profile | null> {
  if (!/^[0-9a-f]{24}$/i.test(accountId)) {
    return null;
  }

  try {
    const response = await fetch(
      `https://api.warframe.com/cdn/getProfileViewingData.php?playerId=${accountId}`,
    );
    if (!response.ok) {
      return null;
    }

    const text = (await response.text()).replace(/[\r\n]/g, "");
    const data: ProfileViewingData = JSON.parse(text);
    const result = data.Results?.[0];
    if (!result?.AccountId?.$oid) {
      return null;
    }

    const createdMs = result.Created?.$date?.$numberLong;
    return {
      accountId: result.AccountId.$oid,
      displayName: result.DisplayName ?? "",
      platformNames: result.PlatformNames ?? [],
      masteryRank: result.PlayerLevel ?? 0,
      createdAt: createdMs ? Number(createdMs) : null,
    };
  } catch (error) {
    console.warn(
      "Error fetching profile:",
      error instanceof Error ? error.message : "Unknown error",
    );
    return null;
  }
}
