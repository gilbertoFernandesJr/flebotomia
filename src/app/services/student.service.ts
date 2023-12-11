import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) {}

  OnInit() {}

  public findAll(page: number, name?: string): Observable<any> {
    return this.http.get(`${API_CONFIG.baseUrl}/students?page=${page}${name? '&name='+name : ''}`);
  }

  public getStudentsByTeam(idTeam?: number): Observable<any> {
    return this.http.get<any>(`${API_CONFIG.baseUrl}/teams/${idTeam}/students`);
  }

  public findById(id: number): Observable<Student> {
    return this.http.get<Student>(`${API_CONFIG.baseUrl}/students/${id}`);
  }

  public findByCpf(cpf: string): Observable<Student> {
    return this.http.get<Student>(`${API_CONFIG.baseUrl}/students/cpf/${cpf}`);
  }

  public update(student: Student): Observable<Student> {
    const id = student.id;
    return this.http.put<Student>(`${API_CONFIG.baseUrl}/students/${id}`, student);
  }

  public create(student: Student): Observable<Student> {
    return this.http.post<Student>(`${API_CONFIG.baseUrl}/students`, student);
  }

  public addStudentOfTeam(student: Student, teamId: number): Observable<any> {
    return this.http.post(`${API_CONFIG.baseUrl}/students/team/${teamId}`, student);
  }

  public removeStudentOfTeam(studentId: number, teamId: number): Observable<any> {
    return this.http.delete(`${API_CONFIG.baseUrl}/students/${studentId}/team/${teamId}`);
  }

  public delete(studentId: number): Observable<any> {
    return this.http.delete(`${API_CONFIG.baseUrl}/students/${studentId}`);
  }
}
