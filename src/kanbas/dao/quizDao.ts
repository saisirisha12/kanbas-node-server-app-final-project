import { Question } from "../models/question";
import { Quiz } from "../models/quiz";
import CourseModel from "../models/schemas/course";
import QuestionModel from "../models/schemas/question";
import QuizModel from "../models/schemas/quiz";

export const findQuizzesForCourse = async (courseId: string) => {
  try {
    return await QuizModel.find({ course: courseId });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Error finding quizzes: " + error.message);
    } else {
      throw new Error("Error fetching quizzes: Unknown error");
    }
  }
};

export const findQuizById = async (quizId: string) => {
  try {
    return await QuizModel.findById(quizId);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Error finding quiz: " + error.message);
    } else {
      throw new Error("Error finding quiz: Unknown error");
    }
  }
};

export const createQuiz = async (quizData: any, courseId: string) => {
  try {
    const course = await CourseModel.findById(courseId);
    if (!course) {
      throw new Error("Course not found");
    }
    const newQuiz = new QuizModel({
      ...quizData,
      course: course,
    });
    return await newQuiz.save();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Error creating quiz: " + error.message);
    } else {
      throw new Error("Error creating quiz: Unknown error");
    }
  }
};

export const updateQuiz = async (quizId: string, updatedData: Quiz) => {
  try {
    return await QuizModel.findByIdAndUpdate(quizId, updatedData, {
      new: true,
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Error updating quiz: " + error.message);
    } else {
      throw new Error("Error updating quiz: Unknown error");
    }
  }
};

export const deleteQuiz = async (quizId: string) => {
  try {
    return await QuizModel.findByIdAndDelete(quizId);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Error deleting quiz: " + error.message);
    } else {
      throw new Error("Error deleting quiz: Unknown error");
    }
  }
};

export const addQuestionToQuiz = async (quizId: string, question: Question) => {
  try {
    const newQuestion = new QuestionModel({
      ...question,
      quiz: quizId,
    });
    return await newQuestion.save();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Error adding question: " + error.message);
    } else {
      throw new Error("Error adding question: Unknown error");
    }
  }
};

export const findQuestionsForQuiz = async (quizId: string) => {
  try {
    return await QuestionModel.find({ quiz: quizId });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Error finding questions: " + error.message);
    } else {
      throw new Error("Error fetching questions: Unknown error");
    }
  }
}

export const deleteQuestion = async (questionId: string) => {
  try {
    return await QuestionModel.findByIdAndDelete(questionId);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Error deleting question: " + error.message);
    } else {
      throw new Error("Error deleting question: Unknown error");
    }
  }
};

export const updateQuestion = async (questionId: string, updatedData: Question) => {
  try {
    return await QuestionModel.findByIdAndUpdate(questionId, updatedData, {
      new: true,
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Error updating quiz: " + error.message);
    } else {
      throw new Error("Error updating quiz: Unknown error");
    }
  }
};