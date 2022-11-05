export default function newProject(index, edit = false) {
  const modal = document.createElement("div");
  const h3 = document.createElement("h3");
  const form = document.createElement("form");
  const p = document.createElement("p");
  const label = document.createElement("label");
  const closeBtn = document.createElement("button");
  const submitBtn = document.createElement("button");

  modal.classList.add("modal");
  h3.textContent = edit ? "Edit Project" : "Create new Project";
  form.action = "#";
  form.method = "post";
  form.dataset.index = index;
  submitBtn.classList.add("submit");
  submitBtn.type = "submit";
  submitBtn.innerText = edit ? "Save" : "Add";
  closeBtn.classList.add("close");
  closeBtn.type = "button";
  closeBtn.innerHTML = "&#10005;";

  label.for = "newProject";
  label.textContent = "Project name";
  const input = document.createElement("input");
  input.className = "newProject";
  input.id = "newProject";
  input.name = "newProject";
  input.required = true;

  p.append(label, input);

  form.append(p, submitBtn);

  modal.append(h3, closeBtn, form);

  return modal;
}
