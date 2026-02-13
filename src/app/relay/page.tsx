"use client";

import { RotateCcwIcon } from "lucide-react";
import Link from "next/link";
import { parseAsString, useQueryState } from "nuqs";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WrappedCard from "@/components/wrapped-card";
import { useMessagesStore } from "@/stores/messages-store";
import { useRolesStore } from "@/stores/roles-store";
import BotCommand from "./_components/bot-command";
import Messages from "./_components/messages";
import RelayDisplay from "./_components/relay-display";
import RelayForm from "./_components/relay-form";
import Roles from "./_components/roles";

export default function RelayPage() {
  const { resetRoles } = useRolesStore();
  const [tab, setTab] = useQueryState("tab", parseAsString.withDefault("form"));
  const { resetMessages } = useMessagesStore();
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4">
      <Tabs
        value={tab}
        onValueChange={setTab}
        className="flex w-full items-center justify-center md:max-w-3/4 xl:max-w-3/5"
      >
        <TabsList className="w-full">
          <TabsTrigger value="form">Get Relays</TabsTrigger>
          <TabsTrigger value="commands">Bot Command</TabsTrigger>
          <TabsTrigger value="roles">Roles</TabsTrigger>
          <TabsTrigger value="messages">Blessages</TabsTrigger>
        </TabsList>
        <TabsContent value="form" className="w-full">
          <WrappedCard
            title="Relay Robber"
            description="A Warframe tool to get the amount of players in relays."
          >
            <RelayForm />
          </WrappedCard>
        </TabsContent>
        <TabsContent value="commands" className="w-full">
          <WrappedCard
            title="Bot Command"
            description={
              <span>
                Generate the command used for the bot on the{" "}
                <Link
                  href="https://tiny.cc/warframeblessing"
                  target="_blank"
                  className="text-primary underline"
                >
                  bless server
                </Link>
                .
              </span>
            }
          >
            <BotCommand />
          </WrappedCard>
        </TabsContent>
        <TabsContent value="roles" className="w-full">
          <WrappedCard
            title="Roles"
            description="Get a message to paste into relay chat with blesser roles."
            action={
              <Button variant="outline" onClick={resetRoles}>
                <RotateCcwIcon className="size-4" /> Reset
              </Button>
            }
          >
            <Roles />
          </WrappedCard>
        </TabsContent>
        <TabsContent value="messages" className="w-full">
          <WrappedCard
            title="Blessages"
            description="Customize your own blessing messages."
            action={
              <Button variant="outline" onClick={resetMessages}>
                <RotateCcwIcon className="size-4" /> Reset
              </Button>
            }
          >
            <Messages />
          </WrappedCard>
        </TabsContent>
      </Tabs>

      {tab === "form" && <RelayDisplay setTab={setTab} />}
    </div>
  );
}
