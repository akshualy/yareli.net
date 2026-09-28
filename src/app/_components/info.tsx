import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import Riptide from "@/components/icons/riptide";
import SeaSnares from "@/components/icons/sea-snares";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Info() {
  return (
    <div className="mx-auto flex w-full flex-col items-center gap-4 md:max-w-3/4 xl:max-w-3/5">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Yareli.net</CardTitle>
          <CardDescription className="text-foreground">
            A collection of tools for the game Warframe.
          </CardDescription>
        </CardHeader>
      </Card>
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Riptide className="size-6" />
              Merframe
            </CardTitle>
            <CardDescription>
              A companion app for Warframe on Linux and Windows. Shows
              inventory, foundry, relics, rivens and mastery and more.
              Integrates with warframe.market and in-game overlays.
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-auto">
            <Button asChild>
              <Link href="/merframe">
                Get Merframe
                <ArrowRightIcon className="size-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <SeaSnares className="size-6" />
              Relay Robber
            </CardTitle>
            <CardDescription>
              Find relay instances with player counts for your blessing by
              region and language. Additional convenience tools for bless
              hosting exist.
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-auto">
            <Button asChild>
              <Link href="/relay">
                Open Relay Robber
                <ArrowRightIcon className="size-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
      <Card className="w-full">
        <CardContent className="text-muted-foreground">
          <p>
            This is an independent, fan-made website and is not affiliated with,
            endorsed, sponsored, or specifically approved by Digital Extremes
            Ltd.
          </p>
          <br />
          <p>
            Unless otherwise noted, all images, artwork, screenshots, game
            assets, and related intellectual property on this site are the
            property of Digital Extremes Ltd.
          </p>
          <br />
          <p>
            &quot;<span className="font-bold">Warframe</span>&quot; and
            associated logos are trademarks or registered trademarks of Digital
            Extremes Ltd.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
