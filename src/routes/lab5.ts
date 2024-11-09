import { Application } from "express";

export default function Lab5(app: Application) {
  app.get("/lab5/welcome", (req, res) => {
    res.send("Welcome to Lab 5!");
  });
}
