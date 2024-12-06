import { model, Schema } from "mongoose";

const enrollmentSchema = new Schema(
  {
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { collection: "enrollments" }
);

const EnrollmentModel = model("Enrollment", enrollmentSchema);

export default EnrollmentModel;
