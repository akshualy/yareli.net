"use client";

import { Rocket, Users } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { RelayInfo } from "@/lib/types";
import { useBotCommandStore } from "@/stores/bot-command-store";
import { useRelayFormStore } from "@/stores/relay-form-store";
import CopyRelay from "./copy-relay";

export default function RelayDisplay({
  setTab,
}: {
  setTab: (value: string) => void;
}) {
  const { setRegion, setRelay, setInstance } = useBotCommandStore();
  const { relays, displayedInstances } = useRelayFormStore();
  if (relays.length === 0) {
    return null;
  }

  const handleSelectInstance = (
    region: string,
    relay: RelayInfo["relay_name"],
    instance: number,
  ) => {
    setRegion(region);
    setRelay(relay);
    setInstance(instance.toString());
    setTab("commands");
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <CopyRelay relays={relays} />
      <span>Click on any instance to jump to the bot command page.</span>
      <div className="flex w-full flex-wrap items-center justify-center gap-4">
        {relays.map((relay) => (
          <Card key={relay.planet}>
            <CardHeader>
              <CardTitle>
                <p>{relay.planet}</p>
                <p className="text-secondary text-sm">{relay.relay_name}</p>
              </CardTitle>
              <CardAction>
                <Image
                  src={`/planets/${relay.planet.toLowerCase()}.png`}
                  alt={relay.planet}
                  width={512}
                  height={512}
                  className="size-10 rotate-180"
                  priority
                />
              </CardAction>
            </CardHeader>
            <CardContent
              className="flex flex-col gap-2"
              style={{ minHeight: `${displayedInstances * 42}px` }}
            >
              {relay.relay_instances.instances.map((instance) => (
                <Button
                  key={instance.instance_id}
                  variant="outline"
                  className="text-accent flex items-center justify-between gap-8"
                  onClick={() =>
                    handleSelectInstance(
                      relay.region,
                      relay.relay_name,
                      instance.instance_id,
                    )
                  }
                >
                  {relay.relay_name} {instance.instance_id}
                  <span className="flex items-center gap-1">
                    {instance.instance_players} <Users className="size-4" />
                  </span>
                  <Rocket className="size-4" />
                </Button>
              ))}
              {relay.relay_instances.instances.length === 0 &&
                (() => {
                  const emptyInstance =
                    relay.relay_instances.first_empty_instance;
                  return emptyInstance ? (
                    <Button
                      key={emptyInstance.instance_id}
                      variant="outline"
                      className="text-accent flex items-center justify-between gap-8"
                      onClick={() =>
                        handleSelectInstance(
                          relay.region,
                          relay.relay_name,
                          emptyInstance.instance_id,
                        )
                      }
                    >
                      {relay.relay_name} {emptyInstance.instance_id}
                      <span className="flex items-center gap-1">
                        No players (may not exist yet)
                      </span>
                      <Rocket className="size-4" />
                    </Button>
                  ) : (
                    <p className="text-accent">No matching instance</p>
                  );
                })()}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
