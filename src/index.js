import { dom } from "./dom";
import { toDoProto } from "./todo";
import { todoModal } from "./modal-todo";
import { renderTodoes } from "./todo-element";
import { renderSidebar } from "./sidebar";
import { projectProto } from "./project";
import {
  getProjectsFromLocalStorage,
  getTodosFromLocalStorage,
} from "./localStorage";

export let projects = [
  {
    name: "Default",
    id: "default",
    contents: [],
  },
  {
    name: "Learn everything",
    id: "justDoIt",
    contents: [],
  },
];

export let todosArray = [
  {
    title: "Kill Batman",
    desc: "none",
    date: "2021-12-08",
    priority: "mid",
    completed: false,
    project: "default",
  },
  {
    title: "Save Batman",
    desc: "none",
    date: "2022-12-08",
    priority: "low",
    completed: false,
    project: "justDoIt",
  },
  {
    title: "Become Batman",
    desc: "none",
    date: "2023-12-08",
    priority: "high",
    completed: true,
    project: "justDoIt",
  },
  {
    title: "Stop being Batman",
    desc: "none",
    date: "2024-12-08",
    priority: "low",
    completed: false,
    project: "default",
  },
];

projects.forEach((item) => Object.assign(item, projectProto));

todosArray.forEach((item) => Object.assign(item, toDoProto));
if (localStorage.getItem("projects") !== null) {
  projects = getProjectsFromLocalStorage();
}
if (localStorage.getItem("todos") !== null) {
  todosArray = getTodosFromLocalStorage();
}

renderSidebar(projects, todosArray);
renderTodoes(todosArray);

const modalCont = document.querySelector(".modal-container");
modalCont.appendChild(todoModal(projects));
dom();
