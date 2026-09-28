"use client";

import { DownloadIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import GithubIcon from "@/components/icons/github";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MERFRAME_REPOSITORY,
  PACKAGES,
  type PackageKey,
  packageForPlatform,
  type Release,
} from "@/lib/merframe";

const packageKeys = Object.keys(PACKAGES) as PackageKey[];

export default function Download({ release }: { release: Release | null }) {
  const [selected, setSelected] = useState<PackageKey>("appimage");

  useEffect(() => {
    setSelected(packageForPlatform(navigator.userAgent));
  }, []);

  const releaseDate =
    release &&
    new Date(release.date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        {release ? (
          <>
            <Button asChild>
              <a href={release.downloads[selected]} download>
                <DownloadIcon className="size-4" />
                Download {PACKAGES[selected].label}
              </a>
            </Button>
            <Select
              value={selected}
              onValueChange={(value) => setSelected(value as PackageKey)}
            >
              <SelectTrigger aria-label="Package format">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {packageKeys.map((key) => (
                  <SelectItem key={key} value={key}>
                    {PACKAGES[key].label} ({PACKAGES[key].platform})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </>
        ) : (
          <Button asChild>
            <Link
              href={`${MERFRAME_REPOSITORY}/releases/latest`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <DownloadIcon className="size-4" />
              Download from GitHub
            </Link>
          </Button>
        )}
        <Button variant="outline" asChild>
          <Link
            href={MERFRAME_REPOSITORY}
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubIcon className="size-4" />
            Source
          </Link>
        </Button>
      </div>
      <p className="text-muted-foreground text-sm">
        {release
          ? `Version ${release.version}, released ${releaseDate}. `
          : "GitHub did not answer, so the latest version is unknown. "}
        <Link
          href={`${MERFRAME_REPOSITORY}/releases`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline"
        >
          All releases
        </Link>
      </p>
    </div>
  );
}
