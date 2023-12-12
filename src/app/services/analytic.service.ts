import { API_CONFIG } from './../config/api.config';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Degree } from '../models/degree';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnalyticService {

  constructor(private http: HttpClient) { }

  findProfitMonthPaymentByMonth() : Observable<any> {
    return this.http.get(`${API_CONFIG.baseUrl}/analytic/monthPayment/year`);
  }

  findProfitRegistrationByMonth() : Observable<any> {
    return this.http.get(`${API_CONFIG.baseUrl}/analytic/registration/year`);
  }

  findExpenseByYear() : Observable<any> {
    return this.http.get(`${API_CONFIG.baseUrl}/analytic/expense/year`);
  }
}
