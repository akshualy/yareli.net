import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { latestRelease, MERFRAME_REPOSITORY } from "@/lib/merframe";
import Download from "./_components/download";
import Gallery from "./_components/gallery";

export default async function MerframePage() {
  const release = await latestRelease();

  return (
    <div className="mx-auto flex w-full flex-col gap-4 md:max-w-3/4 xl:max-w-4/5 2xl:max-w-3/5">
      <Card className="gap-0 overflow-hidden border py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="flex flex-col gap-6 p-6">
            <div className="flex flex-col gap-2">
              <h1 className="text-primary text-3xl font-bold">Merframe</h1>
              <p className="text-foreground text-lg">
                A companion app for Warframe on Linux and Windows.
              </p>
            </div>
            <Download release={release} />
          </div>
          <div className="relative hidden overflow-hidden lg:block">
            <div className="absolute top-8 right-0 bottom-0 left-8 overflow-hidden rounded-tl-lg border-t border-l">
              <Image
                src="/merframe/world.png"
                alt="The World page of Merframe"
                fill
                priority
                sizes="(min-width: 1280px) 30vw, 50vw"
                className="object-cover object-left-top"
              />
            </div>
          </div>
        </div>
        <CardContent className="text-muted-foreground flex flex-col gap-3 border-t py-6">
          <p>
            Merframe is an open-source companion app that reads out Warframe. It
            displays information about your account next to prices from
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
        </CardContent>
      </Card>
      <Gallery />
    </div>
  );
}
