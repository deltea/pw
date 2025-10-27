import type { PageServerLoad } from "./$types";

export const load = (async ({ fetch }) => {
  const response = await fetch("/api/playlists");
  const data = await response.json();
  const items = data.items;

  return {
    playlists: items
  };
}) satisfies PageServerLoad;
