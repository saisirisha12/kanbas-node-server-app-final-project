export interface Quiz {
  _id?: string;
  title: string;
  description: string;
  assignedTo: string;
  type: string;
  course: string;
  points: number;
  assignmentGroup: string;
  shuffleAnswers: boolean;
  timeLimit: number;
  multipleAttempts: boolean;
  attempts: number;
  showCorrectAnswers: boolean;
  accessCode: string;
  oneQuestionAtATime: boolean;
  webCamRequired: boolean;
  lockQuestionsAfterAnswering: boolean;
  dueDate: Date;
  availableFrom: Date;
  availableUntil: Date;
  published: boolean;
}
