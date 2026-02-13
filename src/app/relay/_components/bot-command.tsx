"use client";

import { Check, Clipboard } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
  BLESSING_BUFF_KEYS,
  BLESSING_BUFFS,
  REGIONS,
  RELAYS,
} from "@/lib/constants";
import { useBotCommandStore } from "@/stores/bot-command-store";

export default function BotCommand() {
  const {
    region,
    relay,
    instance,
    minutesUntilBless,
    buffs,
    setRegion,
    setRelay,
    setInstance,
    setMinutesUntilBless,
    toggleBuff,
    toggleAllBuffs,
  } = useBotCommandStore();

  const [copied, setCopied] = useState(false);

  const allBuffsChecked = useMemo(
    () => BLESSING_BUFF_KEYS.every((key) => buffs[key]),
    [buffs],
  );

  const selectedBuffCommands = useMemo(() => {
    if (allBuffsChecked) return "all";
    const selected = BLESSING_BUFF_KEYS.filter((key) => buffs[key]).map(
      (key) => BLESSING_BUFFS[key].command,
    );
    return selected.length > 0 ? selected.join(" ") : "";
  }, [buffs, allBuffsChecked]);

  const command = [
    "!bless",
    region === "OC" ? "oce" : region,
    relay.split(" ")[0],
    instance,
    `${minutesUntilBless}m`,
    selectedBuffCommands,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  const handleCopyCommand = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="grid w-full grid-cols-1 grid-rows-2 gap-4 md:grid-cols-2 md:grid-rows-1 md:gap-8">
        <div className="grid grid-rows-2 gap-2">
          <Label className="text-accent font-bold">Region</Label>
          <Select
            value={region}
            onValueChange={(value) => {
              if (REGIONS[value as keyof typeof REGIONS]) {
                setRegion(value);
              }
            }}
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
          <Label className="text-accent font-bold">Relay</Label>
          <Select
            value={relay}
            onValueChange={(value) => {
              setRelay(value);
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a relay" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(RELAYS).map(([key, value]) => (
                <SelectItem key={key} value={value}>
                  <div className="flex items-center gap-1">
                    <span className="hidden md:block">{key} -</span>
                    <span>{value}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-rows-2 gap-2">
          <Label className="text-accent font-bold">Instance</Label>
          <Input
            value={instance}
            onChange={(e) => {
              const isEmpty = e.target.value === "";
              const value = parseInt(e.target.value, 10);
              if (isEmpty || (!Number.isNaN(value) && value >= 1)) {
                setInstance(isEmpty ? "" : value.toString());
              }
            }}
          />
        </div>
        <div className="grid grid-rows-2 gap-2">
          <Label className="text-accent font-bold">
            {minutesUntilBless} minutes until the bless
          </Label>
          <Slider
            value={[minutesUntilBless]}
            onValueChange={(value) => {
              setMinutesUntilBless(value[0]);
            }}
            min={5}
            max={20}
            step={1}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 flex-wrap items-center justify-start gap-x-4 gap-y-2 md:flex">
        {BLESSING_BUFF_KEYS.map((key) => (
          <label
            key={key}
            className="flex cursor-pointer items-center gap-2 select-none"
          >
            <Checkbox
              checked={buffs[key]}
              onCheckedChange={() => toggleBuff(key)}
            />
            <span className="text-sm">{BLESSING_BUFFS[key].label}</span>
          </label>
        ))}
        <label className="flex cursor-pointer items-center gap-2 select-none md:border-l md:pl-4">
          <Checkbox
            checked={allBuffsChecked}
            onCheckedChange={toggleAllBuffs}
          />
          <span className="text-accent text-sm font-semibold">All</span>
        </label>
      </div>
      <Button
        variant="outline"
        className="flex h-auto w-full justify-between whitespace-pre-wrap"
        onClick={handleCopyCommand}
      >
        <span>{command}</span>
        <div>
          {copied ? (
            <div className="flex items-center gap-2">
              <span className="hidden md:block">Copied</span>
              <Check className="size-4" />
            </div>
          ) : (
            <Clipboard className="size-4" />
          )}
        </div>
      </Button>
    </div>
  );
}
