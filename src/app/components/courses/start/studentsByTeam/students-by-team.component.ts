import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from 'src/app/models/student';
import { StudentService } from 'src/app/services/student.service';
import { AddStudentTeamDialogComponent } from '../dialogs/add-student-team-dialog/add-student-team-dialog.component';

@Component({
  selector: 'app-students',
  templateUrl: './students-by-team.component.html',
  styleUrls: ['./students-by-team.component.scss']
})
export class StudentsByTeamComponent {

  constructor(
    private service: StudentService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
  ) {}

  students: Student[] = [];
  idTeam: number = 0;
  nameTeam: string = '';

  ngOnInit(): void {
    this.route.params.subscribe(params => this.nameTeam = params['nameTeam']);
    this.route.params.subscribe(params => this.idTeam = params['idTeam']);
    this.getStudents();
  }

  getStudents(): void {
    this.service.getStudentsByTeam(this.idTeam).subscribe({
      next: (res) => {
        this.students = res;
      },
      error: (error) => console.log(error),
      complete: () => this.studentsInDebt()
    });
  }

  studentsInDebt(): void {
    this.students.forEach(student => {
      let today = new Date();
      let dueDate = new Date();
      student.monthPayments?.forEach(m => {
        dueDate = new Date(m.dueDate);
        if(dueDate.getTime() < today.getTime() && !m.paid) student.inDebt = true;
      });
    });
  }

  getRegistration(student: Student): any {
    let valueReceived;
    student.registrations?.forEach(r => {
      if (r.team.id == this.idTeam) valueReceived = r.received;
    });
    return valueReceived;
  }

  editStudent(id: number): void {
    this.router.navigate([`courses/start/students/${this.nameTeam}/${this.idTeam}/${id}`]);
  }

  addStudent(): void {
    const dialogRef = this.dialog.open(AddStudentTeamDialogComponent, {
      data: this.idTeam,
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) this.students.push(result);
    });
  }

  goEditStudent(): void {
    this.router.navigate([`/courses/start/teams/${this.idTeam}`]);
  }

  back(): void {
    history.back();
  }
}
