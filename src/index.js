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

window.addEventListener("resize", () => {
  burger.classList.remove("burger-active");
  sidebar.classList.add("sidebar-hidden");
  main.classList.remove("pad-left");
});
window.addEventListener("DOMContentLoaded", () => {
  if (window.innerWidth > 800) {
    burger.classList.add("burger-active");
    sidebar.classList.remove("sidebar-hidden");
    main.classList.add("pad-left");
  }
});

const checkmarks = document.querySelectorAll(".checkmark");

checkmarks.forEach((item) =>
  item.addEventListener("click", (e) => {
    if (e.target.classList.contains("fa-solid", "fa-check")) {
      e.target.classList.remove("fa-solid", "fa-check");
    } else {
      e.target.classList.add("fa-solid", "fa-check");
    }
  })
);

const filterBtns = document.querySelectorAll(".filter-btn");

filterBtns.forEach((item) =>
  item.addEventListener("click", (e) => {
    filterBtns.forEach((item) => item.classList.remove("filter-active"));
    e.target.classList.add("filter-active");
  })
);

const modeBtn = document.querySelector(".mode");
const toggle = document.querySelector(".toggle");

modeBtn.addEventListener("click", (e) => {
  toggle.classList.toggle("on");
  document.body.classList.toggle("dark");
});
