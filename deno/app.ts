/* --- Deno : REST APIs --- */

import { Application } from "https://deno.land/x/oak/mod.ts";

import { Connect } from "./cluster/mongo.ts";

import router from "./routes/router.ts";

Connect(); // Mongo-Connect

const app = new Application();

app.use(async (ctx, next) => {
  console.log("middleware");
  await next(); // waits for response
});

/* --- CORS : Allow --- */
app.use(async (ctx, next) => {
  ctx.response.headers.set("Access-Control-Allow-Origin", "*");
  ctx.response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  ctx.response.headers.set("Access-Control-Allow-Headers", "Content-Type");
  if (ctx.request.method === "OPTIONS") ctx.response.status = 200;
  await next();
});

// oak : reg routes
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 5000 });
console.log("server-start");
