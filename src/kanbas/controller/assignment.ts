import { Application } from "express";
import * as dao from "../dao/assignmentDao";

export default function AssignmentController(app: Application) {
  const findAssignmentsForCourse = (req: any, res: any) => {
    const courseId = parseInt(req.params.id);
    const assignments = dao.findAssignmentsForCourse(courseId);
    res.json(assignments);
  };

  const createAssignment = (req: any, res: any) => {
    const courseId = parseInt(req.params.id);
    const assignment = req.body;
    assignment.course = courseId;
    const newAssignment = dao.createAssignment(assignment);
    res.json(newAssignment);
  };

  const updateAssignment = (req: any, res: any) => {
    const assignmentId = parseInt(req.params.id);
    const updatedAssignment = req.body;
    const assignment = dao.updateAssignment(assignmentId, updatedAssignment);
    res.json(assignment);
  };

  const deleteAssignment = (req: any, res: any) => {
    const assignmentId = parseInt(req.params.id);
    dao.deleteAssignment(assignmentId);
    res.sendStatus(204);
  };

  app.get("/api/courses/:id/assignments", findAssignmentsForCourse);
  app.post("/api/courses/:id/assignments", createAssignment);
  app.put("/api/assignments/:id", updateAssignment);
  app.delete("/api/assignments/:id", deleteAssignment);
}
