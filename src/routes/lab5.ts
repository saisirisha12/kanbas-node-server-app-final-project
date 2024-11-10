import { Application } from "express";

const assignment = {
  id: 1,
  title: "NodeJS Assignment",
  description: "Create a NodeJS server with ExpressJS",
  due: "2021-10-15",
  completed: false,
  score: 0,
};

const module = {
  id: 1,
  name: "NodeJS",
  description: "Learn NodeJS with ExpressJS",
  course: "Full Stack Development",
};

const todos = [
  {
    id: 1,
    title: "Task 1",
    description: "Complete Lab 5",
    due: "2021-10-15",
    completed: false,
  },
  {
    id: 2,
    title: "Task 2",
    description: "Submit Assignment",
    due: "2021-10-20",
    completed: false,
  },
  {
    id: 3,
    title: "Task 3",
    description: "Prepare for Exam",
    due: "2021-10-30",
    completed: false,
  },
  {
    id: 4,
    title: "Task 4",
    description: "Attend Webinar",
    due: "2021-11-05",
    completed: false,
  },
];

export default function Lab5(app: Application) {
  app.get("/lab5/welcome", (req, res) => {
    res.send("Welcome to Lab 5!");
  });

  app.get("/lab5/add/:a/:b", (req, res) => {
    const { a, b } = req.params;
    const sum = parseInt(a) + parseInt(b);
    res.send(sum.toString());
  });

  app.get("/lab5/subtract/:a/:b", (req, res) => {
    const { a, b } = req.params;
    const difference = parseInt(a) - parseInt(b);
    res.send(difference.toString());
  });

  app.get("/lab5/multiply/:a/:b", (req, res) => {
    const { a, b } = req.params;
    const product = parseInt(a) * parseInt(b);
    res.send(product.toString());
  });

  app.get("/lab5/divide/:a/:b", (req, res) => {
    const { a, b } = req.params;
    const quotient = parseInt(a) / parseInt(b);
    res.send(quotient.toString());
  });

  app.get("/lab5/calculator", (req, res) => {
    const { a, b, operation } = req.query;
    let result;
    switch (operation) {
      case "add":
        result = parseInt(a as string) + parseInt(b as string);
        break;
      case "subtract":
        result = parseInt(a as string) - parseInt(b as string);
        break;
      case "multiply":
        result = parseInt(a as string) * parseInt(b as string);
        break;
      case "divide":
        result = parseInt(a as string) / parseInt(b as string);
        break;
      default:
        result = "Invalid operation";
    }
    res.send(result.toString());
  });

  app.get("/lab5/assignment", (req, res) => {
    res.json(assignment);
  });

  app.get("/lab5/assignment/title", (req, res) => {
    res.send(assignment.title);
  });

  app.get("/lab5/assignment/title/:newTitle", (req, res) => {
    const { newTitle } = req.params;
    assignment.title = newTitle;
    res.send(assignment);
  });

  app.get("/lab5/assignment/score/:newScore", (req, res) => {
    const { newScore } = req.params;
    assignment.score = parseInt(newScore);
    res.send(assignment);
  });

  app.get("/lab5/assignment/completed/:isCompleted", (req, res) => {
    const { isCompleted } = req.params;
    assignment.completed = isCompleted === "true";
    res.send(assignment);
  });

  app.get("/lab5/module", (req, res) => {
    res.json(module);
  });

  app.get("/lab5/module/name", (req, res) => {
    res.send(module.name);
  });

  app.get("/lab5/module/name/:newName", (req, res) => {
    const { newName } = req.params;
    module.name = newName;
    res.send(module);
  });

  app.get("/lab5/module/description/:newDescription", (req, res) => {
    const { newDescription } = req.params;
    module.description = newDescription;
    res.send(module);
  });

  app.get("/lab5/todos", (req, res) => {
    const { completed } = req.query;
    if (completed !== undefined) {
      const completedBool = completed === "true";
      const completedTodos = todos.filter((t) => t.completed === completedBool);
      res.json(completedTodos);
      return;
    }
    res.json(todos);
  });

  app.get("/lab5/todos/create", (req, res) => {
    const newTodo = {
      id: new Date().getTime(),
      title: "New Task",
      description: "New Description",
      due: "2021-12-31",
      completed: false,
    };
    todos.push(newTodo);
    res.json(todos);
  });

  app.get("/lab5/todos/:id", (req, res) => {
    const { id } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    res.json(todo);
  });

  app.get("/lab5/todos/:id/delete", (req, res) => {
    const { id } = req.params;
    const todoIndex = todos.findIndex((t) => t.id === parseInt(id));
    todos.splice(todoIndex, 1);
    res.json(todos);
  });

  app.get("/lab5/todos/:id/title/:title", (req, res) => {
    const { id, title } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    if (!todo) {
      res.status(404).send("Todo not found");
      return;
    }
    todo.title = title;
    res.json(todos);
  });

  app.get("/lab5/todos/:id/description/:description", (req, res) => {
    const { id, description } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    if (!todo) {
      res.status(404).send("Todo not found");
      return;
    }
    todo.description = description;
    res.json(todos);
  });

  app.get("/lab5/todos/:id/completed/:completed", (req, res) => {
    const { id, completed } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    if (!todo) {
      res.status(404).send("Todo not found");
      return;
    }
    todo.completed = completed === "true";
    res.json(todos);
  });
}
