import { redis } from "$lib/redis";
import { json } from "@sveltejs/kit";

export const GET = async () => {
  const result = await redis.lrange("guestbook", 0, -1);

  if (result === null) {
    return json({ error: "guestbook not found" }, { status: 404 });
  }

  return json(result);
}
