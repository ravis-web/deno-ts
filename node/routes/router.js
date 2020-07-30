const express = require('express');

const router = express.Router();

let todoList = [];

// GET request
router.get("/", (req, res, next) => {
  res.status(200).json({ todo: todoList });
});

// POST request
router.post("/todo", (req, res, next) => {
  const body = req.body;
  const task = { id: new Date().toISOString(), info: body.info };
  todoList.push(task);
  res.status(201).json({ msg: "task-added", todo: todoList });
});

// PUT request
router.put("/todo/:taskId", (req, res, next) => {
  const params = req.params;
  const body = req.body;
  const taskIn = todoList.findIndex((task) => task.id === params.taskId);
  if (taskIn >= 0) {
    todoList[taskIn] = { id: todoList[taskIn].id, info: body.info };
    return res.status(200).json({ msg: "task-updated", todo: todoList });
  }
  res.status(404).json({ msg: "task-not-found" });
});

// DELETE request
router.delete("/todo/:taskId", (req, res, next) => {
  const params = req.params;
  todoList = todoList.filter((task) => task.id !== params.taskId);
  res.status(200).json({ msg: "task-updated", todo: todoList });
});

module.exports = router;
