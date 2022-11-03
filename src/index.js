import { dom, renderTodoes } from "./dom";
import { createToDo, toDoProto } from "./todo";
import shit from "./modal-todo";
import formData from "./getFormData";
import todoElement from "./todo-element";
import { sidebar } from "./sidebar";
import { nanoid } from "nanoid";

export const projects = [
  {
    name: "Default",
    id: "default",
  },
  {
    name: "Learn everything",
    id: nanoid(8),
  },
];

export const todosArray = [
  {
    title: "kill batman",
    desc: "none",
    date: "2022-12-08",
    priority: "mid",
    completed: false,
    project: "id2342",
  },
  {
    title: "kill batman",
    desc: "none",
    date: "2022-12-08",
    priority: "low",
    completed: false,
    project: "id2342",
  },
  {
    title: "kill batman",
    desc: "none",
    date: "2022-12-08",
    priority: "high",
    completed: true,
    project: "id2342",
  },
  {
    title: "kill batman",
    desc: "none",
    date: "2022-12-08",
    priority: "low",
    completed: false,
    project: "id2342",
  },
];

todosArray.forEach((item) => Object.assign(item, toDoProto));

console.log(todosArray);
renderTodoes(todosArray);

const modalCont = document.querySelector(".modal-container");

modalCont.appendChild(shit(projects));

document.getElementById("content").prepend(sidebar(projects));

dom();
