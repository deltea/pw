import { PUBLIC_LASTFM_API_KEY } from "$env/static/public";
import type { Post } from "$lib/types";
import type { PageServerLoad } from "./$types";

const languageBlacklist = ["gdscript3", "scene", "markdown"];

export const load = (async ({ fetch }) => {
  async function getWakatimeData() {
    try {
      const response = await fetch("/api/wakatime");
      const data = await response.json();
      const result = data.languages.filter((lang: any) => !languageBlacklist.includes(lang.name.toLowerCase()));
      return result.slice(0, 5);
    } catch (error) {
      console.error("failed to fetch hackatime data:", error);
      return [];
    }
  }

  async function getLastPlayedTrack() {
    const response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=deltea_&api_key=${PUBLIC_LASTFM_API_KEY}&format=json&limit=1`);
    const data = await response.json();
    const result = data.recenttracks.track[0];

    return {
      isNowPlaying: result["@attr"]?.nowplaying,
      track: {
        title: result.name,
        artist: result.artist["#text"],
        cover: result.image[1]["#text"]
      }
    };
  }

  async function getSteamLastPlayed() {
    const response = await fetch("/api/steam");
    const data = await response.json();
    return data.games[0];
  }

  const response = await fetch("/api/posts");
  let posts: Post[] = await response.json();
  posts = posts.filter(post => post.published);
  posts = posts.slice(0, 2);

  // get wakatime data
  const languages = await getWakatimeData();

  // get last.fm track
  const res = await getLastPlayedTrack();
  const track = res.track;
  const isNowPlaying = res.isNowPlaying;

  // get steam last played game
  const game = await getSteamLastPlayed();

  return {
    posts,
    languages,
    track,
    isNowPlaying,
    game
  };
}) satisfies PageServerLoad;
