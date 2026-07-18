import { Check, Clipboard, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";

export default function AccountDisplay({ accountId }: { accountId: string }) {
  const [copied, setCopied] = useState(false);

  const copyAccountId = useCallback(() => {
    navigator.clipboard.writeText(accountId);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }, [accountId]);

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex flex-col">
        <span className="font-bold">Account ID</span>
        <span className="text-accent break-all">{accountId}</span>
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
            href={`https://api.warframe.com/cdn/getProfileViewingData.php?playerId=${accountId}`}
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
