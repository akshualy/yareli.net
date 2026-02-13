"use client";

import { RotateCcw } from "lucide-react";
import Link from "next/link";
import Merulina from "@/components/icons/merulina";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>
            &quot;Ha ha! Klokked it. Fish-lookin' null-unit.&quot; - Boon
          </CardTitle>
          <CardDescription>
            An unexpected error occurred. Please try again or navigate back to
            the home page.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <p className="text-muted-foreground">{error.message}</p>
            {error.digest && (
              <p className="text-sm text-muted-foreground">
                Error ID: {error.digest}
              </p>
            )}
          </div>
          <div className="flex items-center gap-4 w-full">
            <Link href="/" className="w-1/2">
              <Button className="w-full">
                <Merulina className="size-4" /> Go home
              </Button>
            </Link>
            <Button onClick={reset} className="w-1/2">
              <RotateCcw className="size-4" /> Reset
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
