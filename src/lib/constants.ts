export const REGIONS = {
  EU: "Europe",
  NA: "North America",
  SA: "South America",
  AS: "Asia",
  RU: "Russia & Europe",
  OC: "Oceania",
} as const;

export const LANGUAGES = {
  EN: "English",
  DE: "German",
  ES: "Spanish",
  FR: "French",
  IT: "Italian",
  JA: "Japanese",
  KO: "Korean",
  PL: "Polish",
  PT: "Portuguese",
  RU: "Russian",
  TH: "Thai",
  TR: "Turkish",
  UK: "Ukrainian",
  ZH: "Simplified Chinese",
  TC: "Traditional Chinese",
} as const;

export const RELAYS = {
  Earth: "Strata",
  Mercury: "Larunda",
  Pluto: "Orcus",
  Saturn: "Kronia",
  Mars: "Maroo's Bazaar",
} as const;

export const BLESSING_BUFFS = {
  affinity: { label: "Affinity", command: "aff" },
  credits: { label: "Credits", command: "cred" },
  resource: { label: "Resource", command: "res" },
  damage: { label: "Damage", command: "dmg" },
  health: { label: "Health", command: "health" },
  shields: { label: "Shields", command: "shields" },
} as const;

export const BLESSING_BUFF_KEYS = Object.keys(
  BLESSING_BUFFS,
) as BlessingBuffKey[];

export type BlessingBuffKey = keyof typeof BLESSING_BUFFS;
