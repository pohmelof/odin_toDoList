import { todosArray, projects } from "./index";
import { todoModal } from "./modal-todo";
import { createToDo } from "./todo";
import formData from "./getFormData";
import { renderTodoes } from "./todo-element";
import { saveTodosToLocalStorage } from "./localStorage";

export const dom = () => {
  //   night mode toggle
  _toggleNightMode();
  //   new todo
  newTodo(projects, todosArray);
  //   button to close modal
  closeModalBtn();
};

function _toggleNightMode() {
  const modeBtn = document.querySelector(".mode");
  const toggle = document.querySelector(".toggle");

  modeBtn.addEventListener("click", () => {
    toggle.classList.toggle("on");
    document.body.classList.toggle("dark");
  });
}

// close modal button
export const modalCont = document.querySelector(".modal-container");
const overlay = document.querySelector(".overlay");

export function closeModalBtn() {
  const closeModalBtn = document.querySelector(".close");
  closeModalBtn.addEventListener("click", () => {
    hideModal();
  });
  overlay.addEventListener("click", () => {
    hideModal();
  });
}

export function hideModal() {
  modalCont.classList.add("modal-hidden");
  overlay.classList.add("overlay-hidden");
}

export function showModal() {
  modalCont.classList.remove("modal-hidden");
  overlay.classList.remove("overlay-hidden");
}

// new todo button
function addTodo(projectsArr, todoArr) {
  const submitForm = document.querySelector("form");

  submitForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const todo = createToDo(formData());
    todoArr.push(todo);
    saveTodosToLocalStorage(todoArr);
    // if project selected before adding new todo, render that project contents only
    const selectBtn = [...document.querySelectorAll(".project-select")].filter(
      (item) => item.classList.contains("filter-active")
    );
    if (selectBtn.length > 0) {
      const index = selectBtn[0].dataset.index;
      projectsArr[index].updateProjectContents(todoArr);
      renderTodoes(projectsArr[index].contents);
      submitForm.reset();
      hideModal();
    } else {
      renderTodoes(todoArr);
      submitForm.reset();
      hideModal();
    }
  });
}

function newTodo(projectsArr, todoArr) {
  const newTodoBtn = document.querySelector(".new-todo");
  newTodoBtn.addEventListener("click", (e) => {
    modalCont.innerHTML = "";
    modalCont.appendChild(todoModal(projectsArr));
    // if project selected before adding new todo, automatically select its value
    const selectBtn = [...document.querySelectorAll(".project-select")].filter(
      (item) => item.classList.contains("filter-active")
    );
    const projectSelectEl = document.getElementById("project");
    if (selectBtn.length > 0) {
      projectSelectEl.value = selectBtn[0].dataset.id;
    }
    addTodo(projectsArr, todoArr);
    closeModalBtn();
    showModal();
  });
}
