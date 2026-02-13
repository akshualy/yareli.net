"use client";

import { ExternalLink, RotateCcwIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAccountStore } from "@/stores/account-store";
import AccountDisplay from "./account-display";

export default function Account() {
  const {
    accountInformationString,
    accountInformation,
    setAccountInformationString,
    reset,
  } = useAccountStore();

  return (
    <div className="flex w-full flex-col gap-4">
      <span className="flex gap-0.5">
        <p className="text-accent font-bold">1.</p> Click the button below and
        copy all of the text from the page.
      </span>
      <Link
        href="https://www.warframe.com/en/api/user-data"
        target="_blank"
        rel="noreferrer"
      >
        <Button>
          <ExternalLink className="size-4" />
          Get Account Information
        </Button>
      </Link>
      <span className="flex gap-0.5">
        <p className="text-accent font-bold">2.</p> Paste the text into this
        box.
      </span>
      <div className="flex flex-col gap-2">
        <Textarea
          placeholder="Paste your account information here"
          value={accountInformationString}
          onChange={(e) => setAccountInformationString(e.target.value)}
        />
        <Button variant="outline" onClick={reset} className="self-end">
          <RotateCcwIcon className="size-4" /> Reset
        </Button>
      </div>
      {accountInformationString &&
        (!accountInformation ? (
          <span className="text-destructive text-wrap whitespace-pre-wrap">
            You are not logged in. Please log in to your Warframe account on{" "}
            <Link
              href="https://www.warframe.com/login"
              target="_blank"
              className="text-primary underline"
              rel="noreferrer"
            >
              warframe.com
            </Link>{" "}
            and try again.
          </span>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="bg-border my-2 h-0.5 w-full" />
            <AccountDisplay accountInformation={accountInformation} />
          </div>
        ))}
    </div>
  );
}
