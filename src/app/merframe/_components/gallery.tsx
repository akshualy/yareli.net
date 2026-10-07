"use client";

import {
  BarChart3,
  Boxes,
  Globe,
  GraduationCap,
  Hammer,
  type LucideIcon,
  Monitor,
  Package,
  ShoppingCart,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface Feature {
  title: string;
  image: string;
  text: string;
  icon: LucideIcon;
  width: number;
  height: number;
  wide?: boolean;
}

function Screenshot({
  feature,
  onOpen,
}: {
  feature: Feature;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Show ${feature.title} at full size`}
      style={{ aspectRatio: `${feature.width} / ${feature.height}` }}
      className="relative mt-auto ml-6 flex-1 cursor-zoom-in overflow-hidden rounded-tl-lg border-t border-l"
    >
      <Image
        src={`/merframe/tiles/${feature.image}`}
        alt={`${feature.title} in Merframe`}
        fill
        unoptimized
        className="object-cover object-left-top"
      />
    </button>
  );
}

const FEATURES: Feature[] = [
  {
    title: "Relic Planner",
    image: "relics_open.png",
    width: 1136,
    height: 426,
    icon: Package,
    wide: true,
    text: "Your relics ranked by expected Platinum and Ducats per refinement. Displays missing parts and each reward's drop chance in a squad.",
  },
  {
    title: "World",
    image: "world.png",
    width: 756,
    height: 567,
    icon: Globe,
    text: "Cycles for Earth, Cetus, Cambion Drift, Orb Vallis, Duviri and Zariman. Current Void Fissures grouped by relic tier.",
  },
  {
    title: "Inventory",
    image: "inventory.png",
    width: 645,
    height: 484,
    icon: Boxes,
    text: "All tradeable items of your inventory. Current sell and buy prices from warframe.market.",
  },
  {
    title: "Riven Explorer",
    image: "rivens_open.png",
    width: 1094,
    height: 412,
    icon: Sparkles,
    wide: true,
    text: "Graded riven stats against their roll range. Recommended positives and negatives from the community. Matching listings from warframe.market.",
  },
  {
    title: "Foundry",
    image: "foundry_item.png",
    width: 670,
    height: 507,
    icon: Hammer,
    text: "What is building right now, craftable items with their parts, where parts drop, how many you hold, and what the build costs.",
  },
  {
    title: "Mastery",
    image: "mastery_routes.png",
    width: 756,
    height: 582,
    icon: GraduationCap,
    text: "Mastery rank progress split into game content, star chart, and intrinsics. Displays the fastest ways to rank up next from things you can do, own, or buy.",
  },
  {
    title: "Resources",
    image: "resources.png",
    width: 756,
    height: 582,
    icon: Target,
    text: "All your resources against what your filtered builds need, with missing resources and credits the builds cost.",
  },
  {
    title: "Trading Analytics",
    image: "analytics.png",
    width: 1118,
    height: 420,
    icon: TrendingUp,
    wide: true,
    text: "What changed hands on warframe.market in the last days, by item and category, next to the revenue and profit of your own trades.",
  },
  {
    title: "Stats",
    image: "stats.png",
    width: 563,
    height: 433,
    icon: BarChart3,
    text: "Platinum, Ducats, Endo, Credits, Aya over time, Relics opened per day, Trades, Latest inventory changes and a Log of every relic you opened.",
  },
  {
    title: "warframe.market",
    image: "market.png",
    width: 756,
    height: 582,
    icon: ShoppingCart,
    text: "Your orders and auctions with their price against the current lowest, the trades left today and convenience interaction buttons.",
  },
  {
    title: "Overlays",
    image: "overlays_ducatering.png",
    width: 1118,
    height: 421,
    icon: Monitor,
    wide: true,
    text: "In-game overlays for relic rewards, relic recommendations, riven grading, and Ducatering at the Ducat Kiosk.",
  },
];

export default function Gallery() {
  const [open, setOpen] = useState<Feature | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((feature) => (
          <Card
            key={feature.title}
            className={cn(
              "gap-5 overflow-hidden border py-0",
              feature.wide && "lg:col-span-2",
            )}
          >
            <div className="flex flex-col gap-1 px-6 pt-6">
              <h3 className="text-primary flex items-center gap-2 text-lg font-bold">
                <feature.icon className="size-5" />
                {feature.title}
              </h3>
              <p className="text-muted-foreground">{feature.text}</p>
            </div>
            <Screenshot feature={feature} onOpen={() => setOpen(feature)} />
          </Card>
        ))}
      </div>
      <Dialog open={open !== null} onOpenChange={() => setOpen(null)}>
        <DialogContent className="max-w-[calc(100%-2rem)] p-2 sm:max-w-6xl">
          {open && (
            <>
              <DialogTitle className="sr-only">{open.title}</DialogTitle>
              <Image
                src={`/merframe/${open.image}`}
                alt={`${open.title} in Merframe`}
                width={1440}
                height={900}
                unoptimized
                className="w-full rounded-md"
              />
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
