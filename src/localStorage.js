import { projectProto } from "./project";
import { toDoProto } from "./todo";

function saveProjectsToLocalStorage(projectsArr) {
  localStorage.setItem("projects", JSON.stringify(projectsArr));
}
function saveTodosToLocalStorage(todoArr) {
  localStorage.setItem("todos", JSON.stringify(todoArr));
}

function getProjectsFromLocalStorage() {
  const projects = JSON.parse(localStorage.getItem("projects"));
  projects.forEach((item) => Object.assign(item, projectProto));
  return projects;
}
function getTodosFromLocalStorage() {
  const todos = JSON.parse(localStorage.getItem("todos"));
  todos.forEach((item) => Object.assign(item, toDoProto));
  return todos;
}

export {
  saveProjectsToLocalStorage,
  saveTodosToLocalStorage,
  getProjectsFromLocalStorage,
  getTodosFromLocalStorage,
};
