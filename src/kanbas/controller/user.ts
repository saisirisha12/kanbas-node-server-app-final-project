import { Application } from "express";
import * as dao from "../dao/userDao";

export default function UserController(app: Application) {
  const findAllUsers = (req: any, res: any) => {};

  const findUserById = (req: any, res: any) => {};

  const createUser = (req: any, res: any) => {};

  const updateUser = (req: any, res: any) => {
    const id = parseInt(req.params.id);
    const updatedUser = req.body;
    dao.updateUser(id, updatedUser);
    const currentUser = dao.findUserById(id);
    req.session["currentUser"] = currentUser;
    res.json(currentUser);
  };

  const deleteUser = (req: any, res: any) => {};

  const signup = (req: any, res: any) => {
    const user = dao.findUserByUsername(req.body.username);
    if (user) {
      res.status(400).json({ message: "Username already exists" });
    } else {
      const currentUser = dao.createUser(req.body);
      req.session["currentUser"] = currentUser;
      res.json(currentUser);
    }
  };

  const login = (req: any, res: any) => {
    const { username, password } = req.body;
    const currentUser = dao.findUserByCredentials(username, password);
    if (currentUser) {
      req.session["currentUser"] = currentUser;
      res.json(currentUser);
    } else {
      res
        .status(401)
        .json({ message: "Unable to login. Please try again later." });
    }
  };

  const logout = (req: any, res: any) => {
    req.session.destroy();
    res.sendStatus(200);
  };

  const profile = (req: any, res: any) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    res.json(currentUser);
  };

  app.get("/api/users/profile", profile);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:id", findUserById);
  app.post("/api/users", createUser);
  app.put("/api/users/:id", updateUser);
  app.delete("/api/users/:id", deleteUser);
  app.post("/api/users/signup", signup);
  app.post("/api/users/login", login);
  app.post("/api/users/logout", logout);
  // app.get("/api/users/profile", profile);
}
