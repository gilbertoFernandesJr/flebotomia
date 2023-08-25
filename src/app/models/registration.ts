import { Team } from "./team"

export interface Registration {
  id: number,
  paid: boolean,
  payday?: string
  price?: number,
  received?: number,
  team: Team
}
