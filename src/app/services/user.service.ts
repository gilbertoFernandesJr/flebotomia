import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { UserUpdate } from '../models/user/user_update';
import { Token } from '../models/token';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  OnInit() {}

  public update(user: UserUpdate): Observable<Token> {
    const id = user.id;
    return this.http.put<Token>(`${API_CONFIG.baseUrl}/users/${id}`, user);
  }
}
