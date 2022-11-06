import { projects } from "./projects-data";
import { todosArray } from "./todos-data";
import { dom } from "./dom";
import { todoModal } from "./modal-todo";
import { renderTodoes } from "./todo-element";
import { renderSidebar } from "./sidebar";
import {
  getProjectsFromLocalStorage,
  getTodosFromLocalStorage,
} from "./localStorage";

if (localStorage.getItem("projects") !== null) {
  projects = getProjectsFromLocalStorage();
}
if (localStorage.getItem("todos") !== null) {
  todosArray = getTodosFromLocalStorage();
}

renderSidebar(projects, todosArray);
renderTodoes(todosArray, projects);

const modalCont = document.querySelector(".modal-container");
modalCont.appendChild(todoModal(projects));
dom(projects, todosArray);
