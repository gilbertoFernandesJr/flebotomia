import { Student } from "./student"
import { Team } from "./team/team"

export interface Degree {
  id ?: any,
  code : string,
  generationDate : any,
  studentDTO: Student,
  teamDTO?: Team
}
