import { model, Schema } from "mongoose";

const courseSchema = new Schema(
  {
    number: { type: String, required: true },
    name: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    department: { type: String, required: true },
    credits: { type: Number, required: true },
    description: { type: String, required: true },
  },
  { collection: "courses" }
);

const CourseModel = model("Course", courseSchema);

export default CourseModel;
