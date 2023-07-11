import { StudentDTO } from "./student"

export interface Degree {
  id ?: any,
  code : string,
  dateGeneration : any,
  studentDTO: StudentDTO
}
