import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Info() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Yareli.net</CardTitle>
          <CardDescription className="text-foreground">
            A collection of tools for the game Warframe.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-muted-foreground max-w-2xl">
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
