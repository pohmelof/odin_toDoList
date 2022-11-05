import { todosArray, projects } from "./index";
import todoElement from "./todo-element";
import details from "./details";
import newToDo from "./modal-todo";
import { createToDo } from "./todo";
import formData from "./getFormData";
import modalNewProject from "./modal-newProject";
import { createProject } from "./project";
import { sidebar, filterTodos } from "./sidebar";
import deleteWarning from "./delete-warning";

export const dom = () => {
  // toggle sidebar and burger menu icon
  sidebarToggle();

  // filter buttons
  _addFilterButtons();
  _addProjectsButtons(projects, todosArray);

  //   night mode toggle
  _toggleNightMode();

  //   new todo

  newTodo();
  closeModalBtn();
};

function _toggleNightMode() {
  const modeBtn = document.querySelector(".mode");
  const toggle = document.querySelector(".toggle");

  modeBtn.addEventListener("click", (e) => {
    toggle.classList.toggle("on");
    document.body.classList.toggle("dark");
  });
}

// filter todos on change if one of the filter buttons was pressed
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

// close modal button
const modalCont = document.querySelector(".modal-container");
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
function addTodo() {
  const submitForm = document.querySelector("form");

  submitForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const todo = createToDo(formData());
    todosArray.push(todo);
    renderTodoes(todosArray);
    submitForm.reset();
    hideModal();
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

// function newProject(projectsArr, todoArr) {
//   const form = document.querySelector("form");
//   const projectName = document.getElementById("newProject");
//   form.addEventListener("submit", (e) => {
//     e.preventDefault();
//     const newProject = createProject(projectName.value);
//     projectsArr.push(newProject);
//     renderSidebar(projectsArr, todoArr);
//     hideModal();
//   });
// }

// function _addProjectsButtons(projectsArr, todoArr) {
//   const selectBtns = document.querySelectorAll(".project-select");
//   const filterBtns = document.querySelectorAll(".filter-btn");
//   const editBtns = document.querySelectorAll(".project-edit");
//   const deleteBtns = document.querySelectorAll(".project-delete");

//   const newProjectBtn = document.querySelector(".new-project");
//   newProjectBtn.addEventListener("click", (e) => {
//     modalCont.innerHTML = "";
//     modalCont.appendChild(modalNewProject());
//     newProject(projectsArr, todoArr);
//     closeModalBtn();
//     showModal();
//   });

//   selectBtns.forEach((item) =>
//     item.addEventListener("click", (e) => {
//       const project = projectsArr.filter(
//         (item) => item.id === e.target.dataset.id
//       )[0];
//       console.log(project);
//       selectBtns.forEach((item) => item.classList.remove("filter-active"));
//       filterBtns.forEach((item) => item.classList.remove("filter-active"));
//       e.target.classList.add("filter-active");
//       project.updateProjectContents(todoArr);
//       renderTodoes(project.contents);
//     })
//   );

//   editBtns.forEach((item) =>
//     item.addEventListener("click", (e) => {
//       const index = e.target.dataset.index;
//       const edit = true;
//       modalCont.innerHTML = "";
//       modalCont.appendChild(modalNewProject(index, edit));
//       const form = document.querySelector("form");
//       document.querySelector(".newProject").value = projectsArr[index].name;

//       form.addEventListener("submit", (e) => {
//         e.preventDefault();
//         projectsArr[index].edit(document.querySelector(".newProject").value);
//         renderSidebar(projectsArr, todoArr);
//         hideModal();
//       });

//       closeModalBtn();
//       showModal();
//     })
//   );

//   deleteBtns.forEach((item) =>
//     item.addEventListener("click", (e) => {
//       const index = e.target.dataset.index;
//       const id = e.target.dataset.id;
//       modalCont.innerHTML = "";
//       modalCont.appendChild(deleteWarning());
//       showModal();
//       const deleteBtn = document.querySelector(".modal-deleteBtn");
//       const cancelBtn = document.querySelector(".modal-cancel");
//       cancelBtn.addEventListener("click", (e) => {
//         hideModal();
//       });
//       deleteBtn.addEventListener("click", (e) => {
//         projectsArr[index].delete(projectsArr, todoArr, index, id);
//         renderTodoes(todoArr);
//         renderSidebar(projectsArr, todoArr);
//         hideModal();
//       });
//     })
//   );
// }

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
        _filterOnChange(arr);
      }
    })
  );

  detailsBtns.forEach((item) =>
    item.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
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
      const edit = true;
      modalCont.appendChild(newToDo(projects, index, edit));
      const submitForm = document.querySelector("form");

      submitForm.addEventListener("submit", (e) => {
        e.preventDefault();
        arr[index].edit(formData());
        renderTodoes(arr);
        _filterOnChange(arr);
        hideModal();
      });
      closeModalBtn();
      _populateModal(arr[e.target.dataset.index]);
      showModal();
    })
  );

  deleteBtns.forEach((item) =>
    item.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      arr[index].delete(arr);
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

// function renderSidebar(projectArr, todoArr) {
//   if (
//     document
//       .getElementById("content")
//       .firstElementChild.classList.contains("sidebar")
//   ) {
//     document.getElementById("content").firstElementChild.remove();
//   }
//   document.getElementById("content").prepend(sidebar(projectArr));
//   sidebarToggle();
//   _addFilterButtons();
//   _addProjectsButtons(projectArr, todoArr);
// }
