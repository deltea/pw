import type { PageServerLoad } from "./$types";
import type { Actions } from "./$types";
import type { GuestbookEntry } from "$lib/types";
import { redis } from "$lib/redis";
import { json } from "@sveltejs/kit";

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

export const load = (async () => {
  const entries: GuestbookEntry[] = await redis.lrange("guestbook", 0, -1);

  if (entries === null) {
    return json({ error: "guestbook not found" }, { status: 404 });
  }

  return { entries };
}) satisfies PageServerLoad;
