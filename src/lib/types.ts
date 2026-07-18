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
