import { MonthPayment } from 'src/app/models/month_payment';
import { Registration } from 'src/app/models/registration';
import { Student } from "./student";
import { Team } from "./team/team";

export interface PaymentVoucher {
  id?: number,
  student?: Student,
  team?: Team,
  registration?: Registration,
  monthPayment?: MonthPayment,
  generationDate?: Date
}
