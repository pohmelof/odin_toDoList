import { toDoProto } from "./todo";

let todosArray = [
  {
    title: "Kill Batman",
    desc: "none",
    date: "2021-12-08",
    priority: "mid",
    completed: false,
    project: "default",
  },
  {
    title: "Save Batman",
    desc: "none",
    date: "2022-12-08",
    priority: "low",
    completed: false,
    project: "justDoIt",
  },
  {
    title: "Become Batman",
    desc: "none",
    date: "2023-12-08",
    priority: "high",
    completed: true,
    project: "justDoIt",
  },
  {
    title: "Stop being Batman",
    desc: "none",
    date: "2024-12-08",
    priority: "low",
    completed: false,
    project: "default",
  },
];

todosArray.forEach((item) => Object.assign(item, toDoProto));

export { todosArray };
