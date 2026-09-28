import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { latestRelease, MERFRAME_REPOSITORY } from "@/lib/merframe";
import Download from "./_components/download";
import Gallery, { type Feature } from "./_components/gallery";

const FEATURES: Feature[] = [
  {
    title: "World",
    image: "world.png",
    text: "Cycles for Earth, Cetus, Cambion Drift, Orb Vallis, Duviri and Zariman. Every current Void Fissure grouped by relic tier.",
  },
  {
    title: "Inventory",
    image: "inventory.png",
    text: "Prime parts, sets, relics, mods and misc items with images, Ducat values. Current sell and buy prices from warframe.market.",
  },
  {
    title: "Relic Planner",
    image: "relics_open.png",
    text: "Your relics ranked by expected Platinum and Ducats per refinement. Displays missing parts and each reward's drop chance in a squad.",
  },
  {
    title: "Riven Explorer",
    image: "rivens_open.png",
    text: "Graded riven stats against its roll range. Recommended positives and negatives from the community, and matching listings on warframe.market.",
  },
  {
    title: "Foundry",
    image: "foundry_item.png",
    text: "What is building right now and every craftable item with its parts, where parts drop, how many you hold, and the build cost.",
  },
  {
    title: "Mastery",
    image: "mastery_routes.png",
    text: "Mastery rank progress split into game content, star chart, and intrinsics. Also displays the fastest ways to rank up next from things you can do, own, or buy.",
  },
  {
    title: "Resources",
    image: "resources.png",
    text: "All your resources against what your filtered builds need, with missing resources and credits the builds cost.",
  },
  {
    title: "Stats",
    image: "stats.png",
    text: "Platinum, Ducats, Endo, Credits, Aya over time, Relics opened per day, Trades, Latest inventory changes and a Log of every relic you opened.",
  },
  {
    title: "warframe.market",
    image: "market.png",
    text: "Your orders and auctions with their price against the current lowest, the trades left today and convenience interaction buttons.",
  },
  {
    title: "Overlays",
    image: "overlays.png",
    text: "In-game overlays for relic rewards, relic recommendations, and riven grading.",
  },
];

export default async function MerframePage() {
  const release = await latestRelease();

  return (
    <div className="mx-auto flex w-full flex-col gap-4 md:max-w-3/4 xl:max-w-3/5">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Merframe</CardTitle>
          <CardDescription className="text-foreground">
            A companion app for Warframe on Linux and Windows.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <Download release={release} />
          <div className="text-muted-foreground flex flex-col gap-3">
            <p>
              Merframe is an open-source companion app that reads out Warframe.
              It displays information about your account next to prices from
              warframe.market. In-game overlays such as relic or riven
              recommendations help you make decisions. Nothing about you leaves
              your PC.
            </p>
            <p>
              Windows warns on install that the app is not known, because the
              installer has no paid certificate. On Linux the AppImage runs
              without installation. The app offers each new release as a
              self-installing update (Arch excluded).
            </p>
            <p>
              Merframe is free software under the GPL, version 3 or later. Bug
              reports and feature requests go to it's{" "}
              <Link
                href={`${MERFRAME_REPOSITORY}/issues`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                issue tracker
              </Link>
              .
            </p>
          </div>
        </CardContent>
      </Card>
      <Gallery features={FEATURES} />
    </div>
  );
}
