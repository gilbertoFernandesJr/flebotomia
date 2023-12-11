import { Component, Inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Student } from 'src/app/models/student';
import { StudentService } from 'src/app/services/student.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new-student',
  templateUrl: './new-student-dialog.component.html',
  styleUrls: ['./new-student-dialog.component.scss']
})
export class NewStudentDialogComponent {

  minDate: Date;
  maxDate: Date;

  student: Student = {
    name: '',
    cpf: ''
  }

  public studentForm: UntypedFormGroup = this.formBuilder.group({
    name: [this.student.name, [Validators.required]],
    cpf: [this.student.cpf, [Validators.required]],
    phone: [this.student.phone, [Validators.required]],
    dateBirth: [this.student.dateBirth, [Validators.required]]
  });

  hasError:boolean = false;

  constructor(
    private toast: ToastrService,
    private studentService: StudentService,
    private formBuilder: UntypedFormBuilder,
    public dialogRef: MatDialogRef<NewStudentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    // Max year old of 60 years and minumum of 16 years old
    // Used at date birth of student
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 60, 0, 1);
    this.maxDate = new Date(currentYear - 16, 11, 31);
  }

  joinFormWithStudent(): void {
    this.student.name = this.studentForm.get('name')?.value;
    this.student.cpf = this.studentForm.get('cpf')?.value;
    this.student.phone = this.studentForm.get('phone')?.value;
    this.student.dateBirth = this.studentForm.get('dateBirth')?.value;
  }

  save(): void {
    if (this.studentForm.valid) {
      this.joinFormWithStudent();
      this.studentService.create(this.student).subscribe({
        next: () => {
          this.toast.success('Aluno cadastrado');
          this.dialogRef.close(true);
        },
        error: error => {
          if (error.error.message == 'CPF already in use') {
            this.toast.error('CPF já cadastrado');
          } else this.toast.error('Ops.. tivemos um error');
          console.log(error);
        }
      });
    } else this.hasError = true;
  }

  cancel(): void {
    this.dialogRef.close(false);
  }

}
