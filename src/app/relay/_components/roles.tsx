"use client";

import { AlertCircle, Check, Clipboard, UserPlus } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatMessage } from "@/lib/utils";
import { useRolesStore } from "@/stores/roles-store";

export default function Roles() {
  const {
    affinity,
    credits,
    resource,
    damage,
    health,
    shields,
    messagePrefix,
    playerFormat,
    messageDivider,
    messageSuffix,
    setAffinity,
    setCredits,
    setResource,
    setDamage,
    setHealth,
    setShields,
    setMessagePrefix,
    setPlayerFormat,
    setMessageDivider,
    setMessageSuffix,
  } = useRolesStore();
  const [copied, setCopied] = useState(false);
  const [pasteInput, setPasteInput] = useState("");
  const [quickAssignFromPingsOpen, setQuickAssignFromPingsOpen] =
    useState(false);

  const handleImportNamesFromPings = useCallback(() => {
    const lines = pasteInput.split("\n");
    const names: string[] = [];

    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith("@")) {
        const name = trimmed.slice(1).trim();
        if (name) {
          names.push(name);
        }
      }
    }

    const roleSetters = [
      setAffinity,
      setCredits,
      setResource,
      setDamage,
      setHealth,
      setShields,
    ];

    roleSetters.forEach((setter, index) => {
      setter(names[index] || "");
    });

    setPasteInput("");
    setQuickAssignFromPingsOpen(false);
  }, [
    pasteInput,
    setAffinity,
    setCredits,
    setResource,
    setDamage,
    setHealth,
    setShields,
  ]);

  const message = useMemo(() => {
    let message = messagePrefix;

    const roles: string[] = [];
    if (affinity) roles.push(formatMessage(playerFormat, affinity, "Affinity"));
    if (credits) roles.push(formatMessage(playerFormat, credits, "Credits"));
    if (resource) roles.push(formatMessage(playerFormat, resource, "Resource"));
    if (damage) roles.push(formatMessage(playerFormat, damage, "Damage"));
    if (health) roles.push(formatMessage(playerFormat, health, "Health"));
    if (shields) roles.push(formatMessage(playerFormat, shields, "Shields"));

    message += roles.join(messageDivider);
    message += messageSuffix;
    return message;
  }, [
    affinity,
    credits,
    resource,
    damage,
    health,
    shields,
    playerFormat,
    messageDivider,
    messagePrefix,
    messageSuffix,
  ]);

  const handleCopyMessage = useCallback(() => {
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }, [message]);

  return (
    <div className="flex flex-col gap-6 overflow-hidden">
      <div className="flex gap-2">
        <Dialog
          open={quickAssignFromPingsOpen}
          onOpenChange={setQuickAssignFromPingsOpen}
        >
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <UserPlus className="size-4" />
              Quick Assign From Pings
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Quick Assign From Pings</DialogTitle>
              <DialogDescription>
                Paste a list of names prefixed with @ (one per line). They will
                be assigned to roles in order: Affinity, Credits, Resource,
                Damage, Health, Shields.
              </DialogDescription>
            </DialogHeader>
            <Textarea
              placeholder={`@SomeUser\n@SomeoneElse\n@...`}
              value={pasteInput}
              onChange={(e) => setPasteInput(e.target.value)}
              rows={8}
            />
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setQuickAssignFromPingsOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleImportNamesFromPings}>Assign</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2 lg:grid-cols-3">
        <div className="grid grid-rows-2 gap-2">
          <Label className="text-accent font-bold">Affinity</Label>
          <Input
            value={affinity}
            onChange={(e) => setAffinity(e.target.value)}
            maxLength={24}
          />
        </div>
        <div className="grid grid-rows-2 gap-2">
          <Label className="text-accent font-bold">Credits</Label>
          <Input
            value={credits}
            onChange={(e) => setCredits(e.target.value)}
            maxLength={24}
          />
        </div>
        <div className="grid grid-rows-2 gap-2">
          <Label className="text-accent font-bold">Resource</Label>
          <Input
            value={resource}
            onChange={(e) => setResource(e.target.value)}
            maxLength={24}
          />
        </div>
        <div className="grid grid-rows-2 gap-2">
          <Label className="text-accent font-bold">Damage</Label>
          <Input
            value={damage}
            onChange={(e) => setDamage(e.target.value)}
            maxLength={24}
          />
        </div>
        <div className="grid grid-rows-2 gap-2">
          <Label className="text-accent font-bold">Health</Label>
          <Input
            value={health}
            onChange={(e) => setHealth(e.target.value)}
            maxLength={24}
          />
        </div>
        <div className="grid grid-rows-2 gap-2">
          <Label className="text-accent font-bold">Shields</Label>
          <Input
            value={shields}
            onChange={(e) => setShields(e.target.value)}
            maxLength={24}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 border-t border-b py-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="grid grid-rows-2 gap-2">
          <Label className="text-accent font-bold">Message Prefix</Label>
          <Input
            value={messagePrefix}
            onChange={(e) => setMessagePrefix(e.target.value)}
          />
        </div>
        <div className="grid grid-rows-2 gap-2">
          <Label className="text-accent font-bold">Role Format</Label>
          <Input
            value={playerFormat}
            onChange={(e) => setPlayerFormat(e.target.value)}
          />
        </div>
        <div className="grid grid-rows-2 gap-2">
          <Label className="text-accent font-bold">Message Divider</Label>
          <Input
            value={messageDivider}
            onChange={(e) => setMessageDivider(e.target.value)}
          />
        </div>
        <div className="grid grid-rows-2 gap-2">
          <Label className="text-accent font-bold">Message Suffix</Label>
          <Input
            value={messageSuffix}
            onChange={(e) => setMessageSuffix(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-end gap-2 text-sm">
          {message.length >= 300 && (
            <span className="text-destructive flex items-center gap-2">
              <AlertCircle className="size-4" />
              Too long for chat box
            </span>
          )}
          <span
            className={
              message.length >= 300
                ? "text-destructive"
                : "text-muted-foreground"
            }
          >
            {message.length} / 300
          </span>
        </div>
        <Button
          variant="outline"
          onClick={handleCopyMessage}
          className="h-auto w-full"
        >
          <div className="flex w-full items-center justify-between gap-4">
            <span className="whitespace-pre-wrap">{message}</span>
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
    </div>
  );
}
