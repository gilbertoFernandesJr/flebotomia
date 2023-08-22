import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class AllCoursesService {

  constructor(private http: HttpClient) {}

  OnInit() {}

  public getCourses(): Observable<any> {
    return this.http.get<any>(`${API_CONFIG.baseUrl}/courses`);
  }
}
