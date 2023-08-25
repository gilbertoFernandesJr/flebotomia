import { Registration } from "./registration";

export interface Student {
  id?: any,
  name: string,
  phone?: string,
  dateBirth?: string,
  cpf: string,
  registrations?: Registration[];
}
