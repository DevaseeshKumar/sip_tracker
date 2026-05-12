const redis = require('redis');

const client = redis.createClient({
  url: "redis://localhost:6379",
});

client.on('error', (err) => {
  console.error('Redis Client Error', err);
});

async function main() {
  await client.connect();
  await client.set("name", "Devaseesh", { EX: 1 });
  console.log(`Data available: ${await client.get("name")}`);
}

main();

setInterval(async () => {
  console.log(`Data available: ${await client.get("name")}`);
}, 3000);

module.exports = client;