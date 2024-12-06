import { Application } from "express";
import * as dao from "../dao/courseDao";

export default function EnrollmentController(app: Application) {
  const enrollUserInCourse = async (req: any, res: any) => {
    const userId = req.params.userId;
    const courseId = req.params.courseId;
    await dao.enrollUserInCourse(userId, courseId);
    res.sendStatus(200);
  };

  const unenrollUserFromCourse = async (req: any, res: any) => {
    const userId = req.params.userId;
    const courseId = req.params.courseId;
    await dao.unenrollUserFromCourse(userId, courseId);
    res.sendStatus(200);
  };

  app.post("/api/users/:userId/courses/:courseId/enroll", enrollUserInCourse);
  app.post(
    "/api/users/:userId/courses/:courseId/unenroll",
    unenrollUserFromCourse
  );
}
