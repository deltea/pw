import { json, type RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request }) => {
  const { challenge } = await request.json();
  console.log(challenge);

  return json({ challenge }, { status: 200 });
}
