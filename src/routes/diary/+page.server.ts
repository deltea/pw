import { redis } from "$lib/redis";
import type { DiaryEntry } from "$lib/types";
import type { PageServerLoad } from "./$types";

export const load = (async () => {
  const entries: DiaryEntry[] = await redis.lrange("journal", 0, -1);

  if (entries === null) {
    return { entries: [] };
  }

  return { entries };
}) satisfies PageServerLoad;
