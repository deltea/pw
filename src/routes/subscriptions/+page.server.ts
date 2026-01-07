import type { PageServerLoad } from "./$types";

export const load = (async ({ fetch }) => {
  const response = await fetch("/api/subscriptions");
  const subscriptions = await response.json();

  return { subscriptions };
}) satisfies PageServerLoad;
