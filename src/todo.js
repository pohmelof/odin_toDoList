const toDoProto = {
  edit({ title, desc, date, priority, project }) {
    this.title = title;
    this.desc = desc;
    this.date = date;
    this.priority = priority;
    this.project = project;
  },
  complete() {
    this.completed = !this.completed;
  },
};

const createToDo = (obj) => {
  const { title, desc, date, priority, project } = obj;
  return Object.assign(Object.create(toDoProto), {
    title,
    desc,
    date,
    priority,
    project,
    completed: false,
  });
};

export { createToDo, toDoProto };
