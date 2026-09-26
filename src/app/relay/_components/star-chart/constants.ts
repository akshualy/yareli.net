export type PlanetPlacement = {
  x: number;
  y: number;
  radius: number;
  /** Clockwise turn of the texture in degrees. Lighting stays screen-relative. */
  spin?: number;
};

export const PLANETS: Record<string, PlanetPlacement> = {
  Mercury: { x: 0.44, y: 0.58, radius: 13 },
  Earth: { x: 0.64, y: 0.5, radius: 17 },
  Mars: { x: 0.62, y: 0.33, radius: 11 },
  Saturn: { x: 0.35, y: 0.82, radius: 19 },
  Pluto: { x: 0.88, y: 0.503, radius: 11 },
  Zariman: { x: 0.12, y: 0.35, radius: 19 },
};

export const SCENERY_BODIES = Object.entries({
  Venus: { x: 0.58, y: 0.67, radius: 15 },
  Phobos: { x: 0.71, y: 0.19, radius: 8 },
  Deimos: { x: 0.57, y: 0.36, radius: 9, spin: -70 },
  Ceres: { x: 0.4, y: 0.3, radius: 9 },
  Jupiter: { x: 0.3, y: 0.5, radius: 25 },
  Europa: { x: 0.2, y: 0.5, radius: 10 },
  Neptune: { x: 0.76, y: 0.8, radius: 15 },
  Uranus: { x: 0.5, y: 0.9, radius: 25 },
  Eris: { x: 0.83, y: 0.33, radius: 10 },
  Sedna: { x: 0.5, y: 0.07, radius: 11 },
} satisfies Record<string, PlanetPlacement>);

export const SPRITE_FILL = 0.93;

export const PLANET_ZOOM = 9;

/** Instance markers, as offsets from the focused planet's centre in radii. */
export const NODE_SPOTS = [
  { x: -0.3, y: -0.8 },
  { x: -0.7, y: -0.2 },
  { x: 0.62, y: -0.62 },
  { x: 0.1, y: 0.82 },
  { x: -0.52, y: 0.3 },
  { x: 0.8, y: 0.2 },
  { x: -0.3, y: -0.28 },
  { x: 0.68, y: 0.55 },
];

export const CHANNELS = {
  orbit: "226, 214, 190",
  halo: "0, 137, 197",
  pulse: "232, 238, 240",
  night: "2, 6, 10",
  sun: "255, 232, 197",
} as const;

export function rgba(channels: string, alpha: number) {
  return `rgba(${channels}, ${alpha})`;
}
