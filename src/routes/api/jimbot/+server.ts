import { SLACK_BOT_TOKEN, SLACK_USER_TOKEN } from "$env/static/private";
import { redis } from "$lib/redis";
import { formatUnixDate } from "$lib/utils";
import { json, type RequestHandler } from "@sveltejs/kit";

const DEV_MODE = false;
const USER_ID = "U08SS7Z7LJD";
const TESTING_PING_GROUP_ID = "S0ALB7AGUNB";
const PING_GROUP_ID = "S0AM5FJCTMF";

export const POST: RequestHandler = async ({ request }) => {
  const { event, event_time } = await request.json();
  const date = formatUnixDate(event_time);

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
        `:jimbospin: journal entry created for *${date}*!`,
        ` ↳ _check out the diary <https://deltea.space/diary|here>!_`
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

  // add the uploaded images
  const files = [];
  if (event.files) {
    for (const file of event.files) {
      if (!file.mimetype.startsWith("image/")) continue;
      // make the image public and get the public url
      const response = await fetch("https://slack.com/api/files.sharedPublicURL", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${SLACK_USER_TOKEN}`
        },
        body: JSON.stringify({ file: file.id })
      });
      const data = await response.json();
      files.push({
        name: file.name,
        url: data.file.url_private + `?pub_secret=${data.file.permalink_public.split("-").slice(-1)[0]}`
      });
    }
  }

  // post the journal entry
  const entry = {
    timestamp: event_time,
    body: event.text.slice(pingMention.length).trim(),
    url: `https://hackclub.slack.com/archives/${event.channel}/p${event.thread_ts ? event.thread_ts.replace(".", "") : event.ts.replace(".", "")}`,
    files
  }
  await redis.lpush("journal", entry);

  return json("OK", { status: 200 });
}
