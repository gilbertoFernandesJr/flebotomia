import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { User } from '../models/user/user';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  jwtService: JwtHelperService = new JwtHelperService();

  constructor(
    private http: HttpClient
  ) {}

  ngOnInit() {}

  public findUserByToken(): Observable<User> {
    var token = localStorage.getItem('access_token');
    var decode = this.jwtService.decodeToken(token!);
    var email = decode.sub;
    return this.findUserByEmail(email);
  }

  public findUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(`${API_CONFIG.baseUrl}/users/${email}`);
  }

}
