import db from "../database/index";

let { assignments } = db;

export const findAssignmentsForCourse = (courseId: number) => {
  return assignments.filter((assignment) => assignment.course === courseId);
};

export const createAssignment = (assignment: any) => {
  const newAssignment = {
    ...assignment,
    _id: assignments[assignments.length - 1]._id + 1,
  };
  assignments = [...assignments, newAssignment];
  return newAssignment;
};

export const updateAssignment = (
  assignmentId: number,
  updatedAssignment: any
) => {
  const assignment: any = assignments.find(
    (assignment) => assignment._id === assignmentId
  );
  Object.assign(assignment, updatedAssignment);
  return assignment;
};

export const deleteAssignment = (assignmentId: number) => {
  assignments = assignments.filter(
    (assignment) => assignment._id !== assignmentId
  );
};
