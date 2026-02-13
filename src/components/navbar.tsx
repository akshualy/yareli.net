"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Aquablades from "./icons/aquablades";
import SeaSnares from "./icons/sea-snares";
import { NavLink } from "./nav-link";
import { ModeToggle } from "./ui/theme-toggle";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <div className="bg-background border-border flex h-14 w-full items-center justify-between gap-8 border-b px-8">
        <div className="flex items-center gap-8">
          <Link href="/" className="h-full">
            <Image
              src="/logo_dark.svg"
              alt="logo"
              width={128}
              height={50}
              className="block w-32 dark:hidden"
              priority
            />
            <Image
              src="/logo.svg"
              alt="logo"
              width={128}
              height={50}
              className="hidden w-32 dark:block"
              priority
            />
          </Link>
          <div className="hidden items-center gap-4 md:flex">
            <NavLink href="/relay">
              <SeaSnares className="size-6" />
              <span className="text-xl">Relay</span>
            </NavLink>
            <NavLink href="/account">
              <Aquablades className="size-6" />
              <span className="text-xl">Account</span>
            </NavLink>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <ModeToggle />
          </div>
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="relative z-50 flex h-6 w-6 flex-col items-center justify-center gap-1.5 md:hidden"
            aria-label="Toggle menu"
          >
            <span
              className={cn(
                "bg-foreground h-0.5 w-6 transition-all duration-300",
                isMobileMenuOpen && "translate-y-2 rotate-45",
              )}
            />
            <span
              className={cn(
                "bg-foreground h-0.5 w-6 transition-all duration-300",
                isMobileMenuOpen && "opacity-0",
              )}
            />
            <span
              className={cn(
                "bg-foreground h-0.5 w-6 transition-all duration-300",
                isMobileMenuOpen && "-translate-y-2 -rotate-45",
              )}
            />
          </button>
        </div>
      </div>

      <div
        className={cn(
          "bg-background/95 fixed inset-0 z-40 backdrop-blur-md transition-all duration-300 md:hidden",
          isMobileMenuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        )}
      >
        <div
          className={cn(
            "flex h-full flex-col items-center justify-center gap-8 transition-transform duration-300",
            isMobileMenuOpen ? "translate-y-0" : "-translate-y-8",
          )}
        >
          <NavLink
            href="/relay"
            onClick={() => setIsMobileMenuOpen(false)}
            className="gap-2 text-2xl"
          >
            <SeaSnares className="size-8" />
            <span>Relay</span>
          </NavLink>
          <NavLink
            href="/account"
            onClick={() => setIsMobileMenuOpen(false)}
            className="gap-2 text-2xl"
          >
            <Aquablades className="size-8" />
            <span>Account</span>
          </NavLink>
          <div className="border-border border-t pt-4">
            <ModeToggle />
          </div>
        </div>
      </div>
    </>
  );
}
