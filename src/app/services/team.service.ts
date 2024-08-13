import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { TeamCreate } from '../models/team/team-create';
import { Team } from '../models/team/team';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private http: HttpClient) {}

  OnInit() {}

  public getTeams(page?: number, idCourse?: number): Observable<any> {
    if (page != 0) return this.http.get<any>(`${API_CONFIG.baseUrl}/teams?page=${page}&courseid=${idCourse}`);
    console.log(idCourse);
    return this.http.get<any>(`${API_CONFIG.baseUrl}/teams?courseid=${idCourse}`);
  }

  public createTeam(team: TeamCreate): Observable<any> {
    return this.http.post(`${API_CONFIG.baseUrl}/teams`, team);
  }

  public findByName(name: string): Observable<Team> {
    return this.http.get<Team>(`${API_CONFIG.baseUrl}/teams/name/${name}`);
  }

  public findById(id: number): Observable<any> {
    return this.http.get<any>(`${API_CONFIG.baseUrl}/teams/${id}`);
  }

  public update(team: Team): Observable<Team> {
    return this.http.put<Team>(`${API_CONFIG.baseUrl}/teams/${team.id}`, team);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(`${API_CONFIG.baseUrl}/teams/${id}`);
  }

}
