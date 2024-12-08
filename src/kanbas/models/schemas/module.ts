import { model, Schema } from "mongoose";

const lessonSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  module: { type: Schema.Types.ObjectId, ref: "Module", required: true },
});

const moduleSchema = new Schema(
  {
    name: { type: String, required: true },
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    lessons: [lessonSchema],
  },
  { collection: "modules" }
);

const ModuleModel = model("Module", moduleSchema);

export default ModuleModel;
