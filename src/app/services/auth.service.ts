import { Router } from '@angular/router';
import { Credenciais } from './../models/credenciais';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtService: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient) { }

  public authenticate(creds: Credenciais): Observable<HttpResponse<string>> {
    return this.http.post(
        `${API_CONFIG.baseUrl}/auth`,
        creds,
        {observe: 'response', responseType: 'text'}
      );
  }

  public successAuth(token: any) {
    localStorage.setItem("access_token", token);
  }

  public getToken(): string | null {
    return localStorage.getItem("access_token");
  }

  public isAuthenticated(): boolean {
    let token = this.getToken();
    if (token != null) {
      return !this.jwtService.isTokenExpired(token);
    }
    return false;
  }

  public logout(): void {
    localStorage.clear();
  }
}
