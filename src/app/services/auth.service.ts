import { Credenciais } from './../models/credenciais';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Token } from '../models/token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtService: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient) { }

  public authenticate(creds: Credenciais): Observable<Token> {
    return this.http.post(
        `${API_CONFIG.baseUrl}/auth`,
        creds
      );
  }

  public successAuth(token: any) {
    localStorage.setItem("access_token", token);
  }

  public getToken(): string | null | Token {
    return localStorage.getItem("access_token");
  }

  public isAuthenticated(): boolean {
    let token: any = this.getToken();
    if (token != null) {
      return !this.jwtService.isTokenExpired(token);
    }
    return false;
  }

  public logout(): void {
    localStorage.clear();
  }
}
