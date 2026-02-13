import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Message {
  id: string;
  text: string;
}

function createMessage(text: string): Message {
  return { id: crypto.randomUUID(), text };
}

const DEFAULT_MESSAGES: Message[] = [
  createMessage(
    'Remember to thank the blessers by pressing "F" (or triangle on console) when the blesses come in! There\'s always time to sprinkle some good vibes. :heart:',
  ),
  createMessage(
    ":community: Join our Discord (tiny.cc/warframeblessing) to keep yourself updated with mass blessings, or join as a blesser!",
  ),
  createMessage(
    "Thanks for coming, blessers and the blessed! May your hunts be fruitful, and your conquests great! And also special thanks to the fellow blessers that made this possible. :heart:",
  ),
  createMessage("Placeholder."),
];

interface MessagesState {
  messages: Message[];
  addMessage: (text: string) => void;
  updateMessage: (index: number, text: string) => void;
  removeMessage: (index: number) => void;
  moveMessageUp: (index: number) => void;
  moveMessageDown: (index: number) => void;
  resetMessages: () => void;
  exportMessages: () => string;
  importMessages: (json: string) => boolean;
}

export const useMessagesStore = create<MessagesState>()(
  persist(
    (set, get) => ({
      messages: DEFAULT_MESSAGES,

      addMessage: (text: string) =>
        set((state) => ({
          messages: [...state.messages, createMessage(text)],
        })),

      updateMessage: (index: number, text: string) =>
        set((state) => ({
          messages: state.messages.map((m, i) =>
            i === index ? createMessage(text) : m,
          ),
        })),

      removeMessage: (index: number) =>
        set((state) => ({
          messages: state.messages.filter((_, i) => i !== index),
        })),

      moveMessageUp: (index: number) =>
        set((state) => {
          if (index === 0) return state;
          const newMessages = [...state.messages];
          [newMessages[index - 1], newMessages[index]] = [
            newMessages[index],
            newMessages[index - 1],
          ];
          return { messages: newMessages };
        }),

      moveMessageDown: (index: number) =>
        set((state) => {
          if (index === state.messages.length - 1) return state;
          const newMessages = [...state.messages];
          [newMessages[index], newMessages[index + 1]] = [
            newMessages[index + 1],
            newMessages[index],
          ];
          return { messages: newMessages };
        }),

      resetMessages: () => set({ messages: DEFAULT_MESSAGES }),

      exportMessages: () =>
        JSON.stringify(
          get().messages.map((m) => m.text),
          null,
          2,
        ),

      importMessages: (json: string) => {
        try {
          const parsed = JSON.parse(json);
          if (
            Array.isArray(parsed) &&
            parsed.every((item) => typeof item === "string")
          ) {
            set({ messages: parsed.map(createMessage) });
            return true;
          }
          return false;
        } catch {
          return false;
        }
      },
    }),
    {
      name: "bless-messages-storage",
      version: 1,
      migrate: (persisted, version) => {
        if (version === 0) {
          const state = persisted as { messages: string[] };
          return { messages: state.messages.map(createMessage) };
        }
        return persisted;
      },
    },
  ),
);
