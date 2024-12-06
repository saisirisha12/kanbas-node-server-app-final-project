import { Types } from "mongoose";
import { Assignment } from "../models/assignment";
import AssignmentModel from "../models/schemas/assignment";
import CourseModel from "../models/schemas/course";
import { Course } from "../models/course";

export const findAssignmentsForCourse = async (courseId: string) => {
  try {
    return await AssignmentModel.find({ course: new Types.ObjectId(courseId) });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Error finding assignments: " + error.message);
    } else {
      throw new Error("Error fetching assignments: Unknown error");
    }
  }
};

export const findAssignmentById = async (assignmentId: string) => {
  try {
    return await AssignmentModel.findById(assignmentId);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Error finding assignment: " + error.message);
    } else {
      throw new Error("Error finding assignment: Unknown error");
    }
  }
};

export const createAssignment = async (
  assignmentData: Assignment,
  courseId: string
) => {
  try {
    const course = await CourseModel.findById(courseId);
    if (!course) {
      throw new Error("Course not found");
    }
    const newAssignment = new AssignmentModel({
      ...assignmentData,
      course: course,
    });
    return await newAssignment.save();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Error creating assignment: " + error.message);
    } else {
      throw new Error("Error creating assignment: Unknown error");
    }
  }
};

export const updateAssignment = async (
  assignmentId: string,
  updatedData: Assignment
) => {
  try {
    return await AssignmentModel.findByIdAndUpdate(assignmentId, updatedData, {
      new: true,
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Error updating assignment: " + error.message);
    } else {
      throw new Error("Error updating assignment: Unknown error");
    }
  }
};

export const deleteAssignment = async (assignmentId: string) => {
  try {
    await AssignmentModel.findByIdAndDelete(assignmentId);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Error deleting assignment: " + error.message);
    } else {
      throw new Error("Error deleting assignment: Unknown error");
    }
  }
};
