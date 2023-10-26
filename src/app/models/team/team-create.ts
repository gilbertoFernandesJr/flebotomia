export interface TeamCreate {
  name: string,
  startDate: Date,
  quantityMonths: number,
  priceMonthPayments: number,
  firstMonthPayment: Date
  priceRegistration: number,
  courseDTO: {
    id: number
  }
}
