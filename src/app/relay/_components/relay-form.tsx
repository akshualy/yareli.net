"use client";

import { Loader2, Telescope } from "lucide-react";
import { useCallback } from "react";
import { Button } from "@/components/ui/button";
import HelpTooltip from "@/components/ui/help-tooltip";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { LANGUAGES, REGIONS } from "@/lib/constants";
import { useRelayFormStore } from "@/stores/relay-form-store";

export default function RelayForm() {
  const {
    region,
    language,
    excludeCount,
    instances,
    isFetching,
    setRegion,
    setLanguage,
    setExcludeCount,
    setInstances,
    submitForm,
  } = useRelayFormStore();

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      await submitForm();
    },
    [submitForm],
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center space-y-8"
    >
      <div className="grid w-full grid-cols-1 grid-rows-2 gap-4 md:grid-cols-2 md:grid-rows-1 md:gap-8">
        <div className="grid grid-rows-2 gap-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="region" className="text-accent font-bold">
              Region
            </Label>
            {language !== "EN" && (
              <HelpTooltip className="size-4">
                Only English clients are separated by region.
              </HelpTooltip>
            )}
          </div>
          <Select
            value={region}
            onValueChange={(value) => {
              if (REGIONS[value as keyof typeof REGIONS]) {
                setRegion(value);
              }
            }}
            disabled={language !== "EN"}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a region" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(REGIONS).map(([key, value]) => (
                <SelectItem key={key} value={key}>
                  {value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-rows-2 gap-2">
          <Label htmlFor="language" className="text-accent font-bold">
            Language
          </Label>
          <Select
            value={language}
            onValueChange={(value) => {
              if (LANGUAGES[value as keyof typeof LANGUAGES]) {
                setLanguage(value);
                if (value !== "EN") {
                  setRegion("EU");
                }
              }
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a language" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(LANGUAGES).map(([key, value]) => (
                <SelectItem key={key} value={key}>
                  {value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid w-full grid-cols-1 grid-rows-2 gap-8 md:grid-cols-2 md:grid-rows-1">
        <div className="grid grid-rows-2 gap-2">
          <Label htmlFor="exclude-slider" className="text-accent">
            Exclude relays with more than {excludeCount} player
            {excludeCount === 1 ? "" : "s"}
          </Label>
          <Slider
            id="exclude-slider"
            min={1}
            max={49}
            value={[excludeCount]}
            onValueChange={(value) => setExcludeCount(value[0])}
          />
        </div>

        <div className="grid grid-rows-2 gap-2">
          <Label htmlFor="instances-slider" className="text-accent">
            Per relay, display at most {instances} instance
            {instances === 1 ? "" : "s"}
          </Label>
          <Slider
            id="instances-slider"
            min={1}
            max={20}
            value={[instances]}
            onValueChange={(value) => setInstances(value[0])}
          />
        </div>
      </div>

      <div className="flex w-full flex-col items-center space-y-4">
        <Button
          type="submit"
          disabled={isFetching}
          className="transition-all duration-300 hover:scale-105"
        >
          {isFetching ? (
            <Loader2 className="size-4 animate-spin" strokeWidth={1.5} />
          ) : (
            <Telescope className="size-4" strokeWidth={1.5} />
          )}
          {isFetching ? "Please wait..." : "Get relays"}
        </Button>
      </div>
    </form>
  );
}
