import { CHANNELS, rgba, SPRITE_FILL } from "./constants";
import {
  type Camera,
  type NodePoint,
  type Point,
  project,
  type Size,
  sunCentre,
  systemOpacity,
} from "./layout";

const TAU = Math.PI * 2;
const STAR_COUNT = 620;

const RING_SQUASH = 0.5;
const SPOKES = 12;
const RINGS = [0.2, 0.3, 0.4, 0.5, 0.6];

const HOVER_RINGS = [2, 3.2];
const HOVER_SWELL = 0.06;
const HOVER_BRIGHTEN = 0.55;

const SKY = {
  void: "#04080c",
  fade: "rgba(4, 8, 12, 0)",
  nebula: "rgba(15, 83, 108, 0.7)",
  nebulaMid: "rgba(9, 50, 66, 0.4)",
  pocket: "rgba(58, 86, 97, 0.32)",
  dustInner: "rgba(98, 84, 59, 0.34)",
  dustOuter: "rgba(46, 57, 53, 0.26)",
  connector: "rgba(232, 238, 240, 0.42)",
  connectorFaint: "rgba(232, 238, 240, 0.28)",
  sunCore: "rgba(255, 232, 197, 0.8)",
  sunMid: "rgba(221, 172, 116, 0.42)",
  sunEdge: "rgba(221, 172, 116, 0)",
} as const;

export function radialFill(
  ctx: CanvasRenderingContext2D,
  centre: Point,
  radius: number,
  stops: [number, string][],
  innerRadius = 0,
) {
  const gradient = ctx.createRadialGradient(
    centre.x,
    centre.y,
    innerRadius,
    centre.x,
    centre.y,
    radius,
  );
  for (const [offset, colour] of stops) {
    gradient.addColorStop(offset, colour);
  }
  return gradient;
}

export function washRadial(
  ctx: CanvasRenderingContext2D,
  { width, height }: Size,
  centre: Point,
  radius: number,
  stops: [number, string][],
) {
  ctx.fillStyle = radialFill(ctx, centre, radius, stops);
  ctx.fillRect(0, 0, width, height);
}

export function bakeStarfield({ width, height }: Size): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return canvas;
  }

  let seed = 20250826;
  const random = () => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed / 0x7fffffff;
  };

  for (let i = 0; i < STAR_COUNT; i++) {
    const x = random() * width;
    const y = random() * height;
    const magnitude = random();
    ctx.globalAlpha = 0.1 + random() * 0.55;
    ctx.fillStyle = magnitude > 0.96 ? "#cfe9f2" : "#e9eef0";
    ctx.beginPath();
    ctx.arc(x, y, magnitude > 0.985 ? 1.5 : magnitude > 0.9 ? 1 : 0.7, 0, TAU);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
  return canvas;
}

export function drawBackdrop(
  ctx: CanvasRenderingContext2D,
  size: Size,
  starfield: HTMLCanvasElement | null,
  camera: Camera,
) {
  const { width, height } = size;
  const reach = Math.max(width, height);
  const sun = project(sunCentre(size), camera, size);
  const squashed = (draw: () => void) => {
    ctx.save();
    ctx.translate(sun.x, sun.y);
    ctx.scale(1, RING_SQUASH);
    ctx.translate(-sun.x, -sun.y);
    draw();
    ctx.restore();
  };

  ctx.fillStyle = SKY.void;
  ctx.fillRect(0, 0, width, height);
  washRadial(ctx, size, { x: width * 0.86, y: height * 0.16 }, reach * 0.75, [
    [0, SKY.nebula],
    [0.45, SKY.nebulaMid],
    [1, SKY.fade],
  ]);
  washRadial(ctx, size, { x: width * 0.08, y: height * 0.92 }, reach * 0.6, [
    [0, SKY.pocket],
    [1, SKY.fade],
  ]);

  if (starfield) {
    ctx.globalAlpha = 0.9;
    ctx.drawImage(starfield, 0, 0);
    ctx.globalAlpha = 1;
  }

  const dust = Math.min(560 * camera.scale, reach * 1.3);
  squashed(() => {
    ctx.fillStyle = radialFill(ctx, sun, dust, [
      [0, SKY.dustInner],
      [0.5, SKY.dustOuter],
      [1, SKY.fade],
    ]);
    ctx.fillRect(sun.x - dust, sun.y - dust, dust * 2, dust * 2);
  });

  const fade = systemOpacity(camera.scale);
  if (fade > 0.01) {
    ctx.save();
    ctx.strokeStyle = rgba(CHANNELS.orbit, 0.1 * fade);
    ctx.lineWidth = 0.6 / RING_SQUASH;
    squashed(() => {
      RINGS.forEach((fraction, index) => {
        ctx.beginPath();
        ctx.setLineDash(index % 2 ? [4, 7] : []);
        ctx.arc(sun.x, sun.y, fraction * width * camera.scale, 0, TAU);
        ctx.stroke();
      });
    });

    const spoke = Math.min(560 * camera.scale, reach * 1.6);
    ctx.strokeStyle = rgba(CHANNELS.orbit, 0.045 * fade);
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let i = 0; i < SPOKES; i++) {
      const angle = (i / SPOKES) * TAU;
      ctx.moveTo(sun.x, sun.y);
      ctx.lineTo(
        sun.x + Math.cos(angle) * spoke,
        sun.y + Math.sin(angle) * spoke * RING_SQUASH,
      );
    }
    ctx.stroke();
    ctx.restore();
  }

  const core = 58 * camera.scale;
  ctx.save();
  ctx.globalCompositeOperation = "lighter";
  ctx.fillStyle = radialFill(ctx, sun, core, [
    [0, SKY.sunCore],
    [0.16, SKY.sunMid],
    [1, SKY.sunEdge],
  ]);
  ctx.beginPath();
  ctx.arc(sun.x, sun.y, core, 0, TAU);
  ctx.fill();
  ctx.restore();
}

export function drawPlanet(
  ctx: CanvasRenderingContext2D,
  size: Size,
  screen: Point,
  radius: number,
  sprite: CanvasImageSource | null,
  { dim, hover, halo }: { dim: number; hover: number; halo: boolean },
) {
  const body = radius * (1 + HOVER_SWELL * hover);
  const haloRadius = body * 2.6;
  if (
    screen.x + haloRadius < 0 ||
    screen.x - haloRadius > size.width ||
    screen.y + haloRadius < 0 ||
    screen.y - haloRadius > size.height
  ) {
    return;
  }

  if (halo) {
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    ctx.fillStyle = radialFill(
      ctx,
      screen,
      haloRadius,
      [
        [0, rgba(CHANNELS.halo, 0.16 * dim)],
        [1, rgba(CHANNELS.halo, 0)],
      ],
      body * 0.8,
    );
    ctx.beginPath();
    ctx.arc(screen.x, screen.y, haloRadius, 0, TAU);
    ctx.fill();
    ctx.restore();
  }

  if (hover > 0.01) {
    ctx.save();
    ctx.lineWidth = 1.25;
    ctx.strokeStyle = rgba(CHANNELS.pulse, hover * 0.8);
    for (const ring of HOVER_RINGS) {
      const reach = body * (1 + (ring - 1) * hover);
      if (reach > body + 0.5) {
        ctx.beginPath();
        ctx.arc(screen.x, screen.y, reach, 0, TAU);
        ctx.stroke();
      }
    }
    ctx.restore();
  }

  if (sprite) {
    const box = (body * 2) / SPRITE_FILL;
    const brightness = dim * (1 + HOVER_BRIGHTEN * hover);
    ctx.save();
    if (brightness !== 1) {
      ctx.filter = `brightness(${brightness})`;
    }
    ctx.drawImage(sprite, screen.x - box / 2, screen.y - box / 2, box, box);
    ctx.restore();
  }
}

export function drawConnectors(
  ctx: CanvasRenderingContext2D,
  points: NodePoint[],
) {
  ctx.save();
  ctx.lineWidth = 1;
  for (let i = 0; i < points.length - 1; i++) {
    const from = points[i];
    const to = points[i + 1];
    const faint = from.unopened || to.unopened;
    ctx.beginPath();
    ctx.setLineDash(faint ? [3, 5] : []);
    ctx.strokeStyle = faint ? SKY.connectorFaint : SKY.connector;
    ctx.moveTo(from.x, from.y);
    ctx.quadraticCurveTo(
      (from.x + to.x) / 2,
      (from.y + to.y) / 2 - 16,
      to.x,
      to.y,
    );
    ctx.stroke();
  }
  ctx.restore();
}
