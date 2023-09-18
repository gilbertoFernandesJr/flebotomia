import { Registration } from './../models/registration';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { RegistrationUpdate } from '../dto/registration-update';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient) {}

  OnInit() {}

  public update(registration: RegistrationUpdate): Observable<RegistrationUpdate> {
    return this.http.put<RegistrationUpdate>(`${API_CONFIG.baseUrl}/registrations`, registration);
  }
}
