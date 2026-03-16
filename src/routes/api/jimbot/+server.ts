import { SLACK_BOT_TOKEN } from "$env/static/private";
import { json, type RequestHandler } from "@sveltejs/kit";

const DEV_MODE = false;
const USER_ID = "U08SS7Z7LJD";
const TESTING_PING_GROUP_ID = "S0ALB7AGUNB";
const PING_GROUP_ID = "S0AM5FJCTMF";

export const POST: RequestHandler = async ({ request }) => {
  const { event, event_time } = await request.json();
  const date = new Date(event_time * 1000);
  const formattedDate = date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" }).toLowerCase();

  const pingMention = `<!subteam^${DEV_MODE ? TESTING_PING_GROUP_ID : PING_GROUP_ID}>`;
  if (event.user !== USER_ID || !event.text.startsWith(pingMention)) {
    return json("OK", { status: 200 });
  }

  // post the slack confirmation message
  await fetch("https://slack.com/api/chat.postMessage", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${SLACK_BOT_TOKEN}`
    },
    body: JSON.stringify({
      channel: event.channel,
      text: [
        `:jimbospin: journal entry created for *${formattedDate}*!`,
        // ` ↳ _check it out <https://deltea.space/journal/${date.toISOString().slice(0, 10)}|here>!_`
      ].join("\n"),
      thread_ts: event.thread_ts || event.ts
    })
  });

  // add a reaction to the original message
  await fetch("https://slack.com/api/reactions.add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${SLACK_BOT_TOKEN}`
    },
    body: JSON.stringify({
      channel: event.channel,
      name: "bookmark",
      timestamp: event.thread_ts || event.ts
    })
  });

  // post the journal entry
  console.log("journal entry: ", event.text.slice(pingMention.length).trim());

  return json("OK", { status: 200 });
}
