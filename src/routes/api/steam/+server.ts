import { json, type RequestHandler } from "@sveltejs/kit";
import { PUBLIC_STEAM_API_KEY } from "$env/static/public";
import type { Game } from "$lib/types";

const gamesBlacklist = ["Aseprite"];

export const GET: RequestHandler = async () => {
  const response = await fetch(`https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v1/?key=${PUBLIC_STEAM_API_KEY}&steamid=76561199405706388&count=5`);
  const data = await response.json();
  const game: Game = gamesBlacklist.includes(data.response.games[0].name) ?
    data.response.games[1] :
    data.response.games[0];

  return json(game);
}
