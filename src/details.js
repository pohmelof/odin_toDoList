export function detailsModal(obj) {
  const modal = document.createElement("div");
  const h2 = document.createElement("h2");
  const closeBtn = document.createElement("button");
  const div = document.createElement("div");
  div.className = "modal-details";

  const { title, desc, date, priority, completed } = obj;

  modal.classList.add("modal");
  h2.textContent = "Todo Details";
  closeBtn.classList.add("close");
  closeBtn.type = "button";
  closeBtn.innerHTML = "&#10005;";

  div.innerHTML = `
  <h3>Title: </h3>
  <p>${title}</p>
  <h3>Description: </h3>
  <p>${desc}</p>
  <h3>Due date: </h3>
  <p>${date}</p>
  <h3>Priority: </h3>
  <p>${priority}</p>
  <h3>Completion: </h3>
  <p>${completed}</p>
  `;

  modal.append(h2, div, closeBtn);

  return modal;
}
