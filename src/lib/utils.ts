export const formatDate = (date: string) => {
  const formatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });

  return formatter.format(new Date(date)).toLowerCase();
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
