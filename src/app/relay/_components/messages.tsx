"use client";

import {
  Check,
  ChevronDown,
  ChevronUp,
  Download,
  Pencil,
  Plus,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useMessagesStore } from "@/stores/messages-store";

const MAX_CHARS = 300;

export default function Messages() {
  const {
    messages,
    addMessage,
    updateMessage,
    removeMessage,
    moveMessageUp,
    moveMessageDown,
    exportMessages,
    importMessages,
  } = useMessagesStore();
  const [newMessage, setNewMessage] = useState("");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedMessage, setEditedMessage] = useState<string>("");

  const handleAddMessage = useCallback(() => {
    const trimmed = newMessage.trim();
    if (trimmed && trimmed.length <= MAX_CHARS) {
      addMessage(trimmed);
      setNewMessage("");
    }
  }, [newMessage, addMessage]);

  const handleCopyMessage = useCallback((text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => {
      setCopiedIndex((copiedIndex) =>
        copiedIndex === index ? null : copiedIndex,
      );
    }, 2000);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleAddMessage();
      }
    },
    [handleAddMessage],
  );

  const handleStartEditing = useCallback(
    (index: number) => {
      setEditingIndex(index);
      setEditedMessage(messages[index].text);
    },
    [messages],
  );

  const handleStopEditing = useCallback(() => {
    setEditingIndex(null);
    setEditedMessage("");
  }, []);

  const handleExport = useCallback(() => {
    const json = exportMessages();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "messages.json";
    a.click();
    URL.revokeObjectURL(url);
  }, [exportMessages]);

  const handleImport = useCallback(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json,application/json";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const content = event.target?.result as string;
          if (!importMessages(content)) {
            toast.error("Invalid JSON format. Expected an array of strings.");
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  }, [importMessages]);

  const charsRemaining = MAX_CHARS - newMessage.length;

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex items-center justify-between">
        <Label className="text-accent font-bold">Messages</Label>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleExport}
            disabled={messages.length === 0}
          >
            <Download className="mr-1.5 size-4" />
            Export
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleImport}
          >
            <Upload className="mr-1.5 size-4" />
            Import
          </Button>
        </div>
      </div>

      {messages.length > 0 && (
        <div className="flex flex-col space-y-2">
          <span className="text-muted-foreground text-sm">
            Click on a message to copy it to your clipboard.
          </span>
          <div className="flex flex-col space-y-6">
            {messages.map((message, index) => (
              <div className="flex flex-col gap-2" key={message.id}>
                {editingIndex === index ? (
                  <Textarea
                    value={editedMessage}
                    onChange={(e) => {
                      setEditedMessage(e.target.value);
                      e.target.style.height = `${e.target.scrollHeight}px`;
                    }}
                    onFocus={(e) => {
                      const target = e.target;
                      target.selectionStart = target.selectionEnd =
                        target.value.length;
                      target.style.height = `${target.scrollHeight}px`;
                    }}
                    className="resize-none overflow-hidden p-3 pb-3.5 text-sm"
                    maxLength={MAX_CHARS}
                    autoFocus
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => handleCopyMessage(message.text, index)}
                    className="border-secondary hover:bg-secondary/10 w-full cursor-pointer rounded-md border p-3 text-left"
                  >
                    <p className="relative text-sm break-words whitespace-pre-wrap">
                      {copiedIndex === index && (
                        <span className="bg-secondary shadow-accent absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md px-3 py-2 shadow-2xs">
                          Copied!
                        </span>
                      )}
                      {message.text}
                    </p>
                  </button>
                )}

                <div className="flex items-center justify-between gap-2">
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => moveMessageUp(index)}
                      disabled={index === 0 || editingIndex !== null}
                    >
                      <ChevronUp className="size-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => moveMessageDown(index)}
                      disabled={
                        index === messages.length - 1 || editingIndex !== null
                      }
                    >
                      <ChevronDown className="size-4" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-end gap-2">
                    {editingIndex === index ? (
                      <>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            updateMessage(index, editedMessage);
                            handleStopEditing();
                          }}
                          className="hover:bg-primary dark:hover:bg-primary"
                        >
                          <Check className="size-4" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => handleStopEditing()}
                          className="hover:bg-destructive dark:hover:bg-destructive hover:text-destructive-foreground dark:hover:text-destructive-foreground"
                        >
                          <X className="size-4" />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => handleStartEditing(index)}
                          disabled={editingIndex !== null}
                          className="hover:bg-primary dark:hover:bg-primary"
                        >
                          <Pencil className="size-4" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeMessage(index)}
                          disabled={editingIndex !== null}
                          className="hover:bg-destructive dark:hover:bg-destructive hover:text-destructive-foreground dark:hover:text-destructive-foreground"
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="new-message" className="text-accent font-bold">
            New Message
          </Label>
          <span className="text-muted-foreground text-sm">
            {charsRemaining} characters remaining
          </span>
        </div>
        <div className="flex gap-2">
          <Textarea
            id="new-message"
            placeholder="Enter a new bless message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            className="min-h-12 flex-1 resize-none"
            maxLength={MAX_CHARS}
          />
          <Button
            type="button"
            size="icon"
            onClick={handleAddMessage}
            disabled={!newMessage.trim()}
            className="self-center"
          >
            <Plus className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
