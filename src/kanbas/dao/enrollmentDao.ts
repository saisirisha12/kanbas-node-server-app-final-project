import db from "../database/index";

let { enrollments } = db;

export const enrollUserInCourse = (userId: number, courseId: number) => {
  const enrollment = {
    user: userId,
    course: courseId,
    _id: enrollments[enrollments.length - 1]._id + 1,
  };
  enrollments = [...enrollments, enrollment];
};

export const unenrollUserFromCourse = (userId: number, courseId: number) => {
  const enrollment = enrollments.find(
    (e) => e.user === userId && e.course === courseId
  );
  enrollments = enrollments.filter((e) => e._id !== enrollment?._id);
};
