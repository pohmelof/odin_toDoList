(()=>{const e=document.querySelector(".burger"),t=document.querySelector(".sidebar"),s=document.querySelector("main");e.addEventListener("click",(()=>{e.classList.toggle("burger-active"),t.classList.toggle("sidebar-hidden"),window.innerWidth>800?s.classList.toggle("pad-left"):s.classList.remove("pad-left")})),window.addEventListener("resize",(()=>{e.classList.remove("burger-active"),t.classList.add("sidebar-hidden"),s.classList.remove("pad-left")})),window.addEventListener("DOMContentLoaded",(()=>{window.innerWidth>800&&(e.classList.add("burger-active"),t.classList.remove("sidebar-hidden"),s.classList.add("pad-left"))})),document.querySelectorAll(".checkmark").forEach((e=>e.addEventListener("click",(e=>{e.target.classList.contains("fa-solid","fa-check")?e.target.classList.remove("fa-solid","fa-check"):e.target.classList.add("fa-solid","fa-check")}))));const c=document.querySelectorAll(".filter-btn");c.forEach((e=>e.addEventListener("click",(e=>{c.forEach((e=>e.classList.remove("filter-active"))),e.target.classList.add("filter-active")}))));const a=document.querySelector(".mode"),d=document.querySelector(".toggle");a.addEventListener("click",(e=>{d.classList.toggle("on"),document.body.classList.toggle("dark")}))})();