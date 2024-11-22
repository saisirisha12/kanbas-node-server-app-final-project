import { Application } from "express";
import * as dao from "../dao/enrollmentDao";

export default function EnrollmentController(app: Application) {
  const enrollUserInCourse = (req: any, res: any) => {
    const userId = parseInt(req.params.userId);
    const courseId = parseInt(req.params.courseId);
    dao.enrollUserInCourse(userId, courseId);
    res.sendStatus(200);
  };

  const unenrollUserFromCourse = (req: any, res: any) => {
    const userId = parseInt(req.params.userId);
    const courseId = parseInt(req.params.courseId);
    dao.unenrollUserFromCourse(userId, courseId);
    res.sendStatus(200);
  };

  app.post("/api/users/:userId/courses/:courseId/enroll", enrollUserInCourse);
  app.post(
    "/api/users/:userId/courses/:courseId/unenroll",
    unenrollUserFromCourse
  );
}
