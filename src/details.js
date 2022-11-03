export default function detailsModal(obj) {
  const modal = document.createElement("div");
  const h3 = document.createElement("h3");
  const closeBtn = document.createElement("button");
  const div = document.createElement("div");

  const { title, desc, date, priority, completed } = obj;

  modal.classList.add("modal");
  h3.textContent = "Todo Details";
  closeBtn.classList.add("close");
  closeBtn.type = "button";
  closeBtn.innerHTML = "&#10005;";

  div.innerHTML = `
  <p>Title: ${title}</p>
  <p>Description: ${desc}</p>
  <p>Due date: ${date}</p>
  <p>Priority: ${priority}</p>
  <p>Completion: ${completed}</p>
  `;

  modal.append(h3, div, closeBtn);

  return modal;
}
