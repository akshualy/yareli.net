import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const NAME_REGEX = /{{name}}/g;
const ROLE_REGEX = /{{role}}/g;

export function formatMessage(message: string, name: string, role: string) {
  return message.replace(NAME_REGEX, name).replace(ROLE_REGEX, role);
}
