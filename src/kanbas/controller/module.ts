import { Application } from "express";
import * as dao from "../dao/moduleDao";

export default function ModuleController(app: Application) {
  const findModulesForCourse = async (req: any, res: any) => {
    const courseId = req.params.id;
    const modules = await dao.findModulesForCourse(courseId);
    res.json(modules);
  };

  const createModule = async (req: any, res: any) => {
    const courseId = req.params.id;
    const module = req.body;
    module.course = courseId;
    const newModule = await dao.createModule(module);
    res.json(newModule);
  };
  const updateModule = async (req: any, res: any) => {
    const moduleId = req.params.id;
    const updatedModule = req.body;
    const module = await dao.updateModule(moduleId, updatedModule);
    res.json(module);
  };

  const deleteModule = async (req: any, res: any) => {
    const moduleId = req.params.id;
    await dao.deleteModule(moduleId);
    res.sendStatus(204);
  };

  app.get("/api/courses/:id/modules", findModulesForCourse);
  app.post("/api/courses/:id/modules", createModule);
  app.put("/api/modules/:id", updateModule);
  app.delete("/api/modules/:id", deleteModule);
}
