
export interface MonthPaymentUpdate {
  id: number,
  paid: boolean,
  payday?: string
  price?: number,
  received?: number,
  discount?: number
}
