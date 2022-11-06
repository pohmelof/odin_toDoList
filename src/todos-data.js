import { toDoProto } from "./todo";

let todosArray = [
  {
    title: "Kill Batman",
    desc: "It's simple, we kill the Batman",
    date: "2021-12-08",
    priority: "high",
    completed: false,
    project: "default",
  },
  {
    title: "Learn Spanish",
    desc: "And start expecting Spanish Inquisition",
    date: "2022-12-08",
    priority: "low",
    completed: false,
    project: "justDoIt",
  },
  {
    title: "Learn masonry",
    desc: "Seems like a good skill to have",
    date: "2023-12-08",
    priority: "high",
    completed: true,
    project: "justDoIt",
  },
  {
    title: "Create Todo",
    desc: "Or not create Todo? That is the question.",
    date: "2024-12-08",
    priority: "low",
    completed: false,
    project: "default",
  },
];

todosArray.forEach((item) => Object.assign(item, toDoProto));

export { todosArray };
