import { Application } from "express";
import * as dao from "../dao/courseDao";

export default function CourseController(app: Application) {
  const findAllCourses = async (req: any, res: any) => {
    const courses = await dao.findAllCourses();
    res.json(courses);
  };

  const updateCourse = async (req: any, res: any) => {
    const courseId = req.params.id;
    const updatedCourse = req.body;
    const course = await dao.updateCourse(courseId, updatedCourse);
    res.json(course);
  };

  const deleteCourse = async (req: any, res: any) => {
    const courseId = req.params.id;
    await dao.deleteCourse(courseId);
    res.sendStatus(204);
  };

  const findUsersForCourse = async (req: any, res: any) => {
    const courseId = req.params.id;
    const users = await dao.findUsersForCourse(courseId);
    res.json(users);
  };

  app.get("/api/courses", findAllCourses);
  app.put("/api/courses/:id", updateCourse);
  app.get("/api/courses/:id/users", findUsersForCourse);
  app.delete("/api/courses/:id", deleteCourse);
}
