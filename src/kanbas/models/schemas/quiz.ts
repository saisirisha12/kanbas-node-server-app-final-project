import { model, Schema } from "mongoose";

const quizSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    assignedTo: { type: String, enum: ["EVERYONE"], default: "EVERYONE" },
    type: {
      type: String,
      enum: [
        "Graded Quiz",
        "Practice Quiz",
        "Graded Survey",
        "Ungraded Survey",
      ],
      default: "Graded Quiz",
    },
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    points: { type: Number, required: true },
    assignmentGroup: {
      type: String,
      enum: ["QUIZZES", "EXAMS", "ASSIGNMENTS", "PROJECT"],
      default: "QUIZZES",
    },
    shuffleAnswers: { type: Boolean, default: true },
    timeLimit: { type: Number, default: 20 },
    multipleAttempts: { type: Boolean, default: false },
    attempts: { type: Number, default: 1 },
    showCorrectAnswers: {
      type: String,
      enum: ["NEVER", "AFTER_PUBLISHED", "AFTER_LAST_ATTEMPT", "IMMEDIATELY"],
      default: "AFTER_PUBLISHED",
    },
    accessCode: { type: String, default: "" },
    oneQuestionAtATime: { type: Boolean, default: true },
    webCamRequired: { type: Boolean, default: false },
    lockQuestionsAfterAnswering: { type: Boolean, default: false },
    dueDate: { type: Date, required: true },
    availableFrom: { type: Date, required: true },
    availableUntil: { type: Date, required: true },
    published: { type: Boolean, default: false },
  },
  { collection: "quizzes" }
);

const QuizModel = model("Quiz", quizSchema);

export default QuizModel;
