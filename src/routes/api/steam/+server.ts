import { json, type RequestHandler } from "@sveltejs/kit";
import { PUBLIC_STEAM_API_KEY } from "$env/static/public";

export const GET: RequestHandler = async () => {
  const response = await fetch(`https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v1/?key=${PUBLIC_STEAM_API_KEY}&steamid=76561199405706388&count=1`);
  const data = await response.json();
  console.log(data);

  return json(data.response);
}
