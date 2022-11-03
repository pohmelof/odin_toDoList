// render todoElement with data-index attribute
export default function todoEl(obj, index) {
  const todoItem = document.createElement("div");
  todoItem.classList.add("todo-item");
  const checkIcon = obj.completed ? '<i class="fa-solid fa-check"></i>' : "";
  todoItem.innerHTML = `
                    <div class="importance ${obj.priority}"></div>
                    <div class="checkmark" data-index="${index}">${checkIcon}</div>
                    <div class="todo-desc">${obj.title}</div>
                    <button class="details" data-index="${index}">Details</button>
                    <div class="due-date">${obj.date}</div>
                    <button class="edit" data-index="${index}">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button class="delete" data-index="${index}">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                    `;

  return todoItem;
}
