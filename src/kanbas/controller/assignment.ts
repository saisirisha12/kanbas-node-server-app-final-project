import { Application } from "express";
import * as dao from "../dao/assignmentDao";
import { Types } from "mongoose";

export default function AssignmentController(app: Application) {
  const findAssignmentsForCourse = async (req: any, res: any) => {
    const courseId = req.params.id;
    const assignments = await dao.findAssignmentsForCourse(courseId);
    res.json(assignments);
  };

  const findAssignmentById = async (req: any, res: any) => {
    const assignmentId = req.params.id;
    const assignment = await dao.findAssignmentById(assignmentId);
    res.json(assignment);
  };

  const createAssignment = async (req: any, res: any) => {
    const courseId = req.params.id;
    const assignment = req.body;
    // assignment.course = new Types.ObjectId(courseId as string);
    const newAssignment = await dao.createAssignment(assignment, courseId);
    res.json(newAssignment);
  };

  const updateAssignment = async (req: any, res: any) => {
    const assignmentId = req.params.id;
    const updatedAssignment = req.body;
    const assignment = await dao.updateAssignment(
      assignmentId,
      updatedAssignment
    );
    res.json(assignment);
  };

  const deleteAssignment = async (req: any, res: any) => {
    const assignmentId = req.params.id;
    await dao.deleteAssignment(assignmentId);
    res.sendStatus(204);
  };

  app.get("/api/courses/:id/assignments", findAssignmentsForCourse);
  app.get("/api/courses/:courseId/assignments/:id", findAssignmentById);
  app.post("/api/courses/:id/assignments", createAssignment);
  app.put("/api/assignments/:id", updateAssignment);
  app.delete("/api/assignments/:id", deleteAssignment);
}
