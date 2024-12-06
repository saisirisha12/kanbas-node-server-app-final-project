export interface Assignment {
  _id?: string;
  title: string;
  course: string;
  modules: string[];
  availableFrom: Date;
  availableUntil: Date;
  dueDate: Date;
  points: number;
  description: string;
}
