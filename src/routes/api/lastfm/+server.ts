import { json, type RequestHandler } from "@sveltejs/kit";
import { PUBLIC_LASTFM_API_KEY } from "$env/static/public";

export const GET: RequestHandler = async () => {
  const response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=deltea_&api_key=${PUBLIC_LASTFM_API_KEY}&format=json&limit=1`);
  const data = await response.json();
  const result = data.recenttracks.track[0];

  return json({
    isNowPlaying: result["@attr"]?.nowplaying,
    track: {
      title: result.name,
      artist: result.artist["#text"],
      cover: result.image[1]["#text"]
    }
  });
}
