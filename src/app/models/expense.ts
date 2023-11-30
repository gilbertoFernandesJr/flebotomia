import { Course } from "./course";

export interface Expense {
  id?: number,
  emission?: Date,
  cost?: number,
  description?: string,
  course?: Course
}
