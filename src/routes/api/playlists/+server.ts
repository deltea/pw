import { PUBLIC_YOUTUBE_API_KEY } from "$env/static/public";
import { json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async () => {
  const channelId = "UCasf5cSzS1HMOjmyGVWlsAw";
  let url = `https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId=${channelId}&maxResults=50&key=${PUBLIC_YOUTUBE_API_KEY}`;
  const playlists: any[] = [];

  while (url) {
    const response = await fetch(url);
    const data = await response.json();

    if (data.items) playlists.push(...data.items);
    if (data.nextPageToken) {
      url = `https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId=${channelId}&maxResults=50&pageToken=${data.nextPageToken}&key=${PUBLIC_YOUTUBE_API_KEY}`;
    } else {
      url = "";
    }
  }

  return json(playlists);
}
