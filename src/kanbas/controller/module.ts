import { Application } from "express";
import * as dao from "../dao/moduleDao";

export default function ModuleController(app: Application) {
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

  app.put("/api/modules/:id", updateModule);
  app.delete("/api/modules/:id", deleteModule);
}
