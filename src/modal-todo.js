export function todoModal(arr, index, edit = false) {
  const modal = document.createElement("div");
  const h3 = document.createElement("h3");
  const form = document.createElement("form");
  const projectSelect = document.createElement("select");
  const selectP = document.createElement("p");
  const label = document.createElement("label");
  const closeBtn = document.createElement("button");
  const submitBtn = document.createElement("button");

  modal.classList.add("modal");
  h3.textContent = edit ? "Edit Todo" : "Create new Todo";
  form.action = "#";
  form.method = "post";
  form.dataset.index = index;
  submitBtn.classList.add("submit", "btn-anim");
  submitBtn.type = "submit";
  submitBtn.innerText = edit ? "Save" : "Add";
  closeBtn.classList.add("close", "btn-anim");
  closeBtn.type = "button";
  closeBtn.innerHTML = "&#10005;";

  form.innerHTML = `<p>
                        <label for="title">Title</label>
                        <input class='newTodo' type="text" id="title" name="title" required />
                    </p>
                    <p>
                        <label for="desc">Description</label>
                        <textarea class='newTodo' id="desc" name="desc"></textarea>
                    </p>
                    <p>
                        <label for="date">Due Date</label>
                        <input class='newTodo' type="date" id="date" name="date"  required/>
                    </p>
                    <p>
                        <label for="importance">Importance</label>
                        <select class='newTodo' id="priority" name="priority" required>
                            <option value="">--How important is it?--</option>
                            <option value="high">Very</option>
                            <option value="mid">Somewhat</option>
                            <option value="low">Not important</option>
                        </select>
                    </p>`;

  label.for = "project";
  label.textContent = "Project";
  projectSelect.classList.add("newTodo");
  projectSelect.name = "project";
  projectSelect.id = "project";
  for (const item of arr) {
    const option = document.createElement("option");
    option.value = item.id;
    option.textContent = item.name;
    projectSelect.appendChild(option);
  }

  selectP.append(label, projectSelect);

  form.append(selectP, submitBtn);

  modal.append(h3, closeBtn, form);

  return modal;
}
