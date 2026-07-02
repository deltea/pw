import { PUBLIC_YOUTUBE_API_KEY } from "$env/static/public";
import { json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async () => {
  const channelId = "UCasf5cSzS1HMOjmyGVWlsAw";
  const response = await fetch(`https://www.googleapis.com/youtube/v3/subscriptions?part=snippet&channelId=${channelId}&maxResults=50&key=${PUBLIC_YOUTUBE_API_KEY}`);
  const data = await response.json();

  return json(data.items);
}
