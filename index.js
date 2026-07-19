const axios = require("axios");
require("dotenv").config();

const { App } = require("@slack/bolt");
// Initialize the Bolt App (socket mode)
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true,
});

const { getDuckImageUrl } = require("./duckPicture");

async function sendSlashResponse(responseUrl, payload) {
  try {
    await axios.post(responseUrl, payload, { timeout: 5000 });
  } catch (err) {
    console.warn("sendSlashResponse failed", err && err.toString ? err.toString() : err);
  }
}
const jellybellyFacts = [
  "Jelly Belly beans were the first jelly beans in space, sent on the 1983 Challenger mission.",
  "Each Jelly Belly bean contains just 4 calories.",
  "Jelly Belly started as the Goelitz Confectionery Company in the 1890s.",
  "Very Cherry has been one of Jelly Belly's most popular flavors for decades.",
  "Jelly Belly produces more than 100 different jelly bean flavors today.",
  "It takes 7 to 21 days to make a single jelly bean, involving a complex and multi-step process.",
  "The founder of Jelly Belly, David Klein, was also notable for creating a new type of jelly bean with flavored insides and outer shells, using unconventional flavors like watermelon, licorice, and root beer.",
  "The origin of jelly beans may be traced back to Turkish Delights from Turkey.",
  "Jelly Belly beans are known for their flavored centers and shells, smaller size, more intense flavor, and exotic flavors.",
  "The term 'jelly-bean' was used in the 1910s and 1920s as slang for a stylish but otherwise unremarkable man.",
  "The company has evolved from its original eight flavors in 1976 to more than 100 over the years. Current popular flavors include Buttered Popcorn, Very Cherry, Cotton Candy, Watermelon, and Green Apple.",
  "In 2001, the company officially became the Jelly Belly Candy Company, reflecting its most popular product.",
  "The chairman of Jelly Belly came under fire in 2013 for donating to an anti-transgender rights fund.",
  "Jelly Belly introduced Sport Beans for athletes, filled with carbohydrates, electrolytes, and vitamins. However, they faced a lawsuit over labeling sugar as 'evaporated cane juice'.",
  "In 2014, Jelly Belly released beer-flavored beans, which sparked controversy among parents concerned about encouraging underage drinking.",
  "The company offers official jelly bean 'recipes,' combining different flavors to create new tastes like tres leches cake or a tequila sunrise.",
  "In 2020, the original Mr. Jelly Belly started a treasure hunt similar to Willy Wonka, offering a chance to win a candy factory.",
  "Jelly Belly also produces a line of custom air fresheners in various jelly bean scents.",
  "Jelly Belly beans have a shelf life of one year.",
  "The BeanBoozled line features pairs of jelly beans with one delicious and one disgusting flavor, challenging consumers to distinguish between them.",
  "'Belly Flops,' imperfectly shaped jelly beans, are sold at a lower price but taste the same as regular beans.",
  "Jelly Belly's California and Wisconsin locations attract about 600,000 visitors each year for tours.",
  "Public tours are available at two locations: Fairfield, California (factory tour) and Pleasant Prairie, Wisconsin (warehouse tour and train ride).",
  "Jelly Belly offers 50 official flavors and 66 additional flavors, including rookie, sour, sugar-free, and unique options.",
  "In addition to jelly beans, Jelly Belly Candy Company produces 74 other gourmet confections.",
  "The BeanBoozled line features 20 flavors - 10 pleasant and 10 gag-inducing.",
  "Jelly Belly beans eaten in a year could circle the earth five times.",
  "Around 5 billion Jelly Belly beans are sold during Easter.",
  "Jelly Belly was the first company to add flavors to both the shell and the center of the bean, leading to their signature gourmet blends.",
  "The main ingredients are sugar, corn syrup, corn starch, and confectioner's glaze, with natural flavors incorporated when possible.",
  "Jelly Belly's roots began with candy corn production by the Goelitz Confectionery Company, founded in 1869.",
  "The initial Jelly Belly flavors included root beer, green apple, licorice, cream soda, lemon, tangerine, very cherry, and grape.",
  "Jelly Belly is known for introducing unique flavors, including the BeanBoozled Fiery Five Challenge with varying levels of spiciness.",
  "Over the years, some flavors have been discontinued, including caramel apple, grape jelly, and peanut butter.",
  "Jelly Belly provides seasonal assortments, like the spring mix for Easter and Monster Mash blend for Halloween.",
  "They have collaborated with brands like Dr. Pepper, A&W Root Beer, Snapple, Tabasco, Krispy Kreme, and Coldstone Creamery.",
  "Jelly Belly beans are vegetarian but not vegan, as they contain beeswax and shellac. They are also dairy-free, gluten-free, and OU Kosher certified.",
  "'Belly Flops' are imperfectly shaped beans sold at a lower price, and the company also offers a bargain outlet for out-of-season products.",
  "Every Jelly Belly bean is marked with the world-famous Jelly Belly logo and has a distinctive shape.",
  "The flavor in Jelly Belly beans is packed into both the chewy center and the polished shell.",
  "In 2010, Jelly Belly set the Guinness World Record for the Largest Candy Art. The art piece made in China was 39 feet long and used approximately 617,000 Jelly Belly beans.",
  "Jelly Belly donated 288,000 beans in 47 flavors for the world’s first jelly bean stop-motion animation music video 'In Your Arms' by Kina Grannis, released in November 2011.",
  "President Ronald Reagan was a well-known fan of Jelly Belly, often snacking on them during cabinet meetings.",
  "Reagan's favorite Jelly Belly flavor was licorice, which may have been influenced by his attempt to quit pipe-smoking.",
  "Despite its focus on jelly beans, Jelly Belly still produces candy corn, a nod to its historical roots.",
  "Jelly Belly offers a variety of other candies, including chewy fish, gummi bears, gumdrops, Jordan almonds, and even hot chocolate bombs.",
  "Jelly Belly beans are used to enhance themed celebrations, such as weddings, baby showers, New Year's Eve, and federal holidays with specially curated assortments.",
  "Jelly Belly offers special flavors and blends for various holidays, including Christmas, Valentine's Day, and Halloween.",
  "Ronald Reagan famously used Jelly Belly beans to quit smoking and even had a portrait made from Jelly Belly beans at the Reagan Presidential Library.",
  "Jelly Belly's range extends beyond jelly beans, including chewy fish, gummi bears, gumdrops, Jordan almonds, and hot chocolate bombs.",
  "The Jelly Belly Factory features an art gallery with jelly bean mosaics of famous artworks and celebrities.",
  "Visitors on the Jelly Belly factory tour must wear silly sailor cap hats with the Jelly Belly logo.",
  "Jelly Belly holds the Guinness World Record for the largest candy art, a 59-foot long piece made with over 600,000 beans.",
  "Jelly Belly pioneered the concept of combining bean flavors to create new tastes, like Lemon + Cotton Candy = Pink Lemonade.",
  "Easter is the biggest season for Jelly Belly consumption, followed by Christmas.",
  "Jelly Belly gives tours on 722 days combined at their two locations.",
  "The BeanBoozled line features flavors like sriracha, jalapeño, cayenne, habañero, and Carolina Reaper.",
  "Collaborations include Krispy Kreme, Fruit Loop, and 'unicorn mix' flavors.",
  "Jelly Belly offers vitamin, electrolyte, and carbohydrate-infused Sports Beans, even with caffeine.",
  "Flavors like caramel apple, grape jelly, and peanut butter have been discontinued.",
  "The beans are vegetarian, dairy-free, gluten-free, and OU Kosher, but not vegan.",
  "'Belly Flops' are irregular beans sold at a discount, and bulk buys are available at places like Costco.",
  "Reagan's fixation with Jelly Belly began as a way to overcome his pipe-smoking habit.",
  "Despite its jelly bean focus, Jelly Belly still produces candy corn.",
  "Jelly Belly beans can be used for themed parties and events, offering a wide array of colors and flavors.",
  "Guests on factory tours can sample Jelly Belly jelly beans during their visit.",
  "Since the 1800s, candy technology has evolved significantly, with Jelly Belly at the forefront of innovation in jelly bean production.",
  "In the early 20th century, 'jelly-bean' was slang for a stylish but superficial man.",
  "Jelly Belly beans were a staple in the Reagan White House, and a blueberry flavor was created specifically for his 1980 inauguration.",
  "Jelly Belly expanded from eight original flavors in 1976 to over 100, including partnerships with brands for unique flavorrs.",
  "In 2001, the Goelitz family companies merged to form the Jelly Belly Candy Company.",
  "Jelly Belly faced a lawsuit over the marketing of Sport Beans, which are infused with vitamins and electrolytes.",
  "The company created a line called Recipe Mix, combining two flavors in one bean.",
  "Jelly Belly offers holiday-themed gift boxes with flavors like eggnog, candy cane, and pumpkin pie.",
  "Jelly Belly has collaborated with clothing and fashion brands to create unique promotional items.",
  "The company has even partnered with Reebok for sneakers and Sally Hansen for candy-coated nail polish.",
  "Jelly Belly Factory hosts an art gallery with jelly bean mosaics of celebrities and famous artworks.",
  "The factory tour includes a requirement to wear Jelly Belly logo hats and offers fun photo opportunities.",
  "Jelly Belly beans do not use gelatin but include beeswax and shellac, making them non-vegan.",
  "The brand offers Extreme Sports Beans containing caffeine for an energy boost.",
  "Some BeanBoozled flavors, like toothpaste and liver and onions, are available for a limited time.",
  "Jelly Belly beans have a shelf life of one year, and consumers are advised to use their senses to determine if they have spoiled.",
  "A portrait of Ronald Reagan made entirely out of Jelly Belly beans is displayed at the Reagan Presidential Library.",
  "Visitors to the Reagan Library can also see a vintage candy dish from Air Force One, typically filled with Jelly Belly beans.",
  "Jelly Belly offers sugar-free, zero-calorie sparkling water in fun flavors like orange sherbet.",
  "For weddings, Jelly Belly offers a white and glamorous blend of flavors like cream soda, vanilla, and coconut.",
  "Jelly Belly beans are used as decorative and flavorful toppers for cakes and cupcakes on special occasions.",
  "Special assortments like the spring mix for Easter and Monster Mash blend for Halloween are offered seasonally.",
  "The company's 39-foot long candy art piece, created with over 600,000 beans, holds a world record.",
  "Jelly Belly contributed to the creation of a pioneering stop-motion animation music video using their beans.",
  "Visitors on Jelly Belly factory tours have the opportunity to sample various flavors during their visit.",
  "The Jelly Belly Factory in Fairfield, California, offers tours where visitors can see the production process, view jelly bean mosaics, and purchase Jelly Belly products in the gift shop."
];

app.command("/delilah6312-jellybelly", async ({ ack, respond, command }) => {
  ack();
  const randomFact = jellybellyFacts[Math.floor(Math.random() * jellybellyFacts.length)];
  try {
    await respond({ response_type: "ephemeral", text: `Jelly Belly fact:\n${randomFact}` });
  } catch (err) {
    console.warn('respond() failed for jellybelly, falling back to response_url', err && err.toString ? err.toString() : err);
    await sendSlashResponse(command.response_url, { text: `Jelly Belly fact:\n${randomFact}` });
  }
});

// Pong
app.command("/delilah6312-pong", async ({ ack, respond }) => {
  ack();
  await respond({ response_type: "ephemeral", text: "Pong!" });
});

// Help
app.command("/delilah6312-help", async ({ ack, respond }) => {
  ack();
  const helpText = `Available commands:\n` +
    `/delilah6312-pong - simple pong reply\n` +
    `/delilah6312-help - this help message\n` +
    `/delilah6312-catfact - random cat fact\n` +
    `/delilah6312-joke - random joke\n` +
    `/delilah6312-dadjoke - dad joke\n` +
    `/delilah6312-duckpicture - random duck image\n` +
    `/delilah6312-jellybelly - jelly belly fact`;
  await respond({ response_type: "ephemeral", text: helpText });
});

// Cat fact
app.command("/delilah6312-catfact", async ({ ack, respond }) => {
  ack();
  try {
    const res = await axios.get("https://catfact.ninja/fact", { timeout: 5000 });
    const fact = res.data && res.data.fact ? res.data.fact : "Couldn't fetch a cat fact.";
    await respond({ response_type: "ephemeral", text: fact });
  } catch (err) {
    await respond({ response_type: "ephemeral", text: "Failed to fetch cat fact." });
  }
});

// Joke
app.command("/delilah6312-joke", async ({ ack, respond }) => {
  ack();
  try {
    const res = await axios.get("https://official-joke-api.appspot.com/random_joke", { timeout: 5000 });
    const joke = res.data && res.data.setup ? `${res.data.setup} — ${res.data.punchline}` : "Couldn't fetch a joke.";
    await respond({ response_type: "ephemeral", text: joke });
  } catch (err) {
    await respond({ response_type: "ephemeral", text: "Failed to fetch a joke." });
  }
});

// Dad joke
app.command("/delilah6312-dadjoke", async ({ ack, respond }) => {
  ack();
  try {
    const res = await axios.get("https://icanhazdadjoke.com/", { headers: { Accept: "application/json" }, timeout: 5000 });
    const joke = res.data && res.data.joke ? res.data.joke : "Couldn't fetch a dad joke.";
    await respond({ response_type: "ephemeral", text: joke });
  } catch (err) {
    await respond({ response_type: "ephemeral", text: "Failed to fetch a dad joke." });
  }
});

// Duck picture - uses response_url to avoid not_in_channel
app.command("/delilah6312-duckpicture", async ({ ack, command }) => {
  ack();
  let imageUrl = null;
  try {
    // Try random-d.uk
    try {
      const r = await axios.get(`https://random-d.uk/api/random?cachebuster=${Math.random()}`, { timeout: 7000 });
      if (r.data && r.data.url) imageUrl = r.data.url;
    } catch (e) {
      // continue to next
    }

    // Try some-random-api.ml
    if (!imageUrl) {
      try {
        const r2 = await axios.get("https://some-random-api.ml/img/duck", { timeout: 7000 });
        if (r2.data && r2.data.link) imageUrl = r2.data.link;
      } catch (e) {}
    }

    // Final fallback: DuckDuckGo instant answer JSON
    if (!imageUrl) {
      try {
        const dd = await axios.get("https://api.duckduckgo.com/", { params: { q: "duck", format: "json" }, timeout: 10000 });
        imageUrl = getDuckImageUrl(dd.data);
      } catch (err) {
        console.warn("DuckDuckGo fallback failed", err && err.toString ? err.toString() : err);
      }
    }

    if (!imageUrl) {
      await sendSlashResponse(command.response_url, { text: "I couldn't find a duck picture right now." });
      return;
    }

    await sendSlashResponse(command.response_url, {
      text: "Duck Picture",
      blocks: [{ type: "image", image_url: imageUrl, alt_text: "Duck picture" }]
    });
  } catch (err) {
    console.error("Duck picture fetch failed", err);
    await sendSlashResponse(command.response_url, { text: "Failed to fetch a duck picture." });
  }
});

(async () => {
  await app.start();
  console.log("bot is running!");
})();



