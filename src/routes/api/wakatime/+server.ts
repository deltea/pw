import { json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async () => {
  const response = await fetch("https://hackatime.hackclub.com/api/v1/users/deltea/stats");
  const data = await response.json();
  console.log(data);

  return json(data.data);
}
