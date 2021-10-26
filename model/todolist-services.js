const fs = require('fs/promises');
const path = require('path');

const TODOLIST_PATH = path.resolve('todolist.json');

const getTasks = async () => fs.readFile(TODOLIST_PATH, 'utf-8');

const addTask = async (task) => {
  const todoList = JSON.parse(await getTasks());
  todoList.push(task);
  await fs.writeFile(TODOLIST_PATH, JSON.stringify(todoList));
};

const updateTask = async (taskObj) => {
  const todoList = JSON.parse(await getTasks());
  const newListTasks = todoList.map((task) => (task.id === taskObj.id ? taskObj : task));
  await fs.writeFile(TODOLIST_PATH, JSON.stringify(newListTasks));
};

module.exports = {
  getTasks,
  addTask,
  updateTask,
};
