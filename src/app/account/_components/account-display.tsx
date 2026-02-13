import {
  Check,
  Clipboard,
  ExternalLink,
  LinkIcon,
  Monitor,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import AppleIcon from "@/components/icons/apple";
import PlaystationIcon from "@/components/icons/playstation";
import SwitchIcon from "@/components/icons/switch";
import XboxIcon from "@/components/icons/xbox";
import { Button } from "@/components/ui/button";
import type { AccountInformation } from "@/lib/types";

/* TODO: Check what the platforms are actually called in the API */
const platformIcons = {
  pc: <Monitor />,
  xbox: <XboxIcon />,
  apple: <AppleIcon />,
  switch: <SwitchIcon />,
  playstation: <PlaystationIcon />,
};

const cdnUrl = {
  pc: "https://api.warframe.com/cdn",
  xbox: "https://api-xb1.warframe.com/cdn",
  apple: "https://api-mob.warframe.com/cdn",
  switch: "https://api-swi.warframe.com/cdn",
  playstation: "https://api-ps4.warframe.com/cdn",
};

export default function AccountDisplay({
  accountInformation,
}: {
  accountInformation: AccountInformation;
}) {
  const [copied, setCopied] = useState(false);

  const platform = useMemo(() => {
    const platform = accountInformation.account.game_platform.toLowerCase();

    if (platform === "pc") {
      return "pc";
    }

    if (platform.startsWith("xb")) {
      return "xbox";
    }

    if (platform.startsWith("playstation") || platform.startsWith("ps")) {
      return "playstation";
    }

    if (platform.startsWith("sw")) {
      return "switch";
    }

    if (
      platform.startsWith("ap") ||
      platform.startsWith("ios") ||
      platform.startsWith("mob") ||
      platform.startsWith("and")
    ) {
      return "apple";
    }

    return "pc";
  }, [accountInformation.account.game_platform]);

  let couponText = "No";
  if (accountInformation.account.coupon.active) {
    couponText =
      platform === "pc"
        ? `${accountInformation.account.coupon.discount}%`
        : `x${accountInformation.account.coupon.multiplier}`;
  }

  const copyUserId = useCallback(() => {
    navigator.clipboard.writeText(accountInformation.user_id);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }, [accountInformation.user_id]);

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Image
            src={accountInformation.avatar}
            alt="Avatar"
            width={64}
            height={64}
            className="hidden sm:block"
          />
          <Image
            src={accountInformation.avatar}
            alt="Avatar"
            width={32}
            height={32}
            className="block size-8 sm:hidden"
          />
          <div className="flex flex-col items-start">
            <h1 className="text-primary flex items-start gap-2 text-xl font-bold">
              {accountInformation.display_name}
              <span className="text-foreground text-sm">
                [{accountInformation.account.masteryRank}]
              </span>
            </h1>
            <span className="text-accent hidden text-sm sm:block">
              {accountInformation.user_id}
            </span>
          </div>
        </div>
        <div className="flex items-start self-start">
          {platformIcons[platform as keyof typeof platformIcons]}
        </div>
      </div>
      <span className="text-accent block text-sm sm:hidden">
        {accountInformation.user_id}
      </span>
      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col">
          <span className="font-bold">Platinum</span>
          <span>{accountInformation.account.platinum}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-bold">Coupon</span>
          <span>{couponText}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-bold">Country</span>
          <span>{accountInformation.country_code}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-bold">Language</span>
          <span>{accountInformation.site_language.toUpperCase()}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-bold">Purchases</span>
          <span>{accountInformation.transactions?.length ?? 0}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-bold">Cross-Save</span>
          <span>{accountInformation.account.crossSave ? "Yes" : "No"}</span>
        </div>
        <div className="flex flex-col">
          <span className="flex items-center gap-2 font-bold">
            <LinkIcon className="size-4" /> Twitch
          </span>
          <span>{accountInformation.account.twitchLinked ? "Yes" : "No"}</span>
        </div>
        <div className="flex flex-col">
          <span className="flex items-center gap-2 font-bold">
            <LinkIcon className="size-4" /> Amazon
          </span>
          <span>{accountInformation.account.amazonLinked ? "Yes" : "No"}</span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
          <Button variant="secondary" onClick={copyUserId}>
            {copied ? (
              <span className="flex items-center gap-2">
                <span className="hidden md:block">Copied</span>
                <Check className="size-4" />
              </span>
            ) : (
              <>
                <Clipboard className="size-4" />
                Copy User ID
              </>
            )}
          </Button>
          <Link
            href={`${cdnUrl[platform]}/getProfileViewingData.php?playerId=${accountInformation.user_id}`}
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
