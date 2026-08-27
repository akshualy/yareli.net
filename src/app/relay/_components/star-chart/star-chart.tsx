"use client";

import { ChevronLeft, Diamond } from "lucide-react";
import type { ReactNode, Ref } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { RelayInfo, RelayInstance } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
  NODE_SPOTS,
  PLANET_ZOOM,
  PLANETS,
  type PlanetPlacement,
  SCENERY_BODIES,
} from "./constants";
import {
  focusCamera,
  type NodePoint,
  nodePoints,
  type Point,
  planetCentre,
  planetRadius,
  project,
  type Size,
  sunCentre,
  systemOpacity,
} from "./layout";
import {
  bakeStarfield,
  drawBackdrop,
  drawConnectors,
  drawPlanet,
} from "./scene";
import { getSprite, loadSprite } from "./sprites";

const ZOOMED_IN = 1.6;
const SETTLED = PLANET_ZOOM * 0.9;
const CAMERA_EASE = 0.075;
const HOVER_EASE = 0.16;
const SCENERY_DIM = 0.62;
const NAME_LINE_HEIGHT = 18;

type RankedInstance = RelayInstance & { unopened: boolean };

type InstanceState = "empty" | "full" | "open";

type PlanetView = {
  relay: RelayInfo;
  placement: PlanetPlacement;
  ranked: RankedInstance[];
  preview: RankedInstance[];
  face: RankedInstance[];
  rest: RankedInstance[];
};

type Props = {
  relays: RelayInfo[];
  previewCount: number;
  onSelectInstanceAction: (
    region: string,
    relayName: string,
    instanceId: number,
  ) => void;
};

function rank(relay: RelayInfo): RankedInstance[] {
  const open = [...relay.relay_instances.instances]
    .sort((a, b) => a.instance_players - b.instance_players)
    .map((instance) => ({ ...instance, unopened: false }));
  const empty = relay.relay_instances.first_empty_instance;
  return empty ? [...open, { ...empty, unopened: true }] : open;
}

function instanceState(
  instance: RankedInstance,
  maxPlayers: number,
): InstanceState {
  if (instance.unopened) return "empty";
  return instance.instance_players >= maxPlayers ? "full" : "open";
}

function occupancy(
  { unopened, instance_players }: RankedInstance,
  maxPlayers: number,
  empty = "new",
) {
  return unopened ? empty : `${instance_players} / ${maxPlayers}`;
}

function bindRef<K, T extends HTMLElement>(refs: Map<K, T>, key: K) {
  return (element: T | null) => {
    if (element) {
      refs.set(key, element);
    } else {
      refs.delete(key);
    }
  };
}

function setHidden(element: HTMLElement, hidden: boolean) {
  element.style.opacity = hidden ? "0" : "1";
  element.style.visibility = hidden ? "hidden" : "visible";
}

function InstanceButton({
  state,
  diamond,
  className,
  ref,
  onClick,
  children,
}: {
  state: InstanceState;
  diamond: string;
  className?: string;
  ref?: Ref<HTMLButtonElement>;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      ref={ref}
      onClick={onClick}
      className={cn(
        "pointer-events-auto cursor-pointer text-left hover:text-white",
        state === "open" && "text-primary",
        state === "empty" && "text-foreground/55",
        className,
      )}
    >
      <Diamond
        className={cn(
          "data-[state=full]:fill-accent data-[state=open]:fill-primary",
          diamond,
        )}
        data-state={state}
      />
      {children}
    </button>
  );
}

export default function StarChart({
  relays,
  previewCount,
  onSelectInstanceAction: onSelectInstance,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const readoutRefs = useRef(new Map<string, HTMLDivElement>());
  const hitRefs = useRef(new Map<string, HTMLButtonElement>());
  const nodeRefs = useRef(new Map<number, HTMLButtonElement>());
  const headerRef = useRef<HTMLDivElement>(null);

  const [focused, setFocused] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  const views = useMemo<PlanetView[]>(() => {
    const previewSize = Math.max(1, previewCount);
    return relays.flatMap((relay) => {
      const placement = PLANETS[relay.planet];
      if (!placement) {
        return [];
      }
      const ranked = rank(relay);
      return {
        relay,
        placement,
        ranked,
        preview: ranked.slice(0, previewSize),
        face: ranked.slice(0, NODE_SPOTS.length),
        rest: ranked.slice(NODE_SPOTS.length),
      };
    });
  }, [relays, previewCount]);

  const focusedView = views.find((view) => view.relay.planet === focused);

  const live = useRef({ views, focusedView, hovered });
  useEffect(() => {
    live.current = { views, focusedView, hovered };
  });

  useEffect(() => {
    for (const [name, placement] of SCENERY_BODIES) {
      loadSprite(name, placement, false);
    }
    for (const view of views) {
      loadSprite(view.relay.planet, view.placement, true);
    }
  }, [views]);

  useEffect(() => {
    if (focused && !focusedView) {
      setFocused(null);
    }
  }, [focused, focusedView]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!container || !canvas || !ctx) {
      return;
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let size: Size = { width: 0, height: 0 };
    let starfield: HTMLCanvasElement | null = null;
    let anchor: Point | null = null;
    let scale = 1;
    let frame = 0;
    const hover = new Map<string, number>();

    const resize = () => {
      const { clientWidth: width, clientHeight: height } = container;
      if (width === 0 || height === 0) {
        return;
      }
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      size = { width, height };
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      starfield = bakeStarfield(size);
    };

    const render = () => {
      frame = requestAnimationFrame(render);
      if (size.width === 0 || size.height === 0) {
        return;
      }

      const { views: charted, focusedView: active } = live.current;
      if (active) {
        anchor = planetCentre(active.placement, size);
      }
      scale +=
        ((active ? PLANET_ZOOM : 1) - scale) *
        (reduced.matches ? 1 : CAMERA_EASE);

      const camera = focusCamera(anchor ?? sunCentre(size), size, scale);
      const fade = systemOpacity(scale);
      const zoomedIn = scale > ZOOMED_IN;

      const target = zoomedIn ? null : live.current.hovered;
      if (target) {
        hover.set(target, hover.get(target) ?? 0);
      }
      for (const [name, current] of hover) {
        const want = name === target ? 1 : 0;
        const eased = current + (want - current) * HOVER_EASE;
        if (want === 0 && eased < 0.002) {
          hover.delete(name);
        } else {
          hover.set(name, eased);
        }
      }

      drawBackdrop(ctx, size, starfield, camera);

      for (const [name, placement] of SCENERY_BODIES) {
        const screen = project(planetCentre(placement, size), camera, size);
        drawPlanet(
          ctx,
          size,
          screen,
          planetRadius(placement, size, scale),
          getSprite(name),
          {
            dim: SCENERY_DIM * (active ? 0.4 + 0.6 * fade : 1),
            hover: 0,
            halo: false,
          },
        );
      }

      const header = headerRef.current;
      if (header) {
        setHidden(header, !active || scale < SETTLED);
      }

      let activePoints: NodePoint[] | null = null;

      for (const view of charted) {
        const screen = project(
          planetCentre(view.placement, size),
          camera,
          size,
        );
        const radius = planetRadius(view.placement, size, scale);
        drawPlanet(ctx, size, screen, radius, getSprite(view.relay.planet), {
          dim: active && view !== active ? 0.25 + 0.75 * fade : 1,
          hover: hover.get(view.relay.planet) ?? 0,
          halo: true,
        });

        if (view === active && zoomedIn) {
          activePoints = nodePoints(screen, radius, view.face);
        }

        const readout = readoutRefs.current.get(view.relay.planet);
        if (readout) {
          const gutter = Math.max(34, radius * 2 + 16);
          readout.style.setProperty("--gutter", `${gutter}px`);
          readout.style.left = `${screen.x - radius - 8}px`;
          readout.style.top = `${screen.y - radius - NAME_LINE_HEIGHT - 6}px`;
          setHidden(readout, zoomedIn);
        }

        const hit = hitRefs.current.get(view.relay.planet);
        if (hit) {
          hit.style.left = `${screen.x}px`;
          hit.style.top = `${screen.y}px`;
          hit.style.width = `${radius * 2 + 24}px`;
          hit.style.height = `${radius * 2 + 24}px`;
          setHidden(hit, zoomedIn);
        }
      }

      if (activePoints) {
        drawConnectors(ctx, activePoints);
      }

      active?.face.forEach((instance, index) => {
        const node = nodeRefs.current.get(instance.instance_id);
        if (!node) {
          return;
        }
        const point = activePoints?.[index];
        setHidden(node, !point);
        if (point) {
          node.style.left = `${point.x}px`;
          node.style.top = `${point.y}px`;
        }
      });
    };

    const observer = new ResizeObserver(resize);
    observer.observe(container);
    resize();
    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  const selectInstance = useCallback(
    (view: PlanetView, instance: RelayInstance) => {
      onSelectInstance(
        view.relay.region,
        view.relay.relay_name,
        instance.instance_id,
      );
    },
    [onSelectInstance],
  );

  return (
    <div
      ref={containerRef}
      className="relative aspect-[16/9] max-h-[760px] min-h-[420px] w-full overflow-hidden rounded-xl bg-background text-foreground [color-scheme:dark] [text-shadow:0_1px_6px_#000]"
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        tabIndex={-1}
        className="absolute inset-0 size-full"
      />

      <div className="pointer-events-none absolute inset-0">
        {views.map((view) => (
          <div
            key={`readout-${view.relay.planet}`}
            ref={bindRef(readoutRefs.current, view.relay.planet)}
            className="group absolute grid grid-cols-[var(--gutter)_max-content] items-start transition-opacity"
            data-hovered={hovered === view.relay.planet}
          >
            <span className="col-start-1 row-start-1 w-max justify-self-center text-foreground tracking-widest uppercase transition-colors duration-200 group-data-[hovered=true]:text-primary">
              {view.relay.planet}
            </span>
            <div className="col-start-2 row-start-2 flex flex-col gap-px">
              {view.preview.map((instance) => (
                <InstanceButton
                  key={instance.instance_id}
                  state={instanceState(instance, view.relay.max_players)}
                  diamond="size-3.5"
                  className="grid grid-cols-[13px_auto_auto] items-center gap-1.5 py-0.5"
                  onClick={() => selectInstance(view, instance)}
                >
                  <span className="text-xs">
                    {view.relay.relay_name.split(" ")[0]} {instance.instance_id}
                  </span>
                  <span className="text-[0.7rem] font-light text-muted-foreground tabular-nums">
                    {occupancy(instance, view.relay.max_players)}
                  </span>
                </InstanceButton>
              ))}
              {view.ranked.length > view.preview.length && (
                <button
                  type="button"
                  className="pointer-events-auto cursor-pointer text-left text-xs text-accent hover:text-primary"
                  onClick={() => setFocused(view.relay.planet)}
                >
                  {`+${view.ranked.length - view.preview.length} more`}
                </button>
              )}
            </div>
          </div>
        ))}

        {views.map((view) => (
          <button
            key={`hit-${view.relay.planet}`}
            type="button"
            ref={bindRef(hitRefs.current, view.relay.planet)}
            className="pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full outline-none"
            aria-label={`${view.relay.planet} — ${view.relay.relay_name}, ${view.ranked.length} instances`}
            onClick={() => setFocused(view.relay.planet)}
            onPointerEnter={() => setHovered(view.relay.planet)}
            onPointerLeave={() =>
              setHovered((name) => (name === view.relay.planet ? null : name))
            }
            onFocus={() => setHovered(view.relay.planet)}
            onBlur={() =>
              setHovered((name) => (name === view.relay.planet ? null : name))
            }
          />
        ))}

        {focusedView?.face.map((instance) => (
          <InstanceButton
            key={`node-${instance.instance_id}`}
            ref={bindRef(nodeRefs.current, instance.instance_id)}
            state={instanceState(instance, focusedView.relay.max_players)}
            diamond="size-5"
            className="invisible absolute flex -translate-x-[9px] -translate-y-1/2 items-center gap-2 whitespace-nowrap opacity-0 transition-opacity"
            onClick={() => selectInstance(focusedView, instance)}
          >
            <span className="flex flex-col">
              <span className="text-sm tracking-wide text-shadow-2xs">
                {focusedView.relay.relay_name} {instance.instance_id}
              </span>
              <span className="text-xs font-light text-muted-foreground tabular-nums text-shadow-xs text-shadow-secondary">
                {occupancy(
                  instance,
                  focusedView.relay.max_players,
                  "May not exist yet",
                )}
              </span>
            </span>
          </InstanceButton>
        ))}

        <div
          ref={headerRef}
          className="invisible absolute top-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 opacity-0 transition-opacity"
        >
          <p className="text-3xl font-bold tracking-wider text-accent uppercase">
            {focusedView?.relay.planet}
          </p>
          <button
            type="button"
            className="pointer-events-auto flex cursor-pointer items-center gap-1 rounded-md hover:text-primary"
            onClick={() => setFocused(null)}
          >
            <ChevronLeft className="size-4" />
            Origin System
          </button>
        </div>

        {!!focusedView?.rest.length && (
          <div className="pointer-events-auto absolute top-1/2 right-4 flex max-h-[80%] -translate-y-1/2 flex-col gap-0.5 overflow-y-auto">
            {focusedView.rest.map((instance) => (
              <InstanceButton
                key={`rest-${instance.instance_id}`}
                state={instanceState(instance, focusedView.relay.max_players)}
                diamond="size-4 shrink-0"
                className="flex items-center gap-2 whitespace-nowrap"
                onClick={() => selectInstance(focusedView, instance)}
              >
                <span className="text-sm tracking-wide text-shadow-2xs">
                  {focusedView.relay.relay_name} {instance.instance_id}
                </span>
                <span className="ml-auto text-xs font-light text-muted-foreground tabular-nums text-shadow-xs text-shadow-secondary">
                  {occupancy(instance, focusedView.relay.max_players)}
                </span>
              </InstanceButton>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
