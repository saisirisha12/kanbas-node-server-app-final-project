import { model, Schema } from "mongoose";

const answerSchema = new Schema({
  question: { type: String, ref: "Question", required: true },
  answer: { type: String, required: true },
});

const quizAttemptSchema = new Schema(
  {
    quiz: { type: Schema.Types.ObjectId, ref: "Quiz", required: true },
    student: { type: Schema.Types.ObjectId, ref: "User", required: true },
    attemptNumber: { type: Number, required: true },
    answers: [answerSchema],
    score: { type: Number, required: true },
    date: { type: Date, required: false },
  },
  { collection: "quizAttempts" }
);

const QuizAttemptModel = model("QuizAttempt", quizAttemptSchema);

export default QuizAttemptModel;
