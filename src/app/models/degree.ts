import { Student } from "./student"

export interface Degree {
  id ?: any,
  code : string,
  generationDate : any,
  studentDTO: Student
}
