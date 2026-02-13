export type RelayInstance = {
  instance_id: number;
  instance_players: number;
};

export type RelayInfo = {
  planet: string;
  relay_name: string;
  region: string;
  language: string;
  max_players: number;
  relay_instances: SortedRelays;
};

export type SortedRelays = {
  first_empty_instance: RelayInstance | null;
  instances: RelayInstance[];
};

export type Coupon = {
  active: boolean;
  discount: number;
  multiplier: number;
};

export type Account = {
  userId: string;
  game_platform: string;
  masteryRank: number;
  platinum: number;
  crossSave: boolean;
  coupon: Coupon;
  country: string;
  twitchLinked: boolean;
  amazonLinked: boolean;
};

export type AccountInformation = {
  country_code: string;
  site_language: string;
  user_id: string;
  display_name: string;
  account: Account;
  avatar: string;
  transactions?: number[];
  notification: string;
  ratings_board: string;
  currency_experiment: boolean;
};
