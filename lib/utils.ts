import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const showActive = (url: string, path: string) => {
  const activeClass = url === path ? "text-secondary" : "";
  return activeClass;
};
