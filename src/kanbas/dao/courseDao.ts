import db from "../database/index";

let { courses, enrollments } = db;

export const findAllCourses = () => courses;

export const findCoursesForEnrolledUser = (userId: number) => {
  return courses.filter((course) =>
    enrollments.some(
      (enrollment) =>
        enrollment.user === userId && enrollment.course === course._id
    )
  );
};

export const createCourse = (course: any) => {
  const newCourse = { ...course, _id: courses[courses.length - 1]._id + 1 };
  courses = [...courses, newCourse];
  return newCourse;
};

export const updateCourse = (courseId: number, updatedCourse: any) => {
  const course: any = courses.find((course) => course._id === courseId);
  Object.assign(course, updatedCourse);
  return course;
};

export const deleteCourse = (courseId: number) => {
  courses = courses.filter((course) => course._id !== courseId);
  enrollments = enrollments.filter(
    (enrollment) => enrollment.course !== courseId
  );
};

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
