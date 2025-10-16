import type { Post } from "$lib/types";
import type { PageServerLoad } from "./$types";

export const load = (async ({ fetch }) => {
  const response = await fetch("/api/posts");
  let posts: Post[] = await response.json();
  posts = posts.filter(post => post.published);
  posts = posts.slice(0, 2);

  // get wakatime data
  const languages = await fetch("/api/wakatime").then(res => res.json()).catch(() => []);

  // get last.fm track
  const lastfm = await fetch("/api/lastfm").then(res => res.json()).catch(() => null);
  const track = lastfm.track;
  const isNowPlaying = lastfm.isNowPlaying;

  // get steam last played game
  const game = await fetch("/api/steam").then(res => res.json()).catch(() => null);

  return {
    posts,
    languages,
    track,
    isNowPlaying,
    game
  };
}) satisfies PageServerLoad;
