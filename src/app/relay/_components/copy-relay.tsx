"use client";

import { Check, Clipboard } from "lucide-react";
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import type { RelayInfo } from "@/lib/types";

export default function CopyRelay({ relays }: { relays: RelayInfo[] }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = useCallback(() => {
    const time = Math.floor(Date.now() / 1000);
    let markdown = `## Available blessing relays sorted by current players\nPlayer count taken <t:${time}:R>\n`;
    const shortBestInstances: string[] = [];
    relays.forEach((relay) => {
      markdown += `### ${relay.planet} ${relay.relay_name}\n`;

      relay.relay_instances.instances.forEach((instance, index) => {
        if (index === 0) {
          shortBestInstances.push(
            `${relay.relay_name} ${instance.instance_id}`,
          );
        }

        markdown += `${relay.relay_name} ${instance.instance_id} - ${instance.instance_players} player${instance.instance_players === 1 ? "" : "s"}\n`;
      });
    });

    markdown += `\n**Short summary:** ${shortBestInstances.join(", ")}\n`;

    navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }, [relays]);

  return (
    <Button
      variant="secondary"
      onClick={handleCopy}
      disabled={copied}
      className="transition-all duration-300 will-change-transform hover:scale-105"
    >
      {copied ? (
        <>
          <Check className="h-4 w-4 text-green-500" /> Copied
        </>
      ) : (
        <>
          <Clipboard className="h-4 w-4" /> Copy As Markdown
        </>
      )}
    </Button>
  );
}
