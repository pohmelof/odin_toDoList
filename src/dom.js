import { todosArray, projects } from "./index";
import todoElement from "./todo-element";
import details from "./details";
import newToDo from "./modal-todo";
import { createToDo } from "./todo";
import formData from "./getFormData";

export const dom = () => {
  // toggle sidebar and burger menu icon
  const burger = document.querySelector(".burger");
  const sidebar = document.querySelector(".sidebar");
  const main = document.querySelector("main");

  burger.addEventListener("click", () => {
    burger.classList.toggle("burger-active");
    sidebar.classList.toggle("sidebar-hidden");
    if (window.innerWidth > 800) {
      main.classList.toggle("pad-left");
    } else {
      main.classList.remove("pad-left");
    }
  });
  // if window resized, reset sidebar status
  window.addEventListener("resize", () => {
    burger.classList.remove("burger-active");
    sidebar.classList.add("sidebar-hidden");
    main.classList.remove("pad-left");
  });
  //  if window width more than 800px, show sidebar on load
  window.addEventListener("DOMContentLoaded", () => {
    if (window.innerWidth > 800) {
      burger.classList.add("burger-active");
      sidebar.classList.remove("sidebar-hidden");
      main.classList.add("pad-left");
    }
  });

  // filter buttons
  const filterBtns = document.querySelectorAll(".filter-btn");

  function filterTodos(arr, arg) {
    const date = new Date();
    if (arg === "all") {
      renderTodoes(todosArray);
    } else if (arg === "today") {
      const today = `${date.getFullYear()}-${
        date.getMonth() + 1 <= 9
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1
      }-${date.getDate() <= 9 ? "0" + date.getDate() : date.getDate()}`;
      const output = arr.filter((item) => item.date === today);
      renderTodoes(output);
    } else if (arg === "month") {
      const month = date.getMonth() + 1;
      const output = arr.filter(
        (item) => parseInt(item.date.split("-")[1]) === month
      );
      renderTodoes(output);
    } else if (arg === "important") {
      const output = arr.filter((item) => item.priority === "high");
      renderTodoes(output);
    } else if (arg === "completed") {
      const output = arr.filter((item) => item.completed);
      renderTodoes(output);
    }
  }

  filterBtns.forEach((item) =>
    item.addEventListener("click", (e) => {
      filterBtns.forEach((item) => item.classList.remove("filter-active"));
      e.target.classList.add("filter-active");
      filterTodos(todosArray, e.target.dataset.filter);
    })
  );

  //   night mode toggle
  const modeBtn = document.querySelector(".mode");
  const toggle = document.querySelector(".toggle");

  modeBtn.addEventListener("click", (e) => {
    toggle.classList.toggle("on");
    document.body.classList.toggle("dark");
  });

  //   new todo

  newTodo();
  closeModalBtn();
};

// close modal button
const modalCont = document.querySelector(".modal-container");
const overlay = document.querySelector(".overlay");

function closeModalBtn() {
  const closeModalBtn = document.querySelector(".close");
  closeModalBtn.addEventListener("click", () => {
    modalCont.classList.add("modal-hidden");
    overlay.classList.add("overlay-hidden");
  });
}

function showModal() {
  modalCont.classList.remove("modal-hidden");
  overlay.classList.remove("overlay-hidden");
}

// new todo button
function addTodo() {
  const submitForm = document.querySelector("form");

  submitForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const todo = createToDo(formData());
    todosArray.push(todo);
    renderTodoes(todosArray);
    submitForm.reset();
  });
}

function newTodo() {
  const newTodoBtn = document.querySelector(".new-todo");
  newTodoBtn.addEventListener("click", (e) => {
    modalCont.innerHTML = "";
    modalCont.appendChild(newToDo(projects));
    addTodo();
    closeModalBtn();
    showModal();
  });
}

//populate modal with info to edit it
function populateModal(obj) {
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
function _addTodoButtons(arr) {
  const checkmarkBtns = document.querySelectorAll(".checkmark");
  const detailsBtns = document.querySelectorAll(".details");
  const editBtns = document.querySelectorAll(".edit");
  const deleteBtns = document.querySelectorAll(".delete");

  checkmarkBtns.forEach((item) =>
    item.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      if (e.target.innerHTML === "") {
        e.target.innerHTML = `<i class="fa-solid fa-check"></i>`;
        arr[index].complete();
      } else {
        e.target.innerHTML = "";
        arr[index].complete();
      }
    })
  );

  detailsBtns.forEach((item) =>
    item.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      console.log(arr[e.target.dataset.index].desc);
      modalCont.innerHTML = "";
      modalCont.appendChild(details(arr[index]));
      showModal();
      closeModalBtn();
    })
  );

  editBtns.forEach((item) =>
    item.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      modalCont.innerHTML = "";
      modalCont.appendChild(newToDo(projects, index));
      const submitForm = document.querySelector("form");

      submitForm.addEventListener("submit", (e) => {
        e.preventDefault();
        arr[index].edit(formData());
        renderTodoes(arr);
      });
      closeModalBtn();
      populateModal(arr[e.target.dataset.index]);
      showModal();
    })
  );

  deleteBtns.forEach((item) =>
    item.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      arr.splice(index, 1);
      renderTodoes(arr);
    })
  );
}

// render todoes and add buttons functionality
export function renderTodoes(arr) {
  const todoCont = document.querySelector(".todo-container");
  todoCont.innerHTML = "";
  for (const item of arr) {
    const index = arr.indexOf(item);
    todoCont.appendChild(todoElement(item, index));
  }
  _addTodoButtons(arr);
}
