import { Course } from "../course";

export interface Team {
  id: number,
  name: string,
  completed: boolean,
  endDate?: Date,
  courseDTO?: Course
}
