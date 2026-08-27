import { CHANNELS, type PlanetPlacement, rgba, SPRITE_FILL } from "./constants";
import { sunAngleFor } from "./layout";
import { washRadial } from "./scene";

const SPRITE_BRIGHTNESS = 0.7;

const cache = new Map<string, CanvasImageSource>();
const pending = new Set<string>();

function shade(
  image: HTMLImageElement,
  placement: PlanetPlacement,
  rim: boolean,
) {
  const canvas = document.createElement("canvas");
  const width = image.naturalWidth;
  const height = image.naturalHeight;
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return image;
  }

  const sunAngle = sunAngleFor(placement);
  const size = { width, height };
  const centre = { x: width / 2, y: height / 2 };
  const radius = (width / 2) * SPRITE_FILL;
  // Both passes share one orientation so the alpha mask still lines up.
  const drawBody = () => {
    ctx.save();
    ctx.translate(centre.x, centre.y);
    ctx.rotate(((placement.spin ?? 0) * Math.PI) / 180);
    ctx.drawImage(image, -centre.x, -centre.y);
    ctx.restore();
  };

  ctx.filter = `brightness(${SPRITE_BRIGHTNESS})`;
  drawBody();
  ctx.filter = "none";

  const towardsSun = (reach: number) => ({
    x: centre.x + Math.cos(sunAngle) * radius * reach,
    y: centre.y + Math.sin(sunAngle) * radius * reach,
  });

  ctx.globalCompositeOperation = "source-atop";
  washRadial(ctx, size, towardsSun(-0.6), radius * 1.75, [
    [0, rgba(CHANNELS.night, 0.72)],
    [0.5, rgba(CHANNELS.night, 0.28)],
    [1, rgba(CHANNELS.night, 0)],
  ]);

  ctx.globalCompositeOperation = "lighter";
  washRadial(ctx, size, towardsSun(0.82), radius, [
    [0, rgba(CHANNELS.sun, 0.26)],
    [1, rgba(CHANNELS.sun, 0)],
  ]);

  if (rim) {
    washRadial(ctx, size, centre, radius, [
      [0.72, rgba(CHANNELS.halo, 0)],
      [1, rgba(CHANNELS.halo, 0.34)],
    ]);
  }

  ctx.globalCompositeOperation = "destination-in";
  drawBody();

  return canvas;
}

export function getSprite(planet: string): CanvasImageSource | null {
  return cache.get(planet) ?? null;
}

export function loadSprite(
  planet: string,
  placement: PlanetPlacement,
  rim: boolean,
) {
  if (cache.has(planet) || pending.has(planet)) {
    return;
  }
  pending.add(planet);

  const image = new Image();
  image.decoding = "async";
  image.src = `/planets/${planet.toLowerCase()}.png`;
  image
    .decode()
    .then(() => {
      cache.set(planet, shade(image, placement, rim));
    })
    .catch(() => {})
    .finally(() => {
      pending.delete(planet);
    });
}
