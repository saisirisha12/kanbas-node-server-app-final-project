import { Application } from "express";
import * as dao from "../dao/courseDao";

export default function CourseController(app: Application) {
  const findAllCourses = (req: any, res: any) => {
    const courses = dao.findAllCourses();
    res.json(courses);
  };

  const updateCourse = (req: any, res: any) => {
    const courseId = parseInt(req.params.id);
    const updatedCourse = req.body;
    const course = dao.updateCourse(courseId, updatedCourse);
    res.json(course);
  };

  const deleteCourse = (req: any, res: any) => {
    const courseId = parseInt(req.params.id);
    dao.deleteCourse(courseId);
    res.sendStatus(204);
  };

  app.get("/api/courses", findAllCourses);
  app.put("/api/courses/:id", updateCourse);
  app.delete("/api/courses/:id", deleteCourse);
}
