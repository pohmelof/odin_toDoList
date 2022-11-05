import { todosArray, projects } from "./index";
import modalNewProject from "./modal-newProject";
import { createProject } from "./project";
import deleteWarning from "./delete-warning";
import { renderTodoes } from "./todo-element";
import { closeModalBtn, showModal, hideModal, modalCont } from "./dom";
import { saveProjectsToLocalStorage } from "./localStorage";

const filterButtons = [
  {
    class: "btn filter-btn filter-active",
    data: "all",
    icon: "fa-solid fa-globe",
    text: "All",
  },
  {
    class: "btn filter-btn",
    data: "today",
    icon: "fa-solid fa-calendar-day",
    text: "Today",
  },
  {
    class: "btn filter-btn",
    data: "month",
    icon: "fa-solid fa-calendar-days",
    text: "This month",
  },
  {
    class: "btn filter-btn",
    data: "important",
    icon: "fa-solid fa-calendar-plus",
    text: "Important",
  },
  {
    class: "btn filter-btn",
    data: "completed",
    icon: "fa-solid fa-calendar-check",
    text: "Completed",
  },
];

function navEl() {
  const nav = document.createElement("nav");
  for (const item of filterButtons) {
    const button = document.createElement("button");
    const icon = document.createElement("i");

    button.className = item.class;
    button.dataset.filter = item.data;

    icon.className = item.icon;
    const text = document.createTextNode(item.text);

    button.append(icon, text);

    nav.appendChild(button);
  }

  return nav;
}

function projectsEl(arr) {
  const projectsCont = document.createElement("div");
  projectsCont.className = "projects-container";

  const projectsHeading = document.createElement("div");
  projectsHeading.className = "projects-heading";
  projectsHeading.innerHTML = `<h3>Projects:</h3><button class="btn new-project">New</button>`;

  const projectsDiv = document.createElement("div");
  projectsDiv.className = "projects";
  const home = document.createElement("button");
  home.className = "btn project-select";
  home.textContent = "Default";
  home.dataset.id = "default";
  home.dataset.index = 0;

  projectsDiv.appendChild(home);

  for (let i = 1; i < arr.length; i++) {
    const div = document.createElement("div");
    const projectBtn = document.createElement("button");
    const editBtn = document.createElement("button");
    const deleteBtn = document.createElement("button");

    projectBtn.className = "btn project-select";
    projectBtn.dataset.id = arr[i].id;
    editBtn.dataset.id = arr[i].id;
    deleteBtn.dataset.id = arr[i].id;
    projectBtn.dataset.index = i;
    editBtn.dataset.index = i;
    deleteBtn.dataset.index = i;
    editBtn.className = "btn project-edit";
    deleteBtn.className = "btn project-delete";
    projectBtn.textContent = arr[i].name;
    editBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
    deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';

    div.append(projectBtn, editBtn, deleteBtn);

    projectsDiv.appendChild(div);
  }

  projectsCont.append(projectsHeading, projectsDiv);

  return projectsCont;
}
// create sidebar element
export function sidebar(arr) {
  const sidebar = document.createElement("div");
  sidebar.classList.add("sidebar");

  sidebar.append(navEl(), projectsEl(arr));

  return sidebar;
}

//  add sidebar functionality

// filter todos functionality
function _addFilterButtons() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const selectBtns = document.querySelectorAll(".project-select");

  filterBtns.forEach((item) =>
    item.addEventListener("click", (e) => {
      filterBtns.forEach((item) => item.classList.remove("filter-active"));
      selectBtns.forEach((item) => item.classList.remove("filter-active"));
      e.target.classList.add("filter-active");
      filterTodos(todosArray, e.target.dataset.filter);
    })
  );
}

export function filterTodos(arr, arg) {
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

// show or hide sidebar and change burger icon
function _sidebarToggle() {
  // toggle sidebar and burger menu icon
  const burger = document.querySelector(".burger");
  const sidebar = document.querySelector(".sidebar");
  const main = document.querySelector("main");
  const mobileOverlay = document.querySelector(".overlay-mobile");

  burger.addEventListener("click", () => {
    if (sidebar.classList.contains("sidebar-hidden")) {
      burger.classList.add("burger-active");
      sidebar.classList.remove("sidebar-hidden");
      if (window.innerWidth > 800) {
        main.classList.add("pad-left");
      } else {
        main.classList.remove("pad-left");
        mobileOverlay.classList.remove("overlay-hidden");
      }
    } else {
      burger.classList.remove("burger-active");
      sidebar.classList.add("sidebar-hidden");
      main.classList.remove("pad-left");
      if (window.innerWidth < 800) {
        mobileOverlay.classList.add("overlay-hidden");
      }
    }
  });
  // if window resized, reset sidebar status
  window.addEventListener("resize", () => {
    burger.classList.remove("burger-active");
    sidebar.classList.add("sidebar-hidden");
    main.classList.remove("pad-left");
  });

  //  if window width more than 800px, show sidebar on load
  //   (won't auto show sidebar on mobile)
  window.addEventListener("DOMContentLoaded", () => {
    if (window.innerWidth < 800) {
      burger.classList.remove("burger-active");
      sidebar.classList.add("sidebar-hidden");
      main.classList.remove("pad-left");
    }
  });
}

// create new project
function _newProject(projectsArr, todoArr) {
  const form = document.querySelector("form");
  const projectName = document.getElementById("newProject");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const newProject = createProject(projectName.value);
    projectsArr.push(newProject);
    saveProjectsToLocalStorage(projectsArr);
    renderSidebar(projectsArr, todoArr);
    hideModal();
  });
}

// add functionality to all Projects buttons
function _addProjectsButtons(projectsArr, todoArr) {
  const selectBtns = document.querySelectorAll(".project-select");
  const filterBtns = document.querySelectorAll(".filter-btn");
  const editBtns = document.querySelectorAll(".project-edit");
  const deleteBtns = document.querySelectorAll(".project-delete");

  const newProjectBtn = document.querySelector(".new-project");
  newProjectBtn.addEventListener("click", (e) => {
    modalCont.innerHTML = "";
    modalCont.appendChild(modalNewProject());
    _newProject(projectsArr, todoArr);
    closeModalBtn();
    showModal();
  });

  //   show selected project contents
  selectBtns.forEach((item) =>
    item.addEventListener("click", (e) => {
      const project = projectsArr.filter(
        (item) => item.id === e.target.dataset.id
      )[0];
      selectBtns.forEach((item) => item.classList.remove("filter-active"));
      filterBtns.forEach((item) => item.classList.remove("filter-active"));
      e.target.classList.add("filter-active");
      //   filter all todos and show only those that have id of the project,
      //    save them into project object contents
      project.updateProjectContents(todoArr);
      renderTodoes(project.contents);
    })
  );

  //   edit project name
  editBtns.forEach((item) =>
    item.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      const edit = true;
      modalCont.innerHTML = "";
      modalCont.appendChild(modalNewProject(index, edit));
      const form = document.querySelector("form");
      //   get project name and render it into form input field
      document.querySelector(".newProject").value = projectsArr[index].name;

      form.addEventListener("submit", (e) => {
        e.preventDefault();
        projectsArr[index].edit(document.querySelector(".newProject").value);
        renderSidebar(projectsArr, todoArr);
        saveProjectsToLocalStorage();
        hideModal();
      });

      closeModalBtn();
      showModal();
    })
  );

  deleteBtns.forEach((item) =>
    item.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      const id = e.target.dataset.id;
      modalCont.innerHTML = "";
      modalCont.appendChild(deleteWarning());
      showModal();
      const deleteBtn = document.querySelector(".modal-deleteBtn");
      const cancelBtn = document.querySelector(".modal-cancel");
      cancelBtn.addEventListener("click", (e) => {
        hideModal();
      });
      deleteBtn.addEventListener("click", (e) => {
        projectsArr[index].delete(projectsArr, todoArr, index, id);
        renderTodoes(todoArr);
        renderSidebar(projectsArr, todoArr);
        saveProjectsToLocalStorage(projectsArr);
        hideModal();
      });
    })
  );
}

//  render sidebar with all features
export function renderSidebar(projectArr, todoArr) {
  // if sidebar is already rendered, remove it
  if (
    document
      .getElementById("content")
      .firstElementChild.classList.contains("sidebar")
  ) {
    document.getElementById("content").firstElementChild.remove();
  }
  //   append sidebar as first child of content element
  document.getElementById("content").prepend(sidebar(projectArr));
  _sidebarToggle();
  _addFilterButtons();
  _addProjectsButtons(projectArr, todoArr);
}
