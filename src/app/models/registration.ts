import { Team } from "./team"

export interface Registration {
  id: number,
  paid: boolean,
  payday?: string
  dueDate?: string
  price?: number,
  received?: number,
  discount?: number,
  debit?: number,
  team: Team
}
