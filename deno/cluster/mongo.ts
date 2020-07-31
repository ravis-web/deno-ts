import { MongoClient, Database } from "https://deno.land/x/mongo@v0.9.1/mod.ts";

import cluster from "./key.ts";

let db: Database; // type-defn

export function Connect() {
  const client = new MongoClient();
  client.connectWithUri(cluster);

  db = client.database("todo-app");
}

export function getDB() {
  return db;
}
