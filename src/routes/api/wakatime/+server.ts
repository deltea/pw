import type { WakatimeLanguage } from "$lib/types";
import { json, type RequestHandler } from "@sveltejs/kit";

const languageBlacklist = ["gdscript3", "scene", "markdown"];

export const GET: RequestHandler = async () => {
  const response = await fetch("https://hackatime.hackclub.com/api/v1/users/deltea/stats");
  const data = await response.json();
  const result: WakatimeLanguage[] = data.data.languages.filter((lang: WakatimeLanguage) => {
    return !languageBlacklist.includes(lang.name.toLowerCase());
  });

  return json(result.slice(0, 5));
}
