import { KV_REST_API_URL, KV_REST_API_TOKEN } from "$env/static/private";
import { json } from "@sveltejs/kit";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: KV_REST_API_URL || "",
  token: KV_REST_API_TOKEN || ""
});

export const GET = async () => {
  const result = await redis.lrange("guestbook", 0, -1);

  if (result === null) {
    return json({ error: "guestbook not found" }, { status: 404 });
  }

  return json(result);
}
