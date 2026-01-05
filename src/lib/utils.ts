import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const formatDate = (date: string) => {
  const dateToFormat = new Date(date.replaceAll("-", "/"));
  const formatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });

  return formatter.format(dateToFormat).toLowerCase();
}

export const formatTime = (date: string) => {
  const dateToFormat = new Date(date.replaceAll("-", "/"));
  const formatter = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true
  });

  return formatter.format(dateToFormat).toLowerCase();
}

export function minutesToReadable(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
}

export function isMobileUserAgentData() {
  if (typeof navigator === "undefined" || !navigator.userAgent) {
    return false;
  }

  return navigator.userAgent.toLowerCase().includes("mobile");
}

export function prettyURL(url: string): string {
  return url.replace(/https?:\/\//, "").replace(/www\./, "");
}

export function removeParentheses(text: string) {
  return text.replace(/\s*\(.*?\)\s*/g, "").trim();
}

export function cn(...values: ClassValue[]) {
  return twMerge(clsx(values));
}

export function fixURL(url: string | undefined): string {
  if (!url?.startsWith("http://") && !url?.startsWith("https://")) {
    return `https://${url}`;
  }
  return url;
}
