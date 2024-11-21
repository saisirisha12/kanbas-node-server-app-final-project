import db from "../database/index";

let { courses, enrollments } = db;

export const enrollUserInCourse = (userId: number, courseId: number) => {
  const enrollment = {
    user: userId,
    course: courseId,
    _id: enrollments[enrollments.length - 1]._id + 1,
  };
  enrollments = [...enrollments, enrollment];
};
