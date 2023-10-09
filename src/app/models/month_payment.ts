import { Team } from "./team"

export interface MonthPayment {
  id: number,
  paid: boolean,
  payday?: any,
  dueDate: string,
  price: number,
  received?: any,
  discount?: any,
  debit?: number,
  team: Team
}
