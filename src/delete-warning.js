export default function deleteWarning() {
  const modal = document.createElement("div");
  const h3 = document.createElement("h3");
  const p = document.createElement("p");
  const btnCont = document.createElement("div");
  const cancelBtn = document.createElement("button");
  const deleteBtn = document.createElement("button");

  modal.classList.add("modal", "delete-warning");
  h3.textContent = "Warning!";
  p.textContent =
    "Deleting a Project will delete all Todos in it. Are you sure?";
  deleteBtn.classList.add("modal-deleteBtn");
  deleteBtn.textContent = "Delete";
  cancelBtn.classList.add("modal-cancel");
  cancelBtn.textContent = "Cancel";

  btnCont.append(cancelBtn, deleteBtn);

  modal.append(h3, p, btnCont);

  return modal;
}
