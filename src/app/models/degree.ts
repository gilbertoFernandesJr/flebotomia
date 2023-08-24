import { Student } from "./student"

export interface Degree {
  id ?: any,
  code : string,
  dateGeneration : any,
  studentDTO: Student
}
