import { Team } from 'src/app/models/team';
import { TeamService } from './../../../../services/team.service';
import { Component } from '@angular/core';
import { Course } from 'src/app/models/course';
import { PageEvent } from '@angular/material/paginator';

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
    this.getResponseBack(this.pageIndex);
  }

  length = 0; // Come of the back, all elements on the DB
  pageSize = 6; // All elements for page
  pageIndex = 0; // Page

  hidePageSize = false;
  showFirstLastButtons = true;
  disabled = false;

  pageEvent: PageEvent = new PageEvent;

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.getResponseBack(this.pageIndex);
  }

  private getResponseBack(page: number): void {
    this.service.getTeans(page).subscribe({
      next: (res) => {
        this.teams = res.content;
        this.course = res.content[0].courseDTO;
        this.length = res.totalElements;
        console.log(res);
      },
      error: (error) => console.log(error)
    });
  }

}
