import { Team } from "./team"

export interface MonthPayment {
  id: number,
  paid: boolean,
  payday?: string
  price?: number,
  received?: number,
  discount?: number,
  debit?: number,
  team: Team
}
