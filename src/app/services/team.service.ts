import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private http: HttpClient) {}

  OnInit() {}

  public getTeans(): Observable<any> {
    return this.http.get<any>(`${API_CONFIG.baseUrl}/teams`);
  }
}
