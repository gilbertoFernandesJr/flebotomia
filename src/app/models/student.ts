import { MonthPayment } from "./month_payment";
import { Registration } from "./registration";

export interface Student {
  id?: any,
  name: string,
  phone?: string,
  dateBirth?: string,
  cpf: string,
  registrations?: Registration[],
  monthPayments?: MonthPayment[],
  inDebt?: boolean,
  observation?: string
}
