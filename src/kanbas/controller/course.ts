import { Application } from "express";
import * as dao from "../dao/courseDao";
import * as moduleDao from "../dao/moduleDao";

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

  const findModulesForCourse = (req: any, res: any) => {
    const courseId = parseInt(req.params.id);
    const modules = moduleDao.findModulesForCourse(courseId);
    res.json(modules);
  };

  const createModule = (req: any, res: any) => {
    const courseId = parseInt(req.params.id);
    const module = req.body;
    module.course = courseId;
    const newModule = moduleDao.createModule(module);
    res.json(newModule);
  };

  app.get("/api/courses", findAllCourses);
  app.put("/api/courses/:id", updateCourse);
  app.delete("/api/courses/:id", deleteCourse);
  app.get("/api/courses/:id/modules", findModulesForCourse);
  app.post("/api/courses/:id/modules", createModule);
}
