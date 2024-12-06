export interface Module {
  _id?: string;
  name: string;
  course: string;
  lessons: Lesson[];
}

export interface Lesson {
  _id?: string;
  name: string;
  description: string;
  module: string;
}
