import type { PageServerLoad } from "./$types";

export const load = (async ({ fetch }) => {
  const response = await fetch("/api/playlists");
  const data = await response.json();
  console.log(data);
  const filtered = data.filter((item: any) => /- Mix/.test(item.snippet.title));
  const playlists = filtered.map((item: any) => {
    const num = item.snippet.title.match(/Mix (\d+)/);
    const title = item.snippet.title.replace(/ - Mix \d+/, "").trim();

    return {
      num: parseInt(num[1], 10),
      title,
      date: new Date(item.snippet.publishedAt).toString(),
      url: `https://music.youtube.com/playlist?list=${item.id}`,
    }
  });

  return { playlists };
}) satisfies PageServerLoad;
