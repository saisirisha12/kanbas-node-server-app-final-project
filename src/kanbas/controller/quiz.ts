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

  const findQuestionsForQuiz = async (req: any, res: any) => {
    const quizId = req.params.id;
    const questions = await dao.findQuestionsForQuiz(quizId);
    res.json(questions);
  };

  const deleteQuestion = async (req: any, res: any) => {
    const questionId = req.params.id;
    await dao.deleteQuestion(questionId);
    res.sendStatus(204);
  };

  const updateQuestion = async (req: any, res: any) => {
    const questionId = req.params.id;
    const updatedQuestion = req.body;
    const question = await dao.updateQuestion(questionId, updatedQuestion);
    res.json(question);
  };

  const addAnswerToQuiz = async (req: any, res: any) => {
    const quizAttempt = req.body
    const newAttempt = await dao.addAnswerToQuiz(quizAttempt);
    res.json(newAttempt);
  };
  const getQuizAttempts = async(req:any,res:any) => {
    const {id, userId} = req.params;
    const allowedAttempts = await dao.findLatestQuizAttempt(id, userId);
    res.json(allowedAttempts);
  };

  const getNumberOfQuizAttempts = async(req:any,res:any) => {
    const {id,userId} = req.params;
    const allowedAttempts = await dao.countAttemptsForUserAndQuiz(id,userId)
    res.json(allowedAttempts);
  }

  const calcUserQuizScore= async(req:any,res:any) => {
    const {id,userId} = req.params;
    const calcScore = await dao.calculateScoreForQuizAttempt(id,userId)
    res.json(calcScore);
  }

  const calcQuizPoints= async(req:any,res:any) => {
    const {id} = req.params;
    const points = await dao.calculateQuizPoints(id);
    res.json(points);
  }


  app.get("/api/courses/:id/quizzes", findQuizzesForCourse);
  app.get("/api/courses/:courseId/quizzes/:id", findQuizById);
  app.post("/api/courses/:id/quizzes", createQuiz);
  app.put("/api/quizzes/:id", updateQuiz);
  app.delete("/api/quizzes/:id", deleteQuiz);
  
  app.post("/api/quizzes/:id/questions", addQuestionToQuiz);
  app.get("/api/quizzes/:id/questions", findQuestionsForQuiz);
  app.delete("/api/questions/:id", deleteQuestion);
  app.put("/api/questions/:id", updateQuestion);

  app.post("/api/quizzes/:id/answers", addAnswerToQuiz);
  app.get("/api/quizzes/:id/users/:userId/LatestAttempt", getQuizAttempts);
  app.get("/api/quizzes/:id/users/:userId/calcScore", calcUserQuizScore);
  app.get("/api/quizzes/:id/calcQuizPoints", calcQuizPoints);
  app.get("/api/quizzes/:id/users/:userId/allowedNumberOfAttempts", getNumberOfQuizAttempts);

  
}
