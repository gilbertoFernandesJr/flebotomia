import { Student } from 'src/app/models/student';
import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent {

  student: Student = {
    name: '',
    cpf: ''
  }

  minDate: Date;
  maxDate: Date;

  constructor(
    private route: ActivatedRoute,
    private service: StudentService
  ){

    this.route.params.subscribe(params => this.getStudent(params["idStudent"]));

    // Set the minimum to January 1st 60 years in the past and December 31st 16 years int the past
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 60, 0, 1);
    this.maxDate = new Date(currentYear - 16, 11, 31);

  }

  getStudent(id: number): void {
    console.log(`Buscar o student com o id ${id}`);
    this.service.findById(id).subscribe({
      next: res => this.student = res,
      error: error => console.log(error)
    });
  }

  back(): void {
    history.back();
  }
}
