import { Component } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { Student } from 'src/app/models/student';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { StudentService } from 'src/app/services/student.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-student-team-dialog',
  templateUrl: './add-student-team-dialog.component.html',
  styleUrls: ['./add-student-team-dialog.component.scss']
})
export class AddStudentTeamDialogComponent {

  minDate: Date;
  maxDate: Date;

  showCpf: boolean = true;
  readOnlyStudent: boolean = false;

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
    public dialogRef: MatDialogRef<AddStudentTeamDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public teamId: number
  ) {
    // Max year old of 60 years and minumum of 16 years old
    // Used at date birth of student
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 60, 0, 1);
    this.maxDate = new Date(currentYear - 16, 11, 31);
  }

  //Case cpf already save on the DB
  joinStudentWithForm(): void {
    this.studentForm.get('name')?.setValue(this.student.name);
    this.studentForm.get('phone')?.setValue(this.student.phone);
    this.studentForm.get('dateBirth')?.setValue(this.student.dateBirth);
  }

  joinFormWithStudent(): void {
    this.student.name = this.studentForm.get('name')?.value;
    this.student.cpf = this.studentForm.get('cpf')?.value;
    this.student.phone = this.studentForm.get('phone')?.value;
    this.student.dateBirth = this.studentForm.get('dateBirth')?.value;
  }

  clearForm(): void {
    this.studentForm.get('name')?.setValue('');
    this.studentForm.get('phone')?.setValue('');
    this.studentForm.get('dateBirth')?.setValue('');
  }

  clearStudent(): void {
    this.student = {
      name: '',
      cpf: ''
    };
  }

  validateCpf(): void {
    if(this.studentForm.get('cpf')?.valid) {
      //Request back
      var cpf: string = this.studentForm.get('cpf')?.value;
      this.studentService.findByCpf(cpf).subscribe({
        next: res => {
          try {
            if(res.id) this.student = res;
            this.joinStudentWithForm();
            this.readOnlyStudent = true;
          } catch (error) {
            this.readOnlyStudent = false;
            this.clearForm();
            this.clearStudent();
          }
        },
        error: error => console.log(error)
      });
      this.showCpf = false;
    }
  }

  backCpf(): void {
    this.showCpf = true;
  }

  save(): void {

    if(this.studentForm.valid) {
      this.hasError = false;
      //save student
      this.joinFormWithStudent();
      this.studentService.addStudentOfTeam(this.student, this.teamId).subscribe({
        next: res => {
          this.toast.success('Aluno cadastrado');
          this.student = res;
        },
        error: error => {
          this.dialogRef.close(false);
          if(error.error.status == 400) this.toast.info('Aluno já adicionado nesta turma');
        },
        complete: () => this.dialogRef.close(this.student)
      });
    }else {
      this.hasError = true;
    }
  }

  cancel(): void {
    this.dialogRef.close(false);
  }
}
