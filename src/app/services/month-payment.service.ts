import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { MonthPaymentUpdate } from '../dto/month-payment-update';

@Injectable({
  providedIn: 'root'
})
export class MonthPaymentService {

  constructor(private http: HttpClient) {}

  OnInit() {}

  public update(monthPaymentUpdate: MonthPaymentUpdate): Observable<MonthPaymentUpdate> {
    const id = monthPaymentUpdate.id;
    return this.http.put<MonthPaymentUpdate>(`${API_CONFIG.baseUrl}/monthsPayment/${id}`, monthPaymentUpdate);
  }
}
