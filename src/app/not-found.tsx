"use client";

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

export default function NotFound() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>K-Driven Away</CardTitle>
          <CardDescription>
            The page you're looking for doesn't exist or has been moved.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <Link href="/" className="w-full">
            <Button className="w-full">
              <Merulina className="size-4" /> Go home
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
