import { dom, renderTodoes } from "./dom";
import { toDoProto } from "./todo";
import newToDo from "./modal-todo";
import formData from "./getFormData";
import todoElement from "./todo-element";
import { sidebar, renderSidebar } from "./sidebar";
import { projectProto } from "./project";

export const projects = [
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

export const todosArray = [
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

renderTodoes(todosArray);

const modalCont = document.querySelector(".modal-container");

modalCont.appendChild(newToDo(projects));

renderSidebar(projects, todosArray);
// document.getElementById("content").prepend(sidebar(projects));

dom();
