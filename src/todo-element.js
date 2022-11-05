import { todosArray, projects } from "./index";
import { closeModalBtn, showModal, hideModal, modalCont } from "./dom";
import { filterTodos } from "./sidebar";
import { todoModal } from "./modal-todo";
import { detailsModal } from "./details";
import formData from "./getFormData";
import { saveTodosToLocalStorage } from "./localStorage";

// create todoElement with data-index attribute
function todoElement(obj, index) {
  const todoItem = document.createElement("div");
  todoItem.classList.add("todo-item");
  if (obj.completed) {
    todoItem.classList.add("todo-completed");
  }
  const checkIcon = obj.completed ? '<i class="fa-solid fa-check"></i>' : "";
  todoItem.innerHTML = `
                    <div class="importance ${obj.priority}"></div>
                    <div class="checkmark" data-index="${index}">${checkIcon}</div>
                    <div class="todo-desc">${obj.title}</div>
                    <button class="details" data-index="${index}">Details</button>
                    <div class="due-date">${obj.date}</div>
                    <button class="edit" data-index="${index}">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button class="delete" data-index="${index}">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                    `;

  return todoItem;
}

// filter todoes if they are changed and filter button is pressed
function _filterOnChange(arr) {
  const filterBtns = [...document.querySelectorAll(".filter-btn")];
  //   get button with active class
  const activeBtn = filterBtns.filter((item) =>
    item.classList.contains("filter-active")
  )[0];
  switch (activeBtn.dataset.filter) {
    case "completed":
      filterTodos(arr, "completed");
      break;
    case "today":
      filterTodos(arr, "today");
      break;
    case "month":
      filterTodos(arr, "month");
      break;
    case "important":
      filterTodos(arr, "important");
      break;
  }
}

//populate modal with info to edit it
function _populateModal(obj) {
  const title = document.getElementById("title");
  const desc = document.getElementById("desc");
  const date = document.getElementById("date");
  const priority = document.getElementById("priority");
  const project = document.getElementById("project");

  title.value = obj.title;
  desc.value = obj.desc;
  date.value = obj.date;
  priority.value = obj.priority;
  project.value = obj.project;
}

//   todo buttons functionality
function _addTodoButtons(todoArr) {
  const checkmarkBtns = document.querySelectorAll(".checkmark");
  const detailsBtns = document.querySelectorAll(".details");
  const editBtns = document.querySelectorAll(".edit");
  const deleteBtns = document.querySelectorAll(".delete");

  checkmarkBtns.forEach((item) =>
    item.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      if (e.target.innerHTML === "") {
        e.target.innerHTML = `<i class="fa-solid fa-check"></i>`;
        e.target.parentNode.classList.add("todo-completed");
        todoArr[index].complete();
        saveTodosToLocalStorage(todoArr);
      } else {
        e.target.innerHTML = "";
        e.target.parentNode.classList.remove("todo-completed");
        todoArr[index].complete();
        saveTodosToLocalStorage(todoArr);
        _filterOnChange(todoArr);
      }
    })
  );

  detailsBtns.forEach((item) =>
    item.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      modalCont.innerHTML = "";
      modalCont.appendChild(detailsModal(todoArr[index]));
      showModal();
      closeModalBtn();
    })
  );

  editBtns.forEach((item) =>
    item.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      modalCont.innerHTML = "";
      const edit = true;
      modalCont.appendChild(todoModal(projects, index, edit));
      const submitForm = document.querySelector("form");

      submitForm.addEventListener("submit", (e) => {
        e.preventDefault();
        todoArr[index].edit(formData());
        renderTodoes(todoArr);
        saveTodosToLocalStorage(todoArr);
        _filterOnChange(todoArr);
        hideModal();
      });
      closeModalBtn();
      _populateModal(todoArr[e.target.dataset.index]);
      showModal();
    })
  );

  deleteBtns.forEach((item) =>
    item.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      todoArr[index].delete(todoArr);
      saveTodosToLocalStorage(todoArr);
      renderTodoes(todoArr);
    })
  );
}

// render todoes and add buttons functionality
export function renderTodoes(todoArr) {
  const todoCont = document.querySelector(".todo-container");
  todoCont.innerHTML = "";
  for (const item of todoArr) {
    const index = todoArr.indexOf(item);
    todoCont.appendChild(todoElement(item, index));
  }
  _addTodoButtons(todoArr);
}
