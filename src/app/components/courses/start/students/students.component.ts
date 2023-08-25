import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student } from 'src/app/models/student';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent {

  constructor(
    private service: StudentService,
    private route: ActivatedRoute
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
        console.log(res);
      },
      error: (error) => console.log(error)
    })
  }

  getRegistration(student: Student): any {
    let valueReceived;
    student.registrations?.forEach(r => {
      if (r.team.id == this.idTeam) valueReceived = r.received;
    });
    return valueReceived;
  }
}
