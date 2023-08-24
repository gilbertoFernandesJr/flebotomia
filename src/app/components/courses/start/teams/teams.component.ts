import { Team } from 'src/app/models/team';
import { TeamService } from './../../../../services/team.service';
import { Component } from '@angular/core';
import { Course } from 'src/app/models/course';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent {

  course: Course = { id: undefined, name: "" }

  teams: Team[] = [];

  constructor(private service: TeamService){}

  ngOnInit(): void {
    this.service.getTeans().subscribe({
      next: (res) => {
        this.teams = res.content;
        this.course = res.content[0].courseDTO;
        console.log(res);
      },
      error: (error) => console.log(error)
    });
  }

}
