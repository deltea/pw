export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  }).toLowerCase();
}

export function minutesToReadable(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
}

export function isMobileUserAgentData() {
  if (navigator.userAgent) {
    console.log(navigator.userAgent.toLowerCase());
    return navigator.userAgent.toLowerCase().includes("mobile");
  }

  return false;
}
