import app from "./app"; //Hono App
//bun server
const server = Bun.serve({
  port: 3000,
  fetch: app.fetch, //all HTTP requests are handled by Hono
});

console.log(`Listening on ${server.url}`);
