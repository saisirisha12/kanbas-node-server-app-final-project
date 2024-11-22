import { Application } from "express";
import * as dao from "../dao/moduleDao";

export default function ModuleController(app: Application) {
  const findModulesForCourse = (req: any, res: any) => {
    const courseId = parseInt(req.params.id);
    const modules = dao.findModulesForCourse(courseId);
    res.json(modules);
  };

  const createModule = (req: any, res: any) => {
    const courseId = parseInt(req.params.id);
    const module = req.body;
    module.course = courseId;
    const newModule = dao.createModule(module);
    res.json(newModule);
  };
  const updateModule = (req: any, res: any) => {
    const moduleId = parseInt(req.params.id);
    const updatedModule = req.body;
    const module = dao.updateModule(moduleId, updatedModule);
    res.json(module);
  };

  const deleteModule = (req: any, res: any) => {
    const moduleId = parseInt(req.params.id);
    dao.deleteModule(moduleId);
    res.sendStatus(204);
  };

  app.get("/api/courses/:id/modules", findModulesForCourse);
  app.post("/api/courses/:id/modules", createModule);
  app.put("/api/modules/:id", updateModule);
  app.delete("/api/modules/:id", deleteModule);
}
