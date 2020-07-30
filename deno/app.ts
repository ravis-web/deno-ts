/* --- Deno : REST APIs --- */

import { Application } from "https://deno.land/x/oak/mod.ts";

import router from "./routes/router.ts";

const app = new Application();

app.use(async (ctx, next) => {
  console.log("middleware");
  await next(); // waits for response
});

// oak : reg routes
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 5000 });
console.log("server-start");
