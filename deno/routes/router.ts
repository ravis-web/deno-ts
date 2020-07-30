import { Router } from "https://deno.land/x/oak/mod.ts";

const router = new Router();

// ts : interface
interface ToDo {
  id: string;
  info: string;
}

let todoList: ToDo[] = [];

// GET request
router.get("/", (ctx) => {
  ctx.response.body = { todo: todoList }; // auto-json and responds
});

// POST request
router.post("/todo", async (ctx) => {
  const data = await ctx.request.body().value;
  const task: ToDo = { id: new Date().toISOString(), info: data.info };
  todoList.push(task);
  ctx.response.body = { msg: "task-added", todo: todoList };
});

// PUT request
router.put("/todo/:taskId", async (ctx) => {
  const data = await ctx.request.body().value;
  const taskId = ctx.params.taskId;
  const taskIn = todoList.findIndex((task) => task.id === taskId);
  todoList[taskIn] = { id: todoList[taskIn].id, info: data.info };
  ctx.response.body = { msg: "task-updated", todo: todoList };
});

// DELETE request
router.delete("/todo/:taskId", (ctx) => {
  const params = ctx.params;
  todoList = todoList.filter((task) => task.id !== params.taskId);
  ctx.response.body = { msg: "task-deleted", todo: todoList };
});

export default router;
