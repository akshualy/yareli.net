"use client";

import Image from "next/image";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export interface Feature {
  title: string;
  image: string;
  text: string;
}

export default function Gallery({ features }: { features: Feature[] }) {
  const [open, setOpen] = useState<Feature | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {features.map((feature) => (
          <Card key={feature.title} className="gap-4 overflow-hidden py-0">
            <button
              type="button"
              onClick={() => setOpen(feature)}
              className="cursor-zoom-in"
              aria-label={`Show ${feature.title} at full size`}
            >
              <Image
                src={`/merframe/${feature.image}`}
                alt={`${feature.title} in Merframe`}
                width={1440}
                height={900}
                sizes="(min-width: 1280px) 40vw, (min-width: 768px) 45vw, 100vw"
                className="w-full"
              />
            </button>
            <CardContent className="flex flex-col gap-1 pb-6">
              <h3 className="text-primary text-lg font-bold">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">{feature.text}</p>
            </CardContent>
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
                sizes="100vw"
                className="w-full rounded-md"
              />
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
