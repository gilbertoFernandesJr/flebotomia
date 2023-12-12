import { Router } from '@angular/router';
import { Student } from 'src/app/models/student';
import { Component } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { NewStudentDialogComponent } from '../dialogs/new-student/new-student-dialog.component';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent {

  students: Student[] = [];
  searchByName: string = '';
  inRequest: boolean = true;

  //Pagination
  length = 0; // Come of the back, all elements on the DB
  pageSize = 10; // All elements for page
  pageIndex = 0; // Page

  hidePageSize = false;
  showFirstLastButtons = true;

  constructor(
    private service: StudentService,
    private router: Router,
    public dialog: MatDialog
    ) {
    this.findStudents(this.pageIndex);
  }

  handlePageEvent(e: PageEvent) {
    this.pageIndex = e.pageIndex;
    this.findStudents(this.pageIndex);
  }

  findStudents(page: number): void {
    this.service.findAll(page, this.searchByName).subscribe({
      next: res => {
        this.students = res.content;
        this.length = res.totalElements;
        // this.pageSize = res.numberOfElements;
        this.pageIndex = res.number;
      },
      error: error => console.log(error),
      complete: () => {
        this.studentsInDebt()
        this.inRequest = false;
      }
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

  createStudent(): void {
    const dialogRef = this.dialog.open(NewStudentDialogComponent);
  }

  editStudent(id: number): void {
    this.router.navigate([`courses/start/student/${id}`]);
  }

  search(): void {
    this.findStudents(0);
  }
}
