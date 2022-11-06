import { projectProto } from "./project";

let projects = [
  {
    name: "Default",
    id: "default",
    contents: [],
  },
  {
    name: "Learn everything",
    id: "justDoIt",
    contents: [],
  },
];

projects.forEach((item) => Object.assign(item, projectProto));

export { projects };
