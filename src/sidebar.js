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
  home.className = "btn";
  home.textContent = "Default";
  home.dataset.id = "default";

  projectsDiv.appendChild(home);

  for (let i = 1; i < arr.length; i++) {
    const div = document.createElement("div");
    const projectBtn = document.createElement("button");
    const editBtn = document.createElement("button");
    const deleteBtn = document.createElement("button");

    projectBtn.className = "btn project-select";
    projectBtn.dataset.id = arr[i].id;
    editBtn.dataset.id = arr[i].id;
    editBtn.className = "btn project-edit";
    deleteBtn.dataset.id = arr[i].id;
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

export function sidebar(arr) {
  const sidebar = document.createElement("div");
  sidebar.className = "sidebar sidebar-hidden";

  sidebar.append(navEl(), projectsEl(arr));

  return sidebar;
}
