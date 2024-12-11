export interface Question {
  _id?: string;
  title: string;
  questionText: string;
  quiz: string;
  type: string;
  options: string[];
  correctAnswers: string[];
  points: number;
}
