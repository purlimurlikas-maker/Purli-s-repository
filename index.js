const axios = require("axios");
require("dotenv").config();

const { App } = require("@slack/bolt");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true
});

if (!process.env.SLACK_BOT_TOKEN || !process.env.SLACK_APP_TOKEN) {
  console.error("Missing SLACK_BOT_TOKEN or SLACK_APP_TOKEN environment variables.");
}

app.command("/delilah6312-pong", async ({ command, ack, respond }) => {
  console.log("/delilah6312-pong command received", { user: command.user_name, channel: command.channel_id });
  const start = Date.now();
  await ack();
  const latency = Date.now() - start;
  await respond({ text: `Pong!\nLatency: ${latency}ms` });
});

app.command("/delilah6312-help", async ({ ack, respond }) => {
  await ack();
  await respond({
    text: `Available Commands:\n/delilah6312-pong - Check bot latency\n/delilah6312-catfact - Get a cat fact\n/delilah6312-joke - Get a joke`
  });
});

app.command("/delilah6312-catfact", async ({ ack, respond, command }) => {
  console.log("/delilah6312-catfact command received", { user: command.user_name, channel: command.channel_id });
  await ack();

  try {
    const response = await axios.get("https://catfact.ninja/fact");
    await respond({ text: `Cat Fact:\n${response.data.fact}` });
  } catch (err) {
    console.error("Cat fact fetch failed", err);
    await respond({ text: "Failed to fetch a cat fact." });
  }
});

app.command("/delilah6312-joke", async ({ ack, respond }) => {
  await ack();

  try {
    const response = await axios.get("https://official-joke-api.appspot.com/random_joke");
    await respond({
      text: `${response.data.setup}\n\n${response.data.punchline}`
    });
  } catch (err) {
    await respond({ text: "Failed to fetch a joke." });
  }
});

(async () => {
  await app.start();
  console.log("bot is running!");
})();