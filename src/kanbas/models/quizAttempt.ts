export interface QuizAttempt {
  _id?: string;
  quiz: string;
  student: string;
  answers: Answer[];
  score: number;
  date: Date;
}

export interface Answer {
  question: string;
  answer: string;
}
