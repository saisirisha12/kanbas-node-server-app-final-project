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
