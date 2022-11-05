import { nanoid } from "nanoid";

const projectProto = {
  delete(projectsArr, todoArr, index, id) {
    projectsArr.splice(index, 1);
    for (let i = todoArr.length - 1; i >= 0; i--) {
      if (todoArr[i].project === this.id) {
        todoArr.splice(i, 1);
      }
    }
  },
  edit(name) {
    this.name = name;
  },
  updateProjectContents(arr) {
    this.contents = arr.filter((item) => item.project === this.id);
  },
};

const createProject = (name) => {
  return Object.assign(Object.create(projectProto), {
    name,
    id: nanoid(8),
    contents: [],
  });
};

export { createProject, projectProto };
