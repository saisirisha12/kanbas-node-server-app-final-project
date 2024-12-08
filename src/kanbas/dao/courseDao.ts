import { Course } from "../models/course";
import CourseModel from "../models/schemas/course";
import EnrollmentModel from "../models/schemas/enrollment";
import { Types } from "mongoose";

export const findAllCourses = async () => {
  try {
    return await CourseModel.find();
  } catch (error) {
    return [];
  }
};

export const findCoursesForEnrolledUser = async (userId: string) => {
  try {
    const enrollments = await EnrollmentModel.find({
      user: new Types.ObjectId(userId),
    }).populate("course");
    const courses = enrollments.map((enrollment: any) => enrollment.course);
    return courses;
  } catch (error) {
    return [];
  }
};

export const createCourse = async (course: Course) => {
  try {
    return await CourseModel.create(course);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Unable to create course: " + error.message);
    } else {
      throw new Error("Unable to create course: Unknown error");
    }
  }
};

export const updateCourse = async (courseId: string, updatedCourse: Course) => {
  try {
    return await CourseModel.findByIdAndUpdate(courseId, updatedCourse, {
      new: true,
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Unable to update course: " + error.message);
    } else {
      throw new Error("Unable to update course: Unknown error");
    }
  }
};

export const deleteCourse = async (courseId: string) => {
  try {
    await EnrollmentModel.deleteMany({ course: courseId });
    return await CourseModel.findByIdAndDelete(courseId);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Unable to delete course: " + error.message);
    } else {
      throw new Error("Unable to delete course: Unknown error");
    }
  }
};

export const enrollUserInCourse = async (userId: string, courseId: string) => {
  try {
    const newEnrollment = new EnrollmentModel({
      user: userId,
      course: courseId,
    });
    return await newEnrollment.save();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Unable to enroll user in course: " + error.message);
    } else {
      throw new Error("Unable to enroll user in course: Unknown error");
    }
  }
};

export const unenrollUserFromCourse = async (
  userId: string,
  courseId: string
) => {
  try {
    const enrollment = await EnrollmentModel.findOne({
      user: userId,
      course: courseId,
    });
    if (!enrollment) {
      throw new Error("Enrollment not found");
    }

    await EnrollmentModel.findByIdAndDelete(enrollment._id);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Unable to unenroll user from course: " + error.message);
    } else {
      throw new Error("Unable to unenroll user from course: Unknown error");
    }
  }
};

export const findUsersForCourse = async (courseId: string) => {
  try {
    const enrollments = await EnrollmentModel.find({
      course: courseId,
    }).populate("user");
    const users = enrollments.map((enrollment: any) => enrollment.user);
    return users;
  } catch (error) {
    return [];
  }
};
