// get data obj from form
export default function getFormData() {
  const formElem = document.querySelectorAll(".newTodo");
  const data = Array.from(formElem).reduce(
    (acc, input) => ({ ...acc, [input.id]: input.value }),
    {}
  );
  return data;
}
