import { Application } from "express";
import * as dao from "../dao/quizDao";

export default function QuizController(app: Application) {
  const findQuizzesForCourse = async (req: any, res: any) => {
    const courseId = req.params.id;
    const quizzes = await dao.findQuizzesForCourse(courseId);
    res.json(quizzes);
  };

  const findQuizById = async (req: any, res: any) => {
    const quizId = req.params.id;
    const quiz = await dao.findQuizById(quizId);
    res.json(quiz);
  };

  const createQuiz = async (req: any, res: any) => {
    const courseId = req.params.id;
    const quiz = req.body;
    const newQuiz = await dao.createQuiz(quiz, courseId);
    res.json(newQuiz);
  };

  const updateQuiz = async (req: any, res: any) => {
    const quizId = req.params.id;
    const updatedQuiz = req.body;
    const quiz = await dao.updateQuiz(quizId, updatedQuiz);
    res.json(quiz);
  };

  const deleteQuiz = async (req: any, res: any) => {
    const quizId = req.params.id;
    await dao.deleteQuiz(quizId);
    res.sendStatus(204);
  };

  const addQuestionToQuiz = async (req: any, res: any) => {
    const quizId = req.params.id;
    const question = req.body;
    const newQuestion = await dao.addQuestionToQuiz(quizId, question);
    res.json(newQuestion);
  };

  app.get("/api/courses/:id/quizzes", findQuizzesForCourse);
  app.get("/api/courses/:courseId/quizzes/:id", findQuizById);
  app.post("/api/courses/:id/quizzes", createQuiz);
  app.put("/api/quizzes/:id", updateQuiz);
  app.delete("/api/quizzes/:id", deleteQuiz);

  app.post("/api/quizzes/:id/questions", addQuestionToQuiz);
}
