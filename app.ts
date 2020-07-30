/* --- Deno : Basics --- */

// import { serve } from "https://deno.land/std/http/server.ts";

import { Application } from "https://deno.land/x/oak/mod.ts";

const app = new Application();

app.use((ctx) => {
  ctx.response.body = "Hello Oak";
});

await app.listen({ port: 5000 });

/* --- http server ---
const server = serve({ port: 5000 });

for await (const req of server) {
  req.respond({ body: "Hello Deno" });
}
*/

/* --- file system ---
const input = "file-system with deno";

const encT = new TextEncoder();
const data = encT.encode(input);

Deno.writeFile("input-deno.txt", data).then(() => {
  console.log("write-success");
});
*/

/* --- first exec ---
let message: string;
message = "hello deno";
console.log(message);
*/
