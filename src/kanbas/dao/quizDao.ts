import { Question } from "../models/question";
import { Quiz } from "../models/quiz";
import { QuizAttempt } from "../models/quizAttempt";
import CourseModel from "../models/schemas/course";
import QuestionModel from "../models/schemas/question";
import QuizModel from "../models/schemas/quiz";
import QuizAttemptModel from "../models/schemas/quizAttempt"

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

    const quiz = await QuizModel.findById(quizId);
    if (!quiz) {
      throw new Error("Quiz not found");
    }

    // Calculate the new total points by summing points of all questions in the quiz
    const questions = await QuestionModel.find({ quiz: quizId });
    const totalPoints = questions.reduce((sum, question) => sum + question.points, 0);

    // Update the quiz points
    quiz.points = totalPoints;
    await quiz.save(); // Save the updated quiz

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
    const updatedQuestion = await QuestionModel.findByIdAndUpdate(questionId, updatedData, {
      new: true,
    });

    if (!updatedQuestion) {
      throw new Error("Question not found");
    }

    const quiz = await QuizModel.findById(updatedQuestion.quiz);
    if (!quiz) {
      throw new Error("Quiz not found");
    }

    const questions = await QuestionModel.find({ quiz: updatedQuestion.quiz });
    const totalPoints = questions.reduce((sum, question) => sum + question.points, 0);

    quiz.points = totalPoints;
    await quiz.save(); 

    return updatedQuestion; 

  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Error updating quiz: " + error.message);
    } else {
      throw new Error("Error updating quiz: Unknown error");
    }
  }
};

export const addAnswerToQuiz = async(quizAttempt:QuizAttempt) => {
  try {
    const newAttempt = new QuizAttemptModel({
      ...quizAttempt,
      })
      return await newAttempt.save();
  }
  catch (error) {
    if (error instanceof Error) {
      throw new Error("Error adding question: " + error.message);
    } else {
      throw new Error("Error adding question: Unknown error");
    }
  }
}
 
export const countAttemptsForUserAndQuiz = async (quizId: string, userId: string) => {
  try {
    const attemptCount = await QuizAttemptModel.countDocuments({
      student: userId,
      quiz: quizId,
    }).exec();
    // If the result array is empty, return 0 (no attempts)
    return attemptCount;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Error counting quiz attempts: " + error.message);
    } else {
      throw new Error("Error counting quiz attempts: Unknown error");
    }
  }
};

export const findLatestQuizAttempt = async ( quizId: string, userId: string) => {
  try {
    const res =  await QuizAttemptModel.findOne({ quiz: quizId, student: userId  })
      .sort({ date: -1 }) // Sort by date in descending order
      .exec();
    return res
     
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Error finding latest quiz attempt: " + error.message);
    } else {
      throw new Error("Error fetching latest quiz attempt: Unknown error");
    }
  }
};

export const calculateScoreForQuizAttempt = async (quizId: string, userId: string) => {
  try {
    // Find the latest quiz attempt
    const latestAttempt = await QuizAttemptModel.findOne({ student: userId, quiz: quizId })
      .sort({ date: -1 })
      .populate('answers.question') // You can remove this if you want to manually fetch each question
      .exec();
 
    if (!latestAttempt) {
      throw new Error('No quiz attempt found for this user and quiz');
    }
 
    let totalScore = 0;
 
    // Loop through each answer in the quiz attempt
    for (let answer of latestAttempt.answers) {
 
      const questionId = answer.question;  // The ObjectId of the question
 
      // Fetch the question from the QuestionModel by _id
      const question = await QuestionModel.findById(questionId).exec();
      if (!question) {
        throw new Error(`Question not found for questionId: ${questionId}`);
      }
 
      // Check if the provided answer matches the correct answer(s) in the question
      const correctAnswer = question.correctAnswers[0].text;
 
      if (Array.isArray(correctAnswer)) {
        // Handle cases where correctAnswers could be multiple (e.g., multiple-choice)
        if (correctAnswer.includes(answer.answer)) {
          totalScore += question.points;
        }
      } else {
        // Handle cases where the correct answer is a single value (e.g., True/False, Fill in the blanks)
        if (correctAnswer === answer.answer) {
          totalScore += question.points;
        }
      }
    }
 
    // Update the score for the quiz attempt
    latestAttempt.score = totalScore;
    await latestAttempt.save();
 
    // return latestAttempt;  // Return the updated quiz attempt with the calculated score
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('Error calculating score for quiz attempt: ' + error.message);
    } else {
      throw new Error('Error calculating score for quiz attempt: Unknown error');
    }
  }
};

export const calculateQuizPoints = async (quizId: string) => {
  try {
    const questions = await QuestionModel.find({ quiz: quizId });
    const totalPoints = questions.reduce((sum, question) => {
      return sum + question.points;  
    }, 0); 

    return totalPoints;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Error finding questions: " + error.message);
    } else {
      throw new Error("Error fetching questions: Unknown error");
    }
  }
}

