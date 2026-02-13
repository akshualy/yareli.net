"use client";

import Image from "next/image";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      className="rounded-full"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <Image
        src="/dark.png"
        width={64}
        height={64}
        alt="sun"
        className="absolute size-12 scale-100 transition-all dark:scale-0"
      />
      <Image
        src="/light.png"
        width={64}
        height={64}
        alt="moon"
        className="absolute size-12 scale-0 transition-all dark:scale-100"
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
