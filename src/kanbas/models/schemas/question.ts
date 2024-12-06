import { model, Schema } from "mongoose";

const questionSchema = new Schema(
  {
    title: { type: String, required: true },
    questionText: { type: String, required: true },
    quiz: { type: Schema.Types.ObjectId, ref: "Quiz", required: true },
    type: {
      type: String,
      enum: ["MULTIPLE_CHOICE", "TRUE_FALSE", "SHORT_ANSWER"],
      default: "MULTIPLE_CHOICE",
    },
    options: [{ type: String }],
    correctAnswer: { type: String },
    points: { type: Number, required: true },
  },
  { collection: "questions" }
);

const QuestionModel = model("Question", questionSchema);

export default QuestionModel;
