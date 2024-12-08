export interface Course {
  _id?: string;
  number: string;
  name: string;
  startDate: Date;
  endDate: Date;
  department: string;
  credits: number;
  description: string;
}
