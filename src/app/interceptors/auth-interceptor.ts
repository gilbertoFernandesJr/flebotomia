
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token = localStorage.getItem('access_token');
    if(token) {
      let requestClone = request.clone({
        setHeaders: {Authorization: `Bearer ${token}`}
      });
      return next.handle(requestClone);
    } else {
      return next.handle(request);
    }
  }
}

export const AuthInterceptorProvider = {
  provide : HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true
}
