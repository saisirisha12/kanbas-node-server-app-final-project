import { model, Schema } from "mongoose";

const assignmentSchema = new Schema(
  {
    title: { type: String, required: true },
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    // modules: [{ type: Schema.Types.ObjectId, ref: "Module", required: true }], for now, we will use strings as we are not using modules in the course's assignment
    modules: [{ type: String, required: true }],
    availableFrom: { type: Date, required: true },
    availableUntil: { type: Date, required: true },
    dueDate: { type: Date, required: true },
    points: { type: Number, required: true },
    description: { type: String, required: true },
  },
  { collection: "assignments" }
);

const AssignmentModel = model("Assignment", assignmentSchema);

export default AssignmentModel;
