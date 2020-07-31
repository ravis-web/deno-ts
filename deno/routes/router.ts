import { Router } from "https://deno.land/x/oak/mod.ts";
import { ObjectId, WithID } from "https://deno.land/x/mongo@v0.9.1/mod.ts";

import { getDB } from "../cluster/mongo.ts";

const router = new Router();

// ts : interface
interface ToDo {
  id?: string;
  info: string;
}

// WithId
interface TasksSchema extends WithID {
  info: string;
}

// let todoList: ToDo[] = []; // mem

// GET request
router.get("/", async (ctx) => {
  const tasks = await getDB().collection<TasksSchema>("tasks").find();
  const todos = tasks.map((task: { _id: ObjectId; info: string }) => {
    return { id: task._id.$oid, info: task.info };
  });
  ctx.response.body = { todos: todos }; // auto-json and responds
});

// POST request
router.post("/todo", async (ctx) => {
  const data = await ctx.request.body().value;
  const task: ToDo = { info: data.info };
  const id = await getDB().collection("tasks").insertOne(task);
  task.id = id.$oid; // prop : str-conversion
  ctx.response.body = { msg: "task-added", todo: task };
});

// PUT request
router.put("/todo/:taskId", async (ctx) => {
  const data = await ctx.request.body().value;
  const taskId = ctx.params.taskId!;
  await getDB()
    .collection("tasks")
    .updateOne({ _id: ObjectId(taskId) }, { $set: { info: data.info } });
  ctx.response.body = { msg: "task-updated" };
});

// DELETE request
router.delete("/todo/:taskId", async (ctx) => {
  const taskId = ctx.params.taskId!;
  await getDB()
    .collection("tasks")
    .deleteOne({ _id: ObjectId(taskId) });
  ctx.response.body = { msg: "task-deleted" };
});

export default router;
