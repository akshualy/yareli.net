import { NODE_SPOTS, PLANET_ZOOM, type PlanetPlacement } from "./constants";

const REFERENCE_WIDTH = 1024;

export type Size = { width: number; height: number };

export type Point = { x: number; y: number };

export type Camera = {
  centreX: number;
  centreY: number;
  scale: number;
};

function clamp01(value: number) {
  return Math.max(0, Math.min(1, value));
}

export function sunCentre({ width, height }: Size): Point {
  return { x: width / 2, y: height / 2 };
}

export function planetCentre(
  placement: PlanetPlacement,
  { width, height }: Size,
): Point {
  return { x: placement.x * width, y: placement.y * height };
}

export function sunAngleFor(placement: PlanetPlacement) {
  return Math.atan2((0.5 - placement.y) / (16 / 9), 0.5 - placement.x);
}

export function planetRadius(
  placement: PlanetPlacement,
  { width }: Size,
  scale: number,
) {
  return placement.radius * (width / REFERENCE_WIDTH) * scale;
}

export function project(point: Point, camera: Camera, size: Size): Point {
  return {
    x: (point.x - camera.centreX) * camera.scale + size.width / 2,
    y: (point.y - camera.centreY) * camera.scale + size.height / 2,
  };
}

export function focusCamera(anchor: Point, size: Size, scale: number): Camera {
  const settled = clamp01((scale - 1) / (PLANET_ZOOM - 1));
  const drift = (1 - settled) / scale;
  return {
    centreX: anchor.x - (anchor.x - size.width / 2) * drift,
    centreY: anchor.y - (anchor.y - size.height / 2) * drift,
    scale,
  };
}

export function systemOpacity(scale: number) {
  return clamp01((2.4 - scale) / 1.4);
}

export type NodePoint = Point & { unopened: boolean };

export function nodePoints(
  centre: Point,
  radius: number,
  face: { unopened: boolean }[],
): NodePoint[] {
  return face.map(({ unopened }, index) => ({
    x: centre.x + NODE_SPOTS[index].x * radius,
    y: centre.y + NODE_SPOTS[index].y * radius,
    unopened,
  }));
}
