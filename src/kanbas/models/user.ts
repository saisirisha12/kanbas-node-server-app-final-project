export interface User {
  _id?: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  dob: Date;
  role: string;
  loginId: string;
  section: string;
  lastActivity: Date;
  totalActivity: string;
}
