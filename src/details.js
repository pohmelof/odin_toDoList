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

  //   get all details in array for convenience
  const detailsArr = [
    ["Title: ", title],
    ["Description: ", desc],
    ["Due date: ", date],
    ["Priority", priority],
    ["Completion: ", completed],
  ];

  // loop over array to render details
  for (const item of detailsArr) {
    const h3 = document.createElement("h3");
    const p = document.createElement("p");
    h3.textContent = item[0];
    p.textContent = item[1];
    div.append(h3, p);
  }

  modal.append(h2, div, closeBtn);

  return modal;
}
