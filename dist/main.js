(()=>{"use strict";let e=(e=21)=>crypto.getRandomValues(new Uint8Array(e)).reduce(((e,t)=>e+((t&=63)<36?t.toString(36):t<62?(t-26).toString(36).toUpperCase():t>62?"-":"_")),"");const t={delete(e,t,n,a){e.splice(n,1);for(let e=t.length-1;e>=0;e--)t[e].project===this.id&&t.splice(e,1)},edit(e){this.name=e},updateProjectContents(e){this.contents=e.filter((e=>e.project===this.id))}};let n=[{name:"Default",id:"default",contents:[]},{name:"Learn everything",id:"justDoIt",contents:[]}];n.forEach((e=>Object.assign(e,t)));const a={edit({title:e,desc:t,date:n,priority:a,project:o}){this.title=e,this.desc=t,this.date=n,this.priority=a,this.project=o},complete(){this.completed=!this.completed},delete(e){e.splice(e.indexOf(this),1)}};let o=[{title:"Kill Batman",desc:"It's simple, we kill the Batman",date:"2021-12-08",priority:"high",completed:!1,project:"default"},{title:"Learn Spanish",desc:"And start expecting Spanish Inquisition",date:"2022-12-08",priority:"low",completed:!1,project:"justDoIt"},{title:"Learn masonry",desc:"Seems like a good skill to have",date:"2023-12-08",priority:"high",completed:!0,project:"justDoIt"},{title:"Create Todo",desc:"Or not create Todo? That is the question.",date:"2024-12-08",priority:"low",completed:!1,project:"default"}];function c(e,t,n=!1){const a=document.createElement("div"),o=document.createElement("h3"),c=document.createElement("form"),d=document.createElement("select"),i=document.createElement("p"),s=document.createElement("label"),l=document.createElement("button"),r=document.createElement("button");a.classList.add("modal"),o.textContent=n?"Edit Todo":"Create new Todo",c.action="#",c.method="post",c.dataset.index=t,r.classList.add("submit","btn-anim"),r.type="submit",r.innerText=n?"Save":"Add",l.classList.add("close","btn-anim"),l.type="button",l.innerHTML="&#10005;",c.innerHTML='<p>\n                        <label for="title">Title</label>\n                        <input class=\'newTodo\' type="text" id="title" name="title" required />\n                    </p>\n                    <p>\n                        <label for="desc">Description</label>\n                        <textarea class=\'newTodo\' id="desc" name="desc"></textarea>\n                    </p>\n                    <p>\n                        <label for="date">Due Date</label>\n                        <input class=\'newTodo\' type="date" id="date" name="date"  required/>\n                    </p>\n                    <p>\n                        <label for="importance">Importance</label>\n                        <select class=\'newTodo\' id="priority" name="priority" required>\n                            <option value="">--How important is it?--</option>\n                            <option value="high">Very</option>\n                            <option value="mid">Somewhat</option>\n                            <option value="low">Not important</option>\n                        </select>\n                    </p>',s.for="project",s.textContent="Project",d.classList.add("newTodo"),d.name="project",d.id="project";for(const t of e){const e=document.createElement("option");e.value=t.id,e.textContent=t.name,d.appendChild(e)}return i.append(s,d),c.append(i,r),a.append(o,l,c),a}function d(){const e=document.querySelectorAll(".newTodo");return Array.from(e).reduce(((e,t)=>({...e,[t.id]:t.value})),{})}function i(e,t=!1){const n=document.createElement("div"),a=document.createElement("h3"),o=document.createElement("form"),c=document.createElement("p"),d=document.createElement("label"),i=document.createElement("button"),s=document.createElement("button");n.classList.add("modal"),a.textContent=t?"Edit Project":"Create new Project",o.action="#",o.method="post",o.dataset.index=e,s.classList.add("submit","btn-anim"),s.type="submit",s.innerText=t?"Save":"Add",i.classList.add("close","btn-anim"),i.type="button",i.innerHTML="&#10005;",d.for="newProject",d.textContent="Project name";const l=document.createElement("input");return l.classList.add("newProject"),l.id="newProject",l.name="newProject",l.required=!0,c.append(d,l),o.append(c,s),n.append(a,i,o),n}function s(e){localStorage.setItem("projects",JSON.stringify(e))}function l(e){localStorage.setItem("todos",JSON.stringify(e))}o.forEach((e=>Object.assign(e,a)));const r=[{class:"btn filter-btn filter-active",data:"all",icon:"fa-solid fa-globe",text:"All"},{class:"btn filter-btn",data:"today",icon:"fa-solid fa-calendar-day",text:"Today"},{class:"btn filter-btn",data:"month",icon:"fa-solid fa-calendar-days",text:"This month"},{class:"btn filter-btn",data:"important",icon:"fa-solid fa-calendar-plus",text:"Important"},{class:"btn filter-btn",data:"completed",icon:"fa-solid fa-calendar-check",text:"Completed"}];function m(e,t,n){const a=new Date;if("all"===n)L(e,t);else if("today"===n){const n=`${a.getFullYear()}-${a.getMonth()+1<=9?"0"+(a.getMonth()+1):a.getMonth()+1}-${a.getDate()<=9?"0"+a.getDate():a.getDate()}`;L(e.filter((e=>e.date===n)),t)}else if("month"===n){const n=a.getMonth()+1;L(e.filter((e=>parseInt(e.date.split("-")[1])===n)),t)}else"important"===n?L(e.filter((e=>"high"===e.priority)),t):"completed"===n&&L(e.filter((e=>e.completed)),t)}function u(n,a){const o=document.querySelectorAll(".project-select"),c=document.querySelectorAll(".filter-btn"),d=document.querySelectorAll(".project-edit"),r=document.querySelectorAll(".project-delete");document.querySelector(".new-project").addEventListener("click",(o=>{v.innerHTML="",v.appendChild(i()),function(n,a){const o=document.querySelector("form"),c=document.getElementById("newProject");o.addEventListener("submit",(o=>{o.preventDefault();const d=(i=c.value,Object.assign(Object.create(t),{name:i,id:e(8),contents:[]}));var i;n.push(d),s(n),p(n,a),y()}))}(n,a),b(),g()})),o.forEach((e=>e.addEventListener("click",(e=>{const t=n.filter((t=>t.id===e.target.dataset.id))[0];o.forEach((e=>e.classList.remove("filter-active"))),c.forEach((e=>e.classList.remove("filter-active"))),e.target.classList.add("filter-active"),t.updateProjectContents(a),L(t.contents,n)})))),d.forEach((e=>e.addEventListener("click",(e=>{const t=e.target.dataset.index;v.innerHTML="",v.appendChild(i(t,!0));const o=document.querySelector("form");document.querySelector(".newProject").value=n[t].name,o.addEventListener("submit",(e=>{e.preventDefault(),n[t].edit(document.querySelector(".newProject").value),p(n,a),s(n),y()})),b(),g()})))),r.forEach((e=>e.addEventListener("click",(e=>{const t=e.target.dataset.index,o=e.target.dataset.id;v.innerHTML="",v.appendChild(function(){const e=document.createElement("div"),t=document.createElement("h3"),n=document.createElement("p"),a=document.createElement("div"),o=document.createElement("button"),c=document.createElement("button");return e.classList.add("modal","delete-warning"),t.textContent="Warning!",n.textContent="Deleting a Project will delete all Todos in it. Are you sure?",c.classList.add("modal-deleteBtn","btn-anim"),c.textContent="Delete",o.classList.add("modal-cancel","btn-anim"),o.textContent="Cancel",a.append(o,c),e.append(t,n,a),e}()),g();const c=document.querySelector(".modal-deleteBtn");document.querySelector(".modal-cancel").addEventListener("click",(e=>{y()})),c.addEventListener("click",(e=>{n[t].delete(n,a,t,o),L(a),p(n,a),s(n),l(a),y()}))}))))}function p(e,t){document.getElementById("content").firstElementChild.classList.contains("sidebar")&&document.getElementById("content").firstElementChild.remove(),document.getElementById("content").prepend(function(e){const t=document.createElement("div");return t.classList.add("sidebar"),t.append(function(){const e=document.createElement("nav");for(const t of r){const n=document.createElement("button"),a=document.createElement("i");n.className=t.class,n.dataset.filter=t.data,a.className=t.icon;const o=document.createTextNode(t.text);n.append(a,o),e.appendChild(n)}return e}(),function(e){const t=document.createElement("div");t.className="projects-container";const n=document.createElement("div");n.className="projects-heading",n.innerHTML='<h3>Projects:</h3><button class="btn btn-anim new-project">New</button>';const a=document.createElement("div");a.className="projects";const o=document.createElement("button");o.className="btn project-select",o.textContent="Default",o.dataset.id="default",o.dataset.index=0,a.appendChild(o);for(let t=1;t<e.length;t++){const n=document.createElement("div"),o=document.createElement("button"),c=document.createElement("button"),d=document.createElement("button");o.className="btn project-select",o.dataset.id=e[t].id,c.dataset.id=e[t].id,d.dataset.id=e[t].id,o.dataset.index=t,c.dataset.index=t,d.dataset.index=t,c.className="btn btn-anim project-edit",d.className="btn btn-anim project-delete",o.textContent=e[t].name,c.innerHTML='<i class="fa-solid fa-pen-to-square"></i>',d.innerHTML='<i class="fa-solid fa-trash"></i>',n.append(o,c,d),a.appendChild(n)}return t.append(n,a),t}(e)),t}(e)),function(){const e=document.querySelector(".burger"),t=document.querySelector(".sidebar"),n=document.querySelector("main"),a=document.querySelector(".overlay-mobile");e.addEventListener("click",(()=>{t.classList.contains("sidebar-hidden")?(e.classList.add("burger-active"),t.classList.remove("sidebar-hidden"),window.innerWidth>800?n.classList.add("pad-left"):(n.classList.remove("pad-left"),a.classList.remove("overlay-hidden"))):(e.classList.remove("burger-active"),t.classList.add("sidebar-hidden"),n.classList.remove("pad-left"),window.innerWidth<800&&a.classList.add("overlay-hidden"))})),a.addEventListener("click",(()=>{e.classList.remove("burger-active"),t.classList.add("sidebar-hidden"),a.classList.add("overlay-hidden")})),window.addEventListener("resize",(()=>{e.classList.remove("burger-active"),t.classList.add("sidebar-hidden"),n.classList.remove("pad-left")})),window.addEventListener("DOMContentLoaded",(()=>{window.innerWidth<800&&(e.classList.remove("burger-active"),t.classList.add("sidebar-hidden"),n.classList.remove("pad-left"))}))}(),function(e,t){const n=document.querySelectorAll(".filter-btn"),a=document.querySelectorAll(".project-select");n.forEach((o=>o.addEventListener("click",(o=>{n.forEach((e=>e.classList.remove("filter-active"))),a.forEach((e=>e.classList.remove("filter-active"))),o.target.classList.add("filter-active"),m(e,t,o.target.dataset.filter)}))))}(t,e),u(e,t)}function f(e,t){const n=document.createElement("div");n.classList.add("todo-item"),e.completed&&n.classList.add("todo-completed"),document.createElement("i").classList.add("fa-solid","fa-check");const a=e.completed?'<i class="fa-solid fa-check"></i>':"",o=document.createElement("div"),c=document.createElement("div"),d=document.createElement("div"),i=document.createElement("div"),s=document.createElement("button"),l=document.createElement("button"),r=document.createElement("button"),m=document.createElement("i"),u=document.createElement("i");return o.classList.add("importance",e.priority),c.classList.add("checkmark"),c.dataset.index=t,c.innerHTML=a,d.classList.add("todo-desc"),d.textContent=e.title,s.classList.add("details","btn-anim"),s.dataset.index=t,s.textContent="Details",i.classList.add("due-date"),i.textContent=e.date,l.classList.add("edit","btn-anim"),l.dataset.index=t,m.classList.add("fa-solid","fa-pen-to-square"),l.appendChild(m),r.classList.add("delete","btn-anim"),r.dataset.index=t,u.classList.add("fa-solid","fa-trash"),r.appendChild(u),n.append(o,c,d,s,i,l,r),n}function h(e){switch([...document.querySelectorAll(".filter-btn")].filter((e=>e.classList.contains("filter-active")))[0].dataset.filter){case"completed":m(e,"completed");break;case"today":m(e,"today");break;case"month":m(e,"month");break;case"important":m(e,"important")}}function L(e,t){const n=document.querySelector(".todo-container");n.innerHTML="";for(const t of e){const a=e.indexOf(t);n.appendChild(f(t,a))}!function(e,t){const n=document.querySelectorAll(".checkmark"),a=document.querySelectorAll(".details"),o=document.querySelectorAll(".edit"),i=document.querySelectorAll(".delete");n.forEach((t=>t.addEventListener("click",(t=>{const n=t.target.dataset.index;""===t.target.innerHTML?(t.target.innerHTML='<i class="fa-solid fa-check"></i>',t.target.parentNode.classList.add("todo-completed"),e[n].complete(),l(e)):(t.target.innerHTML="",t.target.parentNode.classList.remove("todo-completed"),e[n].complete(),l(e),h(e))})))),a.forEach((t=>t.addEventListener("click",(t=>{const n=t.target.dataset.index;v.innerHTML="",v.appendChild(function(e){const t=document.createElement("div"),n=document.createElement("h2"),a=document.createElement("button"),o=document.createElement("div");o.className="modal-details";const{title:c,desc:d,date:i,priority:s,completed:l}=e;t.classList.add("modal"),n.textContent="Todo Details",a.classList.add("close"),a.type="button",a.innerHTML="&#10005;";const r=[["Title: ",c],["Description: ",d],["Due date: ",i],["Priority",s],["Completion: ",l]];for(const e of r){const t=document.createElement("h3"),n=document.createElement("p");t.textContent=e[0],n.textContent=e[1],o.append(t,n)}return t.append(n,o,a),t}(e[n])),g(),b()})))),o.forEach((n=>n.addEventListener("click",(n=>{const a=n.target.dataset.index;v.innerHTML="",v.appendChild(c(t,a,!0)),document.querySelector("form").addEventListener("submit",(t=>{t.preventDefault(),e[a].edit(d()),L(e),l(e),[...document.querySelectorAll(".filter-btn")].filter((e=>e.classList.contains("filter-active"))).length>0&&h(e),y()})),b(),function(e){const t=document.getElementById("title"),n=document.getElementById("desc"),a=document.getElementById("date"),o=document.getElementById("priority"),c=document.getElementById("project");t.value=e.title,n.value=e.desc,a.value=e.date,o.value=e.priority,c.value=e.project}(e[n.target.dataset.index]),g()})))),i.forEach((t=>t.addEventListener("click",(t=>{const n=t.target.dataset.index;e[n].delete(e),l(e),L(e)}))))}(e,t)}const v=document.querySelector(".modal-container"),E=document.querySelector(".overlay");function b(){document.querySelector(".close").addEventListener("click",(()=>{y()})),E.addEventListener("click",(()=>{y()}))}function y(){v.classList.add("modal-hidden"),E.classList.add("overlay-hidden")}function g(){v.classList.remove("modal-hidden"),E.classList.remove("overlay-hidden")}var j,S;null!==localStorage.getItem("projects")&&(n=function(){const e=JSON.parse(localStorage.getItem("projects"));return e.forEach((e=>Object.assign(e,t))),e}()),null!==localStorage.getItem("todos")&&(o=function(){const e=JSON.parse(localStorage.getItem("todos"));return e.forEach((e=>Object.assign(e,a))),e}()),p(n,o),L(o,n),document.querySelector(".modal-container").appendChild(c(n)),j=n,S=o,function(){const e=document.querySelector(".mode"),t=document.querySelector(".toggle");e.addEventListener("click",(()=>{t.classList.toggle("on"),document.body.classList.toggle("dark")}))}(),function(e,t){document.querySelector(".new-todo").addEventListener("click",(n=>{v.innerHTML="",v.appendChild(c(e));const o=[...document.querySelectorAll(".project-select")].filter((e=>e.classList.contains("filter-active"))),i=document.getElementById("project");o.length>0&&(i.value=o[0].dataset.id),function(e,t){const n=document.querySelector("form");n.addEventListener("submit",(o=>{o.preventDefault();const c=(e=>{const{title:t,desc:n,date:o,priority:c,project:d}=e;return Object.assign(Object.create(a),{title:t,desc:n,date:o,priority:c,project:d,completed:!1})})(d());t.push(c),l(t);const i=[...document.querySelectorAll(".project-select")].filter((e=>e.classList.contains("filter-active")));if(i.length>0){const a=i[0].dataset.index;e[a].updateProjectContents(t),L(e[a].contents),n.reset(),y()}else h(t),n.reset(),y()}))}(e,t),b(),g()}))}(j,S),b()})();
//# sourceMappingURL=main.js.map