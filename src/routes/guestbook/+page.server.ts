import type { PageServerLoad } from "./$types";
import type { Actions } from "./$types";
import { KV_REST_API_URL, KV_REST_API_TOKEN } from "$env/static/private";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: KV_REST_API_URL || "",
  token: KV_REST_API_TOKEN || ""
});

export const actions = {
	default: async (e) => {
    const data = await e.request.formData();

    const name = data.get("name") as string;
    const website = data.get("website") as string;
    const music = data.get("music") as string;
    const food = data.get("food") as string;
    const message = data.get("message") as string;

    await redis.lpush("guestbook", {
      name: name.length > 0 ? name : "guest",
      timestamp: Date.now(),
      website,
      music,
      food,
      message
    });
	}
} satisfies Actions;

export const load = (async ({ fetch }) => {
  const response = await fetch("/api/guestbook");
  const entries = await response.json();

  return { entries };
}) satisfies PageServerLoad;
