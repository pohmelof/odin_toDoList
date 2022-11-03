import { nanoid } from "nanoid";

const projectProto = {
  delete() {
    console.log("deleted");
  },
  edit(name) {
    this.name = name;
  },
};

const createProject = (name) => {
  return Object.assign(Object.create(projectProto), {
    name,
    id: nanoid(8),
    contents: [],
  });
};

export { createProject };
