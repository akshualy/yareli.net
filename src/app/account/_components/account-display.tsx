import { Check, Clipboard, ExternalLink, Monitor } from "lucide-react";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import AppleIcon from "@/components/icons/apple";
import PlaystationIcon from "@/components/icons/playstation";
import SwitchIcon from "@/components/icons/switch";
import XboxIcon from "@/components/icons/xbox";
import { Button } from "@/components/ui/button";
import type { Profile } from "@/lib/types";

const platformIcons = {
  pc: <Monitor />,
  playstation: <PlaystationIcon />,
  xbox: <XboxIcon />,
  switch: <SwitchIcon />,
  apple: <AppleIcon />,
};

type Platform = keyof typeof platformIcons;

// Names end in a private-use character encoding the platform:
// 0xE000 + (0 = PC, 1 = PlayStation, 2 = Xbox, 3 = Switch, 4 = iOS, 5 = Android)
const GLYPH_PLATFORMS: Platform[] = [
  "pc",
  "playstation",
  "xbox",
  "switch",
  "apple",
  "apple",
];

function splitPlatformName(name: string): {
  name: string;
  platform: Platform | null;
} {
  const glyph = name.charCodeAt(name.length - 1) - 0xe000;
  if (glyph >= 0) {
    return {
      name: name.slice(0, -1),
      platform: GLYPH_PLATFORMS[glyph] ?? null,
    };
  }
  return { name, platform: null };
}

export default function AccountDisplay({ profile }: { profile: Profile }) {
  const [copied, setCopied] = useState(false);

  const { name: displayName, platform } = useMemo(
    () => splitPlatformName(profile.displayName),
    [profile.displayName],
  );

  const platformNames = useMemo(
    () => profile.platformNames.map(splitPlatformName),
    [profile.platformNames],
  );

  const copyAccountId = useCallback(() => {
    navigator.clipboard.writeText(profile.accountId);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }, [profile.accountId]);

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-col items-start">
          <h1 className="text-primary flex items-start gap-2 text-xl font-bold">
            {displayName}
            <span className="text-foreground text-sm">
              [{profile.masteryRank}]
            </span>
          </h1>
          <span className="text-accent hidden text-sm sm:block">
            {profile.accountId}
          </span>
        </div>
        <div className="flex items-start self-start">
          {platform && platformIcons[platform]}
        </div>
      </div>
      <span className="text-accent block text-sm sm:hidden">
        {profile.accountId}
      </span>
      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col">
          <span className="font-bold">Mastery Rank</span>
          <span>{profile.masteryRank}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-bold">Created</span>
          <span>
            {profile.createdAt
              ? new Date(profile.createdAt).toLocaleDateString()
              : "Unknown"}
          </span>
        </div>
        {platformNames.length > 0 && (
          <div className="col-span-2 flex flex-col">
            <span className="font-bold">Linked Platforms</span>
            {platformNames.map(({ name, platform }) => (
              <span key={name} className="flex items-center gap-2">
                {platform && (
                  <span className="[&_svg]:size-4">
                    {platformIcons[platform]}
                  </span>
                )}
                {name}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
          <Button variant="secondary" onClick={copyAccountId}>
            {copied ? (
              <span className="flex items-center gap-2">
                <span className="hidden md:block">Copied</span>
                <Check className="size-4" />
              </span>
            ) : (
              <>
                <Clipboard className="size-4" />
                Copy Account ID
              </>
            )}
          </Button>
          <Link
            href={`https://api.warframe.com/cdn/getProfileViewingData.php?playerId=${profile.accountId}`}
            target="_blank"
            rel="noreferrer"
          >
            <Button variant="secondary">
              <ExternalLink className="size-4" />
              View Public Profile Data
            </Button>
          </Link>
        </div>
        <p className="text-muted-foreground hidden break-words sm:block">
          PC users can right-click &quot;View Public Profile Data&quot; and
          select &quot;Save Link As...&quot; to save the profile data as a file.
        </p>
        <p className="text-muted-foreground break-words">
          For use on sites like{" "}
          <Link
            href="https://browse.wf/profile"
            target="_blank"
            className="text-primary hover:underline"
            rel="noreferrer"
          >
            browse.wf
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
