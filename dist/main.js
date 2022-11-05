(()=>{"use strict";var e={d:(t,n)=>{for(var o in n)e.o(n,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:n[o]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};function t(e,t){const n=document.createElement("div");n.classList.add("todo-item");const o=e.completed?'<i class="fa-solid fa-check"></i>':"";return n.innerHTML=`\n                    <div class="importance ${e.priority}"></div>\n                    <div class="checkmark" data-index="${t}">${o}</div>\n                    <div class="todo-desc">${e.title}</div>\n                    <button class="details" data-index="${t}">Details</button>\n                    <div class="due-date">${e.date}</div>\n                    <button class="edit" data-index="${t}">\n                        <i class="fa-solid fa-pen-to-square"></i>\n                    </button>\n                    <button class="delete" data-index="${t}">\n                        <i class="fa-solid fa-trash"></i>\n                    </button>\n                    `,n}function n(e,t,n=!1){const o=document.createElement("div"),a=document.createElement("h3"),c=document.createElement("form"),d=document.createElement("select"),i=document.createElement("p"),r=document.createElement("label"),l=document.createElement("button"),s=document.createElement("button");o.classList.add("modal"),a.textContent=n?"Edit Todo":"Create new Todo",c.action="#",c.method="post",c.dataset.index=t,s.classList.add("submit"),s.type="submit",s.innerText=n?"Save":"Add",l.classList.add("close"),l.type="button",l.innerHTML="&#10005;",c.innerHTML='<p>\n                        <label for="title">Title</label>\n                        <input class=\'newTodo\' type="text" id="title" name="title" required />\n                    </p>\n                    <p>\n                        <label for="desc">Description</label>\n                        <textarea class=\'newTodo\' id="desc" name="desc"></textarea>\n                    </p>\n                    <p>\n                        <label for="date">Due Date</label>\n                        <input class=\'newTodo\' type="date" id="date" name="date"  required/>\n                    </p>\n                    <p>\n                        <label for="importance">Importance</label>\n                        <select class=\'newTodo\' id="priority" name="priority" required>\n                            <option value="">--How important is it?--</option>\n                            <option value="high">Very</option>\n                            <option value="mid">Somewhat</option>\n                            <option value="low">Not important</option>\n                        </select>\n                    </p>',r.for="project",r.textContent="Project",d.classList.add("newTodo"),d.name="project",d.id="project";for(const t of e){const e=document.createElement("option");e.value=t.id,e.textContent=t.name,d.appendChild(e)}return i.append(r,d),c.append(i,s),o.append(a,l,c),o}e.d({},{q:()=>L,I:()=>g});const o={edit({title:e,desc:t,date:n,priority:o,project:a}){this.title=e,this.desc=t,this.date=n,this.priority=o,this.project=a},complete(){this.completed=!this.completed},delete(e){e.splice(e.indexOf(this),1)}};function a(){const e=document.querySelectorAll(".newTodo");return Array.from(e).reduce(((e,t)=>({...e,[t.id]:t.value})),{})}let c=(e=21)=>crypto.getRandomValues(new Uint8Array(e)).reduce(((e,t)=>e+((t&=63)<36?t.toString(36):t<62?(t-26).toString(36).toUpperCase():t>62?"-":"_")),"");const d={delete(e,t,n,o){e.splice(n,1);for(let e=t.length-1;e>=0;e--)t[e].project===this.id&&t.splice(e,1)},edit(e){this.name=e},updateProjectContents(e){this.contents=e.filter((e=>e.project===this.id))}};function i(e,t=!1){const n=document.createElement("div"),o=document.createElement("h3"),a=document.createElement("form"),c=document.createElement("p"),d=document.createElement("label"),i=document.createElement("button"),r=document.createElement("button");n.classList.add("modal"),o.textContent=t?"Edit Project":"Create new Project",a.action="#",a.method="post",a.dataset.index=e,r.classList.add("submit"),r.type="submit",r.innerText=t?"Save":"Add",i.classList.add("close"),i.type="button",i.innerHTML="&#10005;",d.for="newProject",d.textContent="Project name";const l=document.createElement("input");return l.className="newProject",l.id="newProject",l.name="newProject",l.required=!0,c.append(d,l),a.append(c,r),n.append(o,i,a),n}const r=[{class:"btn filter-btn filter-active",data:"all",icon:"fa-solid fa-globe",text:"All"},{class:"btn filter-btn",data:"today",icon:"fa-solid fa-calendar-day",text:"Today"},{class:"btn filter-btn",data:"month",icon:"fa-solid fa-calendar-days",text:"This month"},{class:"btn filter-btn",data:"important",icon:"fa-solid fa-calendar-plus",text:"Important"},{class:"btn filter-btn",data:"completed",icon:"fa-solid fa-calendar-check",text:"Completed"}];const l=document.querySelector(".modal-container");function s(e,t){const n=new Date;if("all"===t)y(g);else if("today"===t){const t=`${n.getFullYear()}-${n.getMonth()+1<=9?"0"+(n.getMonth()+1):n.getMonth()+1}-${n.getDate()<=9?"0"+n.getDate():n.getDate()}`;y(e.filter((e=>e.date===t)))}else if("month"===t){const t=n.getMonth()+1;y(e.filter((e=>parseInt(e.date.split("-")[1])===t)))}else"important"===t?y(e.filter((e=>"high"===e.priority))):"completed"===t&&y(e.filter((e=>e.completed)))}function m(e,t){const n=document.querySelectorAll(".project-select"),o=document.querySelectorAll(".filter-btn"),a=document.querySelectorAll(".project-edit"),r=document.querySelectorAll(".project-delete");document.querySelector(".new-project").addEventListener("click",(n=>{l.innerHTML="",l.appendChild(i()),function(e,t){const n=document.querySelector("form"),o=document.getElementById("newProject");n.addEventListener("submit",(n=>{n.preventDefault();const a=(i=o.value,Object.assign(Object.create(d),{name:i,id:c(8),contents:[]}));var i;e.push(a),u(e,t),E()}))}(e,t),v(),b()})),n.forEach((a=>a.addEventListener("click",(a=>{const c=e.filter((e=>e.id===a.target.dataset.id))[0];console.log(c),n.forEach((e=>e.classList.remove("filter-active"))),o.forEach((e=>e.classList.remove("filter-active"))),a.target.classList.add("filter-active"),c.updateProjectContents(t),y(c.contents)})))),a.forEach((n=>n.addEventListener("click",(n=>{const o=n.target.dataset.index;l.innerHTML="",l.appendChild(i(o,!0));const a=document.querySelector("form");document.querySelector(".newProject").value=e[o].name,a.addEventListener("submit",(n=>{n.preventDefault(),e[o].edit(document.querySelector(".newProject").value),u(e,t),E()})),v(),b()})))),r.forEach((n=>n.addEventListener("click",(n=>{const o=n.target.dataset.index,a=n.target.dataset.id;l.innerHTML="",l.appendChild(function(){const e=document.createElement("div"),t=document.createElement("h3"),n=document.createElement("p"),o=document.createElement("div"),a=document.createElement("button"),c=document.createElement("button");return e.classList.add("modal","delete-warning"),t.textContent="Warning!",n.textContent="Deleting a Project will delete all Todos in it. Are you sure?",c.classList.add("modal-deleteBtn"),c.textContent="Delete",a.classList.add("modal-cancel"),a.textContent="Cancel",o.append(a,c),e.append(t,n,o),e}()),b();const c=document.querySelector(".modal-deleteBtn");document.querySelector(".modal-cancel").addEventListener("click",(e=>{E()})),c.addEventListener("click",(n=>{e[o].delete(e,t,o,a),y(t),u(e,t),E()}))}))))}function u(e,t){document.getElementById("content").firstElementChild.classList.contains("sidebar")&&document.getElementById("content").firstElementChild.remove(),document.getElementById("content").prepend(function(e){const t=document.createElement("div");return t.className="sidebar",t.append(function(){const e=document.createElement("nav");for(const t of r){const n=document.createElement("button"),o=document.createElement("i");n.className=t.class,n.dataset.filter=t.data,o.className=t.icon;const a=document.createTextNode(t.text);n.append(o,a),e.appendChild(n)}return e}(),function(e){const t=document.createElement("div");t.className="projects-container";const n=document.createElement("div");n.className="projects-heading",n.innerHTML='<h3>Projects:</h3><button class="btn new-project">New</button>';const o=document.createElement("div");o.className="projects";const a=document.createElement("button");a.className="btn project-select",a.textContent="Default",a.dataset.id="default",a.dataset.index=0,o.appendChild(a);for(let t=1;t<e.length;t++){const n=document.createElement("div"),a=document.createElement("button"),c=document.createElement("button"),d=document.createElement("button");a.className="btn project-select",a.dataset.id=e[t].id,c.dataset.id=e[t].id,d.dataset.id=e[t].id,a.dataset.index=t,c.dataset.index=t,d.dataset.index=t,c.className="btn project-edit",d.className="btn project-delete",a.textContent=e[t].name,c.innerHTML='<i class="fa-solid fa-pen-to-square"></i>',d.innerHTML='<i class="fa-solid fa-trash"></i>',n.append(a,c,d),o.appendChild(n)}return t.append(n,o),t}(e)),t}(e)),function(){const e=document.querySelector(".burger"),t=document.querySelector(".sidebar"),n=document.querySelector("main");e.addEventListener("click",(()=>{t.classList.contains("sidebar-hidden")?(e.classList.add("burger-active"),t.classList.remove("sidebar-hidden"),window.innerWidth>800?n.classList.add("pad-left"):n.classList.remove("pad-left")):(e.classList.remove("burger-active"),t.classList.add("sidebar-hidden"),n.classList.remove("pad-left"))})),window.addEventListener("resize",(()=>{e.classList.remove("burger-active"),t.classList.add("sidebar-hidden"),n.classList.remove("pad-left")})),window.addEventListener("DOMContentLoaded",(()=>{window.innerWidth>800&&(e.classList.add("burger-active"),t.classList.remove("sidebar-hidden"),n.classList.add("pad-left"))}))}(),function(){const e=document.querySelectorAll(".filter-btn"),t=document.querySelectorAll(".project-select");e.forEach((n=>n.addEventListener("click",(n=>{e.forEach((e=>e.classList.remove("filter-active"))),t.forEach((e=>e.classList.remove("filter-active"))),n.target.classList.add("filter-active"),s(g,n.target.dataset.filter)}))))}(),m(e,t)}function p(e){switch([...document.querySelectorAll(".filter-btn")].filter((e=>e.classList.contains("filter-active")))[0].dataset.filter){case"completed":s(e,"completed");break;case"today":s(e,"today");break;case"month":s(e,"month");break;case"important":s(e,"important")}}const f=document.querySelector(".modal-container"),h=document.querySelector(".overlay");function v(){document.querySelector(".close").addEventListener("click",(()=>{E()})),h.addEventListener("click",(()=>{E()}))}function E(){f.classList.add("modal-hidden"),h.classList.add("overlay-hidden")}function b(){f.classList.remove("modal-hidden"),h.classList.remove("overlay-hidden")}function y(e){const o=document.querySelector(".todo-container");o.innerHTML="";for(const n of e){const a=e.indexOf(n);o.appendChild(t(n,a))}!function(e){const t=document.querySelectorAll(".checkmark"),o=document.querySelectorAll(".details"),c=document.querySelectorAll(".edit"),d=document.querySelectorAll(".delete");t.forEach((t=>t.addEventListener("click",(t=>{const n=t.target.dataset.index;""===t.target.innerHTML?(t.target.innerHTML='<i class="fa-solid fa-check"></i>',e[n].complete()):(t.target.innerHTML="",e[n].complete(),p(e))})))),o.forEach((t=>t.addEventListener("click",(t=>{const n=t.target.dataset.index;f.innerHTML="",f.appendChild(function(e){const t=document.createElement("div"),n=document.createElement("h2"),o=document.createElement("button"),a=document.createElement("div");a.className="modal-details";const{title:c,desc:d,date:i,priority:r,completed:l}=e;return t.classList.add("modal"),n.textContent="Todo Details",o.classList.add("close"),o.type="button",o.innerHTML="&#10005;",a.innerHTML=`\n  <h3>Title: </h3>\n  <p>${c}</p>\n  <h3>Description: </h3>\n  <p>${d}</p>\n  <h3>Due date: </h3>\n  <p>${i}</p>\n  <h3>Priority: </h3>\n  <p>${r}</p>\n  <h3>Completion: </h3>\n  <p>${l}</p>\n  `,t.append(n,a,o),t}(e[n])),b(),v()})))),c.forEach((t=>t.addEventListener("click",(t=>{const o=t.target.dataset.index;f.innerHTML="",f.appendChild(n(L,o,!0)),document.querySelector("form").addEventListener("submit",(t=>{t.preventDefault(),e[o].edit(a()),y(e),p(e),E()})),v(),function(e){const t=document.getElementById("title"),n=document.getElementById("desc"),o=document.getElementById("date"),a=document.getElementById("priority"),c=document.getElementById("project");t.value=e.title,n.value=e.desc,o.value=e.date,a.value=e.priority,c.value=e.project}(e[t.target.dataset.index]),b()})))),d.forEach((t=>t.addEventListener("click",(t=>{const n=t.target.dataset.index;e[n].delete(e),y(e)}))))}(e)}const L=[{name:"Default",id:"default",contents:[]},{name:"Learn everything",id:"justDoIt",contents:[]}],g=[{title:"Kill Batman",desc:"none",date:"2021-12-08",priority:"mid",completed:!1,project:"default"},{title:"Save Batman",desc:"none",date:"2022-12-08",priority:"low",completed:!1,project:"justDoIt"},{title:"Become Batman",desc:"none",date:"2023-12-08",priority:"high",completed:!0,project:"justDoIt"},{title:"Stop being Batman",desc:"none",date:"2024-12-08",priority:"low",completed:!1,project:"default"}];L.forEach((e=>Object.assign(e,d))),g.forEach((e=>Object.assign(e,o))),y(g),document.querySelector(".modal-container").appendChild(n(L)),u(L,g),sidebarToggle(),_addFilterButtons(),_addProjectsButtons(L,g),function(){const e=document.querySelector(".mode"),t=document.querySelector(".toggle");e.addEventListener("click",(e=>{t.classList.toggle("on"),document.body.classList.toggle("dark")}))}(),document.querySelector(".new-todo").addEventListener("click",(e=>{f.innerHTML="",f.appendChild(n(L)),function(){const e=document.querySelector("form");e.addEventListener("submit",(t=>{t.preventDefault();const n=(e=>{const{title:t,desc:n,date:a,priority:c,project:d}=e;return Object.assign(Object.create(o),{title:t,desc:n,date:a,priority:c,project:d,completed:!1})})(a());g.push(n),y(g),e.reset(),E()}))}(),v(),b()})),v()})();