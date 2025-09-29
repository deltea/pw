export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  }).toLowerCase();
}

export function isMobileUserAgentData() {
  if (navigator.userAgent) {
    console.log(navigator.userAgent.toLowerCase());
    return navigator.userAgent.toLowerCase().includes("mobile");
  }

  return false;
}
