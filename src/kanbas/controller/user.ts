import { Application } from "express";
import * as dao from "../dao/userDao";
import * as courseDao from "../dao/courseDao";

export default function UserController(app: Application) {
  const findAllUsers = async (req: any, res: any) => {
    const { role, name } = req.query;
    if (role) {
      const users = await dao.findUsersByRole(role);
      res.json(users);
      return;
    }
    if (name) {
      const users = await dao.findUsersByPartialName(name);
      res.json(users);
      return;
    }
    const users = await dao.findAllUsers();
    res.json(users);
  };

  const findUserById = async (req: any, res: any) => {
    const id = req.params.id;
    const user = await dao.findUserById(id);
    res.json(user);
  };

  const createUser = async (req: any, res: any) => {
    const user = req.body;
    const newUser = await dao.createUser(user);
    res.json(newUser);
  };

  const updateUser = async (req: any, res: any) => {
    const id = req.params.id;
    const userUpdates = req.body;
    await dao.updateUser(id, userUpdates);
    const currentUser = req.session["currentUser"];
    const updatedUser = await dao.findUserById(id);
    if (currentUser && currentUser._id === id) {
      req.session["currentUser"] = updatedUser;
    }
    res.json(updatedUser);
  };

  const signup = async (req: any, res: any) => {
    const user = await dao.findUserByUsername(req.body.username);
    if (user) {
      res.status(400).json({ message: "Username already exists" });
    } else {
      const currentUser = await dao.createUser(req.body);
      req.session["currentUser"] = currentUser;
      res.json(currentUser);
    }
  };

  const login = async (req: any, res: any) => {
    const { username, password } = req.body;
    const currentUser = await dao.findUserByCredentials(username, password);
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

  const deleteUser = async (req: any, res: any) => {
    const id = req.params.id;
    await dao.deleteUser(id);
    res.sendStatus(200);
  };

  const findCoursesForEnrolledUser = async (req: any, res: any) => {
    const userId = req.params.id;
    const currentUser = req.session["currentUser"];
    if (!currentUser || currentUser._id !== userId) {
      res.sendStatus(401);
      return;
    }
    res.json(await courseDao.findCoursesForEnrolledUser(currentUser._id));
  };

  const createCourse = async (req: any, res: any) => {
    const userId = req.params.id;
    const currentUser = req.session["currentUser"];
    if (!currentUser || currentUser._id !== userId) {
      res.sendStatus(401);
      return;
    }
    const course = await courseDao.createCourse(req.body);
    courseDao.enrollUserInCourse(currentUser._id, course._id.toString());
    res.json(course);
  };

  app.get("/api/users", findAllUsers);
  app.post("/api/users", createUser);
  app.get("/api/users/profile", profile);
  app.get("/api/users/:id", findUserById);
  app.put("/api/users/:id", updateUser);
  app.delete("/api/users/:id", deleteUser);
  app.post("/api/users/signup", signup);
  app.post("/api/users/login", login);
  app.post("/api/users/logout", logout);
  app.get("/api/users/:id/courses", findCoursesForEnrolledUser);
  app.post("/api/users/:id/courses", createCourse);
}
