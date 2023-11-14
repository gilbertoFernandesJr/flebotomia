import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { TeamCreate } from '../models/team/team-create';
import { Team } from '../models/team/team';
import { PaymentVoucher } from '../models/payment_voucher';

@Injectable({
  providedIn: 'root'
})
export class PaymentVoucherService {

  constructor(private http: HttpClient) {}

  OnInit() {}

  public createForRegistration(registrationId: number): Observable<PaymentVoucher> {
    return this.http.post(`${API_CONFIG.baseUrl}/paymentVoucher/registration`, {
      registrationId: registrationId
    });
  }

  public createForMonthPayment(monthPaymentId: number): Observable<PaymentVoucher> {
    return this.http.post(`${API_CONFIG.baseUrl}/paymentVoucher/monthPayment`, {
      monthPaymentId: monthPaymentId
    });
  }

  public printPdfForRegistration(registrationId: number): Observable<any> {
    return this.http.get(`${API_CONFIG.baseUrl}/paymentVoucher/registration/${registrationId}/pdf`, {observe: 'response', responseType: 'blob'});
  }

  public printPdfForMonthPayment(monthPaymentId: number): Observable<any> {
    return this.http.get(`${API_CONFIG.baseUrl}/paymentVoucher/monthPayment/${monthPaymentId}/pdf`, {observe: 'response', responseType: 'blob'});
  }

}
