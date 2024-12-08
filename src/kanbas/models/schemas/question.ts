import { model, Schema } from "mongoose";

const optionSchema = new Schema(
  {
    id: { type: Number, required: true },
    text: { type: String, required: true },
  },
  { _id: false }
);

const questionSchema = new Schema(
  {
    title: { type: String, required: true },
    questionText: { type: String, required: true },
    quiz: { type: Schema.Types.ObjectId, ref: "Quiz", required: true },
    type: {
      type: String,
      enum: ["Multiple Choice", "True/False", "Fill in the Blanks"],
      default: "Multiple Choice",
    },
    options: [{ type: Object, required: false }],
    correctAnswer: [{ type: Object, required: false }],
    points: { type: Number, required: true },
  },
  { collection: "questions" }
);

const QuestionModel = model("Question", questionSchema);

export default QuestionModel;
