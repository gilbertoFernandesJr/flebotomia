import { Team } from 'src/app/models/team/team';
import { TeamService } from './../../../../services/team.service';
import { Component } from '@angular/core';
import { Course } from 'src/app/models/course';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddTeamDialogComponent } from '../dialogs/add-team-dialog/add-team-dialog.component';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent {

  course: Course = { id: undefined, name: "" }

  teams: Team[] = [];

  constructor(
    private service: TeamService,
    private router: Router,
    private dialog: MatDialog
  ){}

  ngOnInit(): void {
    this.getResponseBack(this.pageIndex);
  }

  addTeam(): void {
    const dialogRef = this.dialog.open(AddTeamDialogComponent, {data: this.course.id});
    dialogRef.afterClosed().subscribe({
      next: result => {if (result) this.teams.unshift(result)}
    });
  }

  openTeam(name: string, idTeam: number): void {
    this.router.navigate([`courses/start/students/${name}/${idTeam}`]);
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
      },
      error: (error) => console.log(error)
    });
  }

}
